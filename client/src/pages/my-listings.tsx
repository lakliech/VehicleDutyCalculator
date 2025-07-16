import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAuth } from '@/components/auth-provider';
import { Navigation } from '@/components/navigation';
import { Link, useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Fuel, 
  Settings, 
  Eye, 
  Heart, 
  Share2, 
  Edit, 
  Trash2,
  Plus,
  RefreshCw,
  AlertCircle,
  MessageCircle,
  User,
  Video,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Brain,
  TrendingUp,
  DollarSign,
  Target,
  Loader2
} from 'lucide-react';

interface CarListing {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  exteriorColor: string;
  status: 'active' | 'pending' | 'suspended' | 'draft';
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
}

interface ListingConversation {
  id: number;
  title: string;
  type: string;
  status: string;
  message_count: number;
  unread_count: number;
  last_activity_at: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }>;
  last_message: {
    id: number;
    content: string;
    createdAt: string;
    senderId: string;
    senderName: string;
  } | null;
}

interface VideoCallAppointment {
  id: number;
  listingId: number;
  buyerId: string;
  sellerId: string;
  appointmentDate: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  sellerNotes?: string;
  createdAt: string;
  updatedAt: string;
  listing?: {
    id: number;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    images: string[];
  };
}

interface TestDriveAppointment {
  id: number;
  listingId: number;
  buyerId: string;
  sellerId: string;
  appointmentDate: string;
  duration: number;
  meetingLocation: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  buyerNotes?: string;
  sellerNotes?: string;
  completionNotes?: string;
  rating?: number;
  documentsRequired: string[];
  additionalRequirements?: string;
  createdAt: string;
  updatedAt: string;
  listing?: {
    id: number;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    location: string;
    images: string[];
  };
}

