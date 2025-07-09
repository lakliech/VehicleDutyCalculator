import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Users,
  Shield
} from "lucide-react";

export default function Home() {
  const featuredTools = [
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
    }
  ];

  const allTools = [
    {
      href: "/service-estimator",
      title: "Service Estimates", 
      description: "Estimate maintenance costs",
      icon: <Wrench className="h-6 w-6" />
    },
    {
      href: "/transfer-cost",
      title: "Transfer Cost",
      description: "Calculate ownership transfer fees", 
      icon: <FileText className="h-6 w-6" />
    },
    {
      href: "/sell-my-car",
      title: "Sell My Car",
      description: "List and sell your vehicle",
      icon: <ShoppingCart className="h-6 w-6" />
    },
    {
      href: "/vehicle-loans",
      title: "Vehicle Loan Products",
      description: "Explore financing options",
      icon: <CreditCard className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
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



      {/* Featured Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Tools</h2>
          <p className="text-lg text-gray-600">Most used automotive calculators and tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredTools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-purple-300">
                <CardHeader className="text-center">
                  <div className={`${tool.color} text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  {tool.featured && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
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

        {/* All Tools Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Tools & Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allTools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-600 group-hover:text-purple-700">
                        {tool.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-700">
                          {tool.title}
                        </h4>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Platform?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">KRA Official Rates</h4>
              <p className="text-gray-600">All calculations use current Kenya Revenue Authority official rates and formulas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
              <p className="text-gray-600">Professional car import and valuation services with personal assistance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Tools</h4>
              <p className="text-gray-600">Complete suite of automotive tools for all your vehicle-related needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}