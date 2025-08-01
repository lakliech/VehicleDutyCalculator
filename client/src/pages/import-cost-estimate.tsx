import { useState } from "react";
import { ModuleNavigation } from "@/components/module-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Truck, FileText, DollarSign, MapPin, Clock, Fuel, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportEstimate {
  vehicleValue: number;
  shipping: number;
  insurance: number;
  clearingFees: number;
  dutyCalculation: {
    importDuty: number;
    exciseDuty: number;
    vat: number;
    rdl: number;
    idf: number;
    total: number;
  };
  totalCost: number;
  timeline: string;
}

export default function ImportCostEstimate() {
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimate, setEstimate] = useState<ImportEstimate | null>(null);
  
  // Form state
  const [vehicleValue, setVehicleValue] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("mombasa");
  const [vehicleType, setVehicleType] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [vehicleAge, setVehicleAge] = useState("");

  const handleCalculate = async () => {
    if (!vehicleValue || !origin || !vehicleType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate import costs.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      // Simulate API call for import cost estimation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseValue = parseFloat(vehicleValue);
      const shipping = baseValue * 0.15; // 15% of vehicle value for shipping
      const insurance = baseValue * 0.02; // 2% for insurance
      const clearingFees = 50000; // Fixed clearing fees
      
      // Simplified duty calculation (would use actual KRA formulas)
      const importDuty = baseValue * 0.25; // 25%
      const exciseDuty = baseValue * 0.20; // 20%
      const vat = (baseValue + importDuty + exciseDuty) * 0.16; // 16%
      const rdl = baseValue * 0.015; // 1.5%
      const idf = baseValue * 0.025; // 2.5%
      
      const totalDuty = importDuty + exciseDuty + vat + rdl + idf;
      const totalCost = baseValue + shipping + insurance + clearingFees + totalDuty;
      
      const newEstimate: ImportEstimate = {
        vehicleValue: baseValue,
        shipping,
        insurance,
        clearingFees,
        dutyCalculation: {
          importDuty,
          exciseDuty,
          vat,
          rdl,
          idf,
          total: totalDuty
        },
        totalCost,
        timeline: "21-30 days"
      };
      
      setEstimate(newEstimate);
      
      toast({
        title: "Estimate Complete",
        description: "Your import cost estimate has been calculated successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Failed to calculate import costs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Truck className="h-8 w-8 text-amber-600 mr-3" />
            <h1 className="text-3xl font-bold">Import Cost Estimate</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive estimate of all costs involved in importing a vehicle to Kenya, 
            including shipping, duties, taxes, and clearance fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-amber-600" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Value (FOB)*</label>
                <Input
                  placeholder="Enter vehicle value in KES"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(e.target.value)}
                  type="number"
                />
                <p className="text-xs text-gray-500">FOB = Free on Board (vehicle price without shipping)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Origin Country*</label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="south_africa">South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination Port</label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mombasa">Mombasa</SelectItem>
                      <SelectItem value="lamu">Lamu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Type*</label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Engine Size (CC)</label>
                  <Input
                    placeholder="e.g., 1500"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Age (Years)</label>
                <Input
                  placeholder="e.g., 5"
                  value={vehicleAge}
                  onChange={(e) => setVehicleAge(e.target.value)}
                  type="number"
                />
              </div>

              <Button 
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Import Costs
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {estimate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Value */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Vehicle Value (FOB)</span>
                  <span className="font-medium">{formatCurrency(estimate.vehicleValue)}</span>
                </div>

                <Separator />

                {/* Shipping & Insurance */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Shipping & Insurance</h4>
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{formatCurrency(estimate.shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Insurance</span>
                      <span>{formatCurrency(estimate.insurance)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clearing Fees</span>
                      <span>{formatCurrency(estimate.clearingFees)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Duties & Taxes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Duties & Taxes</h4>
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between text-sm">
                      <span>Import Duty</span>
                      <span>{formatCurrency(estimate.dutyCalculation.importDuty)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Excise Duty</span>
                      <span>{formatCurrency(estimate.dutyCalculation.exciseDuty)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VAT (16%)</span>
                      <span>{formatCurrency(estimate.dutyCalculation.vat)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>RDL (1.5%)</span>
                      <span>{formatCurrency(estimate.dutyCalculation.rdl)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>IDF (2.5%)</span>
                      <span>{formatCurrency(estimate.dutyCalculation.idf)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Import Cost</span>
                    <span className="text-green-700">{formatCurrency(estimate.totalCost)}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-center pt-4">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    Estimated Timeline: <Badge variant="outline">{estimate.timeline}</Badge>
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Information Card */}
          {!estimate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-blue-600" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium text-sm">Shipping Costs</h5>
                      <p className="text-xs text-gray-600">Ocean freight from origin to Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium text-sm">Import Duties</h5>
                      <p className="text-xs text-gray-600">KRA import duty, excise duty, VAT</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium text-sm">Clearing Fees</h5>
                      <p className="text-xs text-gray-600">Port charges and documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium text-sm">Insurance</h5>
                      <p className="text-xs text-gray-600">Cargo insurance during transit</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> This is an estimate based on current rates. 
                    Actual costs may vary based on specific vehicle details and current exchange rates.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}