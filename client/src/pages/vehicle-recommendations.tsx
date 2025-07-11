import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Eye, MessageCircle, TrendingUp, Clock, MapPin, Fuel, Cog, Calendar } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Mock user for testing (replace with actual auth)
const MOCK_USER_ID = 'user-123';

type VehicleRecommendation = {
  id: number;
  recommendationType: string;
  confidenceScore: number;
  relevanceScore: number;
  reasonDescription: string;
  isViewed: boolean;
  isClicked: boolean;
  isFavorited: boolean;
  isContactedSeller: boolean;
  generatedAt: string;
  listing: {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    engineSize: number;
    fuelType: string;
    transmission: string;
    location: string;
    bodyType: string;
    mileage: number;
    mainImage: string;
    description: string;
  };
};

type UserPreferences = {
  makePreferences: string;
  priceRangeMin: number;
  priceRangeMax: number;
  preferredYearMin: number;
  preferredYearMax: number;
  engineSizePreferences: string;
  fuelTypePreferences: string;
  bodyTypePreferences: string;
  transmissionPreferences: string;
  locationPreferences: string;
  avgViewTime: number;
  searchFrequency: number;
  priceFlexibility: number;
  confidenceScore: number;
  sampleSize: number;
  lastAnalyzedAt: string;
};

type BrowsingHistory = {
  id: number;
  actionType: string;
  entityType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehiclePrice: number;
  createdAt: string;
  timeSpent: number;
};

