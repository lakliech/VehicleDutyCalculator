import { Link } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { 
  Calculator, 
  Car, 
  Wrench, 
  DollarSign, 
  FileText, 
  ShoppingCart, 
  CreditCard,
  ArrowRight,
  Star,
  Search,
  Shield,
  Users
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Handle OAuth success/error messages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const social = urlParams.get('social');
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (social === 'google' && success === 'true') {
      toast({
        title: "Login Successful",
        description: "You have been logged in with Google successfully!",
      });
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error === 'auth_failed') {
      toast({
        title: "Authentication Failed",
        description: "Google authentication failed. Please try again.",
        variant: "destructive",
      });
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  const allTools = [
    {
      href: "/duty-calculator",
      title: "Duty Calculator",
      description: "Calculate Kenya import duties and taxes with KRA official rates",
      icon: <Calculator className="h-12 w-12" />,
      color: "bg-purple-500",
      featured: true
    },
    {
      href: "/importation-estimator", 
      title: "Import Calculator",
      description: "Estimate total vehicle importation costs",
      icon: <Car className="h-12 w-12" />,
      color: "bg-blue-500"
    },
    {
      href: "/mycars-worth",
      title: "MyCar's Worth",
      description: "Get current market value of your vehicle",
      icon: <DollarSign className="h-12 w-12" />,
      color: "bg-green-500"
    },
    {
      href: "/service-estimator",
      title: "Service Estimates", 
      description: "Estimate maintenance costs",
      icon: <Wrench className="h-12 w-12" />,
      color: "bg-orange-500"
    },
    {
      href: "/transfer-cost",
      title: "Transfer Cost",
      description: "Calculate ownership transfer fees", 
      icon: <FileText className="h-12 w-12" />,
      color: "bg-cyan-500"
    },
    {
      href: "/buy-a-car",
      title: "Buy a Car",
      description: "Browse and buy quality vehicles",
      icon: <Search className="h-12 w-12" />,
      color: "bg-indigo-500"
    },
    {
      href: "/sell-my-car",
      title: "Sell My Car",
      description: "List and sell your vehicle",
      icon: <ShoppingCart className="h-12 w-12" />,
      color: "bg-pink-500"
    },
    {
      href: "/vehicle-loans",
      title: "Vehicle Loan Products",
      description: "Explore financing options",
      icon: <CreditCard className="h-12 w-12" />,
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-cyan-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">
              Kenya's Complete
              <span className="block text-cyan-200">Car Marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Everything you need for buying, selling, importing, and maintaining vehicles in Kenya. 
              From duty calculations to market valuations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/duty-calculator">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Calculate Import Duties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/mycars-worth">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3">
                  Check Car Value
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* All Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">Automotive Tools & Services</h2>
          <p className="text-lg text-gray-600">Comprehensive tools for all your vehicle needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-purple-300">
                <CardHeader className="text-center">
                  <div className={`${tool.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  {tool.featured && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 mb-4">
                    {tool.description}
                  </CardDescription>
                  <Button className="w-full group-hover:bg-purple-600 transition-colors">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}