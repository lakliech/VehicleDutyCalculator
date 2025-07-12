import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  ArrowLeft, 
  Car, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Eye,
  Flag,
  CheckCircle,
  RefreshCw,
  Edit,
  StickyNote,
  DollarSign,
  Fuel,
  Gauge,
  Palette,
  Wrench,
  Hash,
  X
} from "lucide-react";

export default function AdminListingDetails() {
  const params = useParams();
  const listingId = params.id;
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Dialog states
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form states
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [flagReason, setFlagReason] = useState("");
  const [adminNote, setAdminNote] = useState("");
  
  // Edit form states
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editNegotiable, setEditNegotiable] = useState(false);
  const [editLocation, setEditLocation] = useState("");

  console.log('Admin Listing Details - Listing ID:', listingId);

  // Individual listing details query
  const { data: listingData, isLoading, error } = useQuery({
    queryKey: [`/api/admin/listing-details/${listingId}`],
    enabled: !!listingId,
  });

  console.log('Listing data:', listingData);
  console.log('Query error:', error);
  console.log('Is loading:', isLoading);

  // Initialize edit form when listing data loads
  if (listingData && editTitle === "") {
    setEditTitle(listingData.title || "");
    setEditDescription(listingData.description || "");
    setEditPrice(listingData.price || "");
    setEditNegotiable(listingData.negotiable || false);
    setEditLocation(listingData.location || "");
  }

  // Mutation functions
  const approveMutation = useMutation({
    mutationFn: async ({ notes }: { notes?: string }) => {
      const response = await fetch(`/api/admin/listing/${listingId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to approve listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/listing-details/${listingId}`] });
      toast({ title: "Success", description: "Listing approved successfully" });
      setIsApproveOpen(false);
      setApprovalNotes("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to approve listing", variant: "destructive" });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ reason }: { reason: string }) => {
      const response = await fetch(`/api/admin/listing/${listingId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to reject listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/listing-details/${listingId}`] });
      toast({ title: "Success", description: "Listing rejected successfully" });
      setIsRejectOpen(false);
      setRejectionReason("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to reject listing", variant: "destructive" });
    },
  });

  const flagMutation = useMutation({
    mutationFn: async ({ reason }: { reason: string }) => {
      const response = await fetch(`/api/admin/listing/${listingId}/flag`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to flag listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/listing-details/${listingId}`] });
      toast({ title: "Success", description: "Listing flagged successfully" });
      setIsFlagOpen(false);
      setFlagReason("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to flag listing", variant: "destructive" });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async ({ note }: { note: string }) => {
      const response = await fetch(`/api/admin/listing/${listingId}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to add note');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/listing-details/${listingId}`] });
      toast({ title: "Success", description: "Note added successfully" });
      setIsNoteOpen(false);
      setAdminNote("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add note", variant: "destructive" });
    },
  });

  const editMutation = useMutation({
    mutationFn: async (editData: { title: string; description: string; price: string; negotiable: boolean; location: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to edit listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/listing-details/${listingId}`] });
      toast({ title: "Success", description: "Listing updated successfully" });
      setIsEditOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update listing", variant: "destructive" });
    },
  });

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
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading listing details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Listing Not Found</h2>
            <p className="text-gray-600 mb-4">The requested listing could not be found.</p>
            <Button onClick={() => navigate('/admin')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
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

          {/* Detailed Listing Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
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

            {/* Approval Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Approval Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge variant={listingData.approval?.status === 'approved' ? 'default' : listingData.approval?.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {listingData.approval?.status || 'pending'}
                  </Badge>
                </div>
                {listingData.approval?.reviewedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Reviewed At</label>
                    <p className="text-sm">{formatDate(listingData.approval.reviewedAt)}</p>
                  </div>
                )}
                {listingData.approval?.reviewNotes && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Review Notes</label>
                    <p className="text-sm">{listingData.approval.reviewNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Views</label>
                  <p className="text-lg font-semibold">{listingData.viewCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Favorites</label>
                  <p className="text-lg font-semibold">{listingData.favoriteCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Inquiries</label>
                  <p className="text-lg font-semibold">{listingData.inquiryCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Flags</label>
                  <p className="text-lg font-semibold">{listingData.flagCount || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Listing</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="editTitle">Title *</Label>
                        <Input
                          id="editTitle"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="e.g., 2015 Toyota Fielder – Excellent Condition"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="editDescription">Description</Label>
                        <Textarea
                          id="editDescription"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Correct grammar, remove prohibited words, or add details..."
                          rows={5}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="editPrice">Price (KES) *</Label>
                          <Input
                            id="editPrice"
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            placeholder="e.g., 750000"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="editLocation">Location *</Label>
                          <Input
                            id="editLocation"
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                            placeholder="e.g., Nairobi, Kenya"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="editNegotiable"
                          checked={editNegotiable}
                          onCheckedChange={setEditNegotiable}
                        />
                        <Label htmlFor="editNegotiable">Price is negotiable</Label>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => editMutation.mutate({
                            title: editTitle,
                            description: editDescription,
                            price: editPrice,
                            negotiable: editNegotiable,
                            location: editLocation
                          })}
                          disabled={!editTitle.trim() || !editPrice.trim() || !editLocation.trim() || editMutation.isPending}
                        >
                          {editMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <StickyNote className="w-4 h-4" />
                      Add Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Admin Note</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="note">Admin Note</Label>
                        <Textarea
                          id="note"
                          placeholder="Enter admin note..."
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsNoteOpen(false)}>Cancel</Button>
                        <Button 
                          onClick={() => addNoteMutation.mutate({ note: adminNote })}
                          disabled={!adminNote.trim() || addNoteMutation.isPending}
                        >
                          {addNoteMutation.isPending ? "Adding..." : "Add Note"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {listingData.status === 'pending' && (
                  <>
                    <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
                      <DialogTrigger asChild>
                        <Button variant="default" className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Approve Listing</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="approvalNotes">Approval Notes (Optional)</Label>
                            <Textarea
                              id="approvalNotes"
                              placeholder="Enter approval notes..."
                              value={approvalNotes}
                              onChange={(e) => setApprovalNotes(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>Cancel</Button>
                            <Button 
                              onClick={() => approveMutation.mutate({ notes: approvalNotes })}
                              disabled={approveMutation.isPending}
                            >
                              {approveMutation.isPending ? "Approving..." : "Approve"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="flex items-center gap-2">
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Listing</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="rejectionReason">Rejection Reason *</Label>
                            <Textarea
                              id="rejectionReason"
                              placeholder="Enter rejection reason..."
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
                            <Button 
                              onClick={() => rejectMutation.mutate({ reason: rejectionReason })}
                              disabled={!rejectionReason.trim() || rejectMutation.isPending}
                              variant="destructive"
                            >
                              {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}

                <Dialog open={isFlagOpen} onOpenChange={setIsFlagOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Flag
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Flag Listing</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="flagReason">Flag Reason *</Label>
                        <Textarea
                          id="flagReason"
                          placeholder="Enter reason for flagging..."
                          value={flagReason}
                          onChange={(e) => setFlagReason(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsFlagOpen(false)}>Cancel</Button>
                        <Button 
                          onClick={() => flagMutation.mutate({ reason: flagReason })}
                          disabled={!flagReason.trim() || flagMutation.isPending}
                          variant="destructive"
                        >
                          {flagMutation.isPending ? "Flagging..." : "Flag"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}