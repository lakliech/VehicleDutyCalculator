import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface InvitationData {
  id: number;
  dealerId: number;
  invitationType: string;
  invitedEmail?: string;
  maxUses: number;
  currentUses: number;
  expiresAt?: string;
  metadata?: {
    invitationMessage?: string;
    redirectUrl?: string;
  };
}

interface DealerData {
  id: number;
  userId: string;
  dealerName: string;
  businessName: string;
  businessLocation: string;
  dealerBio?: string;
  isVerified: boolean;
}

export default function DealerInvitation() {
  const [match, params] = useRoute("/dealer-invitation/:token");
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [dealer, setDealer] = useState<DealerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const token = params?.token;

  // Fetch invitation details
  useEffect(() => {
    if (!token) return;

    const fetchInvitation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiRequest("GET", `/api/dealers/invitation/${token}`);
        const data = await response.json();
        
        if (data.success) {
          setInvitation(data.invitation);
          setDealer(data.dealer);
        } else {
          setError(data.error || "Invalid invitation");
        }
      } catch (err: any) {
        console.error("Failed to fetch invitation:", err);
        setError(err.message || "Failed to load invitation");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [token]);

  // Auto-accept invitation if user is authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated && invitation && dealer && !processing) {
      acceptInvitation();
    }
  }, [authLoading, isAuthenticated, invitation, dealer, processing]);

  const acceptInvitation = async () => {
    if (!token || processing) return;
    
    try {
      setProcessing(true);
      
      const response = await apiRequest("POST", `/api/dealers/invitation/${token}/accept`);
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Welcome!",
          description: data.message,
          variant: "default",
        });
        
        // Redirect to dealer profile
        setTimeout(() => {
          setLocation(data.redirectUrl || `/dealer/${dealer?.userId}`);
        }, 1500);
      } else {
        setError(data.error || "Failed to accept invitation");
        setProcessing(false);
      }
    } catch (err: any) {
      console.error("Failed to accept invitation:", err);
      setError(err.message || "Failed to accept invitation");
      setProcessing(false);
    }
  };

  const handleLoginRedirect = () => {
    // Store the invitation token in session storage for post-login processing
    sessionStorage.setItem('dealerInvitationToken', token || '');
    window.location.href = '/api/auth/google';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Invitation Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              onClick={() => setLocation('/')}
              variant="outline"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Joining Dealership</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">Processing your invitation...</p>
            <div className="animate-spin w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-gray-900">Dealer Invitation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {dealer && (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dealer.dealerName}
              </h3>
              <p className="text-gray-600 mb-1">{dealer.businessLocation}</p>
              {dealer.isVerified && (
                <div className="inline-flex items-center text-green-600 text-sm">
                  <Check className="w-4 h-4 mr-1" />
                  Verified Dealer
                </div>
              )}
              {dealer.dealerBio && (
                <p className="text-sm text-gray-500 mt-3">{dealer.dealerBio}</p>
              )}
            </div>
          )}

          {invitation?.metadata?.invitationMessage && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-800 text-sm">
                {invitation.metadata.invitationMessage}
              </p>
            </div>
          )}

          <div className="text-center">
            {isAuthenticated ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Welcome back! You'll be redirected to the dealer's profile.
                </p>
                <div className="animate-spin w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  You've been invited to join this dealer network. Please sign in to continue.
                </p>
                <Button 
                  onClick={handleLoginRedirect}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Sign In to Join
                </Button>
              </div>
            )}
          </div>

          {invitation && (
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Invitation Type: {invitation.invitationType}</p>
              <p>Uses: {invitation.currentUses}/{invitation.maxUses}</p>
              {invitation.expiresAt && (
                <p>Expires: {new Date(invitation.expiresAt).toLocaleDateString()}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}