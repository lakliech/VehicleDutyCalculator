import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generateDutyCalculationPDF } from "@/lib/pdf-generator";
import { dutyCalculationSchema, type DutyCalculation, type DutyResult, type VehicleReference, type ManualVehicleData, type Trailer, type HeavyMachinery } from "@shared/schema";
import { VehicleSelector } from "@/components/vehicle-selector";
import { VehicleCategorySelector } from "@/components/vehicle-category-selector";
import { TrailerSelector } from "@/components/trailer-selector";
import { HeavyMachinerySelector } from "@/components/heavy-machinery-selector";
import { ModuleNavigation } from "@/components/module-navigation";
import { vehicleCategoryInfo } from "@/components/duty-calculator/vehicle-category-info";
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Receipt,
  Info,
  Download,
  AlertCircle,
  Database
} from "lucide-react";

export default function DutyCalculator() {
  const { toast } = useToast();
  const [calculationResult, setCalculationResult] = useState<DutyResult | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [categoryConflict, setCategoryConflict] = useState<string | null>(null);
  const [yearOfManufacture, setYearOfManufacture] = useState<number>(0);
  const [manualVehicleData, setManualVehicleData] = useState<ManualVehicleData | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [selectedHeavyMachinery, setSelectedHeavyMachinery] = useState<HeavyMachinery | null>(null);

  const form = useForm<DutyCalculation>({
    resolver: zodResolver(dutyCalculationSchema),
    defaultValues: {
      category: "",
      value: 0,
      age: 0,
      importType: "direct",
    },
  });

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle: VehicleReference | null, manual?: ManualVehicleData) => {
    setSelectedVehicle(vehicle);
    setManualVehicleData(manual || null);
    
    if (vehicle) {
      form.setValue("value", vehicle.crspKes || vehicle.crsp2020 || 0);
      
      // Auto-detect category
      const engine = vehicle.engineCapacity;
      const fuel = vehicle.fuelType?.toLowerCase();
      let autoCategory = "";
      
      if (fuel === "electric") {
        autoCategory = "electric";
      } else if (engine < 1500) {
        autoCategory = "under1500cc";
      } else if ((fuel === "petrol" && engine > 3000) || (fuel === "diesel" && engine > 2500)) {
        autoCategory = "largeEngine";
      } else {
        autoCategory = "over1500cc";
      }
      
      form.setValue("category", autoCategory);
    }
  };

  // Handle trailer selection
  const handleTrailerSelect = (trailer: Trailer | null) => {
    setSelectedTrailer(trailer);
    if (trailer) {
      form.setValue("value", trailer.crspKes);
      form.setValue("category", "trailer");
    }
  };

  // Handle heavy machinery selection
  const handleHeavyMachinerySelect = (machinery: HeavyMachinery | null) => {
    setSelectedHeavyMachinery(machinery);
    if (machinery) {
      form.setValue("value", machinery.crspKes);
      form.setValue("category", "heavyMachinery");
    }
  };

  // Handle year change
  const handleYearChange = (year: number) => {
    setYearOfManufacture(year);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year + 1;
    form.setValue("age", age);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    form.setValue("category", category);
    
    // Clear selections when changing category
    if (category === "trailer") {
      setSelectedVehicle(null);
      setManualVehicleData(null);
      setSelectedHeavyMachinery(null);
    } else if (category === "heavyMachinery") {
      setSelectedVehicle(null);
      setManualVehicleData(null);
      setSelectedTrailer(null);
    } else {
      setSelectedTrailer(null);
      setSelectedHeavyMachinery(null);
    }
  };

  // Generate year options
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const importType = form.watch("importType");
    const maxAge = importType === "direct" ? 8 : 20;
    
    return Array.from({ length: maxAge + 1 }, (_, i) => currentYear - i);
  };

  // Check if form can be submitted
  const canSubmit = () => {
    const values = form.getValues();
    const hasCategory = values.category && values.category !== "";
    const hasValue = values.value > 0;
    const hasImportType = values.importType && values.importType !== "";
    const hasValidYear = yearOfManufacture > 0;
    const noConflicts = !categoryConflict;
    
    // For trailers and heavy machinery, year is not required
    const isYearRequired = !["trailer", "heavyMachinery"].includes(values.category);
    
    return hasCategory && hasValue && hasImportType && (!isYearRequired || hasValidYear) && noConflicts;
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
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
                      value={form.watch("category")}
                      onValueChange={handleCategoryChange}
                    />
                  </CardContent>
                </Card>

                {/* Step 2: Equipment Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">2</span>
                      <span>Select Your Equipment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Vehicle Selector */}
                    {form.watch("category") && !["trailer", "heavyMachinery"].includes(form.watch("category")) && (
                      <VehicleSelector 
                        onVehicleSelect={handleVehicleSelect}
                        showManualEntry={true}
                      />
                    )}

                    {/* Trailer Selector */}
                    {form.watch("category") === "trailer" && (
                      <TrailerSelector onTrailerSelect={handleTrailerSelect} />
                    )}

                    {/* Heavy Machinery Selector */}
                    {form.watch("category") === "heavyMachinery" && (
                      <HeavyMachinerySelector onHeavyMachinerySelect={handleHeavyMachinerySelect} />
                    )}

                    {/* Selected Equipment Display */}
                    {(selectedVehicle || manualVehicleData) && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Selected Vehicle:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Make:</span> {(selectedVehicle || manualVehicleData)?.make}
                          </div>
                          <div>
                            <span className="font-medium">Model:</span> {(selectedVehicle || manualVehicleData)?.model}
                          </div>
                          <div>
                            <span className="font-medium">Engine:</span> {(selectedVehicle || manualVehicleData)?.engineCapacity}cc
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">CRSP:</span>
                            <span>KES {((selectedVehicle?.crspKes || selectedVehicle?.crsp2020 || manualVehicleData?.crspValue || 0)).toLocaleString()}</span>
                            {selectedVehicle?.crsp2020 && !selectedVehicle?.crspKes && (
                              <Badge variant="outline" className="text-orange-600 border-orange-600">
                                <Database className="w-3 h-3 mr-1" />
                                2020
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTrailer && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Selected Trailer:</h4>
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
                            <span className="font-medium">CRSP:</span> KES {selectedTrailer.crspKes.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedHeavyMachinery && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Selected Heavy Machinery:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Make:</span> {selectedHeavyMachinery.make}
                          </div>
                          <div>
                            <span className="font-medium">Model:</span> {selectedHeavyMachinery.model}
                          </div>
                          <div>
                            <span className="font-medium">Category:</span> {selectedHeavyMachinery.category}
                          </div>
                          <div>
                            <span className="font-medium">CRSP:</span> KES {selectedHeavyMachinery.crspKes.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Step 3: Import Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">3</span>
                      <span>Import Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="importType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Import Type *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="direct" id="direct" />
                                  <label htmlFor="direct">Direct Import</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="previously_registered" id="previously_registered" />
                                  <label htmlFor="previously_registered">Previously Registered</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Year of Manufacture */}
                      {!["trailer", "heavyMachinery"].includes(form.watch("category")) && (
                        <div>
                          <label className="text-sm font-medium">Year of Manufacture *</label>
                          <Select 
                            value={yearOfManufacture ? yearOfManufacture.toString() : ""} 
                            onValueChange={(value) => handleYearChange(parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {generateYearOptions().map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Custom Value Override */}
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Value (KES)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter vehicle value in KES"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
                    disabled={!canSubmit() || calculateDutyMutation.isPending}
                  >
                    {calculateDutyMutation.isPending ? "Calculating..." : "Calculate Duty"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Select your equipment type</li>
                  <li>2. Choose your specific vehicle/equipment</li>
                  <li>3. Enter import details and year</li>
                  <li>4. Get detailed tax breakdown</li>
                  <li>5. Download PDF report</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-purple-600" />
                  <span>Important Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Rates are based on official KRA guidelines</li>
                  <li>• CRSP values are regularly updated</li>
                  <li>• Different rates apply to different categories</li>
                  <li>• Depreciation varies by age and import type</li>
                  <li>• Electric vehicles have reduced rates</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        {calculationResult && (
          <div id="calculation-results" className="mt-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              Calculation Results
            </h2>
            
            {/* Equipment Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {vehicleCategoryInfo[calculationResult.category as keyof typeof vehicleCategoryInfo]?.emoji || "🚗"}
                  </span>
                  <span>Equipment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{vehicleCategoryInfo[calculationResult.category as keyof typeof vehicleCategoryInfo]?.label || calculationResult.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle Value:</span>
                    <span>{formatCurrency(calculationResult.vehicleValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle Age:</span>
                    <span>{calculationResult.vehicleAge} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Import Type:</span>
                    <span>{calculationResult.importType === "direct" ? "Direct Import" : "Previously Registered"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Breakdown */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Customs Value (After {calculationResult.depreciationRate}% depreciation):</span>
                    <span className="font-medium">{formatCurrency(calculationResult.customsValue)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span>Import Duty ({calculationResult.importDutyRate}%):</span>
                    <span className="font-medium">{formatCurrency(calculationResult.importDuty)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Excise Duty ({calculationResult.exciseDutyRate}%):</span>
                    <span className="font-medium">{formatCurrency(calculationResult.exciseDuty)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>VAT ({calculationResult.vatRate}%):</span>
                    <span className="font-medium">{formatCurrency(calculationResult.vat)}</span>
                  </div>
                  
                  {calculationResult.railwayDevelopmentLevy > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Railway Development Levy ({calculationResult.railwayDevelopmentLevyRate}%):</span>
                      <span className="font-medium">{formatCurrency(calculationResult.railwayDevelopmentLevy)}</span>
                    </div>
                  )}
                  
                  {calculationResult.importDeclarationFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Import Declaration Fee ({calculationResult.importDeclarationFeeRate}%):</span>
                      <span className="font-medium">{formatCurrency(calculationResult.importDeclarationFee)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-bold bg-purple-50 p-4 rounded-lg">
                    <span>Total Payable Amount:</span>
                    <span className="text-purple-600">{formatCurrency(calculationResult.totalPayable)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download PDF Button */}
            <div className="text-center">
              <Button 
                onClick={() => {
                  const equipment = selectedTrailer || selectedHeavyMachinery || selectedVehicle || manualVehicleData;
                  if (equipment) {
                    generateDutyCalculationPDF(calculationResult, equipment, yearOfManufacture);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}