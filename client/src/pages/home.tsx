import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { useQuery } from "@tanstack/react-query";
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
  MessageCircle,
  Brain
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
    href: "/smart-pricing",
    title: "Smart Pricing",
    icon: Brain
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
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Fetch vehicle makes
  const { data: makes } = useQuery({
    queryKey: ['/api/car-listing-filters'],
    select: (data: any) => data.makes || []
  });

  // Fetch models based on selected make
  const { data: models } = useQuery({
    queryKey: ['/api/car-listing-filters', selectedMake],
    enabled: !!selectedMake && selectedMake !== "any",
    select: (data: any) => data.models || []
  });

  const handleSearch = () => {
    // Build query params for the Buy A Car page
    const params = new URLSearchParams();
    if (selectedMake && selectedMake !== "any") params.append('make', selectedMake);
    if (selectedModel && selectedModel !== "any") params.append('model', selectedModel);
    if (selectedPriceRange && selectedPriceRange !== "any") params.append('priceRange', selectedPriceRange);
    if (selectedYear && selectedYear !== "any") params.append('year', selectedYear);
    if (selectedFuelType && selectedFuelType !== "any") params.append('fuelType', selectedFuelType);
    
    // Navigate to buy-a-car with filters
    window.location.href = `/buy-a-car${params.toString() ? '?' + params.toString() : ''}`;
  };

  // OAuth handling is now done globally in App.tsx via useAuthRedirect

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Side - Smart Vehicle Filter */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 border border-purple-200 rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Search className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Smart Car Finder</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make</label>
                    <Select value={selectedMake} onValueChange={(value) => {
                      setSelectedMake(value);
                      setSelectedModel("any"); // Reset model when make changes
                    }}>
                      <SelectTrigger className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any make</SelectItem>
                        {makes?.map((make: string) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <Select 
                      value={selectedModel} 
                      onValueChange={setSelectedModel}
                      disabled={!selectedMake || selectedMake === "any"}
                    >
                      <SelectTrigger className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any model</SelectItem>
                        {models?.map((model: string) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any budget</SelectItem>
                        <SelectItem value="0-500000">Under KES 500K</SelectItem>
                        <SelectItem value="500000-1000000">KES 500K - 1M</SelectItem>
                        <SelectItem value="1000000-2000000">KES 1M - 2M</SelectItem>
                        <SelectItem value="2000000-3000000">KES 2M - 3M</SelectItem>
                        <SelectItem value="3000000-5000000">KES 3M - 5M</SelectItem>
                        <SelectItem value="5000000-">Above KES 5M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Advanced filters toggle */}
                  <div className="text-center">
                    <button
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                    </button>
                  </div>
                  
                  {showAdvancedFilters && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="border-purple-200 focus:border-purple-500">
                            <SelectValue placeholder="Any year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any year</SelectItem>
                            <SelectItem value="2020-">2020 & newer</SelectItem>
                            <SelectItem value="2015-2019">2015-2019</SelectItem>
                            <SelectItem value="2010-2014">2010-2014</SelectItem>
                            <SelectItem value="2005-2009">2005-2009</SelectItem>
                            <SelectItem value="-2004">Before 2005</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel</label>
                        <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                          <SelectTrigger className="border-purple-200 focus:border-purple-500">
                            <SelectValue placeholder="Any fuel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any fuel</SelectItem>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSearch}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Find Perfect Car
                    </Button>
                    {(selectedMake || selectedModel || selectedPriceRange || selectedYear || selectedFuelType) && (
                      <Button 
                        onClick={() => {
                          setSelectedMake("");
                          setSelectedModel("");
                          setSelectedPriceRange("");
                          setSelectedYear("");
                          setSelectedFuelType("");
                        }}
                        variant="outline"
                        className="px-3 py-3 border-purple-200 hover:bg-purple-50"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  
                  {/* Active filters display */}
                  {(selectedMake || selectedModel || selectedPriceRange || selectedYear || selectedFuelType) && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        {[selectedMake, selectedModel, selectedPriceRange, selectedYear, selectedFuelType].filter(Boolean).length} filter(s) applied
                      </p>
                    </div>
                  )}
                  
                  {/* Smart suggestions */}
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-xs text-gray-600 mb-2">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => {
                          setSelectedMake("Toyota");
                          setSelectedPriceRange("500000-1000000");
                          setSelectedYear("2015-2019");
                          setSelectedFuelType("petrol");
                        }}
                        className="px-2 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        Toyota Petrol 2015-2019
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedMake("Nissan");
                          setSelectedPriceRange("1000000-2000000");
                          setSelectedYear("2010-2014");
                          setSelectedFuelType("petrol");
                        }}
                        className="px-2 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        Nissan 1M-2M
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedMake("Subaru");
                          setSelectedPriceRange("2000000-3000000");
                          setSelectedYear("2015-2019");
                          setSelectedFuelType("petrol");
                        }}
                        className="px-2 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        Subaru AWD
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedFuelType("hybrid");
                          setSelectedPriceRange("2000000-3000000");
                          setSelectedYear("2015-2019");
                        }}
                        className="px-2 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        Hybrid Cars
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedPriceRange("0-500000");
                          setSelectedYear("2010-2014");
                        }}
                        className="px-2 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        Budget Cars
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Popular Tools */}
            <div className="lg:col-span-2">
              {user && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 mb-6 inline-block">
                  <span className="text-purple-700 text-sm">Welcome back, {user.firstName || 'User'}!</span>
                </div>
              )}
              
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Popular Tools
              </h2>
              
              {/* Core Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CORE_TOOLS.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Additional Tools Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-base font-semibold text-gray-700 mb-4 text-center">
          Additional Services
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ADDITIONAL_TOOLS.map((tool) => (
            <ToolCard key={tool.href} tool={tool} size="small" />
          ))}
        </div>
      </section>
      {/* Simple Contact Section */}
      <section className="bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h3 className="text-xl font-bold mb-3">Need Help Importing?</h3>
          <p className="text-purple-100 mb-4 max-w-2xl mx-auto text-sm">
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