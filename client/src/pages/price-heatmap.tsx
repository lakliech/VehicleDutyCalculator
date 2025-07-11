import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ModuleNavigation } from "@/components/module-navigation";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign,
  Calendar,
  Filter,
  RefreshCw,
  BarChart3,
  Map,
  Info
} from "lucide-react";

interface HeatmapCell {
  make: string;
  model: string;
  engineSize: number;
  priceRange: string;
  averagePrice: number;
  listingCount: number;
  pricePerformance: 'hot' | 'warm' | 'cool' | 'cold';
  priceChange: number; // percentage change
  marketActivity: 'high' | 'medium' | 'low';
  demandLevel: number; // 1-100
  valueRating: 'excellent' | 'good' | 'fair' | 'poor';
}

interface MarketInsight {
  category: string;
  insight: string;
  trend: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

const KENYAN_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Meru",
  "Nyeri", "Kitale", "Garissa", "Kakamega", "Malindi", "Kilifi", "Lamu", "Other"
];

export default function PriceHeatmap() {
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'demand' | 'activity' | 'change'>('demand');

  // Fetch available makes for filter
  const { data: makes = [] } = useQuery({
    queryKey: ["/api/vehicle-references/makes"],
  });

  // Fetch heatmap data
  const { data: heatmapData = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/marketplace/heatmap", selectedMake, selectedLocation, selectedPriceRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedMake !== "all") params.append("make", selectedMake);
      if (selectedLocation !== "all") params.append("location", selectedLocation);
      if (selectedPriceRange !== "all") params.append("priceRange", selectedPriceRange);
      
      const response = await fetch(`/api/marketplace/heatmap?${params}`);
      if (!response.ok) throw new Error("Failed to fetch heatmap data");
      return response.json();
    },
  });

  // Fetch market insights
  const { data: insights = [] } = useQuery({
    queryKey: ["/api/marketplace/insights", selectedMake, selectedLocation],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedMake !== "all") params.append("make", selectedMake);
      if (selectedLocation !== "all") params.append("location", selectedLocation);
      
      const response = await fetch(`/api/marketplace/insights?${params}`);
      if (!response.ok) throw new Error("Failed to fetch insights");
      return response.json();
    },
  });

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'hot': return 'bg-red-500 hover:bg-red-600';
      case 'warm': return 'bg-orange-400 hover:bg-orange-500';
      case 'cool': return 'bg-blue-400 hover:bg-blue-500';
      case 'cold': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-gray-400 hover:bg-gray-500';
    }
  };

  const getActivityBadge = (activity: string) => {
    switch (activity) {
      case 'high': return <Badge variant="destructive">High Activity</Badge>;
      case 'medium': return <Badge variant="secondary">Medium Activity</Badge>;
      case 'low': return <Badge variant="outline">Low Activity</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getValueBadge = (rating: string) => {
    switch (rating) {
      case 'excellent': return <Badge className="bg-green-500">Excellent Value</Badge>;
      case 'good': return <Badge className="bg-blue-500">Good Value</Badge>;
      case 'fair': return <Badge className="bg-yellow-500">Fair Value</Badge>;
      case 'poor': return <Badge className="bg-red-500">Poor Value</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const sortedData = [...heatmapData].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.averagePrice - b.averagePrice;
      case 'demand': return b.demandLevel - a.demandLevel;
      case 'activity': 
        const activityOrder = { high: 3, medium: 2, low: 1 };
        return activityOrder[b.marketActivity] - activityOrder[a.marketActivity];
      case 'change': return Math.abs(b.priceChange) - Math.abs(a.priceChange);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ModuleNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Map className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Price Trend Heatmap
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive visualization of vehicle pricing trends with color-coded market insights and demand analysis
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & View Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Vehicle Make</label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Makes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {KENYAN_COUNTIES.map((county) => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-1000000">Under 1M</SelectItem>
                    <SelectItem value="1000000-3000000">1M - 3M</SelectItem>
                    <SelectItem value="3000000-5000000">3M - 5M</SelectItem>
                    <SelectItem value="5000000-10000000">5M - 10M</SelectItem>
                    <SelectItem value="10000000-999999999">Above 10M</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demand">Demand Level</SelectItem>
                    <SelectItem value="price">Average Price</SelectItem>
                    <SelectItem value="activity">Market Activity</SelectItem>
                    <SelectItem value="change">Price Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  List View
                </Button>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Heatmap Display */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Market Heatmap</span>
                  <Badge variant="outline">{sortedData.length} vehicles</Badge>
                </CardTitle>
                <CardDescription>
                  Color intensity represents price performance and market demand
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {sortedData.map((item, index) => (
                      <div
                        key={`${item.make}-${item.model}-${index}`}
                        className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${getPerformanceColor(item.pricePerformance)} text-white hover:scale-105 shadow-lg`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-sm">{item.make}</h3>
                            <p className="text-xs opacity-90">{item.model}</p>
                          </div>
                          {getTrendIcon(item.priceChange)}
                        </div>
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-medium">KES {item.averagePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Change:</span>
                            <span className={item.priceChange >= 0 ? 'text-green-200' : 'text-red-200'}>
                              {item.priceChange >= 0 ? '+' : ''}{item.priceChange.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Demand:</span>
                            <span>{item.demandLevel}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Listings:</span>
                            <span>{item.listingCount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedData.map((item, index) => (
                      <div key={`${item.make}-${item.model}-${index}`} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-4 h-4 rounded ${getPerformanceColor(item.pricePerformance).replace('hover:', '')}`}></div>
                          <div>
                            <h3 className="font-semibold">{item.make} {item.model}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.engineSize}cc • {item.listingCount} listings</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-right">
                            <div className="font-medium">KES {item.averagePrice.toLocaleString()}</div>
                            <div className={`flex items-center gap-1 ${item.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {getTrendIcon(item.priceChange)}
                              {item.priceChange >= 0 ? '+' : ''}{item.priceChange.toFixed(1)}%
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium">{item.demandLevel}%</div>
                            <div className="text-gray-600 dark:text-gray-400">demand</div>
                          </div>
                          
                          {getActivityBadge(item.marketActivity)}
                          {getValueBadge(item.valueRating)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Market Insights Panel */}
          <div className="space-y-6">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Hot Market (High demand, rising prices)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                  <span className="text-sm">Warm Market (Good activity)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="text-sm">Cool Market (Moderate activity)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-sm">Cold Market (Low activity)</span>
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.length > 0 ? insights.map((insight: MarketInsight, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{insight.category}</Badge>
                      <div className="flex items-center gap-1">
                        {insight.trend === 'positive' ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : insight.trend === 'negative' ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <Activity className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="text-xs text-gray-600">{insight.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{insight.insight}</p>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No insights available for current filters</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Vehicles:</span>
                  <span className="font-medium">{sortedData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Price:</span>
                  <span className="font-medium">
                    KES {sortedData.length > 0 ? Math.round(sortedData.reduce((sum, item) => sum + item.averagePrice, 0) / sortedData.length).toLocaleString() : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hot Markets:</span>
                  <span className="font-medium text-red-600">
                    {sortedData.filter(item => item.pricePerformance === 'hot').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">High Activity:</span>
                  <span className="font-medium text-orange-600">
                    {sortedData.filter(item => item.marketActivity === 'high').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}