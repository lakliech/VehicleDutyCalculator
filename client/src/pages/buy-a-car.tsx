import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import { 
  Car, Search, Filter, Grid3X3, List, Heart, MapPin, 
  Phone, Calendar, Fuel, Cog, Palette, Users, Star,
  ArrowUpDown, SlidersHorizontal, X, ChevronDown,
  Eye, MessageCircle, Share, BookOpen
} from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

interface CarListing {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  engineSize: number;
  mileage: number;
  fuelType: string;
  bodyType: string;
  transmission: string;
  exteriorColor: string;
  condition: string;
  price: number;
  negotiable: boolean;
  description: string;
  features: string[];
  images: string[];
  location: string;
  phoneNumber: string;
  whatsappNumber?: string;
  viewCount: number;
  favoriteCount: number;
  featured: boolean;
  createdAt: string;
}

interface SearchFilters {
  make: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  fuelType: string;
  bodyType: string;
  transmission: string;
  location: string;
  condition: string;
  features: string[];
  sortBy: string;
  searchQuery: string;
}

const initialFilters: SearchFilters = {
  make: "",
  model: "",
  minPrice: 50000,
  maxPrice: 10000000,
  minYear: 1990,
  maxYear: 2025,
  fuelType: "",
  bodyType: "",
  transmission: "",
  location: "",
  condition: "",
  features: [],
  sortBy: "newest",
  searchQuery: "",
};

