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

  // Watch for category changes and validate
  const currentCategory = form.watch('vehicleCategory');
  
  useEffect(() => {
    console.log('Category changed:', currentCategory, 'validating...');
    validateCategorySelection(currentCategory);
  }, [currentCategory, selectedVehicle, selectedTrailer, selectedMachinery, manualVehicleData]);

  // Additional effect to validate when vehicle is selected
  useEffect(() => {
    if (selectedVehicle || selectedTrailer || selectedMachinery) {
      console.log('Vehicle/equipment selected, re-validating category...');
      validateCategorySelection(currentCategory);
    }
  }, [selectedVehicle, selectedTrailer, selectedMachinery, currentCategory]);

  // Watch import type changes
  const isDirectImport = form.watch('isDirectImport');

  // Reset year when switching import type if year is out of range
  useEffect(() => {
    if (yearOfManufacture > 0) {
      const currentYear = new Date().getFullYear();
      const minAllowedYear = currentYear - (isDirectImport ? 8 : 20);
      
      if (yearOfManufacture < minAllowedYear) {
        setYearOfManufacture(0); // Reset to unselected state
      }
    }
  }, [isDirectImport, yearOfManufacture]);

  const calculateDutyMutation = useMutation({
    mutationFn: async (data: DutyCalculation) => {
      const response = await apiRequest("POST", "/api/calculate-duty", data);
      return response.json();
    },
    onSuccess: (result: DutyResult) => {
      // Check if we used 2020 CRSP and update the result
      if (selectedVehicle && (selectedVehicle as any).usedCrsp2020) {
        result.usedCrsp2020 = true;
      }
      
      setCalculationResult(result);
      
      // Show appropriate toast based on CRSP source
      const baseMessage = `Total payable: KES ${result.totalPayable.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (includes estimated registration fees)`;
      const crspMessage = result.usedCrsp2020 ? " - Based on 2020 CRSP values" : "";
      
      toast({
        title: "Calculation Complete",
        description: baseMessage + crspMessage,
      });
    },
    onError: (error) => {
      toast({
        title: "Calculation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DutyCalculation) => {
    // Validate all required fields are selected based on category
    const currentCategory = form.getValues('vehicleCategory');
    
    if (currentCategory === 'trailer') {
      if (!selectedTrailer) {
        toast({
          title: "Trailer Required",
          description: "Please select a trailer from the database",
          variant: "destructive",
        });
        return;
      }
    } else if (currentCategory === 'heavyMachinery') {
      if (!selectedMachinery) {
        toast({
          title: "Heavy Machinery Required",
          description: "Please select heavy machinery from the database",
          variant: "destructive",
        });
        return;
      }
    } else {
      // Regular vehicle categories
      if (!selectedVehicle && !manualVehicleData) {
        toast({
          title: "Vehicle Required",
          description: "Please select a vehicle from the database or use manual entry",
          variant: "destructive",
        });
        return;
      }
    }

    // Year validation (only for regular vehicles, not for trailers/machinery that may not need it)
    if (currentCategory !== 'trailer' && currentCategory !== 'heavyMachinery') {
      if (!yearOfManufacture || yearOfManufacture === 0) {
        toast({
          title: "Year Required", 
          description: "Please select the year of manufacture",
          variant: "destructive",
        });
        return;
      }
    }

    // Category validation is now handled in the main validation above

    // Check for category conflicts before submitting
    // CRITICAL: Enhanced category conflict validation - prevent submission with conflicts
    console.log('Checking for conflicts before submission:', { categoryConflict, currentCategory: form.getValues('vehicleCategory') });
    
    // Re-validate the current selection to catch any missed conflicts
    const isValid = validateCategorySelection(form.getValues('vehicleCategory'));
    
    if (categoryConflict || !isValid) {
      console.log('BLOCKING SUBMISSION due to category conflict:', categoryConflict);
      toast({
        title: "Category Conflict Detected",
        description: categoryConflict || "Selected category conflicts with vehicle specifications. Please choose the correct category.",
        variant: "destructive",
      });
      return;
    }

    // Additional validation: ensure category is selected
    if (!currentCategory) {
      toast({
        title: "Category Required",
        description: "Please select a vehicle category.",
        variant: "destructive",
      });
      return;
    }

    // Add fuel type from selected vehicle
    const fuelType = selectedVehicle?.fuelType?.toLowerCase();
    const validFuelTypes = ["petrol", "diesel", "electric", "hybrid", "other"];
    
    const submissionData = {
      ...data,
      fuelType: fuelType && validFuelTypes.includes(fuelType) ? fuelType as "petrol" | "diesel" | "electric" | "hybrid" | "other" : undefined,
      vehicleReference: selectedVehicle ? {
        make: selectedVehicle.make,
        model: selectedVehicle.model,
        engineCapacity: selectedVehicle.engineCapacity,
        bodyType: selectedVehicle.bodyType,
        fuelType: selectedVehicle.fuelType
      } : manualVehicleData ? {
        make: manualVehicleData.make,
        model: manualVehicleData.model,
        engineCapacity: manualVehicleData.engineCapacity,
        bodyType: manualVehicleData.referenceVehicle.bodyType || "",
        fuelType: manualVehicleData.referenceVehicle.fuelType || "",
      } : selectedTrailer ? {
        make: selectedTrailer.make,
        model: selectedTrailer.description || selectedTrailer.type,
        engineCapacity: 0, // Trailers don't have engines
        bodyType: selectedTrailer.type,
        fuelType: "other",
      } : selectedMachinery ? {
        make: selectedMachinery.make,
        model: selectedMachinery.model,
        engineCapacity: selectedMachinery.powerValue || 0, // Use power value as "engine capacity"
        bodyType: selectedMachinery.category,
        fuelType: "diesel", // Most heavy machinery is diesel
      } : undefined
    };
    calculateDutyMutation.mutate(submissionData);
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Duty Calculator</h1>
              <p className="text-gray-600">Calculate Kenya import duties and taxes accurately</p>
            </div>
            <Badge variant="secondary" className="bg-cyan-100 text-purple-800">
              <Shield className="h-3 w-3 mr-1" />
              KRA Official Rates
            </Badge>
          </div>
        </div>
      </div>



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Vehicle Information</CardTitle>
                <p className="text-gray-600">Select your vehicle details to calculate applicable duties and taxes</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* All Selection Fields Grouped Together */}
                    <div className="space-y-6 p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-purple-600" />
                          <h3 className="text-lg font-semibold text-purple-900">Vehicle Selection</h3>
                        </div>
                        <p className="text-sm text-purple-700">All fields required <span className="text-red-500">*</span></p>
                      </div>
                      
                      {/* Step 1: Category Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2">Step 1: Vehicle Category <span className="text-red-500">*</span></Label>
                        <VehicleCategorySelector 
                          value={selectedCategory}
                          onValueChange={(category) => {
                            setSelectedCategory(category);
                            form.setValue('vehicleCategory', category);
                            // Reset other selections when category changes
                            setSelectedVehicle(null);
                            setSelectedTrailer(null);
                            setSelectedMachinery(null);
                            setManualVehicleData(null);
                            setYearOfManufacture(0);
                          }}
                          disabled={false}
                        />
                      </div>

                      {selectedCategory && (
                        <>
                          {/* Import Type - Second Step */}
                          <FormField
                            control={form.control}
                            name="isDirectImport"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 mb-2">Step 2: Import Type</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    value={field.value ? "direct" : "registered"}
                                    onValueChange={(value) => field.onChange(value === "direct")}
                                    className="flex space-x-4"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="direct" id="direct" />
                                      <Label htmlFor="direct">Direct Import</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="registered" id="registered" />
                                      <Label htmlFor="registered">Previously Registered</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormDescription>
                                  Direct imports include RDL and IDF fees • Year range: {new Date().getFullYear() - 8} - {new Date().getFullYear()}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Vehicle Selection - Third Step */}
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2">
                              Step 3: Select {selectedCategory === "trailer" ? "Trailer" : selectedCategory === "heavyMachinery" ? "Equipment" : "Vehicle"} <span className="text-red-500">*</span>
                            </Label>
                            
                            {selectedCategory === "trailer" ? (
                              <TrailerSelector
                                onTrailerSelect={(trailer) => {
                                  setSelectedTrailer(trailer);
                                  if (trailer) {
                                    form.setValue('vehicleValue', Number(trailer.crspKes));
                                  }
                                }}
                              />
                            ) : selectedCategory === "heavyMachinery" ? (
                              <HeavyMachinerySelector
                                onMachinerySelect={(machinery) => {
                                  setSelectedMachinery(machinery);
                                  if (machinery) {
                                    form.setValue('vehicleValue', Number(machinery.crspKes));
                                  }
                                }}
                              />
                            ) : (
                              <>
                                
                                <VehicleSelector 
                                  onVehicleSelect={handleVehicleSelect} 
                                  onManualEngineSize={handleManualEngineSize}
                                  onManualVehicleData={handleManualVehicleData}
                                  categoryFilter={selectedCategory}
                                />
                              </>
                            )}
                          </div>

                          {/* Year of Manufacture - Step 4 */}
                          {(selectedVehicle || manualVehicleData || selectedTrailer || selectedMachinery) && (
                            <div>
                              <Label htmlFor="yearOfManufacture" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                                Step 4: Year of Manufacture <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={yearOfManufacture === 0 ? "" : yearOfManufacture.toString()}
                                onValueChange={(value) => setYearOfManufacture(Number(value))}
                              >
                                <SelectTrigger id="yearOfManufacture">
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {(() => {
                                    const currentYear = new Date().getFullYear();
                                    const isDirectImport = form.watch('isDirectImport');
                                    const yearRange = isDirectImport ? 8 : 20;
                                    
                                    return Array.from({ length: yearRange }, (_, i) => currentYear - yearRange + 1 + i).map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ));
                                  })()}
                                </SelectContent>
                              </Select>
                              {yearOfManufacture > 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Vehicle age: {form.watch('vehicleAge')} year{form.watch('vehicleAge') !== 1 ? 's' : ''} (for duty calculation)
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}

                      {/* Selected Vehicle CRSP Display */}
                      {selectedVehicle && (selectedVehicle.crspKes || selectedVehicle.crsp2020) && (
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <DollarSign className="h-5 w-5 text-purple-600 mt-0.5" />
                            <div className="w-full">
                              <p className="text-sm font-medium text-purple-900">
                                Current Retail Selling Price (CRSP)
                                {(selectedVehicle as any).usedCrsp2020 && (
                                  <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                    2020 CRSP
                                  </span>
                                )}
                              </p>
                              <p className="text-xl font-bold text-purple-800 mt-1">
                                KES {form.watch('vehicleValue')?.toLocaleString('en-KE') || '0'}
                              </p>
                              <p className="text-xs text-purple-700 mt-1">
                                {selectedVehicle.make} {selectedVehicle.model}
                                {(selectedVehicle as any).usedCrsp2020 && (
                                  <span className="block text-orange-700 font-medium mt-1">
                                    ⚠️ Using 2020 CRSP value - current pricing may differ
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Discontinuation Warning - Only for Direct Import */}
                      {selectedVehicle && selectedVehicle.discontinuationYear && form.watch('importType') === 'direct' && (
                        (() => {
                          const currentYear = new Date().getFullYear();
                          const yearsSinceDiscontinuation = currentYear - selectedVehicle.discontinuationYear;
                          const isImportRestricted = yearsSinceDiscontinuation > 8;
                          
                          return (
                            <Alert variant={isImportRestricted ? "destructive" : "default"} className={isImportRestricted ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"}>
                              <AlertCircle className={`h-4 w-4 ${isImportRestricted ? "text-red-600" : "text-orange-600"}`} />
                              <AlertDescription className={isImportRestricted ? "text-red-800" : "text-orange-800"}>
                                {isImportRestricted ? (
                                  <div>
                                    <strong className="font-semibold">THIS MODEL WAS DISCONTINUED IN {selectedVehicle.discontinuationYear} AND CANNOT BE IMPORTED INTO KENYA</strong>
                                    <p className="mt-1 text-sm">This vehicle was discontinued {yearsSinceDiscontinuation} years ago, exceeding the 8-year import limit for direct imports.</p>
                                  </div>
                                ) : (
                                  <div>
                                    <strong className="font-semibold">Vehicle Discontinued Notice</strong>
                                    <p className="mt-1 text-sm">This model was discontinued in {selectedVehicle.discontinuationYear} ({yearsSinceDiscontinuation} years ago). It can still be imported but may have limited parts availability.</p>
                                  </div>
                                )}
                              </AlertDescription>
                            </Alert>
                          );
                        })()
                      )}
                    </div>



                    {/* Display Vehicle Info from Database */}
                    {selectedVehicle && (selectedVehicle.fuelType || selectedVehicle.bodyType) && (
                      <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Info className="h-5 w-5 text-cyan-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-cyan-900">Vehicle Details from Database</p>
                            {selectedVehicle.fuelType && (
                              <p className="text-sm text-cyan-700 mt-1">
                                Fuel Type: <span className="font-semibold capitalize">{selectedVehicle.fuelType}</span>
                              </p>
                            )}
                            {selectedVehicle.bodyType && (
                              <p className="text-sm text-cyan-700">
                                Body Type: <span className="font-semibold">{selectedVehicle.bodyType}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={
                        calculateDutyMutation.isPending || 
                        (selectedVehicle?.discontinuationYear && form.watch('importType') === 'direct' && (new Date().getFullYear() - selectedVehicle.discontinuationYear) > 8) ||
                        categoryConflict
                      }
                    >
                      {calculateDutyMutation.isPending ? (
                        <>Calculating...</>
                      ) : selectedVehicle?.discontinuationYear && form.watch('importType') === 'direct' && (new Date().getFullYear() - selectedVehicle.discontinuationYear) > 8 ? (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Cannot Import (Discontinued)
                        </>
                      ) : (
                        <>
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculate Duties & Taxes
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {calculationResult ? (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Calculation Results</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      title="Download PDF Report"
                      onClick={() => {
                        generateDutyCalculationPDF(
                          calculationResult,
                          selectedVehicle,
                          yearOfManufacture,
                          form.getValues("engineSize"),
                          form.getValues("isDirectImport")
                        );
                        toast({
                          title: "PDF Downloaded",
                          description: "Your duty calculation report has been downloaded.",
                        });
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary Card */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800">Total Amount Payable</span>
                      <Receipt className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {formatCurrency(calculationResult.totalPayable)}
                    </div>
                    <p className="text-xs text-purple-700 mt-1">
                      Includes estimated registration fees
                    </p>
                    {selectedVehicle && (
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-xs text-purple-700">
                          Calculated for: <span className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Value Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Retail Price:</span>
                      <span className="font-medium">
                        {formatCurrency(calculationResult.currentRetailPrice)}
                        {calculationResult.usedCrsp2020 && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            2020 CRSP
                          </span>
                        )}
                      </span>
                    </div>
                    {calculationResult.usedCrsp2020 && (
                      <div className="text-xs text-orange-700 mt-2 p-2 bg-orange-50 rounded border-l-4 border-orange-300">
                        ⚠️ Calculation based on 2020 CRSP values - current market prices may differ significantly
                      </div>
                    )}
                    {calculationResult.depreciationRate > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depreciation ({(calculationResult.depreciationRate * 100).toFixed(0)}%):</span>
                          <span className="font-medium text-red-600">
                            -{formatCurrency(calculationResult.currentRetailPrice - calculationResult.depreciatedPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depreciated Price:</span>
                          <span className="font-medium">{formatCurrency(calculationResult.depreciatedPrice)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customs Value:</span>
                      <span className="font-medium">{formatCurrency(calculationResult.customsValue)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900">Tax Breakdown</h4>
                    {calculationResult.breakdown.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${item.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.amount < 0 ? '-' : ''}{formatCurrency(Math.abs(item.amount))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info Alert */}
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-xs text-blue-800">
                      Calculations are based on current Kenya Revenue Authority rates. 
                      Additional fees may apply during registration.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Enter vehicle details and click calculate to see results</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information Card */}
            <Card className="shadow-sm mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-700">Direct Imports:</strong>
                  <p className="mt-1">Include Import Duty, Excise Duty, VAT, Railway Development Levy (RDL), and Import Declaration Fee (IDF).</p>
                </div>
                <div>
                  <strong className="text-gray-700">Previously Registered:</strong>
                  <p className="mt-1">Include Import Duty, Excise Duty, and VAT only.</p>
                </div>
                <div>
                  <strong className="text-gray-700">Depreciation:</strong>
                  <p className="mt-1">Applied based on vehicle age using official KRA rates.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}