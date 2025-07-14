import { Link } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Search,
  TrendingUp,
  MessageCircle
} from "lucide-react";

// Core automotive tools - streamlined for simplicity
const CORE_TOOLS = [
  {
    href: "/duty-calculator",
    title: "Duty Calculator",
    description: "Calculate import duties with official KRA rates",
    icon: Calculator
  },
  {
    href: "/buy-a-car",
    title: "Buy a Car",
    description: "Browse and purchase quality vehicles",
    icon: Search
  },
  {
    href: "/sell-my-car",
    title: "Sell My Car",
    description: "List your vehicle for sale",
    icon: ShoppingCart
  },
  {
    href: "/ai-advisor",
    title: "AI Advisor",
    description: "Get smart vehicle recommendations",
    icon: MessageCircle
  }
];

const ADDITIONAL_TOOLS = [
  {
    href: "/importation-estimator",
    title: "Import Calculator",
    icon: Car
  },
  {
    href: "/mycars-worth", 
    title: "Car Valuation",
    icon: DollarSign
  },
  {
    href: "/transfer-cost",
    title: "Transfer Cost",
    icon: FileText
  },
  {
    href: "/price-trends",
    title: "Price Trends",
    icon: TrendingUp
  },
  {
    href: "/vehicle-loans",
    title: "Vehicle Loans",
    icon: CreditCard
  },
  {
    href: "/service-estimator",
    title: "Service Cost",
    icon: Wrench
  }
];

// Simple tool card component with larger icons
const ToolCard = ({ tool, size = "default" }: { tool: any; size?: "default" | "small" }) => {
  const IconComponent = tool.icon;
  const isLarge = size === "default";
  
  return (
    <Link href={tool.href}>
      <Card className={`group cursor-pointer hover:shadow-lg transition-all duration-200 ${isLarge ? 'h-48' : 'h-28'}`}>
        <CardHeader className={`text-center ${isLarge ? 'pb-4 pt-6' : 'p-4'}`}>
          <div className={`bg-purple-100 rounded-lg ${isLarge ? 'w-16 h-16 mb-3' : 'w-12 h-12 mb-2'} flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors duration-200`}>
            <IconComponent className={`${isLarge ? 'h-10 w-10' : 'h-6 w-6'} text-purple-600`} />
          </div>
          <CardTitle className={`${isLarge ? 'text-lg' : 'text-sm'} font-semibold text-gray-900`}>
            {tool.title}
          </CardTitle>
          {isLarge && (
            <p className="text-sm text-gray-600 mt-2">
              {tool.description}
            </p>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
};

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
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error === 'auth_failed') {
      toast({
        title: "Authentication Failed",
        description: "Google authentication failed. Please try again.",
        variant: "destructive",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kenya's Car Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional automotive tools with official government rates. 
            Buy, sell, import, and manage vehicles with confidence.
          </p>
          
          {user && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-8 inline-block">
              <span className="text-purple-700">Welcome back, {user.firstName || 'User'}!</span>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/duty-calculator">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Calculate Import Duties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/buy-a-car">
              <Button size="lg" variant="outline">
                Browse Cars
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Tools Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Popular Tools
        </h2>
        
        {/* Core Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CORE_TOOLS.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>

        {/* Additional Tools */}
        <div className="border-t pt-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Additional Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ADDITIONAL_TOOLS.map((tool) => (
              <ToolCard key={tool.href} tool={tool} size="small" />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Contact Section */}
      <section className="bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Importing?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Professional import services from Japan, UK, Dubai, and more countries.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => window.open('https://wa.me/254736272719?text=Hi, I need help with car import services', '_blank')}
          >
            Contact on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}