import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MessageCircle, 
  Phone, 
  Star, 
  Clock, 
  Shield,
  X,
  ChevronUp,
  Sparkles
} from "lucide-react";

export function ConciergeFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [location] = useLocation();

  // Don't show FAB on admin pages, concierge page, or certain pages where it might interfere
  const shouldHide = location.startsWith('/admin') || 
                     location === '/concierge-service' ||
                     location.includes('/reset-password');

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (shouldHide) {
    return null;
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Card */}
        {isExpanded && (
          <Card className="mb-4 w-80 shadow-2xl border-0 bg-white overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Expert Concierge</h3>
                      <p className="text-xs opacity-90">Professional Car Buying</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20"
                    onClick={() => setIsExpanded(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Service Highlights */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Expert Vehicle Inspection</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Personalized Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>End-to-End Support</span>
                  </div>
                </div>

                {/* Pricing Badge */}
                <div className="flex justify-center">
                  <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Starting from KES 15,000
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link href="/concierge-service">
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg"
                      onClick={() => setIsExpanded(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View All Services
                    </Button>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => {
                        window.open('tel:+254736272719', '_self');
                        setIsExpanded(false);
                      }}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => {
                        window.open('https://wa.me/254736272719?text=Hi, I need help with car buying assistance', '_blank');
                        setIsExpanded(false);
                      }}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">500+</span> Successful Purchases
                  </p>
                  <div className="flex justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main FAB Button */}
        <Button
          onClick={toggleExpanded}
          className={`
            h-14 w-14 rounded-full shadow-2xl transition-all duration-300 border-0
            ${isExpanded 
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rotate-180' 
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:scale-110'
            }
          `}
          size="lg"
        >
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-white" />
          ) : (
            <div className="relative">
              <User className="h-6 w-6 text-white" />
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          )}
        </Button>
      </div>
    </>
  );
}