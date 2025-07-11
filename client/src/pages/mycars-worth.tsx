import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, Clock, TrendingUp, BarChart3, Calculator, Car, MapPin, Gauge, Calendar, Zap } from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { VehicleSelector } from "@/components/vehicle-selector";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ValuationResult {
  vehicleId: number;
  make: string;
  model: string;
  year: number;
  engineCapacity: number;
  fuelType: string;
  mileage: number;
  condition: string;
  location: string;
  marketValue: number;
  depreciatedValue: number;
  adjustedValue: number;
  confidenceScore: number;
  valuationFactors: {
    ageDepreciation: number;
    mileageAdjustment: number;
    conditionAdjustment: number;
    locationFactor: number;
    basePrice: number;
  };
  aiAnalysis: string;
  referenceVehicle: {
    make: string;
    model: string;
    engineCapacity: number;
    basePrice: number;
  };
}

export default function MyCarsWorth() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [year, setYear] = useState<number>(2020);
  const [mileage, setMileage] = useState<number>(50000);
  const [condition, setCondition] = useState<string>("good");
  const [location, setLocation] = useState<string>("nairobi");
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const { toast } = useToast();

  const valuationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/vehicle-valuation", data);
      return response;
    },
    onSuccess: (data) => {
      setValuationResult(data);
      toast({
        title: "Valuation Complete",
        description: "Your vehicle valuation has been calculated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Valuation Failed",
        description: error.message || "Failed to calculate vehicle valuation",
        variant: "destructive",
      });
    },
  });

  const handleValuation = () => {
    if (!selectedVehicle) {
      toast({
        title: "Vehicle Required",
        description: "Please select a vehicle before calculating valuation",
        variant: "destructive",
      });
      return;
    }

    const valuationData = {
      vehicleId: selectedVehicle.id,
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      year,
      engineCapacity: selectedVehicle.engineCapacity,
      fuelType: selectedVehicle.fuelType,
      mileage,
      condition,
      location,
    };

    valuationMutation.mutate(valuationData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Instant Vehicle Valuation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get accurate market valuation for your vehicle based on current Kenya market conditions, 
            age, mileage, and condition assessment powered by AI.
          </p>
          <Badge variant="secondary" className="mt-4 bg-green-100 text-green-800">
            <Zap className="h-3 w-3 mr-1" />
            Live & Instant
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Valuation Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-purple-600" />
                  <span>Vehicle Details</span>
                </CardTitle>
                <CardDescription>
                  Select your vehicle and provide details for accurate valuation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Your Vehicle</Label>
                  <VehicleSelector
                    onVehicleSelect={(vehicle) => setSelectedVehicle(vehicle)}
                    placeholder="Choose your vehicle..."
                  />
                </div>

                {selectedVehicle && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Selected Vehicle</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Make:</strong> {selectedVehicle.make}</p>
                      <p><strong>Model:</strong> {selectedVehicle.model}</p>
                      <p><strong>Engine:</strong> {selectedVehicle.engineCapacity}cc</p>
                      <p><strong>Fuel:</strong> {selectedVehicle.fuelType}</p>
                      {selectedVehicle.crspKes && (
                        <p><strong>Base Price:</strong> {formatCurrency(selectedVehicle.crspKes)}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year of Manufacture</Label>
                    <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 30 }, (_, i) => 2024 - i).map((yr) => (
                          <SelectItem key={yr} value={yr.toString()}>
                            {yr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mileage">Mileage (km)</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(parseInt(e.target.value) || 0)}
                      placeholder="Enter mileage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="condition">Vehicle Condition</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                        <SelectItem value="eldoret">Eldoret</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleValuation} 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={valuationMutation.isPending || !selectedVehicle}
                >
                  {valuationMutation.isPending ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate My Car's Worth
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Valuation Results */}
          <div className="space-y-6">
            {valuationResult ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span>Valuation Results</span>
                    </CardTitle>
                    <CardDescription>
                      Market value assessment for your {valuationResult.make} {valuationResult.model}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-900 mb-2">
                          {formatCurrency(valuationResult.marketValue)}
                        </div>
                        <div className="text-lg text-gray-600">Current Market Value</div>
                        <div className="flex items-center justify-center mt-2">
                          <Badge className={`${getConfidenceColor(valuationResult.confidenceScore)}`}>
                            {valuationResult.confidenceScore}% Confidence
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-semibold text-gray-900">
                            {formatCurrency(valuationResult.referenceVehicle.basePrice)}
                          </div>
                          <div className="text-sm text-gray-600">Base Price</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-semibold text-gray-900">
                            {formatCurrency(valuationResult.depreciatedValue)}
                          </div>
                          <div className="text-sm text-gray-600">After Depreciation</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <span>Valuation Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Age Depreciation</span>
                        <span className="font-semibold text-red-600">
                          -{(valuationResult.valuationFactors.ageDepreciation * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mileage Adjustment</span>
                        <span className={`font-semibold ${valuationResult.valuationFactors.mileageAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {valuationResult.valuationFactors.mileageAdjustment >= 0 ? '+' : ''}
                          {(valuationResult.valuationFactors.mileageAdjustment * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Condition Adjustment</span>
                        <span className={`font-semibold ${valuationResult.valuationFactors.conditionAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {valuationResult.valuationFactors.conditionAdjustment >= 0 ? '+' : ''}
                          {(valuationResult.valuationFactors.conditionAdjustment * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Location Factor</span>
                        <span className={`font-semibold ${valuationResult.valuationFactors.locationFactor >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {valuationResult.valuationFactors.locationFactor >= 0 ? '+' : ''}
                          {(valuationResult.valuationFactors.locationFactor * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span>AI Market Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700">{valuationResult.aiAnalysis}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-gray-400" />
                    <span>Ready to Calculate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Car className="h-16 w-16 mx-auto" />
                    </div>
                    <p className="text-gray-600">
                      Select your vehicle and provide details to get an instant valuation
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <span>Market Valuation</span>
                </CardTitle>
                <CardDescription>
                  Real-time market value assessment based on current Kenya market data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Current market price analysis</li>
                  <li>• Depreciation calculations</li>
                  <li>• Regional price variations</li>
                  <li>• Condition-based adjustments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>AI-Powered Analysis</span>
                </CardTitle>
                <CardDescription>
                  Advanced AI analysis for comprehensive market insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Market demand analysis</li>
                  <li>• Price trend predictions</li>
                  <li>• Selling recommendations</li>
                  <li>• Investment advice</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span>Comprehensive Factors</span>
                </CardTitle>
                <CardDescription>
                  Multiple factors considered for accurate valuation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vehicle age and mileage</li>
                  <li>• Condition assessment</li>
                  <li>• Location factors</li>
                  <li>• Market comparisons</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}