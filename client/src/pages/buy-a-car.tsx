import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Shield, 
  CheckCircle, 
  Eye, 
  Heart,
  GitCompare,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Car,
  RotateCcw,
  Smartphone
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { AdvancedSearch } from "@/components/advanced-search";
import { SwipeInterface } from "@/components/swipe-interface";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface CarFilters {
  search: string;
  make: string[];
  model: string[];
  minPrice: number;
  maxPrice: number;
  fuelType: string[];
  transmission: string[];
  bodyType: string[];
  minMileage: number;
  maxMileage: number;
  minYear: number;
  maxYear: number;
  doors: string[];
  color: string[];
  features: string[];
  sortBy: string;
}

interface CarListing {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  location: string;
  condition: string;
  exteriorColor: string;
  doors: number;
  images: string[];
  features: string[];
  isVerified: boolean;
  hasWarranty: boolean;
  hasFreeDelivery: boolean;
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
}

export default function BuyACar() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();

  const [filters, setFilters] = useState<CarFilters>({
    search: '',
    make: [],
    model: [],
    minPrice: 0,
    maxPrice: 10000000,
    fuelType: [],
    transmission: [],
    bodyType: [],
    minMileage: 0,
    maxMileage: 200000,
    minYear: 2000,
    maxYear: new Date().getFullYear(),
    doors: [],
    color: [],
    features: [],
    sortBy: 'recommended'
  });

  // Handle URL parameters from AI Advisor
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const make = urlParams.get('make');
    const model = urlParams.get('model');
    const maxPrice = urlParams.get('maxPrice');
    const engineCapacity = urlParams.get('engineCapacity');
    
    if (make || model || maxPrice) {
      setFilters(prev => ({
        ...prev,
        make: make ? [make] : prev.make,
        model: model ? [model] : prev.model,
        maxPrice: maxPrice ? parseInt(maxPrice) : prev.maxPrice,
        search: `${make || ''} ${model || ''}`.trim()
      }));
      
      // Show toast notification
      toast({
        title: "AI Recommendation Applied",
        description: `Filtered results for ${make} ${model}${maxPrice ? ` under ${parseInt(maxPrice).toLocaleString()} KES` : ''}`,
      });
    }
  }, [toast]);

  // Fetch car listings
  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['/api/car-listings', filters, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '8');
      
      if (filters.search) params.append('search', filters.search);
      if (filters.make.length > 0) params.append('make', filters.make.join(','));
      if (filters.model.length > 0) params.append('model', filters.model.join(','));
      if (filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice < 10000000) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.fuelType.length > 0) params.append('fuelType', filters.fuelType.join(','));
      if (filters.transmission.length > 0) params.append('transmission', filters.transmission.join(','));
      if (filters.bodyType.length > 0) params.append('bodyType', filters.bodyType.join(','));
      if (filters.minMileage > 0) params.append('minMileage', filters.minMileage.toString());
      if (filters.maxMileage < 200000) params.append('maxMileage', filters.maxMileage.toString());
      if (filters.minYear > 2000) params.append('minYear', filters.minYear.toString());
      if (filters.maxYear < new Date().getFullYear()) params.append('maxYear', filters.maxYear.toString());
      if (filters.doors.length > 0) params.append('doors', filters.doors.join(','));
      if (filters.color.length > 0) params.append('color', filters.color.join(','));
      if (filters.features.length > 0) params.append('features', filters.features.join(','));
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const response = await apiRequest('GET', `/api/car-listings?${params.toString()}`);
      return response.json();
    },
  });

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/car-listing-filters'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/car-listing-filters');
      return response.json();
    },
  });

  // Fetch featured listings
  const { data: featuredListings = [], isLoading: featuredLoading } = useQuery({
    queryKey: ['/api/featured-listings'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/featured-listings');
      return response.json();
    },
  });

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof CarFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleAddToFavorites = async (listingId: number) => {
    try {
      await apiRequest('POST', `/api/car-listings/${listingId}/favorite`);
      toast({
        title: "Added to Favorites",
        description: "This car has been saved to your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please login to save cars to your favorites.",
        variant: "destructive",
      });
    }
  };

  const handleAddToComparison = async (listingId: number) => {
    try {
      await apiRequest('POST', `/api/car-listings/${listingId}/compare`);
      toast({
        title: "Added to Comparison",
        description: "This car has been added to your comparison list.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please login to compare cars.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (listingId: number) => {
    window.location.href = `/car-details/${listingId}`;
  };

  const handleCallSeller = (listingId: number) => {
    // Mock phone number for demonstration
    const phoneNumber = "+254712345678";
    toast({
      title: "Calling Seller",
      description: `Initiating call to ${phoneNumber}`,
    });
    
    // In a real implementation, you would:
    // window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppSeller = (listingId: number) => {
    // Mock WhatsApp functionality
    const phoneNumber = "254712345678"; // Remove + for WhatsApp
    const message = encodeURIComponent(`Hi, I'm interested in your car listing (ID: ${listingId}). Is it still available?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    toast({
      title: "Opening WhatsApp",
      description: "Redirecting to WhatsApp chat with seller",
    });
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const FilterSidebar = () => (
    <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" onClick={() => setFilters({
          search: '',
          make: [],
          model: [],
          minPrice: 0,
          maxPrice: 10000000,
          fuelType: [],
          transmission: [],
          bodyType: [],
          minMileage: 0,
          maxMileage: 200000,
          minYear: 2000,
          maxYear: new Date().getFullYear(),
          doors: [],
          color: [],
          features: [],
          sortBy: 'recommended'
        })}>
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Price Range</label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice === 10000000 ? '' : filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value) || 10000000)}
            />
          </div>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={(value) => {
              handleFilterChange('minPrice', value[0]);
              handleFilterChange('maxPrice', value[1]);
            }}
            max={10000000}
            step={50000}
            className="w-full"
          />
        </div>

        {/* Make */}
        <div>
          <label className="text-sm font-medium mb-3 block">Make</label>
          <Select value={filters.make[0] || "all"} onValueChange={(value) => handleFilterChange('make', value === "all" ? [] : [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any make</SelectItem>
              {filterOptions?.makes?.map((make: string) => (
                <SelectItem key={make} value={make}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div>
          <label className="text-sm font-medium mb-3 block">Model</label>
          <Select value={filters.model[0] || "all"} onValueChange={(value) => handleFilterChange('model', value === "all" ? [] : [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Any model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any model</SelectItem>
              {filterOptions?.models?.map((model: string) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Fuel Type</label>
          <Select value={filters.fuelType[0] || "all"} onValueChange={(value) => handleFilterChange('fuelType', value === "all" ? [] : [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Any fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any fuel type</SelectItem>
              {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-sm font-medium mb-3 block">Transmission</label>
          <Select value={filters.transmission[0] || "all"} onValueChange={(value) => handleFilterChange('transmission', value === "all" ? [] : [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Any transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any transmission</SelectItem>
              {['Manual', 'Automatic', 'CVT'].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Body Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Body Type</label>
          <Select value={filters.bodyType[0] || "all"} onValueChange={(value) => handleFilterChange('bodyType', value === "all" ? [] : [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Any body type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any body type</SelectItem>
              {['SUV', 'Hatchback', 'Saloon', 'Coupe', 'Wagon', 'Van', 'Pickup'].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mileage */}
        <div>
          <label className="text-sm font-medium mb-3 block">Mileage (km)</label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minMileage || ''}
              onChange={(e) => handleFilterChange('minMileage', Number(e.target.value) || 0)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxMileage === 200000 ? '' : filters.maxMileage}
              onChange={(e) => handleFilterChange('maxMileage', Number(e.target.value) || 200000)}
            />
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="text-sm font-medium mb-3 block">Year</label>
          <div className="grid grid-cols-2 gap-2">
            <Select value={filters.minYear.toString()} onValueChange={(value) => handleFilterChange('minYear', Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: new Date().getFullYear() - 1990 + 1}, (_, i) => 1990 + i).reverse().map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.maxYear.toString()} onValueChange={(value) => handleFilterChange('maxYear', Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: new Date().getFullYear() - 1990 + 1}, (_, i) => 1990 + i).reverse().map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Doors */}
        <div>
          <label className="text-sm font-medium mb-3 block">Doors</label>
          <div className="flex gap-2">
            {['2', '3', '4', '5+'].map((doors) => (
              <Button
                key={doors}
                variant={filters.doors.includes(doors) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (filters.doors.includes(doors)) {
                    handleFilterChange('doors', filters.doors.filter(d => d !== doors));
                  } else {
                    handleFilterChange('doors', [...filters.doors, doors]);
                  }
                }}
              >
                {doors}
              </Button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="text-sm font-medium mb-3 block">Color</label>
          <Select value={filters.color[0] || "all"} onValueChange={(value) => handleFilterChange('color', value === "all" ? [] : [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Any color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any color</SelectItem>
              {['Black', 'White', 'Grey', 'Silver', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Other'].map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium mb-3 block">Key Features</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {['Navigation', 'Bluetooth', 'Cruise Control', 'Parking Sensors', 'Sunroof', 'Leather Seats', 'Alloy Wheels', 'Reverse Camera'].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleFilterChange('features', [...filters.features, feature]);
                    } else {
                      handleFilterChange('features', filters.features.filter(f => f !== feature));
                    }
                  }}
                />
                <label htmlFor={feature} className="text-sm cursor-pointer">{feature}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CarCard = ({ car }: { car: CarListing }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {car.images?.length > 0 ? (
            <img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">
              <Car />
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={() => handleAddToFavorites(car.id)}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={() => handleAddToComparison(car.id)}
            >
              <GitCompare className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute bottom-2 left-2 flex gap-1">
            {car.isVerified && (
              <Badge className="bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {car.hasFreeDelivery && (
              <Badge className="bg-blue-500 hover:bg-blue-600">
                Free Delivery
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg leading-tight">
              {car.year} {car.make} {car.model}
            </h3>
            <div className="text-right">
              <div className="text-xl font-bold text-purple-600">
                {formatCurrency(car.price)}
              </div>
              <div className="text-xs text-gray-500">
                {car.favoriteCount > 0 && `${car.favoriteCount} saved`}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              {car.mileage?.toLocaleString()} km
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              {car.fuelType}
            </div>
            <div className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              {car.transmission}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {car.location}
            </div>
          </div>
          
          {car.features && car.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {car.features.slice(0, 3).map((feature, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {car.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{car.features.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={() => handleViewDetails(car.id)}
            >
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-3"
              onClick={() => handleCallSeller(car.id)}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-3"
              onClick={() => handleWhatsAppSeller(car.id)}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buy a Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover quality pre-owned and new vehicles from trusted dealers across Kenya
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by make, model, or keyword..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 md:hidden">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search to find the perfect car
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="mileage_low">Lowest Mileage</SelectItem>
                  <SelectItem value="year_new">Newest Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Listings Section */}
        {featuredListings.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Cars</h2>
                <p className="text-gray-600">Hand-picked quality vehicles from verified sellers</p>
              </div>
              <Link href="/buy-a-car?featured=true">
                <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                  View All Featured
                </Button>
              </Link>
            </div>
            
            {featuredLoading ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {Array.from({length: 6}).map((_, i) => (
                  <Card key={i} className="flex-shrink-0 w-80 animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {featuredListings.map((car) => (
                  <div key={car.id} className="flex-shrink-0 w-80">
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-100">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                          {car.images?.length > 0 ? (
                            <img
                              src={car.images[0]}
                              alt={`${car.make} ${car.model}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                              <Car />
                            </div>
                          )}
                          
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                          
                          <div className="absolute top-2 left-2 flex gap-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                              onClick={() => handleAddToFavorites(car.id)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="absolute bottom-2 left-2 flex gap-1">
                            {car.isVerified && (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg leading-tight">
                              {car.year} {car.make} {car.model}
                            </h3>
                            <div className="text-right">
                              <div className="text-xl font-bold text-purple-600">
                                {formatCurrency(car.price)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Gauge className="h-4 w-4" />
                              {car.mileage?.toLocaleString()} km
                            </div>
                            <div className="flex items-center gap-1">
                              <Fuel className="h-4 w-4" />
                              {car.fuelType}
                            </div>
                            <div className="flex items-center gap-1">
                              <Settings className="h-4 w-4" />
                              {car.transmission}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {car.location}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button 
                              className="flex-1 bg-purple-600 hover:bg-purple-700"
                              onClick={() => handleViewDetails(car.id)}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="px-3"
                              onClick={() => handleWhatsAppSeller(car.id)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar />
          </div>

          {/* Listings Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {listings?.total || 0} Cars Found
                </h2>
                <p className="text-gray-600">
                  Showing {((currentPage - 1) * 20) + 1} - {Math.min(currentPage * 20, listings?.total || 0)} of {listings?.total || 0} results
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Listings Grid */}
            {listingsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({length: 6}).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : listings?.cars?.length > 0 ? (
              <>
                <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {listings.cars.map((car: CarListing) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                {listings.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({length: Math.min(5, listings.totalPages)}, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(listings.totalPages, p + 1))}
                      disabled={currentPage === listings.totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}