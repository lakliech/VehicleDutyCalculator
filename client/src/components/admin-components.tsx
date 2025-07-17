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
import { Link } from "wouter";
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
  UserX,
  ExternalLink
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
  const filteredListings = (listings || []).filter(listing => {
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
                    <Link href={`/admin/listing-details/${listing.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                  </TableRow>
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
    const matchesRole = filters.role === 'all' || (user.roleId?.toString() || '1') === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch = !searchTerm || 
      (user.firstName || '').toLowerCase().includes(searchTerm) ||
      (user.lastName || '').toLowerCase().includes(searchTerm) ||
      (user.email || '').toLowerCase().includes(searchTerm);

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
                          {user.firstName?.[0] || 'U'}{user.lastName?.[0] || ''}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.firstName || 'Unknown'} {user.lastName || 'User'}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={user.roleId?.toString() || '1'} 
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

// CSV Upload Tab Component
export function CSVUploadTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV Data Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CSV upload functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Tax Rates Tab Component
export function TaxRatesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Tax Rates Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tax rates management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Processing Fees Tab Component
export function ProcessingFeesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Processing Fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Processing fees management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Category Rules Tab Component
export function CategoryRulesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Category Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Category rules management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Depreciation Rates Tab Component
export function DepreciationRatesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Depreciation Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Depreciation rates management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced Listings Management Tab Component
export function EnhancedListingsManagementTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Enhanced Listings Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Enhanced listings management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}