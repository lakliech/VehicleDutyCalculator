
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, Package, Clock, TrendingUp, Ship, Calculator,
  Globe, MapPin, Car, Calendar, CheckCircle, AlertCircle,
  DollarSign, Percent, Tag, Star
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface GroupBuy {
  id: number;
  groupBuyId: string;
  title: string;
  description?: string;
  vehicleSpecs: {
    make: string;
    model: string;
    year: number;
    engineSize?: string;
    fuelType?: string;
    transmission?: string;
    features?: string[];
  };
  targetQuantity: number;
  minQuantity: number;
  currentQuantity: number;
  pricePerUnit: string;
  discountPercentage: string;
  endDate: string;
  deliveryEstimate?: string;
  status: string;
  importDetails?: {
    sourceCountry: string;
    port: string;
    estimatedShippingCost: number;
    estimatedDutyTaxes: number;
    totalLandedCost: number;
  };
  participantCount: number;
  totalCommitted: number;
  organizerId: string;
}

export default function GroupBuying() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [selectedGroupBuy, setSelectedGroupBuy] = useState<GroupBuy | null>(null);
  const [joinQuantity, setJoinQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({
    color: '',
    additionalFeatures: [] as string[],
    specialRequests: ''
  });

  // Fetch active group buys
  const { data: groupBuys = [], isLoading } = useQuery<GroupBuy[]>({
    queryKey: ['/api/social-commerce/group-buys/active'],
  });

  // Join group buy mutation
  const joinGroupBuyMutation = useMutation({
    mutationFn: async ({ groupBuyId, quantity, customizations }: {
      groupBuyId: string;
      quantity: number;
      customizations: any;
    }) => {
      const response = await fetch(`/api/social-commerce/group-buys/${groupBuyId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ quantity, customizations })
      });
      if (!response.ok) throw new Error('Failed to join group buy');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully joined!",
        description: "You've been added to the group buy. Payment details will be sent shortly."
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-commerce/group-buys/active'] });
      setSelectedGroupBuy(null);
    },
    onError: () => {
      toast({
        title: "Failed to join",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  });

  const handleJoinGroupBuy = (groupBuy: GroupBuy) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to join group buys.",
        variant: "destructive"
      });
      return;
    }
    setSelectedGroupBuy(groupBuy);
  };

  const submitJoin = () => {
    if (selectedGroupBuy) {
      joinGroupBuyMutation.mutate({
        groupBuyId: selectedGroupBuy.groupBuyId,
        quantity: joinQuantity,
        customizations
      });
    }
  };

  const calculateProgress = (groupBuy: GroupBuy) => {
    return Math.min((groupBuy.currentQuantity / groupBuy.targetQuantity) * 100, 100);
  };

  const getStatusColor = (status: string, progress: number, endDate: string) => {
    if (new Date(endDate) < new Date()) return 'bg-gray-500';
    if (status === 'successful') return 'bg-green-500';
    if (progress >= 100) return 'bg-blue-500';
    if (progress >= 70) return 'bg-orange-500';
    return 'bg-purple-500';
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Buying</h1>
        <p className="text-gray-600 max-w-3xl">
          Join others to buy vehicles in bulk and save money through group purchasing power. 
          Perfect for fleet purchases, family cars, or investment opportunities.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{groupBuys.length}</div>
            <div className="text-sm text-gray-600">Active Group Buys</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {groupBuys.reduce((sum, gb) => sum + gb.participantCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Car className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {groupBuys.reduce((sum, gb) => sum + gb.currentQuantity, 0)}
            </div>
            <div className="text-sm text-gray-600">Vehicles Committed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Percent className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {groupBuys.length > 0 ? 
                Math.round(groupBuys.reduce((sum, gb) => sum + parseFloat(gb.discountPercentage), 0) / groupBuys.length) 
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg. Discount</div>
          </CardContent>
        </Card>
      </div>

      {/* Group Buys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupBuys.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Group Buys</h3>
            <p className="text-gray-600">Check back later for new group buying opportunities</p>
          </div>
        ) : (
          groupBuys.map((groupBuy) => {
            const progress = calculateProgress(groupBuy);
            const isExpired = new Date(groupBuy.endDate) < new Date();
            const daysLeft = formatDistanceToNow(new Date(groupBuy.endDate), { addSuffix: true });

            return (
              <Card key={groupBuy.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header with Status */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getStatusColor(groupBuy.status, progress, groupBuy.endDate)} text-white`}>
                      {isExpired ? 'Expired' : 
                       progress >= 100 ? 'Target Reached' :
                       progress >= 70 ? 'Almost There' : 'Active'}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      {groupBuy.participantCount} participants
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{groupBuy.title}</h3>
                  <p className="text-sm text-gray-600">
                    {groupBuy.vehicleSpecs.year} {groupBuy.vehicleSpecs.make} {groupBuy.vehicleSpecs.model}
                  </p>
                </div>

                <CardContent className="p-4">
                  {/* Vehicle Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>From {groupBuy.importDetails?.sourceCountry || 'Import'}</span>
                    </div>
                    
                    {groupBuy.vehicleSpecs.engineSize && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Car className="w-4 h-4" />
                        <span>{groupBuy.vehicleSpecs.engineSize} • {groupBuy.vehicleSpecs.fuelType}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{groupBuy.currentQuantity}/{groupBuy.targetQuantity} units</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Min: {groupBuy.minQuantity}</span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-green-600">
                        KES {Number(groupBuy.pricePerUnit).toLocaleString()}
                      </span>
                      {parseFloat(groupBuy.discountPercentage) > 0 && (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          -{groupBuy.discountPercentage}% discount
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      Per unit • Total value: KES {(Number(groupBuy.pricePerUnit) * groupBuy.targetQuantity).toLocaleString()}
                    </div>
                  </div>

                  {/* Time Left */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span className={isExpired ? 'text-red-600' : ''}>
                      {isExpired ? 'Expired' : `Ends ${daysLeft}`}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        onClick={() => handleJoinGroupBuy(groupBuy)}
                        disabled={isExpired || !isAuthenticated}
                        variant={progress >= 100 ? "outline" : "default"}
                      >
                        {!isAuthenticated ? 'Sign In to Join' :
                         isExpired ? 'Expired' :
                         progress >= 100 ? 'View Details' :
                         'Join Group Buy'}
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Join Group Buy: {selectedGroupBuy?.title}</DialogTitle>
                      </DialogHeader>
                      
                      {selectedGroupBuy && (
                        <div className="space-y-6">
                          {/* Vehicle Summary */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Vehicle Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Make & Model:</span>
                                <p className="font-medium">
                                  {selectedGroupBuy.vehicleSpecs.year} {selectedGroupBuy.vehicleSpecs.make} {selectedGroupBuy.vehicleSpecs.model}
                                </p>
                              </div>
                              {selectedGroupBuy.vehicleSpecs.engineSize && (
                                <div>
                                  <span className="text-gray-600">Engine:</span>
                                  <p className="font-medium">{selectedGroupBuy.vehicleSpecs.engineSize}</p>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-600">Price per unit:</span>
                                <p className="font-medium text-green-600">
                                  KES {Number(selectedGroupBuy.pricePerUnit).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Source:</span>
                                <p className="font-medium">{selectedGroupBuy.importDetails?.sourceCountry || 'Import'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Quantity Selection */}
                          <div>
                            <label className="block text-sm font-medium mb-2">Quantity</label>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={joinQuantity}
                              onChange={(e) => setJoinQuantity(parseInt(e.target.value) || 1)}
                            />
                          </div>

                          {/* Customizations */}
                          <div className="space-y-4">
                            <h4 className="font-medium">Customization Preferences (Optional)</h4>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Preferred Color</label>
                              <Input
                                placeholder="e.g., White, Black, Silver"
                                value={customizations.color}
                                onChange={(e) => setCustomizations(prev => ({ ...prev, color: e.target.value }))}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Special Requests</label>
                              <Textarea
                                placeholder="Any specific requirements or modifications..."
                                value={customizations.specialRequests}
                                onChange={(e) => setCustomizations(prev => ({ ...prev, specialRequests: e.target.value }))}
                              />
                            </div>
                          </div>

                          {/* Cost Breakdown */}
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium mb-2">Cost Breakdown</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Vehicle cost ({joinQuantity} × KES {Number(selectedGroupBuy.pricePerUnit).toLocaleString()})</span>
                                <span className="font-medium">
                                  KES {(joinQuantity * Number(selectedGroupBuy.pricePerUnit)).toLocaleString()}
                                </span>
                              </div>
                              {selectedGroupBuy.importDetails && (
                                <>
                                  <div className="flex justify-between">
                                    <span>Est. shipping per unit</span>
                                    <span>KES {(selectedGroupBuy.importDetails.estimatedShippingCost / selectedGroupBuy.targetQuantity).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Est. duties & taxes per unit</span>
                                    <span>KES {(selectedGroupBuy.importDetails.estimatedDutyTaxes / selectedGroupBuy.targetQuantity).toLocaleString()}</span>
                                  </div>
                                  <div className="border-t pt-1 mt-1">
                                    <div className="flex justify-between font-medium">
                                      <span>Total estimated cost</span>
                                      <span>KES {((joinQuantity * selectedGroupBuy.importDetails.totalLandedCost) / selectedGroupBuy.targetQuantity).toLocaleString()}</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Join Button */}
                          <Button
                            onClick={submitJoin}
                            disabled={joinGroupBuyMutation.isPending}
                            className="w-full"
                            size="lg"
                          >
                            {joinGroupBuyMutation.isPending ? 'Joining...' : 'Confirm & Join Group Buy'}
                          </Button>
                          
                          <p className="text-xs text-gray-500 text-center">
                            By joining, you commit to purchase {joinQuantity} unit(s) if the minimum quantity is reached.
                            Payment will be required within 7 days of target achievement.
                          </p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
