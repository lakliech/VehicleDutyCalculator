import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  MessageCircle, 
  Navigation, 
  Calendar,
  Mail, 
  Globe, 
  MapPin, 
  Star, 
  CheckCircle, 
  Clock,
  Shield,
  Award,
  Building2,
  ArrowLeft,
  ExternalLink,
  Quote
} from "lucide-react";
import { Link } from "wouter";

interface ServiceProvider {
  id: number;
  businessName: string;
  contactPersonName?: string;
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
  description?: string;
  businessHours?: any;
  yearsInBusiness?: number;
  licenseNumber?: string;
  logoUrl?: string;
  bannerImageUrl?: string;
  galleryImages?: string[];
  isVerified: boolean;
  viewCount: number;
  contactCount: number;
  rating?: number;
  reviewCount?: number;
  averageRating?: number;
  createdAt: string;
  services?: any[];
  reviews?: any[];
}

const ServiceCategoryIcon = ({ category }: { category: string }) => {
  const iconMap: Record<string, string> = {
    'repairs': '🔧',
    'parts': '🛞', 
    'sales': '🚗',
    'logistics': '🚚',
    'insurance': '🛡️',
    'financing': '💳',
    'maintenance': '⚙️',
    'inspection': '🔍'
  };
  
  const key = category.toLowerCase();
  return <span className="text-lg mr-2">{iconMap[key] || '⚡'}</span>;
};

const formatPhoneNumber = (phone: string) => {
  if (phone.startsWith('+254')) {
    return phone.replace('+254', '0');
  }
  if (phone.startsWith('254')) {
    return phone.replace('254', '0');
  }
  return phone.startsWith('0') ? phone : `0${phone}`;
};

const handleCall = (phoneNumber: string) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  let formattedPhone = cleanPhone;
  
  if (cleanPhone.startsWith('254')) {
    formattedPhone = `+${cleanPhone}`;
  } else if (cleanPhone.startsWith('0')) {
    formattedPhone = `+254${cleanPhone.slice(1)}`;
  } else {
    formattedPhone = `+254${cleanPhone}`;
  }
  
  window.location.href = `tel:${formattedPhone}`;
};

const handleWhatsApp = (phoneNumber: string) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  let formattedPhone = cleanPhone;
  
  if (cleanPhone.startsWith('254')) {
    formattedPhone = cleanPhone;
  } else if (cleanPhone.startsWith('0')) {
    formattedPhone = `254${cleanPhone.slice(1)}`;
  } else {
    formattedPhone = `254${cleanPhone}`;
  }
  
  const message = encodeURIComponent("Hello! I found your business on GariYangu and would like to inquire about your services.");
  window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
};

