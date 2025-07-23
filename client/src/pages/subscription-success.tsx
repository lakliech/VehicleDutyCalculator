import { useEffect, useState } from 'react';
import { useLocation, useRouter } from 'wouter';
import { CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function SubscriptionSuccess() {
  const [location] = useLocation();
  const [, navigate] = useRouter();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract payment reference from URL
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get('reference');
        
        if (!reference) {
          throw new Error('Payment reference not found');
        }

        // Verify payment with backend
        const response = await apiRequest('POST', '/api/unified-billing/verify-payment', {
          reference
        });

        if (response.success) {
          setVerificationStatus('success');
          setSubscriptionDetails(response.subscription);
          toast({
            title: "Subscription Activated",
            description: "Your subscription has been successfully activated!",
          });
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error: any) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
        toast({
          title: "Verification Failed",
          description: error.message || "Failed to verify payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [toast]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your subscription payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">Payment Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. Please contact support or try again.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/billing')}
                className="w-full"
              >
                Back to Billing
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Subscription Activated!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for subscribing! Your subscription is now active and you have access to all premium features.
          </p>
          
          {subscriptionDetails && (
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-2">Subscription Details:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium capitalize">{subscriptionDetails.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{subscriptionDetails.subscription_type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Billing:</span>
                  <span className="font-medium">
                    {new Date(subscriptionDetails.next_billing_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 pt-4">
            <Button 
              onClick={() => navigate('/billing')}
              className="w-full"
            >
              Manage Subscription
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Continue to Marketplace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}