export default function MyListings() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
  const [showInquiriesDialog, setShowInquiriesDialog] = useState(false);
  const [showAppointmentsDialog, setShowAppointmentsDialog] = useState(false);
  const [showSmartPricingDialog, setShowSmartPricingDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<VideoCallAppointment | TestDriveAppointment | null>(null);
  const [appointmentAction, setAppointmentAction] = useState<'confirm' | 'cancel' | 'complete'>('confirm');
  const [meetingLink, setMeetingLink] = useState('');
  const [sellerNotes, setSellerNotes] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: listings, isLoading, error, refetch } = useQuery<CarListing[]>({
    queryKey: ['/api/user/listings'],
    enabled: isAuthenticated,
  });

  // Get conversations for selected listing
  const { data: listingConversations = [], isLoading: conversationsLoading } = useQuery<ListingConversation[]>({
    queryKey: ['/api/listing', selectedListingId, 'conversations'],
    enabled: !!selectedListingId && showInquiriesDialog,
  });

  // Get conversation counts for all listings
  const { data: listingConversationCounts = {} } = useQuery<Record<number, { total: number; unread: number }>>({
    queryKey: ['/api/user/listings/conversation-counts'],
    enabled: isAuthenticated && !!listings,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Get video call appointments for seller
  const { data: videoCallAppointments = [] } = useQuery<VideoCallAppointment[]>({
    queryKey: ['/api/video-calls'],
    enabled: isAuthenticated,
  });

  // Get test drive appointments for seller
  const { data: testDriveAppointments = [] } = useQuery<TestDriveAppointment[]>({
    queryKey: ['/api/test-drives'],
    enabled: isAuthenticated,
  });

  // Get pricing recommendation for selected listing
  const { data: pricingRecommendation, isLoading: pricingLoading } = useQuery({
    queryKey: ['/api/listings', selectedListingId, 'pricing-recommendation'],
    enabled: !!selectedListingId && showSmartPricingDialog && isAuthenticated,
  });

  // Mutation for updating video call appointments
  const updateVideoCallMutation = useMutation({
    mutationFn: async ({ appointmentId, data }: { appointmentId: number; data: any }) => {
      return apiRequest('PATCH', `/api/video-calls/${appointmentId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/video-calls'] });
      toast({
        title: "Success",
        description: "Video call appointment updated successfully",
      });
      setSelectedAppointment(null);
      setMeetingLink('');
      setSellerNotes('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update appointment",
        variant: "destructive",
      });
    },
  });

  // Mutation for updating test drive appointments
  const updateTestDriveMutation = useMutation({
    mutationFn: async ({ appointmentId, data }: { appointmentId: number; data: any }) => {
      return apiRequest('PATCH', `/api/test-drives/${appointmentId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/test-drives'] });
      toast({
        title: "Success",
        description: "Test drive appointment updated successfully",
      });
      setSelectedAppointment(null);
      setSellerNotes('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update appointment",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Under Review';
      case 'suspended': return 'Suspended';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const handleShowInquiries = (listingId: number) => {
    setSelectedListingId(listingId);
    setShowInquiriesDialog(true);
  };

  const handleShowAnalytics = (listingId: number) => {
    navigate(`/listing/${listingId}/analytics`);
  };

  const handleShowAppointments = (listingId: number) => {
    setSelectedListingId(listingId);
    setShowAppointmentsDialog(true);
  };

  const handleShowSmartPricing = (listingId: number) => {
    setSelectedListingId(listingId);
    setShowSmartPricingDialog(true);
  };

  const handleAppointmentAction = (appointment: VideoCallAppointment | TestDriveAppointment, action: 'confirm' | 'cancel' | 'complete') => {
    setSelectedAppointment(appointment);
    setAppointmentAction(action);
    
    // Pre-fill seller notes if they exist
    if ('sellerNotes' in appointment && appointment.sellerNotes) {
      setSellerNotes(appointment.sellerNotes);
    }
    
    // Pre-fill meeting link for video calls
    if ('meetingLink' in appointment && appointment.meetingLink) {
      setMeetingLink(appointment.meetingLink);
    }
  };

  const handleUpdateAppointment = () => {
    if (!selectedAppointment) return;

    const isVideoCall = 'meetingLink' in selectedAppointment;
    const updateData: any = {
      status: appointmentAction === 'confirm' ? 'confirmed' : appointmentAction === 'cancel' ? 'cancelled' : 'completed',
      sellerNotes: sellerNotes || undefined,
    };

    if (isVideoCall && meetingLink) {
      updateData.meetingLink = meetingLink;
    }

    if (isVideoCall) {
      updateVideoCallMutation.mutate({
        appointmentId: selectedAppointment.id,
        data: updateData,
      });
    } else {
      updateTestDriveMutation.mutate({
        appointmentId: selectedAppointment.id,
        data: updateData,
      });
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please sign in to view your listings.</p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">


        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Car className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {listings?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-green-600">
                    {listings?.reduce((sum, listing) => sum + listing.viewCount, 0) || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Favorites</p>
                  <p className="text-2xl font-bold text-red-600">
                    {listings?.reduce((sum, listing) => sum + listing.favoriteCount, 0) || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {listings?.filter(listing => listing.status === 'active').length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Listings</h3>
            <p className="text-gray-600 mb-4">Failed to load your listings. Please try again.</p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : !listings || listings.length === 0 ? (
          <div className="text-center py-12">
            <Car className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Listings Yet</h3>
            <p className="text-gray-500 mb-6">
              You haven't created any vehicle listings yet. Start by creating your first listing!
            </p>
            <Link href="/sell-my-car">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Listing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Vehicle Image */}
                    <div className="w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {listing.images && listing.images.length > 0 ? (
                        <img 
                          src={listing.images[0]} 
                          alt={listing.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Car className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    
                    {/* Vehicle Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{listing.title}</h3>
                          <p className="text-gray-600">
                            {listing.make} {listing.model} ({listing.year})
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(listing.status)}>
                            {getStatusText(listing.status)}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-semibold text-purple-600">{formatCurrency(listing.price)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{listing.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fuel Type</p>
                          <p className="font-medium">{listing.fuelType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Listed</p>
                          <p className="font-medium">{formatDate(listing.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{listing.viewCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{listing.favoriteCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleShowInquiries(listing.id)}
                            className="relative"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Inquiries
                            {listingConversationCounts[listing.id]?.unread > 0 && (
                              <Badge 
                                variant="destructive" 
                                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                              >
                                {listingConversationCounts[listing.id].unread}
                              </Badge>
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleShowAppointments(listing.id)}
                            className="relative"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Appointments
                            {(() => {
                              const videoCallCount = videoCallAppointments.filter(app => app.listingId === listing.id && app.status === 'pending').length;
                              const testDriveCount = testDriveAppointments.filter(app => app.listingId === listing.id && app.status === 'pending').length;
                              const totalPending = videoCallCount + testDriveCount;
                              return totalPending > 0 ? (
                                <Badge 
                                  variant="destructive" 
                                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                                >
                                  {totalPending}
                                </Badge>
                              ) : null;
                            })()}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleShowAnalytics(listing.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            asChild
                          >
                            <Link href={`/listing/${listing.id}/manage`}>
                              <Settings className="h-4 w-4 mr-2" />
                              Manage
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Appointments Dialog */}
        <Dialog open={showAppointmentsDialog} onOpenChange={setShowAppointmentsDialog}>
          <DialogContent className="max-w-6xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Management
                {selectedListingId && listings && (
                  <span className="text-sm font-normal text-gray-600">
                    - {listings.find(l => l.id === selectedListingId)?.title}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="video-calls" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="video-calls" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Calls ({videoCallAppointments.filter(app => app.listingId === selectedListingId).length})
                </TabsTrigger>
                <TabsTrigger value="test-drives" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Test Drives ({testDriveAppointments.filter(app => app.listingId === selectedListingId).length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="video-calls" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {videoCallAppointments
                      .filter(app => app.listingId === selectedListingId)
                      .length === 0 ? (
                      <div className="text-center py-8">
                        <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No Video Call Requests</h3>
                        <p className="text-gray-500">
                          When buyers request video calls for this listing, they will appear here.
                        </p>
                      </div>
                    ) : (
                      videoCallAppointments
                        .filter(app => app.listingId === selectedListingId)
                        .map((appointment) => (
                          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center gap-2">
                                      <Video className="h-4 w-4 text-purple-600" />
                                      <span className="font-medium">Video Call Request</span>
                                    </div>
                                    <Badge className={getAppointmentStatusColor(appointment.status)}>
                                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                    <div>
                                      <p className="text-gray-500">Date & Time</p>
                                      <p className="font-medium">{formatDateTime(appointment.appointmentDate)}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Duration</p>
                                      <p className="font-medium">{appointment.duration} minutes</p>
                                    </div>
                                  </div>
                                  
                                  {appointment.notes && (
                                    <div className="mb-3">
                                      <p className="text-gray-500 text-sm">Buyer Notes:</p>
                                      <p className="text-sm bg-gray-50 p-2 rounded">{appointment.notes}</p>
                                    </div>
                                  )}
                                  
                                  {appointment.meetingLink && (
                                    <div className="mb-3">
                                      <p className="text-gray-500 text-sm">Meeting Link:</p>
                                      <a 
                                        href={appointment.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 hover:underline text-sm"
                                      >
                                        {appointment.meetingLink}
                                      </a>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex flex-col gap-2 ml-4">
                                  {appointment.status === 'pending' && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        onClick={() => handleAppointmentAction(appointment, 'confirm')}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Confirm
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleAppointmentAction(appointment, 'cancel')}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Decline
                                      </Button>
                                    </>
                                  )}
                                  
                                  {appointment.status === 'confirmed' && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleAppointmentAction(appointment, 'complete')}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="test-drives" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {testDriveAppointments
                      .filter(app => app.listingId === selectedListingId)
                      .length === 0 ? (
                      <div className="text-center py-8">
                        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No Test Drive Requests</h3>
                        <p className="text-gray-500">
                          When buyers request test drives for this listing, they will appear here.
                        </p>
                      </div>
                    ) : (
                      testDriveAppointments
                        .filter(app => app.listingId === selectedListingId)
                        .map((appointment) => (
                          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center gap-2">
                                      <Car className="h-4 w-4 text-cyan-600" />
                                      <span className="font-medium">Test Drive Request</span>
                                    </div>
                                    <Badge className={getAppointmentStatusColor(appointment.status)}>
                                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                    <div>
                                      <p className="text-gray-500">Date & Time</p>
                                      <p className="font-medium">{formatDateTime(appointment.appointmentDate)}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Duration</p>
                                      <p className="font-medium">{appointment.duration} minutes</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <p className="text-gray-500 text-sm">Meeting Location:</p>
                                    <p className="font-medium flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {appointment.meetingLocation}
                                    </p>
                                  </div>
                                  
                                  {appointment.buyerNotes && (
                                    <div className="mb-3">
                                      <p className="text-gray-500 text-sm">Buyer Notes:</p>
                                      <p className="text-sm bg-gray-50 p-2 rounded">{appointment.buyerNotes}</p>
                                    </div>
                                  )}
                                  
                                  {appointment.documentsRequired && appointment.documentsRequired.length > 0 && (
                                    <div className="mb-3">
                                      <p className="text-gray-500 text-sm">Required Documents:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {appointment.documentsRequired.map((doc, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {doc}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex flex-col gap-2 ml-4">
                                  {appointment.status === 'pending' && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        onClick={() => handleAppointmentAction(appointment, 'confirm')}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Confirm
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleAppointmentAction(appointment, 'cancel')}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Decline
                                      </Button>
                                    </>
                                  )}
                                  
                                  {appointment.status === 'confirmed' && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleAppointmentAction(appointment, 'complete')}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Appointment Action Dialog */}
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedAppointment && 'meetingLink' in selectedAppointment ? (
                  <Video className="h-5 w-5 text-purple-600" />
                ) : (
                  <Car className="h-5 w-5 text-cyan-600" />
                )}
                {appointmentAction === 'confirm' ? 'Confirm' : 
                 appointmentAction === 'cancel' ? 'Decline' : 'Complete'} Appointment
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {appointmentAction === 'confirm' && selectedAppointment && 'meetingLink' in selectedAppointment && (
                <div>
                  <Label htmlFor="meeting-link">Meeting Link (Optional)</Label>
                  <Input
                    id="meeting-link"
                    type="url"
                    placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Add a video call link for the buyer to join the meeting.
                  </p>
                </div>
              )}
              
              <div>
                <Label htmlFor="seller-notes">
                  {appointmentAction === 'complete' ? 'Completion Notes' : 'Notes (Optional)'}
                </Label>
                <Textarea
                  id="seller-notes"
                  placeholder={
                    appointmentAction === 'confirm' ? "Any additional instructions or information for the buyer..." :
                    appointmentAction === 'cancel' ? "Reason for declining (optional)..." :
                    "How did the appointment go? Any feedback or next steps..."
                  }
                  value={sellerNotes}
                  onChange={(e) => setSellerNotes(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedAppointment(null)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateAppointment}
                  disabled={updateVideoCallMutation.isPending || updateTestDriveMutation.isPending}
                  className={
                    appointmentAction === 'confirm' ? "bg-green-600 hover:bg-green-700" :
                    appointmentAction === 'cancel' ? "bg-red-600 hover:bg-red-700" :
                    "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  {updateVideoCallMutation.isPending || updateTestDriveMutation.isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {appointmentAction === 'confirm' ? (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      ) : appointmentAction === 'cancel' ? (
                        <XCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      {appointmentAction === 'confirm' ? 'Confirm' : 
                       appointmentAction === 'cancel' ? 'Decline' : 'Complete'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Inquiries Dialog */}
        <Dialog open={showInquiriesDialog} onOpenChange={setShowInquiriesDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Listing Inquiries
                {selectedListingId && listings && (
                  <span className="text-sm font-normal text-gray-600">
                    - {listings.find(l => l.id === selectedListingId)?.title}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {conversationsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading inquiries...</p>
                </div>
              ) : listingConversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Inquiries Yet</h3>
                  <p className="text-gray-500">
                    When buyers message you about this listing, their inquiries will appear here.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {listingConversations.map((conversation) => (
                      <Link 
                        key={conversation.id} 
                        href={`/messages?conversation=${conversation.id}`}
                        onClick={() => setShowInquiriesDialog(false)}
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">
                                      {conversation.participants && conversation.participants.length > 0
                                        ? `${conversation.participants[0].firstName} ${conversation.participants[0].lastName}`
                                        : 'Unknown User'
                                      }
                                    </span>
                                  </div>
                                  {conversation.unread_count > 0 && (
                                    <Badge variant="destructive" className="text-xs">
                                      {conversation.unread_count} unread
                                    </Badge>
                                  )}
                                </div>
                                
                                {conversation.last_message && (
                                  <div className="mb-2">
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                      {conversation.last_message.content}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatTime(conversation.last_message.createdAt)} by {conversation.last_message.senderName}
                                    </p>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>{conversation.message_count} messages</span>
                                  <span>Last activity: {formatTime(conversation.last_activity_at)}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-purple-600">
                                <MessageCircle className="h-4 w-4" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              )}
              
              {listingConversations.length > 0 && (
                <div className="text-center text-sm text-gray-500 pt-4 border-t">
                  <p>
                    Total: {listingConversations.length} inquiries • 
                    {listingConversations.reduce((sum, conv) => sum + conv.unread_count, 0)} unread messages
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Smart Pricing Dialog */}
        <Dialog open={showSmartPricingDialog} onOpenChange={setShowSmartPricingDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Smart Pricing Intelligence
                {selectedListingId && listings && (
                  <span className="text-sm font-normal text-gray-600">
                    - {listings.find(l => l.id === selectedListingId)?.title}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="h-[500px]">
              {pricingLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                  <span className="ml-3 text-gray-600">Analyzing market data...</span>
                </div>
              ) : pricingRecommendation ? (
                <div className="space-y-6">
                  {/* Current Price Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Current Price Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Price</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(pricingRecommendation.currentPrice)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Market Position</p>
                          <Badge className={
                            pricingRecommendation.pricePositioning === 'competitive' ? 'bg-green-100 text-green-800' :
                            pricingRecommendation.pricePositioning === 'above_market' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {pricingRecommendation.pricePositioning?.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      {pricingRecommendation.reasoning && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{pricingRecommendation.reasoning}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Price Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        Pricing Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Quick Sale</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(pricingRecommendation.recommendedPrice - (pricingRecommendation.priceAdjustment || 0) - 200000)}
                          </p>
                          <p className="text-xs text-gray-500">Sell within 2 weeks</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Recommended</p>
                          <p className="text-lg font-bold text-purple-600">
                            {formatCurrency(pricingRecommendation.recommendedPrice)}
                          </p>
                          <p className="text-xs text-gray-500">Balanced approach</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Premium</p>
                          <p className="text-lg font-bold text-blue-600">
                            {formatCurrency(pricingRecommendation.recommendedPrice + 300000)}
                          </p>
                          <p className="text-xs text-gray-500">Patient seller</p>
                        </div>
                      </div>
                      
                      {pricingRecommendation.priceAdjustment && (
                        <div className={`p-3 rounded-lg ${
                          pricingRecommendation.priceAdjustment > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          <p className="text-sm font-medium">
                            Suggested adjustment: {pricingRecommendation.priceAdjustment > 0 ? '+' : ''}
                            {formatCurrency(pricingRecommendation.priceAdjustment)}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Market Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Market Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {pricingRecommendation.marketInsights?.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      ))}
                      
                      {pricingRecommendation.similarVehicles && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-2">Similar Vehicles Analysis</p>
                          <p className="text-sm text-blue-700">
                            Average market price: {formatCurrency(pricingRecommendation.similarVehicles.averagePrice)} 
                            (based on {pricingRecommendation.similarVehicles.sampleSize} listings)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => {
                        // Navigate to edit listing with recommended price
                        setShowSmartPricingDialog(false);
                        toast({
                          title: "Price recommendation applied",
                          description: "You can now update your listing with the recommended price.",
                        });
                      }}
                    >
                      Apply Recommended Price
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild
                    >
                      <Link href="/smart-pricing">
                        View Full Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Pricing Data Available</h3>
                  <p className="text-gray-500">
                    Unable to generate pricing recommendation for this listing at the moment.
                  </p>
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}