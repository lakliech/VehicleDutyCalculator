import { useAuth } from "@/components/auth-provider";
import { AdminLogin } from "@/components/admin-login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-purple-600 animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Loading...
            </CardTitle>
            <CardDescription>
              Checking authentication status
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // If not authenticated, show admin login
  if (!user) {
    return <AdminLogin />;
  }

  // If admin access required, check user role
  if (requireAdmin) {
    // Handle both roleId directly on user and role object structure
    const userRole = (user as any).role;
    const roleId = (user as any).roleId || userRole?.id;
    const roleName = userRole?.name?.toLowerCase();
    
    const isAdmin = roleId === 3 || roleId === 4 || roleId === 5 ||
                   roleName === 'admin' || roleName === 'superadmin' || roleName === 'super_admin';
    
    console.log('Admin check:', { roleId, roleName, userRole, isAdmin });
    
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Access Denied
              </CardTitle>
              <CardDescription>
                Admin privileges required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You are logged in as {user.email}, but you don't have admin privileges. 
                  Please contact a superadmin to get admin access.
                  <br />
                  <small className="text-xs mt-2 block">
                    Current role: {roleName || 'No role'} (ID: {roleId || 'None'})
                  </small>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
}