import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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
  AlertTriangle
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
  businessName: string;
  description?: string;
  categoryId: number;
  subcategoryId?: number;
  contactPerson: string;
  phoneNumbers: string[];
  email?: string;
  website?: string;
  county: string;
  area: string;
  address?: string;
  services?: string;
  priceRange?: string;
  operatingHours?: string;
  socialMediaLinks?: string;
  businessRegistrationNumber?: string;
  yearsInBusiness?: number;
  isVerified: boolean;
  totalViews: number;
  totalContacts: number;
  averageRating?: number;
  totalReviews?: number;
  registeredAt: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch service categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/ecosystem/categories'],
  });

  // Fetch subcategories when category is selected
  const { data: subcategories, isLoading: subcategoriesLoading } = useQuery({
    queryKey: ['/api/ecosystem/categories', selectedCategory, 'subcategories'],
    enabled: !!selectedCategory
  });

  // Fetch Kenya counties for location filtering
  const { data: counties } = useQuery({
    queryKey: ['/api/kenyan-counties'],
  });

  // Fetch areas when county is selected
  const { data: areas } = useQuery({
    queryKey: ['/api/kenyan-counties', selectedCounty, 'areas'],
    enabled: !!selectedCounty
  });

  // Search providers with filters
  const { data: providersData, isLoading: providersLoading, refetch: refetchProviders } = useQuery({
    queryKey: ['/api/ecosystem/providers', {
      searchTerm,
      categoryId: selectedCategory ? parseInt(selectedCategory) : undefined,
      subcategoryId: selectedSubcategory ? parseInt(selectedSubcategory) : undefined,
      county: selectedCounty,
      area: selectedArea,
      page: currentPage,
      limit: 20
    }],
    enabled: true
  });

  // Fetch ecosystem statistics
  const { data: stats } = useQuery<EcosystemStats>({
    queryKey: ['/api/ecosystem/stats'],
  });

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory("");
  }, [selectedCategory]);

  // Reset area when county changes
  useEffect(() => {
    setSelectedArea("");
  }, [selectedCounty]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedCounty, selectedArea]);

  const handleSearch = () => {
    refetchProviders();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedCounty("");
    setSelectedArea("");
    setCurrentPage(1);
  };

  const renderCategoryIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Car;
    return <IconComponent className="w-6 h-6" />;
  };

  const providers = providersData?.providers || [];
  const totalProviders = providersData?.total || 0;
  const totalPages = Math.ceil(totalProviders / 20);

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

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Service Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <Input
                  placeholder="Search providers, services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: ServiceCategory) => (
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
                  <SelectValue placeholder="Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories?.map((subcategory: ServiceSubcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* County Filter */}
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger>
                  <SelectValue placeholder="County" />
                </SelectTrigger>
                <SelectContent>
                  {counties?.map((county: any) => (
                    <SelectItem key={county.county} value={county.county}>
                      {county.county}
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
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  {areas?.map((area: any) => (
                    <SelectItem key={area.area} value={area.area}>
                      {area.area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
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
                {categories?.map((category: ServiceCategory) => (
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

        {/* Providers Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Service Providers
              {totalProviders > 0 && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({totalProviders} found)
                </span>
              )}
            </h2>
          </div>

          {providersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : providers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No providers found</h3>
                  <p>Try adjusting your search criteria or browse by category.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider: ServiceProvider) => (
                  <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {provider.businessName}
                            {provider.isVerified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {provider.description}
                          </CardDescription>
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
                          <span>{provider.phoneNumbers[0]}</span>
                        </div>

                        {/* Services */}
                        {provider.services && (
                          <div className="text-gray-600">
                            <span className="font-medium">Services:</span> {provider.services}
                          </div>
                        )}

                        {/* Rating and Stats */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {provider.totalViews}
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
                        <Button size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}