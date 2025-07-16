import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  DollarSign,
  BarChart3,
  Brain,
  Target,
  Clock,
  ArrowUp,
  ArrowDown,
  Lightbulb
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface PricingRecommendation {
  recommendedPrice: number;
  priceAdjustment: number;
  marketPosition: 'above' | 'below' | 'competitive';
  confidence: number;
  reasoning: string;
  factors: string[];
  seasonalAdjustment?: number;
  depreciationForecast: {
    threeMonths: number;
    sixMonths: number;
    twelveMonths: number;
  };
  alertType?: 'overpriced' | 'underpriced' | 'optimal' | 'seasonal_opportunity';
}

interface PriceAlert {
  id: number;
  alertType: string;
  alertMessage: string;
  priority: string;
  currentPrice?: number;
  targetPrice?: number;
  priceDeviation?: number;
  createdAt: string;
  listingId?: number;
}

interface MarketInsight {
  id: number;
  insightType: string;
  title: string;
  summary: string;
  detailedAnalysis: string;
  actionableRecommendations: string[];
  priority: string;
  confidenceLevel: number;
  createdAt: string;
}

interface SeasonalTrend {
  month: number;
  seasonality: string;
  avgPriceMultiplier: number;
  demandLevel: string;
  supplyLevel: string;
  recommendations: string;
  bestBuyingOpportunity: boolean;
  bestSellingOpportunity: boolean;
}

