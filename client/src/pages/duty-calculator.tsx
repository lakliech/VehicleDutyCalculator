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
import gariyangu from "@assets/gariyangu_1751901637375.png";
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
  const [useManualCategory, setUseManualCategory] = useState<boolean>(false);
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
      
      // Auto-detect category based on engine size
      if (!useManualCategory) {
        detectVehicleCategory(data.engineCapacity, 'petrol'); // Default to petrol for manual entries
      }

      // Show notification about proration
      toast({
        title: "Using Prorated CRSP Value",
        description: `CRSP value calculated based on ${data.referenceVehicle.make} ${data.referenceVehicle.model} reference vehicle.`,
        variant: "default",
      });
    }
    
    setCategoryConflict(null);
  };

  // Function to detect vehicle category based on engine size and fuel type
  const detectVehicleCategory = (engineCapacity: number, fuelType: string = 'petrol') => {
    if (engineCapacity < 1500) {
      form.setValue('vehicleCategory', 'under1500cc');
    } else if (engineCapacity >= 3000 && fuelType.toLowerCase() === 'petrol') {
      form.setValue('vehicleCategory', 'largeEngine');
    } else if (engineCapacity >= 2500 && fuelType.toLowerCase() === 'diesel') {
      form.setValue('vehicleCategory', 'largeEngine');
    } else {
      form.setValue('vehicleCategory', 'over1500cc');
    }
  };

  // Watch engine size changes to auto-update vehicle category (only when not using manual selection)
  const engineSize = form.watch('engineSize');
  
  useEffect(() => {
    if (engineSize && !useManualCategory) {
      // Auto-detect vehicle category based on engine size and fuel type from selected vehicle
      const vehicleFuelType = selectedVehicle?.fuelType?.toLowerCase() || manualVehicleData?.referenceVehicle.fuelType?.toLowerCase() || 'petrol';
      detectVehicleCategory(engineSize, vehicleFuelType);
    }
  }, [engineSize, selectedVehicle, manualVehicleData, form, useManualCategory]);

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

  // Validate manual category selection against vehicle specs
  const validateCategorySelection = (category: string) => {
    if (!useManualCategory || !category) {
      setCategoryConflict(null);
      return true;
    }

    // Get vehicle data from either selected vehicle or manual entry
    const vehicleData = selectedVehicle || manualVehicleData?.referenceVehicle;
    if (!vehicleData) {
      setCategoryConflict(null);
      return true;
    }

    const engineCapacity = vehicleData.engineCapacity || form.getValues('engineSize');
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

  // Watch for manual category changes
  const manualCategory = form.watch('vehicleCategory');
  
  useEffect(() => {
    if (useManualCategory) {
      console.log('Manual category changed:', manualCategory, 'validating...');
      validateCategorySelection(manualCategory);
    } else {
      // Clear conflict when switching to auto-detection
      setCategoryConflict(null);
      
      // Force auto-detection when switching from manual mode
      if (engineSize) {
        const vehicleFuelType = selectedVehicle?.fuelType?.toLowerCase() || manualVehicleData?.referenceVehicle.fuelType?.toLowerCase() || 'petrol';
        detectVehicleCategory(engineSize, vehicleFuelType);
      }
    }
  }, [manualCategory, useManualCategory, selectedVehicle, engineSize, manualVehicleData]);

  // Additional effect to validate when vehicle is selected while in manual mode
  useEffect(() => {
    if (useManualCategory && selectedVehicle) {
      console.log('Vehicle selected while in manual mode, re-validating category...');
      validateCategorySelection(manualCategory);
    }
  }, [selectedVehicle, useManualCategory, manualCategory]);

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
    // Validate all required fields are selected
    if (!selectedVehicle) {
      toast({
        title: "Vehicle Required",
        description: "Please select a vehicle from the database",
        variant: "destructive",
      });
      return;
    }

    if (!yearOfManufacture || yearOfManufacture === 0) {
      toast({
        title: "Year Required", 
        description: "Please select the year of manufacture",
        variant: "destructive",
      });
      return;
    }

    if (useManualCategory && !data.vehicleCategory) {
      toast({
        title: "Category Required",
        description: "Please select a vehicle category",
        variant: "destructive",
      });
      return;
    }

    // Check for category conflicts before submitting
    // CRITICAL: Enhanced category conflict validation - prevent submission with conflicts
    if (useManualCategory) {
      console.log('Checking for conflicts before submission:', { categoryConflict, currentCategory: form.getValues('vehicleCategory') });
      
      // Re-validate the current selection to catch any missed conflicts
      const isValid = validateCategorySelection(form.getValues('vehicleCategory'));
      
      if (categoryConflict || !isValid) {
        console.log('BLOCKING SUBMISSION due to category conflict:', categoryConflict);
        toast({
          title: "Category Conflict Detected",
          description: categoryConflict || "Selected category conflicts with vehicle specifications. Please choose the correct category or switch to auto-detection.",
          variant: "destructive",
        });
        return;
      }
    }

    // Additional validation: ensure category is selected
    const currentCategory = form.getValues('vehicleCategory');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-2">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <img 
                src={gariyangu} 
                alt="Gariyangu Logo" 
                className="h-10 sm:h-12 w-auto"
              />
              <div className="hidden sm:block border-l border-purple-300 pl-6">
                <h1 className="text-xl font-semibold text-purple-700">Motor Vehicle Duty Calculator</h1>
                <p className="text-sm text-cyan-600">All About Cars - Calculate Kenya import duties and taxes</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-semibold text-purple-700">Duty Calculator</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-cyan-100 text-purple-800">
                <Shield className="h-3 w-3 mr-1" />
                KRA Official Rates
              </Badge>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Database className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-medium">
                Do you wish to import a car from Japan/UK/South Africa/Dubai/Australia/Singapore/Thailand? I'm your plug!
              </p>
              <p className="text-xs sm:text-sm text-cyan-100 mt-1">
                Professional car import services with competitive rates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold">Call or WhatsApp:</span>
              <a
                href="https://wa.me/254736272719?text=Hi%2C%20I%27m%20interested%20in%20importing%20a%20car.%20Can%20you%20help%20me%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2c-5.5 0-9.973 4.473-9.973 9.973 0 1.756.459 3.406 1.263 4.832l-1.341 4.89 5.011-1.314a9.924 9.924 0 004.04.835c5.5 0 9.973-4.473 9.973-9.973S17.517 2 12.017 2zm5.941 14.665c-.254.714-1.267 1.315-2.083 1.484-.563.117-1.297.106-2.089-.276-1.372-.662-2.854-1.815-3.93-3.246-1.077-1.431-1.789-3.13-1.789-4.89 0-1.364.553-2.6 1.45-3.5.258-.258.564-.387.904-.387.225 0 .45.008.647.016.209.009.488-.079.765.583.291.696.983 2.4 1.071 2.576.087.176.146.38.029.614-.117.234-.176.38-.351.586-.176.206-.369.46-.527.62-.175.176-.358.366-.154.717.204.351.906 1.495 1.944 2.42 1.336 1.189 2.462 1.557 2.812 1.732.351.176.556.147.759-.088.204-.234.87-.871 1.102-1.17.234-.3.468-.251.789-.15.322.1 2.038 0.961 2.389 1.136.35.176.584.263.671.41.087.146.087.844-.167 1.558z"/>
                </svg>
                0736 272719
              </a>
            </div>
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
                                <div className="p-3 bg-white rounded-md mb-3">
                                  <p className="text-sm text-gray-600">
                                    Select from over 2,800 vehicles with current market prices
                                  </p>
                                </div>
                                <VehicleSelector 
                                  onVehicleSelect={handleVehicleSelect} 
                                  onManualEngineSize={handleManualEngineSize}
                                  onManualVehicleData={handleManualVehicleData}
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
                                    
                                    return Array.from({ length: yearRange }, (_, i) => currentYear - i).map((year) => (
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

                    {/* Category Selection Toggle */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="manual-category"
                            checked={useManualCategory}
                            onCheckedChange={setUseManualCategory}
                          />
                          <Label htmlFor="manual-category" className="text-sm font-medium">
                            Manual Category Selection
                          </Label>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {useManualCategory ? "Manual" : "Auto-detect"}
                        </Badge>
                      </div>
                      
                      {useManualCategory ? (
                        <>
                          <VehicleCategorySelector
                            value={form.watch('vehicleCategory')}
                            onValueChange={(value) => form.setValue('vehicleCategory', value as any)}
                            disabled={false}
                          />
                          
                          {/* Category Conflict Warning */}
                          {categoryConflict && (
                            <Alert variant="destructive" className="border-red-300 bg-red-50">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-red-800">
                                <strong>Category Conflict:</strong> {categoryConflict}
                                <div className="mt-2 text-sm">
                                  Switch to auto-detection or select the appropriate category for this vehicle.
                                </div>
                              </AlertDescription>
                            </Alert>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                          Category will be automatically detected based on engine size and fuel type from your selected vehicle.
                        </div>
                      )}
                    </div>

                    {/* Auto-detected Category Display */}
                    {engineSize && !useManualCategory && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Auto-detected Category</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Based on {engineSize}cc engine: <span className="font-semibold">{vehicleCategoryInfo[form.watch('vehicleCategory')].label}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

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
                        (useManualCategory && categoryConflict)
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