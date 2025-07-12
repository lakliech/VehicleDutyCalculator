import { useState } from "react";
import { ModuleNavigation } from "@/components/module-navigation";
import { ListingWizard } from "@/components/listing-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { 
  Car, Plus, TrendingUp, Users, Shield, Star,
  CheckCircle, ArrowRight, Phone, MessageSquare, MapPin, Camera
} from "lucide-react";

export default function SellMyCar() {
  const [showWizard, setShowWizard] = useState(false);
  const [listingSuccess, setListingSuccess] = useState(false);
  const [completedListingId, setCompletedListingId] = useState<number | null>(null);
  const { user, isLoading } = useAuth();

  const handleStartListing = () => {
    if (!user) {
      const currentUrl = window.location.pathname + window.location.search;
      window.location.href = `/api/auth/google?returnUrl=${encodeURIComponent(currentUrl)}`;
      return;
    }
    setShowWizard(true);
  };

  const handleListingComplete = (listingId: number) => {
    setShowWizard(false);
    setListingSuccess(true);
    setCompletedListingId(listingId);
  };

  const handleWizardCancel = () => {
    setShowWizard(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
        <ModuleNavigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (showWizard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
        <ModuleNavigation />
        <div className="container mx-auto px-4 py-8">
          <ListingWizard 
            onComplete={handleListingComplete}
            onCancel={handleWizardCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Success Message */}
          {listingSuccess && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Listing Created Successfully!</h3>
                    <p className="text-green-700">Your car listing #{completedListingId} has been submitted and is pending approval.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Sell Your Car
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              List your vehicle on Kenya's premier car marketplace. Reach thousands of verified buyers 
              and get the best price for your car with our easy 5-step process.
            </p>
            
            {/* Main CTA Button */}
            <Button
              onClick={handleStartListing}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="mr-3 h-6 w-6" />
              Start Selling Your Car
            </Button>
            
            {!user && (
              <p className="text-sm text-gray-500 mt-2">
                Sign in with Google to get started
              </p>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy 5-Step Process</h3>
              <p className="text-gray-600 text-sm">
                Simple wizard guides you through vehicle details, photos, and pricing
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Buyers</h3>
              <p className="text-gray-600 text-sm">
                Connect with serious, verified buyers looking for quality vehicles
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Market Price</h3>
              <p className="text-gray-600 text-sm">
                AI-powered pricing suggestions help you set competitive prices
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">
                All listings are reviewed and buyer communications are protected
              </p>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mb-12 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900">How It Works</CardTitle>
              <p className="text-gray-600 mt-2">Get your car listed in just 5 simple steps</p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  {
                    step: 1,
                    title: "Vehicle Details",
                    description: "Enter your car's make, model, year, and basic specifications",
                    icon: Car,
                    color: "bg-purple-500"
                  },
                  {
                    step: 2,
                    title: "Location & Condition",
                    description: "Tell us where your car is and its current condition",
                    icon: MapPin,
                    color: "bg-blue-500"
                  },
                  {
                    step: 3,
                    title: "Photos & Video",
                    description: "Upload 3-10 high-quality photos of your vehicle",
                    icon: Camera,
                    color: "bg-green-500"
                  },
                  {
                    step: 4,
                    title: "Set Your Price",
                    description: "Set a competitive asking price with optional negotiations",
                    icon: TrendingUp,
                    color: "bg-orange-500"
                  },
                  {
                    step: 5,
                    title: "Contact Info",
                    description: "Add your contact details for interested buyers",
                    icon: Phone,
                    color: "bg-pink-500"
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-500">Step {item.step}</span>
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Sell With Us?</h3>
              <div className="space-y-4">
                {[
                  "Reach thousands of verified buyers across Kenya",
                  "Professional listing photos and descriptions",
                  "Secure buyer-seller communication platform",
                  "AI-powered pricing recommendations",
                  "Mobile-optimized for 95% of our users",
                  "Dedicated customer support team"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 shadow-xl bg-gradient-to-br from-cyan-50 to-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Seller Support</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-gray-600 text-sm">Call us at 0736 272719 for listing assistance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp Support</h4>
                    <p className="text-gray-600 text-sm">Get instant help via WhatsApp messaging</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Premium Features</h4>
                    <p className="text-gray-600 text-sm">Boost your listing for faster sales</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => window.open('https://wa.me/254736272719?text=Hi%2C%20I%20need%20help%20selling%20my%20car', '_blank')}
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Get Help via WhatsApp
              </Button>
            </Card>
          </div>

          {/* Final CTA */}
          <Card className="text-center p-12 shadow-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Car?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied sellers who found buyers through our platform
            </p>
            <Button
              onClick={handleStartListing}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Create Your Listing Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}