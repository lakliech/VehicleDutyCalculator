import { Link } from "wouter";
import { useEffect, useMemo } from "react";
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
  Phone,
  TrendingUp,
  Shield,
  CheckCircle,
  MessageCircle
} from "lucide-react";

// Tool configuration - extracted for better maintainability
const AUTOMOTIVE_TOOLS = [
  {
    href: "/duty-calculator",
    title: "Duty Calculator",
    description: "Calculate Kenya import duties and taxes with KRA official rates",
    icon: Calculator,
    color: "from-gray-600 to-gray-700",
    category: "calculation",
    featured: true
  },
  {
    href: "/importation-estimator", 
    title: "Import Calculator",
    description: "Estimate total vehicle importation costs",
    icon: Car,
    color: "from-gray-500 to-gray-600",
    category: "calculation"
  },
  {
    href: "/mycars-worth",
    title: "MyCar's Worth",
    description: "Get current market value of your vehicle",
    icon: DollarSign,
    color: "from-gray-600 to-gray-700",
    category: "valuation"
  },
  {
    href: "/service-estimator",
    title: "Service Estimates", 
    description: "Estimate maintenance costs",
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    category: "maintenance"
  },
  {
    href: "/transfer-cost",
    title: "Transfer Cost",
    description: "Calculate ownership transfer fees", 
    icon: FileText,
    color: "from-gray-600 to-gray-700",
    category: "legal"
  },
  {
    href: "/buy-a-car",
    title: "Buy a Car",
    description: "Browse and buy quality vehicles",
    icon: Search,
    color: "from-gray-500 to-gray-600",
    category: "marketplace"
  },
  {
    href: "/sell-my-car",
    title: "Sell My Car",
    description: "List and sell your vehicle",
    icon: ShoppingCart,
    color: "from-gray-600 to-gray-700",
    category: "marketplace"
  },
  {
    href: "/vehicle-loans",
    title: "Vehicle Loan Products",
    description: "Explore financing options",
    icon: CreditCard,
    color: "from-gray-500 to-gray-600",
    category: "finance"
  },
  {
    href: "/ai-advisor",
    title: "AI Vehicle Advisor",
    description: "Get personalized vehicle recommendations using AI",
    icon: MessageCircle,
    color: "from-purple-600 to-purple-700",
    category: "ai",
    featured: true
  },
  {
    href: "/price-trends",
    title: "Price Trend Heatmap",
    description: "Interactive visualization of vehicle pricing trends with color-coded market insights",
    icon: TrendingUp,
    color: "from-purple-600 to-purple-700",
    category: "analytics",
    featured: true
  }
];

// Quick stats/features data
const PLATFORM_FEATURES = [
  {
    icon: Calculator,
    title: "Official KRA Rates",
    description: "Up-to-date government rates and calculations"
  },
  {
    icon: Shield,
    title: "Trusted Platform",
    description: "Secure transactions and verified listings"
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Real-time pricing and market trends"
  },
  {
    icon: Phone,
    title: "Expert Support",
    description: "Professional assistance when you need it"
  }
];

// Tool card component for better reusability
const ToolCard = ({ tool }: { tool: typeof AUTOMOTIVE_TOOLS[0] }) => {
  const IconComponent = tool.icon;
  
  return (
    <Link href={tool.href}>
      <Card className="group h-full bg-white hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className={`bg-gradient-to-br ${tool.color} text-white rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform`}>
            <IconComponent className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
              {tool.title}
            </CardTitle>
            {tool.featured && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-center text-gray-600 mb-4 text-sm leading-relaxed">
            {tool.description}
          </CardDescription>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-all">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

// Feature highlight component
const FeatureHighlight = ({ feature }: { feature: typeof PLATFORM_FEATURES[0] }) => {
  const IconComponent = feature.icon;
  
  return (
    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-700/50 backdrop-blur-sm">
      <div className="bg-gray-600/50 rounded-lg p-2">
        <IconComponent className="h-6 w-6 text-gray-300" />
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
        <p className="text-gray-400 text-sm">{feature.description}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const { toast } = useToast();
  const { user } = useAuth();

  // Handle OAuth success/error messages - preserved existing logic
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

  // Memoize tools for performance
  const toolsByCategory = useMemo(() => {
    return AUTOMOTIVE_TOOLS.reduce((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, typeof AUTOMOTIVE_TOOLS>);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Kenya's Complete
                <span className="block text-gray-300">
                  Car Marketplace
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                Everything you need for buying, selling, importing, and maintaining vehicles in Kenya. 
                Professional tools with official government rates.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/duty-calculator">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                    Calculate Import Duties
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/mycars-worth">
                  <Button size="lg" variant="outline" className="border-2 border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-700 text-lg px-8 py-4">
                    Check Car Value
                  </Button>
                </Link>
              </div>

              {/* User Welcome */}
              {user && (
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 inline-flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-300">Welcome back, {user.firstName || 'User'}!</span>
                </div>
              )}
            </div>

            {/* Platform Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-center lg:text-left mb-6">Why Choose Gariyangu?</h2>
              <div className="grid gap-4">
                {PLATFORM_FEATURES.map((feature, index) => (
                  <FeatureHighlight key={index} feature={feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Automotive Tools & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital tools designed for the Kenyan automotive market. 
            From imports to sales, we've got you covered.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {AUTOMOTIVE_TOOLS.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-20 bg-gray-100 border border-gray-200 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">Need Professional Help?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team specializes in vehicle imports from Japan, UK, South Africa, Dubai, Australia, Singapore, and Thailand.
          </p>
          <Button 
            size="lg" 
            className="bg-gray-800 text-white hover:bg-gray-900 text-lg px-8 py-4"
            onClick={() => window.open('https://wa.me/254736272719?text=Hi, I need help with car import services', '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Us on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}