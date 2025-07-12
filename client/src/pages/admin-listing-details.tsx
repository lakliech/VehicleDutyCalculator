import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Car, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Eye,
  Flag,
  CheckCircle,
  RefreshCw,
  Edit,
  StickyNote,
  DollarSign,
  Fuel,
  Gauge,
  Palette,
  Wrench,
  Hash
} from "lucide-react";

export default function AdminListingDetails() {
  const params = useParams();
  const listingId = params.id;
  const [, navigate] = useLocation();

  console.log('Admin Listing Details - Listing ID:', listingId);

  // Individual listing details query
  const { data: listingData, isLoading } = useQuery({
    queryKey: ['/api/admin/listing-details', listingId],
    queryFn: () => apiRequest('GET', `/api/admin/listing-details/${listingId}`),
    enabled: !!listingId,
  });

  console.log('Listing data:', listingData);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading listing details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Listing Not Found</h2>
            <p className="text-gray-600 mb-4">The requested listing could not be found.</p>
            <Button onClick={() => navigate('/admin/listings')}>
              Back to Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Button 
                onClick={() => navigate('/admin/listings')}
                variant="outline"
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Listings
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Listing Details</h1>
              <p className="text-gray-600">Complete information about this listing</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(listingData.status)}
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Listing Images */}
          {listingData.images && listingData.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listingData.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${listingData.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Listing Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="text-lg font-semibold">{listingData.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Make</label>
                    <p className="text-sm">{listingData.make}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Model</label>
                    <p className="text-sm">{listingData.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Year</label>
                    <p className="text-sm">{listingData.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Price</label>
                    <p className="text-lg font-bold text-purple-600">{formatPrice(listingData.price)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Engine Size</label>
                    <p className="text-sm">{listingData.engineSize}cc</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mileage</label>
                    <p className="text-sm">{listingData.mileage?.toLocaleString()} km</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fuel Type</label>
                    <p className="text-sm capitalize">{listingData.fuelType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Body Type</label>
                    <p className="text-sm capitalize">{listingData.bodyType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Transmission</label>
                    <p className="text-sm capitalize">{listingData.transmission}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Exterior Color</label>
                    <p className="text-sm capitalize">{listingData.exteriorColor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Interior Color</label>
                    <p className="text-sm capitalize">{listingData.interiorColor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Condition</label>
                    <p className="text-sm capitalize">{listingData.condition}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-sm">{listingData.location}</p>
                </div>
                
                {listingData.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-sm">{listingData.description}</p>
                  </div>
                )}
                
                {listingData.features && listingData.features.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Features</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {listingData.features.map((feature: string, index: number) => (
                        <Badge key={index} variant="secondary">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-sm">{listingData.sellerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-sm">{listingData.sellerEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-sm">{listingData.phoneNumber}</p>
                </div>
                {listingData.whatsappNumber && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                    <p className="text-sm">{listingData.whatsappNumber}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">Created At</label>
                  <p className="text-sm">{formatDate(listingData.createdAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Views</label>
                  <p className="text-lg font-semibold">{listingData.viewCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Favorites</label>
                  <p className="text-lg font-semibold">{listingData.favoriteCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Inquiries</label>
                  <p className="text-lg font-semibold">{listingData.inquiryCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Flags</label>
                  <p className="text-lg font-semibold">{listingData.flagCount || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Listing
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4" />
                  Add Note
                </Button>
                {listingData.status === 'pending' && (
                  <>
                    <Button variant="default" className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Reject
                    </Button>
                  </>
                )}
                <Button variant="outline" className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Flag
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}