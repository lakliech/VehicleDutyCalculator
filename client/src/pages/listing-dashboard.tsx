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
  Target
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
  const { data: smartPricing } = useQuery({
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
    totalViews: analytics?.totalViews || 0,
    phoneClicks: analytics?.phoneClicks || 0,
    favorites: analytics?.favorites || 0,
    inquiries: Array.isArray(conversations) ? conversations.length : 0,
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
                    {overviewData.totalViews > 0 ? 
                      Math.round(((overviewData.phoneClicks + overviewData.inquiries) / overviewData.totalViews) * 100) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">
              Messages & Inquiries
              {overviewData.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {overviewData.unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
            <TabsTrigger value="manage">Manage & Pricing</TabsTrigger>
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

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
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
                      <p className="text-gray-500 text-center py-4">No recent activity</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Messages & Inquiries Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversation List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Customer Inquiries
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLocation('/messages')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View All Messages
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.isArray(conversations) && conversations.map((conv: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">{conv.participantName}</p>
                            <p className="text-sm text-gray-600 truncate max-w-xs">{conv.lastMessage}</p>
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
                            View Chat
                          </Button>
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
                          Reply to All Unread
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Mark All as Read
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">{analytics?.totalViews || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Unique Visitors</p>
                      <p className="text-2xl font-bold">{analytics?.uniqueVisitors || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold">
                        {analytics?.conversionRate || 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg. Time on Page</p>
                      <p className="text-2xl font-bold">{analytics?.avgTimeOnPage || '0'}s</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Top Search Keywords
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setLocation(`/listing/${id}/analytics`)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Full Analytics
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics?.topKeywords?.map((keyword: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium">{keyword.keyword}</span>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>{keyword.impressions} impressions</span>
                        <span>{keyword.clicks} clicks</span>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-4">No keyword data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage & Pricing Tab */}
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingListing(true)}
                        className="w-full"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Listing
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => setLocation('/messages')}
                        className="w-full"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Messages
                      </Button>
                    </div>
                  </div>

                  {/* Smart Pricing Section */}
                  <div>
                    <Label className="text-base font-semibold">Smart Pricing Intelligence</Label>
                    {smartPricing ? (
                      <div className="space-y-4 mt-4">
                        {/* Current Price Analysis */}
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Current Price Analysis</h4>
                          <p className="text-blue-800">
                            Your current price of KES {listing.price?.toLocaleString()} is{' '}
                            {smartPricing.pricePosition === 'above' ? 'above' : 
                             smartPricing.pricePosition === 'below' ? 'below' : 'competitive with'} market average
                          </p>
                        </div>

                        {/* Pricing Recommendations */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border-orange-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-orange-800 mb-2">Quick Sale</h4>
                              <p className="text-xl font-bold text-orange-600">
                                KES {smartPricing.quickSalePrice?.toLocaleString()}
                              </p>
                              <p className="text-sm text-orange-700 mt-1">
                                Sell within 2-4 weeks
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={() => applyPricingMutation.mutate(smartPricing.quickSalePrice)}
                              >
                                Apply Price
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="border-green-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-green-800 mb-2">Recommended</h4>
                              <p className="text-xl font-bold text-green-600">
                                KES {smartPricing.recommendedPrice?.toLocaleString()}
                              </p>
                              <p className="text-sm text-green-700 mt-1">
                                Best balance of price and time
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={() => applyPricingMutation.mutate(smartPricing.recommendedPrice)}
                              >
                                Apply Price
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="border-purple-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-purple-800 mb-2">Premium</h4>
                              <p className="text-xl font-bold text-purple-600">
                                KES {smartPricing.premiumPrice?.toLocaleString()}
                              </p>
                              <p className="text-sm text-purple-700 mt-1">
                                Maximum value, longer wait
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={() => applyPricingMutation.mutate(smartPricing.premiumPrice)}
                              >
                                Apply Price
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 mt-4">
                        <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Loading pricing intelligence...</p>
                      </div>
                    )}
                  </div>

                  {/* Performance Summary */}
                  <div>
                    <Label className="text-base font-semibold">Performance Summary</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Total Views</p>
                        <p className="text-xl font-bold text-blue-800">{overviewData.totalViews}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">Inquiries</p>
                        <p className="text-xl font-bold text-green-800">{overviewData.inquiries}</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-orange-600">Phone Clicks</p>
                        <p className="text-xl font-bold text-orange-800">{overviewData.phoneClicks}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">Favorites</p>
                        <p className="text-xl font-bold text-purple-800">{overviewData.favorites}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Listing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (KES)</Label>
                  <Input 
                    type="number" 
                    defaultValue={listing.price}
                    onChange={(e) => updateListingMutation.mutate({ price: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Mileage (km)</Label>
                  <Input 
                    type="number" 
                    defaultValue={listing.mileage}
                    onChange={(e) => updateListingMutation.mutate({ mileage: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  defaultValue={listing.description}
                  onChange={(e) => updateListingMutation.mutate({ description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-3">
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