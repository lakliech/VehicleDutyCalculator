import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  DollarSign, 
  BarChart3, 
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import type { AdPosition, Advertisement, AdPlacement } from "@shared/schema";

interface AdPositionWithStats extends AdPosition {
  activeAds?: number;
  totalRevenue?: number;
}

interface AdvertisementWithPlacements extends Advertisement {
  placements?: AdPlacement[];
}

export default function AdminAdvertisements() {
  const [selectedTab, setSelectedTab] = useState("positions");
  const [selectedPosition, setSelectedPosition] = useState<AdPosition | null>(null);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: positions, isLoading: positionsLoading } = useQuery({
    queryKey: ['/api/advertisements/positions'],
    queryFn: () => apiRequest('GET', '/api/advertisements/positions').then(res => res.json())
  });

  const { data: advertisementsData, isLoading: adsLoading } = useQuery({
    queryKey: ['/api/advertisements/advertisements'],
    queryFn: () => apiRequest('GET', '/api/advertisements/advertisements').then(res => res.json())
  });

  // Mutations
  const createPositionMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/advertisements/positions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/positions'] });
      toast({ title: "Position created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create position", variant: "destructive" });
    }
  });

  const updateAdStatusMutation = useMutation({
    mutationFn: ({ id, status, rejectionReason }: { id: number, status: string, rejectionReason?: string }) => 
      apiRequest('PATCH', `/api/advertisements/advertisements/${id}/status`, { status, rejectionReason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/advertisements'] });
      toast({ title: "Advertisement status updated" });
    },
    onError: () => {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  });

  const createPlacementMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/advertisements/placements', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/advertisements'] });
      toast({ title: "Placement created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create placement", variant: "destructive" });
    }
  });

  // Status badge colors
  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary", icon: Clock },
      approved: { variant: "default", icon: CheckCircle },
      active: { variant: "default", icon: Play },
      paused: { variant: "outline", icon: Pause },
      rejected: { variant: "destructive", icon: XCircle },
      completed: { variant: "secondary", icon: CheckCircle }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleCreatePosition = (formData: FormData) => {
    const data = {
      positionName: formData.get('positionName'),
      displayName: formData.get('displayName'),
      description: formData.get('description'),
      dimensions: formData.get('dimensions'),
      location: formData.get('location'),
      maxAdsSimultaneous: parseInt(formData.get('maxAdsSimultaneous') as string),
      pricePerDay: parseFloat(formData.get('pricePerDay') as string),
      pricePerWeek: parseFloat(formData.get('pricePerWeek') as string),
      pricePerMonth: parseFloat(formData.get('pricePerMonth') as string),
      isActive: formData.get('isActive') === 'true',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0
    };
    
    createPositionMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Advertisement Management</h1>
          <p className="text-gray-600 mt-2">Manage ad positions, campaigns, and placements across the platform</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="positions" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ad Positions
            </TabsTrigger>
            <TabsTrigger value="advertisements" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Advertisements
            </TabsTrigger>
            <TabsTrigger value="placements" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Placements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* AD POSITIONS TAB */}
          <TabsContent value="positions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Ad Positions</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Position
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Ad Position</DialogTitle>
                  </DialogHeader>
                  
                  <form action={handleCreatePosition} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="positionName">Position Name</Label>
                        <Input 
                          id="positionName" 
                          name="positionName" 
                          placeholder="e.g., header_banner" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input 
                          id="displayName" 
                          name="displayName" 
                          placeholder="e.g., Header Banner" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="Describe where this ad appears and its purpose" 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dimensions">Dimensions</Label>
                        <Input 
                          id="dimensions" 
                          name="dimensions" 
                          placeholder="e.g., 728x90" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Select name="location" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="homepage">Homepage</SelectItem>
                            <SelectItem value="buy_cars">Buy Cars Page</SelectItem>
                            <SelectItem value="sell_cars">Sell Cars Page</SelectItem>
                            <SelectItem value="duty_calculator">Duty Calculator</SelectItem>
                            <SelectItem value="all_pages">All Pages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="pricePerDay">Price per Day (KES)</Label>
                        <Input 
                          id="pricePerDay" 
                          name="pricePerDay" 
                          type="number" 
                          step="0.01"
                          min="1"
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="pricePerWeek">Price per Week (KES)</Label>
                        <Input 
                          id="pricePerWeek" 
                          name="pricePerWeek" 
                          type="number" 
                          step="0.01"
                          min="1"
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="pricePerMonth">Price per Month (KES)</Label>
                        <Input 
                          id="pricePerMonth" 
                          name="pricePerMonth" 
                          type="number" 
                          step="0.01"
                          min="1"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maxAdsSimultaneous">Max Simultaneous Ads</Label>
                        <Input 
                          id="maxAdsSimultaneous" 
                          name="maxAdsSimultaneous" 
                          type="number" 
                          min="1"
                          defaultValue="1"
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="sortOrder">Sort Order</Label>
                        <Input 
                          id="sortOrder" 
                          name="sortOrder" 
                          type="number" 
                          min="0"
                          defaultValue="0"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="isActive" 
                        name="isActive" 
                        value="true"
                        defaultChecked 
                        className="rounded"
                      />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button type="submit" disabled={createPositionMutation.isPending}>
                        {createPositionMutation.isPending ? "Creating..." : "Create Position"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {positionsLoading ? (
                <div className="col-span-full text-center py-8">Loading positions...</div>
              ) : positions?.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No ad positions created yet. Create your first position to get started.
                </div>
              ) : (
                positions?.map((position: AdPositionWithStats) => (
                  <Card key={position.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{position.displayName}</CardTitle>
                          <p className="text-sm text-gray-500 mt-1">{position.positionName}</p>
                        </div>
                        <Badge variant={position.isActive ? "default" : "secondary"}>
                          {position.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">{position.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Monitor className="h-4 w-4" />
                            {position.dimensions}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </span>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Pricing</h4>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">Daily</span>
                              <div className="font-medium">KES {parseFloat(position.pricePerDay).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Weekly</span>
                              <div className="font-medium">KES {parseFloat(position.pricePerWeek).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Monthly</span>
                              <div className="font-medium">KES {parseFloat(position.pricePerMonth).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm text-gray-500">
                            Max: {position.maxAdsSimultaneous} ad{position.maxAdsSimultaneous > 1 ? 's' : ''}
                          </span>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* ADVERTISEMENTS TAB */}
          <TabsContent value="advertisements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Advertisements</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Advertiser</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adsLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading advertisements...
                      </TableCell>
                    </TableRow>
                  ) : advertisementsData?.advertisements?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No advertisements found. Advertisements will appear here once submitted.
                      </TableCell>
                    </TableRow>
                  ) : (
                    advertisementsData?.advertisements?.map((ad: Advertisement) => (
                      <TableRow key={ad.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ad.adTitle}</div>
                            <div className="text-sm text-gray-500">{ad.campaignName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ad.advertiserName}</div>
                            <div className="text-sm text-gray-500">{ad.advertiserEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">KES {parseFloat(ad.totalBudget).toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{ad.costModel}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(ad.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(ad.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            {ad.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm"
                                  onClick={() => updateAdStatusMutation.mutate({ id: ad.id, status: 'approved' })}
                                  disabled={updateAdStatusMutation.isPending}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => updateAdStatusMutation.mutate({ id: ad.id, status: 'rejected', rejectionReason: 'Requires review' })}
                                  disabled={updateAdStatusMutation.isPending}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* PLACEMENTS TAB */}
          <TabsContent value="placements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Ad Placements</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Placement
              </Button>
            </div>

            <div className="text-center py-8 text-gray-500">
              Placements management interface will be implemented here.
              This will show scheduled ad placements across different positions.
            </div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Advertisement Analytics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Monitor className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-gray-500">Total Impressions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">KES 0</div>
                      <div className="text-sm text-gray-500">Revenue Generated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">0%</div>
                      <div className="text-sm text-gray-500">Click-through Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Play className="h-8 w-8 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-gray-500">Active Campaigns</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center py-8 text-gray-500">
              Detailed analytics charts and reports will be displayed here.
              This will include performance metrics, revenue tracking, and audience insights.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}