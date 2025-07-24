import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Phone, Mail, Globe, MapPin, Star, Eye, Users, Clock, Calendar, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface ServiceProvider {
  id: number;
  businessName: string;
  contactPersonName: string;
  businessType: string;
  phoneNumbers: string[];
  email?: string;
  website?: string;
  whatsappNumber?: string;
  county: string;
  area: string;
  specificLocation?: string;
  latitude?: number;
  longitude?: number;
  description: string;
  businessHours?: Record<string, string>;
  yearsInBusiness?: number;
  licenseNumber?: string;
  logoUrl?: string;
  bannerImageUrl?: string;
  galleryImages?: string[];
  isVerified: boolean;
  verificationDate?: string;
  verificationNotes?: string;
  isActive: boolean;
  isApproved: boolean;
  viewCount: number;
  contactCount: number;
  rating?: number;
  reviewCount: number;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
  services?: any[];
  reviews?: any[];
}

export default function ProviderDetails() {
  const [match, params] = useRoute("/provider/:id");
  const { toast } = useToast();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);

  const providerId = params?.id ? parseInt(params.id) : null;

  const { data: providerData, isLoading, error } = useQuery({
    queryKey: ['/api/ecosystem/providers', providerId],
    queryFn: async () => {
      if (!providerId) throw new Error("No provider ID");
      const response = await fetch(`/api/ecosystem/providers/${providerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!providerId,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  useEffect(() => {
    if (providerData) {
      setProvider(providerData);
    }
  }, [providerData]);

  const handleCall = (provider: ServiceProvider) => {
    const phoneNumber = provider.phoneNumbers?.[0]?.replace(/\D/g, '');
    if (phoneNumber) {
      // Log contact action
      fetch(`/api/ecosystem/providers/${provider.id}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactType: 'phone' })
      }).catch(console.error);

      window.location.href = `tel:+254${phoneNumber.startsWith('254') ? phoneNumber.slice(3) : phoneNumber}`;
    }
  };

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('254')) {
      return `+${cleaned}`;
    }
    return `+254${cleaned}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!match || !providerId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
          <Link href="/ecosystem">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Provider</h1>
          <p className="text-gray-600 mb-4">Unable to load provider details</p>
          <Link href="/ecosystem">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ecosystem">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleCall(provider)}
                disabled={!provider.phoneNumbers?.[0]}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              {provider.email && (
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = `mailto:${provider.email}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {provider.logoUrl && (
                      <img 
                        src={provider.logoUrl} 
                        alt={`${provider.businessName} logo`}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {provider.businessName}
                        {provider.isVerified && (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{provider.businessType}</p>
                      <p className="text-sm text-gray-500">Contact: {provider.contactPersonName}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{provider.description}</p>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.yearsInBusiness && (
                    <div>
                      <h4 className="font-medium mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Years in Business
                      </h4>
                      <p className="text-sm text-gray-600">{provider.yearsInBusiness} years</p>
                    </div>
                  )}
                  {provider.licenseNumber && (
                    <div>
                      <h4 className="font-medium mb-1">License Number</h4>
                      <p className="text-sm text-gray-600">{provider.licenseNumber}</p>
                    </div>
                  )}
                  {provider.businessHours && (
                    <div>
                      <h4 className="font-medium mb-1 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Operating Hours
                      </h4>
                      <p className="text-sm text-gray-600">{JSON.stringify(provider.businessHours)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            {provider.services && provider.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {provider.services.map((service: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium">{service.name}</h4>
                        {service.description && (
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {provider.reviews && provider.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {provider.reviews.map((review: any, index: number) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.reviewerName}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {provider.phoneNumbers?.map((phone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`tel:${phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {formatPhoneNumber(phone)}
                      </a>
                    </div>
                  ))}
                  {provider.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`mailto:${provider.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {provider.email}
                      </a>
                    </div>
                  )}
                  {provider.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {provider.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{provider.area}, {provider.county}</div>
                    {provider.specificLocation && (
                      <div className="text-gray-600 text-sm">{provider.specificLocation}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{provider.viewCount || 0}</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{provider.contactCount || 0}</div>
                    <div className="text-xs text-gray-500">Contacts</div>
                  </div>
                  {provider.averageRating && (
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {provider.averageRating.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  )}
                  {provider.reviewCount && (
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">{provider.reviewCount}</div>
                      <div className="text-xs text-gray-500">Reviews</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Registration Date */}
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Registered on {formatDate(provider.createdAt)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}