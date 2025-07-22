import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Crown, Shield, Users, Settings, BarChart3, Headphones, MessageSquare, Briefcase, Database, UserCog, Plus, Edit, UserCheck } from "lucide-react";

interface UserRole {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

interface AppUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roleId: number;
  status: string;
  role?: UserRole;
}

const roleCategories = {
  "Core Administrative": {
    icon: Crown,
    color: "bg-red-100 text-red-800",
    roles: ["super_admin", "platform_admin"]
  },
  "Specialized Management": {
    icon: Shield,
    color: "bg-blue-100 text-blue-800", 
    roles: ["marketplace_manager", "financial_manager", "content_moderator", "customer_support_manager"]
  },
  "Business Operations": {
    icon: Briefcase,
    color: "bg-green-100 text-green-800",
    roles: ["marketing_manager", "dealer_relations_manager", "product_manager"]
  },
  "Technical": {
    icon: Database,
    color: "bg-purple-100 text-purple-800",
    roles: ["system_administrator", "data_analyst"]
  },
  "Service-Specific": {
    icon: Headphones,
    color: "bg-orange-100 text-orange-800",
    roles: ["concierge_service_manager", "financial_services_coordinator"]
  },
  "Basic": {
    icon: Users,
    color: "bg-gray-100 text-gray-800",
    roles: ["user", "editor", "admin"]
  }
};

export default function RoleManagementTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserRoleDialogOpen, setIsUserRoleDialogOpen] = useState(false);

  // Fetch all roles
  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["/api/admin/roles"],
  });

  // Fetch all users with their roles
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users-with-roles"],
  });

  // Create role mutation
  const createRoleMutation = useMutation({
    mutationFn: async (roleData: Omit<UserRole, 'id' | 'createdAt'>) => {
      await apiRequest("POST", "/api/admin/roles", roleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/roles"] });
      toast({
        title: "Success",
        description: "Role created successfully",
      });
      setIsRoleDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create role",
        variant: "destructive",
      });
    },
  });

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: number }) => {
      await apiRequest("PUT", `/api/admin/users/${userId}/role`, { roleId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users-with-roles"] });
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      setIsUserRoleDialogOpen(false);
      setSelectedUser(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error", 
        description: error.message || "Failed to update user role",
        variant: "destructive",
      });
    },
  });

  const handleUserRoleUpdate = (newRoleId: number) => {
    if (selectedUser) {
      updateUserRoleMutation.mutate({
        userId: selectedUser.id,
        roleId: newRoleId
      });
    }
  };

  const getRoleIcon = (roleName: string) => {
    for (const [categoryName, category] of Object.entries(roleCategories)) {
      if (category.roles.includes(roleName)) {
        const IconComponent = category.icon;
        return <IconComponent className="w-4 h-4" />;
      }
    }
    return <UserCog className="w-4 h-4" />;
  };

  const getRoleCategory = (roleName: string) => {
    for (const [categoryName, category] of Object.entries(roleCategories)) {
      if (category.roles.includes(roleName)) {
        return {
          name: categoryName,
          color: category.color
        };
      }
    }
    return { name: "Other", color: "bg-gray-100 text-gray-800" };
  };

  if (rolesLoading || usersLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Role Management</h2>
          <p className="text-gray-600">Manage system roles and user permissions</p>
        </div>
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Create a new system role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <RoleForm onSubmit={(data) => createRoleMutation.mutate(data)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList>
          <TabsTrigger value="roles">System Roles</TabsTrigger>
          <TabsTrigger value="users">User Role Assignment</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(roleCategories).map(([categoryName, category]) => {
              const categoryRoles = roles.filter((role: UserRole) => 
                category.roles.includes(role.name)
              );
              
              if (categoryRoles.length === 0) return null;

              const IconComponent = category.icon;
              
              return (
                <Card key={categoryName}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {categoryName}
                    </CardTitle>
                    <CardDescription>
                      {categoryRoles.length} roles in this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {categoryRoles.map((role: UserRole) => (
                        <Card key={role.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getRoleIcon(role.name)}
                                <h4 className="font-semibold capitalize">
                                  {role.name.replace(/_/g, ' ')}
                                </h4>
                              </div>
                              <Badge className={category.color}>
                                {role.permissions.length} permissions
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {role.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 3).map((permission: string) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permission.replace(/_/g, ' ')}
                                </Badge>
                              ))}
                              {role.permissions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{role.permissions.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4">
            {users.map((user: AppUser) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {user.firstName} {user.lastName} 
                        </h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {user.role && (
                        <Badge className={getRoleCategory(user.role.name).color}>
                          {user.role.name.replace(/_/g, ' ')}
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserRoleDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Change Role
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Overview of all permissions across different roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <PermissionMatrix roles={roles} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Role Assignment Dialog */}
      <Dialog open={isUserRoleDialogOpen} onOpenChange={setIsUserRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Assign a new role to {selectedUser?.firstName} {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="text-sm">
                <p><strong>User:</strong> {selectedUser.email}</p>
                <p><strong>Current Role:</strong> {selectedUser.role?.name.replace(/_/g, ' ')}</p>
              </div>
              <div className="grid gap-2">
                <Label>Select New Role</Label>
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {roles.map((role: UserRole) => (
                    <Button
                      key={role.id}
                      variant={selectedUser.roleId === role.id ? "default" : "outline"}
                      className="justify-start h-auto p-3"
                      onClick={() => handleUserRoleUpdate(role.id)}
                      disabled={updateUserRoleMutation.isPending}
                    >
                      <div className="text-left">
                        <div className="font-medium">
                          {role.name.replace(/_/g, ' ')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {role.description}
                        </div>
                      </div>
                    </Button>
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

// Role creation form component
function RoleForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const permissions = formData.permissions
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    onSubmit({
      name: formData.name,
      description: formData.description,
      permissions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., content_moderator"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of this role"
          required
        />
      </div>
      <div>
        <Label htmlFor="permissions">Permissions (one per line)</Label>
        <Textarea
          id="permissions"
          value={formData.permissions}
          onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
          placeholder="manage_users&#10;view_listings&#10;moderate_content"
          rows={6}
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit">Create Role</Button>
      </DialogFooter>
    </form>
  );
}

// Permission matrix component
function PermissionMatrix({ roles }: { roles: UserRole[] }) {
  const allPermissions = Array.from(
    new Set(roles.flatMap(role => role.permissions))
  ).sort();

  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="text-left p-2 border-b">Permission</th>
          {roles.map(role => (
            <th key={role.id} className="text-center p-2 border-b min-w-[120px]">
              {role.name.replace(/_/g, ' ')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {allPermissions.map(permission => (
          <tr key={permission}>
            <td className="p-2 border-b font-medium">
              {permission.replace(/_/g, ' ')}
            </td>
            {roles.map(role => (
              <td key={role.id} className="text-center p-2 border-b">
                {role.permissions.includes(permission) ? (
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}