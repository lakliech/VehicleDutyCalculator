import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generateDutyCalculationPDF } from "@/lib/pdf-generator";
import { dutyCalculationSchema, type DutyCalculation, type DutyResult, type VehicleReference, type ManualVehicleData, type Trailer, type HeavyMachinery } from "@shared/schema";
import { VehicleSelector } from "@/components/vehicle-selector";
import { VehicleCategorySelector } from "@/components/vehicle-category-selector";
import { TrailerSelector } from "@/components/trailer-selector";
import { HeavyMachinerySelector } from "@/components/heavy-machinery-selector";
import { ModuleNavigation } from "@/components/module-navigation";
import gariyangu from "@assets/gylogo_1752064168868.png";
import { 
  Calculator, 
  Car, 
  Truck, 
  Bike, 
  Shield, 
  DollarSign, 
  Calendar, 
  Receipt,
  Info,
  Download,
  AlertCircle,
  Zap,
  Bus,
  Building,
  Heart,
  Wrench,
  Package,
  Settings,
  Database
} from "lucide-react";

const vehicleCategoryInfo = {
  under1500cc: { 
    emoji: "🚗",
    label: "Under 1500cc",
    description: "Vehicles with engine capacity below 1500cc",
    icon: Car
  },
  over1500cc: { 
    emoji: "🚙", 
    label: "Over 1500cc", 
    description: "Vehicles with engine capacity 1500cc and above",
    icon: Car
  },
  largeEngine: { 
    emoji: "🚛",
    label: "Large Engine", 
    description: "Petrol >3000cc or Diesel >2500cc",
    icon: Truck
  },
  electric: { 
    emoji: "⚡",
    label: "Electric", 
    description: "Fully electric vehicles (tax incentives apply)",
    icon: Zap
  },
  schoolBus: { 
    emoji: "🚌",
    label: "School Bus", 
    description: "Vehicles designated for student transport",
    icon: Bus
  },
  primeMover: { 
    emoji: "🚚",
    label: "Prime Mover", 
    description: "Heavy duty truck heads",
    icon: Building
  },
  trailer: { 
    emoji: "🚛",
    label: "Trailer", 
    description: "Transport trailers",
    icon: Package
  },
  ambulance: { 
    emoji: "🚑",
    label: "Ambulance", 
    description: "Emergency medical vehicles",
    icon: Heart
  },
  motorcycle: { 
    emoji: "🏍️",
    label: "Motorcycle", 
    description: "Two-wheeled vehicles",
    icon: Bike
  },
  specialPurpose: { 
    emoji: "🚜",
    label: "Special Purpose", 
    description: "Specialized vehicles",
    icon: Wrench
  },
  heavyMachinery: { 
    emoji: "🏗️",
    label: "Heavy Machinery", 
    description: "Construction and industrial equipment",
    icon: Building
  }
};

