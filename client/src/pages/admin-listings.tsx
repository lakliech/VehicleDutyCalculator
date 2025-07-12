import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
  Settings,
  CheckCircle,
  XCircle,
  Archive,
  RotateCcw,
  ShoppingCart,
  MessageSquare,
  RefreshCw,
  Copy,
  Trash2,
  FileText,
  Clock,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Phone,
  User,
  Car,
  Fuel,
  Gauge,
  Palette,
  Wrench,
  Hash,
  StickyNote
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
    engineSize?: number;
    mileage?: number;
    fuelType?: string;
    bodyType?: string;
    transmission?: string;
    exteriorColor?: string;
    condition?: string;
    location?: string;
    description?: string;
    features?: string[];
    isFlagged?: boolean;
    flagReason?: string;
    isVerified?: boolean;
    viewCount?: number;
    favoriteCount?: number;
    phoneNumber?: string;
    whatsappNumber?: string;
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

interface ListingDetails {
  listing: any;
  seller: any;
  duplicates?: any[];
  notes?: any[];
}

export default function AdminListings() {
  const params = useParams();
  const listingId = params.id;
  
  const [filters, setFilters] = useState({
    status: 'all',
    make: 'all',
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
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [listingDetails, setListingDetails] = useState<ListingDetails | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});

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
        if (value !== '' && value !== false && value !== 'all') {
          params.append(key, value.toString());
        }
      });
      return apiRequest('GET', `/api/admin/listings-with-stats?${params.toString()}`);
    },
    enabled: !listingId,
  });

  // Individual listing details query
  const { data: singleListingData, isLoading: isLoadingSingleListing } = useQuery({
    queryKey: ['/api/admin/listing-details', listingId],
    queryFn: () => apiRequest('GET', `/api/admin/listing-details/${listingId}`),
    enabled: !!listingId,
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
      toast({ title: "Success", description: "Listings updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update listings", variant: "destructive" });
    },
  });

  // Individual listing actions
  const approveMutation = useMutation({
    mutationFn: (data: { listingId: number; notes?: string }) =>
      apiRequest('POST', `/api/admin/listings/${data.listingId}/approve`, { notes: data.notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard-stats'] });
      toast({ title: "Success", description: "Listing approved successfully" });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (data: { listingId: number; reason: string }) =>
      apiRequest('POST', `/api/admin/listings/${data.listingId}/reject`, { reason: data.reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard-stats'] });
      setShowRejectDialog(false);
      setRejectReason('');
      setSelectedListing(null);
      toast({ title: "Success", description: "Listing rejected successfully" });
    },
  });

  const flagMutation = useMutation({
    mutationFn: (data: { listingId: number; reason: string }) =>
      apiRequest('POST', `/api/admin/listings/${data.listingId}/flag`, { reason: data.reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      setShowFlagDialog(false);
      setFlagReason('');
      setSelectedListing(null);
      toast({ title: "Success", description: "Listing flagged successfully" });
    },
  });

  const unflagMutation = useMutation({
    mutationFn: (listingId: number) =>
      apiRequest('POST', `/api/admin/listings/${listingId}/unflag`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      toast({ title: "Success", description: "Flag removed successfully" });
    },
  });

  const markSoldMutation = useMutation({
    mutationFn: (listingId: number) =>
      apiRequest('POST', `/api/admin/listings/${listingId}/mark-sold`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      toast({ title: "Success", description: "Listing marked as sold" });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: (listingId: number) =>
      apiRequest('POST', `/api/admin/listings/${listingId}/archive`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      toast({ title: "Success", description: "Listing archived successfully" });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: (listingId: number) =>
      apiRequest('POST', `/api/admin/listings/${listingId}/restore`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      toast({ title: "Success", description: "Listing restored successfully" });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: (data: { listingId: number; note: string }) =>
      apiRequest('POST', `/api/admin/listings/${data.listingId}/note`, { note: data.note }),
    onSuccess: () => {
      setShowNoteDialog(false);
      setNoteText('');
      toast({ title: "Success", description: "Note added successfully" });
      if (listingDetails) {
        // Refresh listing details
        fetchListingDetails(listingDetails.listing.id);
      }
    },
  });

  const updateListingMutation = useMutation({
    mutationFn: (data: { listingId: number; updates: any }) =>
      apiRequest('PUT', `/api/admin/listings/${data.listingId}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      setShowEditDialog(false);
      setEditFormData({});
      toast({ title: "Success", description: "Listing updated successfully" });
    },
  });

  const deleteListingMutation = useMutation({
    mutationFn: (listingId: number) =>
      apiRequest('DELETE', `/api/admin/listings/${listingId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings-with-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard-stats'] });
      toast({ title: "Success", description: "Listing deleted successfully" });
    },
  });

  // Fetch listing details
  const fetchListingDetails = async (listingId: number) => {
    try {
      const [details, duplicates, notes] = await Promise.all([
        apiRequest('GET', `/api/admin/listings/${listingId}/details`),
        apiRequest('GET', `/api/admin/listings/${listingId}/duplicate-check`),
        apiRequest('GET', `/api/admin/listings/${listingId}/notes`)
      ]);
      
      setListingDetails({
        listing: details.listing,
        seller: details.seller,
        duplicates,
        notes
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch listing details", variant: "destructive" });
    }
  };

  // Event handlers
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
    if (selectedListings.length === (listingsData?.listings?.length || 0)) {
      setSelectedListings([]);
    } else {
      setSelectedListings(listingsData?.listings?.map((l: Listing) => l.listing.id) || []);
    }
  };

  const handleBulkAction = () => {
    if (selectedListings.length === 0 || !bulkAction) return;
    
    if (bulkAction === 'rejected' && !bulkReason.trim()) {
      toast({ title: "Error", description: "Rejection reason is required", variant: "destructive" });
      return;
    }

    bulkUpdateMutation.mutate({
      listingIds: selectedListings,
      status: bulkAction,
      reason: bulkReason || undefined,
    });
  };

  const handleViewDetails = async (listing: Listing) => {
    setSelectedListing(listing);
    await fetchListingDetails(listing.listing.id);
    setShowDetailsDialog(true);
  };

  const handleEditListing = (listing: Listing) => {
    setSelectedListing(listing);
    setEditFormData({ ...listing.listing });
    setShowEditDialog(true);
  };

  const handleExportListings = async () => {
    try {
      const data = await apiRequest('GET', '/api/admin/listings/export', filters);
      const csv = [
        ['ID', 'Title', 'Make', 'Model', 'Year', 'Price', 'Status', 'Seller', 'Location', 'Created', 'Flagged'].join(','),
        ...data.map((item: any) => [
          item.id,
          `"${item.title}"`,
          item.make,
          item.model,
          item.year,
          item.price,
          item.status,
          `"${item.sellerName}"`,
          `"${item.location}"`,
          new Date(item.createdAt).toLocaleDateString(),
          item.isFlagged ? 'Yes' : 'No'
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `listings-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({ title: "Success", description: "Listings exported successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to export listings", variant: "destructive" });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { className: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Pending" },
      approved: { className: "bg-green-50 text-green-700 border-green-200", label: "Approved" },
      rejected: { className: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
      active: { className: "bg-blue-50 text-blue-700 border-blue-200", label: "Active" },
      sold: { className: "bg-purple-50 text-purple-700 border-purple-200", label: "Sold" },
      archived: { className: "bg-gray-50 text-gray-700 border-gray-200", label: "Archived" },
      suspended: { className: "bg-orange-50 text-orange-700 border-orange-200", label: "Suspended" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // If we have a listing ID, show the detailed view
  if (listingId) {
    if (isLoadingSingleListing) {
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

    if (!singleListingData) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto p-6">
            <div className="text-center py-12">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Listing Not Found</h2>
              <p className="text-gray-600 mb-4">The requested listing could not be found.</p>
              <Button onClick={() => window.location.href = '/admin/listings'}>
                Back to Listings
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Show detailed listing view
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <Button 
                  onClick={() => window.location.href = '/admin/listings'}
                  variant="outline"
                  className="mb-4"
                >
                  ← Back to Listings
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Listing Details</h1>
                <p className="text-gray-600">Complete information about this listing</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(singleListingData.status)}
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
                    <p className="text-lg font-semibold">{singleListingData.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Make</label>
                      <p className="text-sm">{singleListingData.make}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Model</label>
                      <p className="text-sm">{singleListingData.model}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Year</label>
                      <p className="text-sm">{singleListingData.year}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Price</label>
                      <p className="text-lg font-bold text-purple-600">{formatPrice(singleListingData.price)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-sm">{singleListingData.location}</p>
                  </div>
                  {singleListingData.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{singleListingData.description}</p>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-sm">{singleListingData.seller?.firstName} {singleListingData.seller?.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-sm">{singleListingData.seller?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-sm">{singleListingData.phoneNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                      <p className="text-sm">{singleListingData.whatsappNumber || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Created</label>
                    <p className="text-sm">{formatDate(singleListingData.createdAt)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  {singleListingData.status === 'pending' && (
                    <>
                      <Button 
                        onClick={() => approveMutation.mutate({ listingId: singleListingData.id })}
                        disabled={approveMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        onClick={() => {
                          setSelectedListing({ listing: singleListingData, seller: singleListingData.seller });
                          setShowRejectDialog(true);
                        }}
                        disabled={rejectMutation.isPending}
                        variant="destructive"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button 
                    onClick={() => {
                      setSelectedListing({ listing: singleListingData, seller: singleListingData.seller });
                      setShowFlagDialog(true);
                    }}
                    variant="outline"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Flag Listing
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedListing({ listing: singleListingData, seller: singleListingData.seller });
                      setShowNoteDialog(true);
                    }}
                    variant="outline"
                  >
                    <StickyNote className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Listing Management</h1>
            <p className="text-gray-600">Manage and moderate vehicle listings</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportListings} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{dashboardStats?.totalListings || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dashboardStats?.pendingApproval || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardStats?.approvedListings || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardStats?.rejectedListings || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Flagged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dashboardStats?.flaggedListings || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Make</label>
                <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Makes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Nissan">Nissan</SelectItem>
                    <SelectItem value="Honda">Honda</SelectItem>
                    <SelectItem value="Mazda">Mazda</SelectItem>
                    <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                    <SelectItem value="Subaru">Subaru</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Seller</label>
                <Input
                  placeholder="Search by seller name or email"
                  value={filters.seller}
                  onChange={(e) => handleFilterChange('seller', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date Created</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <Checkbox 
                  id="flagged" 
                  checked={filters.flagged}
                  onCheckedChange={(checked) => handleFilterChange('flagged', checked)}
                />
                <label htmlFor="flagged" className="text-sm font-medium">
                  Show only flagged listings
                </label>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={() => setFilters({
                    status: 'all',
                    make: 'all',
                    seller: '',
                    flagged: false,
                    sortBy: 'date',
                    page: 1,
                    limit: 20
                  })}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedListings.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Bulk Actions ({selectedListings.length} selected)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                    <SelectItem value="suspended">Suspend</SelectItem>
                    <SelectItem value="archived">Archive</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => setShowBulkDialog(true)}
                  disabled={!bulkAction}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Apply to {selectedListings.length} listing{selectedListings.length !== 1 ? 's' : ''}
                </Button>
                <Button 
                  onClick={() => setSelectedListings([])}
                  variant="outline"
                >
                  Clear Selection
                </Button>
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
                  checked={selectedListings.length === (listingsData?.listings?.length || 0)}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {listingsData?.listings?.map((item: Listing) => (
                  <div key={item.listing.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedListings.includes(item.listing.id)}
                        onCheckedChange={() => handleSelectListing(item.listing.id)}
                      />
                      
                      {/* Listing Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.listing.images && item.listing.images.length > 0 ? (
                          <img 
                            src={item.listing.images[0]} 
                            alt={item.listing.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Car className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      
                      {/* Listing Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{item.listing.title}</h3>
                            <p className="text-gray-600">{item.listing.make} {item.listing.model} ({item.listing.year})</p>
                            <p className="text-xl font-bold text-purple-600">{formatPrice(item.listing.price)}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {item.listing.isFlagged && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <Flag className="w-3 h-3 mr-1" />
                                Flagged
                              </Badge>
                            )}
                            {item.listing.isVerified && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {getStatusBadge(item.listing.status)}
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.seller.firstName} {item.seller.lastName}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.listing.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.listing.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.viewCount} views
                          </div>
                        </div>
                        
                        {item.listing.description && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.listing.description}</p>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails(item)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditListing(item)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Listing
                            </DropdownMenuItem>
                            
                            {item.listing.status === 'pending' && (
                              <>
                                <DropdownMenuItem onClick={() => approveMutation.mutate({ listingId: item.listing.id })}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedListing(item);
                                  setShowRejectDialog(true);
                                }}>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            
                            {!item.listing.isFlagged ? (
                              <DropdownMenuItem onClick={() => {
                                setSelectedListing(item);
                                setShowFlagDialog(true);
                              }}>
                                <Flag className="w-4 h-4 mr-2" />
                                Flag Listing
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => unflagMutation.mutate(item.listing.id)}>
                                <Flag className="w-4 h-4 mr-2" />
                                Remove Flag
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem onClick={() => {
                              setSelectedListing(item);
                              setShowNoteDialog(true);
                            }}>
                              <StickyNote className="w-4 h-4 mr-2" />
                              Add Note
                            </DropdownMenuItem>
                            
                            {item.listing.status !== 'sold' && (
                              <DropdownMenuItem onClick={() => markSoldMutation.mutate(item.listing.id)}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Mark as Sold
                              </DropdownMenuItem>
                            )}
                            
                            {item.listing.status !== 'archived' ? (
                              <DropdownMenuItem onClick={() => archiveMutation.mutate(item.listing.id)}>
                                <Archive className="w-4 h-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => restoreMutation.mutate(item.listing.id)}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Restore
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
                                  deleteListingMutation.mutate(item.listing.id);
                                }
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                )) || []}
                
                {(!listingsData?.listings || listingsData.listings.length === 0) && (
                  <div className="text-center py-8">
                    <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
                    <p className="text-gray-600">Try adjusting your filters or check back later.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bulk Action Dialog */}
        <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bulk Action: {bulkAction}</DialogTitle>
              <DialogDescription>
                You are about to {bulkAction} {selectedListings.length} listing{selectedListings.length !== 1 ? 's' : ''}. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {bulkAction === 'rejected' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Reason for rejection</label>
                <Textarea
                  value={bulkReason}
                  onChange={(e) => setBulkReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  className="min-h-[100px]"
                />
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBulkDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleBulkAction}
                disabled={bulkUpdateMutation.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {bulkUpdateMutation.isPending ? 'Processing...' : `${bulkAction} ${selectedListings.length} listing${selectedListings.length !== 1 ? 's' : ''}`}
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
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Reason for rejection</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (selectedListing && rejectReason.trim()) {
                    rejectMutation.mutate({ listingId: selectedListing.listing.id, reason: rejectReason });
                  }
                }}
                disabled={!rejectReason.trim() || rejectMutation.isPending}
                variant="destructive"
              >
                {rejectMutation.isPending ? 'Rejecting...' : 'Reject Listing'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Flag Dialog */}
        <Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Flag Listing</DialogTitle>
              <DialogDescription>
                Please provide a reason for flagging this listing.
              </DialogDescription>
            </DialogHeader>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Reason for flagging</label>
              <Textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="Enter reason for flagging..."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFlagDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (selectedListing && flagReason.trim()) {
                    flagMutation.mutate({ listingId: selectedListing.listing.id, reason: flagReason });
                  }
                }}
                disabled={!flagReason.trim() || flagMutation.isPending}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {flagMutation.isPending ? 'Flagging...' : 'Flag Listing'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Note Dialog */}
        <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Admin Note</DialogTitle>
              <DialogDescription>
                Add an internal note for this listing.
              </DialogDescription>
            </DialogHeader>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Note</label>
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter your note..."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (selectedListing && noteText.trim()) {
                    addNoteMutation.mutate({ listingId: selectedListing.listing.id, note: noteText });
                  }
                }}
                disabled={!noteText.trim() || addNoteMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {addNoteMutation.isPending ? 'Adding...' : 'Add Note'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Listing Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Listing Details</DialogTitle>
              <DialogDescription>
                Complete information about this listing
              </DialogDescription>
            </DialogHeader>
            
            {listingDetails && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Title</label>
                      <p className="text-sm">{listingDetails.listing.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <div className="mt-1">{getStatusBadge(listingDetails.listing.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Make & Model</label>
                      <p className="text-sm">{listingDetails.listing.make} {listingDetails.listing.model}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Year</label>
                      <p className="text-sm">{listingDetails.listing.year}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Price</label>
                      <p className="text-sm font-bold text-purple-600">{formatPrice(listingDetails.listing.price)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-sm">{listingDetails.listing.location}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Specifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Vehicle Specifications</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Engine Size</label>
                      <p className="text-sm">{listingDetails.listing.engineSize}cc</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mileage</label>
                      <p className="text-sm">{listingDetails.listing.mileage?.toLocaleString()} km</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fuel Type</label>
                      <p className="text-sm capitalize">{listingDetails.listing.fuelType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Body Type</label>
                      <p className="text-sm capitalize">{listingDetails.listing.bodyType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Transmission</label>
                      <p className="text-sm capitalize">{listingDetails.listing.transmission}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Condition</label>
                      <p className="text-sm capitalize">{listingDetails.listing.condition}</p>
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-sm">{listingDetails.seller.firstName} {listingDetails.seller.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-sm">{listingDetails.seller.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-sm">{listingDetails.listing.phoneNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                      <p className="text-sm">{listingDetails.listing.whatsappNumber || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Admin Notes</h3>
                  <div className="space-y-2">
                    {listingDetails.notes && listingDetails.notes.length > 0 ? (
                      listingDetails.notes.map((note: any) => (
                        <div key={note.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <p className="text-sm">{note.note}</p>
                            <div className="text-xs text-gray-500">
                              {note.admin?.firstName} {note.admin?.lastName} • {formatDate(note.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No notes yet</p>
                    )}
                  </div>
                </div>

                {/* Potential Duplicates */}
                {listingDetails.duplicates && listingDetails.duplicates.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Potential Duplicates</h3>
                    <div className="space-y-2">
                      {listingDetails.duplicates.map((duplicate: any) => (
                        <div key={duplicate.id} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium">{duplicate.title}</p>
                              <p className="text-xs text-gray-600">{duplicate.make} {duplicate.model} ({duplicate.year})</p>
                              <p className="text-xs text-orange-600">{formatPrice(duplicate.price)}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">{duplicate.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}