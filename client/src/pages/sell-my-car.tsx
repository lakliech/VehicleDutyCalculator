import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, Camera, Users, MessageSquare, Shield, CheckCircle, AlertCircle
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { useAuth } from "@/hooks/useAuth";
import { ListingForm, type ListingFormData } from "@/components/listing/listing-form";
import { ImageUpload } from "@/components/listing/image-upload";
import { AuthDialog } from "@/components/listing/auth-dialog";

// Form schemas
interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginForm {
  email: string;
  password: string;
}

export default function SellMyCar() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [watchedPrice, setWatchedPrice] = useState<number>(0);

  // Price indicator query
  const { data: priceIndicator, isLoading: indicatorLoading } = useQuery({
    queryKey: ['/api/price-indicators', watchedPrice, selectedVehicle?.id],
    queryFn: async () => {
      if (!selectedVehicle || !watchedPrice) return null;
      
      const crspValue = selectedVehicle.crspKes || selectedVehicle.crsp2020 || 0;
      if (crspValue === 0) return null;
      
      const percentage = (watchedPrice / crspValue) * 100;
      
      const response = await fetch(`/api/price-indicators/${percentage}`);
      if (!response.ok) return null;
      
      return response.json();
    },
    enabled: !!(selectedVehicle && watchedPrice && watchedPrice > 0),
  });

  // Authentication mutations
  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      return apiRequest("POST", "/api/auth/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Please sign in.",
      });
      setShowRegistrationForm(false);
      setShowLoginForm(true);
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      return apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: () => {
      toast({
        title: "Signed In",
        description: "You have been signed in successfully.",
      });
      setShowLoginForm(false);
      // Refetch auth status instead of reloading
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: (error: any) => {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
    },
  });

  // Listing mutation
  const listingMutation = useMutation({
    mutationFn: async (data: ListingFormData & { images: string[] }) => {
      if (!isAuthenticated) {
        throw new Error("Please sign in to create a listing");
      }
      return apiRequest("POST", "/api/marketplace/listings", data);
    },
    onSuccess: () => {
      toast({
        title: "Listing Created",
        description: "Your car has been listed successfully. We'll review it shortly.",
      });
      setSelectedFeatures([]);
      setUploadedImages([]);
      setMainImageIndex(0);
    },
    onError: (error: any) => {
      console.error("Listing creation error:", error);
      
      const errorMessage = error.response?.data?.details ? 
        error.response.data.details.map((issue: any) => 
          `${issue.path.join('.')}: ${issue.message}`
        ).join(', ') : 
        error.message || "Failed to create listing. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleListingSubmit = async (data: ListingFormData & { images: string[] }) => {
    if (isLoading) {
      toast({
        title: "Loading",
        description: "Checking authentication status...",
      });
      return;
    }
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a listing.",
        variant: "destructive",
      });
      setShowLoginForm(true);
      return;
    }

    listingMutation.mutate(data);
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleImageUpload = (images: string[]) => {
    setUploadedImages(images);
  };

  const handleMainImageSelect = (index: number) => {
    setMainImageIndex(index);
  };

  const handleImageDelete = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    
    if (mainImageIndex === index) {
      setMainImageIndex(0);
    } else if (mainImageIndex > index) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const handleRegistrationSubmit = (data: RegistrationForm) => {
    setIsRegistering(true);
    registrationMutation.mutate(data, {
      onSettled: () => setIsRegistering(false)
    });
  };

  const handleLoginSubmit = (data: LoginForm) => {
    setIsLoggingIn(true);
    loginMutation.mutate(data, {
      onSettled: () => setIsLoggingIn(false)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Sell Your Car</h1>
          <p className="text-lg text-gray-700">List your car and reach thousands of potential buyers</p>
        </div>

        {/* Authentication Warning */}
        {!isAuthenticated && !isLoading && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <p className="text-orange-800">
                  Please{" "}
                  <button
                    className="font-semibold underline hover:text-orange-900"
                    onClick={() => window.location.href = `/api/auth/google?returnTo=${encodeURIComponent(window.location.pathname)}`}
                  >
                    sign in with Google
                  </button>{" "}
                  to create a listing.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Listing</CardTitle>
                <CardDescription>
                  Fill in the details about your vehicle. The more information you provide, the better your chances of selling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Image Upload Section */}
                <div className="mb-8">
                  <ImageUpload
                    uploadedImages={uploadedImages}
                    mainImageIndex={mainImageIndex}
                    onImageUpload={handleImageUpload}
                    onMainImageSelect={handleMainImageSelect}
                    onImageDelete={handleImageDelete}
                  />
                </div>

                {/* Listing Form */}
                <ListingForm
                  onSubmit={handleListingSubmit}
                  isSubmitting={listingMutation.isPending}
                  uploadedImages={uploadedImages}
                  mainImageIndex={mainImageIndex}
                  selectedFeatures={selectedFeatures}
                  onFeatureToggle={handleFeatureToggle}
                  onImageUpload={handleImageUpload}
                  onMainImageSelect={handleMainImageSelect}
                  onImageDelete={handleImageDelete}
                  priceIndicator={priceIndicator}
                  indicatorLoading={indicatorLoading}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-purple-600" />
                  <span>Professional Listing</span>
                </CardTitle>
                <CardDescription>
                  Create attractive listings with professional photos and detailed descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High-quality photo uploads</li>
                  <li>• Detailed specification forms</li>
                  <li>• Condition assessment guide</li>
                  <li>• Price recommendation tool</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Wide Reach</span>
                </CardTitle>
                <CardDescription>
                  Your listing will be visible to thousands of active car buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Featured on our homepage</li>
                  <li>• Searchable by multiple criteria</li>
                  <li>• Social media promotion</li>
                  <li>• Email alerts to interested buyers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>Safe & Secure</span>
                </CardTitle>
                <CardDescription>
                  We verify all listings and protect your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Verified buyer inquiries only</li>
                  <li>• Protected contact information</li>
                  <li>• Secure messaging system</li>
                  <li>• Transaction guidance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Create Listing</h3>
                <p className="text-sm text-gray-600">Fill in your car details and upload photos</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Review & Approve</h3>
                <p className="text-sm text-gray-600">We review your listing for quality</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Inquiries</h3>
                <p className="text-sm text-gray-600">Interested buyers contact you directly</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Close Deal</h3>
                <p className="text-sm text-gray-600">Meet buyers and complete the sale</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auth Dialogs */}
      <AuthDialog
        showRegistration={showRegistrationForm}
        showLogin={showLoginForm}
        onRegistrationClose={() => setShowRegistrationForm(false)}
        onLoginClose={() => setShowLoginForm(false)}
        onRegistrationSubmit={handleRegistrationSubmit}
        onLoginSubmit={handleLoginSubmit}
        isRegistering={isRegistering}
        isLoggingIn={isLoggingIn}
      />
    </div>
  );
}