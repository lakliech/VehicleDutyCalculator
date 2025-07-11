import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  User, 
  AlertTriangle, 
  Ban, 
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  Activity,
  Car,
  Eye,
  Edit,
  UserX,
  FileText
} from "lucide-react";

interface AppUser {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profileImageUrl?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    lastLoginAt?: string;
    createdAt: string;
  };
  role: {
    id: number;
    name: string;
    description?: string;
  };
  stats?: {
    totalListings: number;
    activeListings: number;
    totalViews: number;
    totalInquiries: number;
  };
  warningCount: number;
  listingCount: number;
}

export default function AdminUsers() {
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    page: 1,
    limit: 20
  });
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [suspendDuration, setSuspendDuration] = useState('');
  const [showUserHistory, setShowUserHistory] = useState(false);
  const [userHistory, setUserHistory] = useState<any>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Users query with filters
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['/api/admin/users-management', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '') {
          params.append(key, value.toString());
        }
      });
      return apiRequest('GET', `/api/admin/users-management?${params.toString()}`);
    },
    enabled: true,
  });

  // User history query
  const fetchUserHistory = async (userId: string) => {
    try {
      const history = await apiRequest('GET', `/api/admin/user/${userId}/history`);
      setUserHistory(history);
      setShowUserHistory(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user history",
        variant: "destructive",
      });
    }
  };

  // Suspend user mutation
  const suspendMutation = useMutation({
    mutationFn: (data: { userId: string; reason: string; duration?: string }) =>
      apiRequest('POST', `/api/admin/user/${data.userId}/suspend`, { 
        reason: data.reason, 
        duration: data.duration 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users-management'] });
      setShowSuspendDialog(false);
      setSuspendReason('');
      setSuspendDuration('');
      setSelectedUser(null);
      toast({
        title: "Success",
        description: "User suspended successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to suspend user",
        variant: "destructive",
      });
    },
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Admin</Badge>;
      case 'moderator':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Moderator</Badge>;
      case 'editor':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Editor</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  const getStatusBadge = (isActive: boolean, warningCount: number) => {
    if (!isActive) {
      return <Badge variant="destructive">Suspended</Badge>;
    }
    if (warningCount > 0) {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Warned</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage platform users</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Users
          </Button>
        </div>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.total || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {usersData?.users?.filter((u: AppUser) => u.user.isActive).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warned Users</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {usersData?.users?.filter((u: AppUser) => u.warningCount > 0).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {usersData?.users?.filter((u: AppUser) => !u.user.isActive).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by name, email..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({usersData?.total || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {usersData?.users?.map((userItem: AppUser) => (
                <div key={userItem.user.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      {userItem.user.profileImageUrl ? (
                        <img 
                          src={userItem.user.profileImageUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    
                    {/* User Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {userItem.user.firstName} {userItem.user.lastName}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {userItem.user.email}
                            </div>
                            {userItem.user.phoneNumber && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {userItem.user.phoneNumber}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Joined {formatDate(userItem.user.createdAt)}
                            </div>
                            {userItem.user.lastLoginAt && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Activity className="w-4 h-4" />
                                  Last login {formatDate(userItem.user.lastLoginAt)}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            {getRoleBadge(userItem.role.name)}
                            {getStatusBadge(userItem.user.isActive, userItem.warningCount)}
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Car className="w-4 h-4" />
                              {userItem.listingCount} listings
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* User Stats */}
                      {userItem.stats && (
                        <div className="grid grid-cols-4 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-purple-600">
                              {userItem.stats.totalListings}
                            </div>
                            <div className="text-xs text-gray-500">Total Listings</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">
                              {userItem.stats.activeListings}
                            </div>
                            <div className="text-xs text-gray-500">Active</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-blue-600">
                              {userItem.stats.totalViews}
                            </div>
                            <div className="text-xs text-gray-500">Total Views</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-cyan-600">
                              {userItem.stats.totalInquiries}
                            </div>
                            <div className="text-xs text-gray-500">Inquiries</div>
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fetchUserHistory(userItem.user.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </Button>
                        {userItem.user.isActive ? (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedUser(userItem);
                              setShowSuspendDialog(true);
                            }}
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Shield className="w-4 h-4 mr-2" />
                            Reactivate
                          </Button>
                        )}
                        {userItem.warningCount > 0 && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                            {userItem.warningCount} warning(s)
                          </Badge>
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
      {usersData && usersData.total > filters.limit && (
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
              Page {filters.page} of {Math.ceil(usersData.total / filters.limit)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('page', filters.page + 1)}
              disabled={filters.page >= Math.ceil(usersData.total / filters.limit)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Suspend User Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {selectedUser?.user.firstName} {selectedUser?.user.lastName}?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Suspension reason (required)"
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
            />
            <Select value={suspendDuration} onValueChange={setSuspendDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Suspension duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                if (selectedUser && suspendReason.trim()) {
                  suspendMutation.mutate({ 
                    userId: selectedUser.user.id, 
                    reason: suspendReason,
                    duration: suspendDuration
                  });
                }
              }}
              disabled={!suspendReason.trim() || suspendMutation.isPending}
            >
              {suspendMutation.isPending ? 'Suspending...' : 'Suspend User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User History Dialog */}
      <Dialog open={showUserHistory} onOpenChange={setShowUserHistory}>
        <DialogContent className="max-w-4xl max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Activity History</DialogTitle>
          </DialogHeader>
          {userHistory && (
            <div className="space-y-6">
              {/* Listings */}
              <div>
                <h3 className="font-semibold mb-3">Listings ({userHistory.listings?.length || 0})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {userHistory.listings?.map((listing: any) => (
                    <div key={listing.id} className="p-2 border rounded text-sm">
                      <div className="font-medium">{listing.title}</div>
                      <div className="text-gray-500">
                        {formatDate(listing.createdAt)} • {listing.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              <div>
                <h3 className="font-semibold mb-3">Warnings ({userHistory.warnings?.length || 0})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {userHistory.warnings?.map((warning: any) => (
                    <div key={warning.id} className="p-2 border rounded text-sm bg-yellow-50">
                      <div className="font-medium text-yellow-800">{warning.warningType}</div>
                      <div className="text-gray-600">{warning.description}</div>
                      <div className="text-gray-500 text-xs">
                        {formatDate(warning.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h3 className="font-semibold mb-3">Recent Activities ({userHistory.activities?.length || 0})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {userHistory.activities?.map((activity: any) => (
                    <div key={activity.id} className="p-2 border rounded text-sm">
                      <div className="font-medium">{activity.activityType}</div>
                      <div className="text-gray-500">{activity.description}</div>
                      <div className="text-gray-400 text-xs">
                        {formatDate(activity.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}