export default function BuyACar() {
  const { user, isAuthenticated } = useAuth();
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteListings, setFavoriteListings] = useState<number[]>([]);

  // Fetch car listings with filters
  const { data: listings = [], isLoading } = useQuery<CarListing[]>({
    queryKey: ['/api/marketplace/search', filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== 0 && (Array.isArray(value) ? value.length > 0 : true)) {
          if (Array.isArray(value)) {
            searchParams.append(key, JSON.stringify(value));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
      
      const response = await fetch(`/api/marketplace/search?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch listings');
      return response.json();
    },
  });

  // Fetch available makes for filter dropdown
  const { data: makes = [] } = useQuery<string[]>({
    queryKey: ['/api/marketplace/makes'],
    queryFn: async () => {
      const response = await fetch('/api/marketplace/makes');
      if (!response.ok) throw new Error('Failed to fetch makes');
      return response.json();
    },
  });

  // Fetch models based on selected make
  const { data: models = [] } = useQuery<string[]>({
    queryKey: ['/api/marketplace/models', filters.make],
    queryFn: async () => {
      if (!filters.make) return [];
      const response = await fetch(`/api/marketplace/models?make=${filters.make}`);
      if (!response.ok) throw new Error('Failed to fetch models');
      return response.json();
    },
    enabled: !!filters.make,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    // Convert "any" value to empty string for filtering
    const actualValue = value === "any" ? "" : value;
    
    setFilters(prev => ({
      ...prev,
      [key]: actualValue,
      // Reset model when make changes
      ...(key === 'make' && { model: '' }),
    }));
  };

  const toggleFavorite = async (listingId: number) => {
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }

    try {
      const method = favoriteListings.includes(listingId) ? 'DELETE' : 'POST';
      const response = await fetch(`/api/marketplace/favorites/${listingId}`, { method });
      
      if (response.ok) {
        setFavoriteListings(prev => 
          method === 'POST' 
            ? [...prev, listingId]
            : prev.filter(id => id !== listingId)
        );
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'minPrice') return value > 50000;
    if (key === 'maxPrice') return value < 10000000;
    if (key === 'minYear') return value > 1990;
    if (key === 'maxYear') return value < 2025;
    if (Array.isArray(value)) return value.length > 0;
    return value !== "" && value !== 0;
  }).length;

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  const formatMileage = (mileage: number) => `${mileage.toLocaleString()} km`;

  // Popular car makes for quick filters
  const popularMakes = ["Toyota", "Nissan", "Honda", "Mazda", "Mercedes-Benz", "BMW", "Volkswagen", "Audi"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buy a Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Find your perfect car from thousands of quality-checked vehicles. 
            Filter by make, model, price, and features to discover great deals near you.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by make, model, or keywords..."
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    className="pl-10 py-6 text-lg"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-6"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="rounded-none py-6"
                >
                  <Grid3X3 className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="rounded-none py-6"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Popular Makes Quick Filter */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">Popular brands:</span>
                {popularMakes.map((make) => (
                  <Button
                    key={make}
                    variant={filters.make === make ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('make', filters.make === make ? '' : make)}
                  >
                    {make}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Filter Results</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Make & Model */}
                <div className="space-y-4">
                  <div>
                    <Label>Make</Label>
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any make</SelectItem>
                        {makes.map((make) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Model</Label>
                    <Select 
                      value={filters.model} 
                      onValueChange={(value) => handleFilterChange('model', value)}
                      disabled={!filters.make}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any model</SelectItem>
                        {models.map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <Label>Price Range</Label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={([min, max]) => {
                        handleFilterChange('minPrice', min);
                        handleFilterChange('maxPrice', max);
                      }}
                      max={10000000}
                      min={50000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{formatPrice(filters.minPrice)}</span>
                      <span>{formatPrice(filters.maxPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Year Range */}
                <div className="space-y-4">
                  <Label>Year Range</Label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minYear, filters.maxYear]}
                      onValueChange={([min, max]) => {
                        handleFilterChange('minYear', min);
                        handleFilterChange('maxYear', max);
                      }}
                      max={2025}
                      min={1990}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{filters.minYear}</span>
                      <span>{filters.maxYear}</span>
                    </div>
                  </div>
                </div>

                {/* Other Filters */}
                <div className="space-y-4">
                  <div>
                    <Label>Fuel Type</Label>
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any fuel type</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Body Type</Label>
                    <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange('bodyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any body type</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="estate">Estate</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-lg text-gray-600">
              {isLoading ? 'Loading...' : `${listings.length} cars found`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="mileage_low">Mileage: Low to High</SelectItem>
                <SelectItem value="year_new">Year: Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Car Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms to find more results.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {listings.map((listing) => (
              <CarListingCard
                key={listing.id}
                listing={listing}
                viewMode={viewMode}
                isFavorite={favoriteListings.includes(listing.id)}
                onToggleFavorite={() => toggleFavorite(listing.id)}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface CarListingCardProps {
  listing: CarListing;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isAuthenticated: boolean;
}

function CarListingCard({ listing, viewMode, isFavorite, onToggleFavorite, isAuthenticated }: CarListingCardProps) {
  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;
  const formatMileage = (mileage: number) => `${mileage.toLocaleString()} km`;

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="w-64 h-48 flex-shrink-0 relative">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-l-lg flex items-center justify-center">
                  <Car className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              {/* Featured Badge */}
              {listing.featured && (
                <Badge className="absolute top-2 left-2 bg-purple-600">
                  Featured
                </Badge>
              )}

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite();
                }}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/buy-a-car/${listing.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 line-clamp-2">
                    {listing.title}
                  </h3>
                </Link>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPrice(listing.price)}
                  </div>
                  {listing.negotiable && (
                    <span className="text-sm text-gray-500">Negotiable</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {listing.year}
                </div>
                <div className="flex items-center gap-1">
                  <Cog className="w-4 h-4" />
                  {formatMileage(listing.mileage)}
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  {listing.fuelType}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    {listing.viewCount}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/buy-a-car/${listing.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        {/* Image */}
        <div className="h-48 relative overflow-hidden rounded-t-lg">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Car className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Image count indicator */}
          {listing.images && listing.images.length > 1 && (
            <Badge variant="secondary" className="absolute bottom-2 right-2">
              {listing.images.length} photos
            </Badge>
          )}
        </div>

        {/* Featured Badge */}
        {listing.featured && (
          <Badge className="absolute top-2 left-2 bg-purple-600">
            Featured
          </Badge>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <Link href={`/buy-a-car/${listing.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 mb-2 line-clamp-2">
            {listing.title}
          </h3>
        </Link>

        <div className="text-2xl font-bold text-purple-600 mb-3">
          {formatPrice(listing.price)}
          {listing.negotiable && (
            <span className="text-sm text-gray-500 font-normal ml-2">Negotiable</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {listing.year}
          </div>
          <div className="flex items-center gap-1">
            <Cog className="w-4 h-4" />
            {formatMileage(listing.mileage)}
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            {listing.fuelType}
          </div>
          <div className="flex items-center gap-1">
            <Palette className="w-4 h-4" />
            {listing.exteriorColor}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          {listing.location}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            {listing.viewCount}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/buy-a-car/${listing.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}