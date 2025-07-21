import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Building, Phone, Mail, Globe, MapPin, Star, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";

export default function DealerProfilePage() {
  const [match, params] = useRoute("/dealer-profile/:id");
  const dealerId = params?.id;

  const { data: dealer, isLoading, error } = useQuery({
    queryKey: ["/api/dealers/profiles", dealerId],
    enabled: !!dealerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !dealer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dealer Not Found</h1>
          <p className="text-gray-600 mb-6">The dealer profile you're looking for doesn't exist.</p>
          <Link href="/buy-a-car">
            <Button>Browse Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <Avatar className="h-20 w-20">
                <AvatarImage src={dealer.logoUrl || ""} alt={dealer.dealerName} />
                <AvatarFallback className="bg-purple-600 text-white text-xl">
                  {dealer.dealerName?.[0]?.toUpperCase() || 'D'}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{dealer.dealerName}</h1>
                {dealer.isVerified && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Verified Dealer
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {dealer.businessLocation && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {dealer.businessLocation}
                  </div>
                )}
                
                {dealer.yearsInBusiness && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {dealer.yearsInBusiness} years in business
                  </div>
                )}
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  5.0 (0 reviews)
                </div>
              </div>
              
              {dealer.dealerBio && (
                <p className="text-gray-700 mt-3">{dealer.dealerBio}</p>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link href="/dealer-dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Switch to Personal</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dealer.emailAddress && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600">{dealer.emailAddress}</p>
                    </div>
                  </div>
                )}
                
                {dealer.phoneNumbers && dealer.phoneNumbers.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{dealer.phoneNumbers[0]}</p>
                    </div>
                  </div>
                )}
                
                {dealer.whatsappNumber && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">{dealer.whatsappNumber}</p>
                    </div>
                  </div>
                )}
                
                {dealer.websiteUrl && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Website</p>
                      <a 
                        href={dealer.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        {dealer.websiteUrl}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Specialties */}
            {dealer.specialties && dealer.specialties.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dealer.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Vehicle Listings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Listings</CardTitle>
                <CardDescription>Available vehicles from this dealer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                  <p className="text-gray-600">This dealer hasn't posted any vehicles yet.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}