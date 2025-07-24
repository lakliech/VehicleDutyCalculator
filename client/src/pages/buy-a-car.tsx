import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Fuel, 
  Gauge, 
  Users, 
  Star,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  AlertTriangle,
  Smartphone,
  Grid,
  Car,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { SwipeInterface } from '@/components/swipe-interface';
import { ModuleNavigation } from '@/components/module-navigation';
import { useToast } from '@/hooks/use-toast';

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
  images: string[];
  features: string[];
  favoriteCount: number;
  viewCount: number;
  phoneNumber: string;
  dealerName?: string;
  dealerLogoUrl?: string;
  isVerifiedDealer?: boolean;
}

interface SmartSearchFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
}

export default function BuyACar() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [smartSearchLoading, setSmartSearchLoading] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<SmartSearchFilters>({});
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedFuelType, setSelectedFuelType] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/car-listing-filters'],
    queryFn: async () => {
      const response = await fetch('/api/car-listing-filters', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch filter options');
      }
      return response.json();
    },
    staleTime: 300000, // Cache for 5 minutes
  });

  // Fetch car listings with filters
  const { data: listingsResponse, isLoading, error } = useQuery({
    queryKey: ['/api/car-listings', appliedFilters, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: isMobile ? '10' : '12',
        ...Object.fromEntries(
          Object.entries(appliedFilters).filter(([_, value]) => value !== undefined && value !== '')
        )
      });
      
      const response = await fetch(`/api/car-listings?${params}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch car listings');
      }
      
      return response.json();
    },
    retry: 2,
    staleTime: 60000,
  });

  // Extract cars from response - API returns { cars: [...] }
  const listings = listingsResponse?.cars || [];

  // Smart search function
  const handleSmartSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a search query to use smart search.",
        variant: "destructive",
      });
      return;
    }

    setSmartSearchLoading(true);
    
    try {
      const response = await fetch('/api/smart-search-parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Smart search failed');
      }

      const result = await response.json();
      console.log('Smart search result:', result);

      if (result.filters && Object.keys(result.filters).length > 0) {
        setAppliedFilters(result.filters);
        setSearchTerm(''); // Clear search after applying filters
        toast({
          title: "Smart Search Applied",
          description: `Found filters: ${Object.keys(result.filters).join(', ')}`,
        });
      } else {
        toast({
          title: "No Filters Found",
          description: "Try a more specific search like 'budget 700k toyota' or 'honda automatic under 2M'",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Smart search error:', error);
      toast({
        title: "Smart Search Error",
        description: "Failed to parse your search. Please try again or use manual filters.",
        variant: "destructive",
      });
    } finally {
      setSmartSearchLoading(false);
    }
  };

  // Handle Enter key for smart search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSmartSearch();
    }
  };

  // Apply manual filters
  const applyManualFilters = () => {
    const filters: SmartSearchFilters = {};
    
    if (selectedMake && selectedMake !== 'all') filters.make = selectedMake;
    if (selectedFuelType && selectedFuelType !== 'all') filters.fuelType = selectedFuelType;
    if (selectedTransmission && selectedTransmission !== 'all') filters.transmission = selectedTransmission;
    if (priceRange.min) filters.minPrice = parseInt(priceRange.min);
    if (priceRange.max) filters.maxPrice = parseInt(priceRange.max);
    if (yearRange.min) filters.minYear = parseInt(yearRange.min);
    if (yearRange.max) filters.maxYear = parseInt(yearRange.max);

    setAppliedFilters(filters);
    setCurrentPage(1);
    toast({
      title: "Filters Applied",
      description: "Updated search results with your filters.",
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setAppliedFilters({});
    setSelectedMake('all');
    setSelectedFuelType('all');
    setSelectedTransmission('all');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  // Car Card Component
  const CarCard = ({ car }: { car: CarListing }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={car.images[0] || '/placeholder-car.jpg'}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {car.isVerifiedDealer && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Verified Dealer
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-2xl font-bold text-purple-600">
              KES {car.price.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              {car.mileage.toLocaleString()} km
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

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              {car.viewCount} views
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Car</h1>
          <p className="text-gray-600">Discover thousands of verified vehicles from trusted dealers</p>
        </div>

        {/* Smart Search Section */}
        <Card className="mb-8 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Sparkles className="h-5 w-5" />
              AI-Powered Smart Search
            </CardTitle>
            <CardDescription>
              Try: "budget 700k suzuki", "honda crv automatic under 2M", or "toyota corolla 2018-2020 petrol"
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Input
                placeholder="Describe what you're looking for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-base"
              />
              <Button 
                onClick={handleSmartSearch}
                disabled={smartSearchLoading}
                className="bg-purple-600 hover:bg-purple-700 min-w-[120px]"
              >
                {smartSearchLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </div>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Smart Search
                  </>
                )}
              </Button>
            </div>
            
            {/* Applied Filters Display */}
            {Object.keys(appliedFilters).length > 0 && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-800">Active Filters:</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-purple-600 border-purple-200"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(appliedFilters).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="bg-purple-100 text-purple-700">
                      {key}: {value?.toString()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content with Sidebar Layout */}
        <div className="flex gap-8">
          {/* Left Sidebar - Advanced Filters */}
          <div className="w-80 flex-shrink-0">
            <Card className="border-purple-200 sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Price Range (KES)</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Minimum price"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        className="text-sm"
                      />
                      <Input
                        placeholder="Maximum price"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Year Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Year Range</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="From year"
                        value={yearRange.min}
                        onChange={(e) => setYearRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        className="text-sm"
                      />
                      <Input
                        placeholder="To year"
                        value={yearRange.max}
                        onChange={(e) => setYearRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Make Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Make</Label>
                    <Select value={selectedMake} onValueChange={setSelectedMake}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Any Make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Make</SelectItem>
                        {filterOptions?.makes?.map((make: string) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Fuel Type</Label>
                    <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Any Fuel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Fuel</SelectItem>
                        {filterOptions?.fuelTypes?.map((fuel: string) => (
                          <SelectItem key={fuel} value={fuel}>{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Transmission Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Transmission</Label>
                    <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Any Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Transmission</SelectItem>
                        {filterOptions?.transmissions?.map((transmission: string) => (
                          <SelectItem key={transmission} value={transmission}>{transmission.charAt(0).toUpperCase() + transmission.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Button 
                    onClick={applyManualFilters}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Swipe Mode or Desktop Grid */}
        {isMobile ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold">Swipe to Browse</h2>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Mobile Mode
              </Badge>
            </div>
            <SwipeInterface vehicles={listings} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-semibold">Latest Listings</h2>
                <Badge variant="outline">{listings.length} cars found</Badge>
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="mileage">Lowest Mileage</SelectItem>
                  <SelectItem value="year">Newest Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Car Listings Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load car listings. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((car: CarListing) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!isMobile && listings.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex gap-1">
              {[...Array(Math.min(5, Math.ceil(listings.length / 12)))].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-10"
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={listings.length < 12}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}