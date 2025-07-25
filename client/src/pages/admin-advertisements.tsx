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
  Tablet,
  Upload,
  X
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
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeUploadedImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  // Queries
  const { data: positions, isLoading: positionsLoading } = useQuery({
    queryKey: ['/api/advertisements/positions'],
    queryFn: () => apiRequest('GET', '/api/advertisements/positions').then(res => res.json())
  });

  const { data: advertisementsData, isLoading: adsLoading } = useQuery({
    queryKey: ['/api/advertisements/advertisements'],
    queryFn: () => apiRequest('GET', '/api/advertisements/advertisements').then(res => res.json())
  });

  const { data: floatingAdsData, isLoading: floatingAdsLoading } = useQuery({
    queryKey: ['/api/advertisements/floating-ads/active'],
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

  // Ad position mutations
  const updatePositionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => 
      apiRequest('PUT', `/api/advertisements/positions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/positions'] });
      toast({ title: "Ad position updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update ad position", variant: "destructive" });
    }
  });

  // Advertisement mutations
  const updateAdvertisementMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => 
      apiRequest('PUT', `/api/advertisements/advertisements/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/advertisements'] });
      toast({ title: "Advertisement updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update advertisement", variant: "destructive" });
    }
  });

  // Floating ad mutations
  const updateFloatingAdMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => 
      apiRequest('PUT', `/api/advertisements/floating-ads/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/floating-ads/active'] });
      toast({ title: "Floating ad updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update floating ad", variant: "destructive" });
    }
  });

  const toggleFloatingAdMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('PATCH', `/api/advertisements/floating-ads/${id}/toggle`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/floating-ads/active'] });
      toast({ title: "Floating ad status updated" });
    },
    onError: () => {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  });

  const deleteFloatingAdMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/advertisements/floating-ads/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/advertisements/floating-ads/active'] });
      toast({ title: "Floating ad deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete floating ad", variant: "destructive" });
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
          <TabsList className="grid w-full grid-cols-5">
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
            <TabsTrigger value="floating" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Floating Ads
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
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleCreatePosition(formData);
                  }} className="space-y-4">
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
                            Max: {position.maxAdsSimultaneous || 0} ad{(position.maxAdsSimultaneous || 0) > 1 ? 's' : ''}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Ad Position</DialogTitle>
                              </DialogHeader>
                              
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target as HTMLFormElement);
                                const data = {
                                  positionName: formData.get('positionName'),
                                  description: formData.get('description'),
                                  dimensions: formData.get('dimensions'),
                                  location: formData.get('location'),
                                  pricePerDay: parseFloat(formData.get('pricePerDay') as string),
                                  pricePerWeek: parseFloat(formData.get('pricePerWeek') as string),
                                  pricePerMonth: parseFloat(formData.get('pricePerMonth') as string),
                                  maxAdsPerDay: parseInt(formData.get('maxAdsPerDay') as string),
                                  isActive: formData.get('isActive') === 'true',
                                };
                                
                                updatePositionMutation.mutate({ id: position.id, data });
                              }} className="space-y-4">
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="editPositionName">Position Name</Label>
                                    <Input id="editPositionName" name="positionName" defaultValue={position.positionName} required />
                                  </div>
                                  <div>
                                    <Label htmlFor="editLocation">Location</Label>
                                    <Input id="editLocation" name="location" defaultValue={position.location} required />
                                  </div>
                                </div>
                                
                                <div>
                                  <Label htmlFor="editDescription">Description</Label>
                                  <Textarea id="editDescription" name="description" defaultValue={position.description || ''} />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="editDimensions">Dimensions</Label>
                                    <Input id="editDimensions" name="dimensions" defaultValue={position.dimensions} required />
                                  </div>
                                  <div>
                                    <Label htmlFor="editMaxAds">Max Ads Per Day</Label>
                                    <Input id="editMaxAds" name="maxAdsPerDay" type="number" defaultValue={position.maxAdsPerDay} required />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label htmlFor="editPriceDay">Price Per Day</Label>
                                    <Input id="editPriceDay" name="pricePerDay" type="number" step="0.01" defaultValue={position.pricePerDay} required />
                                  </div>
                                  <div>
                                    <Label htmlFor="editPriceWeek">Price Per Week</Label>
                                    <Input id="editPriceWeek" name="pricePerWeek" type="number" step="0.01" defaultValue={position.pricePerWeek} required />
                                  </div>
                                  <div>
                                    <Label htmlFor="editPriceMonth">Price Per Month</Label>
                                    <Input id="editPriceMonth" name="pricePerMonth" type="number" step="0.01" defaultValue={position.pricePerMonth} required />
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="editIsActive" name="isActive" value="true" defaultChecked={position.isActive} />
                                  <Label htmlFor="editIsActive">Active</Label>
                                </div>
                                
                                <div className="flex justify-end gap-2">
                                  <Button type="submit" disabled={updatePositionMutation.isPending}>
                                    {updatePositionMutation.isPending ? 'Updating...' : 'Update Position'}
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
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
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Advertisement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Advertisement</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      
                      try {
                        let adImageUrl = '';
                        
                        // Upload image if file is selected
                        if (uploadedImage) {
                          const imageFormData = new FormData();
                          imageFormData.append('image', uploadedImage);
                          
                          try {
                            const uploadResponse = await apiRequest('POST', '/api/advertisements/upload-image', imageFormData);
                            const uploadResult = await uploadResponse.json();
                            adImageUrl = uploadResult.imageUrl;
                            toast({ title: "Image uploaded successfully" });
                          } catch (uploadError: any) {
                            throw new Error(`Image upload failed: ${uploadError.message}`);
                          }
                        }
                        
                        const formData = new FormData(e.target as HTMLFormElement);
                        const data = {
                          advertiserName: formData.get('advertiserName') as string,
                          advertiserEmail: formData.get('advertiserEmail') as string,
                          campaignName: formData.get('campaignName') as string,
                          adTitle: formData.get('adTitle') as string,
                          adDescription: formData.get('adDescription') as string,
                          adImageUrl: adImageUrl, // Use uploaded image URL
                          adTargetUrl: formData.get('adTargetUrl') as string,
                          adType: formData.get('adType') as string,
                          targetAudience: [formData.get('targetAudience') as string],
                          totalBudget: parseFloat(formData.get('totalBudget') as string),
                          dailyBudget: parseFloat(formData.get('dailyBudget') as string),
                          costModel: formData.get('costModel') as string,
                          startDate: formData.get('startDate') as string,
                          endDate: formData.get('endDate') as string,
                          status: 'pending'
                        };
                        
                        await apiRequest('POST', '/api/advertisements/advertisements', data);
                        
                        toast({ title: "Success", description: "Advertisement created successfully" });
                        queryClient.invalidateQueries({ queryKey: ['/api/advertisements/advertisements'] });
                        
                        // Reset form and image state
                        (e.target as HTMLFormElement).reset();
                        setUploadedImage(null);
                        setImagePreview(null);
                        
                      } catch (error: any) {
                        toast({ 
                          title: "Error", 
                          description: `Failed to create advertisement: ${error.message}`, 
                          variant: "destructive" 
                        });
                      }
                    }} className="space-y-6">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="advertiserName">Advertiser Name</Label>
                          <Input id="advertiserName" name="advertiserName" required />
                        </div>
                        <div>
                          <Label htmlFor="advertiserEmail">Advertiser Email</Label>
                          <Input id="advertiserEmail" name="advertiserEmail" type="email" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="campaignName">Campaign Name</Label>
                          <Input id="campaignName" name="campaignName" required />
                        </div>
                        <div>
                          <Label htmlFor="adTitle">Ad Title</Label>
                          <Input id="adTitle" name="adTitle" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="adDescription">Ad Description</Label>
                        <Textarea id="adDescription" name="adDescription" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="adImage">Advertisement Image</Label>
                          <div className="space-y-4">
                            {!imagePreview ? (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                <label htmlFor="adImage" className="cursor-pointer">
                                  <span className="text-sm text-gray-600">
                                    Click to upload an image or drag and drop
                                  </span>
                                  <Input
                                    id="adImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                  />
                                </label>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                              </div>
                            ) : (
                              <div className="relative">
                                <img
                                  src={imagePreview}
                                  alt="Advertisement preview"
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                                <button
                                  type="button"
                                  onClick={removeUploadedImage}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="adTargetUrl">Target URL</Label>
                          <Input id="adTargetUrl" name="adTargetUrl" placeholder="https://example.com/landing" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="adType">Ad Type</Label>
                          <Select name="adType" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="banner">Banner</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="native">Native</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="targetAudience">Target Audience</Label>
                          <Select name="targetAudience" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="car_buyers">Car Buyers</SelectItem>
                              <SelectItem value="car_sellers">Car Sellers</SelectItem>
                              <SelectItem value="dealers">Dealers</SelectItem>
                              <SelectItem value="general">General</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="costModel">Cost Model</Label>
                          <Select name="costModel" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cpm">CPM</SelectItem>
                              <SelectItem value="cpc">CPC</SelectItem>
                              <SelectItem value="cpa">CPA</SelectItem>
                              <SelectItem value="fixed">Fixed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="totalBudget">Total Budget (KES)</Label>
                          <Input id="totalBudget" name="totalBudget" type="number" step="0.01" min="1" required />
                        </div>
                        <div>
                          <Label htmlFor="dailyBudget">Daily Budget (KES)</Label>
                          <Input id="dailyBudget" name="dailyBudget" type="number" step="0.01" min="1" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input id="startDate" name="startDate" type="date" required />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input id="endDate" name="endDate" type="date" required />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => {}}>Cancel</Button>
                        <Button type="submit">Create Advertisement</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Advertisement Details</DialogTitle>
                                </DialogHeader>
                                
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Campaign Name</Label>
                                      <p className="text-sm text-gray-700">{ad.campaignName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Advertiser</Label>
                                      <p className="text-sm text-gray-700">{ad.advertiserName}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm font-medium">Ad Title</Label>
                                    <p className="text-sm text-gray-700">{ad.adTitle}</p>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm font-medium">Description</Label>
                                    <p className="text-sm text-gray-700">{ad.adDescription}</p>
                                  </div>
                                  
                                  {ad.adImageUrl && (
                                    <div>
                                      <Label className="text-sm font-medium">Advertisement Image</Label>
                                      <img src={ad.adImageUrl} alt={ad.adTitle} className="max-w-full h-32 object-cover rounded border mt-2" />
                                    </div>
                                  )}
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Target URL</Label>
                                      <p className="text-sm text-blue-600 break-all">{ad.adTargetUrl}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Total Budget</Label>
                                      <p className="text-sm text-gray-700">KES {parseFloat(ad.totalBudget).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Status</Label>
                                      <Badge variant={ad.status === 'approved' ? 'default' : ad.status === 'rejected' ? 'destructive' : 'secondary'}>
                                        {ad.status}
                                      </Badge>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Start Date</Label>
                                      <p className="text-sm text-gray-700">{ad.startDate ? new Date(ad.startDate).toLocaleDateString() : 'Not set'}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">End Date</Label>
                                      <p className="text-sm text-gray-700">{ad.endDate ? new Date(ad.endDate).toLocaleDateString() : 'Not set'}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Advertisement</DialogTitle>
                                </DialogHeader>
                                
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  const formData = new FormData(e.target as HTMLFormElement);
                                  const data = {
                                    campaignName: formData.get('campaignName'),
                                    adTitle: formData.get('adTitle'),
                                    adDescription: formData.get('adDescription'),
                                    adImageUrl: formData.get('adImageUrl'),
                                    adTargetUrl: formData.get('adTargetUrl'),
                                    totalBudget: parseFloat(formData.get('totalBudget') as string),
                                    startDate: formData.get('startDate'),
                                    endDate: formData.get('endDate'),
                                  };
                                  
                                  updateAdvertisementMutation.mutate({ id: ad.id, data });
                                }} className="space-y-4">
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="editCampaignName">Campaign Name</Label>
                                      <Input id="editCampaignName" name="campaignName" defaultValue={ad.campaignName} required />
                                    </div>
                                    <div>
                                      <Label htmlFor="editTotalBudget">Total Budget</Label>
                                      <Input id="editTotalBudget" name="totalBudget" type="number" step="0.01" defaultValue={ad.totalBudget} required />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="editAdTitle">Ad Title</Label>
                                    <Input id="editAdTitle" name="adTitle" defaultValue={ad.adTitle} required />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="editAdDescription">Ad Description</Label>
                                    <Textarea id="editAdDescription" name="adDescription" defaultValue={ad.adDescription} required />
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="editAdImageUrl">Image URL</Label>
                                      <Input id="editAdImageUrl" name="adImageUrl" defaultValue={ad.adImageUrl || ''} />
                                    </div>
                                    <div>
                                      <Label htmlFor="editAdTargetUrl">Target URL</Label>
                                      <Input id="editAdTargetUrl" name="adTargetUrl" defaultValue={ad.adTargetUrl} required />
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="editStartDate">Start Date</Label>
                                      <Input 
                                        id="editStartDate" 
                                        name="startDate" 
                                        type="date" 
                                        defaultValue={ad.startDate ? new Date(ad.startDate).toISOString().split('T')[0] : ''} 
                                        required 
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="editEndDate">End Date</Label>
                                      <Input 
                                        id="editEndDate" 
                                        name="endDate" 
                                        type="date" 
                                        defaultValue={ad.endDate ? new Date(ad.endDate).toISOString().split('T')[0] : ''} 
                                        required 
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end gap-2">
                                    <Button type="submit" disabled={updateAdvertisementMutation.isPending}>
                                      {updateAdvertisementMutation.isPending ? 'Updating...' : 'Update Advertisement'}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            
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

          {/* FLOATING ADS TAB */}
          <TabsContent value="floating" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Floating Ads</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Floating Ad
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Create New Floating Ad</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = {
                      advertisementId: parseInt(formData.get('advertisementId') as string),
                      positionX: formData.get('positionX'),
                      positionY: formData.get('positionY'),
                      width: formData.get('width'),
                      height: formData.get('height'),
                      hideDuration: parseInt(formData.get('hideDuration') as string),
                      showDelay: parseInt(formData.get('showDelay') as string) || 0,
                      startTime: formData.get('startTime'),
                      endTime: formData.get('endTime'),
                      triggerEvent: formData.get('triggerEvent'),
                      isCloseable: formData.get('isCloseable') === 'true',
                      enterAnimation: formData.get('enterAnimation'),
                      exitAnimation: formData.get('exitAnimation'),
                    };
                    
                    // Create floating ad via specific endpoint
                    apiRequest('POST', '/api/advertisements/floating-ads', data)
                      .then(() => {
                        toast({ title: "Success", description: "Floating ad created successfully" });
                        queryClient.invalidateQueries({ queryKey: ['/api/advertisements/floating-ads/active'] });
                      })
                      .catch((error) => {
                        toast({ title: "Error", description: `Failed to create floating ad: ${error.message}`, variant: "destructive" });
                      });
                  }} className="space-y-6">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="advertisementId">Advertisement</Label>
                        <Select name="advertisementId" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select advertisement" />
                          </SelectTrigger>
                          <SelectContent>
                            {advertisementsData?.advertisements?.filter((ad: Advertisement) => ad.status === 'active').map((ad: Advertisement) => (
                              <SelectItem key={ad.id} value={ad.id.toString()}>
                                {ad.adTitle} - {ad.campaignName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="advertisementId">Advertisement</Label>
                        <Select name="advertisementId" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select advertisement" />
                          </SelectTrigger>
                          <SelectContent>
                            {advertisementsData?.advertisements?.map((ad: Advertisement) => (
                              <SelectItem key={ad.id} value={ad.id.toString()}>
                                {ad.adTitle} - {ad.campaignName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="triggerEvent">Trigger Event</Label>
                        <Select name="triggerEvent" defaultValue="page_load">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="page_load">Page Load</SelectItem>
                            <SelectItem value="scroll">Scroll</SelectItem>
                            <SelectItem value="time_spent">Time Spent</SelectItem>
                            <SelectItem value="exit_intent">Exit Intent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="positionX">Position X</Label>
                        <Select name="positionX" defaultValue="right">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="positionY">Position Y</Label>
                        <Select name="positionY" defaultValue="center">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">Top</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="bottom">Bottom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="width">Width</Label>
                        <Input 
                          name="width" 
                          placeholder="300px or 50%" 
                          defaultValue="300px"
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input 
                          name="height" 
                          placeholder="400px or auto" 
                          defaultValue="400px"
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="showDelay">Show Delay (seconds)</Label>
                        <Input 
                          name="showDelay" 
                          type="number" 
                          min="0" 
                          defaultValue="3"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="hideDuration">Hide Duration (seconds)</Label>
                        <Input 
                          name="hideDuration" 
                          type="number" 
                          min="5" 
                          max="300" 
                          defaultValue="30"
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="isCloseable">Can be Closed</Label>
                        <Select name="isCloseable" defaultValue="true">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="enterAnimation">Enter Animation</Label>
                        <Select name="enterAnimation" defaultValue="fade">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fade">Fade</SelectItem>
                            <SelectItem value="slide-up">Slide Up</SelectItem>
                            <SelectItem value="slide-down">Slide Down</SelectItem>
                            <SelectItem value="bounce">Bounce</SelectItem>
                            <SelectItem value="zoom">Zoom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="exitAnimation">Exit Animation</Label>
                        <Select name="exitAnimation" defaultValue="fade">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fade">Fade</SelectItem>
                            <SelectItem value="slide-up">Slide Up</SelectItem>
                            <SelectItem value="slide-down">Slide Down</SelectItem>
                            <SelectItem value="zoom-out">Zoom Out</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input 
                          name="startTime" 
                          type="datetime-local" 
                          defaultValue={new Date().toISOString().slice(0, 16)}
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Input 
                          name="endTime" 
                          type="datetime-local" 
                          defaultValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                          required 
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="submit" disabled={createPlacementMutation.isPending}>
                        {createPlacementMutation.isPending ? 'Creating...' : 'Create Floating Ad'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Active Floating Ads Display */}
            <Card>
              <CardHeader>
                <CardTitle>Active Floating Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {floatingAdsData && floatingAdsData.length > 0 ? (
                    floatingAdsData.map((floatingAd: any) => (
                      <div key={floatingAd.floating_ads.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{floatingAd.advertisements.adTitle}</h4>
                            <p className="text-sm text-gray-600">{floatingAd.advertisements.campaignName}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={floatingAd.floating_ads.isActive ? "default" : "secondary"}>
                              {floatingAd.floating_ads.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Position:</span>
                            <div className="font-medium">{floatingAd.floating_ads.positionX}, {floatingAd.floating_ads.positionY}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Size:</span>
                            <div className="font-medium">{floatingAd.floating_ads.width} × {floatingAd.floating_ads.height}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <div className="font-medium">{floatingAd.floating_ads.hideDuration}s</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Trigger:</span>
                            <div className="font-medium">{floatingAd.floating_ads.triggerEvent}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Active Period:</span>
                            <div className="font-medium">
                              {new Date(floatingAd.floating_ads.startTime).toLocaleDateString()} - {new Date(floatingAd.floating_ads.endTime).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Animations:</span>
                            <div className="font-medium">{floatingAd.floating_ads.enterAnimation} → {floatingAd.floating_ads.exitAnimation}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Edit Floating Ad</DialogTitle>
                              </DialogHeader>
                              
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target as HTMLFormElement);
                                const data = {
                                  advertisementId: parseInt(formData.get('advertisementId') as string),
                                  positionX: formData.get('positionX'),
                                  positionY: formData.get('positionY'),
                                  width: formData.get('width'),
                                  height: formData.get('height'),
                                  hideDuration: parseInt(formData.get('hideDuration') as string),
                                  showDelay: parseInt(formData.get('showDelay') as string) || 0,
                                  startTime: formData.get('startTime'),
                                  endTime: formData.get('endTime'),
                                  triggerEvent: formData.get('triggerEvent'),
                                  isCloseable: formData.get('isCloseable') === 'true',
                                  enterAnimation: formData.get('enterAnimation'),
                                  exitAnimation: formData.get('exitAnimation'),
                                  imageUrl: formData.get('imageUrl'),
                                };
                                
                                updateFloatingAdMutation.mutate({ id: floatingAd.floating_ads.id, data });
                              }} className="space-y-4">
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="editAdvertisementId">Advertisement</Label>
                                    <Select name="advertisementId" defaultValue={floatingAd.floating_ads.advertisementId?.toString()}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {advertisementsData?.advertisements?.map((ad: Advertisement) => (
                                          <SelectItem key={ad.id} value={ad.id.toString()}>
                                            {ad.adTitle} - {ad.campaignName}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="editImageUrl">Image URL</Label>
                                    <Input id="editImageUrl" name="imageUrl" defaultValue={floatingAd.floating_ads.imageUrl || ''} />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-4 gap-4">
                                  <div>
                                    <Label>Position X</Label>
                                    <Select name="positionX" defaultValue={floatingAd.floating_ads.positionX}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="left">Left</SelectItem>
                                        <SelectItem value="center">Center</SelectItem>
                                        <SelectItem value="right">Right</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Position Y</Label>
                                    <Select name="positionY" defaultValue={floatingAd.floating_ads.positionY}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="top">Top</SelectItem>
                                        <SelectItem value="center">Center</SelectItem>
                                        <SelectItem value="bottom">Bottom</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Width</Label>
                                    <Input name="width" defaultValue={floatingAd.floating_ads.width} />
                                  </div>
                                  <div>
                                    <Label>Height</Label>
                                    <Input name="height" defaultValue={floatingAd.floating_ads.height} />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Show Delay (seconds)</Label>
                                    <Input name="showDelay" type="number" defaultValue={floatingAd.floating_ads.showDelay} />
                                  </div>
                                  <div>
                                    <Label>Display Duration (seconds)</Label>
                                    <Input name="hideDuration" type="number" defaultValue={floatingAd.floating_ads.hideDuration} />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Start Time</Label>
                                    <Input name="startTime" type="datetime-local" defaultValue={new Date(floatingAd.floating_ads.startTime).toISOString().slice(0, 16)} />
                                  </div>
                                  <div>
                                    <Label>End Time</Label>
                                    <Input name="endTime" type="datetime-local" defaultValue={new Date(floatingAd.floating_ads.endTime).toISOString().slice(0, 16)} />
                                  </div>
                                </div>
                                
                                <div className="flex justify-end gap-2">
                                  <Button type="submit" disabled={updateFloatingAdMutation.isPending}>
                                    {updateFloatingAdMutation.isPending ? 'Updating...' : 'Update Floating Ad'}
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant={floatingAd.floating_ads.isActive ? "secondary" : "default"} 
                            size="sm"
                            onClick={() => toggleFloatingAdMutation.mutate(floatingAd.floating_ads.id)}
                            disabled={toggleFloatingAdMutation.isPending}
                          >
                            {floatingAd.floating_ads.isActive ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                            {floatingAd.floating_ads.isActive ? "Pause" : "Activate"}
                          </Button>
                          
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this floating ad? This action cannot be undone.')) {
                                deleteFloatingAdMutation.mutate(floatingAd.floating_ads.id);
                              }
                            }}
                            disabled={deleteFloatingAdMutation.isPending}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No floating ads found. Create your first floating ad to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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