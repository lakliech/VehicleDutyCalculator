import { useAuth } from "@/components/auth-provider";

export interface UserRole {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export interface RoleBasedAccess {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPlatformAdmin: boolean;
  isSystemAdmin: boolean;
  hasRole: (roleNames: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  roleId: number | null;
  roleName: string | null;
  userRole: UserRole | null;
}

/**
 * Hook to manage role-based access control throughout the application
 */
export function useRoleBasedAccess(): RoleBasedAccess {
  const { user } = useAuth();
  
  const userRole = (user as any)?.role as UserRole | undefined;
  const roleId = (user as any)?.roleId || userRole?.id || null;
  const roleName = userRole?.name?.toLowerCase() || null;
  
  // Define admin role IDs and names
  const adminRoleIds = [3, 4, 5, 6, 14]; // admin, superadmin, super_admin, platform_admin, system_administrator
  const adminRoleNames = ['admin', 'superadmin', 'super_admin', 'platform_admin', 'system_administrator'];
  
  // Check if user has admin privileges
  const isAdmin = roleId !== null && (
    adminRoleIds.includes(roleId) || 
    (roleName !== null && adminRoleNames.includes(roleName))
  );
  
  // Check specific admin types
  const isSuperAdmin = roleId === 5 || roleName === 'super_admin' || roleId === 4 || roleName === 'superadmin';
  const isPlatformAdmin = roleId === 6 || roleName === 'platform_admin';
  const isSystemAdmin = roleId === 14 || roleName === 'system_administrator';
  
  /**
   * Check if user has any of the specified roles
   */
  const hasRole = (roleNames: string[]): boolean => {
    if (!roleName) return false;
    return roleNames.some(name => name.toLowerCase() === roleName);
  };
  
  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permission: string): boolean => {
    if (!userRole?.permissions) return false;
    return userRole.permissions.includes(permission) || userRole.permissions.includes('all_permissions');
  };
  
  return {
    isAdmin,
    isSuperAdmin,
    isPlatformAdmin,
    isSystemAdmin,
    hasRole,
    hasPermission,
    roleId,
    roleName,
    userRole: userRole || null
  };
}