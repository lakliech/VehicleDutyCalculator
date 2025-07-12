import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, Clock, TrendingUp, BarChart3, Calculator, Car, MapPin, Gauge, Calendar, Zap, Camera, AlertTriangle } from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { VehicleSelector } from "@/components/vehicle-selector";
import { ImageUpload } from "@/components/image-upload";
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
  // Image analysis results
  imageAnalysis?: {
    frontAnalysis?: string;
    reverseAnalysis?: string;
    leftSideAnalysis?: string;
    rightSideAnalysis?: string;
    overallDamageScore?: number;
    damageDiscount?: number;
    hasImageAnalysis?: boolean;
  };
}

export default function MyCarsWorth() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [year, setYear] = useState<number>(2020);
  const [mileage, setMileage] = useState<number>(50000);
  const [condition, setCondition] = useState<string>("good");
  const [location, setLocation] = useState<string>("nairobi");
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  
  // Image upload states
  const [frontImage, setFrontImage] = useState<string | undefined>(undefined);
  const [reverseImage, setReverseImage] = useState<string | undefined>(undefined);
  const [leftSideImage, setLeftSideImage] = useState<string | undefined>(undefined);
  const [rightSideImage, setRightSideImage] = useState<string | undefined>(undefined);
  const [useImageAnalysis, setUseImageAnalysis] = useState<boolean>(false);
  
  const { toast } = useToast();

  const valuationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/vehicle-valuation", data);
      return response.json();
    },
    onSuccess: (data) => {
      console.log("=== FRONTEND VALUATION DEBUG ===");
      console.log("API Response:", data);
      console.log("Market Value:", data.marketValue);
      console.log("Type of Market Value:", typeof data.marketValue);
      console.log("================================");
      setValuationResult(data);
      toast({
        title: "Valuation Complete",
        description: useImageAnalysis && data.imageAnalysis?.hasImageAnalysis 
          ? "Your vehicle valuation with image analysis has been calculated successfully!"
          : "Your vehicle valuation has been calculated successfully!",
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

    // Check if image analysis is enabled but images are missing
    if (useImageAnalysis) {
      const missingImages = [];
      if (!frontImage) missingImages.push("Front view");
      if (!reverseImage) missingImages.push("Reverse view");
      if (!leftSideImage) missingImages.push("Left side");
      if (!rightSideImage) missingImages.push("Right side");
      
      if (missingImages.length > 0) {
        toast({
          title: "Images Required",
          description: `Please upload all vehicle images: ${missingImages.join(", ")}`,
          variant: "destructive",
        });
        return;
      }
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
      // Include image data if image analysis is enabled
      ...(useImageAnalysis && {
        frontImage,
        reverseImage,
        leftSideImage,
        rightSideImage,
        useImageAnalysis: true,
      }),
    };

    valuationMutation.mutate(valuationData);
  };

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount) || numAmount === null || numAmount === undefined) {
      return 'KES 0';
    }
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
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

                {/* Image Analysis Section */}
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-purple-600" />
                    <Label className="text-base font-semibold">Enhanced Image Analysis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useImageAnalysis"
                      checked={useImageAnalysis}
                      onChange={(e) => setUseImageAnalysis(e.target.checked)}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <Label htmlFor="useImageAnalysis" className="text-sm">
                      Enable AI image analysis for damage assessment and price adjustments
                    </Label>
                  </div>
                  
                  {useImageAnalysis && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            AI Damage Assessment
                          </p>
                          <p className="text-xs text-blue-700">
                            Upload clear photos of your vehicle from all angles. Our AI will analyze for damage, repairs, and blemishes to provide accurate pricing adjustments.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload
                          label="Front View"
                          description="Clear front view of the vehicle"
                          value={frontImage}
                          onChange={setFrontImage}
                          required={useImageAnalysis}
                        />
                        <ImageUpload
                          label="Reverse View"
                          description="Clear rear view of the vehicle"
                          value={reverseImage}
                          onChange={setReverseImage}
                          required={useImageAnalysis}
                        />
                        <ImageUpload
                          label="Left Side"
                          description="Clear left side view"
                          value={leftSideImage}
                          onChange={setLeftSideImage}
                          required={useImageAnalysis}
                        />
                        <ImageUpload
                          label="Right Side"
                          description="Clear right side view"
                          value={rightSideImage}
                          onChange={setRightSideImage}
                          required={useImageAnalysis}
                        />
                      </div>
                    </div>
                  )}
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
                          {formatCurrency(valuationResult.marketValue || 0)}
                        </div>
                        <div className="text-lg text-gray-600">Current Market Value</div>
                        <div className="flex items-center justify-center mt-2">
                          <Badge className={`${getConfidenceColor(valuationResult.confidenceScore || 0)}`}>
                            {valuationResult.confidenceScore || 0}% Confidence
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-semibold text-gray-900">
                            {formatCurrency(
                              valuationResult.referenceVehicle?.basePrice || 
                              valuationResult.valuationFactors?.basePrice || 
                              0
                            )}
                          </div>
                          <div className="text-sm text-gray-600">Base Price</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-semibold text-gray-900">
                            {formatCurrency(valuationResult.depreciatedValue || 0)}
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
                          -{((valuationResult.valuationFactors?.ageDepreciation || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mileage Adjustment</span>
                        <span className={`font-semibold ${(valuationResult.valuationFactors?.mileageAdjustment || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(valuationResult.valuationFactors?.mileageAdjustment || 0) >= 0 ? '+' : ''}
                          {((valuationResult.valuationFactors?.mileageAdjustment || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Condition Adjustment</span>
                        <span className={`font-semibold ${(valuationResult.valuationFactors?.conditionAdjustment || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(valuationResult.valuationFactors?.conditionAdjustment || 0) >= 0 ? '+' : ''}
                          {((valuationResult.valuationFactors?.conditionAdjustment || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Location Factor</span>
                        <span className={`font-semibold ${(valuationResult.valuationFactors?.locationFactor || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(valuationResult.valuationFactors?.locationFactor || 0) >= 0 ? '+' : ''}
                          {((valuationResult.valuationFactors?.locationFactor || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      {valuationResult.imageAnalysis?.hasImageAnalysis && (
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-gray-600">AI Damage Assessment</span>
                          <span className="font-semibold text-red-600">
                            -{(valuationResult.imageAnalysis.damageDiscount * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
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

                {/* Image Analysis Results */}
                {valuationResult.imageAnalysis?.hasImageAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Camera className="h-5 w-5 text-blue-600" />
                        <span>AI Image Analysis Results</span>
                      </CardTitle>
                      <CardDescription>
                        Professional damage assessment with pricing adjustments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Overall Damage Score */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Overall Condition Score</span>
                            <Badge 
                              variant={valuationResult.imageAnalysis.overallDamageScore <= 10 ? "success" : 
                                     valuationResult.imageAnalysis.overallDamageScore <= 30 ? "warning" : "destructive"}
                              className="text-xs"
                            >
                              {100 - (valuationResult.imageAnalysis.overallDamageScore || 0)}/100
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                valuationResult.imageAnalysis.overallDamageScore <= 10 ? 'bg-green-500' : 
                                valuationResult.imageAnalysis.overallDamageScore <= 30 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${100 - (valuationResult.imageAnalysis.overallDamageScore || 0)}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {valuationResult.imageAnalysis.overallDamageScore <= 10 ? 'Excellent condition' : 
                             valuationResult.imageAnalysis.overallDamageScore <= 30 ? 'Good condition with minor issues' : 
                             'Visible damage requiring attention'}
                          </p>
                        </div>

                        {/* Damage Analysis by View */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Front View</span>
                              <Badge variant="outline" className="text-xs">
                                {valuationResult.imageAnalysis.frontDamageScore || 0}/100
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">
                              {valuationResult.imageAnalysis.frontAnalysis || 'No analysis available'}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Rear View</span>
                              <Badge variant="outline" className="text-xs">
                                {valuationResult.imageAnalysis.reverseDamageScore || 0}/100
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">
                              {valuationResult.imageAnalysis.reverseAnalysis || 'No analysis available'}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Left Side</span>
                              <Badge variant="outline" className="text-xs">
                                {valuationResult.imageAnalysis.leftSideDamageScore || 0}/100
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">
                              {valuationResult.imageAnalysis.leftSideAnalysis || 'No analysis available'}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Right Side</span>
                              <Badge variant="outline" className="text-xs">
                                {valuationResult.imageAnalysis.rightSideDamageScore || 0}/100
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">
                              {valuationResult.imageAnalysis.rightSideAnalysis || 'No analysis available'}
                            </p>
                          </div>
                        </div>

                        {/* Price Impact */}
                        {valuationResult.imageAnalysis.damageDiscount > 0 && (
                          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="text-sm font-medium text-red-800">Price Impact</span>
                            </div>
                            <p className="text-sm text-red-700">
                              Based on the damage assessment, the vehicle value has been reduced by{' '}
                              <strong>{(valuationResult.imageAnalysis.damageDiscount * 100).toFixed(1)}%</strong>{' '}
                              ({formatCurrency((valuationResult.valuationFactors?.basePrice || 0) * valuationResult.imageAnalysis.damageDiscount)}).
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
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