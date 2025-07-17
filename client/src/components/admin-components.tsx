import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Edit, 
  Upload, 
  Percent, 
  Calculator, 
  Filter, 
  TrendingDown, 
  RefreshCw,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import type { 
  VehicleReference, 
  TaxRate, 
  ProcessingFee,
  VehicleCategoryRule, 
  DepreciationRate,
  CarListing,
  AppUser,
  UserRole
} from "@shared/schema";

// Vehicles Management Tab Component
export function VehiclesManagementTab({ 
  vehicleReferences,
  isLoading,
  formatCurrency,
  getAuthHeaders 
}: {
  vehicleReferences: VehicleReference[];
  isLoading: boolean;
  formatCurrency: (amount: string | number) => string;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading vehicles...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle Database Management
          </CardTitle>
          <CardDescription>
            Manage vehicle references and CRSP values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            Total Vehicles: {vehicleReferences.length}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Engine</TableHead>
                  <TableHead>Fuel</TableHead>
                  <TableHead>CRSP (KES)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleReferences.slice(0, 50).map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.make} {vehicle.model}
                    </TableCell>
                    <TableCell>{vehicle.engineCapacity}cc</TableCell>
                    <TableCell>{vehicle.fuelType}</TableCell>
                    <TableCell>
                      {vehicle.crspKes ? formatCurrency(vehicle.crspKes) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// CSV Upload Tab Component
export function CSVUploadTab({ getAuthHeaders }: { getAuthHeaders: () => Record<string, string> }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV Data Import
          </CardTitle>
          <CardDescription>
            Upload CSV files to bulk import vehicle references, tax rates, or other data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center text-gray-500">
            CSV upload functionality will be restored soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tax Rates Tab Component
export function TaxRatesTab({ 
  taxRates, 
  isLoading,
  getAuthHeaders 
}: {
  taxRates: TaxRate[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading tax rates...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax Rate Configuration
          </CardTitle>
          <CardDescription>
            Manage import duty, excise duty, and VAT rates for different vehicle categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Category</TableHead>
                  <TableHead>Import Duty</TableHead>
                  <TableHead>Excise Duty</TableHead>
                  <TableHead>VAT</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.vehicleCategory}</TableCell>
                    <TableCell>{rate.importDutyRate}%</TableCell>
                    <TableCell>{rate.exciseDutyRate}%</TableCell>
                    <TableCell>{rate.vatRate}%</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Processing Fees Tab Component
export function ProcessingFeesTab({ 
  processingFees, 
  isLoading,
  getAuthHeaders 
}: {
  processingFees: ProcessingFee[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading processing fees...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Processing Fees Configuration
          </CardTitle>
          <CardDescription>
            Manage additional processing fees and charges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Fee Name</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Applicable To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processingFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.feeType}</TableCell>
                    <TableCell>{fee.feeName}</TableCell>
                    <TableCell>{fee.rate}%</TableCell>
                    <TableCell>{fee.applicableToImportType}</TableCell>
                    <TableCell>
                      <Badge variant={fee.isActive ? "default" : "secondary"}>
                        {fee.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Category Rules Tab Component
export function CategoryRulesTab({ 
  categoryRules, 
  isLoading,
  getAuthHeaders 
}: {
  categoryRules: VehicleCategoryRule[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading category rules...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Vehicle Category Rules
          </CardTitle>
          <CardDescription>
            Configure automatic vehicle categorization rules based on specifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Min Engine Size</TableHead>
                  <TableHead>Max Engine Size</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Body Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.category}</TableCell>
                    <TableCell>{rule.minEngineSize || "N/A"}</TableCell>
                    <TableCell>{rule.maxEngineSize || "N/A"}</TableCell>
                    <TableCell>{rule.fuelType || "Any"}</TableCell>
                    <TableCell>{rule.bodyType || "Any"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Depreciation Rates Tab Component
export function DepreciationRatesTab({ 
  depreciationRates, 
  isLoading,
  getAuthHeaders 
}: {
  depreciationRates: DepreciationRate[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading depreciation rates...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Depreciation Rates Configuration
          </CardTitle>
          <CardDescription>
            Manage age-based depreciation rates for different import types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Import Type</TableHead>
                  <TableHead>Age Range</TableHead>
                  <TableHead>Depreciation Rate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depreciationRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.importType}</TableCell>
                    <TableCell>
                      {rate.minAge} - {rate.maxAge} years
                    </TableCell>
                    <TableCell>{rate.depreciationRate}%</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced Listings Management Tab Component
export function EnhancedListingsManagementTab({ 
  carListings,
  isLoading,
  formatCurrency,
  getAuthHeaders 
}: {
  carListings: CarListing[];
  isLoading: boolean;
  formatCurrency: (amount: string | number) => string;
  getAuthHeaders: () => Record<string, string>;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  
  // Enhanced filtering and sorting state
  const [filters, setFilters] = useState({
    status: 'all',
    sellerType: 'all', 
    make: 'all',
    model: 'all',
    minPrice: '',
    maxPrice: '',
    location: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  
  const [sorting, setSorting] = useState({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50
  });

  // Build query parameters
  const queryParams = new URLSearchParams({
    ...filters,
    ...sorting,
    page: pagination.page.toString(),
    limit: pagination.limit.toString()
  });

  const { data: listingsResponse } = useQuery({
    queryKey: ["/api/admin/listings-with-stats", queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/admin/listings-with-stats?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const listings = listingsResponse?.listings || carListings;
  const paginationInfo = listingsResponse?.pagination;
  const filterOptions = listingsResponse?.filters;

  const approveListingMutation = useMutation({
    mutationFn: async ({ listingId, notes }: { listingId: number; notes?: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ notes }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings-with-stats"] });
      toast({ title: "Success", description: "Listing approved successfully" });
    },
  });

  const rejectListingMutation = useMutation({
    mutationFn: async ({ listingId, reason }: { listingId: number; reason: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings-with-stats"] });
      toast({ title: "Success", description: "Listing rejected" });
    },
  });

  const bulkActionMutation = useMutation({
    mutationFn: async ({ listingIds, action }: { listingIds: number[]; action: string }) => {
      const response = await fetch(`/api/admin/bulk-update-listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ listingIds, status: action }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings-with-stats"] });
      toast({ title: "Success", description: "Bulk action completed" });
      setSelectedListings([]);
      setBulkAction("");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading listings...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
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
            Car Listings Management ({listings.length})
          </CardTitle>
          <CardDescription>
            Review and manage vehicle listings from sellers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters Section */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="make-filter">Make</Label>
                <Select value={filters.make} onValueChange={(value) => setFilters(prev => ({ ...prev, make: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Makes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {filterOptions?.makes?.map((make: string) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="min-price">Min Price</Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="max-price">Max Price</Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search listings..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    status: 'all',
                    sellerType: 'all',
                    make: 'all',
                    model: 'all',
                    minPrice: '',
                    maxPrice: '',
                    location: 'all',
                    dateFrom: '',
                    dateTo: '',
                    search: ''
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedListings.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {selectedListings.length} listing(s) selected
                </span>
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve Selected</SelectItem>
                    <SelectItem value="reject">Reject Selected</SelectItem>
                    <SelectItem value="activate">Activate Selected</SelectItem>
                    <SelectItem value="deactivate">Deactivate Selected</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => bulkAction && bulkActionMutation.mutate({ listingIds: selectedListings, action: bulkAction })}
                  disabled={!bulkAction || bulkActionMutation.isPending}
                >
                  Apply Action
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={selectedListings.length === listings.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedListings(listings.map((l: any) => l.id));
                        } else {
                          setSelectedListings([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing: any) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedListings.includes(listing.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedListings(prev => [...prev, listing.id]);
                          } else {
                            setSelectedListings(prev => prev.filter(id => id !== listing.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div>{listing.make} {listing.model}</div>
                        <div className="text-sm text-gray-500">{listing.year} • {listing.engineCapacity}cc</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(listing.price)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{listing.sellerName || 'Unknown'}</div>
                        <div className="text-gray-500">{listing.sellerId}</div>
                      </div>
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
                    <TableCell>{listing.viewCount || 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => approveListingMutation.mutate({ listingId: listing.id })}
                          disabled={listing.status === 'active'}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectListingMutation.mutate({ listingId: listing.id, reason: 'Admin rejection' })}
                          disabled={listing.status === 'rejected'}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {paginationInfo && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {((paginationInfo.page - 1) * paginationInfo.limit) + 1} to {Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of {paginationInfo.total} listings
              </div>
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
                <span className="text-sm">
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
          <CardContent>
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = filters.search === '' || 
      user.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesRole = filters.role === 'all' || user.roleId?.toString() === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management ({filteredUsers.length})
          </CardTitle>
          <CardDescription>
            Manage user accounts and roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters Section */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="role-filter">Role</Label>
                <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {userRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status-filter">Status</Label>
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
              
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({ role: 'all', status: 'all', search: '' })}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoUrl} />
                          <AvatarFallback>
                            {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name || 'Unnamed User'}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.roleId?.toString()}
                        onValueChange={(value) => {
                          updateUserRoleMutation.mutate({
                            userId: user.id,
                            roleId: parseInt(value),
                          });
                        }}
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
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}