export default function SmartPricing() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);

  // Fetch user's listings for pricing analysis
  const { data: userListings, isLoading: listingsLoading } = useQuery({
    queryKey: ['/api/my-listings'],
    enabled: isAuthenticated
  });

  // Fetch pricing alerts
  const { data: priceAlerts, isLoading: alertsLoading } = useQuery<PriceAlert[]>({
    queryKey: ['/api/pricing/alerts'],
    enabled: isAuthenticated
  });

  // Fetch market insights
  const { data: marketInsights, isLoading: insightsLoading } = useQuery<MarketInsight[]>({
    queryKey: ['/api/pricing/market-insights'],
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  // Fetch seasonal trends
  const { data: seasonalTrends, isLoading: trendsLoading } = useQuery<SeasonalTrend[]>({
    queryKey: ['/api/pricing/seasonal-trends'],
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  // Get pricing recommendation for selected listing
  const { data: pricingRecommendation, isLoading: recommendationLoading } = useQuery<PricingRecommendation>({
    queryKey: ['/api/listings', selectedListingId, 'pricing-recommendation'],
    enabled: !!selectedListingId,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });

  // Generate market alerts mutation
  const generateAlertsMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/pricing/generate-alerts'),
    onSuccess: () => {
      toast({
        title: 'Market alerts generated',
        description: 'Your pricing alerts have been updated with latest market data.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/pricing/alerts'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to generate market alerts. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Acknowledge pricing recommendation
  const acknowledgeMutation = useMutation({
    mutationFn: (listingId: number) => 
      apiRequest('POST', `/api/listings/${listingId}/acknowledge-pricing`),
    onSuccess: () => {
      toast({
        title: 'Recommendation acknowledged',
        description: 'Thank you for your feedback on our pricing suggestion.',
      });
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Smart Pricing Intelligence</h2>
              <p className="text-gray-600 mb-4">
                Get AI-powered pricing recommendations and market insights for your vehicle listings.
              </p>
              <Button>Sign In to Access Smart Pricing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case 'overpriced':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'underpriced':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'seasonal_opportunity':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'urgent':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getPositionBadge = (position: string) => {
    switch (position) {
      case 'above':
        return <Badge variant="destructive">Above Market</Badge>;
      case 'below':
        return <Badge variant="secondary">Below Market</Badge>;
      default:
        return <Badge variant="default">Competitive</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getDepreciationData = () => {
    if (!pricingRecommendation) return [];
    
    const forecast = pricingRecommendation.depreciationForecast;
    const currentPrice = pricingRecommendation.recommendedPrice;
    
    return [
      { period: 'Current', value: currentPrice },
      { period: '3 Months', value: forecast.threeMonths },
      { period: '6 Months', value: forecast.sixMonths },
      { period: '12 Months', value: forecast.twelveMonths },
    ];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Pricing Intelligence</h1>
        <p className="text-gray-600">
          AI-powered pricing recommendations and market insights for your vehicle listings
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="trends">Seasonal Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userListings?.filter((listing: any) => listing.status === 'active').length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Available for pricing analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Price Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {priceAlerts?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requiring your attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Insights</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {marketInsights?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Available insights
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Market Insights</CardTitle>
              <CardDescription>
                Latest AI-generated insights about the Kenyan automotive market
              </CardDescription>
            </CardHeader>
            <CardContent>
              {insightsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : marketInsights && marketInsights.length > 0 ? (
                <div className="space-y-4">
                  {marketInsights.slice(0, 3).map((insight) => (
                    <div key={insight.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="outline">
                          {Math.round(insight.confidenceLevel * 100)}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{insight.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No market insights available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Listing for Analysis</CardTitle>
              <CardDescription>
                Choose a vehicle listing to get AI-powered pricing recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {listingsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : userListings && userListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userListings
                    .filter((listing: any) => listing.status === 'active')
                    .map((listing: any) => (
                    <Card 
                      key={listing.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedListingId === listing.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedListingId(listing.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">
                              {listing.year} {listing.make} {listing.model}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(parseInt(listing.price))}
                            </p>
                          </div>
                          <Button 
                            variant={selectedListingId === listing.id ? 'default' : 'outline'}
                            size="sm"
                          >
                            {selectedListingId === listing.id ? 'Selected' : 'Analyze'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No active listings found. Create a listing to get pricing recommendations.</p>
              )}
            </CardContent>
          </Card>

          {selectedListingId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Pricing Recommendation
                </CardTitle>
                <CardDescription>
                  Based on market analysis and vehicle data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendationLoading ? (
                  <div className="space-y-4">
                    <div className="h-32 bg-gray-100 rounded animate-pulse" />
                    <div className="h-24 bg-gray-100 rounded animate-pulse" />
                  </div>
                ) : pricingRecommendation ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm text-gray-600">Recommended Price</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(pricingRecommendation.recommendedPrice)}
                        </p>
                        <div className="flex items-center justify-center mt-1">
                          {pricingRecommendation.priceAdjustment > 0 ? (
                            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : pricingRecommendation.priceAdjustment < 0 ? (
                            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                          ) : null}
                          <span className={`text-sm ${
                            pricingRecommendation.priceAdjustment > 0 ? 'text-green-600' : 
                            pricingRecommendation.priceAdjustment < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {pricingRecommendation.priceAdjustment > 0 ? '+' : ''}
                            {pricingRecommendation.priceAdjustment.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <p className="text-sm text-gray-600">Market Position</p>
                        <div className="mt-2">
                          {getPositionBadge(pricingRecommendation.marketPosition)}
                        </div>
                        <Progress 
                          value={pricingRecommendation.confidence * 100} 
                          className="mt-2" 
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round(pricingRecommendation.confidence * 100)}% confidence
                        </p>
                      </div>

                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm text-gray-600">Recommendation</p>
                        <p className="text-lg font-semibold text-green-600 mt-2">
                          {pricingRecommendation.alertType === 'optimal' ? 'Optimal Pricing' :
                           pricingRecommendation.alertType === 'overpriced' ? 'Consider Reducing' :
                           pricingRecommendation.alertType === 'underpriced' ? 'Consider Increasing' :
                           'Seasonal Opportunity'}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">AI Analysis</h4>
                      <p className="text-gray-700">{pricingRecommendation.reasoning}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Factors</h4>
                      <div className="flex flex-wrap gap-2">
                        {pricingRecommendation.factors.map((factor, index) => (
                          <Badge key={index} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Depreciation Forecast</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={getDepreciationData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                          <Tooltip 
                            formatter={(value) => [formatCurrency(value as number), 'Value']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={() => acknowledgeMutation.mutate(selectedListingId)}
                        disabled={acknowledgeMutation.isPending}
                      >
                        {acknowledgeMutation.isPending ? 'Acknowledging...' : 'Acknowledge Recommendation'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Failed to generate recommendation. Please try again.</p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Price Alerts</CardTitle>
                <CardDescription>
                  Market notifications for your vehicle listings
                </CardDescription>
              </div>
              <Button 
                onClick={() => generateAlertsMutation.mutate()}
                disabled={generateAlertsMutation.isPending}
              >
                {generateAlertsMutation.isPending ? 'Generating...' : 'Generate Alerts'}
              </Button>
            </CardHeader>
            <CardContent>
              {alertsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : priceAlerts && priceAlerts.length > 0 ? (
                <div className="space-y-4">
                  {priceAlerts.map((alert) => (
                    <Alert key={alert.id}>
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.alertType)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium capitalize">
                              {alert.alertType.replace('_', ' ')} Alert
                            </h4>
                            <Badge variant={getAlertColor(alert.priority)}>
                              {alert.priority}
                            </Badge>
                          </div>
                          <AlertDescription>
                            {alert.alertMessage}
                          </AlertDescription>
                          {alert.priceDeviation && (
                            <p className="text-xs text-gray-500 mt-1">
                              Price deviation: {alert.priceDeviation}%
                            </p>
                          )}
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">No price alerts yet.</p>
                  <Button 
                    onClick={() => generateAlertsMutation.mutate()}
                    disabled={generateAlertsMutation.isPending}
                  >
                    Generate Market Alerts
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insightsLoading ? (
              <>
                <div className="h-64 bg-gray-100 rounded animate-pulse" />
                <div className="h-64 bg-gray-100 rounded animate-pulse" />
              </>
            ) : marketInsights && marketInsights.length > 0 ? (
              marketInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant="outline">
                        {insight.insightType}
                      </Badge>
                    </div>
                    <CardDescription>
                      Confidence: {Math.round(insight.confidenceLevel * 100)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{insight.summary}</p>
                    <details className="group">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        Read detailed analysis
                      </summary>
                      <div className="mt-3 space-y-3">
                        <p className="text-sm text-gray-600">{insight.detailedAnalysis}</p>
                        {insight.actionableRecommendations && insight.actionableRecommendations.length > 0 && (
                          <div>
                            <h5 className="font-medium text-sm mb-2">Recommendations:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {insight.actionableRecommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Lightbulb className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No market insights available yet.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Seasonal Pricing Trends
              </CardTitle>
              <CardDescription>
                Best times to buy and sell vehicles in the Kenyan market
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trendsLoading ? (
                <div className="h-64 bg-gray-100 rounded animate-pulse" />
              ) : seasonalTrends && seasonalTrends.length > 0 ? (
                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={seasonalTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tickFormatter={(value) => {
                          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                          return months[value - 1];
                        }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${((value as number) * 100).toFixed(1)}%`, 'Price Multiplier']}
                        labelFormatter={(label) => {
                          const months = ['January', 'February', 'March', 'April', 'May', 'June',
                                         'July', 'August', 'September', 'October', 'November', 'December'];
                          return months[(label as number) - 1];
                        }}
                      />
                      <Bar 
                        dataKey="avgPriceMultiplier" 
                        fill="#8884d8"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-3">Best Selling Months</h4>
                      <div className="space-y-2">
                        {seasonalTrends
                          .filter(trend => trend.bestSellingOpportunity)
                          .map((trend) => (
                          <div key={trend.month} className="flex items-center justify-between p-2 bg-green-50 rounded">
                            <span className="font-medium">
                              {new Date(0, trend.month - 1).toLocaleString('default', { month: 'long' })}
                            </span>
                            <Badge variant="default">
                              {trend.demandLevel.replace('_', ' ')}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Best Buying Months</h4>
                      <div className="space-y-2">
                        {seasonalTrends
                          .filter(trend => trend.bestBuyingOpportunity)
                          .map((trend) => (
                          <div key={trend.month} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="font-medium">
                              {new Date(0, trend.month - 1).toLocaleString('default', { month: 'long' })}
                            </span>
                            <Badge variant="secondary">
                              Lower prices
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No seasonal trends data available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}