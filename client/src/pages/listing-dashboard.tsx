import { useState } from 'react';
import { useParams, useLocation, Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
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
import { Switch } from '@/components/ui/switch';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Calendar as CalendarIcon, 
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
  Search,
  Video,
  Car,
  FileText
} from 'lucide-react';
import { AppointmentActions } from '@/components/appointment-actions';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ListingDashboard() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingListing, setEditingListing] = useState(false);
  const [scheduleAppointmentOpen, setScheduleAppointmentOpen] = useState(false);
  const [manageAvailabilityOpen, setManageAvailabilityOpen] = useState(false);
  const [viewCalendarOpen, setViewCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [blockSlotStartTime, setBlockSlotStartTime] = useState('');
  const [blockSlotEndTime, setBlockSlotEndTime] = useState('');
  const [blockSlotReason, setBlockSlotReason] = useState('');

  // Fetch listing details
  const { data: listing, isLoading: listingLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetch(`/api/car-listings/${id}/details`).then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['listing-analytics', id],
    queryFn: () => fetch(`/api/listing/${id}/analytics`).then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch conversations
  const { data: conversations } = useQuery({
    queryKey: ['listing-conversations', id],
    queryFn: () => fetch(`/api/listing/${id}/conversations`).then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch recent activity data
  const { data: recentActivity } = useQuery({
    queryKey: ['listing-recent-activity', id],
    queryFn: () => fetch(`/api/listing/${id}/recent-activity`).then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch smart pricing
  const { data: smartPricing, isLoading: smartPricingLoading, error: smartPricingError } = useQuery({
    queryKey: ['smart-pricing', id],
    queryFn: () => fetch(`/api/listings/${id}/pricing-recommendation`).then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch appointment data
  const { data: appointmentData } = useQuery({
    queryKey: ['listing-appointments', id],
    queryFn: () => fetch(`/api/listing/${id}/appointments`).then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch seller availability
  const { data: availabilityData } = useQuery({
    queryKey: ['seller-availability'],
    queryFn: () => fetch('/api/seller/availability').then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch blocked slots
  const { data: blockedSlots } = useQuery({
    queryKey: ['seller-blocked-slots'],
    queryFn: () => fetch('/api/seller/blocked-slots').then(res => res.json()),
    enabled: isAuthenticated
  });

  // Fetch available slots for selected date
  const { data: availableSlots } = useQuery({
    queryKey: ['available-slots', selectedDate],
    queryFn: () => fetch(`/api/seller/available-slots/${selectedDate}`).then(res => res.json()),
    enabled: !!selectedDate && isAuthenticated
  });

  // Fetch loan applications for this listing
  const { data: loanApplications } = useQuery({
    queryKey: ['listing-loan-applications', id],
    queryFn: () => fetch(`/api/listing/${id}/loan-applications`).then(res => res.json()),
    enabled: isAuthenticated
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
    mutationFn: (price: number) => {
      console.log('Applying price:', price, 'to listing:', id);
      return apiRequest('PUT', `/api/listings/${id}`, { price });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing', id] });
      queryClient.invalidateQueries({ queryKey: ['smart-pricing', id] });
      toast({ title: 'Price updated successfully' });
    },
    onError: (error: any) => {
      console.error('Error applying price:', error);
      toast({ 
        title: 'Error updating price', 
        description: error.message || 'Failed to update price',
        variant: 'destructive'
      });
    }
  });

  // Schedule appointment mutation
  const scheduleAppointmentMutation = useMutation({
    mutationFn: (appointmentData: any) => apiRequest('POST', '/api/seller/appointments', appointmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-appointments', id] });
      toast({ title: 'Appointment scheduled successfully' });
      setScheduleAppointmentOpen(false);
    }
  });

  // Update availability mutation
  const updateAvailabilityMutation = useMutation({
    mutationFn: (availabilityData: any) => apiRequest('POST', '/api/seller/availability', availabilityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-availability'] });
      // Don't show toast or close dialog for intermediate updates
      // Only close dialog when user explicitly clicks "Save & Close"
    }
  });

  // Add blocked slot mutation
  const addBlockedSlotMutation = useMutation({
    mutationFn: (slotData: any) => apiRequest('POST', '/api/seller/blocked-slots', slotData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-blocked-slots'] });
      queryClient.invalidateQueries({ queryKey: ['available-slots', selectedDate] });
      toast({ title: 'Time slot blocked successfully' });
    }
  });

  // Remove blocked slot mutation
  const removeBlockedSlotMutation = useMutation({
    mutationFn: (slotId: number) => apiRequest('DELETE', `/api/seller/blocked-slots/${slotId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-blocked-slots'] });
      queryClient.invalidateQueries({ queryKey: ['available-slots', selectedDate] });
      toast({ title: 'Time slot unblocked successfully' });
    }
  });

  // Authentication protection
  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You need to be logged in to access your listing dashboard.</p>
            <Button 
              onClick={() => window.location.href = '/api/auth/google'}
              className="w-full"
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-16 p-2 bg-white border-2 border-purple-200 rounded-xl shadow-lg">
            <TabsTrigger 
              value="overview" 
              className="text-lg font-semibold py-3 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-purple-50 transition-all duration-200 flex items-center gap-2"
            >
              <Car className="h-5 w-5" />
              Overview & Pricing
            </TabsTrigger>
            <TabsTrigger 
              value="messages-appointments"
              className="text-lg font-semibold py-3 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-purple-50 transition-all duration-200 flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Messages & Appointments
              {overviewData.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs animate-pulse">
                  {overviewData.unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="text-lg font-semibold py-3 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-purple-50 transition-all duration-200 flex items-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics & Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <Link href="/my-listings">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                  ← Back to Listings
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Listing Preview with Management Controls */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Listing Preview</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingListing(true)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Listing
                      </Button>
                    </div>
                  </div>
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
                    
                    {/* Status Management */}
                    <div className="pt-4 border-t">
                      <Label className="text-sm font-medium text-gray-600">Update Status</Label>
                      <Select 
                        value={listing.status} 
                        onValueChange={(status) => updateListingMutation.mutate({ status })}
                      >
                        <SelectTrigger className="w-full mt-1">
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
                        onClick={() => {
                          console.log('Apply price clicked, recommendedPrice:', smartPricing.recommendedPrice);
                          if (smartPricing.recommendedPrice) {
                            applyPricingMutation.mutate(smartPricing.recommendedPrice);
                          } else {
                            toast({ 
                              title: 'Error', 
                              description: 'No recommended price available',
                              variant: 'destructive'
                            });
                          }
                        }}
                        disabled={applyPricingMutation.isPending || !smartPricing.recommendedPrice}
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



            {/* Recent Activity - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity && recentActivity.length > 0 ? (
                    recentActivity.slice(0, 5).map((activity: any, idx: number) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        {activity.type === 'view' && <Eye className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'inquiry' && <MessageSquare className="h-4 w-4 text-green-600" />}
                        {activity.type === 'phone_click' && <Phone className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'favorite' && <Heart className="h-4 w-4 text-red-600" />}
                        {activity.type === 'share' && <Share className="h-4 w-4 text-orange-600" />}
                        
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-gray-600">
                            {activity.timestamp && new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                        
                        {activity.location && (
                          <Badge variant="outline" className="text-xs">
                            {activity.location}
                          </Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No recent activity</p>
                      <p className="text-sm text-gray-400 mt-2">Viewer interactions will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages & Appointments Tab */}
          <TabsContent value="messages-appointments" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <Link href="/my-listings">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                  ← Back to Listings
                </Button>
              </Link>
            </div>
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

            {/* Loan Applications - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Loan Applications
                  </span>
                  <Badge variant="outline">
                    {loanApplications?.length || 0} applications
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loanApplications && loanApplications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Client Name</th>
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Phone Number</th>
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Bank</th>
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Product</th>
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Amount</th>
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Status</th>
                          <th className="text-left p-2 text-sm font-medium text-gray-600">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanApplications.map((application: any) => (
                          <tr key={application.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 text-sm">{application.applicantName}</td>
                            <td className="p-2 text-sm">{application.applicantPhone}</td>
                            <td className="p-2 text-sm">{application.bankName || 'N/A'}</td>
                            <td className="p-2 text-sm">{application.productName || 'N/A'}</td>
                            <td className="p-2 text-sm">
                              KES {Number(application.requestedAmount).toLocaleString()}
                            </td>
                            <td className="p-2">
                              <Badge 
                                variant={
                                  application.status === 'approved' ? 'default' :
                                  application.status === 'pending' ? 'secondary' :
                                  application.status === 'rejected' ? 'destructive' :
                                  'outline'
                                }
                              >
                                {application.status}
                              </Badge>
                            </td>
                            <td className="p-2 text-sm text-gray-600">
                              {new Date(application.submittedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No loan applications yet</p>
                    <p className="text-sm text-gray-400 mt-2">When buyers apply for financing, applications will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Appointments Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scheduled Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Scheduled Appointments
                    </span>
                    <Badge variant="outline">
                      {appointmentData?.statistics?.upcoming || 0} upcoming
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!appointmentData?.appointments?.length ? (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No Appointments Yet</h3>
                        <p className="text-sm text-gray-400">Test drive requests will appear here</p>
                      </div>
                    ) : (
                      appointmentData.appointments.map((appointment: any) => (
                        <div key={appointment.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <CalendarIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.buyerName}</p>
                                <p className="text-sm text-gray-600">
                                  {appointment.type === 'test_drive' ? 'Test Drive' : 'Video Call'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={
                                  appointment.status === 'confirmed' ? 'default' :
                                  appointment.status === 'pending' ? 'secondary' :
                                  appointment.status === 'completed' ? 'outline' :
                                  'destructive'
                                }
                              >
                                {appointment.status}
                              </Badge>
                              <AppointmentActions appointment={appointment} />
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {new Date(appointment.scheduledDate).toLocaleDateString()} at {appointment.scheduledTime}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              {appointment.buyerPhone}
                            </div>
                            {appointment.notes && (
                              <p className="text-gray-600 bg-gray-50 p-2 rounded">
                                <MessageSquare className="h-4 w-4 inline mr-1" />
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Management */}
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
                        <p className="text-2xl font-bold text-blue-800">{appointmentData?.statistics?.total || 0}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">Completed</p>
                        <p className="text-2xl font-bold text-green-800">{appointmentData?.statistics?.completed || 0}</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-orange-600">Pending</p>
                        <p className="text-2xl font-bold text-orange-800">{appointmentData?.statistics?.pending || 0}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">Cancelled</p>
                        <p className="text-2xl font-bold text-purple-800">{appointmentData?.statistics?.cancelled || 0}</p>
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
                        <Dialog open={scheduleAppointmentOpen} onOpenChange={setScheduleAppointmentOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              Schedule New Appointment
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Dialog open={manageAvailabilityOpen} onOpenChange={setManageAvailabilityOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Availability
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Dialog open={viewCalendarOpen} onOpenChange={setViewCalendarOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Clock className="h-4 w-4 mr-2" />
                              View Calendar
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics & Insights Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <Link href="/my-listings">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                  ← Back to Listings
                </Button>
              </Link>
            </div>
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

            {/* Performance Analytics */}
            <div className="space-y-6">
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

              {/* Audience Analytics */}
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

              {/* Market Analytics */}
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
                      <span className="font-semibold">
                        {analytics?.marketBenchmark?.averagePrice 
                          ? `KES ${Number(analytics.marketBenchmark.averagePrice).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          : 'N/A'}
                      </span>
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

              {/* Quality Analytics */}
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

              {/* Keywords Analytics */}
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

        {/* Schedule New Appointment Dialog */}
        <Dialog open={scheduleAppointmentOpen} onOpenChange={setScheduleAppointmentOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Appointment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video_call">Video Call</SelectItem>
                      <SelectItem value="test_drive">Test Drive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
              
              {selectedDate && (
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableSlots?.availableSlots && Array.isArray(availableSlots.availableSlots) && availableSlots.availableSlots.length > 0 ? (
                      availableSlots.availableSlots.map((slot: any, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            const appointmentData = {
                              listingId: id,
                              appointmentType: 'video_call',
                              appointmentDate: slot.startTime,
                              duration: slot.duration,
                              buyerName: 'Seller Created',
                              buyerEmail: 'seller@example.com',
                              buyerPhone: '+254700000000',
                              notes: 'Appointment created by seller'
                            };
                            scheduleAppointmentMutation.mutate(appointmentData);
                          }}
                        >
                          {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Button>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-4">
                        <p className="text-gray-500">No available time slots for selected date</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Buyer Name</Label>
                  <Input placeholder="Enter buyer name" />
                </div>
                <div>
                  <Label>Buyer Phone</Label>
                  <Input placeholder="Enter buyer phone" />
                </div>
              </div>
              
              <div>
                <Label>Meeting Location (for test drives)</Label>
                <Input placeholder="Enter meeting location" />
              </div>
              
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes" rows={3} />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Manage Availability Dialog */}
        <Dialog open={manageAvailabilityOpen} onOpenChange={() => {
          // Prevent automatic closing - only close via Save & Close button
        }}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Manage Availability - Complete Setup Required</DialogTitle>
              <div className="text-sm text-gray-600 mt-2">
                Please configure at least one available day and set your preferences to save your availability.
              </div>
            </DialogHeader>
            <div className="space-y-6">
              {/* Weekly Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Weekly Availability</h3>
                <div className="space-y-3">
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
                    const dayAvailability = availabilityData?.availability?.find((a: any) => a.dayOfWeek === index);
                    return (
                      <div key={day} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="w-20 font-medium">{day}</div>
                        <Switch 
                          checked={!!dayAvailability?.isActive}
                          onCheckedChange={(checked) => {
                            const newAvailability = availabilityData?.availability?.filter((a: any) => a.dayOfWeek !== index) || [];
                            if (checked) {
                              newAvailability.push({
                                dayOfWeek: index,
                                startTime: '09:00',
                                endTime: '17:00',
                                isActive: true
                              });
                            }
                            updateAvailabilityMutation.mutate({
                              availability: newAvailability,
                              preferences: availabilityData?.preferences
                            });
                          }}
                        />
                        {dayAvailability?.isActive && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={dayAvailability.startTime}
                              className="w-24"
                              onChange={(e) => {
                                const newAvailability = availabilityData.availability.map((a: any) => 
                                  a.dayOfWeek === index ? { ...a, startTime: e.target.value } : a
                                );
                                // Debounce the mutation to avoid rapid-fire calls
                                setTimeout(() => {
                                  updateAvailabilityMutation.mutate({
                                    availability: newAvailability,
                                    preferences: availabilityData?.preferences
                                  });
                                }, 500);
                              }}
                            />
                            <span>to</span>
                            <Input
                              type="time"
                              value={dayAvailability.endTime}
                              className="w-24"
                              onChange={(e) => {
                                const newAvailability = availabilityData.availability.map((a: any) => 
                                  a.dayOfWeek === index ? { ...a, endTime: e.target.value } : a
                                );
                                // Debounce the mutation to avoid rapid-fire calls
                                setTimeout(() => {
                                  updateAvailabilityMutation.mutate({
                                    availability: newAvailability,
                                    preferences: availabilityData?.preferences
                                  });
                                }, 500);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label>Auto-approve appointments</Label>
                    <Switch 
                      checked={availabilityData?.preferences?.autoApprove || false}
                      onCheckedChange={(checked) => {
                        updateAvailabilityMutation.mutate({
                          availability: availabilityData?.availability || [],
                          preferences: {
                            ...availabilityData?.preferences,
                            autoApprove: checked
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label>Allow weekends</Label>
                    <Switch 
                      checked={availabilityData?.preferences?.allowWeekends || false}
                      onCheckedChange={(checked) => {
                        updateAvailabilityMutation.mutate({
                          availability: availabilityData?.availability || [],
                          preferences: {
                            ...availabilityData?.preferences,
                            allowWeekends: checked
                          }
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Minimum advance notice (hours)</Label>
                    <Input
                      type="number"
                      value={availabilityData?.preferences?.minimumAdvanceNoticeHours || 2}
                      onChange={(e) => {
                        setTimeout(() => {
                          updateAvailabilityMutation.mutate({
                            availability: availabilityData?.availability || [],
                            preferences: {
                              ...availabilityData?.preferences,
                              minimumAdvanceNoticeHours: parseInt(e.target.value)
                            }
                          });
                        }, 1000);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Max appointments per day</Label>
                    <Input
                      type="number"
                      value={availabilityData?.preferences?.maxAppointmentsPerDay || 10}
                      onChange={(e) => {
                        setTimeout(() => {
                          updateAvailabilityMutation.mutate({
                            availability: availabilityData?.availability || [],
                            preferences: {
                              ...availabilityData?.preferences,
                              maxAppointmentsPerDay: parseInt(e.target.value)
                            }
                          });
                        }, 1000);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Blocked Time Slots */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Blocked Time Slots</h3>
                <div className="space-y-3">
                  {Array.isArray(blockedSlots) && blockedSlots.length > 0 ? (
                    blockedSlots.map((slot: any) => (
                      <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            {new Date(slot.startDateTime).toLocaleDateString()} at {new Date(slot.startDateTime).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-600">{slot.reason || 'No reason provided'}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeBlockedSlotMutation.mutate(slot.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No blocked time slots</p>
                    </div>
                  )}
                  
                  {/* Add new blocked slot */}
                  <div className="p-3 border rounded-lg border-dashed">
                    <h4 className="font-medium mb-2">Block New Time Slot</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        type="datetime-local" 
                        placeholder="Start time"
                        value={blockSlotStartTime}
                        onChange={(e) => setBlockSlotStartTime(e.target.value)}
                      />
                      <Input 
                        type="datetime-local" 
                        placeholder="End time"
                        value={blockSlotEndTime}
                        onChange={(e) => setBlockSlotEndTime(e.target.value)}
                      />
                      <Input 
                        placeholder="Reason" 
                        className="col-span-2"
                        value={blockSlotReason}
                        onChange={(e) => setBlockSlotReason(e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        className="col-span-2"
                        onClick={() => {
                          if (blockSlotStartTime && blockSlotEndTime) {
                            addBlockedSlotMutation.mutate({
                              startDateTime: blockSlotStartTime,
                              endDateTime: blockSlotEndTime,
                              reason: blockSlotReason || 'No reason provided'
                            });
                            // Clear form after submission
                            setBlockSlotStartTime('');
                            setBlockSlotEndTime('');
                            setBlockSlotReason('');
                          } else {
                            toast({
                              title: "Missing Information",
                              description: "Please select start and end times for the blocked slot.",
                              variant: "destructive"
                            });
                          }
                        }}
                        disabled={!blockSlotStartTime || !blockSlotEndTime}
                      >
                        Add Blocked Slot
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Configuration Status and Footer */}
              <div className="border-t pt-4 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Configuration Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      {availabilityData?.availability?.some((a: any) => a.isActive) ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ) : (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                      <span className="text-sm">
                        {availabilityData?.availability?.some((a: any) => a.isActive) 
                          ? "✓ Weekly schedule configured" 
                          : "⚠ Set at least one available day"}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {availabilityData?.preferences && (
                        typeof availabilityData.preferences.autoApprove === 'boolean' ||
                        typeof availabilityData.preferences.allowWeekends === 'boolean' ||
                        availabilityData.preferences.minimumAdvanceNoticeHours > 0 ||
                        availabilityData.preferences.maxAppointmentsPerDay > 0
                      ) ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ) : (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                      <span className="text-sm">
                        {availabilityData?.preferences && (
                          typeof availabilityData.preferences.autoApprove === 'boolean' ||
                          typeof availabilityData.preferences.allowWeekends === 'boolean' ||
                          availabilityData.preferences.minimumAdvanceNoticeHours > 0 ||
                          availabilityData.preferences.maxAppointmentsPerDay > 0
                        ) 
                          ? "✓ Preferences configured" 
                          : "⚠ Configure your preferences"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3">
                    <div className="text-sm text-gray-600">
                      {availabilityData?.availability?.some((a: any) => a.isActive) && availabilityData?.preferences && (
                        typeof availabilityData.preferences.autoApprove === 'boolean' ||
                        typeof availabilityData.preferences.allowWeekends === 'boolean' ||
                        availabilityData.preferences.minimumAdvanceNoticeHours > 0 ||
                        availabilityData.preferences.maxAppointmentsPerDay > 0
                      ) ? (
                        "All required configurations complete"
                      ) : (
                        "Complete all configurations to save and close"
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline"
                        onClick={() => setManageAvailabilityOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => {
                          const hasConfiguredDays = availabilityData?.availability?.some((a: any) => a.isActive) || false;
                          const hasConfiguredPreferences = availabilityData?.preferences && (
                            typeof availabilityData.preferences.autoApprove === 'boolean' ||
                            typeof availabilityData.preferences.allowWeekends === 'boolean' ||
                            availabilityData.preferences.minimumAdvanceNoticeHours > 0 ||
                            availabilityData.preferences.maxAppointmentsPerDay > 0
                          );
                          
                          if (hasConfiguredDays && hasConfiguredPreferences) {
                            toast({
                              title: "Availability Saved",
                              description: "Your availability settings have been saved successfully.",
                            });
                            setManageAvailabilityOpen(false);
                          } else {
                            toast({
                              title: "Configuration Required",
                              description: "Please complete all configurations before saving.",
                              variant: "destructive"
                            });
                          }
                        }}
                        disabled={!(
                          availabilityData?.availability?.some((a: any) => a.isActive) && 
                          availabilityData?.preferences && (
                            typeof availabilityData.preferences.autoApprove === 'boolean' ||
                            typeof availabilityData.preferences.allowWeekends === 'boolean' ||
                            availabilityData.preferences.minimumAdvanceNoticeHours > 0 ||
                            availabilityData.preferences.maxAppointmentsPerDay > 0
                          )
                        )}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Save & Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Calendar Dialog */}
        <Dialog open={viewCalendarOpen} onOpenChange={setViewCalendarOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Appointment Calendar</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Calendar Legend */}
              <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm">Booked Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Blocked Dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm">Selected Date</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Full Calendar */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar View</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        onChange={(value: any) => {
                          const date = value instanceof Date ? value : new Date();
                          setSelectedDate(date.toISOString().split('T')[0]);
                        }}
                        value={selectedDate ? new Date(selectedDate) : new Date()}
                        tileClassName={({ date, view }: any) => {
                          if (view === 'month') {
                            const dateStr = date.toISOString().split('T')[0];
                            
                            // Check if date has appointments
                            const hasAppointments = appointmentData?.appointments?.some((apt: any) => 
                              new Date(apt.appointmentDate).toDateString() === date.toDateString()
                            );
                            
                            // Check if date is blocked
                            const isBlocked = blockedSlots?.some((slot: any) => {
                              const slotDate = new Date(slot.startDateTime).toDateString();
                              return slotDate === date.toDateString();
                            });
                            
                            // Check if date is selected
                            const isSelected = selectedDate && dateStr === selectedDate;
                            
                            if (isSelected) return 'calendar-selected';
                            if (hasAppointments) return 'calendar-booked';
                            if (isBlocked) return 'calendar-blocked';
                            if (date >= new Date(new Date().setHours(0, 0, 0, 0))) return 'calendar-available';
                            return '';
                          }
                          return '';
                        }}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Day Details */}
                <div className="space-y-4">
                  {selectedDate && (
                    <>
                      {/* Selected Date Info */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {new Date(selectedDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Appointments</span>
                              <Badge variant="outline">
                                {appointmentData?.appointments?.filter((apt: any) => 
                                  new Date(apt.appointmentDate).toDateString() === new Date(selectedDate).toDateString()
                                ).length || 0}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Available Slots</span>
                              <Badge variant="outline">
                                {availableSlots?.availableSlots?.length || 0}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Appointments for Selected Date */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {appointmentData?.appointments?.filter((apt: any) => 
                            new Date(apt.appointmentDate).toDateString() === new Date(selectedDate).toDateString()
                          ).length > 0 ? (
                            <div className="space-y-2">
                              {appointmentData.appointments
                                .filter((apt: any) => new Date(apt.appointmentDate).toDateString() === new Date(selectedDate).toDateString())
                                .map((appointment: any) => (
                                <div key={appointment.id} className="p-3 bg-blue-50 border border-blue-200 rounded">
                                  <div className="space-y-1">
                                    <p className="font-medium text-sm">{appointment.buyerName}</p>
                                    <p className="text-xs text-gray-600">
                                      {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">{appointment.type}</span>
                                      <Badge size="sm" variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                        {appointment.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-sm text-gray-500">No appointments</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Blocked Slots for Selected Date */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Blocked Times</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {blockedSlots?.filter((slot: any) => 
                            new Date(slot.startDateTime).toDateString() === new Date(selectedDate).toDateString()
                          ).length > 0 ? (
                            <div className="space-y-2">
                              {blockedSlots
                                .filter((slot: any) => new Date(slot.startDateTime).toDateString() === new Date(selectedDate).toDateString())
                                .map((slot: any) => (
                                <div key={slot.id} className="p-3 bg-red-50 border border-red-200 rounded">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-600">
                                      {new Date(slot.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                      {new Date(slot.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <p className="text-sm font-medium">{slot.reason}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-sm text-gray-500">No blocked times</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}