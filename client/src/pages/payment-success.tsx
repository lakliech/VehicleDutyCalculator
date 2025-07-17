import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const [, navigate] = useRouter();
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    // Extract reference from URL parameters
    const params = new URLSearchParams(location.split('?')[1]);
    const ref = params.get('reference');
    if (ref) {
      setReference(ref);
    }
  }, [location]);

  const { data: paymentStatus, isLoading, error } = useQuery({
    queryKey: ['payment-verification', reference],
    queryFn: async () => {
      if (!reference) return null;
      
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ paystackReference: reference }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return response.json();
    },
    enabled: !!reference,
    retry: 3,
    retryDelay: 1000,
  });

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleViewListings = () => {
    navigate('/profile?tab=listings');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
            <CardTitle>Verifying Payment</CardTitle>
            <CardDescription>
              Please wait while we verify your payment...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error || !paymentStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <CardTitle>Payment Verification Failed</CardTitle>
            <CardDescription>
              We couldn't verify your payment. Please contact support if you believe this is an error.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleReturnHome} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { success, transaction, listing } = paymentStatus;

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <CardTitle>Payment Failed</CardTitle>
            <CardDescription>
              Your payment was not successful. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleReturnHome} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <CardTitle>Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed and your listing has been created.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Transaction Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">KES {parseFloat(transaction?.amount || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-medium font-mono text-xs">{reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Paid
                </Badge>
              </div>
            </div>
          </div>

          {/* Listing Details */}
          {listing && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Your Listing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{listing.year} {listing.make} {listing.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">KES {parseFloat(listing.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Under Review
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button onClick={handleViewListings} className="w-full bg-purple-600 hover:bg-purple-700">
              View My Listings
            </Button>
            <Button onClick={handleReturnHome} variant="outline" className="w-full">
              Return to Home
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-1">What's Next?</h4>
            <p className="text-sm text-blue-800">
              Your listing is now under review. You'll receive an email notification once it's approved and live on the marketplace.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}