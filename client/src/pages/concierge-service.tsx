import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthForms } from "@/components/auth-forms";
import { 
  Car, 
  Shield, 
  CheckCircle2, 
  Clock, 
  User,
  Phone,
  MessageSquare,
  Star,
  HandCoins,
  Search,
  FileSearch,
  Handshake,
  CreditCard,
  Truck,
  Calendar,
  Award
} from "lucide-react";

interface ConciergePackage {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  maxVehicles: number;
  includesInspection: boolean;
  includesNegotiation: boolean;
  includesEscrow: boolean;
  includesFollowUp: boolean;
  timeline: string;
}

interface ConciergeAdvisor {
  id: number;
  name: string;
  title: string;
  expertise: string[];
  experience: string;
  profileImageUrl?: string;
  rating: number;
  completedRequests: number;
}

interface ConciergeRequest {
  id: number;
  status: string;
  budgetRange: string;
  vehicleType: string;
  timeline: string;
  preferences: any;
  assignedAdvisor: string;
  createdAt: string;
}

export default function ConciergeService() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Close auth dialog when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && showAuthDialog) {
      setShowAuthDialog(false);
      // Auto-submit the form if they just authenticated
      if (requestForm.budgetRange && requestForm.vehicleType && requestForm.timeline) {
        handleAuthenticatedSubmit();
      }
    }
  }, [isAuthenticated, showAuthDialog]);

  // Handle submission for authenticated users
  const handleAuthenticatedSubmit = () => {
    createRequestMutation.mutate({
      ...requestForm,
      contactEmail: requestForm.contactEmail || user?.email,
    });
  };

  // Form state for new request
  const [requestForm, setRequestForm] = useState({
    budgetRange: "",
    vehicleType: "",
    timeline: "",
    preferences: {
      lifestyle: "",
      location: "",
      comfortVsUtility: "",
      ownershipHistory: "",
      financing: "",
      importPreference: "",
      urgency: ""
    },
    contactEmail: "",
    contactPhone: ""
  });

  // Fetch concierge packages
  const { data: packages = [], isLoading: packagesLoading } = useQuery<ConciergePackage[]>({
    queryKey: ["/api/concierge/packages"],
  });

  // Fetch concierge advisors
  const { data: advisors = [], isLoading: advisorsLoading } = useQuery<ConciergeAdvisor[]>({
    queryKey: ["/api/concierge/advisors"],
  });

  // Fetch user's requests (if authenticated)
  const { data: userRequests = [], isLoading: requestsLoading } = useQuery<ConciergeRequest[]>({
    queryKey: ["/api/concierge/requests"],
    enabled: isAuthenticated,
  });

  // Create new concierge request
  const createRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/concierge/requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your concierge request has been submitted. We'll contact you within 24 hours.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/concierge/requests"] });
      setActiveTab("my-requests");
      // Reset form
      setRequestForm({
        budgetRange: "",
        vehicleType: "",
        timeline: "",
        preferences: {
          lifestyle: "",
          location: "",
          comfortVsUtility: "",
          ownershipHistory: "",
          financing: "",
          importPreference: "",
          urgency: ""
        },
        contactEmail: "",
        contactPhone: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request",
        variant: "destructive",
      });
    },
  });

  const handleSubmitRequest = () => {
    if (!requestForm.budgetRange || !requestForm.vehicleType || !requestForm.timeline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    handleAuthenticatedSubmit();
  };

  // Handle submission for unauthenticated users (require email)
  const handleUnauthenticatedSubmit = () => {
    if (!requestForm.contactEmail) {
      toast({
        title: "Email Required",
        description: "Please provide your email address to submit a request.",
        variant: "destructive",
      });
      return;
    }

    createRequestMutation.mutate(requestForm);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      consultation: { color: "bg-blue-100 text-blue-800", text: "Consultation" },
      search: { color: "bg-yellow-100 text-yellow-800", text: "Searching" },
      verification: { color: "bg-purple-100 text-purple-800", text: "Verification" },
      negotiation: { color: "bg-orange-100 text-orange-800", text: "Negotiation" },
      payment: { color: "bg-green-100 text-green-800", text: "Payment" },
      delivery: { color: "bg-indigo-100 text-indigo-800", text: "Delivery" },
      completed: { color: "bg-green-500 text-white", text: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", text: "Cancelled" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.consultation;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Full Concierge Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert car buying assistance from consultation to delivery. 
            Let our professionals handle everything while you focus on what matters most.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="advisors">Our Team</TabsTrigger>
            <TabsTrigger value="request">Get Started</TabsTrigger>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-8 mt-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-purple-600" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold">Consultation</h4>
                      <p className="text-gray-600 text-sm">Tell us your needs, budget, and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold">Expert Search</h4>
                      <p className="text-gray-600 text-sm">We find and evaluate the best options for you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold">Verification & Inspection</h4>
                      <p className="text-gray-600 text-sm">Professional inspection and history verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold">Negotiation & Purchase</h4>
                      <p className="text-gray-600 text-sm">We negotiate the best deal and handle paperwork</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">5</div>
                    <div>
                      <h4 className="font-semibold">Delivery & Support</h4>
                      <p className="text-gray-600 text-sm">Secure delivery and ongoing support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-cyan-600" />
                    Why Choose Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Car className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-sm">Expert Knowledge</h4>
                      <p className="text-gray-600 text-xs">Years of automotive expertise</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-sm">Secure Process</h4>
                      <p className="text-gray-600 text-xs">Protected transactions</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-sm">Time Saving</h4>
                      <p className="text-gray-600 text-xs">We do the hard work</p>
                    </div>
                    <div className="text-center">
                      <HandCoins className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-sm">Best Deals</h4>
                      <p className="text-gray-600 text-xs">Negotiated savings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {packagesLoading ? (
                <div className="col-span-3 text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading packages...</p>
                </div>
              ) : (
                packages.map((pkg: ConciergePackage) => (
                  <Card 
                    key={pkg.id} 
                    className={`bg-white shadow-lg transition-all cursor-pointer ${
                      selectedPackage === pkg.id ? 'ring-2 ring-purple-500 shadow-xl' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                      <div className="text-3xl font-bold text-purple-600">
                        KES {pkg.price.toLocaleString()}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Max Vehicles:</span>
                          <span className="font-semibold">{pkg.maxVehicles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span className="font-semibold">{pkg.timeline}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="advisors">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {advisorsLoading ? (
                <div className="col-span-3 text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading advisors...</p>
                </div>
              ) : (
                advisors.map((advisor: ConciergeAdvisor) => (
                  <Card key={advisor.id} className="bg-white shadow-lg">
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 mx-auto flex items-center justify-center text-white text-2xl font-bold">
                        {advisor.name.charAt(0)}
                      </div>
                      <CardTitle className="text-lg">{advisor.name}</CardTitle>
                      <CardDescription>{advisor.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{advisor.rating}</span>
                        <span className="text-gray-500 text-sm">({advisor.completedRequests} requests)</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {advisor.expertise.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{advisor.experience}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="request">
            <Card className="bg-white shadow-lg mt-8">
              <CardHeader>
                <CardTitle>Submit Your Request</CardTitle>
                <CardDescription>
                  Tell us about your car buying needs and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budgetRange">Budget Range *</Label>
                      <Select 
                        value={requestForm.budgetRange} 
                        onValueChange={(value) => setRequestForm({...requestForm, budgetRange: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500k">Under KES 500,000</SelectItem>
                          <SelectItem value="500k-1m">KES 500,000 - 1,000,000</SelectItem>
                          <SelectItem value="1m-2m">KES 1,000,000 - 2,000,000</SelectItem>
                          <SelectItem value="2m-3m">KES 2,000,000 - 3,000,000</SelectItem>
                          <SelectItem value="3m-5m">KES 3,000,000 - 5,000,000</SelectItem>
                          <SelectItem value="above-5m">Above KES 5,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="vehicleType">Vehicle Type *</Label>
                      <Select 
                        value={requestForm.vehicleType} 
                        onValueChange={(value) => setRequestForm({...requestForm, vehicleType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="What type of vehicle?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="pickup">Pickup Truck</SelectItem>
                          <SelectItem value="wagon">Station Wagon</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="convertible">Convertible</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="not-sure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Timeline *</Label>
                      <Select 
                        value={requestForm.timeline} 
                        onValueChange={(value) => setRequestForm({...requestForm, timeline: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need the car?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">As soon as possible</SelectItem>
                          <SelectItem value="1-2-weeks">Within 1-2 weeks</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lifestyle">Lifestyle Use</Label>
                      <Select 
                        value={requestForm.preferences.lifestyle} 
                        onValueChange={(value) => setRequestForm({
                          ...requestForm, 
                          preferences: {...requestForm.preferences, lifestyle: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How will you use the car?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily-commute">Daily commute</SelectItem>
                          <SelectItem value="family">Family transportation</SelectItem>
                          <SelectItem value="business">Business use</SelectItem>
                          <SelectItem value="weekend">Weekend trips</SelectItem>
                          <SelectItem value="mixed">Mixed use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="financing">Financing</Label>
                      <Select 
                        value={requestForm.preferences.financing} 
                        onValueChange={(value) => setRequestForm({
                          ...requestForm, 
                          preferences: {...requestForm.preferences, financing: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash payment</SelectItem>
                          <SelectItem value="bank-loan">Bank loan</SelectItem>
                          <SelectItem value="hire-purchase">Hire purchase</SelectItem>
                          <SelectItem value="need-help">Need financing help</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="importPreference">Import Preference</Label>
                      <Select 
                        value={requestForm.preferences.importPreference} 
                        onValueChange={(value) => setRequestForm({
                          ...requestForm, 
                          preferences: {...requestForm.preferences, importPreference: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Local or import?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local-only">Local only</SelectItem>
                          <SelectItem value="import-only">Import only</SelectItem>
                          <SelectItem value="both">Both options</SelectItem>
                          <SelectItem value="best-deal">Best deal regardless</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={requestForm.contactEmail}
                      onChange={(e) => setRequestForm({...requestForm, contactEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={requestForm.contactPhone}
                      onChange={(e) => setRequestForm({...requestForm, contactPhone: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmitRequest}
                  disabled={createRequestMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  {createRequestMutation.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-requests">
            {!isAuthenticated ? (
              <Card className="bg-white shadow-lg mt-8">
                <CardContent className="text-center py-12">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
                  <p className="text-gray-600 mb-4">Please sign in to view your concierge requests.</p>
                  <Button onClick={() => window.location.href = "/api/auth/google"}>
                    Sign In with Google
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="mt-8">
                {requestsLoading ? (
                  <Card className="bg-white shadow-lg">
                    <CardContent className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading your requests...</p>
                    </CardContent>
                  </Card>
                ) : userRequests.length === 0 ? (
                  <Card className="bg-white shadow-lg">
                    <CardContent className="text-center py-12">
                      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Requests Yet</h3>
                      <p className="text-gray-600 mb-4">You haven't submitted any concierge requests yet.</p>
                      <Button onClick={() => setActiveTab("request")}>
                        Submit Your First Request
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {userRequests.map((request: ConciergeRequest) => (
                      <Card key={request.id} className="bg-white shadow-lg">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">Request #{request.id}</CardTitle>
                              <CardDescription>
                                Submitted on {new Date(request.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            {getStatusBadge(request.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-sm font-semibold">Budget Range</Label>
                              <p className="text-gray-700">{request.budgetRange}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold">Vehicle Type</Label>
                              <p className="text-gray-700">{request.vehicleType}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold">Timeline</Label>
                              <p className="text-gray-700">{request.timeline}</p>
                            </div>
                          </div>
                          {request.assignedAdvisor && (
                            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-600" />
                                <span className="font-semibold text-purple-800">
                                  Assigned Advisor: {request.assignedAdvisor}
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Authentication Dialog for Unauthenticated Users */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to submit your concierge request. Already have the details filled? 
              You can also submit without creating an account by providing your email.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Option 1: Login/Register */}
            <div className="space-y-3">
              <AuthForms />
            </div>
            
            {/* Option 2: Submit without account */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue without account</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="guest-email">Email Address *</Label>
                <Input
                  id="guest-email"
                  type="email"
                  placeholder="your@email.com"
                  value={requestForm.contactEmail}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                />
              </div>
              <Button 
                onClick={() => {
                  handleUnauthenticatedSubmit();
                  setShowAuthDialog(false);
                }}
                disabled={createRequestMutation.isPending}
                className="w-full"
              >
                {createRequestMutation.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}