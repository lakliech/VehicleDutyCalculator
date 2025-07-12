import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/auth-provider";
import { Shield, Users, AlertTriangle, Chrome } from "lucide-react";

export function AdminLogin() {
  const { user } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const isAdmin = user?.roleId === 3 || user?.roleId === 4;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Admin Access
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Role-based authentication for admin dashboard
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user ? (
            <>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please sign in with Google to access admin features. Only users with admin roles can access the dashboard.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <Chrome className="h-4 w-4" />
                Sign in with Google
              </Button>
            </>
          ) : !isAdmin ? (
            <Alert variant="destructive">
              <Users className="h-4 w-4" />
              <AlertDescription>
                You are logged in as {user.email}, but you don't have admin privileges. 
                Please contact a superadmin to get admin access.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Welcome {user.email}! You have admin access. You can now access the admin dashboard.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">Admin Credentials for Testing:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Email: admin@gariyangu.com</p>
              <p>Password: admin123</p>
              <p className="text-yellow-600">Note: These are test credentials for development</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}