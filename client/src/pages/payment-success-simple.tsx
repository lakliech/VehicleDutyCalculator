import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PaymentSuccessSimple() {
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    // Extract reference from URL parameters
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('reference');
    if (ref) {
      setReference(ref);
    }
  }, []);

  const { data: paymentStatus, isLoading, error } = useQuery({
    queryKey: ['payment-verification', reference],
    queryFn: async () => {
      if (!reference) return null;
      
      // Get stored listing data
      const storedListingData = localStorage.getItem('pendingListingData');
      
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          paystackReference: reference,
          listingData: storedListingData ? JSON.parse(storedListingData) : null
        }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const result = await response.json();
      
      // Clear stored listing data after successful processing
      if (result.success && storedListingData) {
        localStorage.removeItem('pendingListingData');
      }
      
      return result;
    },
    enabled: !!reference,
    retry: 3,
    retryDelay: 1000,
  });

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  const handleViewListings = () => {
    window.location.href = '/profile?tab=listings';
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
            Your car listing has been created successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {transaction && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Transaction Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>KES {transaction.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {transaction.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Reference:</span>
                  <span className="text-xs">{transaction.reference}</span>
                </div>
              </div>
            </div>
          )}
          
          {listing && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Listing Created</h3>
              <p className="text-sm text-gray-600">
                {listing.title} has been listed successfully
              </p>
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            <Button onClick={handleViewListings} className="w-full">
              View My Listings
            </Button>
            <Button onClick={handleReturnHome} variant="outline" className="w-full">
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}