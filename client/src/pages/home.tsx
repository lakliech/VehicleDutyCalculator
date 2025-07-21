import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  Shield
} from "lucide-react";

// Simplified tool structure for minimalist design
const PRIMARY_TOOLS = [
  {
    href: "/buy-a-car",
    title: "Find Cars",
    description: "Browse thousands of verified vehicles",
    icon: Search,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    href: "/sell-my-car", 
    title: "Sell Vehicle",
    description: "List your car with professional photos",
    icon: ShoppingCart,
    gradient: "from-green-500 to-green-600"
  },
  {
    href: "/duty-calculator",
    title: "Import Duty",
    description: "Calculate KRA import taxes instantly",
    icon: Calculator,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    href: "/ai-advisor",
    title: "AI Advisor", 
    description: "Get personalized vehicle recommendations",
    icon: Brain,
    gradient: "from-orange-500 to-orange-600"
  }
];

const SECONDARY_TOOLS = [
  { href: "/importation-estimator", title: "Import Cost", icon: Car },
  { href: "/mycars-worth", title: "Car Value", icon: Banknote },
  { href: "/transfer-cost", title: "Transfer", icon: FileText },
  { href: "/vehicle-loans", title: "Financing", icon: CreditCard },
  { href: "/price-trends", title: "Trends", icon: TrendingUp },
  { href: "/mileage-verification", title: "Verify", icon: Shield }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Ultra Clean */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Kenya's Modern
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Car Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Buy, sell, and manage vehicles with intelligent tools designed for the Kenyan market
          </p>
          
          {/* Quick Search Bar */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="relative">
              <Input 
                placeholder="Search cars: 'Toyota Vitz under 1M' or 'Honda CRV automatic'"
                className="h-14 pl-5 pr-14 text-lg border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none"
              />
              <Button 
                size="sm"
                className="absolute right-2 top-2 bottom-2 px-6 bg-purple-600 hover:bg-purple-700 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Try: "budget 800k" or "Subaru Forester 2018"
            </p>
          </div>
        </div>
      </section>

      {/* Primary Tools - Clean Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRIMARY_TOOLS.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-center mt-4 text-purple-600 group-hover:text-purple-700">
                        <span className="text-sm font-medium">Get Started</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secondary Tools - Minimal Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Additional Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECONDARY_TOOLS.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <Card className="group cursor-pointer border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 h-24">
                    <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                      <div className="w-8 h-8 mb-2 text-gray-600 group-hover:text-purple-600 transition-colors duration-200">
                        <IconComponent className="h-full w-full" />
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                        {tool.title}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Clean */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3,500+</div>
              <div className="text-gray-600">Vehicles Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Partner Banks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA - Minimal */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Need Help Importing a Vehicle?
            </h3>
            <p className="text-purple-100 mb-6">
              Professional import services from Japan, UK, South Africa, Dubai, and more
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8"
            >
              Call 0736 272719
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}