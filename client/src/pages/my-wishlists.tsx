import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { useAuth } from '@/components/auth-provider';
import { Link } from 'wouter';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Fuel, 
  Heart, 
  Eye, 
  RefreshCw,
  AlertCircle,
  Search,
  X,
  Share2,
  MessageCircle,
  Plus,
  Trash2
} from 'lucide-react';

interface FavoriteListing {
  id: number;
  listingId: number;
  userId: string;
  createdAt: string;
  listing: {
    id: number;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    location: string;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType: string;
    exteriorColor: string;
    status: string;
    viewCount: number;
    favoriteCount: number;
    createdAt: string;
    images: string[];
  };
}

interface SavedSearch {
  id: number;
  userId: string;
  name: string;
  filters: {
    make?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    fuelType?: string;
    transmission?: string;
    bodyType?: string;
    location?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function MyWishlists() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'searches'>('favorites');
  
  const { data: favoritesData, isLoading: favoritesLoading, error: favoritesError, refetch: refetchFavorites } = useQuery<{favorites: FavoriteListing[]}>({
    queryKey: ['/api/user/favorites'],
    enabled: isAuthenticated,
  });

  const { data: savedSearchesData, isLoading: searchesLoading, error: searchesError, refetch: refetchSearches } = useQuery<{savedSearches: SavedSearch[]}>({
    queryKey: ['/api/user/saved-searches'],
    enabled: isAuthenticated,
  });

  const favorites = favoritesData?.favorites || [];
  const savedSearches = savedSearchesData?.savedSearches || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const removeFavorite = async (listingId: number) => {
    try {
      // TODO: Implement remove favorite API call
      console.log('Remove favorite:', listingId);
      refetchFavorites();
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const deleteSavedSearch = async (searchId: number) => {
    try {
      // TODO: Implement delete saved search API call
      console.log('Delete saved search:', searchId);
      refetchSearches();
    } catch (error) {
      console.error('Failed to delete saved search:', error);
    }
  };

  const runSavedSearch = (filters: any) => {
    // TODO: Navigate to buy-a-car page with filters applied
    console.log('Run saved search:', filters);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please sign in to view your wishlists.</p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">


        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'favorites'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorite Cars ({favorites?.length || 0})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('searches')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'searches'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Saved Searches ({savedSearches?.length || 0})
            </div>
          </button>
        </div>

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoritesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-6 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : favoritesError ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Favorites</h3>
                <p className="text-gray-600 mb-4">Failed to load your favorite cars. Please try again.</p>
                <Button onClick={() => refetchFavorites()} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            ) : !favorites || favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Favorites Yet</h3>
                <p className="text-gray-500 mb-6">
                  You haven't favorited any cars yet. Start browsing to find cars you love!
                </p>
                <Link href="/buy-a-car">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Cars
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite) => (
                  <Card key={favorite.id} className="group hover:shadow-lg transition-shadow duration-200">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
                      {favorite.listing.images && favorite.listing.images.length > 0 ? (
                        <img 
                          src={favorite.listing.images[0]} 
                          alt={favorite.listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Car className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <button
                        onClick={() => removeFavorite(favorite.listingId)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Favorited {formatDate(favorite.createdAt)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(favorite.listing.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {favorite.listing.title}
                      </h3>
                      
                      <div className="text-2xl font-bold text-purple-600 mb-3">
                        {formatCurrency(favorite.listing.price)}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Car className="h-4 w-4" />
                          <span>{favorite.listing.make} {favorite.listing.model} ({favorite.listing.year})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{favorite.listing.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Fuel className="h-4 w-4" />
                          <span>{favorite.listing.fuelType} • {favorite.listing.transmission}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{favorite.listing.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{favorite.listing.favoriteCount}</span>
                        </div>
                      </div>
                      
                      <Separator className="mb-4" />
                      
                      <div className="flex gap-2">
                        <Link href={`/buy-a-car/${favorite.listing.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // TODO: Implement share functionality
                            console.log('Share listing:', favorite.listing.id);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Searches Tab */}
        {activeTab === 'searches' && (
          <div>
            {searchesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-6 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchesError ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Saved Searches</h3>
                <p className="text-gray-600 mb-4">Failed to load your saved searches. Please try again.</p>
                <Button onClick={() => refetchSearches()} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            ) : !savedSearches || savedSearches.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Saved Searches Yet</h3>
                <p className="text-gray-500 mb-6">
                  You haven't saved any searches yet. Create custom searches to get notified about cars you're interested in!
                </p>
                <Link href="/buy-a-car">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Search
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSearches.map((search) => (
                  <Card key={search.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg">{search.name}</h3>
                        <button
                          onClick={() => deleteSavedSearch(search.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {search.filters.make && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Car className="h-4 w-4" />
                            <span>{search.filters.make} {search.filters.model || ''}</span>
                          </div>
                        )}
                        {(search.filters.minPrice || search.filters.maxPrice) && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>💰</span>
                            <span>
                              {search.filters.minPrice ? formatCurrency(search.filters.minPrice) : 'Any'} - {search.filters.maxPrice ? formatCurrency(search.filters.maxPrice) : 'Any'}
                            </span>
                          </div>
                        )}
                        {(search.filters.minYear || search.filters.maxYear) && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {search.filters.minYear || 'Any'} - {search.filters.maxYear || 'Any'}
                            </span>
                          </div>
                        )}
                        {search.filters.fuelType && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Fuel className="h-4 w-4" />
                            <span>{search.filters.fuelType}</span>
                          </div>
                        )}
                        {search.filters.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{search.filters.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-4">
                        Created: {formatDate(search.createdAt)}
                      </div>
                      
                      <Separator className="mb-4" />
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => runSavedSearch(search.filters)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          size="sm"
                        >
                          <Search className="h-4 w-4 mr-1" />
                          Run Search
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}