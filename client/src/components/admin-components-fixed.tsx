import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Search, 
  Filter, 
  Calendar,
  ChevronLeft, 
  ChevronRight,
  Eye,
  EyeOff,
  Car,
  Phone,
  MapPin,
  Star,
  Flag,
  User,
  Users,
  UserCheck,
  UserX
} from "lucide-react";

// Types for car listings and users
type CarListing = {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  engineCapacity: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  condition: string;
  mileage: number;
  location: string;
  phoneNumber: string;
  description: string;
  features: string[];
  images: string[];
  status: string;
  viewCount: number;
  isVerified: boolean;
  isPremium: boolean;
  isFlagged: boolean;
  createdAt: string;
  updatedAt: string;
  negotiable: boolean;
  seller?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  status: string;
  createdAt: string;
  role?: {
    id: number;
    name: string;
  };
};

type UserRole = {
  id: number;
  name: string;
  description: string;
};

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Car Listings Management Component
export function VehiclesManagementTab({ 
  listings, 
  isLoading,
  getAuthHeaders 
}: {
  listings: CarListing[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // State management
  const [filters, setFilters] = useState({
    status: 'all',
    verified: 'all',
    premium: 'all',
    flagged: 'all',
    search: '',
    startDate: '',
    endDate: '',
    make: 'all'
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });
  
  const [expandedListingId, setExpandedListingId] = useState<number | null>(null);

  // Mutations for listing actions
  const updateListingStatusMutation = useMutation({
    mutationFn: async ({ listingId, status }: { listingId: number; status: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      toast({ title: "Success", description: "Listing status updated successfully" });
    },
  });

  // Filter and paginate listings
  const filteredListings = listings.filter(listing => {
    const matchesStatus = filters.status === 'all' || listing.status === filters.status;
    const matchesVerified = filters.verified === 'all' || (filters.verified === 'yes' ? listing.isVerified : !listing.isVerified);
    const matchesPremium = filters.premium === 'all' || (filters.premium === 'yes' ? listing.isPremium : !listing.isPremium);
    const matchesFlagged = filters.flagged === 'all' || (filters.flagged === 'yes' ? listing.isFlagged : !listing.isFlagged);
    const matchesMake = filters.make === 'all' || listing.make.toLowerCase().includes(filters.make.toLowerCase());
    
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch = !searchTerm || 
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.make.toLowerCase().includes(searchTerm) ||
      listing.model.toLowerCase().includes(searchTerm) ||
      (listing.seller && 
        (`${listing.seller.firstName} ${listing.seller.lastName}`.toLowerCase().includes(searchTerm) ||
         listing.seller.email.toLowerCase().includes(searchTerm))) ||
      listing.location.toLowerCase().includes(searchTerm);

    const matchesDateRange = (!filters.startDate || new Date(listing.createdAt) >= new Date(filters.startDate)) &&
                           (!filters.endDate || new Date(listing.createdAt) <= new Date(filters.endDate));

    return matchesStatus && matchesVerified && matchesPremium && matchesFlagged && 
           matchesMake && matchesSearch && matchesDateRange;
  });

  const paginatedListings = filteredListings.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  const paginationInfo = {
    page: pagination.page,
    limit: pagination.limit,
    total: filteredListings.length,
    pages: Math.ceil(filteredListings.length / pagination.limit)
  };

  const handleToggleDetails = (listingId: number) => {
    setExpandedListingId(expandedListingId === listingId ? null : listingId);
  };

  const selectedListing = expandedListingId ? listings.find(l => l.id === expandedListingId) : null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading car listings...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Car Listings Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search listings, sellers, make..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              {/* Verified Filter */}
              <Select value={filters.verified} onValueChange={(value) => setFilters(prev => ({ ...prev, verified: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Verification Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="yes">Verified Only</SelectItem>
                  <SelectItem value="no">Unverified Only</SelectItem>
                </SelectContent>
              </Select>

              {/* Premium Filter */}
              <Select value={filters.premium} onValueChange={(value) => setFilters(prev => ({ ...prev, premium: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Premium Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="yes">Premium Only</SelectItem>
                  <SelectItem value="no">Standard Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={filters.startDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <Input
                type="date"
                placeholder="End Date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              />
              <Button
                variant="outline"
                onClick={() => setFilters(prev => ({ ...prev, startDate: '', endDate: '' }))}
              >
                Clear Dates
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {paginatedListings.length} of {filteredListings.length} listings
          </div>

          {/* Listings Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedListings.map((listing) => (
                <>
                  <TableRow key={listing.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">{listing.title}</div>
                          <div className="text-sm text-gray-500">
                            {listing.year} {listing.make} {listing.model}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {listing.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                <UserCheck className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {listing.isPremium && (
                              <Badge variant="default" className="text-xs bg-yellow-500">
                                <Star className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                            {listing.isFlagged && (
                              <Badge variant="destructive" className="text-xs">
                                <Flag className="h-3 w-3 mr-1" />
                                Flagged
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {listing.seller ? 
                              `${listing.seller.firstName?.[0] || ''}${listing.seller.lastName?.[0] || ''}` || 'U' : 
                              'U'
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {listing.seller ? 
                              `${listing.seller.firstName || ''} ${listing.seller.lastName || ''}`.trim() || 'Unknown Seller' : 
                              'Unknown Seller'
                            }
                          </div>
                          <div className="text-xs text-gray-500">{listing.seller?.email || 'No email'}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-green-600">
                        {formatCurrency(listing.price)}
                      </div>
                      {listing.negotiable && (
                        <div className="text-xs text-gray-500">Negotiable</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        listing.status === 'active' ? 'default' :
                        listing.status === 'pending' ? 'secondary' :
                        listing.status === 'rejected' ? 'destructive' : 'outline'
                      }>
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(listing.createdAt)}</div>
                      <div className="text-xs text-gray-500">{listing.viewCount || 0} views</div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleDetails(listing.id)}
                      >
                        {expandedListingId === listing.id ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded Details Row */}
                  {expandedListingId === listing.id && selectedListing && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <div className="p-6 bg-gray-50 border-t">
                          <div className="flex items-center gap-2 mb-4">
                            <Car className="h-5 w-5 text-purple-600" />
                            <h3 className="text-lg font-semibold">
                              Listing Details - {selectedListing.year} {selectedListing.make} {selectedListing.model}
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Vehicle Information */}
                            <div className="bg-white p-4 rounded-lg border">
                              <h4 className="font-semibold mb-3">Vehicle Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Engine:</span>
                                  <span>{selectedListing.engineCapacity}cc {selectedListing.fuelType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Mileage:</span>
                                  <span>{selectedListing.mileage?.toLocaleString()} km</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Condition:</span>
                                  <span className="capitalize">{selectedListing.condition}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Transmission:</span>
                                  <span className="capitalize">{selectedListing.transmission}</span>
                                </div>
                              </div>
                            </div>

                            {/* Seller Information */}
                            <div className="bg-white p-4 rounded-lg border">
                              <h4 className="font-semibold mb-3">Seller Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="font-medium">
                                  {selectedListing.seller ? 
                                    `${selectedListing.seller.firstName || ''} ${selectedListing.seller.lastName || ''}`.trim() || 'Unknown Seller' : 
                                    'Unknown Seller'
                                  }
                                </div>
                                <div className="text-gray-600">{selectedListing.seller?.email || 'No email'}</div>
                                <div className="text-gray-600">{selectedListing.phoneNumber || 'No phone'}</div>
                                <div className="text-gray-600">{selectedListing.location || 'No location'}</div>
                              </div>
                            </div>

                            {/* Pricing & Status */}
                            <div className="bg-white p-4 rounded-lg border">
                              <h4 className="font-semibold mb-3">Pricing & Status</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Price:</span>
                                  <span className="font-bold text-green-600">{formatCurrency(selectedListing.price)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Status:</span>
                                  <Badge variant={
                                    selectedListing.status === 'active' ? 'default' :
                                    selectedListing.status === 'pending' ? 'secondary' : 'outline'
                                  }>
                                    {selectedListing.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Views:</span>
                                  <span>{selectedListing.viewCount || 0}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Description & Features */}
                          {(selectedListing.description || (selectedListing.features && selectedListing.features.length > 0)) && (
                            <div className="mt-4 bg-white p-4 rounded-lg border">
                              {selectedListing.description && (
                                <div className="mb-4">
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-gray-700 text-sm">{selectedListing.description}</p>
                                </div>
                              )}
                              
                              {selectedListing.features && selectedListing.features.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2">Features</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedListing.features.map((feature: string, index: number) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {paginationInfo.pages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={paginationInfo.page <= 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {paginationInfo.page} of {paginationInfo.pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={paginationInfo.page >= paginationInfo.pages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Users Management Tab Component
export function UsersManagementTab({ 
  users, 
  userRoles, 
  isLoading,
  getAuthHeaders 
}: {
  users: AppUser[];
  userRoles: UserRole[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: number }) => {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ roleId }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "User role updated successfully" });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading users...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const matchesRole = filters.role === 'all' || user.roleId.toString() === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch = !searchTerm || 
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm);

    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>

            <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {userRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={user.roleId.toString()} 
                      onValueChange={(value) => updateUserRoleMutation.mutate({ 
                        userId: user.id, 
                        roleId: parseInt(value) 
                      })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.status === 'active' ? 'default' :
                      user.status === 'suspended' ? 'destructive' : 'secondary'
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <User className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}