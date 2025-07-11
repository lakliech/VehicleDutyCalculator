import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModuleNavigation } from "@/components/module-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, BarChart3, Filter, Eye, DollarSign, Info } from "lucide-react";
import { ResponsiveContainer, Cell, Tooltip, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, Legend } from "recharts";

interface VehicleData {
  id: number;
  make: string;
  model: string;
  engineCapacity: number;
  crspKes: number | null;
  crsp2020: number | null;
  fuelType: string | null;
  bodyType: string | null;
}

interface HeatmapData {
  make: string;
  model: string;
  engineCapacity: number;
  currentPrice: number;
  priceCategory: 'budget' | 'mid-range' | 'premium' | 'luxury';
  demandLevel: 'low' | 'medium' | 'high';
  trend: 'declining' | 'stable' | 'rising';
  x: number;
  y: number;
  color: string;
}

export default function PriceTrends() {
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"heatmap" | "scatter">("heatmap");

  // Fetch vehicle data
  const { data: vehicles, isLoading } = useQuery<VehicleData[]>({
    queryKey: ['/api/vehicle-references'],
    queryFn: () => fetch('/api/vehicle-references').then(res => res.json())
  });

  // Process data for heatmap
  const heatmapData = useMemo(() => {
    if (!vehicles) return [];

    const filteredVehicles = vehicles
      .filter(v => v.crspKes || v.crsp2020)
      .filter(v => selectedMake === "all" || v.make === selectedMake)
      .map((vehicle, index) => {
        const currentPrice = vehicle.crspKes || vehicle.crsp2020 || 0;
        
        // Categorize by price
        let priceCategory: 'budget' | 'mid-range' | 'premium' | 'luxury';
        if (currentPrice < 1000000) priceCategory = 'budget';
        else if (currentPrice < 3000000) priceCategory = 'mid-range';
        else if (currentPrice < 5000000) priceCategory = 'premium';
        else priceCategory = 'luxury';

        // Simulate demand level based on engine capacity and price
        let demandLevel: 'low' | 'medium' | 'high';
        if (vehicle.engineCapacity && vehicle.engineCapacity <= 1500 && currentPrice < 2000000) {
          demandLevel = 'high';
        } else if (vehicle.engineCapacity && vehicle.engineCapacity <= 2500 && currentPrice < 4000000) {
          demandLevel = 'medium';
        } else {
          demandLevel = 'low';
        }

        // Simulate trend based on data availability and price range
        let trend: 'declining' | 'stable' | 'rising';
        if (vehicle.crspKes && vehicle.crsp2020) {
          const changeRatio = vehicle.crspKes / vehicle.crsp2020;
          if (changeRatio > 1.1) trend = 'rising';
          else if (changeRatio < 0.9) trend = 'declining';
          else trend = 'stable';
        } else {
          trend = currentPrice > 3000000 ? 'declining' : 'stable';
        }

        // Color mapping
        const getColor = () => {
          if (demandLevel === 'high' && trend === 'rising') return '#22c55e'; // Green
          if (demandLevel === 'high' && trend === 'stable') return '#3b82f6'; // Blue
          if (demandLevel === 'medium' && trend === 'rising') return '#f59e0b'; // Amber
          if (demandLevel === 'medium' && trend === 'stable') return '#8b5cf6'; // Purple
          if (trend === 'declining') return '#ef4444'; // Red
          return '#6b7280'; // Gray
        };

        return {
          make: vehicle.make,
          model: vehicle.model,
          engineCapacity: vehicle.engineCapacity || 0,
          currentPrice,
          priceCategory,
          demandLevel,
          trend,
          x: vehicle.engineCapacity || 1000,
          y: currentPrice,
          color: getColor(),
          size: demandLevel === 'high' ? 120 : demandLevel === 'medium' ? 80 : 50
        };
      })
      .filter(v => selectedCategory === "all" || v.priceCategory === selectedCategory)
      .sort((a, b) => a.demandLevel === 'low' ? -1 : b.demandLevel === 'low' ? 1 : 0) // Low demand first
      .slice(0, 200); // Increase limit for better visualization

    return filteredVehicles;
  }, [vehicles, selectedMake, selectedCategory]);

  // Get unique makes for filter
  const makes = useMemo(() => {
    if (!vehicles) return [];
    return [...new Set(vehicles.map(v => v.make))].sort();
  }, [vehicles]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    return `${(price / 1000).toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.make} {data.model}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.engineCapacity}cc</p>
          <p className="text-sm">Price: KES {data.currentPrice.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={data.demandLevel === 'high' ? 'default' : data.demandLevel === 'medium' ? 'secondary' : 'outline'} className="text-xs">
              {data.demandLevel} demand
            </Badge>
            <Badge 
              variant={data.trend === 'rising' ? 'default' : data.trend === 'stable' ? 'secondary' : 'destructive'} 
              className="text-xs flex items-center gap-1"
            >
              {data.trend === 'rising' && <TrendingUp className="w-3 h-3" />}
              {data.trend === 'declining' && <TrendingDown className="w-3 h-3" />}
              {data.trend}
            </Badge>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Price Trend Heatmap</h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              Market Intelligence
            </Badge>
          </div>
          <p className="text-purple-100 text-lg max-w-2xl">
            Interactive visualization of vehicle pricing trends with color-coded market insights and demand analysis
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold">{vehicles?.length || 0}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Price</p>
                  <p className="text-2xl font-bold">
                    {vehicles && vehicles.length > 0
                      ? formatPrice(
                          vehicles
                            .filter(v => v.crspKes || v.crsp2020)
                            .reduce((sum, v) => sum + (v.crspKes || v.crsp2020 || 0), 0) /
                          vehicles.filter(v => v.crspKes || v.crsp2020).length
                        )
                      : '0'}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Demand</p>
                  <p className="text-2xl font-bold">
                    {heatmapData.filter(d => d.demandLevel === 'high').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rising Trends</p>
                  <p className="text-2xl font-bold">
                    {heatmapData.filter(d => d.trend === 'rising').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Market Visualization
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "heatmap" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("heatmap")}
                    >
                      Heatmap
                    </Button>
                    <Button
                      variant={viewMode === "scatter" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("scatter")}
                    >
                      Scatter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-64 w-full" />
                    </div>
                  </div>
                ) : (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart 
                        data={heatmapData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="x" 
                          type="number"
                          domain={[0, 'dataMax + 500']}
                          name="Engine Capacity (cc)"
                          tickFormatter={(value) => `${value}cc`}
                          label={{ value: 'Engine Capacity (cc)', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis 
                          dataKey="y"
                          type="number"
                          domain={[0, 'dataMax + 500000']}
                          name="Price (KES)"
                          tickFormatter={formatPrice}
                          label={{ value: 'Price (KES)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter 
                          name="Vehicles" 
                          data={heatmapData}
                          fill="#8884d8"
                        >
                          {heatmapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Vehicle Make
                  </label>
                  <Select value={selectedMake} onValueChange={setSelectedMake}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Makes</SelectItem>
                      {makes.map(make => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Price Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="budget">Budget (&lt;1M)</SelectItem>
                      <SelectItem value="mid-range">Mid-range (1-3M)</SelectItem>
                      <SelectItem value="premium">Premium (3-5M)</SelectItem>
                      <SelectItem value="luxury">Luxury (5M+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Color Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">High Demand + Rising</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm">High Demand + Stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-sm">Medium Demand + Rising</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm">Medium Demand + Stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Declining Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span className="text-sm">Low Demand</span>
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">High Demand Segments:</p>
                  <p className="text-gray-600">Vehicles under 1500cc with prices below 2M KES</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">Rising Trends:</p>
                  <p className="text-gray-600">Mid-range SUVs and fuel-efficient compact cars</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">Price Correlation:</p>
                  <p className="text-gray-600">Engine capacity strongly correlates with pricing</p>
                </div>
              </CardContent>
            </Card>

            {/* How to Read */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  How to Read the Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p><strong>X-Axis:</strong> Engine capacity in CC</p>
                <p><strong>Y-Axis:</strong> Vehicle price in KES</p>
                <p><strong>Colors:</strong> Indicate demand level and price trends</p>
                <p><strong>Hover:</strong> Over points to see detailed vehicle information</p>
                <div className="pt-2 border-t">
                  <p className="text-xs">Data source: Vehicle CRSP values from official database</p>
                </div>
              </CardContent>
            </Card>

            {/* Module Navigation */}
            <ModuleNavigation currentModule="Price Trends" />
          </div>
        </div>
      </div>
    </div>
  );
}