import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Users, 
  Award, 
  X, 
  ChevronUp,
  Play,
  ShoppingCart,
  Star
} from "lucide-react";

export function SocialCommerceFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [location] = useLocation();

  // Hide FAB on certain pages
  const shouldHideFAB = location.startsWith('/admin') || 
                       location.startsWith('/live-streaming') ||
                       location.startsWith('/group-buying') ||
                       location.startsWith('/influencer-hub');

  if (shouldHideFAB) {
    return null;
  }

  const socialTools = [
    {
      href: "/live-streaming",
      title: "Live Streaming",
      description: "Watch live vehicle demos & interact with sellers",
      icon: Video,
      color: "text-red-600",
      bgColor: "bg-red-100",
      hoverColor: "hover:bg-red-200"
    },
    {
      href: "/group-buying",
      title: "Group Buying", 
      description: "Join group purchases for bulk discounts",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    },
    {
      href: "/influencer-hub",
      title: "Influencer Hub",
      description: "Expert reviews & trusted recommendations", 
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-200"
    }
  ];

  return (
    <div className="fixed bottom-6 right-20 md:right-24 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Menu Card */}
          <Card className="relative mb-4 w-80 shadow-2xl border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">Social Commerce</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Connect, collaborate, and discover vehicles through interactive features
              </p>
              
              <div className="space-y-3">
                {socialTools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Link key={tool.href} href={tool.href}>
                      <div 
                        className={`flex items-center p-3 rounded-lg ${tool.bgColor} ${tool.hoverColor} transition-colors cursor-pointer group`}
                        onClick={() => setIsExpanded(false)}
                      >
                        <div className="flex-shrink-0 mr-3">
                          <IconComponent className={`h-5 w-5 ${tool.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-gray-700">
                            {tool.title}
                          </h4>
                          <p className="text-xs text-gray-600 group-hover:text-gray-500">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    Live Now
                  </div>
                  <div className="flex items-center">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Group Deals
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-500" />
                    Trusted Reviews
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {/* FAB Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 border-0 relative overflow-hidden group"
      >
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-ping opacity-20"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-white mb-0.5" />
              <ChevronUp className="h-3 w-3 text-white animate-bounce" />
            </div>
          )}
        </div>
        
        {/* Notification Dot */}
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </Button>
    </div>
  );
}