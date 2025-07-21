import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, MapPin, Phone, Mail, MessageSquare, Globe, Clock, 
  Shield, CheckCircle, Car, ThumbsUp, Calendar, User, Building
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ModuleNavigation } from "@/components/module-navigation";
import { apiRequest } from "@/lib/queryClient";
import type { DealerProfile, DealerReview, CarListing } from "@shared/schema";

interface DealerData extends DealerProfile {
  user: {
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
  };
  stats: {
    totalListings: number;
    activeListings: number;
    averageRating: number;
    totalReviews: number;
  };
}

interface ReviewData extends DealerReview {
  reviewer: {
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
  };
}

export default function DealerProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Fetch dealer profile
  const { data: dealer, isLoading: dealerLoading } = useQuery<DealerData>({
    queryKey: ["/api/dealers/public", userId],
    enabled: !!userId,
  });

  // Fetch dealer listings
  const { data: listings = [], isLoading: listingsLoading } = useQuery<CarListing[]>({
    queryKey: ["/api/dealers", userId, "listings"],
    enabled: !!userId,
  });

  // Fetch dealer reviews
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<ReviewData[]>({
    queryKey: ["/api/dealers", userId, "reviews"],
    enabled: !!userId,
  });

  if (dealerLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModuleNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModuleNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dealer Not Found</h2>
              <p className="text-gray-600">This dealer profile is not available or has not been approved yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatBusinessHours = (hours: any) => {
    if (!hours) return "Hours not specified";
    
    const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = {
      monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
      friday: 'Fri', saturday: 'Sat', sunday: 'Sun'
    };

    return daysOrder.map(day => {
      const dayHours = hours[day];
      if (!dayHours || dayHours.closed) {
        return `${dayNames[day as keyof typeof dayNames]}: Closed`;
      }
      return `${dayNames[day as keyof typeof dayNames]}: ${dayHours.open} - ${dayHours.close}`;
    }).join(' • ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dealer Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Dealer Logo/Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={dealer.logoUrl || dealer.user.profileImageUrl || ""} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                    {dealer.dealerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Dealer Info */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{dealer.dealerName}</h1>
                  
                  {dealer.isVerified && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <Shield className="w-4 h-4 mr-1" />
                        Verified Dealer
                      </Badge>
                      {dealer.verificationBadge && (
                        <Badge variant="outline" className="border-purple-200 text-purple-800">
                          {dealer.verificationBadge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Business Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{dealer.businessLocation}</span>
                  </div>
                  
                  {dealer.yearsInBusiness && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{dealer.yearsInBusiness} years in business</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {dealer.stats.averageRating ? Number(dealer.stats.averageRating).toFixed(1) : "New"} 
                      ({dealer.stats.totalReviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    <span>{dealer.stats.activeListings} active listings</span>
                  </div>
                </div>

                {/* Bio */}
                {dealer.dealerBio && (
                  <p className="mt-4 text-gray-700 leading-relaxed">{dealer.dealerBio}</p>
                )}

                {/* Specialties */}
                {dealer.specialties && dealer.specialties.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specializes in:</p>
                    <div className="flex flex-wrap gap-2">
                      {dealer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Actions */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                {dealer.phoneNumbers && dealer.phoneNumbers.length > 0 && (
                  <Button className="w-full md:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                )}
                
                {dealer.whatsappNumber && (
                  <Button variant="outline" className="w-full md:w-auto">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                )}

                {dealer.emailAddress && (
                  <Button variant="outline" className="w-full md:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                )}
              </div>
            </div>

            {/* Business Hours */}
            {dealer.businessHours && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-700">Business Hours</span>
                </div>
                <p className="text-sm text-gray-600">{formatBusinessHours(dealer.businessHours)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Inventory</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Listings</span>
                      <span className="font-semibold">{dealer.stats.totalListings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Listings</span>
                      <span className="font-semibold">{dealer.stats.activeListings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Customer Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {dealer.stats.averageRating ? Number(dealer.stats.averageRating).toFixed(1) : "New"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Offered */}
              {dealer.servicesOffered && dealer.servicesOffered.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {dealer.servicesOffered.map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Links */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dealer.websiteUrl && (
                      <a
                        href={dealer.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">Visit Website</span>
                      </a>
                    )}

                    {dealer.socialMediaLinks && Object.entries(dealer.socialMediaLinks).map(([platform, url]) => (
                      url && (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm capitalize">{platform}</span>
                        </a>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-6">
            {listingsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Listings</h3>
                  <p className="text-gray-600">This dealer doesn't have any active vehicle listings at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-w-16 aspect-h-9">
                      {listing.images && listing.images.length > 0 ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                          <Car className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{listing.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{listing.year}</span>
                        <span>{listing.mileage?.toLocaleString()} km</span>
                        <span className="capitalize">{listing.transmission}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">
                          KES {listing.price.toLocaleString()}
                        </span>
                        {listing.negotiable && (
                          <Badge variant="outline" className="text-xs">Negotiable</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {reviewsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                          </div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600">This dealer hasn't received any reviews from customers yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.reviewer.profileImageUrl || ""} />
                          <AvatarFallback>
                            {review.reviewer.firstName.charAt(0)}{review.reviewer.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">
                              {review.reviewer.firstName} {review.reviewer.lastName}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {review.reviewTitle && (
                            <h4 className="font-medium text-gray-900 mb-2">{review.reviewTitle}</h4>
                          )}
                          
                          <p className="text-gray-700 mb-3">{review.reviewText}</p>
                          
                          {review.vehicleInvolved && (
                            <p className="text-sm text-gray-600 mb-2">
                              Vehicle: {review.vehicleInvolved}
                            </p>
                          )}

                          {review.wouldRecommend && (
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <ThumbsUp className="w-4 h-4" />
                              <span>Would recommend this dealer</span>
                            </div>
                          )}

                          {review.dealerResponse && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Building className="w-4 h-4 text-gray-600" />
                                <span className="font-medium text-sm">Dealer Response</span>
                              </div>
                              <p className="text-sm text-gray-700">{review.dealerResponse}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dealer.phoneNumbers && dealer.phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">{phone}</p>
                        <p className="text-sm text-gray-600">Phone {index + 1}</p>
                      </div>
                    </div>
                  ))}

                  {dealer.emailAddress && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">{dealer.emailAddress}</p>
                        <p className="text-sm text-gray-600">Email</p>
                      </div>
                    </div>
                  )}

                  {dealer.whatsappNumber && (
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">{dealer.whatsappNumber}</p>
                        <p className="text-sm text-gray-600">WhatsApp</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">{dealer.businessLocation}</p>
                      <p className="text-sm text-gray-600">Business Address</p>
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
                  <Button className="w-full justify-start" size="lg">
                    <Phone className="w-5 h-5 mr-3" />
                    Call Dealer
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <MessageSquare className="w-5 h-5 mr-3" />
                    Send WhatsApp Message
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Mail className="w-5 h-5 mr-3" />
                    Send Email
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <MapPin className="w-5 h-5 mr-3" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}