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
import { dutyCalculationSchema, type DutyCalculation, type DutyResult, type VehicleReference } from "@shared/schema";
import { VehicleSelector } from "@/components/vehicle-selector";
import { VehicleCategorySelector } from "@/components/vehicle-category-selector";
import nexaLogo from "@assets/nexalogo_1751834730316.png";
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
    if (vehicle && vehicle.crspKes) {
      // Update form with vehicle data
      const crspValue = typeof vehicle.crspKes === 'string' ? parseFloat(vehicle.crspKes) : vehicle.crspKes;
      form.setValue('vehicleValue', crspValue);
      
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

  // Watch engine size changes to auto-update vehicle category (only when not using manual selection)
  const engineSize = form.watch('engineSize');
  
  useEffect(() => {
    if (engineSize && !useManualCategory) {
      // Auto-detect vehicle category based on engine size and fuel type from selected vehicle
      const vehicleFuelType = selectedVehicle?.fuelType?.toLowerCase();
      
      if (engineSize < 1500) {
        form.setValue('vehicleCategory', 'under1500cc');
      } else if (engineSize >= 3000 && vehicleFuelType === 'petrol') {
        form.setValue('vehicleCategory', 'largeEngine');
      } else if (engineSize >= 2500 && vehicleFuelType === 'diesel') {
        form.setValue('vehicleCategory', 'largeEngine');
      } else {
        form.setValue('vehicleCategory', 'over1500cc');
      }
    }
  }, [engineSize, selectedVehicle, form, useManualCategory]);

  // Update vehicle age when year of manufacture changes
  useEffect(() => {
    if (yearOfManufacture && yearOfManufacture > 0) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - yearOfManufacture;
      form.setValue('vehicleAge', Math.max(0, age));
    } else {
      form.setValue('vehicleAge', 0);
    }
  }, [yearOfManufacture, form]);

  // Validate manual category selection against vehicle specs
  const validateCategorySelection = (category: string) => {
    if (!selectedVehicle || !useManualCategory) {
      setCategoryConflict(null);
      return true;
    }

    const engineCapacity = selectedVehicle.engineCapacity;
    const fuelType = selectedVehicle.fuelType?.toLowerCase();
    const bodyType = selectedVehicle.bodyType?.toLowerCase();

    // Check for conflicts
    if (category === 'under1500cc' && engineCapacity && engineCapacity >= 1500) {
      setCategoryConflict(`Vehicle has ${engineCapacity}cc engine, which is not under 1500cc`);
      return false;
    }
    
    if (category === 'over1500cc' && engineCapacity) {
      if (engineCapacity < 1500) {
        setCategoryConflict(`Vehicle has ${engineCapacity}cc engine, which is under 1500cc`);
        return false;
      }
      if ((fuelType === 'petrol' && engineCapacity >= 3000) || (fuelType === 'diesel' && engineCapacity >= 2500)) {
        setCategoryConflict(`This ${engineCapacity}cc ${fuelType} vehicle should be categorized as "Large Engine"`);
        return false;
      }
    }
    
    if (category === 'largeEngine' && engineCapacity) {
      if (fuelType === 'petrol' && engineCapacity < 3000) {
        setCategoryConflict(`Petrol vehicles need >3000cc for Large Engine category (current: ${engineCapacity}cc)`);
        return false;
      }
      if (fuelType === 'diesel' && engineCapacity < 2500) {
        setCategoryConflict(`Diesel vehicles need >2500cc for Large Engine category (current: ${engineCapacity}cc)`);
        return false;
      }
    }
    
    if (category === 'electric' && fuelType && fuelType !== 'electric') {
      setCategoryConflict(`Vehicle fuel type is ${fuelType}, not electric`);
      return false;
    }
    
    if (category === 'motorcycle' && bodyType && !bodyType.includes('motorcycle') && !bodyType.includes('bike')) {
      setCategoryConflict(`Vehicle appears to be a ${bodyType}, not a motorcycle`);
      return false;
    }
    
    if ((category === 'schoolBus' || category === 'ambulance') && selectedVehicle.model) {
      const modelLower = selectedVehicle.model.toLowerCase();
      if (category === 'schoolBus' && !modelLower.includes('bus')) {
        setCategoryConflict(`Vehicle model "${selectedVehicle.model}" doesn't appear to be a bus`);
        return false;
      }
      if (category === 'ambulance' && !modelLower.includes('ambulance')) {
        setCategoryConflict(`Vehicle model "${selectedVehicle.model}" doesn't appear to be an ambulance`);
        return false;
      }
    }
    
    setCategoryConflict(null);
    return true;
  };

  // Watch for manual category changes
  const manualCategory = form.watch('vehicleCategory');
  
  useEffect(() => {
    if (useManualCategory) {
      validateCategorySelection(manualCategory);
    } else {
      // Clear conflict when switching to auto-detection
      setCategoryConflict(null);
    }
  }, [manualCategory, useManualCategory, selectedVehicle]);

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
      setCalculationResult(result);
      toast({
        title: "Calculation Complete",
        description: `Total payable: KES ${result.totalPayable.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (includes estimated registration fees)`,
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
    if (useManualCategory && categoryConflict) {
      toast({
        title: "Category Conflict",
        description: categoryConflict,
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
      } : undefined
    };
    calculateDutyMutation.mutate(submissionData);
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-2">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <img 
                src={nexaLogo} 
                alt="Nexa Logo" 
                className="h-10 sm:h-12 w-auto"
              />
              <div className="hidden sm:block border-l border-gray-300 pl-6">
                <h1 className="text-xl font-semibold text-gray-900">Motor Vehicle Duty Calculator</h1>
                <p className="text-sm text-gray-500">Calculate Kenya import duties and taxes</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-semibold text-gray-900">Duty Calculator</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                KRA Official Rates
              </Badge>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
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
                    <div className="space-y-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Vehicle Selection</h3>
                        </div>
                        <p className="text-sm text-gray-500">All fields required <span className="text-red-500">*</span></p>
                      </div>
                      
                      {/* Import Type - First Step */}
                      <FormField
                        control={form.control}
                        name="isDirectImport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 mb-2">Step 1: Vehicle Locale</FormLabel>
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

                      {/* Vehicle Selection from Database */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2">Step 2: Select Vehicle <span className="text-red-500">*</span></Label>
                        <div className="p-3 bg-white rounded-md mb-3">
                          <p className="text-sm text-gray-600">
                            Select from over 2,800 vehicles with current market prices
                          </p>
                        </div>
                        <VehicleSelector 
                          onVehicleSelect={handleVehicleSelect} 
                          onManualEngineSize={handleManualEngineSize}
                        />
                      </div>

                      {/* Year of Manufacture */}
                      <div>
                        <Label htmlFor="yearOfManufacture" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 mr-2 text-green-600" />
                          Step 3: Year of Manufacture <span className="text-red-500">*</span>
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
                            Vehicle age: {form.watch('vehicleAge')} year{form.watch('vehicleAge') !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      {/* Selected Vehicle CRSP Display */}
                      {selectedVehicle && selectedVehicle.crspKes && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                            <div className="w-full">
                              <p className="text-sm font-medium text-green-900">Current Retail Selling Price (CRSP)</p>
                              <p className="text-xl font-bold text-green-800 mt-1">
                                KES {form.watch('vehicleValue')?.toLocaleString('en-KE') || '0'}
                              </p>
                              <p className="text-xs text-green-700 mt-1">
                                {selectedVehicle.make} {selectedVehicle.model}
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
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Category Conflict:</strong> {categoryConflict}
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
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Vehicle Details from Database</p>
                            {selectedVehicle.fuelType && (
                              <p className="text-sm text-blue-700 mt-1">
                                Fuel Type: <span className="font-semibold capitalize">{selectedVehicle.fuelType}</span>
                              </p>
                            )}
                            {selectedVehicle.bodyType && (
                              <p className="text-sm text-blue-700">
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
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={calculateDutyMutation.isPending || (selectedVehicle?.discontinuationYear && form.watch('importType') === 'direct' && (new Date().getFullYear() - selectedVehicle.discontinuationYear) > 8)}
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
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Total Amount Payable</span>
                      <Receipt className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {formatCurrency(calculationResult.totalPayable)}
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Includes estimated registration fees
                    </p>
                    {selectedVehicle && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-xs text-green-700">
                          Calculated for: <span className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Value Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Retail Price:</span>
                      <span className="font-medium">{formatCurrency(calculationResult.currentRetailPrice)}</span>
                    </div>
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