export default function VehicleRecommendations() {
  const [selectedTab, setSelectedTab] = useState('recommendations');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user recommendations
  const { data: recommendations = [], isLoading: recommendationsLoading } = useQuery({
    queryKey: ['/api/recommendations/user-recommendations'],
    queryFn: () => apiRequest('GET', '/api/recommendations/user-recommendations', null, {
      'x-user-id': MOCK_USER_ID
    }),
    refetchInterval: 60000, // Refetch every minute
  });

  // Fetch user preferences
  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['/api/recommendations/preferences'],
    queryFn: () => apiRequest('GET', '/api/recommendations/preferences', null, {
      'x-user-id': MOCK_USER_ID
    }),
  });

  // Fetch browsing history
  const { data: browsingHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ['/api/recommendations/browsing-history'],
    queryFn: () => apiRequest('GET', '/api/recommendations/browsing-history?limit=50', null, {
      'x-user-id': MOCK_USER_ID
    }),
  });

  // Generate recommendations mutation
  const generateRecommendationsMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/recommendations/generate', {}, {
      'x-user-id': MOCK_USER_ID
    }),
    onSuccess: () => {
      toast({
        title: "Recommendations Generated",
        description: "Your personalized vehicle recommendations have been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations/user-recommendations'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Analyze preferences mutation
  const analyzePreferencesMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/recommendations/analyze-preferences', {}, {
      'x-user-id': MOCK_USER_ID
    }),
    onSuccess: () => {
      toast({
        title: "Preferences Updated",
        description: "Your vehicle preferences have been analyzed and updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations/preferences'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to analyze preferences. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Track recommendation engagement
  const trackEngagement = async (recommendationId: number, engagement: any) => {
    try {
      await apiRequest('POST', `/api/recommendations/${recommendationId}/engagement`, engagement, {
        'x-user-id': MOCK_USER_ID
      });
    } catch (error) {
      console.error('Failed to track engagement:', error);
    }
  };

  // Simulate browsing behavior for demo
  const simulateBrowsing = async () => {
    const sampleBehaviors = [
      {
        actionType: 'view_listing',
        entityType: 'listing',
        entityId: '1',
        vehicleMake: 'Toyota',
        vehicleModel: 'Camry',
        vehicleYear: 2020,
        vehiclePrice: 1500000,
        vehicleLocation: 'Nairobi',
        vehicleFuelType: 'petrol',
        vehicleBodyType: 'sedan',
        vehicleTransmission: 'automatic',
        timeSpent: 45,
        deviceType: 'desktop',
      },
      {
        actionType: 'search',
        entityType: 'search_results',
        searchQuery: 'Toyota Camry automatic',
        appliedFilters: JSON.stringify({ make: 'Toyota', transmission: 'automatic' }),
        deviceType: 'desktop',
      },
      {
        actionType: 'view_listing',
        entityType: 'listing',
        entityId: '2',
        vehicleMake: 'Honda',
        vehicleModel: 'Civic',
        vehicleYear: 2019,
        vehiclePrice: 1200000,
        vehicleLocation: 'Nairobi',
        vehicleFuelType: 'petrol',
        vehicleBodyType: 'sedan',
        vehicleTransmission: 'manual',
        timeSpent: 30,
        deviceType: 'desktop',
      },
    ];

    try {
      for (const behavior of sampleBehaviors) {
        await apiRequest('POST', '/api/recommendations/track-behavior', behavior, {
          'x-user-id': MOCK_USER_ID
        });
      }
      toast({
        title: "Demo Data Added",
        description: "Sample browsing behavior has been tracked for demonstration.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations/browsing-history'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to simulate browsing behavior.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendationTypeColor = (type: string) => {
    switch (type) {
      case 'similar_to_viewed': return 'bg-blue-100 text-blue-800';
      case 'price_match': return 'bg-green-100 text-green-800';
      case 'make_preference': return 'bg-purple-100 text-purple-800';
      case 'new_listing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationTypeLabel = (type: string) => {
    switch (type) {
      case 'similar_to_viewed': return 'Similar to Viewed';
      case 'price_match': return 'Price Match';
      case 'make_preference': return 'Make Preference';
      case 'new_listing': return 'New Listing';
      default: return type;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Recommendations</h1>
        <p className="text-gray-600">Personalized vehicle recommendations based on your browsing behavior and preferences</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="history">Browsing History</TabsTrigger>
          <TabsTrigger value="demo">Demo Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Recommendations</h2>
            <Button
              onClick={() => generateRecommendationsMutation.mutate()}
              disabled={generateRecommendationsMutation.isPending}
              className="bg-[#740a72] hover:bg-[#580554]"
            >
              {generateRecommendationsMutation.isPending ? 'Generating...' : 'Generate New Recommendations'}
            </Button>
          </div>

          {recommendationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recommendations.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Recommendations Yet</h3>
                <p className="text-sm">Start browsing vehicles to get personalized recommendations</p>
              </div>
              <Button 
                onClick={simulateBrowsing}
                className="bg-[#740a72] hover:bg-[#580554]"
              >
                Add Demo Data
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((recommendation: VehicleRecommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={recommendation.listing.mainImage || '/api/placeholder/400/200'}
                      alt={`${recommendation.listing.make} ${recommendation.listing.model}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={getRecommendationTypeColor(recommendation.recommendationType)}>
                        {getRecommendationTypeLabel(recommendation.recommendationType)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center space-x-1 text-white text-sm">
                        <Progress value={recommendation.confidenceScore} className="w-12 h-2" />
                        <span>{recommendation.confidenceScore}% match</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">
                        {recommendation.listing.make} {recommendation.listing.model}
                      </h3>
                      <span className="text-2xl font-bold text-[#740a72]">
                        {formatCurrency(recommendation.listing.price)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{recommendation.listing.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Cog className="h-3 w-3" />
                        <span>{recommendation.listing.engineSize}cc</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Fuel className="h-3 w-3" />
                        <span>{recommendation.listing.fuelType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{recommendation.listing.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {recommendation.reasonDescription}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            trackEngagement(recommendation.id, { isViewed: true });
                          }}
                          className={recommendation.isViewed ? 'bg-blue-50 text-blue-700' : ''}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            trackEngagement(recommendation.id, { isFavorited: !recommendation.isFavorited });
                          }}
                          className={recommendation.isFavorited ? 'bg-red-50 text-red-700' : ''}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {recommendation.isFavorited ? 'Liked' : 'Like'}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          trackEngagement(recommendation.id, { isContactedSeller: true });
                        }}
                        className="bg-[#740a72] hover:bg-[#580554]"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Vehicle Preferences</h2>
            <Button
              onClick={() => analyzePreferencesMutation.mutate()}
              disabled={analyzePreferencesMutation.isPending}
              className="bg-[#740a72] hover:bg-[#580554]"
            >
              {analyzePreferencesMutation.isPending ? 'Analyzing...' : 'Analyze Preferences'}
            </Button>
          </div>

          {preferencesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4" />
                  <div className="h-8 bg-gray-200 rounded" />
                </Card>
              ))}
            </div>
          ) : !preferences ? (
            <Card className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Preferences Analysis Yet</h3>
                <p className="text-sm">Browse some vehicles to build your preference profile</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Price Range Preferences
                    <Badge className="bg-green-100 text-green-800">
                      {preferences.confidenceScore}% Confident
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Price Range</label>
                      <div className="text-lg font-semibold text-[#740a72]">
                        {formatCurrency(preferences.priceRangeMin)} - {formatCurrency(preferences.priceRangeMax)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Price Flexibility</label>
                      <div className="flex items-center space-x-2">
                        <Progress value={preferences.priceFlexibility} className="flex-1" />
                        <span className="text-sm">{preferences.priceFlexibility}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Make Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {preferences.makePreferences && Object.entries(JSON.parse(preferences.makePreferences)).map(([make, score]) => (
                      <div key={make} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{make}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={score as number} className="w-20" />
                          <span className="text-sm">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Year Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Preferred Year Range</label>
                      <div className="text-lg font-semibold">
                        {preferences.preferredYearMin} - {preferences.preferredYearMax}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Browsing Behavior</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Average View Time</label>
                      <div className="text-lg font-semibold">{preferences.avgViewTime} seconds</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Search Frequency</label>
                      <div className="text-lg font-semibold">{preferences.searchFrequency} searches/week</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Sample Size</label>
                      <div className="text-lg font-semibold">{preferences.sampleSize} interactions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Browsing History</h2>
            <p className="text-gray-600">Your recent vehicle browsing activity</p>
          </div>

          {historyLoading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <Card key={i} className="p-4 animate-pulse">
                  <div className="flex space-x-4">
                    <div className="h-16 w-16 bg-gray-200 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : browsingHistory.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <Clock className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Browsing History</h3>
                <p className="text-sm">Start browsing vehicles to see your history here</p>
              </div>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {browsingHistory.map((item: BrowsingHistory) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {item.actionType.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        {item.vehicleMake && (
                          <div className="mb-2">
                            <h4 className="font-medium">
                              {item.vehicleMake} {item.vehicleModel} {item.vehicleYear}
                            </h4>
                            {item.vehiclePrice && (
                              <p className="text-sm text-gray-600">
                                {formatCurrency(item.vehiclePrice)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      {item.timeSpent && (
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Time spent</div>
                          <div className="font-medium">{item.timeSpent}s</div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="demo" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Demo Actions</h2>
            <p className="text-gray-600">Test the recommendation system with sample data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simulate Browsing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Add sample browsing behavior to test the recommendation engine
                </p>
                <Button
                  onClick={simulateBrowsing}
                  className="bg-[#740a72] hover:bg-[#580554]"
                >
                  Add Demo Browsing Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generate Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Generate personalized recommendations based on your preferences
                </p>
                <Button
                  onClick={() => generateRecommendationsMutation.mutate()}
                  disabled={generateRecommendationsMutation.isPending}
                  className="bg-[#740a72] hover:bg-[#580554]"
                >
                  {generateRecommendationsMutation.isPending ? 'Generating...' : 'Generate Recommendations'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}