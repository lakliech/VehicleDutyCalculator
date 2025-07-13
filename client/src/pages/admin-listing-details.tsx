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

  // State for editing
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editNegotiable, setEditNegotiable] = useState(false);

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

  // Fetch listing data
  const { data: listingData, isLoading, error } = useQuery({
    queryKey: ['/api/admin/listing-details', id],
    queryFn: () => apiRequest('GET', `/api/admin/listing-details/${id}`),
    enabled: !!id,
  });

  // Fetch available users for reassignment
  const { data: usersData } = useQuery({
    queryKey: ['/api/admin/users-management'],
    queryFn: () => apiRequest('GET', '/api/admin/users-management'),
  });

  const availableUsers = usersData?.users?.map((item: any) => item.user) || [];

  // Initialize form data when listing loads
  useEffect(() => {
    if (listingData) {
      console.log('Listing data received:', {
        status: listingData.status,
        featured: listingData.featured,
        verified: listingData.isVerified,
        source: listingData.listingSource,
        notes: listingData.adminNotes,
        sellerId: listingData.sellerId
      });
      
      setEditTitle(listingData.title || "");
      setEditDescription(listingData.description || "");
      setEditPrice(listingData.price?.toString() || "");
      setEditLocation(listingData.location || "");
      setEditNegotiable(listingData.negotiable || false);
      
      // Initialize meta fields with current values - force update
      setMetaStatus(listingData.status || "pending");
      setMetaFeatured(Boolean(listingData.featured));
      setMetaVerified(Boolean(listingData.isVerified));
      setMetaExpirationDate(listingData.expirationDate ? new Date(listingData.expirationDate).toISOString().split('T')[0] : "");
      setMetaListingSource(listingData.listingSource || "user-submitted");
      setMetaSellerId(listingData.sellerId || "");
      setMetaAdminNotes(listingData.adminNotes || "");
    }
  }, [listingData]);

  // Mutations
  const updateMutation = useMutation({
    mutationFn: (data: any) => apiRequest('PUT', `/api/admin/listing/${id}`, data),
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
    mutationFn: (data: any) => apiRequest('POST', `/api/admin/listing/${id}/media`, data),
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
                  <CardTitle>Images</CardTitle>
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

          {/* Right Sidebar - Admin Actions */}
          <div className="w-80 space-y-6">
            {/* Meta Fields Card */}
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
                    value={metaStatus !== "" ? metaStatus : (listingData?.status || "pending")}
                    onChange={(e) => setMetaStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaListingSource">Listing Source</Label>
                  <select
                    id="metaListingSource"
                    value={metaListingSource !== "" ? metaListingSource : (listingData?.listingSource || "user-submitted")}
                    onChange={(e) => setMetaListingSource(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="user-submitted">User-submitted</option>
                    <option value="agent">Agent</option>
                    <option value="walk-in">Walk-in</option>
                    <option value="api-imported">API-imported</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="metaFeatured"
                      checked={Boolean(metaFeatured !== undefined ? metaFeatured : listingData?.featured)}
                      onCheckedChange={setMetaFeatured}
                    />
                    <Label htmlFor="metaFeatured">Featured Listing</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="metaVerified"
                      checked={Boolean(metaVerified !== undefined ? metaVerified : listingData?.isVerified)}
                      onCheckedChange={setMetaVerified}
                    />
                    <Label htmlFor="metaVerified">Verified Badge</Label>
                  </div>
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
                    console.log('Updating meta fields with:', updateData);
                    metaMutation.mutate(updateData);
                  }}
                  disabled={metaMutation.isPending}
                  className="w-full"
                >
                  {metaMutation.isPending ? 'Updating...' : 'Update Meta Fields'}
                </Button>
              </CardContent>
            </Card>

            {/* Admin Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="w-5 h-5" />
                  Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                      
                      <div className="space-y-4">
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
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => {
                              updateMutation.mutate({
                                title: editTitle,
                                description: editDescription,
                                price: parseFloat(editPrice),
                                negotiable: editNegotiable,
                                location: editLocation
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

                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Manage Media
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

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => flagMutation.mutate({ reason: flagReason })}
                    disabled={flagMutation.isPending}
                  >
                    <Flag className="w-4 h-4" />
                    {flagMutation.isPending ? "Flagging..." : "Flag Listing"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}