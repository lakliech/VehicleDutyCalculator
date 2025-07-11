import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  BarChart3, 
  Brain, 
  DollarSign, 
  Calendar,
  Target,
  AlertCircle,
  Lightbulb,
  Eye,
  ShoppingCart,
  Car
} from "lucide-react";
import { VehicleSelector } from "@/components/vehicle-selector";
import { ModuleNavigation } from "@/components/module-navigation";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { VehicleReference } from "@shared/schema";

interface PriceTrendAnalysis {
  vehicleInfo: {
    make: string;
    model: string;
    engineSize: number;
    averagePrice: number;
    priceRange: { min: number; max: number };
    totalListings: number;
  };
  marketInsights: {
    trendDirection: "upward" | "downward" | "stable";
    confidence: number;
    keyFactors: string[];
    recommendation: string;
  };
  priceHistory: Array<{
    year: number;
    averagePrice: number;
    listingCount: number;
    depreciation: number;
  }>;
  aiAnalysis: {
    summary: string;
    marketPosition: string;
    buyingAdvice: string;
    sellingAdvice: string;
    futureOutlook: string;
  };
}

export default function PriceTrends() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [analysis, setAnalysis] = useState<PriceTrendAnalysis | null>(null);
  const { toast } = useToast();

  const analyzePrice = useMutation({
    mutationFn: async (vehicleData: { make: string; model: string; engineSize?: number }) => {
      const response = await apiRequest("POST", "/api/price-trends/analyze", vehicleData);
      return response;
    },
    onSuccess: (data) => {
      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "AI-powered price trend analysis has been generated",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze price trends",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    if (!selectedVehicle) {
      toast({
        title: "Vehicle Required",
        description: "Please select a vehicle to analyze",
        variant: "destructive",
      });
      return;
    }

    analyzePrice.mutate({
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      engineSize: selectedVehicle.engineCapacity,
    });
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "upward":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "downward":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case "upward":
        return "text-green-600 bg-green-50 border-green-200";
      case "downward":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case "buy":
        return "text-green-600 bg-green-50 border-green-200";
      case "sell":
        return "text-red-600 bg-red-50 border-red-200";
      case "wait":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <Brain className="inline w-8 h-8 mr-2 text-purple-600" />
              AI Price Trend Analyzer
            </h1>
            <p className="text-lg text-gray-600">
              Get intelligent insights about vehicle pricing trends powered by AI
            </p>
          </div>

          {/* Vehicle Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Select Vehicle to Analyze
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <VehicleSelector
                  onVehicleSelect={setSelectedVehicle}
                  categoryFilter="vehicles"
                />
                
                {selectedVehicle && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Selected Vehicle:</h3>
                    <p className="text-sm text-gray-600">
                      {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.engineCapacity}cc)
                    </p>
                    <p className="text-sm text-gray-600">
                      CRSP Value: KES {(selectedVehicle.crspKes || selectedVehicle.crsp2020 || 0).toLocaleString()}
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={handleAnalyze}
                  disabled={!selectedVehicle || analyzePrice.isPending}
                  className="w-full"
                >
                  {analyzePrice.isPending ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Price Trends...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyze Price Trends
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Market Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Market Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        KES {analysis.vehicleInfo.averagePrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Average Market Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-600">
                        {analysis.vehicleInfo.totalListings}
                      </div>
                      <div className="text-sm text-gray-600">Active Listings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        KES {analysis.vehicleInfo.priceRange.min.toLocaleString()} - {analysis.vehicleInfo.priceRange.max.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Price Range</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Price Trend:</span>
                      <Badge className={`${getTrendColor(analysis.marketInsights.trendDirection)}`}>
                        {getTrendIcon(analysis.marketInsights.trendDirection)}
                        <span className="ml-2 capitalize">{analysis.marketInsights.trendDirection}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence Level:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={analysis.marketInsights.confidence} className="w-24" />
                        <span className="text-sm font-medium">{analysis.marketInsights.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Recommendation:</span>
                      <Badge className={`${getRecommendationColor(analysis.marketInsights.recommendation)}`}>
                        {analysis.marketInsights.recommendation.toUpperCase()}
                      </Badge>
                    </div>
                    
                    {analysis.marketInsights.keyFactors.length > 0 && (
                      <div>
                        <span className="font-medium">Key Factors:</span>
                        <ul className="mt-2 space-y-1">
                          {analysis.marketInsights.keyFactors.map((factor, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Price History */}
              {analysis.priceHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Price History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.priceHistory.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-lg font-semibold">{entry.year}</div>
                            <div className="text-sm text-gray-600">{entry.listingCount} listings</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">KES {entry.averagePrice.toLocaleString()}</div>
                            {entry.depreciation !== 0 && (
                              <div className={`text-sm ${entry.depreciation > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {entry.depreciation > 0 ? '+' : ''}{entry.depreciation.toFixed(1)}% depreciation
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      AI Market Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Summary</h4>
                      <p className="text-sm text-gray-600">{analysis.aiAnalysis.summary}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Market Position</h4>
                      <p className="text-sm text-gray-600">{analysis.aiAnalysis.marketPosition}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Future Outlook</h4>
                      <p className="text-sm text-gray-600">{analysis.aiAnalysis.futureOutlook}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Expert Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        For Buyers
                      </h4>
                      <p className="text-sm text-gray-600">{analysis.aiAnalysis.buyingAdvice}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        For Sellers
                      </h4>
                      <p className="text-sm text-gray-600">{analysis.aiAnalysis.sellingAdvice}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}