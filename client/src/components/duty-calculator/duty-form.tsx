import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { dutyCalculationSchema, type DutyCalculation, type VehicleReference, type ManualVehicleData, type Trailer, type HeavyMachinery } from "@shared/schema";
import { VehicleSelector } from "@/components/vehicle-selector";
import { VehicleCategorySelector } from "@/components/vehicle-category-selector";
import { TrailerSelector } from "@/components/trailer-selector";
import { HeavyMachinerySelector } from "@/components/heavy-machinery-selector";
import { AlertCircle, Database } from "lucide-react";

interface DutyFormProps {
  onSubmit: (data: DutyCalculation) => void;
  isSubmitting?: boolean;
  selectedVehicle: VehicleReference | null;
  setSelectedVehicle: (vehicle: VehicleReference | null) => void;
  categoryConflict: string | null;
  setCategoryConflict: (conflict: string | null) => void;
  yearOfManufacture: number;
  setYearOfManufacture: (year: number) => void;
  manualVehicleData: ManualVehicleData | null;
  setManualVehicleData: (data: ManualVehicleData | null) => void;
  selectedTrailer: Trailer | null;
  setSelectedTrailer: (trailer: Trailer | null) => void;
  selectedHeavyMachinery: HeavyMachinery | null;
  setSelectedHeavyMachinery: (machinery: HeavyMachinery | null) => void;
}

export function DutyForm({
  onSubmit,
  isSubmitting = false,
  selectedVehicle,
  setSelectedVehicle,
  categoryConflict,
  setCategoryConflict,
  yearOfManufacture,
  setYearOfManufacture,
  manualVehicleData,
  setManualVehicleData,
  selectedTrailer,
  setSelectedTrailer,
  selectedHeavyMachinery,
  setSelectedHeavyMachinery,
}: DutyFormProps) {
  const [manualCategorySelection, setManualCategorySelection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const form = useForm<DutyCalculation>({
    resolver: zodResolver(dutyCalculationSchema),
    defaultValues: {
      category: "",
      value: 0,
      age: 0,
      importType: "direct",
    },
  });

  const handleVehicleSelect = (vehicle: VehicleReference | null, manual?: ManualVehicleData) => {
    setSelectedVehicle(vehicle);
    setManualVehicleData(manual || null);
    
    if (vehicle) {
      form.setValue("value", vehicle.crspKes || vehicle.crsp2020 || 0);
      
      // Auto-detect category if not using manual selection
      if (!manualCategorySelection) {
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
        setSelectedCategory(autoCategory);
      }
    } else {
      form.setValue("value", 0);
      if (!manualCategorySelection) {
        form.setValue("category", "");
        setSelectedCategory("");
      }
    }
  };

  const handleTrailerSelect = (trailer: Trailer | null) => {
    setSelectedTrailer(trailer);
    if (trailer) {
      form.setValue("value", trailer.crspKes);
      form.setValue("category", "trailer");
      setSelectedCategory("trailer");
    } else {
      form.setValue("value", 0);
      form.setValue("category", "");
      setSelectedCategory("");
    }
  };

  const handleHeavyMachinerySelect = (machinery: HeavyMachinery | null) => {
    setSelectedHeavyMachinery(machinery);
    if (machinery) {
      form.setValue("value", machinery.crspKes);
      form.setValue("category", "heavyMachinery");
      setSelectedCategory("heavyMachinery");
    } else {
      form.setValue("value", 0);
      form.setValue("category", "");
      setSelectedCategory("");
    }
  };

  const validateCategory = (category: string) => {
    if (!selectedVehicle && !manualVehicleData) return null;
    
    const vehicle = selectedVehicle || manualVehicleData;
    if (!vehicle) return null;
    
    const engine = vehicle.engineCapacity;
    const fuel = vehicle.fuelType?.toLowerCase();
    
    // Electric validation
    if (category === "electric" && fuel !== "electric") {
      return "Cannot select Electric category for non-electric vehicles";
    }
    
    // Engine size validations
    if (category === "under1500cc" && engine >= 1500) {
      return "Cannot select Under 1500cc for vehicles with engine ≥1500cc";
    }
    
    if (category === "over1500cc" && (engine < 1500 || engine > 3000 || (fuel === "diesel" && engine > 2500))) {
      return "Invalid engine size for Over 1500cc category";
    }
    
    if (category === "largeEngine") {
      if (fuel === "petrol" && engine <= 3000) {
        return "Petrol vehicles must be >3000cc for Large Engine category";
      }
      if (fuel === "diesel" && engine <= 2500) {
        return "Diesel vehicles must be >2500cc for Large Engine category";
      }
    }
    
    return null;
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    form.setValue("category", category);
    
    const conflict = validateCategory(category);
    setCategoryConflict(conflict);
  };

  const handleYearChange = (year: number) => {
    setYearOfManufacture(year);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year + 1;
    form.setValue("age", age);
  };

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

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const importType = form.watch("importType");
    const maxAge = importType === "direct" ? 8 : 20;
    const startYear = currentYear - maxAge;
    
    return Array.from({ length: maxAge + 1 }, (_, i) => currentYear - i)
      .filter(year => year >= startYear);
  };

  return (
    <div className="space-y-8">
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
              form.setValue("category", category);
              setSelectedCategory(category);
            }} 
          />
        </CardContent>
      </Card>

      {/* Step 2: Vehicle/Equipment Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">2</span>
            <span>Select Your Equipment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Manual Category Selection Toggle - Only for vehicle categories */}
          {selectedCategory && !["trailer", "heavyMachinery"].includes(selectedCategory) && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={manualCategorySelection}
                  onCheckedChange={setManualCategorySelection}
                />
                <label className="text-sm font-medium">
                  Override automatic category detection
                </label>
              </div>
              
              {manualCategorySelection && (
                <VehicleCategorySelector 
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                />
              )}
            </div>
          )}

          {/* Vehicle Selector */}
          {selectedCategory && !["trailer", "heavyMachinery"].includes(selectedCategory) && (
            <VehicleSelector 
              onVehicleSelect={handleVehicleSelect}
              showManualEntry={true}
            />
          )}

          {/* Trailer Selector */}
          {selectedCategory === "trailer" && (
            <TrailerSelector onTrailerSelect={handleTrailerSelect} />
          )}

          {/* Heavy Machinery Selector */}
          {selectedCategory === "heavyMachinery" && (
            <HeavyMachinerySelector onHeavyMachinerySelect={handleHeavyMachinerySelect} />
          )}

          {/* Category Conflict Warning */}
          {categoryConflict && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{categoryConflict}</AlertDescription>
            </Alert>
          )}

          {/* Selected Vehicle Display */}
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

          {/* Selected Trailer Display */}
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

          {/* Selected Heavy Machinery Display */}
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {!["trailer", "heavyMachinery"].includes(selectedCategory) && (
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
              disabled={!canSubmit() || isSubmitting}
            >
              {isSubmitting ? "Calculating..." : "Calculate Duty"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}