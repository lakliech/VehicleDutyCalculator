import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Calendar,
  Fuel,
  Gauge,
  Car,
  Smartphone,
  MapPin,
  Eye,
  Heart
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { AdvancedSearch } from "@/components/advanced-search";
import { SwipeInterface } from "@/components/swipe-interface";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

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
  contactPhone: string;
  description: string;
}

export default function BuyACarEnhanced() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    make: '',
    model: '',
    minPrice: 0,
    maxPrice: 10000000,
    minYear: 2000,
    maxYear: new Date().getFullYear(),
    fuelType: '',
    driveConfiguration: '',
    minEngineSize: 0,
    maxEngineSize: 5000,
    location: '',
    bodyType: '',
    condition: ''
  });
  
  const { toast } = useToast();

  // Handle URL parameters from AI Advisor
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const make = urlParams.get('make');
    const model = urlParams.get('model');
    const maxPrice = urlParams.get('maxPrice');
    
    if (make || model || maxPrice) {
      setFilters(prev => ({
        ...prev,
        make: make || prev.make,
        model: model || prev.model,
        maxPrice: maxPrice ? parseInt(maxPrice) : prev.maxPrice,
        search: `${make || ''} ${model || ''}`.trim()
      }));
      
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
      params.append('limit', '12');
      
      if (filters.search) params.append('search', filters.search);
      if (filters.make) params.append('make', filters.make);
      if (filters.model) params.append('model', filters.model);
      if (filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice < 10000000) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.fuelType) params.append('fuelType', filters.fuelType);
      if (filters.driveConfiguration) params.append('driveConfiguration', filters.driveConfiguration);
      if (filters.minYear > 2000) params.append('minYear', filters.minYear.toString());
      if (filters.maxYear < new Date().getFullYear()) params.append('maxYear', filters.maxYear.toString());
      if (filters.location) params.append('location', filters.location);
      if (filters.bodyType) params.append('bodyType', filters.bodyType);
      if (filters.condition) params.append('condition', filters.condition);
      
      const response = await apiRequest('GET', `/api/car-listings?${params.toString()}`);
      return response.json();
    },
  });

  // Track favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: async (vehicleId: number) => {
      return apiRequest('POST', `/api/track-favorite`, { listingId: vehicleId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/car-listings'] });
      toast({ title: "Added to favorites!" });
    }
  });

  const handleAdvancedFiltersChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    setCurrentPage(1);
  };

  const handleSwipeLeft = (vehicle: CarListing) => {
    console.log('Passed on vehicle:', vehicle.id);
  };

  const handleSwipeRight = (vehicle: CarListing) => {
    favoriteMutation.mutate(vehicle.id);
  };

  const handleViewDetails = (vehicle: CarListing) => {
    window.open(`/car-details/${vehicle.id}`, '_blank');
  };

  const CarCard = ({ car }: { car: CarListing }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden">
        {car.images && car.images.length > 0 ? (
          <img 
            src={car.images[0]} 
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Car className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {car.isVerified && (
            <Badge className="bg-green-500 text-white">Verified</Badge>
          )}
          {car.hasWarranty && (
            <Badge className="bg-blue-500 text-white">Warranty</Badge>
          )}
        </div>

        {/* View Count */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Eye className="h-3 w-3 mr-1" />
            {car.viewCount || 0}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg group-hover:text-purple-600 transition-colors">
              {car.make} {car.model}
            </h3>
            <p className="text-2xl font-bold text-purple-600">
              KES {car.price?.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {car.year}
            </div>
            <div className="flex items-center">
              <Gauge className="h-4 w-4 mr-1" />
              {car.mileage?.toLocaleString()} km
            </div>
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1" />
              {car.fuelType}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {car.location}
            </div>
          </div>

          {car.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {car.description}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Link href={`/car-details/${car.id}`} className="flex-1">
              <Button className="w-full" variant="outline">
                View Details
              </Button>
            </Link>
            <Button
              size="icon"
              variant="outline"
              onClick={() => favoriteMutation.mutate(car.id)}
              className="hover:text-red-500"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => window.open(`tel:${car.contactPhone}`, '_self')}
              className="hover:text-green-500"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy a Car</h1>
          <p className="text-gray-600">Find your perfect vehicle from verified sellers across Kenya</p>
        </div>

        {/* Enhanced Search and View Mode Tabs */}
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Smart Search
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Browse All
            </TabsTrigger>
            <TabsTrigger value="swipe" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Swipe Mode
            </TabsTrigger>
          </TabsList>

          {/* Smart Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Advanced Search & Filters</h3>
              <AdvancedSearch 
                onFiltersChange={handleAdvancedFiltersChange}
                initialFilters={filters}
              />
            </Card>

            {/* Search Results */}
            {Object.values(filters).some(value => value !== '' && value !== 0 && value !== 10000000 && value !== 2000 && value !== new Date().getFullYear() && value !== 5000) ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {listings?.total || 0} Cars Found
                  </h2>
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

                {listingsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({length: 6}).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
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
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
                <p className="text-gray-600">Use the search bar above or apply filters to find your perfect car</p>
              </div>
            )}
          </TabsContent>

          {/* Browse All Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {listings?.total || 0} Cars Available
              </h2>
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

            {listingsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 9}).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
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
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cars available</h3>
                <p className="text-gray-600">Check back later for new listings</p>
              </div>
            )}
          </TabsContent>

          {/* Swipe Mode Tab */}
          <TabsContent value="swipe" className="space-y-6">
            <Card className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Swipe to Discover</h3>
                <p className="text-gray-600">Swipe right to like, left to pass. Find cars you love quickly!</p>
              </div>
              
              {listings?.cars?.length > 0 ? (
                <SwipeInterface
                  vehicles={listings.cars}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onViewDetails={handleViewDetails}
                />
              ) : listingsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cars to swipe</h3>
                  <p className="text-gray-600">Try the Browse tab to see all available vehicles</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}