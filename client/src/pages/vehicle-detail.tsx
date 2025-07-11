import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, Heart, Share, Phone, MessageCircle, Calendar, MapPin,
  Fuel, Cog, Palette, Users, Shield, Check, Star, 
  ChevronLeft, ChevronRight, Eye, Clock, DollarSign,
  AlertCircle, CheckCircle, FileText, Camera, Zap,
  Navigation, Volume2, Wind, Thermometer, WifiIcon
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface VehicleDetail {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  engineSize: number;
  mileage: number;
  fuelType: string;
  bodyType: string;
  transmission: string;
  driveConfiguration: string;
  exteriorColor: string;
  interiorColor: string;
  condition: string;
  price: number;
  negotiable: boolean;
  description: string;
  features: string[];
  images: string[];
  location: string;
  phoneNumber: string;
  whatsappNumber?: string;
  viewCount: number;
  favoriteCount: number;
  featured: boolean;
  isVerified: boolean;
  createdAt: string;
  seller: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl?: string;
  };
}

interface InquiryForm {
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  message: string;
  inquiryType: string;
  preferredContactMethod: string;
}

interface OfferForm {
  offerAmount: number;
  message: string;
  financingRequired: boolean;
  tradeInVehicle: boolean;
  viewingRequested: boolean;
}

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [inquiryForm, setInquiryForm] = useState<InquiryForm>({
    buyerName: user?.firstName + ' ' + user?.lastName || '',
    buyerPhone: '',
    buyerEmail: user?.email || '',
    message: '',
    inquiryType: 'general',
    preferredContactMethod: 'phone'
  });
  const [offerForm, setOfferForm] = useState<OfferForm>({
    offerAmount: 0,
    message: '',
    financingRequired: false,
    tradeInVehicle: false,
    viewingRequested: false
  });

  // Fetch vehicle details
  const { data: vehicle, isLoading } = useQuery<VehicleDetail>({
    queryKey: [`/api/marketplace/listings/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/marketplace/listings/${id}`);
      if (!response.ok) throw new Error('Vehicle not found');
      return response.json();
    },
    enabled: !!id,
  });

  // Update view count on mount
  useEffect(() => {
    if (id) {
      fetch(`/api/marketplace/listings/${id}/view`, { method: 'POST' });
    }
  }, [id]);

  // Send inquiry mutation
  const inquiryMutation = useMutation({
    mutationFn: async (data: InquiryForm) => {
      return apiRequest("POST", `/api/marketplace/listings/${id}/inquiries`, data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "The seller will contact you soon.",
      });
      setInquiryForm(prev => ({ ...prev, message: '' }));
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Send offer mutation
  const offerMutation = useMutation({
    mutationFn: async (data: OfferForm) => {
      return apiRequest("POST", `/api/marketplace/listings/${id}/offers`, data);
    },
    onSuccess: () => {
      toast({
        title: "Offer Submitted",
        description: "Your offer has been sent to the seller.",
      });
      setOfferForm(prev => ({ ...prev, offerAmount: 0, message: '' }));
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save favorites.",
        variant: "destructive",
      });
      return;
    }

    try {
      const method = isFavorite ? 'DELETE' : 'POST';
      const response = await fetch(`/api/marketplace/favorites/${id}`, { method });
      
      if (response.ok) {
        setIsFavorite(!isFavorite);
        toast({
          title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
          description: isFavorite ? "Vehicle removed from your favorites." : "Vehicle added to your favorites.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites.",
        variant: "destructive",
      });
    }
  };

  const nextImage = () => {
    if (vehicle?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
    }
  };

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;
  const formatMileage = (mileage: number) => `${mileage.toLocaleString()} km`;

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, any> = {
      "Navigation System": Navigation,
      "Bluetooth": WifiIcon,
      "Air Conditioning": Wind,
      "Reverse Camera": Camera,
      "Cruise Control": Zap,
      "Leather Seats": Users,
      "Sunroof": Volume2,
      "Parking Sensors": Shield,
    };
    
    return iconMap[feature] || CheckCircle;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <ModuleNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <ModuleNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vehicle not found</h3>
              <p className="text-gray-600 mb-4">The vehicle you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/buy-a-car">Browse All Cars</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/buy-a-car" className="hover:text-purple-600">Buy a Car</Link>
          <span>/</span>
          <span>{vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main Image */}
                  <div className="h-96 relative overflow-hidden rounded-t-lg">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <img
                        src={vehicle.images[currentImageIndex]}
                        alt={`${vehicle.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Car className="w-24 h-24 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {vehicle.images && vehicle.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={nextImage}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    {vehicle.images && vehicle.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {vehicle.images.length}
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {vehicle.featured && (
                        <Badge className="bg-purple-600">Featured</Badge>
                      )}
                      {vehicle.isVerified && (
                        <Badge className="bg-green-600">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {vehicle.images && vehicle.images.length > 1 && (
                    <div className="p-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {vehicle.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                              index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">{vehicle.year}</div>
                    <div className="text-sm text-gray-600">Year</div>
                  </div>
                  <div className="text-center">
                    <Cog className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">{formatMileage(vehicle.mileage)}</div>
                    <div className="text-sm text-gray-600">Mileage</div>
                  </div>
                  <div className="text-center">
                    <Fuel className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold capitalize">{vehicle.fuelType}</div>
                    <div className="text-sm text-gray-600">Fuel Type</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold capitalize">{vehicle.transmission}</div>
                    <div className="text-sm text-gray-600">Transmission</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Features & Accessories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vehicle.features.map((feature, index) => {
                      const IconComponent = getFeatureIcon(feature);
                      return (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <IconComponent className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions and Seller Info */}
          <div className="space-y-6">
            
            {/* Price and Actions */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold text-purple-600">
                      {formatPrice(vehicle.price)}
                    </CardTitle>
                    {vehicle.negotiable && (
                      <p className="text-sm text-gray-600">Price is negotiable</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={toggleFavorite}>
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                
                {/* Main Actions */}
                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Make an Offer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Make an Offer</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Your Offer (KES)</Label>
                          <Input
                            type="number"
                            value={offerForm.offerAmount || ''}
                            onChange={(e) => setOfferForm(prev => ({ ...prev, offerAmount: parseInt(e.target.value) || 0 }))}
                            placeholder="Enter your offer amount"
                          />
                        </div>
                        <div>
                          <Label>Message to Seller</Label>
                          <Textarea
                            value={offerForm.message}
                            onChange={(e) => setOfferForm(prev => ({ ...prev, message: e.target.value }))}
                            placeholder="Add a personal message..."
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="financing"
                              checked={offerForm.financingRequired}
                              onChange={(e) => setOfferForm(prev => ({ ...prev, financingRequired: e.target.checked }))}
                            />
                            <Label htmlFor="financing">I need financing assistance</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="tradein"
                              checked={offerForm.tradeInVehicle}
                              onChange={(e) => setOfferForm(prev => ({ ...prev, tradeInVehicle: e.target.checked }))}
                            />
                            <Label htmlFor="tradein">I have a vehicle to trade in</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="viewing"
                              checked={offerForm.viewingRequested}
                              onChange={(e) => setOfferForm(prev => ({ ...prev, viewingRequested: e.target.checked }))}
                            />
                            <Label htmlFor="viewing">I'd like to schedule a viewing</Label>
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => offerMutation.mutate(offerForm)}
                          disabled={offerMutation.isPending || !offerForm.offerAmount}
                        >
                          {offerMutation.isPending ? 'Sending...' : 'Submit Offer'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild>
                      <a href={`tel:${vehicle.phoneNumber}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                    {vehicle.whatsappNumber && (
                      <Button variant="outline" asChild>
                        <a href={`https://wa.me/${vehicle.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Additional Actions */}
                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact Seller</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Your Name</Label>
                            <Input
                              value={inquiryForm.buyerName}
                              onChange={(e) => setInquiryForm(prev => ({ ...prev, buyerName: e.target.value }))}
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <Label>Phone Number</Label>
                            <Input
                              value={inquiryForm.buyerPhone}
                              onChange={(e) => setInquiryForm(prev => ({ ...prev, buyerPhone: e.target.value }))}
                              placeholder="Your phone number"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={inquiryForm.buyerEmail}
                            onChange={(e) => setInquiryForm(prev => ({ ...prev, buyerEmail: e.target.value }))}
                            placeholder="Your email address"
                          />
                        </div>
                        <div>
                          <Label>Inquiry Type</Label>
                          <Select value={inquiryForm.inquiryType} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, inquiryType: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="viewing">Schedule Viewing</SelectItem>
                              <SelectItem value="finance">Financing Options</SelectItem>
                              <SelectItem value="trade">Trade-in Query</SelectItem>
                              <SelectItem value="inspection">Inspection Request</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Message</Label>
                          <Textarea
                            value={inquiryForm.message}
                            onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                            placeholder="Hi, I'm interested in this vehicle..."
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label>Preferred Contact Method</Label>
                          <Select value={inquiryForm.preferredContactMethod} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, preferredContactMethod: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => inquiryMutation.mutate(inquiryForm)}
                          disabled={inquiryMutation.isPending}
                        >
                          {inquiryMutation.isPending ? 'Sending...' : 'Send Message'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Visit
                  </Button>

                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Callback
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Stats */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {vehicle.viewCount} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {vehicle.favoriteCount} favorites
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Listed {new Date(vehicle.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  {vehicle.seller.profileImageUrl ? (
                    <img
                      src={vehicle.seller.profileImageUrl}
                      alt={`${vehicle.seller.firstName} ${vehicle.seller.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">
                        {vehicle.seller.firstName[0]}{vehicle.seller.lastName[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">
                      {vehicle.seller.firstName} {vehicle.seller.lastName}
                    </div>
                    <div className="text-sm text-gray-600">Private Seller</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {vehicle.location}
                  </div>
                  
                  {showContactInfo ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${vehicle.phoneNumber}`} className="text-purple-600 hover:underline">
                          {vehicle.phoneNumber}
                        </a>
                      </div>
                      {vehicle.whatsappNumber && (
                        <div className="flex items-center gap-2 text-sm">
                          <MessageCircle className="w-4 h-4" />
                          <a 
                            href={`https://wa.me/${vehicle.whatsappNumber.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            {vehicle.whatsappNumber}
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setShowContactInfo(true)}
                    >
                      Show Contact Information
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-5 h-5" />
                  <span>{vehicle.location}</span>
                </div>
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}