import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, Receipt, DollarSign, Calendar, Database } from "lucide-react";
import { type DutyResult, type VehicleReference, type ManualVehicleData, type Trailer, type HeavyMachinery } from "@shared/schema";
import { generateDutyCalculationPDF } from "@/lib/pdf-generator";
import { vehicleCategoryInfo } from "./vehicle-category-info";

interface CalculationResultProps {
  result: DutyResult;
  selectedVehicle: VehicleReference | null;
  manualVehicleData: ManualVehicleData | null;
  selectedTrailer: Trailer | null;
  selectedHeavyMachinery: HeavyMachinery | null;
  yearOfManufacture: number;
}

export function CalculationResult({
  result,
  selectedVehicle,
  manualVehicleData,
  selectedTrailer,
  selectedHeavyMachinery,
  yearOfManufacture,
}: CalculationResultProps) {
  const handleDownloadPDF = () => {
    const vehicleData = selectedVehicle || manualVehicleData;
    const equipment = selectedTrailer || selectedHeavyMachinery || vehicleData;
    
    if (!equipment) return;
    
    generateDutyCalculationPDF(result, equipment, yearOfManufacture);
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const getCategoryInfo = () => {
    return vehicleCategoryInfo[result.category as keyof typeof vehicleCategoryInfo] || {
      emoji: "🚗",
      label: result.category,
      description: ""
    };
  };

  const getEquipmentDisplay = () => {
    const vehicle = selectedVehicle || manualVehicleData;
    
    if (selectedTrailer) {
      return {
        title: "Trailer Details",
        details: [
          { label: "Type", value: selectedTrailer.type },
          { label: "Make", value: selectedTrailer.make },
          { label: "Specifications", value: selectedTrailer.specifications },
          { label: "CRSP Value", value: formatCurrency(selectedTrailer.crspKes) }
        ]
      };
    }
    
    if (selectedHeavyMachinery) {
      return {
        title: "Heavy Machinery Details",
        details: [
          { label: "Make", value: selectedHeavyMachinery.make },
          { label: "Model", value: selectedHeavyMachinery.model },
          { label: "Category", value: selectedHeavyMachinery.category },
          { label: "Power Spec", value: selectedHeavyMachinery.powerSpec },
          { label: "CRSP Value", value: formatCurrency(selectedHeavyMachinery.crspKes) }
        ]
      };
    }
    
    if (vehicle) {
      return {
        title: "Vehicle Details",
        details: [
          { label: "Make", value: vehicle.make },
          { label: "Model", value: vehicle.model },
          { label: "Engine Capacity", value: `${vehicle.engineCapacity}cc` },
          { label: "Fuel Type", value: vehicle.fuelType },
          { 
            label: "CRSP Value", 
            value: formatCurrency(selectedVehicle?.crspKes || selectedVehicle?.crsp2020 || manualVehicleData?.crspValue || 0),
            badge: selectedVehicle?.crsp2020 && !selectedVehicle?.crspKes ? "2020" : undefined
          },
          ...(yearOfManufacture > 0 ? [{ label: "Year of Manufacture", value: yearOfManufacture.toString() }] : [])
        ]
      };
    }
    
    return null;
  };

  const categoryInfo = getCategoryInfo();
  const equipmentDisplay = getEquipmentDisplay();

  return (
    <div className="space-y-6">
      {/* Equipment Details */}
      {equipmentDisplay && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">{categoryInfo.emoji}</span>
              <span>{equipmentDisplay.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipmentDisplay.details.map((detail, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{detail.label}:</span>
                  <div className="flex items-center space-x-2">
                    <span>{detail.value}</span>
                    {detail.badge && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        <Database className="w-3 h-3 mr-1" />
                        {detail.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="h-5 w-5" />
            <span>Duty Calculation Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{categoryInfo.emoji}</div>
              <div className="font-medium">{categoryInfo.label}</div>
              <div className="text-sm text-gray-600">{categoryInfo.description}</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">Vehicle Value</div>
              <div className="text-lg font-bold">{formatCurrency(result.vehicleValue)}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium">Vehicle Age</div>
              <div className="text-lg font-bold">{result.vehicleAge} years</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Customs Value (After {result.depreciationRate}% depreciation):</span>
              <span className="font-medium">{formatCurrency(result.customsValue)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span>Import Duty ({result.importDutyRate}%):</span>
              <span className="font-medium">{formatCurrency(result.importDuty)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Excise Duty ({result.exciseDutyRate}%):</span>
              <span className="font-medium">{formatCurrency(result.exciseDuty)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>VAT ({result.vatRate}%):</span>
              <span className="font-medium">{formatCurrency(result.vat)}</span>
            </div>
            
            {result.railwayDevelopmentLevy > 0 && (
              <div className="flex justify-between items-center">
                <span>Railway Development Levy ({result.railwayDevelopmentLevyRate}%):</span>
                <span className="font-medium">{formatCurrency(result.railwayDevelopmentLevy)}</span>
              </div>
            )}
            
            {result.importDeclarationFee > 0 && (
              <div className="flex justify-between items-center">
                <span>Import Declaration Fee ({result.importDeclarationFeeRate}%):</span>
                <span className="font-medium">{formatCurrency(result.importDeclarationFee)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold bg-purple-50 p-4 rounded-lg">
              <span>Total Payable Amount:</span>
              <span className="text-purple-600">{formatCurrency(result.totalPayable)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Import Information</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">Import Type:</span> {result.importType === "direct" ? "Direct Import" : "Previously Registered"}</li>
                <li><span className="font-medium">Vehicle Category:</span> {categoryInfo.label}</li>
                <li><span className="font-medium">Depreciation Applied:</span> {result.depreciationRate}%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tax Rates Applied</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">Import Duty:</span> {result.importDutyRate}%</li>
                <li><span className="font-medium">Excise Duty:</span> {result.exciseDutyRate}%</li>
                <li><span className="font-medium">VAT:</span> {result.vatRate}%</li>
                {result.railwayDevelopmentLevy > 0 && (
                  <li><span className="font-medium">Railway Development Levy:</span> {result.railwayDevelopmentLevyRate}%</li>
                )}
                {result.importDeclarationFee > 0 && (
                  <li><span className="font-medium">Import Declaration Fee:</span> {result.importDeclarationFeeRate}%</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download PDF Button */}
      <div className="text-center">
        <Button 
          onClick={handleDownloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
    </div>
  );
}