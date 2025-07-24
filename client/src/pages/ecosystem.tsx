import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useCallback, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Users, 
  Eye, 
  Car,
  Wrench,
  Settings,
  CreditCard,
  SearchCheck,
  Truck,
  Smartphone,
  Briefcase,
  GraduationCap,
  Fuel,
  AlertTriangle,
  Mail,
  Globe,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  ShieldCheck,
  ArrowUpDown,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

interface ServiceSubcategory {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

interface ServiceProvider {
  id: number;
  userId?: string;
  businessName: string;
  contactPersonName?: string;
  businessType: string;
  phoneNumbers: string[];
  email?: string;
  website?: string;
  whatsappNumber?: string;
  county: string;
  area: string;
  specificLocation?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  businessHours?: any;
  yearsInBusiness?: number;
  licenseNumber?: string;
  logoUrl?: string;
  bannerImageUrl?: string;
  galleryImages?: any;
  isVerified: boolean;
  verificationDate?: string;
  verificationNotes?: string;
  isActive: boolean;
  isApproved?: boolean;
  viewCount: number;
  contactCount: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt?: string;
  averageRating: number;
}

interface EcosystemStats {
  totalProviders: number;
  verifiedProviders: number;
  totalCategories: number;
  totalReviews: number;
  averageRating: number;
}

const iconMap = {
  car: Car,
  wrench: Wrench,
  settings: Settings,
  "credit-card": CreditCard,
  "search-check": SearchCheck,
  truck: Truck,
  smartphone: Smartphone,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  fuel: Fuel,
  "alert-triangle": AlertTriangle
};

export default function Ecosystem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedCounty, setSelectedCounty] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'views' | 'newest'>('relevance');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch service categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/ecosystem/categories'],
  });

  // Fetch subcategories when category is selected
  const { data: subcategories, isLoading: subcategoriesLoading } = useQuery({
    queryKey: [`/api/ecosystem/categories/${selectedCategory}/subcategories`],
    enabled: Boolean(selectedCategory && selectedCategory !== "all")
  });

  // Fetch Kenya counties for location filtering
  const { data: counties } = useQuery({
    queryKey: ['/api/kenyan-counties'],
  });

  // Fetch areas when county is selected
  const { data: areas } = useQuery({
    queryKey: [`/api/kenyan-counties/${selectedCounty}/areas`],
    enabled: Boolean(selectedCounty && selectedCounty !== "all")
  });

  // Search providers with filters - optimized for large datasets
  const queryParams = useMemo(() => {
    const params = {
      searchTerm: searchTerm.trim(),
      categoryId: selectedCategory && selectedCategory !== "all" ? parseInt(selectedCategory) : undefined,
      subcategoryId: selectedSubcategory && selectedSubcategory !== "all" ? parseInt(selectedSubcategory) : undefined,
      county: selectedCounty && selectedCounty !== "all" ? selectedCounty : undefined,
      area: selectedArea && selectedArea !== "all" ? selectedArea : undefined,
      page: currentPage,
      limit: itemsPerPage,
      sortBy,
      isVerified: verifiedOnly ? true : undefined
    };
    
    // Remove undefined values to clean the query
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
    );
    
    console.log("Query params:", cleanedParams);
    return cleanedParams;
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedCounty, selectedArea, currentPage, itemsPerPage, sortBy, verifiedOnly]);

  const { data: providersData, isLoading: providersLoading, refetch: refetchProviders, isFetching } = useQuery({
    queryKey: ['/api/ecosystem/providers', queryParams],
    enabled: true,
    staleTime: 1000 * 60 * 2, // 2 minutes cache for better performance
    refetchOnWindowFocus: false
  });

  // Fetch ecosystem statistics
  const { data: stats } = useQuery<EcosystemStats>({
    queryKey: ['/api/ecosystem/stats'],
  });

  // Mutation to track provider view
  const trackViewMutation = useMutation({
    mutationFn: async (providerId: number) => {
      return await apiRequest("POST", `/api/ecosystem/providers/${providerId}/view`);
    },
    onSuccess: () => {
      // Refresh provider data to update view count
      queryClient.invalidateQueries({ queryKey: ['/api/ecosystem/providers'] });
    }
  });

  // Mutation to track provider contact
  const trackContactMutation = useMutation({
    mutationFn: async (providerId: number) => {
      return await apiRequest("POST", `/api/ecosystem/providers/${providerId}/contact`);
    },
    onSuccess: () => {
      // Refresh provider data to update contact count
      queryClient.invalidateQueries({ queryKey: ['/api/ecosystem/providers'] });
    }
  });

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory("all");
  }, [selectedCategory]);

  // Reset area when county changes
  useEffect(() => {
    setSelectedArea("all");
  }, [selectedCounty]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedCounty, selectedArea, sortBy, verifiedOnly]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    refetchProviders();
  }, [refetchProviders]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedCounty("all");
    setSelectedArea("all");
    setSortBy('relevance');
    setVerifiedOnly(false);
    setCurrentPage(1);
  }, []);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  // Debounce function for search optimization
  function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    }) as T;
  }

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsDetailsDialogOpen(true);
    trackViewMutation.mutate(provider.id);
  };

  const handleCall = (provider: ServiceProvider) => {
    trackContactMutation.mutate(provider.id);
    const phoneNumber = provider.phoneNumbers[0];
    if (phoneNumber) {
      // Create a tel: link to open the phone dialer
      window.location.href = `tel:${phoneNumber}`;
    } else {
      toast({
        title: "Phone number not available",
        description: "This provider has not provided a phone number.",
        variant: "destructive",
      });
    }
  };

  // Render provider card based on view mode
  const renderProviderCard = (provider: ServiceProvider) => {
    if (viewMode === 'list') {
      return (
        <Card key={provider.id} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                {provider.logoUrl && (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                      src={provider.logoUrl} 
                      alt={`${provider.businessName} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{provider.businessName}</h3>
                    {provider.isVerified && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{provider.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {provider.area}, {provider.county}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {provider.totalViews || provider.viewCount || 0} views
                    </span>
                    {provider.averageRating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {provider.averageRating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleCall(provider)}
                  disabled={!provider.phoneNumbers?.[0]}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewDetails(provider)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Grid view (default)
    return (
      <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {provider.logoUrl && (
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img 
                    src={provider.logoUrl} 
                    alt={`${provider.businessName} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {provider.businessName}
                  {provider.isVerified && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {provider.description}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{provider.area}, {provider.county}</span>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{formatPhoneNumber(provider.phoneNumbers[0])}</span>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {provider.totalViews || provider.viewCount || 0}
                </span>
                {provider.averageRating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {provider.averageRating.toFixed(1)}
                  </span>
                )}
              </div>
              {provider.priceRange && (
                <Badge variant="outline" className="text-xs">
                  {provider.priceRange}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => handleCall(provider)}
              disabled={!provider.phoneNumbers?.[0]}
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => handleViewDetails(provider)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const formatPhoneNumber = (phone: string) => {
    // Format Kenya phone numbers for better display
    if (phone.startsWith('254')) {
      return `+${phone}`;
    } else if (phone.startsWith('0')) {
      return `+254${phone.substring(1)}`;
    }
    return phone;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderCategoryIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Car;
    return <IconComponent className="w-6 h-6" />;
  };

  const providers = (providersData as any)?.providers || [];
  const totalProviders = parseInt((providersData as any)?.total || '0');
  const totalPages = Math.ceil(totalProviders / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kenya Automotive Ecosystem
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with automotive businesses and service providers across Kenya. 
            From dealers to mechanics, find trusted professionals in your area.
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalProviders}</div>
                <div className="text-sm text-gray-600">Total Providers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.verifiedProviders}</div>
                <div className="text-sm text-gray-600">Verified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.totalReviews}</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call-to-Action for Business Registration */}
        <div className="mb-8 text-center">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Are you an automotive business owner?
              </h3>
              <p className="text-green-700 mb-4">
                Join Kenya's largest automotive ecosystem and connect with thousands of potential customers
              </p>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <a href="/ecosystem/register">
                  Register Your Business
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Service Providers
              </CardTitle>
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                {/* Verified Only Toggle */}
                <div className="flex items-center gap-2">
                  <Switch
                    id="verified-only"
                    checked={verifiedOnly}
                    onCheckedChange={setVerifiedOnly}
                  />
                  <Label htmlFor="verified-only" className="text-sm flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Only
                  </Label>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search providers, services, locations..."
                className="pl-10"
                defaultValue={searchTerm}
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              {isFetching && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
              )}
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {(categories as any)?.map((category: ServiceCategory) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Subcategory Filter */}
              <Select 
                value={selectedSubcategory} 
                onValueChange={setSelectedSubcategory}
                disabled={!selectedCategory || subcategoriesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Subcategories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {(subcategories as any)?.map((subcategory: ServiceSubcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* County Filter */}
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Counties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Counties</SelectItem>
                  {(counties as any)?.map((county: string) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Area Filter */}
              <Select 
                value={selectedArea} 
                onValueChange={setSelectedArea}
                disabled={!selectedCounty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {(areas as any)?.map((area: string) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-3 h-3" />
                      Relevance
                    </div>
                  </SelectItem>
                  <SelectItem value="rating">
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3" />
                      Rating
                    </div>
                  </SelectItem>
                  <SelectItem value="views">
                    <div className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      Most Views
                    </div>
                  </SelectItem>
                  <SelectItem value="newest">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Newest
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Items per page */}
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Clear All Filters
              </Button>
              {(searchTerm || selectedCategory || selectedCounty || verifiedOnly) && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Filter className="w-4 h-4" />
                  Filters applied
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        {!searchTerm && !selectedCategory && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            {categoriesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(categories as any)?.map((category: ServiceCategory) => (
                  <Card 
                    key={category.id} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedCategory(category.id.toString())}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {renderCategoryIcon(category.icon)}
                        </div>
                        <div>
                          <CardTitle className="text-sm">{category.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-xs">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Providers Results with Scalable Design */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Service Providers
                {totalProviders > 0 && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({totalProviders} found)
                  </span>
                )}
              </h2>
              {isFetching && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching providers...
                </div>
              )}
            </div>
            
            {/* Results Controls */}
            {totalProviders > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalProviders)} of {totalProviders}
                </div>
              </div>
            )}
          </div>

          {providersLoading ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <Skeleton key={i} className={viewMode === 'grid' ? "h-64" : "h-32"} />
              ))}
            </div>
          ) : providers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-500">
                  <Users className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">No providers found</h3>
                  <p className="text-gray-400 mb-4">
                    Try adjusting your search criteria or clearing filters to see more results.
                  </p>
                  {(searchTerm || selectedCategory !== "all" || selectedCounty !== "all") && (
                    <Button variant="outline" onClick={clearFilters}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Dynamic Grid/List View */}
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {providers.map((provider: ServiceProvider) => renderProviderCard(provider))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages} pages
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <ChevronLeft className="w-4 h-4 -ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = currentPage <= 3 
                          ? i + 1 
                          : currentPage >= totalPages - 2 
                            ? totalPages - 4 + i 
                            : currentPage - 2 + i;
                        
                        if (pageNum < 1 || pageNum > totalPages) return null;
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      <ChevronRight className="w-4 h-4" />
                      <ChevronRight className="w-4 h-4 -ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Provider Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProvider && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {selectedProvider.businessName}
                    {selectedProvider.isVerified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedProvider.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div>
                          {selectedProvider.phoneNumbers.map((phone, index) => (
                            <div key={index}>
                              <a 
                                href={`tel:${phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {formatPhoneNumber(phone)}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                      {selectedProvider.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <a 
                            href={`mailto:${selectedProvider.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {selectedProvider.email}
                          </a>
                        </div>
                      )}
                      {selectedProvider.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a 
                            href={selectedProvider.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedProvider.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">{selectedProvider.area}, {selectedProvider.county}</div>
                        {selectedProvider.address && (
                          <div className="text-gray-600 text-sm">{selectedProvider.address}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  {selectedProvider.services && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
                      <p className="text-gray-700">{selectedProvider.services}</p>
                    </div>
                  )}

                  {/* Business Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProvider.priceRange && (
                      <div>
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          Price Range
                        </h4>
                        <Badge variant="outline">{selectedProvider.priceRange}</Badge>
                      </div>
                    )}
                    {selectedProvider.operatingHours && (
                      <div>
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          Operating Hours
                        </h4>
                        <p className="text-sm text-gray-600">{selectedProvider.operatingHours}</p>
                      </div>
                    )}
                    {selectedProvider.yearsInBusiness && (
                      <div>
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          Years in Business
                        </h4>
                        <p className="text-sm text-gray-600">{selectedProvider.yearsInBusiness} years</p>
                      </div>
                    )}
                    {selectedProvider.businessRegistrationNumber && (
                      <div>
                        <h4 className="font-medium mb-1">Business Registration</h4>
                        <p className="text-sm text-gray-600">{selectedProvider.businessRegistrationNumber}</p>
                      </div>
                    )}
                  </div>

                  {/* Statistics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedProvider.totalViews}</div>
                        <div className="text-xs text-gray-500">Total Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedProvider.totalContacts}</div>
                        <div className="text-xs text-gray-500">Total Contacts</div>
                      </div>
                      {selectedProvider.averageRating && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-current" />
                            {selectedProvider.averageRating.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-500">Average Rating</div>
                        </div>
                      )}
                      {selectedProvider.totalReviews && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{selectedProvider.totalReviews}</div>
                          <div className="text-xs text-gray-500">Total Reviews</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div className="text-sm text-gray-500 border-t pt-4">
                    Registered on {formatDate(selectedProvider.registeredAt)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleCall(selectedProvider)}
                      disabled={!selectedProvider.phoneNumbers?.[0]}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    {selectedProvider.email && (
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.location.href = `mailto:${selectedProvider.email}`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}