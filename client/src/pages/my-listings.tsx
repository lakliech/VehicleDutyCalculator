import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useAuth } from '@/components/auth-provider';
import { Navigation } from '@/components/navigation';
import { Link } from 'wouter';
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
  User
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

export default function MyListings() {
  const { user, isAuthenticated } = useAuth();
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
  const [showInquiriesDialog, setShowInquiriesDialog] = useState(false);
  
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
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Analytics
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
      </div>
    </div>
  );
}