import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FloatingAd } from "@/components/floating-ad";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Calculator, 
  Search, 
  ShoppingCart, 
  Brain,
  Car,
  Banknote,
  FileText,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Shield,
  Sparkles,
  Star
} from "lucide-react";

// Enhanced tool structure with extra visibility features
const FEATURED_TOOLS = [
  {
    href: "/buy-a-car",
    title: "Find Cars",
    description: "Browse thousands of verified vehicles with smart search",
    icon: Search,
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    badge: "Most Popular",
    badgeColor: "bg-blue-500"
  },
  {
    href: "/sell-my-car", 
    title: "Sell Vehicle",
    description: "List your car with professional photos & analytics",
    icon: ShoppingCart,
    gradient: "from-green-500 via-green-600 to-green-700",
    badge: "Easy Setup",
    badgeColor: "bg-green-500"
  },
  {
    href: "/duty-calculator",
    title: "Import Duty",
    description: "Calculate KRA import taxes with official rates",
    icon: Calculator,
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    badge: "Verified",
    badgeColor: "bg-purple-500"
  },
  {
    href: "/ai-advisor",
    title: "AI Advisor", 
    description: "Get personalized recommendations powered by AI",
    icon: Brain,
    gradient: "from-orange-500 via-orange-600 to-orange-700",
    badge: "AI Powered",
    badgeColor: "bg-orange-500"
  }
];

const PROFESSIONAL_TOOLS = [
  { 
    href: "/importation-estimator", 
    title: "Import Calculator", 
    description: "Complete import cost estimation",
    icon: Car,
    color: "text-blue-600"
  },
  { 
    href: "/mycars-worth", 
    title: "Vehicle Valuation", 
    description: "Professional car appraisal",
    icon: Banknote,
    color: "text-green-600"
  },
  { 
    href: "/transfer-cost", 
    title: "Transfer Calculator", 
    description: "Ownership transfer costs",
    icon: FileText,
    color: "text-purple-600"
  },
  { 
    href: "/vehicle-loans", 
    title: "Vehicle Financing", 
    description: "Loan products from 15+ banks",
    icon: CreditCard,
    color: "text-red-600"
  },
  { 
    href: "/price-trends", 
    title: "Market Analytics", 
    description: "Price trends & market insights",
    icon: TrendingUp,
    color: "text-indigo-600"
  },
  { 
    href: "/mileage-verification", 
    title: "Mileage Verification", 
    description: "Chassis number verification",
    icon: Shield,
    color: "text-cyan-600"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSmartSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await apiRequest('POST', '/api/smart-search-parse', { 
        query: searchQuery.trim() 
      });
      const data = await response.json();
      
      const { filters: aiFilters, explanation } = data;
      
      // Create URL parameters for the extracted filters
      const params = new URLSearchParams();
      
      if (aiFilters.maxPrice) params.set('maxPrice', aiFilters.maxPrice.toString());
      if (aiFilters.minPrice) params.set('minPrice', aiFilters.minPrice.toString());
      if (aiFilters.make?.length > 0) params.set('make', aiFilters.make.join(','));
      if (aiFilters.model?.length > 0) params.set('model', aiFilters.model.join(','));
      if (aiFilters.fuelType?.length > 0) params.set('fuelType', aiFilters.fuelType.join(','));
      if (aiFilters.transmission?.length > 0) params.set('transmission', aiFilters.transmission.join(','));
      if (aiFilters.bodyType?.length > 0) params.set('bodyType', aiFilters.bodyType.join(','));
      if (aiFilters.minYear) params.set('minYear', aiFilters.minYear.toString());
      if (aiFilters.maxYear) params.set('maxYear', aiFilters.maxYear.toString());
      
      // Clear search field and navigate to buy-a-car with filters
      setSearchQuery("");
      
      toast({
        title: "Smart Search Applied",
        description: explanation || "Filters extracted and applied successfully",
      });
      
      // Navigate to buy-a-car page with the smart search parameters
      setLocation(`/buy-a-car?${params.toString()}`);
      
    } catch (error) {
      console.error('Smart search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to process your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSmartSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-600 mr-3" />
            <Badge className="bg-purple-100 text-purple-700 px-4 py-1">
              Kenya's #1 Car Platform
            </Badge>
          </div>
          
          <h1 className="font-bold text-gray-900 mb-6 tracking-tight text-[52px]">
            Your Complete
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Automotive Hub
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Everything you need to buy, sell, import, and manage vehicles in Kenya. 
            Professional tools trusted by thousands of car enthusiasts.
          </p>
          
          {/* Enhanced Quick Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative bg-white rounded-2xl shadow-xl p-2 border-2 border-purple-100">
              <Input 
                placeholder="Try: 'Toyota Vitz under 1M' or 'Honda CRV automatic 2018'"
                className="h-16 pl-6 pr-20 text-lg border-0 rounded-xl focus:ring-0 focus:outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isSearching}
              />
              <Button 
                size="lg"
                onClick={handleSmartSearch}
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              <strong>Smart AI Search:</strong> "budget 800k suzuki" • "honda crv automatic" • "subaru forester 2018"
            </p>
          </div>
        </div>
      </section>
      {/* Featured Tools - Extra Large Visibility */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Automotive Tools
            </h2>
            <p className="text-lg text-gray-600">
              Industry-leading tools designed specifically for the Kenyan automotive market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {FEATURED_TOOLS.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <Card className="group cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-white overflow-hidden relative">
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className={`${tool.badgeColor} text-white text-xs px-2 py-1`}>
                        {tool.badge}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-8 text-center relative">
                      {/* Gradient Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                          {tool.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                          {tool.description}
                        </p>
                        
                        <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 font-semibold">
                          <span>Start Now</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Professional Tools - Enhanced Grid */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 pt-[8px] pb-[8px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Specialized Tools & Services
            </h2>
            <p className="text-lg text-gray-600">
              Advanced calculators and verification tools for automotive professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFESSIONAL_TOOLS.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <Card className="group cursor-pointer border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 h-full bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300`}>
                          <IconComponent className={`h-6 w-6 ${tool.color} group-hover:text-purple-600 transition-colors duration-300`} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {tool.description}
                          </p>
                          
                          <div className="flex items-center mt-4 text-purple-600 group-hover:text-purple-700">
                            <span className="text-sm font-medium">Learn More</span>
                            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Trusted by Kenya's Automotive Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">3,500+</div>
              <div className="text-gray-600 font-medium">Vehicles Listed</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-gray-600 font-medium">Partner Banks</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-gray-600 font-medium">Accuracy Rate</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <Star className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
            
            <h3 className="text-3xl font-bold text-white mb-6">
              Professional Vehicle Import Services
            </h3>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Expert assistance for importing vehicles from Japan, UK, South Africa, Dubai, Australia, Singapore, and Thailand
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-xl"
              >
                📞 Call 0736 272719
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 text-lg rounded-xl bg-[#533e94]"
              >
                Get Free Quote
              </Button>
            </div>
            
            <p className="text-purple-200 text-sm mt-6">
              Professional guidance • Competitive rates • Trusted by thousands
            </p>
          </div>
        </div>
      </section>
      {/* Floating Ads */}
      <FloatingAd />
    </div>
  );
}