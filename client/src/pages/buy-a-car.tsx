import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ModuleNavigation } from '@/components/module-navigation';
import { SwipeInterface } from '@/components/swipe-interface';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { 
  Search, 
  Sparkles, 
  Grid, 
  Smartphone, 
  Car, 
  Phone, 
  MessageCircle, 
  Heart, 
  Share2, 
  MapPin, 
  Fuel, 
  Settings, 
  Gauge,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

interface CarFilters {
  search: string;
  make: string[];
  model: string[];
  minPrice: number;
  maxPrice: number;
  fuelType: string[];
  transmission: string[];
  bodyType: string[];
  minYear: number;
  maxYear: number;
  minMileage: number;
  maxMileage: number;
  doors: string[];
  color: string[];
  features: string[];
  sortBy: string;
}

export default function BuyACar() {
  const { toast } = useToast();
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<CarFilters>({
    search: '',
    make: [],
    model: [],
    minPrice: 0,
    maxPrice: 10000000,
    fuelType: [],
    transmission: [],
    bodyType: [],
    minYear: 2000,
    maxYear: new Date().getFullYear(),
    minMileage: 0,
    maxMileage: 200000,
    doors: [],
    color: [],
    features: [],
    sortBy: 'recommended'
  });

  // Handle URL parameters from smart search
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.toString()) {
      const newFilters = { ...filters };
      
      if (params.get('maxPrice')) newFilters.maxPrice = parseInt(params.get('maxPrice')!);
      if (params.get('minPrice')) newFilters.minPrice = parseInt(params.get('minPrice')!);
      if (params.get('make')) newFilters.make = params.get('make')!.split(',');
      if (params.get('model')) newFilters.model = params.get('model')!.split(',');
      if (params.get('fuelType')) newFilters.fuelType = params.get('fuelType')!.split(',');
      if (params.get('transmission')) newFilters.transmission = params.get('transmission')!.split(',');
      if (params.get('bodyType')) newFilters.bodyType = params.get('bodyType')!.split(',');
      if (params.get('minYear')) newFilters.minYear = parseInt(params.get('minYear')!);
      if (params.get('maxYear')) newFilters.maxYear = parseInt(params.get('maxYear')!);
      
      setFilters(newFilters);
      
      // Clear URL parameters after loading them
      window.history.replaceState({}, '', '/buy-a-car');
    }
  }, []);

  // Fetch car listings
  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['car-listings', filters, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            acc[key] = value.join(',');
          } else if (value !== null && value !== undefined && value !== '' && value !== 0) {
            acc[key] = value.toString();
          }
          return acc;
        }, {} as Record<string, string>)
      });

      const response = await fetch(`/api/car-listings?${params}`);
      const data = await response.json();
      return data;
    },
  });

  const handleFilterChange = (key: keyof CarFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSmartSearch = async (query: string) => {
    try {
      const response = await apiRequest('POST', '/api/smart-search-parse', { query });
      const data = await response.json();
      
      const { filters: aiFilters, explanation } = data;
      
      // Apply AI-extracted filters
      const newFilters = {
        ...filters,
        maxPrice: aiFilters.maxPrice ?? filters.maxPrice,
        minPrice: aiFilters.minPrice ?? filters.minPrice,
        make: aiFilters.make?.length > 0 ? aiFilters.make : filters.make,
        model: aiFilters.model?.length > 0 ? aiFilters.model : filters.model,
        fuelType: aiFilters.fuelType?.length > 0 ? aiFilters.fuelType : filters.fuelType,
        transmission: aiFilters.transmission?.length > 0 ? aiFilters.transmission : filters.transmission,
        bodyType: aiFilters.bodyType?.length > 0 ? aiFilters.bodyType : filters.bodyType,
        minYear: aiFilters.minYear ?? filters.minYear,
        maxYear: aiFilters.maxYear ?? filters.maxYear,
      };
      
      setFilters(newFilters);
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ['car-listings'] });
      
      toast({
        title: "Smart Search Applied",
        description: explanation || "Filters applied successfully",
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Unable to process your search",
        variant: "destructive",
      });
    }
  };

  const handleAddToFavorites = (carId: number) => {
    toast({
      title: "Added to Favorites",
      description: "Car has been added to your favorites list",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const CarCard = ({ car }: { car: CarListing }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-gray-200 relative">
        {car.images && car.images.length > 0 ? (
          <img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white"
            onClick={() => handleAddToFavorites(car.id)}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-600">{car.year}</p>
          </div>
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
        
        {/* Dealer Information */}
        {car.dealerName && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
            {car.dealerLogoUrl ? (
              <img 
                src={car.dealerLogoUrl} 
                alt={`${car.dealerName} logo`}
                className="w-8 h-8 rounded-full object-cover border"
              />
            ) : (
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-xs">
                  {car.dealerName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-900">{car.dealerName}</span>
                {car.isVerifiedDealer && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    ✓ Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buy a Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover quality pre-owned and new vehicles from trusted dealers across Kenya
          </p>
        </div>

        <Tabs defaultValue="smart-search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="smart-search" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Smart Search
            </TabsTrigger>
            <TabsTrigger value="browse-all" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Browse All
            </TabsTrigger>
            <TabsTrigger value="swipe-mode" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Swipe Mode
            </TabsTrigger>
          </TabsList>

          {/* Smart Search Tab */}
          <TabsContent value="smart-search" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">AI-Powered Car Search</h3>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Try: 'budget 700k suzuki', 'honda crv automatic under 2M', 'toyota corolla 2018-2020 petrol'"
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const query = filters.search.trim() || 'budget 730000';
                        handleSmartSearch(query);
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={() => {
                    const query = filters.search.trim() || 'budget 730000';
                    handleSmartSearch(query);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Smart Search
                </Button>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                <p><strong>Debug:</strong> Found {listings?.total || 0} cars | Current filters: maxPrice={filters.maxPrice}</p>
              </div>

              {listingsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching cars...</p>
                </div>
              ) : listings?.cars?.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Found {listings.total} cars matching your search</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.cars.map((car: CarListing) => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
                  <p className="text-gray-600 mb-4">Use natural language to find your perfect car</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['budget 700k suzuki', 'honda crv automatic', 'toyota under 1M'].map((example) => (
                      <Button
                        key={example}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleFilterChange('search', example);
                          handleSmartSearch(example);
                        }}
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Browse All Tab */}
          <TabsContent value="browse-all" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Browse All Cars</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <Input
                    placeholder="Search by make, model..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <Input
                    type="number"
                    placeholder="10000000"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 10000000)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      search: '',
                      make: [],
                      model: [],
                      minPrice: 0,
                      maxPrice: 10000000,
                      fuelType: [],
                      transmission: [],
                      bodyType: [],
                      minYear: 2000,
                      maxYear: new Date().getFullYear(),
                      minMileage: 0,
                      maxMileage: 200000,
                      doors: [],
                      color: [],
                      features: [],
                      sortBy: 'recommended'
                    })}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              {listingsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading cars...</p>
                </div>
              ) : listings?.cars?.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, listings.total)} of {listings.total} cars
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.cars.map((car: CarListing) => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>

                  {listings.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      <span className="px-4 py-2 text-sm">
                        Page {currentPage} of {listings.totalPages}
                      </span>
                      
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
                </div>
              ) : (
                <div className="text-center py-12">
                  <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Swipe Mode Tab */}
          <TabsContent value="swipe-mode" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Swipe to Find Your Perfect Car</h3>
                <p className="text-gray-600">Swipe right to like, left to pass. Find cars you love quickly!</p>
              </div>
              
              {listings?.cars?.length > 0 ? (
                <SwipeInterface
                  vehicles={listings.cars}
                  onSwipeLeft={(car) => {
                    // User passed on this car
                  }}
                  onSwipeRight={(car) => {
                    handleAddToFavorites(car.id);
                    toast({
                      title: "Car Liked!",
                      description: `Added ${car.make} ${car.model} to your favorites`,
                    });
                  }}
                />
              ) : (
                <div className="text-center py-12">
                  <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Loading cars...</h3>
                  <p className="text-gray-600">Get ready to swipe through available cars</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}