const handleDirections = (provider: ServiceProvider) => {
  if (provider.latitude && provider.longitude) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${provider.latitude},${provider.longitude}`, '_blank');
  } else {
    const query = encodeURIComponent(`${provider.businessName} ${provider.area} ${provider.county} Kenya`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }
};

export default function ProviderDetails() {
  const [, params] = useRoute("/provider/:id");
  const providerId = params?.id;

  const { data: provider, isLoading, error } = useQuery<ServiceProvider>({
    queryKey: [`/api/ecosystem/providers/${providerId}`],
    enabled: !!providerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading provider details...</p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h1>
          <p className="text-gray-600 mb-6">Unable to load provider details</p>
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
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-green-600 to-blue-600">
        {provider.bannerImageUrl && (
          <img 
            src={provider.bannerImageUrl} 
            alt="Business cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link href="/ecosystem">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Business Header Card */}
            <Card className="mb-6 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    {provider.logoUrl ? (
                      <img 
                        src={provider.logoUrl} 
                        alt={`${provider.businessName} logo`}
                        className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-2xl font-bold text-white">
                          {provider.businessName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Business Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                          {provider.businessName}
                          {provider.isVerified && (
                            <Badge className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </h1>
                        
                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            <Building2 className="w-3 h-3 mr-1" />
                            {provider.businessType}
                          </Badge>
                          {provider.services?.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <ServiceCategoryIcon category={service.subcategory?.name || 'service'} />
                              {service.subcategory?.name || 'Service'}
                            </Badge>
                          ))}
                        </div>

                        {/* Rating */}
                        {provider.averageRating && (
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-lg">{provider.averageRating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-500">
                              ({provider.reviewCount || 0} review{provider.reviewCount !== 1 ? 's' : ''})
                            </span>
                          </div>
                        )}

                        {/* Location */}
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-medium">{provider.area}, {provider.county}</span>
                          {provider.specificLocation && (
                            <span className="text-sm ml-2">• {provider.specificLocation}</span>
                          )}
                        </div>

                        {/* Description */}
                        {provider.description && (
                          <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                        )}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {provider.phoneNumbers.length > 0 && (
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleCall(provider.phoneNumbers[0])}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      )}
                      {(provider.whatsappNumber || provider.phoneNumbers[0]) && (
                        <Button 
                          variant="outline" 
                          className="border-green-500 text-green-600 hover:bg-green-50"
                          onClick={() => handleWhatsApp(provider.whatsappNumber || provider.phoneNumbers[0])}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        onClick={() => handleDirections(provider)}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Offered */}
            {provider.services && provider.services.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🛠️</span>
                    Services Offered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Group services by category */}
                    {provider.services.reduce((groups: any, service: any) => {
                      const category = service.subcategory?.name || 'General Services';
                      if (!groups[category]) groups[category] = [];
                      groups[category].push(service);
                      return groups;
                    }, {}) && Object.entries(provider.services.reduce((groups: any, service: any) => {
                      const category = service.subcategory?.name || 'General Services';
                      if (!groups[category]) groups[category] = [];
                      groups[category].push(service);
                      return groups;
                    }, {})).map(([category, services]: [string, any]) => (
                      <div key={category} className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                          <ServiceCategoryIcon category={category} />
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {services.map((service: any, index: number) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{service.subcategory?.name || 'Service'}</h4>
                                  {service.description && (
                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                  )}
                                </div>
                                <div className="text-right ml-4">
                                  {service.priceRange && (
                                    <span className="text-green-600 font-semibold text-sm">
                                      {service.priceRange}
                                    </span>
                                  )}
                                  <Button size="sm" variant="ghost" className="mt-1 text-xs h-6 px-2">
                                    <Quote className="w-3 h-3 mr-1" />
                                    Quote
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Highlights & Certifications */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Business Highlights & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.isVerified && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">GariYangu Verified Business</span>
                    </div>
                  )}
                  {provider.yearsInBusiness && provider.yearsInBusiness >= 5 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">{provider.yearsInBusiness}+ Years Experience</span>
                    </div>
                  )}
                  {provider.licenseNumber && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-800 font-medium">Licensed & Registered</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-orange-800 font-medium">KRA PIN Verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo & Video Gallery */}
            {provider.galleryImages && provider.galleryImages.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {provider.galleryImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${provider.businessName} gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Customer Reviews */}
            {provider.reviews && provider.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Customer Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {provider.reviews.map((review: any, index: number) => (
                    <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.reviewerName?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-gray-900">{review.reviewerName || 'Anonymous'}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < (review.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.reviewText || review.comment}</p>
                          {review.serviceUsed && (
                            <p className="text-sm text-gray-500 mt-2">Service: {review.serviceUsed}</p>
                          )}
                        </div>
                      </div>
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
                {provider.phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-green-600" />
                    <a 
                      href={`tel:${phone}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {formatPhoneNumber(phone)}
                    </a>
                  </div>
                ))}
                {provider.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a 
                      href={`mailto:${provider.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {provider.email}
                    </a>
                  </div>
                )}
                {provider.website && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <a 
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {provider.yearsInBusiness && (
                  <div>
                    <span className="text-sm text-gray-500 block">Years in Business</span>
                    <p className="font-semibold text-lg">{provider.yearsInBusiness} years</p>
                  </div>
                )}
                {provider.licenseNumber && (
                  <div>
                    <span className="text-sm text-gray-500 block">License Number</span>
                    <p className="font-medium">{provider.licenseNumber}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-500 block">Business Type</span>
                  <p className="font-medium capitalize">{provider.businessType}</p>
                </div>
                {provider.contactPersonName && (
                  <div>
                    <span className="text-sm text-gray-500 block">Contact Person</span>
                    <p className="font-medium">{provider.contactPersonName}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{provider.viewCount || 0}</div>
                    <div className="text-xs text-blue-700">Profile Views</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{provider.contactCount || 0}</div>
                    <div className="text-xs text-green-700">Contacts Made</div>
                  </div>
                  {provider.averageRating && (
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 fill-current" />
                        {provider.averageRating.toFixed(1)}
                      </div>
                      <div className="text-xs text-yellow-700">Average Rating</div>
                    </div>
                  )}
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{provider.reviewCount || 0}</div>
                    <div className="text-xs text-purple-700">Total Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  📋 Request Quote
                </Button>
                <Button className="w-full" variant="outline">
                  💾 Save to Favorites
                </Button>
                <Button className="w-full" variant="outline">
                  📤 Share Business
                </Button>
                <Button className="w-full" variant="outline">
                  🚨 Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}