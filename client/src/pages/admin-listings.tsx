import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Filter, 
  CheckSquare, 
  X, 
  Eye, 
  Edit, 
  Flag, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  MoreHorizontal,
  Upload,
  Download,
  Settings
} from "lucide-react";

interface Listing {
  listing: {
    id: number;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    status: string;
    createdAt: string;
    images?: string[];
  };
  seller: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  approval?: {
    status: string;
    reviewNotes?: string;
    reviewedAt?: string;
  };
  flagCount: number;
  viewCount: number;
  inquiryCount: number;
}

interface DashboardStats {
  totalListings: number;
  pendingApproval: number;
  approvedListings: number;
  rejectedListings: number;
  flaggedListings: number;
}

export default function AdminListings() {
  const [filters, setFilters] = useState({
    status: '',
    make: '',
    seller: '',
    flagged: false,
    sortBy: 'date',
    page: 1,
    limit: 20
  });
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkReason, setBulkReason] = useState('');
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Dashboard stats query
  const { data: dashboardStats } = useQuery<DashboardStats>({
    queryKey: ['/api/admin/dashboard-stats'],
    enabled: true,
  });

  // Listings query with filters
  const { data: listingsData, isLoading } = useQuery({
    queryKey: ['/api/admin/listings-with-stats', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== false) {
          params.append(key, value.toString());
        }
      });
      return apiRequest('GET', `/api/admin/listings-with-stats?${params.toString()}`);
    },
    enabled: true,
  });

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: (data: { listingIds: number[]; status: string; reason?: string }) =>
      apiRequest('POST', '/api/admin/bulk-update-listings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard-stats'] });
      setSelectedListings([]);
      setShowBulkDialog(false);
      setBulkReason('');
      toast({
        title: "Success",
        description: "Listings updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update listings",
        variant: "destructive",
      });
    },
  });

  // Individual approve mutation
  const approveMutation = useMutation({
    mutationFn: (data: { listingId: number; notes?: string }) =>
      apiRequest('PUT', `/api/admin/listing/${data.listingId}/approve`, { notes: data.notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard-stats'] });
      toast({
        title: "Success",
        description: "Listing approved successfully",
      });
    },
  });

  // Individual reject mutation
  const rejectMutation = useMutation({
    mutationFn: (data: { listingId: number; reason: string }) =>
      apiRequest('PUT', `/api/admin/listing/${data.listingId}/reject`, { reason: data.reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard-stats'] });
      setShowRejectDialog(false);
      setRejectReason('');
      setSelectedListing(null);
      toast({
        title: "Success",
        description: "Listing rejected successfully",
      });
    },
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSelectListing = (listingId: number) => {
    setSelectedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedListings.length === listingsData?.listings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(listingsData?.listings.map((l: Listing) => l.listing.id) || []);
    }
  };

  const handleBulkAction = () => {
    if (selectedListings.length === 0 || !bulkAction) return;
    
    if (bulkAction === 'rejected' && !bulkReason.trim()) {
      toast({
        title: "Error",
        description: "Rejection reason is required",
        variant: "destructive",
      });
      return;
    }

    bulkUpdateMutation.mutate({
      listingIds: selectedListings,
      status: bulkAction,
      reason: bulkReason || undefined,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case 'sold':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sold</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Listing Management</h1>
          <p className="text-gray-600 mt-2">Review, moderate, and manage all vehicle listings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalListings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dashboardStats.pendingApproval}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardStats.approvedListings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardStats.rejectedListings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged</CardTitle>
              <Flag className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardStats.flaggedListings}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by make, model, or seller..."
                value={filters.seller}
                onChange={(e) => handleFilterChange('seller', e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Makes</SelectItem>
                <SelectItem value="Toyota">Toyota</SelectItem>
                <SelectItem value="Nissan">Nissan</SelectItem>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Mazda">Mazda</SelectItem>
                <SelectItem value="Subaru">Subaru</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date Created</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="views">Views</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flagged"
                checked={filters.flagged}
                onCheckedChange={(checked) => handleFilterChange('flagged', checked)}
              />
              <label htmlFor="flagged" className="text-sm">Flagged only</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedListings.length > 0 && (
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">
                {selectedListings.length} listing(s) selected
              </span>
              <div className="flex items-center gap-4">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                    <SelectItem value="pending">Set to Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => setShowBulkDialog(true)}
                  disabled={!bulkAction}
                  size="sm"
                >
                  Apply Action
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedListings([])}
                  size="sm"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listings ({listingsData?.total || 0})</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedListings.length === listingsData?.listings.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {listingsData?.listings.map((item: Listing) => (
                <div key={item.listing.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedListings.includes(item.listing.id)}
                      onCheckedChange={() => handleSelectListing(item.listing.id)}
                    />
                    
                    {/* Vehicle Image */}
                    <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.listing.images?.[0] ? (
                        <img 
                          src={item.listing.images[0]} 
                          alt="Vehicle" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                    
                    {/* Listing Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.listing.year} {item.listing.make} {item.listing.model}
                          </h3>
                          <p className="text-gray-600 text-sm">{item.listing.title}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Seller: {item.seller.firstName} {item.seller.lastName}</span>
                            <span>•</span>
                            <span>{new Date(item.listing.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{item.viewCount} views</span>
                            <span>•</span>
                            <span>{item.inquiryCount} inquiries</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">
                            {formatPrice(item.listing.price)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {getStatusBadge(item.listing.status)}
                            {item.flagCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                <Flag className="w-3 h-3 mr-1" />
                                {item.flagCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4">
                        {item.listing.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => approveMutation.mutate({ listingId: item.listing.id })}
                              disabled={approveMutation.isPending}
                            >
                              <CheckSquare className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedListing(item);
                                setShowRejectDialog(true);
                              }}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        {item.flagCount > 0 && (
                          <Button size="sm" variant="outline">
                            <Flag className="w-4 h-4 mr-2" />
                            Review Flags
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {listingsData && listingsData.total > filters.limit && (
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('page', Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {filters.page} of {Math.ceil(listingsData.total / filters.limit)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('page', filters.page + 1)}
              disabled={filters.page >= Math.ceil(listingsData.total / filters.limit)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Bulk Action Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Action Confirmation</DialogTitle>
            <DialogDescription>
              You are about to {bulkAction} {selectedListings.length} listing(s).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {bulkAction === 'rejected' && (
              <Textarea
                placeholder="Rejection reason (required)"
                value={bulkReason}
                onChange={(e) => setBulkReason(e.target.value)}
              />
            )}
            {bulkAction !== 'rejected' && (
              <Textarea
                placeholder="Optional notes"
                value={bulkReason}
                onChange={(e) => setBulkReason(e.target.value)}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkAction} disabled={bulkUpdateMutation.isPending}>
              {bulkUpdateMutation.isPending ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Listing</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this listing.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Rejection reason (required)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedListing && rejectReason.trim()) {
                  rejectMutation.mutate({ 
                    listingId: selectedListing.listing.id, 
                    reason: rejectReason 
                  });
                }
              }}
              disabled={!rejectReason.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Reject Listing'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}