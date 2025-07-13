import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  RefreshCw,
  Car,
  User,
  Edit,
  CheckCircle,
  X,
  Flag,
  StickyNote,
  Star,
  Upload,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Settings
} from "lucide-react";

export default function AdminListingDetails() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State for editing - Basic fields
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editNegotiable, setEditNegotiable] = useState(false);
  
  // State for editing - Vehicle details
  const [editMake, setEditMake] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editMileage, setEditMileage] = useState("");
  const [editTransmission, setEditTransmission] = useState("");
  const [editFuelType, setEditFuelType] = useState("");
  const [editEngineSize, setEditEngineSize] = useState("");
  const [editDriveType, setEditDriveType] = useState("");
  const [editBodyType, setEditBodyType] = useState("");
  const [editExteriorColor, setEditExteriorColor] = useState("");
  const [editInteriorColor, setEditInteriorColor] = useState("");
  const [editCondition, setEditCondition] = useState("");
  const [editVinNumber, setEditVinNumber] = useState("");
  const [editRegistrationNumber, setEditRegistrationNumber] = useState("");

  // State for meta fields
  const [metaStatus, setMetaStatus] = useState("");
  const [metaFeatured, setMetaFeatured] = useState(false);
  const [metaVerified, setMetaVerified] = useState(false);
  const [metaExpirationDate, setMetaExpirationDate] = useState("");
  const [metaListingSource, setMetaListingSource] = useState("");
  const [metaSellerId, setMetaSellerId] = useState("");
  const [metaAdminNotes, setMetaAdminNotes] = useState("");

  // State for dialogs
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  // State for approval/rejection
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [flagReason, setFlagReason] = useState("");
  const [adminNote, setAdminNote] = useState("");

  // Fetch listing data - force fresh data
  const { data: listingData, isLoading, error } = useQuery({
    queryKey: ['/api/admin/listing-details', id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/admin/listing-details/${id}`);
      return await response.json();
    },
    enabled: !!id,
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Don't cache the response
  });

  // Fetch available users for reassignment
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/admin/users-management');
      return await response.json();
    },
  });

  const availableUsers = usersData?.users?.map((item: any) => item.user) || [];

  // Initialize form data when listing loads
  useEffect(() => {
    if (listingData && !isLoading) {
      // Basic fields
      setEditTitle(listingData.title || "");
      setEditDescription(listingData.description || "");
      setEditPrice(listingData.price?.toString() || "");
      setEditLocation(listingData.location || "");
      setEditNegotiable(Boolean(listingData.negotiable));
      
      // Vehicle details
      setEditMake(listingData.make || "");
      setEditModel(listingData.model || "");
      setEditYear(listingData.year?.toString() || "");
      setEditMileage(listingData.mileage?.toString() || "");
      setEditTransmission(listingData.transmission || "");
      setEditFuelType(listingData.fuelType || "");
      setEditEngineSize(listingData.engineSize?.toString() || "");
      setEditDriveType(listingData.driveConfiguration || "");
      setEditBodyType(listingData.bodyType || "");
      setEditExteriorColor(listingData.exteriorColor || "");
      setEditInteriorColor(listingData.interiorColor || "");
      setEditCondition(listingData.condition || "");
      setEditVinNumber(listingData.vinNumber || "");
      setEditRegistrationNumber(listingData.registrationNumber || "");
      
      // Meta fields
      setMetaStatus(listingData.status || "pending");
      setMetaFeatured(Boolean(listingData.featured));
      setMetaVerified(Boolean(listingData.isVerified));
      setMetaExpirationDate(listingData.expirationDate ? new Date(listingData.expirationDate).toISOString().split('T')[0] : "");
      setMetaListingSource(listingData.listingSource || "user-submitted");
      setMetaSellerId(listingData.sellerId || "");
      setMetaAdminNotes(listingData.adminNotes || "");
    }
  }, [listingData, isLoading]);

  // Mutations
  const updateMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/admin/listings/${id}`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Listing updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
    },
    onError: () => toast({ title: "Error", description: "Failed to update listing", variant: "destructive" }),
  });

  const metaMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/admin/listings/${id}/meta`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Meta fields updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
    },
    onError: () => toast({ title: "Error", description: "Failed to update meta fields", variant: "destructive" }),
  });

  const mediaMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', `/api/admin/listings/${id}/media`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Media updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
      setIsMediaOpen(false);
    },
    onError: () => toast({ title: "Error", description: "Failed to update media", variant: "destructive" }),
  });

  const approveMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/admin/listing/${id}/approve`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Listing approved successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
      setIsApproveOpen(false);
    },
    onError: () => toast({ title: "Error", description: "Failed to approve listing", variant: "destructive" }),
  });

  const rejectMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/admin/listing/${id}/reject`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Listing rejected successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
      setIsRejectOpen(false);
    },
    onError: () => toast({ title: "Error", description: "Failed to reject listing", variant: "destructive" }),
  });

  const flagMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/admin/listing/${id}/flag`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Listing flagged successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
      setIsFlagOpen(false);
    },
    onError: () => toast({ title: "Error", description: "Failed to flag listing", variant: "destructive" }),
  });

  const addNoteMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', `/api/admin/listing/${id}/note`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Note added successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listing-details', id] });
      setIsNoteOpen(false);
      setAdminNote("");
    },
    onError: () => toast({ title: "Error", description: "Failed to add note", variant: "destructive" }),
  });

  // Helper functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not set';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-yellow-500",
      active: "bg-green-500",
      verified: "bg-blue-500",
      rejected: "bg-red-500",
      archived: "bg-gray-500",
    };
    return <Badge className={variants[status] || "bg-gray-500"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Error loading listing details</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-4">The requested listing could not be found.</p>
          <Button onClick={() => navigate('/admin')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Listing Details</h1>
            <p className="text-gray-600">Complete information about this listing</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(listingData.status)}
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Listing Images */}
            {listingData.images && listingData.images.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Images</CardTitle>
                    <Button 
                      onClick={() => setIsMediaOpen(true)}
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Manage Media
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listingData.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${listingData.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vehicle Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="text-lg font-semibold">{listingData.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Make</label>
                    <p className="text-sm">{listingData.make}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Model</label>
                    <p className="text-sm">{listingData.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Year</label>
                    <p className="text-sm">{listingData.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Price</label>
                    <p className="text-lg font-bold text-purple-600">{formatPrice(listingData.price)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Engine Size</label>
                    <p className="text-sm">{listingData.engineSize}cc</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mileage</label>
                    <p className="text-sm">{listingData.mileage?.toLocaleString()} km</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fuel Type</label>
                    <p className="text-sm capitalize">{listingData.fuelType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Body Type</label>
                    <p className="text-sm capitalize">{listingData.bodyType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Transmission</label>
                    <p className="text-sm capitalize">{listingData.transmission}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Exterior Color</label>
                    <p className="text-sm capitalize">{listingData.exteriorColor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Interior Color</label>
                    <p className="text-sm capitalize">{listingData.interiorColor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Condition</label>
                    <p className="text-sm capitalize">{listingData.condition}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-sm">{listingData.location}</p>
                </div>
                
                {listingData.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-sm">{listingData.description}</p>
                  </div>
                )}
                
                {listingData.features && listingData.features.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Features</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {listingData.features.map((feature: string, index: number) => (
                        <Badge key={index} variant="secondary">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-sm">{listingData.seller?.firstName} {listingData.seller?.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-sm">{listingData.seller?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-sm">{listingData.seller?.phoneNumber}</p>
                </div>
                {listingData.whatsappNumber && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                    <p className="text-sm">{listingData.whatsappNumber}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">Created At</label>
                  <p className="text-sm">{formatDate(listingData.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">User Status</label>
                  <p className="text-sm">{listingData.seller?.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email Verified</label>
                  <p className="text-sm">{listingData.seller?.isEmailVerified ? 'Yes' : 'No'}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Primary Actions Card - Edit and Flag at top */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Primary Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Listing
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Listing</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-purple-900">Basic Information</h3>
                          
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Enter listing title"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              placeholder="Enter listing description"
                              rows={4}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="price">Price (KES)</Label>
                              <Input
                                id="price"
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                placeholder="Enter price"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                value={editLocation}
                                onChange={(e) => setEditLocation(e.target.value)}
                                placeholder="Enter location"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="negotiable"
                              checked={editNegotiable}
                              onCheckedChange={setEditNegotiable}
                            />
                            <Label htmlFor="negotiable">Price is negotiable</Label>
                          </div>
                        </div>

                        {/* Vehicle Details */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-purple-900">Vehicle Details</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="make">Make</Label>
                              <Input
                                id="make"
                                value={editMake}
                                onChange={(e) => setEditMake(e.target.value)}
                                placeholder="e.g., Toyota"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="model">Model</Label>
                              <Input
                                id="model"
                                value={editModel}
                                onChange={(e) => setEditModel(e.target.value)}
                                placeholder="e.g., Camry"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="year">Year of Manufacture</Label>
                              <Input
                                id="year"
                                type="number"
                                value={editYear}
                                onChange={(e) => setEditYear(e.target.value)}
                                placeholder="e.g., 2020"
                                min="1990"
                                max={new Date().getFullYear()}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="mileage">Mileage (km)</Label>
                              <Input
                                id="mileage"
                                type="number"
                                value={editMileage}
                                onChange={(e) => setEditMileage(e.target.value)}
                                placeholder="e.g., 50000"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="transmission">Transmission</Label>
                              <Select value={editTransmission} onValueChange={setEditTransmission}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select transmission" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="automatic">Automatic</SelectItem>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="cvt">CVT</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor="fuelType">Fuel Type</Label>
                              <Select value={editFuelType} onValueChange={setEditFuelType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="petrol">Petrol</SelectItem>
                                  <SelectItem value="diesel">Diesel</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                  <SelectItem value="electric">Electric</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="engineSize">Engine Size (CC)</Label>
                              <Input
                                id="engineSize"
                                type="number"
                                value={editEngineSize}
                                onChange={(e) => setEditEngineSize(e.target.value)}
                                placeholder="e.g., 1800"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="driveType">Drive Type</Label>
                              <Select value={editDriveType} onValueChange={setEditDriveType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select drive type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2WD">2WD</SelectItem>
                                  <SelectItem value="4WD">4WD</SelectItem>
                                  <SelectItem value="AWD">AWD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="bodyType">Body Type</Label>
                            <Select value={editBodyType} onValueChange={setEditBodyType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sedan">Sedan</SelectItem>
                                <SelectItem value="suv">SUV</SelectItem>
                                <SelectItem value="hatchback">Hatchback</SelectItem>
                                <SelectItem value="wagon">Wagon</SelectItem>
                                <SelectItem value="coupe">Coupe</SelectItem>
                                <SelectItem value="convertible">Convertible</SelectItem>
                                <SelectItem value="pickup">Pickup</SelectItem>
                                <SelectItem value="van">Van</SelectItem>
                                <SelectItem value="minivan">Minivan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="exteriorColor">Exterior Color</Label>
                              <Input
                                id="exteriorColor"
                                value={editExteriorColor}
                                onChange={(e) => setEditExteriorColor(e.target.value)}
                                placeholder="e.g., White"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="interiorColor">Interior Color</Label>
                              <Input
                                id="interiorColor"
                                value={editInteriorColor}
                                onChange={(e) => setEditInteriorColor(e.target.value)}
                                placeholder="e.g., Black"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="condition">Condition</Label>
                            <Select value={editCondition} onValueChange={setEditCondition}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="used">Used</SelectItem>
                                <SelectItem value="locally-used">Locally Used</SelectItem>
                                <SelectItem value="foreign-used">Foreign Used</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="vinNumber">VIN/Chassis Number</Label>
                            <Input
                              id="vinNumber"
                              value={editVinNumber}
                              onChange={(e) => setEditVinNumber(e.target.value)}
                              placeholder="Enter VIN or chassis number"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="registrationNumber">Registration Number (Optional)</Label>
                            <Input
                              id="registrationNumber"
                              value={editRegistrationNumber}
                              onChange={(e) => setEditRegistrationNumber(e.target.value)}
                              placeholder="Enter registration number"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => {
                              updateMutation.mutate({
                                // Basic fields
                                title: editTitle,
                                description: editDescription,
                                price: parseFloat(editPrice) || 0,
                                negotiable: editNegotiable,
                                location: editLocation,
                                // Vehicle details
                                make: editMake,
                                model: editModel,
                                year: parseInt(editYear) || null,
                                mileage: parseInt(editMileage) || null,
                                transmission: editTransmission,
                                fuelType: editFuelType,
                                engineSize: parseInt(editEngineSize) || null,
                                driveConfiguration: editDriveType,
                                bodyType: editBodyType,
                                exteriorColor: editExteriorColor,
                                interiorColor: editInteriorColor,
                                condition: editCondition,
                                vinNumber: editVinNumber,
                                registrationNumber: editRegistrationNumber
                              });
                            }}
                            disabled={updateMutation.isPending}
                          >
                            {updateMutation.isPending ? 'Updating...' : 'Update Listing'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => flagMutation.mutate({ reason: flagReason })}
                    disabled={flagMutation.isPending}
                  >
                    <Flag className="w-4 h-4" />
                    {flagMutation.isPending ? "Flagging..." : "Flag Listing"}
                  </Button>

                  {listingData.status === 'pending' && (
                    <>
                      <Button variant="default" className="w-full flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>

                      <Button variant="destructive" className="w-full flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                    </>
                  )}
              </CardContent>
            </Card>

            {/* Admin Meta Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Meta Fields
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaStatus">Listing Status *</Label>
                  <select
                    id="metaStatus"
                    value={metaStatus || listingData?.status || ""}
                    onChange={(e) => setMetaStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="archived">Archived</option>
                    <option value="flagged">Flagged</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="metaFeatured"
                    checked={metaFeatured !== undefined ? metaFeatured : Boolean(listingData?.featured)}
                    onCheckedChange={setMetaFeatured}
                  />
                  <Label htmlFor="metaFeatured">Featured Listing</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="metaVerified"
                    checked={metaVerified !== undefined ? metaVerified : Boolean(listingData?.isVerified)}
                    onCheckedChange={setMetaVerified}
                  />
                  <Label htmlFor="metaVerified">Verified Listing</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaExpirationDate">Expiration Date</Label>
                  <Input
                    id="metaExpirationDate"
                    type="date"
                    value={metaExpirationDate || (listingData?.expirationDate ? new Date(listingData.expirationDate).toISOString().split('T')[0] : "")}
                    onChange={(e) => setMetaExpirationDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaSellerId">Reassign to User/Seller</Label>
                  <select
                    id="metaSellerId"
                    value={metaSellerId || listingData?.sellerId || ""}
                    onChange={(e) => setMetaSellerId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value={listingData?.sellerId || ""}>
                      {listingData?.seller?.firstName} {listingData?.seller?.lastName} (Current)
                    </option>
                    {availableUsers.filter((user: any) => user.id !== listingData?.sellerId).map((user: any) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaAdminNotes">Admin Notes</Label>
                  <Textarea
                    id="metaAdminNotes"
                    value={metaAdminNotes || listingData?.adminNotes || ""}
                    onChange={(e) => setMetaAdminNotes(e.target.value)}
                    placeholder="Internal admin notes..."
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={() => {
                    const updateData = {
                      status: metaStatus || listingData?.status,
                      featured: metaFeatured !== undefined ? metaFeatured : listingData?.featured,
                      isVerified: metaVerified !== undefined ? metaVerified : listingData?.isVerified,
                      expirationDate: metaExpirationDate || null,
                      listingSource: metaListingSource || listingData?.listingSource,
                      sellerId: metaSellerId || listingData?.sellerId,
                      adminNotes: metaAdminNotes || ""
                    };
                    metaMutation.mutate(updateData);
                  }}
                  disabled={metaMutation.isPending}
                  className="w-full"
                >
                  {metaMutation.isPending ? 'Updating...' : 'Update Meta Fields'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Media Management Dialog */}
        <Dialog open={isMediaOpen} onOpenChange={setIsMediaOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Manage Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Current Images */}
              {listingData.images && listingData.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Current Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {listingData.images.map((image: string, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              mediaMutation.mutate({
                                action: 'delete',
                                deleteIndex: index
                              });
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => {
                              mediaMutation.mutate({
                                action: 'set_featured',
                                featuredIndex: index
                              });
                            }}
                          >
                            Set Featured
                          </Button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                            Featured
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Add New Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500 mb-2">Click to upload images or drag and drop</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        // For now, show a message that file upload would need to be implemented
                        toast({ 
                          title: "File Upload", 
                          description: "File upload functionality needs to be implemented with proper image hosting",
                          variant: "destructive"
                        });
                      }
                    }}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose Files
                  </label>
                </div>
              </div>

              {/* Image URL Input (temporary solution) */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Add Image by URL</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter image URL..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const url = e.currentTarget.value.trim();
                        if (url) {
                          mediaMutation.mutate({
                            action: 'upload',
                            images: [url]
                          });
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Enter image URL..."]') as HTMLInputElement;
                      const url = input?.value.trim();
                      if (url) {
                        mediaMutation.mutate({
                          action: 'upload',
                          images: [url]
                        });
                        input.value = '';
                      }
                    }}
                    disabled={mediaMutation.isPending}
                  >
                    {mediaMutation.isPending ? 'Adding...' : 'Add URL'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
