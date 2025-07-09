import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { VehicleSelector } from "@/components/vehicle-selector";
import { TrailerSelector } from "@/components/trailer-selector";
import { HeavyMachinerySelector } from "@/components/heavy-machinery-selector";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { VehicleReference, Trailer, HeavyMachinery } from "@shared/schema";
import { FileText, Clock, Users, CreditCard, Calculator, AlertCircle, CheckCircle } from "lucide-react";

interface TransferResult {
  vehicleType: string;
  engineCapacity: number | null;
  specialType: string | null;
  transferRate: {
    id: number;
    vehicleType: string;
    minEngineCapacity: number | null;
    maxEngineCapacity: number | null;
    specialType: string | null;
    transferFee: string;
    description: string;
  };
  breakdown: {
    governmentFees: Record<string, number>;
    legalFees: Record<string, number>;
    additionalCosts: Record<string, number>;
  };
  totals: {
    governmentFees: number;
    legalFees: number;
    additionalCosts: number;
    grandTotal: number;
  };
  notes: string[];
}

export default function TransferCost() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [selectedMachinery, setSelectedMachinery] = useState<HeavyMachinery | null>(null);
  const [vehicleType, setVehicleType] = useState<string>("");

  const [specialType, setSpecialType] = useState<string>("");
  const [transferResult, setTransferResult] = useState<TransferResult | null>(null);
  
  const { toast } = useToast();

  const calculateTransferMutation = useMutation({
    mutationFn: async (data: {
      vehicleType: string;
      engineCapacity?: number;
      specialType?: string;
      vehicleValue?: number;
    }) => {
      const response = await apiRequest('POST', '/api/calculate-transfer-cost', data);
      return await response.json();
    },
    onSuccess: (result: TransferResult) => {
      setTransferResult(result);
      toast({
        title: "Transfer Cost Calculated",
        description: "Your vehicle transfer cost breakdown has been calculated successfully.",
      });
    },
    onError: (error: any) => {
      console.error('Transfer calculation error:', error);
      toast({
        title: "Calculation Failed",
        description: error.message || "Failed to calculate transfer cost. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVehicleTypeChange = (type: string) => {
    setVehicleType(type);
    setSelectedVehicle(null);
    setSelectedTrailer(null);
    setSelectedMachinery(null);
    setSpecialType("");
    setTransferResult(null);
  };

  const handleCalculateTransfer = () => {
    if (!vehicleType) {
      toast({
        title: "Vehicle Type Required",
        description: "Please select a vehicle type first.",
        variant: "destructive",
      });
      return;
    }

    let calculationData: any = {
      vehicleType,
    };

    if (vehicleType === 'vehicle') {
      if (!selectedVehicle) {
        toast({
          title: "Vehicle Selection Required",
          description: "Please select a vehicle from the database.",
          variant: "destructive",
        });
        return;
      }
      calculationData.engineCapacity = selectedVehicle.engineCapacity;
    } else if (vehicleType === 'trailer') {
      if (!specialType) {
        toast({
          title: "Trailer Type Required",
          description: "Please select trailer type (number of wheels).",
          variant: "destructive",
        });
        return;
      }
      calculationData.specialType = specialType;
    } else if (vehicleType === 'tractor') {
      calculationData.specialType = 'tractor';
    }



    calculateTransferMutation.mutate(calculationData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vehicle Transfer Cost Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculate the total cost of transferring vehicle ownership in Kenya. Get detailed breakdown of government fees, legal costs, and additional expenses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Calculation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Transfer Cost Calculator
                </CardTitle>
                <CardDescription>
                  Select your vehicle and get instant transfer cost estimates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Vehicle Type *</Label>
                  <Select value={vehicleType} onValueChange={handleVehicleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vehicle">Motor Vehicle</SelectItem>
                      <SelectItem value="trailer">Trailer</SelectItem>
                      <SelectItem value="tractor">Tractor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vehicle Selection */}
                {vehicleType === 'vehicle' && (
                  <div className="space-y-2">
                    <Label>Select Vehicle *</Label>
                    <VehicleSelector 
                      onVehicleSelect={setSelectedVehicle}
                      disabled={!vehicleType}
                    />
                    {selectedVehicle && (
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                          {selectedVehicle.make} {selectedVehicle.model}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          Engine: {selectedVehicle.engineCapacity}cc
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Trailer Selection */}
                {vehicleType === 'trailer' && (
                  <>
                    <div className="space-y-2">
                      <Label>Select Trailer</Label>
                      <TrailerSelector 
                        onTrailerSelect={setSelectedTrailer}
                        disabled={!vehicleType}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trailer-type">Trailer Type *</Label>
                      <Select value={specialType} onValueChange={setSpecialType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trailer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trailer_less_than_four_wheels">Less than 4 wheels</SelectItem>
                          <SelectItem value="trailer_four_wheels_or_more">4 wheels or more</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Heavy Machinery Selection */}
                {vehicleType === 'tractor' && (
                  <div className="space-y-2">
                    <Label>Select Tractor (Optional)</Label>
                    <HeavyMachinerySelector 
                      onMachinerySelect={setSelectedMachinery}
                      disabled={!vehicleType}
                    />
                  </div>
                )}



                <Button 
                  onClick={handleCalculateTransfer}
                  disabled={calculateTransferMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  {calculateTransferMutation.isPending ? "Calculating..." : "Calculate Transfer Cost"}
                </Button>
              </CardContent>
            </Card>

            {/* Transfer Result */}
            {transferResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Transfer Cost Breakdown
                  </CardTitle>
                  <CardDescription>
                    Detailed cost analysis for your vehicle transfer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vehicle Info */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Vehicle Details</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Type: {transferResult.vehicleType.charAt(0).toUpperCase() + transferResult.vehicleType.slice(1)}
                    </p>
                    {transferResult.engineCapacity && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Engine: {transferResult.engineCapacity}cc
                      </p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Category: {transferResult.transferRate.description}
                    </p>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-4">
                    {/* Government Fees */}
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Government Fees</h4>
                      <div className="space-y-1">
                        {Object.entries(transferResult.breakdown.governmentFees).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span>{formatCurrency(value)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-semibold text-purple-600 border-t pt-2 mt-2">
                        <span>Subtotal</span>
                        <span>{formatCurrency(transferResult.totals.governmentFees)}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Legal Fees */}
                    <div>
                      <h4 className="font-semibold mb-2 text-cyan-900 dark:text-cyan-100">Legal Fees</h4>
                      <div className="space-y-1">
                        {Object.entries(transferResult.breakdown.legalFees).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span>{formatCurrency(value)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-semibold text-cyan-600 border-t pt-2 mt-2">
                        <span>Subtotal</span>
                        <span>{formatCurrency(transferResult.totals.legalFees)}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Additional Costs */}
                    <div>
                      <h4 className="font-semibold mb-2 text-pink-900 dark:text-pink-100">Additional Costs</h4>
                      <div className="space-y-1">
                        {Object.entries(transferResult.breakdown.additionalCosts).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span>{formatCurrency(value)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-semibold text-pink-600 border-t pt-2 mt-2">
                        <span>Subtotal</span>
                        <span>{formatCurrency(transferResult.totals.additionalCosts)}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Grand Total */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Total Transfer Cost</span>
                        <span className="text-2xl font-bold text-purple-600">{formatCurrency(transferResult.totals.grandTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        {transferResult.notes.map((note, index) => (
                          <p key={index} className="text-xs">{note}</p>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>



          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Transfer Process Timeline
              </CardTitle>
              <CardDescription>
                Typical timeline for vehicle transfer completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Day 1-2</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Document preparation and valuation</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Day 3-5</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">NTSA application and payment</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Day 6-10</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Processing and verification</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Day 11-14</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Collection of new documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>
                Essential documents needed for vehicle transfer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-purple-900 dark:text-purple-100">Seller Requirements</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Original logbook</li>
                    <li>• Copy of ID/Passport</li>
                    <li>• KRA PIN certificate</li>
                    <li>• Police clearance (if required)</li>
                    <li>• Insurance certificate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-cyan-900 dark:text-cyan-100">Buyer Requirements</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Copy of ID/Passport</li>
                    <li>• KRA PIN certificate</li>
                    <li>• Signed sale agreement</li>
                    <li>• Proof of payment</li>
                    <li>• New insurance policy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}