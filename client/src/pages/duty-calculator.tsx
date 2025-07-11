import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type DutyCalculation, type DutyResult, type VehicleReference, type ManualVehicleData, type Trailer, type HeavyMachinery } from "@shared/schema";
import { ModuleNavigation } from "@/components/module-navigation";
import { DutyForm } from "@/components/duty-calculator/duty-form";
import { CalculationResult } from "@/components/duty-calculator/calculation-result";
import { Calculator, Info } from "lucide-react";

export default function DutyCalculator() {
  const { toast } = useToast();
  const [calculationResult, setCalculationResult] = useState<DutyResult | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [categoryConflict, setCategoryConflict] = useState<string | null>(null);
  const [yearOfManufacture, setYearOfManufacture] = useState<number>(0);
  const [manualVehicleData, setManualVehicleData] = useState<ManualVehicleData | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [selectedHeavyMachinery, setSelectedHeavyMachinery] = useState<HeavyMachinery | null>(null);

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

  const handleCalculateDuty = (data: DutyCalculation) => {
    calculateDutyMutation.mutate(data);
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
            <DutyForm
              onSubmit={handleCalculateDuty}
              isSubmitting={calculateDutyMutation.isPending}
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={setSelectedVehicle}
              categoryConflict={categoryConflict}
              setCategoryConflict={setCategoryConflict}
              yearOfManufacture={yearOfManufacture}
              setYearOfManufacture={setYearOfManufacture}
              manualVehicleData={manualVehicleData}
              setManualVehicleData={setManualVehicleData}
              selectedTrailer={selectedTrailer}
              setSelectedTrailer={setSelectedTrailer}
              selectedHeavyMachinery={selectedHeavyMachinery}
              setSelectedHeavyMachinery={setSelectedHeavyMachinery}
            />
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>How It Works</span>
                </CardTitle>
                <CardDescription>
                  Our calculator uses official KRA rates and CRSP values
                </CardDescription>
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

            <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-purple-800">Tax Components</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• <strong>Import Duty:</strong> 25-35% depending on category</li>
                  <li>• <strong>Excise Duty:</strong> 0-35% based on engine size</li>
                  <li>• <strong>VAT:</strong> 16% on cumulative value</li>
                  <li>• <strong>RDL:</strong> 2% for direct imports</li>
                  <li>• <strong>IDF:</strong> 2.5% for direct imports</li>
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
            <CalculationResult
              result={calculationResult}
              selectedVehicle={selectedVehicle}
              manualVehicleData={manualVehicleData}
              selectedTrailer={selectedTrailer}
              selectedHeavyMachinery={selectedHeavyMachinery}
              yearOfManufacture={yearOfManufacture}
            />
          </div>
        )}
      </div>
    </div>
  );
}