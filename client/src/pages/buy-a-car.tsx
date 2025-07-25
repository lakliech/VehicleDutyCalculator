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
  Settings,
  Share2,
  GitCompare,
  CreditCard,
  Bookmark
} from 'lucide-react';
import { SwipeInterface } from '@/components/swipe-interface';
import { ModuleNavigation } from '@/components/module-navigation';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

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
  const [, setLocation] = useLocation();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [compareList, setCompareList] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [smartSearchLoading, setSmartSearchLoading] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<SmartSearchFilters>({});
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedFuelType, setSelectedFuelType] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');
  const [selectedBodyType, setSelectedBodyType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedDrive, setSelectedDrive] = useState('all');
  const [mileageRange, setMileageRange] = useState({ min: '', max: '' });
  const [engineSizeRange, setEngineSizeRange] = useState({ min: '', max: '' });
  const [seatsRange, setSeatsRange] = useState({ min: '', max: '' });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

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

  // Parse URL parameters on component mount for smart search
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filters: SmartSearchFilters = {};
    
    if (urlParams.get('maxPrice')) filters.maxPrice = parseInt(urlParams.get('maxPrice')!);
    if (urlParams.get('minPrice')) filters.minPrice = parseInt(urlParams.get('minPrice')!);
    if (urlParams.get('make')) filters.make = urlParams.get('make')!;
    if (urlParams.get('model')) filters.model = urlParams.get('model')!;
    if (urlParams.get('fuelType')) filters.fuelType = urlParams.get('fuelType')!;
    if (urlParams.get('transmission')) filters.transmission = urlParams.get('transmission')!;
    if (urlParams.get('bodyType')) filters.bodyType = urlParams.get('bodyType')!;
    if (urlParams.get('minYear')) filters.minYear = parseInt(urlParams.get('minYear')!);
    if (urlParams.get('maxYear')) filters.maxYear = parseInt(urlParams.get('maxYear')!);
    
    // Apply URL filters if any exist
    if (Object.keys(filters).length > 0) {
      setAppliedFilters(filters);
      
      // Update the manual filter form fields to reflect the smart search filters
      if (filters.make) setSelectedMake(filters.make);
      if (filters.model) setSelectedModel(filters.model);
      if (filters.fuelType) setSelectedFuelType(filters.fuelType);
      if (filters.transmission) setSelectedTransmission(filters.transmission);
      if (filters.bodyType) setSelectedBodyType(filters.bodyType);
      if (filters.minPrice || filters.maxPrice) {
        setPriceRange({
          min: filters.minPrice?.toString() || '',
          max: filters.maxPrice?.toString() || ''
        });
      }
      if (filters.minYear || filters.maxYear) {
        setYearRange({
          min: filters.minYear?.toString() || '',
          max: filters.maxYear?.toString() || ''
        });
      }
      
      toast({
        title: "Smart Search Applied",
        description: "Filters from your search have been applied.",
      });
    }
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
    if (selectedModel && selectedModel !== 'all') filters.model = selectedModel;
    if (selectedFuelType && selectedFuelType !== 'all') filters.fuelType = selectedFuelType;
    if (selectedTransmission && selectedTransmission !== 'all') filters.transmission = selectedTransmission;
    if (selectedBodyType && selectedBodyType !== 'all') filters.bodyType = selectedBodyType;
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
    setSelectedModel('all'); 
    setSelectedFuelType('all');
    setSelectedTransmission('all');
    setSelectedBodyType('all');
    setSelectedLocation('all');
    setSelectedColor('all');
    setSelectedDrive('all');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
    setMileageRange({ min: '', max: '' });
    setEngineSizeRange({ min: '', max: '' });
    setSeatsRange({ min: '', max: '' });
    setSelectedFeatures([]);
    setCurrentPage(1);
  };

  // Action button handlers
  const handleAddToFavorites = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId);
      toast({
        title: "Removed from favorites",
        description: "Vehicle removed from your favorites list.",
      });
    } else {
      newFavorites.add(carId);
      toast({
        title: "Added to favorites",
        description: "Vehicle added to your favorites list.",
      });
    }
    setFavorites(newFavorites);
  };

  const handleAddToComparison = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCompareList = new Set(compareList);
    if (newCompareList.has(carId)) {
      newCompareList.delete(carId);
      toast({
        title: "Removed from comparison",
        description: "Vehicle removed from comparison list.",
      });
    } else if (newCompareList.size >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can only compare up to 3 vehicles at once.",
        variant: "destructive",
      });
      return;
    } else {
      newCompareList.add(carId);
      toast({
        title: "Added to comparison",
        description: "Vehicle added to comparison list.",
      });
    }
    setCompareList(newCompareList);
  };

  const handleShare = (car: CarListing, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${car.year} ${car.make} ${car.model}`,
        text: `Check out this ${car.year} ${car.make} ${car.model} for KES ${car.price.toLocaleString()}`,
        url: `${window.location.origin}/car/${car.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/car/${car.id}`);
      toast({
        title: "Link copied",
        description: "Vehicle link copied to clipboard.",
      });
    }
  };

  const handleCallSeller = (phoneNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleMessageSeller = (car: CarListing, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to car details with message intent
    setLocation(`/car/${car.id}#message`);
  };

  const handleFinanceOptions = (car: CarListing, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to car details with financial services tab
    setLocation(`/car/${car.id}#financial`);
  };

  // Car Card Component
  const CarCard = ({ car }: { car: CarListing }) => {
    const isFavorite = favorites.has(car.id);
    const isInComparison = compareList.has(car.id);
    
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        {/* Clickable container for the main card content */}
        <div onClick={() => setLocation(`/car/${car.id}`)} className="relative">
          <div className="relative">
            <img
              src={car.images[0] || '/placeholder-car.jpg'}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover rounded-t-lg group-hover:brightness-95 transition-all duration-300"
            />
            
            {/* Top action buttons */}
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              <Button
                variant="ghost"
                size="sm"
                className={`bg-white/80 hover:bg-white/90 p-2 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                onClick={(e) => handleAddToFavorites(car.id, e)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`bg-white/80 hover:bg-white/90 p-2 ${isInComparison ? 'text-blue-500' : 'text-gray-600'}`}
                onClick={(e) => handleAddToComparison(car.id, e)}
              >
                <GitCompare className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white/90 p-2 text-gray-600"
                onClick={(e) => handleShare(car, e)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {car.isVerifiedDealer && (
                <Badge className="bg-green-500 text-xs">
                  Verified Dealer
                </Badge>
              )}
              {/* Finance Available Badge - you can add logic to check if financing is available */}
              <Badge className="bg-blue-500 text-xs">
                <CreditCard className="h-3 w-3 mr-1" />
                Finance Available
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors duration-300">
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
            </div>
          </CardContent>
        </div>

        {/* Action buttons section */}
        <div className="px-4 pb-4 border-t bg-gray-50/50">
          <div className="flex items-center justify-between pt-3">
            {/* Primary action buttons */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-xs px-3"
                onClick={(e) => handleMessageSeller(car, e)}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Message
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs px-3"
                onClick={(e) => handleCallSeller(car.phoneNumber, e)}
              >
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs px-3 text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={(e) => handleFinanceOptions(car, e)}
              >
                <CreditCard className="h-3 w-3 mr-1" />
                Finance
              </Button>
            </div>

            {/* View count */}
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {car.viewCount} views
            </div>
          </div>
        </div>
      </Card>
    );
  };

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
              <CardContent className="p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Filter cars</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Make */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Make</Label>
                    <Select value={selectedMake} onValueChange={setSelectedMake}>
                      <SelectTrigger className="text-sm h-10">
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
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="text-sm h-10">
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

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Price (KES)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                      <Input
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Year of Manufacture */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Year of manufacture</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="From"
                        value={yearRange.min}
                        onChange={(e) => setYearRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                      <Input
                        placeholder="To"
                        value={yearRange.max}
                        onChange={(e) => setYearRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Mileage */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Mileage (km)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min km"
                        value={mileageRange.min}
                        onChange={(e) => setMileageRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                      <Input
                        placeholder="Max km"
                        value={mileageRange.max}
                        onChange={(e) => setMileageRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Fuel type</Label>
                    <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                      <SelectTrigger className="text-sm h-10">
                        <SelectValue placeholder="Any fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any fuel type</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="plug-in hybrid">Plug-in hybrid</SelectItem>
                        {filterOptions?.fuelTypes?.map((fuel: string) => (
                          <SelectItem key={fuel} value={fuel}>{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Features</Label>
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                      {['Air Conditioning', 'Bluetooth', 'Parking Sensors', 'Reversing Camera', 'Cruise Control', 'Sunroof', 'Leather Seats', 'GPS Navigation'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFeatures([...selectedFeatures, feature]);
                              } else {
                                setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={feature} className="text-sm text-gray-700">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transmission */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Transmission</Label>
                    <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                      <SelectTrigger className="text-sm h-10">
                        <SelectValue placeholder="Any transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any transmission</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="cvt">CVT</SelectItem>
                        {filterOptions?.transmissions?.map((transmission: string) => (
                          <SelectItem key={transmission} value={transmission}>{transmission.charAt(0).toUpperCase() + transmission.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="text-sm h-10">
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any location</SelectItem>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                        <SelectItem value="eldoret">Eldoret</SelectItem>
                        {filterOptions?.locations?.map((location: string) => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seats */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Seats</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min seats"
                        value={seatsRange.min}
                        onChange={(e) => setSeatsRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                      <Input
                        placeholder="Max seats"
                        value={seatsRange.max}
                        onChange={(e) => setSeatsRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        className="text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Drive */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Drive</Label>
                    <Select value={selectedDrive} onValueChange={setSelectedDrive}>
                      <SelectTrigger className="text-sm h-10">
                        <SelectValue placeholder="Any drive" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any drive</SelectItem>
                        <SelectItem value="fwd">Front wheel drive</SelectItem>
                        <SelectItem value="rwd">Rear wheel drive</SelectItem>
                        <SelectItem value="awd">All wheel drive</SelectItem>
                        <SelectItem value="4wd">4 wheel drive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Engine Size */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Engine size (L)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min L"
                        value={engineSizeRange.min}
                        onChange={(e) => setEngineSizeRange(prev => ({ ...prev, min: e.target.value }))}
                        type="number"
                        step="0.1"
                        className="text-sm h-10"
                      />
                      <Input
                        placeholder="Max L"
                        value={engineSizeRange.max}
                        onChange={(e) => setEngineSizeRange(prev => ({ ...prev, max: e.target.value }))}
                        type="number"
                        step="0.1"
                        className="text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Color */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Color</Label>
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger className="text-sm h-10">
                        <SelectValue placeholder="Any color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any color</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="grey">Grey</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="brown">Brown</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-6 pt-4 border-t">
                  <Button 
                    onClick={applyManualFilters}
                    className="w-full bg-purple-600 hover:bg-purple-700 h-11"
                  >
                    Show results
                  </Button>
                  <Button 
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-11"
                  >
                    Clear all filters
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

        {/* Comparison Counter */}
        {compareList.size > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg"
              onClick={() => {
                toast({
                  title: "Comparison feature",
                  description: `You have ${compareList.size} vehicles selected for comparison.`,
                });
              }}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare ({compareList.size})
            </Button>
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
                  key={`page-${i + 1}`}
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