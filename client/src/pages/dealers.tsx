import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, MapPin, Phone, MessageSquare, Shield, Car, Search, Filter,
  Building, Users, Award, TrendingUp
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import type { DealerProfile } from "@shared/schema";

interface DealerData extends DealerProfile {
  user: {
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
  };
  stats: {
    averageRating: number;
    totalReviews: number;
    activeListings: number;
  };
}

export default function Dealers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Fetch verified dealers
  const { data: dealers = [], isLoading } = useQuery<DealerData[]>({
    queryKey: ["/api/dealers/verified"],
  });

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = !searchTerm || 
      dealer.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.businessLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = !selectedSpecialty || 
      dealer.specialties?.includes(selectedSpecialty);
    
    const matchesLocation = !selectedLocation ||
      dealer.businessLocation.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  // Get unique specialties and locations for filters
  const allSpecialties = Array.from(new Set(dealers.flatMap(d => d.specialties || [])));
  const allLocations = Array.from(new Set(dealers.map(d => d.businessLocation)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModuleNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verified Dealers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with trusted, verified car dealers across Kenya. Find the right dealer for your needs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{dealers.filter(d => d.isVerified).length}</div>
              <div className="text-sm text-gray-600">Verified Dealers</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {dealers.reduce((sum, d) => sum + (d.stats?.activeListings || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {dealers.length > 0 ? 
                  (dealers.reduce((sum, d) => sum + (d.stats?.averageRating || 0), 0) / dealers.length).toFixed(1) 
                  : "0"
                }
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {dealers.reduce((sum, d) => sum + (d.stats?.totalReviews || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Customer Reviews</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search dealers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specialties</SelectItem>
                  {allSpecialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {allLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("");
                setSelectedLocation("");
              }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dealers Grid */}
        {filteredDealers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Dealers Found</h3>
              <p className="text-gray-600">
                {dealers.length === 0 
                  ? "No verified dealers are available at the moment."
                  : "Try adjusting your search filters to find more dealers."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((dealer) => (
              <Link key={dealer.id} href={`/dealer/${dealer.userId}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    {/* Dealer Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                        <AvatarImage src={dealer.logoUrl || dealer.user.profileImageUrl || ""} />
                        <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                          {dealer.dealerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 truncate">{dealer.dealerName}</h3>
                          {dealer.isVerified && (
                            <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {dealer.stats?.averageRating ? Number(dealer.stats.averageRating).toFixed(1) : "New"}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({dealer.stats?.totalReviews || 0} reviews)
                          </span>
                        </div>

                        {dealer.verificationBadge && (
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-800">
                            {dealer.verificationBadge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm truncate">{dealer.businessLocation}</span>
                    </div>

                    {/* Years in Business */}
                    {dealer.yearsInBusiness && (
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Award className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{dealer.yearsInBusiness} years in business</span>
                      </div>
                    )}

                    {/* Specialties */}
                    {dealer.specialties && dealer.specialties.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {dealer.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {dealer.specialties.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{dealer.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        <span>{dealer.stats?.activeListings || 0} cars</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>Chat</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredDealers.length > 0 && filteredDealers.length >= 12 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Dealers
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}