
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star, Play, Eye, Heart, Share2, TrendingUp, Award,
  Youtube, Instagram, Twitter, Users, DollarSign,
  Video, Camera, Edit3, CheckCircle, Clock
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface InfluencerReview {
  id: number;
  reviewId: string;
  title: string;
  content: string;
  rating: number;
  videoUrl?: string;
  images: string[];
  tags: string[];
  viewCount: number;
  likeCount: number;
  shareCount: number;
  publishedAt: string;
  status: string;
  influencer: {
    displayName: string;
    influencerCode: string;
    specialties: string[];
  };
}

interface Influencer {
  id: number;
  influencerCode: string;
  displayName: string;
  bio?: string;
  specialties: string[];
  platforms: {
    youtube?: { channelId: string; subscribers: number; };
    instagram?: { handle: string; followers: number; };
    tiktok?: { handle: string; followers: number; };
    twitter?: { handle: string; followers: number; };
  };
  commissionRate: string;
  totalEarnings: string;
  status: string;
}

export default function InfluencerHub() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reviews");
  const [isInfluencerModalOpen, setIsInfluencerModalOpen] = useState(false);
  const [influencerFormData, setInfluencerFormData] = useState({
    displayName: '',
    bio: '',
    specialties: [] as string[],
    platforms: {
      youtube: { channelId: '', subscribers: 0 },
      instagram: { handle: '', followers: 0 },
      tiktok: { handle: '', followers: 0 },
      twitter: { handle: '', followers: 0 }
    }
  });

  // Fetch influencer reviews
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<InfluencerReview[]>({
    queryKey: ['/api/social-commerce/influencers/reviews'],
  });

  // Check if user is already an influencer
  const { data: currentInfluencer } = useQuery<Influencer>({
    queryKey: ['/api/social-commerce/influencers/profile'],
    enabled: isAuthenticated
  });

  // Register as influencer mutation
  const registerInfluencerMutation = useMutation({
    mutationFn: async (data: typeof influencerFormData) => {
      const response = await fetch('/api/social-commerce/influencers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to register as influencer');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted!",
        description: "Your influencer application is under review. You'll hear back within 48 hours."
      });
      setIsInfluencerModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/social-commerce/influencers/profile'] });
    },
    onError: () => {
      toast({
        title: "Application failed",
        description: "Please check your details and try again.",
        variant: "destructive"
      });
    }
  });

  const handleRegisterInfluencer = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to apply as an influencer.",
        variant: "destructive"
      });
      return;
    }
    registerInfluencerMutation.mutate(influencerFormData);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return <Youtube className="w-4 h-4 text-red-600" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'twitter': return <Twitter className="w-4 h-4 text-blue-600" />;
      case 'tiktok': return <Video className="w-4 h-4 text-black" />;
      default: return null;
    }
  };

  const getFollowerCount = (platforms: Influencer['platforms']) => {
    return Object.values(platforms).reduce((total, platform) => {
      if ('subscribers' in platform) return total + platform.subscribers;
      if ('followers' in platform) return total + platform.followers;
      return total;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Influencer Hub</h1>
        <p className="text-gray-600 max-w-3xl">
          Connect with trusted car reviewers and automotive influencers. Get authentic reviews 
          and expert opinions to help make informed vehicle decisions.
        </p>
      </div>

      {/* Influencer Application CTA */}
      {isAuthenticated && !currentInfluencer && (
        <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Become a Car Review Influencer
                </h3>
                <p className="text-gray-600 mb-4">
                  Share your automotive expertise, build your following, and earn commissions 
                  for every successful referral.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Earn up to 5% commission</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>Verified badge</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Grow your audience</span>
                  </div>
                </div>
              </div>
              <Dialog open={isInfluencerModalOpen} onOpenChange={setIsInfluencerModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Apply to Become an Influencer</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Basic Information</h4>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <Input
                          placeholder="Your influencer/channel name"
                          value={influencerFormData.displayName}
                          onChange={(e) => setInfluencerFormData(prev => ({ 
                            ...prev, displayName: e.target.value 
                          }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <Textarea
                          placeholder="Tell us about your automotive expertise and content style..."
                          value={influencerFormData.bio}
                          onChange={(e) => setInfluencerFormData(prev => ({ 
                            ...prev, bio: e.target.value 
                          }))}
                        />
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Specialties</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Luxury Cars', 'Budget Cars', 'Electric Vehicles', 'SUVs', 'Sports Cars', 'Trucks', 'Motorcycles', 'Car Tech'].map(specialty => (
                          <label key={specialty} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={influencerFormData.specialties.includes(specialty)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setInfluencerFormData(prev => ({
                                    ...prev,
                                    specialties: [...prev.specialties, specialty]
                                  }));
                                } else {
                                  setInfluencerFormData(prev => ({
                                    ...prev,
                                    specialties: prev.specialties.filter(s => s !== specialty)
                                  }));
                                }
                              }}
                            />
                            <span className="text-sm">{specialty}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Social Platforms */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Social Media Platforms</h4>
                      
                      {/* YouTube */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">YouTube Channel ID</label>
                          <Input
                            placeholder="Channel ID"
                            value={influencerFormData.platforms.youtube.channelId}
                            onChange={(e) => setInfluencerFormData(prev => ({
                              ...prev,
                              platforms: {
                                ...prev.platforms,
                                youtube: { ...prev.platforms.youtube, channelId: e.target.value }
                              }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Subscribers</label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={influencerFormData.platforms.youtube.subscribers}
                            onChange={(e) => setInfluencerFormData(prev => ({
                              ...prev,
                              platforms: {
                                ...prev.platforms,
                                youtube: { ...prev.platforms.youtube, subscribers: parseInt(e.target.value) || 0 }
                              }
                            }))}
                          />
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Instagram Handle</label>
                          <Input
                            placeholder="@username"
                            value={influencerFormData.platforms.instagram.handle}
                            onChange={(e) => setInfluencerFormData(prev => ({
                              ...prev,
                              platforms: {
                                ...prev.platforms,
                                instagram: { ...prev.platforms.instagram, handle: e.target.value }
                              }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Followers</label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={influencerFormData.platforms.instagram.followers}
                            onChange={(e) => setInfluencerFormData(prev => ({
                              ...prev,
                              platforms: {
                                ...prev.platforms,
                                instagram: { ...prev.platforms.instagram, followers: parseInt(e.target.value) || 0 }
                              }
                            }))}
                          />
                        </div>
                      </div>

                      {/* TikTok */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">TikTok Handle</label>
                          <Input
                            placeholder="@username"
                            value={influencerFormData.platforms.tiktok.handle}
                            onChange={(e) => setInfluencerFormData(prev => ({
                              ...prev,
                              platforms: {
                                ...prev.platforms,
                                tiktok: { ...prev.platforms.tiktok, handle: e.target.value }
                              }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Followers</label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={influencerFormData.platforms.tiktok.followers}
                            onChange={(e) => setInfluencerFormData(prev => ({
                              ...prev,
                              platforms: {
                                ...prev.platforms,
                                tiktok: { ...prev.platforms.tiktok, followers: parseInt(e.target.value) || 0 }
                              }
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleRegisterInfluencer}
                      disabled={registerInfluencerMutation.isPending || !influencerFormData.displayName}
                      className="w-full"
                      size="lg"
                    >
                      {registerInfluencerMutation.isPending ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Influencer Status */}
      {currentInfluencer && (
        <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-green-600 text-white text-xl">
                    {currentInfluencer.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{currentInfluencer.displayName}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Influencer
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">Code: {currentInfluencer.influencerCode}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{getFollowerCount(currentInfluencer.platforms).toLocaleString()} total followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>KES {Number(currentInfluencer.totalEarnings).toLocaleString()} earned</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">Latest Reviews</TabsTrigger>
          <TabsTrigger value="top-influencers">Top Influencers</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsLoading ? (
              [...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))
            ) : reviews.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                <p className="text-gray-600">Check back later for expert car reviews</p>
              </div>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-gray-100 relative">
                    {review.videoUrl ? (
                      <div className="flex items-center justify-center h-full bg-black">
                        <Button size="lg" className="rounded-full w-16 h-16">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                    ) : review.images.length > 0 ? (
                      <img 
                        src={review.images[0]} 
                        alt={review.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Camera className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {review.rating}/5
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-purple-600 text-white">
                          {review.influencer.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{review.influencer.displayName}</span>
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-2 line-clamp-2">{review.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{review.content}</p>
                    
                    {/* Tags */}
                    {review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {review.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{review.viewCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{review.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          <span>{review.shareCount}</span>
                        </div>
                      </div>
                      <span>{format(new Date(review.publishedAt), 'MMM dd')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="top-influencers" className="mt-6">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">Top influencers leaderboard will be available soon</p>
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">Trending reviews and content will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