export default function DutyCalculator() {
  const { toast } = useToast();
  const [calculationResult, setCalculationResult] = useState<DutyResult | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);

  const [categoryConflict, setCategoryConflict] = useState<string | null>(null);
  const [yearOfManufacture, setYearOfManufacture] = useState<number>(0); // 0 means not selected
  const [manualEngineSize, setManualEngineSize] = useState<number | null>(null);
  const [manualVehicleData, setManualVehicleData] = useState<ManualVehicleData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [selectedMachinery, setSelectedMachinery] = useState<HeavyMachinery | null>(null);
  
  const form = useForm<DutyCalculation>({
    resolver: zodResolver(dutyCalculationSchema),
    defaultValues: {
      vehicleCategory: "under1500cc", 
      vehicleValue: 1000000,
      engineSize: 1500,
      vehicleAge: 0,
      isDirectImport: true,
    },
  });

  // Handle vehicle selection from database
  const handleVehicleSelect = (vehicle: VehicleReference | null) => {
    setSelectedVehicle(vehicle);
    if (vehicle) {
      // Determine which CRSP value to use (current CRSP_KES has priority over CRSP2020)
      let crspValue = 0;
      let usedCrsp2020 = false;
      
      if (vehicle.crspKes) {
        crspValue = typeof vehicle.crspKes === 'string' ? parseFloat(vehicle.crspKes) : vehicle.crspKes;
        usedCrsp2020 = false;
      } else if (vehicle.crsp2020) {
        crspValue = typeof vehicle.crsp2020 === 'string' ? parseFloat(vehicle.crsp2020) : vehicle.crsp2020;
        usedCrsp2020 = true;
      }
      
      if (crspValue > 0) {
        form.setValue('vehicleValue', crspValue);
        
        // Store information about CRSP source for display
        (vehicle as any).usedCrsp2020 = usedCrsp2020;
      }
      
      // Set engine size from selected vehicle
      if (vehicle.engineCapacity) {
        form.setValue('engineSize', vehicle.engineCapacity);
        setManualEngineSize(null); // Clear manual engine size when vehicle has capacity
      } else {
        // If vehicle doesn't have engine capacity, keep the current form value or default
        // Don't override with null/undefined to avoid validation errors
        const currentEngineSize = form.getValues('engineSize');
        if (!currentEngineSize || currentEngineSize === 0) {
          form.setValue('engineSize', 1500); // Set reasonable default
        }
      }
      
      // Auto-fill fuel type if available
      if (vehicle.fuelType) {
        const fuelMap: Record<string, string> = {
          'petrol': 'petrol',
          'diesel': 'diesel',
          'electric': 'electric',
          'hybrid': 'hybrid'
        };
        const mappedFuel = fuelMap[vehicle.fuelType.toLowerCase()] || 'other';
        form.setValue('fuelType', mappedFuel as any);
      }
    }
  };

  // Handle manual engine size input
  const handleManualEngineSize = (engineSize: number | null) => {
    setManualEngineSize(engineSize);
    if (engineSize && engineSize > 0) {
      form.setValue('engineSize', engineSize);
    }
  };

  // Handle manual vehicle data with proration
  const handleManualVehicleData = (data: ManualVehicleData | null) => {
    setManualVehicleData(data);
    if (data) {
      // Use prorated CRSP value
      form.setValue("vehicleValue", data.proratedCrsp);
      form.setValue("engineSize", data.engineCapacity);
      
      // Note: Category should already be selected in Step 1

      // Show notification about proration
      toast({
        title: "Using Prorated CRSP Value",
        description: `CRSP value calculated based on ${data.referenceVehicle.make} ${data.referenceVehicle.model} reference vehicle.`,
        variant: "default",
      });
    }
    
    setCategoryConflict(null);
  };

  // Function to detect vehicle category based on engine size and fuel type (for validation only)
  const detectVehicleCategory = (engineCapacity: number, fuelType: string = 'petrol') => {
    if (engineCapacity < 1500) {
      return 'under1500cc';
    } else if (engineCapacity >= 3000 && fuelType.toLowerCase() === 'petrol') {
      return 'largeEngine';
    } else if (engineCapacity >= 2500 && fuelType.toLowerCase() === 'diesel') {
      return 'largeEngine';
    } else {
      return 'over1500cc';
    }
  };

  // Get engine size from form for validation
  const engineSize = form.watch('engineSize');
  const fuelType = form.watch('fuelType');

  // Update vehicle age when year of manufacture changes
  useEffect(() => {
    if (yearOfManufacture && yearOfManufacture > 0) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - yearOfManufacture + 1; // Always add 1 year to age calculation
      form.setValue('vehicleAge', Math.max(0, age));
    } else {
      form.setValue('vehicleAge', 0);
    }
  }, [yearOfManufacture, form]);

  // Clear selections when category changes to ensure proper filtering
  useEffect(() => {
    if (selectedCategory) {
      // Clear vehicle selections when category changes to trigger re-filtering
      setSelectedVehicle(null);
      setManualEngineSize(null);
      setManualVehicleData(null);
      setCategoryConflict(null);
      
      // Update form category
      form.setValue('vehicleCategory', selectedCategory);
      
      // Show notification about category filter
      const categoryNames: Record<string, string> = {
        'under1500cc': 'Under 1500cc',
        'over1500cc': 'Over 1500cc',
        'largeEngine': 'Large Engine',
        'electric': 'Electric',
        'schoolBus': 'School Bus',
        'primeMover': 'Prime Mover',
        'trailer': 'Trailer',
        'ambulance': 'Ambulance',
        'motorcycle': 'Motorcycle',
        'specialPurpose': 'Special Purpose',
        'heavyMachinery': 'Heavy Machinery'
      };
      
      if (selectedCategory !== 'trailer' && selectedCategory !== 'heavyMachinery') {
        toast({
          title: "Vehicle Filter Applied",
          description: `Vehicle database filtered for: ${categoryNames[selectedCategory]}`,
          variant: "default",
        });
      }
    }
  }, [selectedCategory, form, toast]);

  // Validate manual category selection against vehicle specs
  const validateCategorySelection = (category: string) => {
    if (!category) {
      setCategoryConflict(null);
      return true;
    }

    // Get vehicle data from either selected vehicle or manual entry
    const vehicleData = selectedVehicle || manualVehicleData?.referenceVehicle;
    if (!vehicleData) {
      setCategoryConflict(null);
      return true;
    }

    // CRITICAL FIX: For manual vehicle data, use the manual engine capacity, not the reference vehicle's capacity
    const engineCapacity = manualVehicleData ? manualVehicleData.engineCapacity : (vehicleData.engineCapacity || form.getValues('engineSize'));
    const fuelType = vehicleData.fuelType?.toLowerCase();
    const bodyType = vehicleData.bodyType?.toLowerCase();

    console.log('Validating category:', category, 'for vehicle:', { engineCapacity, fuelType, bodyType });

    // Enhanced conflict detection
    if (category === 'under1500cc' && engineCapacity && engineCapacity >= 1500) {
      const conflictMsg = `Vehicle has ${engineCapacity}cc engine, which is not under 1500cc`;
      setCategoryConflict(conflictMsg);
      console.log('Conflict detected:', conflictMsg);
      return false;
    }
    
    if (category === 'over1500cc' && engineCapacity) {
      if (engineCapacity < 1500) {
        const conflictMsg = `Vehicle has ${engineCapacity}cc engine, which is under 1500cc`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
      if ((fuelType === 'petrol' && engineCapacity >= 3000) || (fuelType === 'diesel' && engineCapacity >= 2500)) {
        const conflictMsg = `This ${engineCapacity}cc ${fuelType} vehicle should be categorized as "Large Engine"`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
    }
    
    if (category === 'largeEngine' && engineCapacity && fuelType) {
      if (fuelType === 'petrol' && engineCapacity < 3000) {
        const conflictMsg = `Petrol vehicles need >3000cc for Large Engine category (current: ${engineCapacity}cc)`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
      if (fuelType === 'diesel' && engineCapacity < 2500) {
        const conflictMsg = `Diesel vehicles need >2500cc for Large Engine category (current: ${engineCapacity}cc)`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
    }
    
    // CRITICAL: Electric category validation
    if (category === 'electric' && fuelType && fuelType !== 'electric') {
      const conflictMsg = `Vehicle fuel type is "${fuelType}", not electric. Cannot select Electric category for non-electric vehicles.`;
      setCategoryConflict(conflictMsg);
      console.log('ELECTRIC CONFLICT:', conflictMsg);
      return false;
    }

    // Non-electric categories with electric fuel type
    if (fuelType === 'electric' && !['electric'].includes(category)) {
      const conflictMsg = `Electric vehicle cannot be categorized as "${category}". Please select Electric category.`;
      setCategoryConflict(conflictMsg);
      console.log('ELECTRIC VEHICLE CONFLICT:', conflictMsg);
      return false;
    }
    
    // Specialized vehicle category validation
    if (category === 'motorcycle' && bodyType && !bodyType.includes('motorcycle') && !bodyType.includes('bike')) {
      const conflictMsg = `Vehicle appears to be a ${bodyType}, not a motorcycle`;
      setCategoryConflict(conflictMsg);
      console.log('Conflict detected:', conflictMsg);
      return false;
    }

    if (category === 'primeMover' && bodyType && !bodyType.toLowerCase().includes('truck') && !bodyType.toLowerCase().includes('tractor')) {
      const conflictMsg = `Prime Mover category is for heavy duty truck heads, not ${bodyType}`;
      setCategoryConflict(conflictMsg);
      console.log('Conflict detected:', conflictMsg);
      return false;
    }

    if (category === 'trailer' && bodyType && !bodyType.toLowerCase().includes('trailer')) {
      const conflictMsg = `Trailer category is for transport trailers, not ${bodyType}`;
      setCategoryConflict(conflictMsg);
      console.log('Conflict detected:', conflictMsg);
      return false;
    }

    if (category === 'heavyMachinery' && bodyType) {
      const machineryTypes = ['excavator', 'bulldozer', 'crane', 'loader', 'grader'];
      const isHeavyMachinery = machineryTypes.some(type => bodyType.toLowerCase().includes(type));
      if (!isHeavyMachinery) {
        const conflictMsg = `Heavy Machinery category is for construction equipment, not ${bodyType}`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
    }
    
    if ((category === 'schoolBus' || category === 'ambulance') && vehicleData.model) {
      const modelLower = vehicleData.model.toLowerCase();
      const bodyLower = bodyType || '';
      
      if (category === 'schoolBus' && !modelLower.includes('bus') && !bodyLower.includes('bus')) {
        const conflictMsg = `School Bus category requires a bus vehicle, not "${vehicleData.model}"`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
      if (category === 'ambulance' && !modelLower.includes('ambulance') && !bodyLower.includes('ambulance')) {
        const conflictMsg = `Ambulance category requires an ambulance vehicle, not "${vehicleData.model}"`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
    }

    // Generic vehicle validation for specialized categories
    if (['primeMover', 'trailer', 'schoolBus', 'ambulance', 'heavyMachinery'].includes(category)) {
      const normalVehicleTypes = ['hatchback', 'sedan', 'suv', 'wagon', 'coupe', 'convertible'];
      if (bodyType && normalVehicleTypes.some(type => bodyType.toLowerCase().includes(type))) {
        const conflictMsg = `"${category}" category cannot be used for regular ${bodyType} vehicles`;
        setCategoryConflict(conflictMsg);
        console.log('Conflict detected:', conflictMsg);
        return false;
      }
    }
    
    console.log('No conflicts detected for category:', category);
    setCategoryConflict(null);
    return true;
  };

  // Function to handle trailer selection
  const handleTrailerSelect = (trailer: Trailer | null) => {
    setSelectedTrailer(trailer);
    if (trailer) {
      form.setValue('vehicleValue', trailer.crspKes || 0);
      form.setValue('vehicleCategory', 'trailer');
      form.setValue('engineSize', 0); // Trailers don't have engines
    }
    
    // Clear conflicts when trailer is selected
    setCategoryConflict(null);
  };

  // Function to handle heavy machinery selection
  const handleMachinerySelect = (machinery: HeavyMachinery | null) => {
    setSelectedMachinery(machinery);
    if (machinery) {
      form.setValue('vehicleValue', machinery.crspKes || 0);
      form.setValue('vehicleCategory', 'heavyMachinery');
      form.setValue('engineSize', machinery.powerValue || 0);
    }
    
    // Clear conflicts when machinery is selected
    setCategoryConflict(null);
  };

  // Calculate duty mutation
  const calculateDutyMutation = useMutation({
    mutationFn: async (data: DutyCalculation) => {
      const response = await apiRequest("POST", "/api/calculate-duty", data);
      return response;
    },
    onSuccess: (result) => {
      setCalculationResult(result);
      toast({
        title: "Calculation Complete",
        description: "Duty calculation has been completed successfully.",
      });
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('calculation-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    onError: (error: any) => {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation Failed",
        description: error.message || "Failed to calculate duties. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DutyCalculation) => {
    calculateDutyMutation.mutate(data);
  };

  // Generate year options based on import type
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const isDirectImport = form.watch('isDirectImport');
    const maxAge = isDirectImport ? 8 : 20;
    
    return Array.from({ length: maxAge + 1 }, (_, i) => currentYear - i);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const values = form.getValues();
    const hasCategory = values.vehicleCategory && values.vehicleCategory !== "";
    const hasValue = values.vehicleValue && values.vehicleValue > 0;
    const hasEngineSize = values.engineSize !== undefined && values.engineSize >= 0; // 0 is valid for trailers
    const hasYear = yearOfManufacture > 0;
    const noConflicts = !categoryConflict;
    
    // Special handling for trailers and heavy machinery (year not required)
    const requiresYear = !['trailer', 'heavyMachinery'].includes(values.vehicleCategory);
    
    return hasCategory && hasValue && hasEngineSize && (!requiresYear || hasYear) && noConflicts;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `KES ${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Kenya Motor Vehicle Duty Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Calculate import duties and taxes for vehicles, trailers, and heavy machinery using official KRA rates and CRSP values
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Step 1: Category Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">1</span>
                      <span>Select Equipment Type</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VehicleCategorySelector 
                      value={selectedCategory}
                      onValueChange={(category) => {
                        console.log("Category selected:", category, "Current value:", selectedCategory);
                        setSelectedCategory(category);
                        validateCategorySelection(category);
                        
                        // Clear selections when switching categories
                        if (category !== 'trailer') {
                          setSelectedTrailer(null);
                        }
                        if (category !== 'heavyMachinery') {
                          setSelectedMachinery(null);
                        }
                        if (!['trailer', 'heavyMachinery'].includes(category)) {
                          setSelectedTrailer(null);
                          setSelectedMachinery(null);
                        }
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Step 2: Select/Enter Vehicle Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">2</span>
                      <span>Select/Enter Vehicle Details</span>
                    </CardTitle>
                    <CardDescription>
                      Choose from our database or enter vehicle details manually for proration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Manual Entry Prompt - Prominent */}
                    {selectedCategory && !['trailer', 'heavyMachinery'].includes(selectedCategory) && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-2 border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-purple-900 text-lg">ENTER Vehicle Manually</h4>
                            <p className="text-purple-700 text-sm">Vehicle not in database? Enter details for automatic CRSP proration</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Show appropriate selector based on category */}
                    {selectedCategory && !['trailer', 'heavyMachinery'].includes(selectedCategory) && (
                      <VehicleSelector 
                        onVehicleSelect={(vehicle, manual) => {
                          if (manual) {
                            handleManualVehicleData(manual);
                          } else {
                            handleVehicleSelect(vehicle);
                            setManualVehicleData(null);
                          }
                          validateCategorySelection(selectedCategory);
                        }}
                        categoryFilter={selectedCategory}
                        showManualEntry={true}
                      />
                    )}

                    {selectedCategory === 'trailer' && (
                      <TrailerSelector onTrailerSelect={handleTrailerSelect} />
                    )}

                    {selectedCategory === 'heavyMachinery' && (
                      <HeavyMachinerySelector onMachinerySelect={handleMachinerySelect} />
                    )}

                    {/* Display selected equipment details */}
                    {(selectedVehicle || manualVehicleData) && (
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Selected Vehicle Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Make:</span> {(selectedVehicle || manualVehicleData)?.make}
                          </div>
                          <div>
                            <span className="font-medium">Model:</span> {(selectedVehicle || manualVehicleData)?.model}
                          </div>
                          <div>
                            <span className="font-medium">Engine Size:</span> {(selectedVehicle?.engineCapacity || manualVehicleData?.engineCapacity)}cc
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">CRSP Value:</span>
                            <span>KES {((selectedVehicle?.crspKes || selectedVehicle?.crsp2020 || manualVehicleData?.proratedCrsp || 0)).toLocaleString()}</span>
                            {selectedVehicle?.crsp2020 && !selectedVehicle?.crspKes && (
                              <Badge variant="outline" className="text-orange-600 border-orange-600">
                                <Database className="w-3 h-3 mr-1" />
                                2020
                              </Badge>
                            )}
                            {manualVehicleData && (
                              <Badge variant="outline" className="text-blue-600 border-blue-600">
                                Prorated
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTrailer && (
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Selected Trailer Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Type:</span> {selectedTrailer.type}
                          </div>
                          <div>
                            <span className="font-medium">Make:</span> {selectedTrailer.make}
                          </div>
                          <div>
                            <span className="font-medium">Specifications:</span> {selectedTrailer.specifications}
                          </div>
                          <div>
                            <span className="font-medium">CRSP Value:</span> KES {selectedTrailer.crspKes?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedMachinery && (
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Selected Heavy Machinery Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Make:</span> {selectedMachinery.make}
                          </div>
                          <div>
                            <span className="font-medium">Model:</span> {selectedMachinery.model}
                          </div>
                          <div>
                            <span className="font-medium">Category:</span> {selectedMachinery.category}
                          </div>
                          <div>
                            <span className="font-medium">Power:</span> {selectedMachinery.powerSpec}
                          </div>
                          <div>
                            <span className="font-medium">CRSP Value:</span> KES {selectedMachinery.crspKes?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional Information - Year and Import Type */}
                    <div className="space-y-6 pt-6 border-t">
                      <h4 className="text-lg font-semibold text-gray-900">Additional Details</h4>
                      
                      {/* Year of Manufacture - Not required for trailers and heavy machinery */}
                      {!['trailer', 'heavyMachinery'].includes(selectedCategory) && (
                        <div>
                          <Label htmlFor="year" className="text-base font-semibold text-gray-900">
                            Year of Manufacture *
                          </Label>
                          <Select 
                            value={yearOfManufacture > 0 ? yearOfManufacture.toString() : ""} 
                            onValueChange={(value) => setYearOfManufacture(parseInt(value))}
                          >
                            <SelectTrigger className="w-full mt-2">
                              <SelectValue placeholder="Select year of manufacture" />
                            </SelectTrigger>
                            <SelectContent>
                              {generateYearOptions().map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Import Type */}
                      <FormField
                        control={form.control}
                        name="isDirectImport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold text-gray-900">
                              Import Type *
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => field.onChange(value === "direct")}
                                value={field.value ? "direct" : "previously_registered"}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="direct" id="direct" />
                                  <Label htmlFor="direct" className="text-sm cursor-pointer">
                                    Direct Import (vehicle imported directly from abroad)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="previously_registered" id="previously_registered" />
                                  <Label htmlFor="previously_registered" className="text-sm cursor-pointer">
                                    Previously Registered (vehicle already registered in Kenya)
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Category conflict warning */}
                    {categoryConflict && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          <strong>Category Conflict:</strong> {categoryConflict}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                    disabled={!isFormValid() || calculateDutyMutation.isPending}
                  >
                    {calculateDutyMutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate Duty
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Sidebar - Calculation Results */}
          <div className="space-y-6">
            {calculationResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Results</span>
                    <Button
                      onClick={() => generateDutyCalculationPDF(calculationResult, selectedVehicle || manualVehicleData || selectedTrailer || selectedMachinery as any)}
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-600 hover:bg-purple-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Vehicle Value and Depreciation */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 text-gray-700">Vehicle Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>CRSP Value:</span>
                          <span className="font-medium">{formatCurrency(calculationResult.currentRetailPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Depreciation:</span>
                          <span className="font-medium">{calculationResult.depreciationRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Customs Value:</span>
                          <span className="font-medium">{formatCurrency(calculationResult.customsValue)}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Tax Breakdown */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 text-gray-700">Tax Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Import Duty:</span>
                          <span className="font-medium">{formatCurrency(calculationResult.importDuty)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Excise Duty:</span>
                          <span className="font-medium">{formatCurrency(calculationResult.exciseDuty)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VAT (16%):</span>
                          <span className="font-medium">{formatCurrency(calculationResult.vat)}</span>
                        </div>
                        {calculationResult.rdl > 0 && (
                          <div className="flex justify-between">
                            <span>RDL (2%):</span>
                            <span className="font-medium">{formatCurrency(calculationResult.rdl)}</span>
                          </div>
                        )}
                        {calculationResult.idfFees > 0 && (
                          <div className="flex justify-between">
                            <span>IDF (2.5%):</span>
                            <span className="font-medium">{formatCurrency(calculationResult.idfFees)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Total Duty Payable */}
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Payable:</span>
                        <span className="text-purple-600">{formatCurrency(calculationResult.totalPayable)}</span>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-semibold mb-3 text-gray-700">Details</h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p><strong>Category:</strong> {vehicleCategoryInfo[form.getValues('vehicleCategory') as keyof typeof vehicleCategoryInfo]?.label}</p>
                        <p><strong>Engine:</strong> {form.getValues('engineSize')}cc</p>
                        <p><strong>Age:</strong> {form.getValues('vehicleAge')} years</p>
                        <p><strong>Type:</strong> {form.getValues('isDirectImport') ? 'Direct Import' : 'Previously Registered'}</p>
                        {calculationResult.usedCrsp2020 && (
                          <div className="flex items-center space-x-2 text-orange-600 mt-2">
                            <Database className="w-3 h-3" />
                            <span className="text-xs">Using CRSP 2020 values</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}