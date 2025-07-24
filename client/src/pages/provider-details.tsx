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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider not found</h1>
          <p className="text-gray-600 mb-4">Unable to load provider details</p>
          <Link href="/ecosystem">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 bg-white">
        {provider.bannerImageUrl && (
          <img 
            src={provider.bannerImageUrl} 
            alt="Business cover"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link href="/ecosystem">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to directory
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Business Header Card */}
            <Card className="mb-4 shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    {provider.logoUrl ? (
                      <img 
                        src={provider.logoUrl} 
                        alt={`${provider.businessName} logo`}
                        className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-[#740a72] to-[#b10573] rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                          {provider.businessName}
                          {provider.isVerified && (
                            <Badge className="bg-[#740a72] hover:bg-[#b10573]">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </h1>
                        
                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
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
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-base">{provider.averageRating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-500 text-sm">
                              ({provider.reviewCount || 0} review{provider.reviewCount !== 1 ? 's' : ''})
                            </span>
                          </div>
                        )}

                        {/* Location */}
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-2 text-[#740a72]" />
                          <span className="font-medium text-sm">{provider.area}, {provider.county}</span>
                          {provider.specificLocation && (
                            <span className="text-sm ml-2">• {provider.specificLocation}</span>
                          )}
                        </div>

                        {/* Description */}
                        {provider.description && (
                          <p className="text-gray-700 leading-relaxed text-sm">{provider.description}</p>
                        )}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {provider.phoneNumbers.length > 0 && (
                        <Button 
                          size="sm"
                          className="bg-[#740a72] hover:bg-[#b10573] text-white"
                          onClick={() => handleCall(provider.phoneNumbers[0])}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call now
                        </Button>
                      )}
                      {(provider.whatsappNumber || provider.phoneNumbers[0]) && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="border-[#740a72] text-[#740a72] hover:bg-[#740a72] hover:text-white"
                          onClick={() => handleWhatsApp(provider.whatsappNumber || provider.phoneNumbers[0])}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-[#b10573] text-[#b10573] hover:bg-[#b10573] hover:text-white"
                        onClick={() => handleDirections(provider)}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get directions
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-[#ee0074] text-[#ee0074] hover:bg-[#ee0074] hover:text-white"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Offered */}
            {provider.services && provider.services.length > 0 && (
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-xl">🛠️</span>
                    Services offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="space-y-4">
                    {/* Group services by category */}
                    {provider.services.reduce((groups: any, service: any) => {
                      const category = service.subcategory?.name || 'General services';
                      if (!groups[category]) groups[category] = [];
                      groups[category].push(service);
                      return groups;
                    }, {}) && Object.entries(provider.services.reduce((groups: any, service: any) => {
                      const category = service.subcategory?.name || 'General services';
                      if (!groups[category]) groups[category] = [];
                      groups[category].push(service);
                      return groups;
                    }, {})).map(([category, services]: [string, any]) => (
                      <div key={category} className="border-l-4 border-[#740a72] pl-3">
                        <h3 className="font-semibold text-base text-gray-900 mb-2 flex items-center">
                          <ServiceCategoryIcon category={category} />
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {services.map((service: any, index: number) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900 text-sm">{service.subcategory?.name || 'Service'}</h4>
                                  {service.description && (
                                    <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                                  )}
                                </div>
                                <div className="text-right ml-4">
                                  {service.priceRange && (
                                    <span className="text-[#740a72] font-semibold text-xs">
                                      {service.priceRange}
                                    </span>
                                  )}
                                  <Button size="sm" variant="ghost" className="mt-1 text-xs h-5 px-2">
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
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Business highlights & certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.isVerified && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Shield className="w-4 h-4 text-[#740a72]" />
                      <span className="text-[#740a72] font-medium text-sm">GariYangu verified business</span>
                    </div>
                  )}
                  {provider.yearsInBusiness && provider.yearsInBusiness >= 5 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800 font-medium text-sm">{provider.yearsInBusiness}+ years experience</span>
                    </div>
                  )}
                  {provider.licenseNumber && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-800 font-medium text-sm">Licensed & registered</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Award className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-800 font-medium text-sm">KRA PIN verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo & Video Gallery */}
            {provider.galleryImages && provider.galleryImages.length > 0 && (
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Photo gallery</CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {provider.galleryImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${provider.businessName} gallery ${index + 1}`}
                        className="w-full h-28 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Customer Reviews */}
            {provider.reviews && provider.reviews.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Customer reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-3">
                  {provider.reviews.map((review: any, index: number) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {review.reviewerName?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-gray-900 text-sm">{review.reviewerName || 'Anonymous'}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < (review.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm">{review.reviewText || review.comment}</p>
                          {review.serviceUsed && (
                            <p className="text-xs text-gray-500 mt-1">Service: {review.serviceUsed}</p>
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
          <div className="space-y-4">
            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Contact information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-3">
                {provider.phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-3 h-3 text-green-600" />
                    <a 
                      href={`tel:${phone}`}
                      className="text-blue-600 hover:underline font-medium text-sm"
                    >
                      {formatPhoneNumber(phone)}
                    </a>
                  </div>
                ))}
                {provider.email && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-3 h-3 text-blue-600" />
                    <a 
                      href={`mailto:${provider.email}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {provider.email}
                    </a>
                  </div>
                )}
                {provider.website && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Globe className="w-3 h-3 text-purple-600" />
                    <a 
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                    >
                      Visit website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Business details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-3">
                {provider.yearsInBusiness && (
                  <div>
                    <span className="text-xs text-gray-500 block">Years in business</span>
                    <p className="font-semibold text-sm">{provider.yearsInBusiness} years</p>
                  </div>
                )}
                {provider.licenseNumber && (
                  <div>
                    <span className="text-xs text-gray-500 block">License number</span>
                    <p className="font-medium text-sm">{provider.licenseNumber}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-gray-500 block">Business type</span>
                  <p className="font-medium capitalize text-sm">{provider.businessType}</p>
                </div>
                {provider.contactPersonName && (
                  <div>
                    <span className="text-xs text-gray-500 block">Contact person</span>
                    <p className="font-medium text-sm">{provider.contactPersonName}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Statistics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Performance stats</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{provider.viewCount || 0}</div>
                    <div className="text-xs text-blue-700">Profile views</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{provider.contactCount || 0}</div>
                    <div className="text-xs text-green-700">Contacts made</div>
                  </div>
                  {provider.averageRating && (
                    <div className="text-center p-2 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600 flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {provider.averageRating.toFixed(1)}
                      </div>
                      <div className="text-xs text-yellow-700">Average rating</div>
                    </div>
                  )}
                  <div className="text-center p-2 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{provider.reviewCount || 0}</div>
                    <div className="text-xs text-purple-700">Total reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-3">
                <Button className="w-full" variant="outline" size="sm">
                  📋 Request quote
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  💾 Save to favorites
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  📤 Share business
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  🚨 Report issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}