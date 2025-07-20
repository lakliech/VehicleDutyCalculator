import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Filter, 
  Save, 
  Bell, 
  X, 
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Heart,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedSearchProps {
  onFiltersChange?: (filters: any) => void;
  initialFilters?: any;
  className?: string;
}

interface SavedSearch {
  id: string;
  name: string;
  filters: any;
  alertsEnabled: boolean;
  createdAt: string;
}

export function AdvancedSearch({ onFiltersChange, initialFilters, className }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: 0,
    maxPrice: 10000000,
    minYear: 2000,
    maxYear: new Date().getFullYear(),
    fuelType: "",
    driveConfiguration: "",
    minEngineSize: 0,
    maxEngineSize: 5000,
    location: "",
    bodyType: "",
    condition: "",
    ...initialFilters
  });

  const { toast } = useToast();

  // Get filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/car-listing-filters'],
  });

  // Get saved searches
  const { data: savedSearches } = useQuery({
    queryKey: ['/api/saved-searches'],
  });

  // Natural language search processing
  const processNaturalSearch = (query: string) => {
    const newFilters = { ...filters };
    const words = query.toLowerCase().split(' ');
    
    // Extract make/model
    filterOptions?.makes?.forEach((make: string) => {
      if (words.includes(make.toLowerCase())) {
        newFilters.make = make;
      }
    });

    // Extract price hints - support "budget" keyword
    const priceMatch = query.match(/(?:under|budget)\s+(\d+(?:,?\d+)*(?:\.\d+)?)[mk]?/i);
    if (priceMatch) {
      const priceStr = priceMatch[1].replace(/,/g, ''); // Remove commas
      const price = parseFloat(priceStr);
      const fullMatch = priceMatch[0].toLowerCase();
      const multiplier = fullMatch.includes('k') ? 1000 : 
                        fullMatch.includes('m') ? 1000000 : 
                        (price < 1000 ? 1000 : 1); // Assume numbers like 700 mean 700,000
      newFilters.maxPrice = price * multiplier;
    }

    // Extract year hints
    const yearMatch = query.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      newFilters.minYear = parseInt(yearMatch[0]);
    }

    // Extract fuel type
    if (words.includes('petrol') || words.includes('gasoline')) newFilters.fuelType = 'petrol';
    if (words.includes('diesel')) newFilters.fuelType = 'diesel';
    if (words.includes('electric')) newFilters.fuelType = 'electric';
    if (words.includes('hybrid')) newFilters.fuelType = 'hybrid';

    // Extract condition hints
    if (words.includes('new') || words.includes('brand')) newFilters.condition = 'excellent';
    if (words.includes('used') || words.includes('second')) newFilters.condition = 'good';

    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Save search mutation
  const saveSearchMutation = useMutation({
    mutationFn: async (data: { name: string; filters: any; alertsEnabled: boolean }) => {
      return apiRequest('POST', '/api/saved-searches', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-searches'] });
      toast({ title: "Search saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save search", variant: "destructive" });
    }
  });

  // Delete saved search mutation
  const deleteSearchMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/saved-searches/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-searches'] });
      toast({ title: "Search deleted" });
    }
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        // Try smart search first
        const response = await apiRequest('POST', '/api/smart-search-parse', { query: searchQuery });
        const result = await response.json();
        
        if (result.filters) {
          // Convert the API response format to match our filter structure
          const newFilters = {
            ...filters,
            search: result.filters.search || '', // Clear search if smart search extracted filters
            make: result.filters.make?.[0] || filters.make,
            model: result.filters.model?.[0] || filters.model,
            minPrice: result.filters.minPrice || filters.minPrice,
            maxPrice: result.filters.maxPrice || filters.maxPrice,
            minYear: result.filters.minYear || filters.minYear,
            maxYear: result.filters.maxYear || filters.maxYear,
            fuelType: result.filters.fuelType?.[0] || filters.fuelType,
            bodyType: result.filters.bodyType?.[0] || filters.bodyType,
          };
          
          setFilters(newFilters);
          onFiltersChange?.(newFilters);
          
          // Clear the search input after applying smart search
          if (result.explanation) {
            setSearchQuery('');
            toast({ 
              title: "Smart Search Applied",
              description: result.explanation 
            });
          }
        }
      } catch (error) {
        // Fall back to basic search if smart search fails
        processNaturalSearch(searchQuery);
      }
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      make: "",
      model: "",
      minPrice: 0,
      maxPrice: 10000000,
      minYear: 2000,
      maxYear: new Date().getFullYear(),
      fuelType: "",
      driveConfiguration: "",
      minEngineSize: 0,
      maxEngineSize: 5000,
      location: "",
      bodyType: "",
      condition: ""
    };
    setFilters(defaultFilters);
    setSearchQuery("");
    onFiltersChange?.(defaultFilters);
  };

  const loadSavedSearch = (savedSearch: SavedSearch) => {
    setFilters(savedSearch.filters);
    onFiltersChange?.(savedSearch.filters);
    setShowSavedSearches(false);
    toast({ title: `Loaded search: ${savedSearch.name}` });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Natural Language Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Try: 'budget 700,000' or 'Red Toyota under 2M' or 'Diesel 4WD 2020'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="bg-gradient-to-r from-purple-600 to-cyan-500">
          Search
        </Button>
        <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Dialog open={showSavedSearches} onOpenChange={setShowSavedSearches}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Saved Searches
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your Saved Searches</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {savedSearches?.map((search: SavedSearch) => (
                <Card key={search.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{search.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Created {new Date(search.createdAt).toLocaleDateString()}
                      </p>
                      {search.alertsEnabled && (
                        <Badge variant="secondary" className="mt-1">
                          <Bell className="h-3 w-3 mr-1" />
                          Alerts On
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => loadSavedSearch(search)}
                      >
                        Load
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteSearchMutation.mutate(search.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              {(!savedSearches || savedSearches.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  No saved searches yet. Set up some filters and save them!
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <Card className="p-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              Advanced Filters
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const searchName = prompt("Enter a name for this search:");
                  if (searchName) {
                    saveSearchMutation.mutate({
                      name: searchName,
                      filters,
                      alertsEnabled: false
                    });
                  }
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Make & Model */}
              <div className="space-y-2">
                <Label>Make</Label>
                <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
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

              <div className="space-y-2">
                <Label>Fuel Type</Label>
                <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any fuel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any fuel</SelectItem>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Drive Configuration</Label>
                <Select value={filters.driveConfiguration} onValueChange={(value) => handleFilterChange('driveConfiguration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any drive" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any drive</SelectItem>
                    <SelectItem value="2WD">2WD</SelectItem>
                    <SelectItem value="4WD">4WD</SelectItem>
                    <SelectItem value="AWD">AWD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range (KES)</Label>
              <div className="px-3">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => {
                    handleFilterChange('minPrice', min);
                    handleFilterChange('maxPrice', max);
                  }}
                  max={15000000}
                  min={0}
                  step={100000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>KES {filters.minPrice.toLocaleString()}</span>
                <span>KES {filters.maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-3">
              <Label>Year Range</Label>
              <div className="px-3">
                <Slider
                  value={[filters.minYear, filters.maxYear]}
                  onValueChange={([min, max]) => {
                    handleFilterChange('minYear', min);
                    handleFilterChange('maxYear', max);
                  }}
                  max={new Date().getFullYear()}
                  min={1990}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filters.minYear}</span>
                <span>{filters.maxYear}</span>
              </div>
            </div>

            {/* Engine Size Range */}
            <div className="space-y-3">
              <Label>Engine Size (cc)</Label>
              <div className="px-3">
                <Slider
                  value={[filters.minEngineSize, filters.maxEngineSize]}
                  onValueChange={([min, max]) => {
                    handleFilterChange('minEngineSize', min);
                    handleFilterChange('maxEngineSize', max);
                  }}
                  max={6000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filters.minEngineSize}cc</span>
                <span>{filters.maxEngineSize}cc</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {Object.values(filters).some(value => value !== "" && value !== 0 && value !== 10000000 && value !== 2000 && value !== new Date().getFullYear() && value !== 5000) && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium">Active filters:</span>
          {filters.make && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('make', '')}>
              {filters.make} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.fuelType && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('fuelType', '')}>
              {filters.fuelType} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.driveConfiguration && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('driveConfiguration', '')}>
              {filters.driveConfiguration} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {(filters.minPrice > 0 || filters.maxPrice < 10000000) && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => {
              handleFilterChange('minPrice', 0);
              handleFilterChange('maxPrice', 10000000);
            }}>
              KES {filters.minPrice.toLocaleString()} - {filters.maxPrice.toLocaleString()} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}