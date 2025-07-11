import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Clock, Filter, MapPin, Star, Shield, CheckCircle } from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";

export default function BuyACar() {
  const featuredCars = [
    {
      make: "Toyota",
      model: "Harrier",
      year: 2018,
      price: "KES 3,200,000",
      mileage: "45,000 km",
      location: "Nairobi",
      image: "🚗",
      features: ["Sunroof", "Leather Seats", "Navigation"]
    },
    {
      make: "Nissan",
      model: "X-Trail",
      year: 2019,
      price: "KES 2,800,000",
      mileage: "38,000 km", 
      location: "Mombasa",
      image: "🚙",
      features: ["4WD", "Reverse Camera", "Alloy Wheels"]
    },
    {
      make: "Subaru",
      model: "Forester",
      year: 2017,
      price: "KES 2,500,000",
      mileage: "52,000 km",
      location: "Kisumu",
      image: "🚐",
      features: ["AWD", "Bluetooth", "Cruise Control"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buy a Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover quality pre-owned and new vehicles from trusted dealers and individuals 
            across Kenya. Find your perfect car with comprehensive search and verification tools.
          </p>
          <Badge variant="secondary" className="mt-4 bg-orange-100 text-orange-800">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Search Cars
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Cars */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{car.image}</span>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{car.make} {car.model}</CardTitle>
                      <CardDescription>{car.year} • {car.mileage}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-purple-600">{car.price}</span>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {car.location}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {car.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🏎️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Sedans</h3>
              <p className="text-sm text-gray-600">Comfortable family cars</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🚙</div>
              <h3 className="font-semibold text-gray-900 mb-1">SUVs</h3>
              <p className="text-sm text-gray-600">Versatile utility vehicles</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Hatchbacks</h3>
              <p className="text-sm text-gray-600">Compact city cars</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🚐</div>
              <h3 className="font-semibold text-gray-900 mb-1">Vans</h3>
              <p className="text-sm text-gray-600">Commercial vehicles</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Buy Through Our Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Verified Listings</h4>
              <p className="text-gray-600">All vehicles undergo thorough verification and inspection processes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-gray-600">Comprehensive vehicle history reports and condition assessments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Deals</h4>
              <p className="text-gray-600">Competitive pricing with price comparison and negotiation tools</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Find Your Perfect Car Today
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Browse thousands of quality vehicles from trusted dealers and private sellers. 
            Get financing options, trade-in valuations, and comprehensive support throughout your purchase journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-6">
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-purple-200 text-sm">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-purple-200 text-sm">Verified Dealers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-purple-200 text-sm">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-purple-200 text-sm">Support Available</div>
            </div>
          </div>
          <div className="text-purple-200 text-sm">
            Expected Launch: Q2 2025 • Contact: 0736 272719
          </div>
        </div>
      </div>
    </div>
  );
}