import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Calendar, 
  Settings, 
  Edit, 
  Activity, 
  DollarSign, 
  Eye, 
  Phone, 
  Heart, 
  Share,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  Smartphone,
  Star,
  Lightbulb,
  Search
} from 'lucide-react';

export default function ListingDashboard() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingListing, setEditingListing] = useState(false);


  // Fetch listing details
  const { data: listing, isLoading: listingLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetch(`/api/car-listings/${id}/details`).then(res => res.json())
  });

  // Fetch analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['listing-analytics', id],
    queryFn: () => fetch(`/api/listing/${id}/analytics`).then(res => res.json())
  });

  // Fetch conversations
  const { data: conversations } = useQuery({
    queryKey: ['listing-conversations', id],
    queryFn: () => fetch(`/api/listing/${id}/conversations`).then(res => res.json())
  });

  // Fetch smart pricing
  const { data: smartPricing, isLoading: smartPricingLoading, error: smartPricingError } = useQuery({
    queryKey: ['smart-pricing', id],
    queryFn: () => fetch(`/api/listings/${id}/pricing-recommendation`).then(res => res.json())
  });

  // Update listing mutation
  const updateListingMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/listings/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing', id] });
      toast({ title: 'Listing updated successfully' });
      setEditingListing(false);
    }
  });

  // Apply smart pricing mutation
  const applyPricingMutation = useMutation({
    mutationFn: (price: number) => apiRequest('PUT', `/api/listings/${id}`, { price }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing', id] });
      toast({ title: 'Price updated successfully' });
    }
  });

  if (listingLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!listing) {
    return <div className="p-6">Listing not found</div>;
  }

  const overviewData = {
    totalViews: analytics?.performanceMetrics?.totalViews || 0,
    phoneClicks: analytics?.engagementMetrics?.phoneClicks || 0,
    favorites: analytics?.engagementMetrics?.favorites || 0,
    inquiries: analytics?.engagementMetrics?.inquiries || 0,
    unreadMessages: Array.isArray(conversations) ? conversations.reduce((sum: number, conv: any) => sum + (conv.unreadCount || 0), 0) : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {listing.year} {listing.make} {listing.model}
            </h1>
            <p className="text-gray-600 mt-1">
              {listing.engineCapacity}cc • {listing.mileage} km • {listing.location}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
              {listing.status}
            </Badge>
            <span className="text-2xl font-bold text-purple-600">
              KES {listing.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Views</p>
                  <p className="text-xl font-bold">{overviewData.totalViews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Inquiries</p>
                  <p className="text-xl font-bold">{overviewData.inquiries}</p>
                  {overviewData.unreadMessages > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {overviewData.unreadMessages} unread
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone Clicks</p>
                  <p className="text-xl font-bold">{overviewData.phoneClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Favorites</p>
                  <p className="text-xl font-bold">{overviewData.favorites}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="text-xl font-bold">
                    {analytics?.performanceMetrics?.clickThroughRate?.toFixed(1) || 
                     (overviewData.totalViews > 0 ? 
                      Math.round(((overviewData.phoneClicks + overviewData.inquiries) / overviewData.totalViews) * 100) : 0)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview & Pricing</TabsTrigger>
            <TabsTrigger value="messages">
              Messages & Inquiries
              {overviewData.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {overviewData.unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Listing Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Listing Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {listing.images && listing.images.length > 0 && (
                      <img 
                        src={listing.images[0]} 
                        alt="Car"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                      <p className="text-gray-600">
                        {listing.engineCapacity}cc • {listing.fuelType} • {listing.transmission}
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        KES {listing.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Pricing Intelligence */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span>Smart Pricing Intelligence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {smartPricingLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  ) : smartPricingError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600">Error loading pricing data</p>
                    </div>
                  ) : smartPricing ? (
                    <div className="space-y-4">
                      {/* Current Price Analysis */}
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Current Price</p>
                        <p className="text-2xl font-bold text-purple-600">
                          KES {smartPricing.currentPrice?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {smartPricing.marketPosition || 'Market Analysis'}
                        </p>
                      </div>

                      {/* Price Recommendations */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-xs text-gray-600">Quick Sale</p>
                          <p className="font-semibold text-orange-600">
                            KES {smartPricing.quickSalePrice?.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">Recommended</p>
                          <p className="font-semibold text-green-600">
                            KES {smartPricing.recommendedPrice?.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600">Premium</p>
                          <p className="font-semibold text-blue-600">
                            KES {smartPricing.premiumPrice?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Market Insights */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Market Insights</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          {smartPricing.marketInsights?.slice(0, 3).map((insight: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Apply Recommended Price Button */}
                      <Button 
                        onClick={() => applyPricingMutation.mutate(smartPricing.recommendedPrice)}
                        disabled={applyPricingMutation.isPending}
                        className="w-full"
                      >
                        {applyPricingMutation.isPending ? 'Applying...' : 'Apply Recommended Price'}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No pricing data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Listing Management - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Listing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Status Management */}
                  <div>
                    <Label className="text-base font-semibold">Listing Status</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                      <Select 
                        value={listing.status} 
                        onValueChange={(status) => updateListingMutation.mutate({ status })}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <Label className="text-base font-semibold">Quick Actions</Label>
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingListing(true)}
                        className="w-full"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Listing
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {Array.isArray(conversations) && conversations.slice(0, 3).map((conv: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{conv.participantName}</p>
                        <p className="text-xs text-gray-600">{conv.lastMessage}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  {(!Array.isArray(conversations) || conversations.length === 0) && (
                    <p className="text-gray-500 text-center py-4 col-span-3">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages & Inquiries Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversation List with Messages */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Array.isArray(conversations) && conversations.map((conv: any, idx: number) => (
                      <div key={idx} className="border rounded-lg p-4">
                        {/* Conversation Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium">{conv.participantName}</p>
                              <p className="text-xs text-gray-500">{conv.lastMessageTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {conv.unreadCount > 0 && (
                              <Badge variant="destructive">
                                {conv.unreadCount} unread
                              </Badge>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setLocation(`/messages?conversation=${conv.id}`)}
                            >
                              View Full Chat
                            </Button>
                          </div>
                        </div>
                        
                        {/* Recent Messages */}
                        <div className="space-y-3">
                          {/* Sample messages - replace with real conversation data */}
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <Users className="h-3 w-3 text-gray-500" />
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                                  <p className="text-sm">{conv.lastMessage}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {conv.participantName} • {conv.lastMessageTime}
                                </p>
                              </div>
                            </div>
                            
                            {/* Seller Response */}
                            <div className="flex items-start space-x-2 justify-end">
                              <div className="flex-1 flex justify-end">
                                <div className="bg-purple-100 rounded-lg p-3 max-w-md">
                                  <p className="text-sm">Thanks for your interest! The vehicle is in excellent condition. Would you like to schedule a test drive?</p>
                                </div>
                              </div>
                              <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="h-3 w-3 text-purple-600" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Reply */}
                          <div className="pt-2 border-t">
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Type a quick reply..."
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                              />
                              <Button size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {(!Array.isArray(conversations) || conversations.length === 0) && (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No inquiries yet</p>
                        <p className="text-sm text-gray-400 mt-2">Customer inquiries will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Message Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Message Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Total Conversations</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {Array.isArray(conversations) ? conversations.length : 0}
                        </p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-600">Unread Messages</p>
                        <p className="text-2xl font-bold text-red-800">{overviewData.unreadMessages}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">Response Rate</p>
                        <p className="text-2xl font-bold text-green-800">
                          {conversations && conversations.length > 0 ? 
                            Math.round((conversations.filter((c: any) => c.hasResponse).length / conversations.length) * 100) 
                            : 0}%
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">Avg Response Time</p>
                        <p className="text-2xl font-bold text-purple-800">2.5h</p>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setLocation('/messages')}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Open Full Messages
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Mark All as Read
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Set Auto-Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics & Insights Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Key Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">{analytics?.performanceMetrics?.totalViews?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Unique Visitors</p>
                      <p className="text-2xl font-bold">{analytics?.performanceMetrics?.uniqueVisitors?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Inquiries</p>
                      <p className="text-2xl font-bold">{analytics?.engagementMetrics?.inquiries || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Heart className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Favorites</p>
                      <p className="text-2xl font-bold">{analytics?.engagementMetrics?.favorites || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tabs */}
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
              </TabsList>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Views Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Views Trend (Last 30 Days)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        <p>Views trend chart would display here</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Engagement Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Engagement Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Click-Through Rate</span>
                        <span className="font-semibold">{analytics?.performanceMetrics?.clickThroughRate?.toFixed(2) || 0}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Phone Clicks</span>
                        <span className="font-semibold">{analytics?.engagementMetrics?.phoneClicks || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Shares</span>
                        <span className="font-semibold">{analytics?.engagementMetrics?.shares || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Avg. Time Spent</span>
                        <span className="font-semibold">{analytics?.engagementMetrics?.averageTimeSpent ? `${analytics.engagementMetrics.averageTimeSpent}s` : '0s'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Audience Tab */}
              <TabsContent value="audience" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Device Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Device Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mobile</span>
                          <span className="font-semibold">{analytics?.audienceInsights?.deviceBreakdown?.mobile || 0}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Desktop</span>
                          <span className="font-semibold">{analytics?.audienceInsights?.deviceBreakdown?.desktop || 0}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Tablet</span>
                          <span className="font-semibold">{analytics?.audienceInsights?.deviceBreakdown?.tablet || 0}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Top Locations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Nairobi</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mombasa</span>
                        <span className="font-semibold">20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Kisumu</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Nakuru</span>
                        <span className="font-semibold">10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Other</span>
                        <span className="font-semibold">10%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Peak Hours */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Peak Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">9:00 AM - 12:00 PM</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">1:00 PM - 5:00 PM</span>
                        <span className="font-semibold">40%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">6:00 PM - 9:00 PM</span>
                        <span className="font-semibold">25%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Market Tab */}
              <TabsContent value="market" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Price Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Price Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Your Price</span>
                        <span className="font-semibold">KES {analytics?.listingInfo?.price?.toLocaleString() || listing?.price?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Average</span>
                        <span className="font-semibold">KES {analytics?.marketBenchmark?.averagePrice?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Price Position</span>
                        <Badge variant={analytics?.marketBenchmark?.pricePosition === 'above' ? 'destructive' : 'default'}>
                          {analytics?.marketBenchmark?.pricePosition || 'Market'} Market
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Market Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Similar Listings</span>
                        <span className="font-semibold">{analytics?.marketBenchmark?.similarListings || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Avg. Days on Market</span>
                        <span className="font-semibold">{analytics?.marketBenchmark?.averageDaysOnMarket || 0} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Demand</span>
                        <Badge variant="secondary">Moderate</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Quality Tab */}
              <TabsContent value="quality" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quality Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Quality Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {analytics?.qualityIndicators?.overall_score || 85}
                        </div>
                        <p className="text-sm text-gray-600">Overall Quality Score</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Photo Quality</span>
                          <span className="font-semibold">{analytics?.qualityIndicators?.photo_score || 90}/100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Description</span>
                          <span className="font-semibold">{analytics?.qualityIndicators?.description_score || 85}/100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Completeness</span>
                          <span className="font-semibold">{analytics?.qualityIndicators?.completeness_score || 80}/100</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Improvement Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        Improvement Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">Add more photos</p>
                          <p className="text-xs text-gray-600">Include interior and engine photos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">Competitive pricing</p>
                          <p className="text-xs text-gray-600">Your price is within market range</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">Update service history</p>
                          <p className="text-xs text-gray-600">Add recent maintenance records</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Keywords Tab */}
              <TabsContent value="keywords" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Top Search Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics?.topKeywords?.map((keyword: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{keyword.keyword}</span>
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <span>{keyword.search_count} searches</span>
                            <span>{keyword.click_count} clicks</span>
                          </div>
                        </div>
                      )) || (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Honda Fit</span>
                            <div className="flex space-x-4 text-sm text-gray-600">
                              <span>245 searches</span>
                              <span>67 clicks</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">2019 Honda</span>
                            <div className="flex space-x-4 text-sm text-gray-600">
                              <span>189 searches</span>
                              <span>45 clicks</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Automatic transmission</span>
                            <div className="flex space-x-4 text-sm text-gray-600">
                              <span>156 searches</span>
                              <span>38 clicks</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scheduled Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Scheduled Appointments
                    </span>
                    <Badge variant="outline">
                      3 upcoming
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Sample appointment data - replace with real data */}
                    {[
                      {
                        id: 1,
                        buyerName: "John Doe",
                        type: "Test Drive",
                        date: "2025-01-17",
                        time: "10:00 AM",
                        status: "confirmed",
                        location: "Your Location",
                        phone: "+254 712 345 678"
                      },
                      {
                        id: 2,
                        buyerName: "Jane Smith",
                        type: "Inspection",
                        date: "2025-01-18",
                        time: "2:00 PM",
                        status: "pending",
                        location: "Buyer's Location",
                        phone: "+254 723 456 789"
                      },
                      {
                        id: 3,
                        buyerName: "Mike Johnson",
                        type: "Video Call",
                        date: "2025-01-19",
                        time: "11:30 AM",
                        status: "confirmed",
                        location: "Virtual",
                        phone: "+254 734 567 890"
                      }
                    ].map((appointment) => (
                      <div key={appointment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{appointment.buyerName}</p>
                              <p className="text-sm text-gray-600">{appointment.type}</p>
                              <p className="text-xs text-gray-500">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                            >
                              {appointment.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pl-13 space-y-1">
                          <p className="text-sm text-gray-600">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {appointment.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            <Phone className="h-4 w-4 inline mr-1" />
                            {appointment.phone}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Statistics & Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Total Appointments</p>
                        <p className="text-2xl font-bold text-blue-800">15</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">Completed</p>
                        <p className="text-2xl font-bold text-green-800">12</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-orange-600">Pending</p>
                        <p className="text-2xl font-bold text-orange-800">2</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">Cancelled</p>
                        <p className="text-2xl font-bold text-purple-800">1</p>
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Appointment Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Auto-approve appointments</span>
                          <Badge variant="outline">ON</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minimum advance notice</span>
                          <Badge variant="outline">2 hours</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Available days</span>
                          <Badge variant="outline">Mon-Sat</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule New Appointment
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage Availability
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Clock className="h-4 w-4 mr-2" />
                          View Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>

        {/* Edit Listing Dialog */}
        <Dialog open={editingListing} onOpenChange={setEditingListing}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Listing - {listing.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-700">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Listing Title</Label>
                    <Input 
                      defaultValue={listing.title}
                      onChange={(e) => updateListingMutation.mutate({ title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Price (KES)</Label>
                    <Input 
                      type="number" 
                      defaultValue={listing.price}
                      onChange={(e) => updateListingMutation.mutate({ price: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    defaultValue={listing.description}
                    rows={4}
                    onChange={(e) => updateListingMutation.mutate({ description: e.target.value })}
                  />
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-700">Vehicle Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Make</Label>
                    <Input 
                      defaultValue={listing.make}
                      onChange={(e) => updateListingMutation.mutate({ make: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Model</Label>
                    <Input 
                      defaultValue={listing.model}
                      onChange={(e) => updateListingMutation.mutate({ model: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input 
                      type="number"
                      defaultValue={listing.year}
                      onChange={(e) => updateListingMutation.mutate({ year: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Mileage (km)</Label>
                    <Input 
                      type="number" 
                      defaultValue={listing.mileage}
                      onChange={(e) => updateListingMutation.mutate({ mileage: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Fuel Type</Label>
                    <Select 
                      defaultValue={listing.fuel_type}
                      onValueChange={(value) => updateListingMutation.mutate({ fuel_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Transmission</Label>
                    <Select 
                      defaultValue={listing.transmission}
                      onValueChange={(value) => updateListingMutation.mutate({ transmission: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="cvt">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Body Type</Label>
                    <Input 
                      defaultValue={listing.body_type}
                      onChange={(e) => updateListingMutation.mutate({ body_type: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Engine Capacity (cc)</Label>
                    <Input 
                      type="number"
                      defaultValue={listing.engine_capacity}
                      onChange={(e) => updateListingMutation.mutate({ engine_capacity: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Drive Configuration</Label>
                    <Select 
                      defaultValue={listing.drive_configuration}
                      onValueChange={(value) => updateListingMutation.mutate({ drive_configuration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2WD">2WD</SelectItem>
                        <SelectItem value="4WD">4WD</SelectItem>
                        <SelectItem value="AWD">AWD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-700">Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Exterior Color</Label>
                    <Input 
                      defaultValue={listing.exterior_color}
                      onChange={(e) => updateListingMutation.mutate({ exterior_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Interior Color</Label>
                    <Input 
                      defaultValue={listing.interior_color}
                      onChange={(e) => updateListingMutation.mutate({ interior_color: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-700">Location</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>County</Label>
                    <Input 
                      defaultValue={listing.county}
                      onChange={(e) => updateListingMutation.mutate({ county: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Town</Label>
                    <Input 
                      defaultValue={listing.town}
                      onChange={(e) => updateListingMutation.mutate({ town: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-700">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Name</Label>
                    <Input 
                      defaultValue={listing.contact_name}
                      onChange={(e) => updateListingMutation.mutate({ contact_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input 
                      defaultValue={listing.phone_number}
                      onChange={(e) => updateListingMutation.mutate({ phone_number: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setEditingListing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setEditingListing(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}