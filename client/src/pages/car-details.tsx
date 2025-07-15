import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Heart,
  GitCompare,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Car,
  Shield,
  CheckCircle,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  Zap,
  Users,
  Key,
  Wrench,
  Award,
  Clock,
  FileText,
  CreditCard,
  DollarSign,
  Calculator,
  TrendingDown,
  Building2,
  Percent
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";

interface VehicleDetails {
  id: number;
  sellerId: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  engineSize: string;
  doors: number;
  seats: number;
  exteriorColor: string;
  interiorColor: string;
  condition: string;
  location: string;
  images: string[];
  features: string[];
  isVerified: boolean;
  hasWarranty: boolean;
  hasFreeDelivery: boolean;
  warrantyDetails: string;
  deliveryInfo: string;
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  description: string;
  sellerInfo: {
    name: string;
    type: "dealer" | "individual";
    rating: number;
    reviewCount: number;
    location: string;
    phone: string;
  };
  vehicleHistory: {
    previousOwners: number;
    serviceHistory: string;
    accidentHistory: string;
    motStatus: string;
    lastService: string;
  };
  financingOptions: {
    monthlyPayment: number;
    depositAmount: number;
    loanTerm: number;
    interestRate: number;
  };
}

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [activeTab, setActiveTab] = useState(() => {
    // Check for #financial hash in URL to open financial services tab
    return window.location.hash === '#financial' ? 'financial' : 'overview';
  });
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Fetch vehicle details
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['/api/car-details', id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/car-listings/${id}/details`);
      return response.json();
    },
  });

  // Fetch message templates
  const { data: messageTemplates = [] } = useQuery({
    queryKey: ['/api/messaging/templates'],
    enabled: isAuthenticated,
  });

  // Fetch financial products for this listing
  const { data: financialProducts, isLoading: financialLoading } = useQuery({
    queryKey: ['/api/listing/financial-products', id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/listing/${id}/financial-products`);
      return response.json();
    },
    enabled: !!id,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { message: string; listingId: number; sellerId: string }) => {
      return await apiRequest('POST', '/api/messaging/send', messageData);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the seller successfully.",
      });
      setShowMessageDialog(false);
      setMessageText("");
      setSelectedTemplate("");
      queryClient.invalidateQueries({ queryKey: ['/api/messaging/conversations'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const handleAddToFavorites = async () => {
    try {
      await apiRequest('POST', `/api/car-listings/${id}/favorite`);
      toast({
        title: "Added to Favorites",
        description: "This car has been saved to your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please login to save cars to your favorites.",
        variant: "destructive",
      });
    }
  };

  const handleAddToComparison = async () => {
    try {
      await apiRequest('POST', `/api/car-listings/${id}/compare`);
      toast({
        title: "Added to Comparison",
        description: "This car has been added to your comparison list.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please login to compare cars.",
        variant: "destructive",
      });
    }
  };

  const handleCallSeller = () => {
    if (vehicle?.sellerInfo?.phone) {
      window.location.href = `tel:${vehicle.sellerInfo.phone}`;
    }
  };

  const handleWhatsAppSeller = () => {
    const phoneNumber = vehicle?.sellerInfo?.phone?.replace('+', '') || "254712345678";
    const message = encodeURIComponent(`Hi, I'm interested in your ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}. Is it still available?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMessageSeller = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to message the seller.",
        variant: "destructive",
      });
      return;
    }
    
    if (user?.id === vehicle?.sellerId) {
      toast({
        title: "Cannot Message Yourself",
        description: "This is your own listing.",
        variant: "destructive",
      });
      return;
    }
    
    setShowMessageDialog(true);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find((t: any) => t.id === templateId);
    if (template) {
      setMessageText(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutate({
      message: messageText.trim(),
      listingId: parseInt(id!),
      sellerId: vehicle.sellerId,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`,
        text: `Check out this ${vehicle?.year} ${vehicle?.make} ${vehicle?.model} for ${formatCurrency(vehicle?.price || 0)}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Vehicle link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <ModuleNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-video bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
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
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Vehicle not found</h3>
            <p className="text-gray-600 mb-4">The vehicle you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => setLocation('/buy-a-car')} className="bg-purple-600 hover:bg-purple-700">
              Back to Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Button 
          variant="outline" 
          onClick={() => setLocation('/buy-a-car')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search Results
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  {vehicle.images?.length > 0 ? (
                    <img
                      src={vehicle.images[currentImageIndex]}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl text-gray-400">
                      <Car />
                    </div>
                  )}
                  
                  {vehicle.images?.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : vehicle.images.length - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setCurrentImageIndex(i => i < vehicle.images.length - 1 ? i + 1 : 0)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={handleAddToFavorites}>
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleAddToComparison}>
                      <GitCompare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {vehicle.isVerified && (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {vehicle.hasWarranty && (
                      <Badge className="bg-blue-500">
                        <Shield className="h-3 w-3 mr-1" />
                        Warranty
                      </Badge>
                    )}
                    {vehicle.hasFreeDelivery && (
                      <Badge className="bg-purple-500">
                        Free Delivery
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Image Thumbnails */}
                {vehicle.images?.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Vehicle Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                    <TabsTrigger value="financial" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Financial Services
                    </TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-600">
                          {vehicle.description || `This well-maintained ${vehicle.year} ${vehicle.make} ${vehicle.model} offers excellent value with its reliable performance and comprehensive feature set. Perfect for daily commuting and family use.`}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Gauge className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-sm font-medium">{vehicle.mileage?.toLocaleString()} km</div>
                          <div className="text-xs text-gray-500">Mileage</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Fuel className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-sm font-medium">{vehicle.fuelType}</div>
                          <div className="text-xs text-gray-500">Fuel Type</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Settings className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-sm font-medium">{vehicle.transmission}</div>
                          <div className="text-xs text-gray-500">Transmission</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-sm font-medium">{vehicle.year}</div>
                          <div className="text-xs text-gray-500">Year</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="specs" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Make</span>
                          <span className="font-medium">{vehicle.make}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model</span>
                          <span className="font-medium">{vehicle.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year</span>
                          <span className="font-medium">{vehicle.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Body Type</span>
                          <span className="font-medium">{vehicle.bodyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engine Size</span>
                          <span className="font-medium">{vehicle.engineSize || "2.0L"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Doors</span>
                          <span className="font-medium">{vehicle.doors}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seats</span>
                          <span className="font-medium">{vehicle.seats || 5}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Type</span>
                          <span className="font-medium">{vehicle.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transmission</span>
                          <span className="font-medium">{vehicle.transmission}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Exterior Color</span>
                          <span className="font-medium">{vehicle.exteriorColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interior Color</span>
                          <span className="font-medium">{vehicle.interiorColor || "Black"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Condition</span>
                          <span className="font-medium">{vehicle.condition}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Financial Services Tab */}
                  <TabsContent value="financial" className="mt-6">
                    {financialLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading financial products...</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Loan Products Section */}
                        {financialProducts?.loanProducts?.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <Building2 className="h-5 w-5 text-purple-600" />
                              <h3 className="text-lg font-semibold">Available Loan Products</h3>
                              <Badge variant="secondary">{financialProducts.loanProducts.length} options</Badge>
                            </div>
                            <div className="grid gap-4">
                              {financialProducts.loanProducts.map((product: any, index: number) => (
                                <Card key={index} className="border-purple-200">
                                  <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <CardTitle className="text-lg">{product.bankName}</CardTitle>
                                        <CardDescription>{product.productName}</CardDescription>
                                      </div>
                                      <Badge variant="outline">{product.productType.replace('_', ' ')}</Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <DollarSign className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                        <div className="text-sm font-medium">{formatCurrency(product.recommendedLoanAmount)}</div>
                                        <div className="text-xs text-gray-500">Loan Amount</div>
                                      </div>
                                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <Calculator className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                        <div className="text-sm font-medium">{formatCurrency(product.estimatedMonthlyPayment)}</div>
                                        <div className="text-xs text-gray-500">Monthly Payment</div>
                                      </div>
                                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <Percent className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                        <div className="text-sm font-medium">{product.minInterestRate}%</div>
                                        <div className="text-xs text-gray-500">Interest Rate</div>
                                      </div>
                                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <Calendar className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                        <div className="text-sm font-medium">{product.maxTenureMonths} months</div>
                                        <div className="text-xs text-gray-500">Max Tenure</div>
                                      </div>
                                    </div>
                                    
                                    <div className="border-t pt-3">
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Down Payment:</span>
                                          <span className="font-medium">{formatCurrency(product.recommendedDownPayment)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Processing Fee:</span>
                                          <span className="font-medium">{formatCurrency(product.estimatedProcessingFee)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Total Interest:</span>
                                          <span className="font-medium">{formatCurrency(product.totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600 font-medium">Total Payable:</span>
                                          <span className="font-semibold text-purple-600">{formatCurrency(product.totalPayable)}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm" className="flex-1">
                                        <Phone className="h-4 w-4 mr-1" />
                                        Contact Bank
                                      </Button>
                                      <Button size="sm" className="flex-1">
                                        Apply Now
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Trade-in Estimate Section */}
                        {financialProducts?.tradeInEstimate && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <TrendingDown className="h-5 w-5 text-purple-600" />
                              <h3 className="text-lg font-semibold">Trade-in Value Estimate</h3>
                            </div>
                            <Card className="border-purple-200">
                              <CardContent className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <DollarSign className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                    <div className="text-lg font-semibold">{formatCurrency(financialProducts.tradeInEstimate.estimatedValue)}</div>
                                    <div className="text-xs text-gray-500">Estimated Trade-in Value</div>
                                  </div>
                                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <TrendingDown className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                    <div className="text-lg font-semibold">{financialProducts.tradeInEstimate.depreciationRate.toFixed(1)}%</div>
                                    <div className="text-xs text-gray-500">Depreciation Rate</div>
                                  </div>
                                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <Calendar className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                                    <div className="text-lg font-semibold">{financialProducts.tradeInEstimate.vehicleAge} years</div>
                                    <div className="text-xs text-gray-500">Vehicle Age</div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">
                                  {financialProducts.tradeInEstimate.notes}
                                </p>
                                <Button variant="outline" className="w-full mt-3">
                                  <Calculator className="h-4 w-4 mr-2" />
                                  Get Professional Appraisal
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                        
                        {/* No Products Available */}
                        {(!financialProducts?.loanProducts?.length && !financialProducts?.tradeInEstimate) && (
                          <div className="text-center py-8">
                            <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 mb-2">No financial products available for this vehicle</p>
                            <p className="text-sm text-gray-500">Contact our financial services team for personalized options</p>
                            <Button variant="outline" className="mt-4">
                              Contact Financial Advisor
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Previous Owners</span>
                          </div>
                          <span className="text-gray-600">{vehicle.vehicleHistory?.previousOwners || 2}</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Service History</span>
                          </div>
                          <span className="text-gray-600">{vehicle.vehicleHistory?.serviceHistory || "Full service history available"}</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Accident History</span>
                          </div>
                          <span className="text-gray-600">{vehicle.vehicleHistory?.accidentHistory || "No reported accidents"}</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Last Service</span>
                          </div>
                          <span className="text-gray-600">{vehicle.vehicleHistory?.lastService || "6 months ago"}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {vehicle.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price and Key Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-purple-600">
                  {formatCurrency(vehicle.price)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {vehicle.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {vehicle.viewCount} views
                  </div>
                </div>
                
                <Separator />
                
                {/* Financing Options */}
                {vehicle.financingOptions && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Finance from</h4>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(vehicle.financingOptions.monthlyPayment)}/month
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {vehicle.financingOptions.loanTerm} months • {vehicle.financingOptions.interestRate}% APR
                    </div>
                    <div className="text-sm text-gray-600">
                      Deposit: {formatCurrency(vehicle.financingOptions.depositAmount)}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    size="lg"
                    onClick={handleCallSeller}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Seller
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={handleMessageSeller}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Seller
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={handleWhatsAppSeller}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  By contacting the seller, you agree to our terms of service
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{vehicle.sellerInfo?.name || "Professional Dealer"}</span>
                  <Badge variant={vehicle.sellerInfo?.type === "dealer" ? "default" : "secondary"}>
                    {vehicle.sellerInfo?.type === "dealer" ? "Dealer" : "Individual"}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < (vehicle.sellerInfo?.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({vehicle.sellerInfo?.reviewCount || 28} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {vehicle.sellerInfo?.location || vehicle.location}
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  View All Seller Listings
                </Button>
              </CardContent>
            </Card>

            {/* Warranty & Delivery */}
            {(vehicle.hasWarranty || vehicle.hasFreeDelivery) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {vehicle.hasWarranty && (
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Warranty Included</div>
                        <div className="text-sm text-gray-600">
                          {vehicle.warrantyDetails || "12 months comprehensive warranty"}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {vehicle.hasFreeDelivery && (
                    <div className="flex items-start gap-3">
                      <Car className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Free Delivery</div>
                        <div className="text-sm text-gray-600">
                          {vehicle.deliveryInfo || "Free delivery within 50km"}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Message Seller Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Seller</DialogTitle>
            <DialogDescription>
              Send a message to the seller about this {vehicle?.year} {vehicle?.make} {vehicle?.model}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Message Templates */}
            {messageTemplates.length > 0 && (
              <div>
                <Label htmlFor="template">Quick Templates</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates
                      .filter((template: any) => !template.isAdminOnly)
                      .map((template: any) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Message Input */}
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Hi, I'm interested in your vehicle..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowMessageDialog(false)}
                disabled={sendMessageMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={sendMessageMutation.isPending || !messageText.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}