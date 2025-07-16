import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { useAuth } from '@/components/auth-provider';
import { Navigation } from '@/components/navigation';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Car, Banknote, Eye, TrendingUp, Target, Brain, Bell, Lightbulb, Settings,
  ArrowLeft, Plus, RefreshCw, Edit, Star, MessageCircle, Loader2
} from 'lucide-react';

interface PriceAlert {
  id: number;
  listingId: number;
  alertType: 'price_drop' | 'similar_listing' | 'market_change' | 'seasonal_trend';
  threshold: number;
  isActive: boolean;
  message: string;
  createdAt: string;
}

interface SmartRecommendation {
  id: number;
  listingId: number;
  type: 'price_adjustment' | 'feature_highlight' | 'timing_optimization' | 'photo_improvement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: string;
  actionRequired: boolean;
}

export default function ListingManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const listingId = parseInt(params.id as string);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPriceAlert, setSelectedPriceAlert] = useState<PriceAlert | null>(null);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [newAlertData, setNewAlertData] = useState({
    alertType: 'price_drop' as const,
    threshold: 0,
    isActive: true
  });

  // Fetch listing data
  const { data: listing, isLoading: listingLoading } = useQuery({
    queryKey: ['/api/car-listings', listingId, 'details'],
    enabled: !!listingId
  });

  // Fetch pricing recommendation
  const { data: pricingData, isLoading: pricingLoading } = useQuery({
    queryKey: ['/api/listings', listingId, 'pricing-recommendation'],
    enabled: !!listingId
  });

  // Fetch price alerts
  const { data: priceAlerts = [], refetch: refetchAlerts } = useQuery({
    queryKey: ['/api/listings', listingId, 'price-alerts'],
    enabled: !!listingId
  });

  // Fetch smart recommendations
  const { data: smartRecommendations = [], refetch: refetchRecommendations } = useQuery({
    queryKey: ['/api/listings', listingId, 'smart-recommendations'],
    enabled: !!listingId
  });

  // Create price alert mutation
  const createAlertMutation = useMutation({
    mutationFn: (alertData: any) => 
      apiRequest('POST', `/api/listings/${listingId}/price-alerts`, alertData),
    onSuccess: () => {
      toast({ title: "Success", description: "Price alert created successfully" });
      refetchAlerts();
      setIsCreateAlertOpen(false);
      setNewAlertData({ alertType: 'price_drop', threshold: 0, isActive: true });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create price alert",
        variant: "destructive" 
      });
    }
  });

  // Generate recommendations mutation
  const generateRecommendationsMutation = useMutation({
    mutationFn: () => 
      apiRequest('POST', `/api/listings/${listingId}/generate-recommendations`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Smart recommendations generated" });
      refetchRecommendations();
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to generate recommendations",
        variant: "destructive" 
      });
    }
  });

  const handleCreateAlert = () => {
    if (!newAlertData.threshold || newAlertData.threshold <= 0) {
      toast({ 
        title: "Error", 
        description: "Please enter a valid threshold amount",
        variant: "destructive" 
      });
      return;
    }
    createAlertMutation.mutate(newAlertData);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600">Please sign in to access listing management.</p>
        </div>
      </div>
    );
  }

  if (listingLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Listing Management</h1>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Brain className="h-4 w-4 mr-1" />
                Smart Intelligence
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/my-listings">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Listings
                </Link>
              </Button>
            </div>
          </div>
          
          {listing && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">{listing.make} {listing.model}</p>
                  <p className="text-sm text-gray-600">{listing.year} • {listing.mileage?.toLocaleString()} km</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">KES {listing.price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Current Price</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{listing.viewCount || 0} views</p>
                  <p className="text-sm text-gray-600">{listing.favoriteCount || 0} favorites</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Smart Pricing</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{listing?.viewCount || 0}</p>
                      <p className="text-sm text-gray-600">Total Views</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{listing?.favoriteCount || 0}</p>
                      <p className="text-sm text-gray-600">Favorites</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">0</p>
                      <p className="text-sm text-gray-600">Inquiries</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {listing ? Math.floor((Date.now() - new Date(listing.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                      </p>
                      <p className="text-sm text-gray-600">Days Listed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Position */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Market Position
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pricingLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : pricingData ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">vs Market Average</span>
                        <Badge variant={
                          pricingData.marketPosition === 'above' ? 'destructive' :
                          pricingData.marketPosition === 'below' ? 'secondary' : 'default'
                        }>
                          {pricingData.marketPosition === 'above' ? 'Above Market' :
                           pricingData.marketPosition === 'below' ? 'Below Market' : 'Competitive'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Price Deviation</span>
                        <span className="font-medium">{pricingData.benchmarkComparison?.priceDeviation}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Recommended Price</span>
                        <span className="font-medium">KES {pricingData.recommendedPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">No pricing data available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Smart Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI-Powered Pricing Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pricingLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : pricingData ? (
                  <div className="space-y-6">
                    {/* Current Analysis */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg">
                      <h3 className="font-semibold mb-3">Current Price Analysis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">KES {pricingData.quickSalePrice?.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Quick Sale (7-14 days)</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">KES {pricingData.recommendedPrice?.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Recommended (30-45 days)</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-purple-600">KES {pricingData.premiumPrice?.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Premium (60+ days)</p>
                        </div>
                      </div>
                    </div>

                    {/* Market Insights */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Market Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Similar Vehicles</h4>
                          <p className="text-sm text-gray-600">12 similar listings in your area</p>
                          <p className="text-sm text-gray-600">Average: KES 2,450,000</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Market Trend</h4>
                          <p className="text-sm text-gray-600">Prices declining 2.3% this month</p>
                          <p className="text-sm text-green-600">Good time to sell</p>
                        </div>
                      </div>
                    </div>

                    {/* Apply Pricing */}
                    <div className="flex gap-3">
                      <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
                        Apply Recommended Price
                      </Button>
                      <Button variant="outline">
                        Schedule Price Adjustment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No pricing analysis available</p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>
                      Generate Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Price Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    Price Alerts
                  </div>
                  <Button onClick={() => setIsCreateAlertOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Alert
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {priceAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {priceAlerts.map((alert: PriceAlert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${alert.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <div>
                            <p className="font-medium capitalize">
                              {alert.alertType.replace('_', ' ')}
                            </p>
                            <p className="text-sm text-gray-600">
                              Threshold: KES {alert.threshold?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                            {alert.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No price alerts set up</p>
                    <Button onClick={() => setIsCreateAlertOpen(true)}>
                      Create Your First Alert
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Smart Recommendations
                  </div>
                  <Button 
                    onClick={() => generateRecommendationsMutation.mutate()}
                    disabled={generateRecommendationsMutation.isPending}
                  >
                    {generateRecommendationsMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Generate New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {smartRecommendations.length > 0 ? (
                  <div className="space-y-4">
                    {smartRecommendations.map((rec: SmartRecommendation) => (
                      <div key={rec.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge variant={
                              rec.priority === 'high' ? 'destructive' :
                              rec.priority === 'medium' ? 'default' : 'secondary'
                            }>
                              {rec.priority} priority
                            </Badge>
                            <Badge variant="outline">
                              {rec.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          {rec.actionRequired && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium mb-2">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-green-600">{rec.estimatedImpact}</p>
                          {rec.actionRequired && (
                            <Button size="sm">
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No recommendations available</p>
                    <Button onClick={() => generateRecommendationsMutation.mutate()}>
                      Generate Recommendations
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  Listing Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col items-start">
                    <Edit className="h-5 w-5 mb-2" />
                    <span className="font-medium">Edit Listing</span>
                    <span className="text-sm text-gray-500">Update details, photos, price</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col items-start">
                    <Eye className="h-5 w-5 mb-2" />
                    <span className="font-medium">View Analytics</span>
                    <span className="text-sm text-gray-500">Detailed performance insights</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col items-start">
                    <Star className="h-5 w-5 mb-2" />
                    <span className="font-medium">Promote Listing</span>
                    <span className="text-sm text-gray-500">Boost visibility and reach</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col items-start">
                    <MessageCircle className="h-5 w-5 mb-2" />
                    <span className="font-medium">Manage Inquiries</span>
                    <span className="text-sm text-gray-500">View and respond to messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Price Alert Dialog */}
        <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Price Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="alertType">Alert Type</Label>
                <Select 
                  value={newAlertData.alertType} 
                  onValueChange={(value: any) => setNewAlertData(prev => ({ ...prev, alertType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_drop">Price Drop Alert</SelectItem>
                    <SelectItem value="similar_listing">Similar Listing Alert</SelectItem>
                    <SelectItem value="market_change">Market Change Alert</SelectItem>
                    <SelectItem value="seasonal_trend">Seasonal Trend Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="threshold">Threshold Amount (KES)</Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="Enter threshold amount"
                  value={newAlertData.threshold || ''}
                  onChange={(e) => setNewAlertData(prev => ({ 
                    ...prev, 
                    threshold: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isActive"
                  checked={newAlertData.isActive}
                  onCheckedChange={(checked) => setNewAlertData(prev => ({ 
                    ...prev, 
                    isActive: !!checked 
                  }))}
                />
                <Label htmlFor="isActive">Activate alert immediately</Label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateAlertOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateAlert}
                disabled={createAlertMutation.isPending}
              >
                {createAlertMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Create Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}