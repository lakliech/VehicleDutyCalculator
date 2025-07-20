import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Shield, Search, CheckCircle, XCircle, AlertTriangle, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/navigation';
import { ModuleNavigation } from '@/components/module-navigation';

interface VerificationResult {
  status: 'verified' | 'not_found' | 'invalid' | 'error';
  chassisNumber: string;
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: string;
    engine?: string;
    mileage?: string;
    registrationDate?: string;
    lastInspection?: string;
    certificateNumber?: string;
    chassisNumber?: string;
    inspectionCenter?: string;
    status?: string;
  };
  message?: string;
  timestamp: string;
}

export default function MileageVerification() {
  const [chassisNumber, setChassisNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<VerificationResult[]>([]);
  const { toast } = useToast();

  const handleVerification = async () => {
    if (!chassisNumber.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid chassis number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/verify-mileage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chassisNumber: chassisNumber.trim() }),
      });

      if (!response.ok) {
        throw new Error('Verification service unavailable');
      }

      const data = await response.json();
      
      const verificationResult: VerificationResult = {
        status: data.status,
        chassisNumber: chassisNumber.trim(),
        vehicleDetails: data.vehicleDetails,
        message: data.message,
        timestamp: new Date().toLocaleString(),
      };

      setResult(verificationResult);
      setSearchHistory(prev => [verificationResult, ...prev.slice(0, 9)]); // Keep last 10 searches

      if (data.status === 'verified') {
        toast({
          title: "Verification Successful",
          description: "Vehicle details retrieved successfully",
        });
      } else if (data.status === 'not_found') {
        toast({
          title: "No Records Found",
          description: "No verification records found for this chassis number",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.message || "Unable to verify chassis number",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      const errorResult: VerificationResult = {
        status: 'error',
        chassisNumber: chassisNumber.trim(),
        message: 'Network error or service unavailable',
        timestamp: new Date().toLocaleString(),
      };
      setResult(errorResult);
      
      toast({
        title: "Verification Error",
        description: "Unable to connect to verification service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case 'not_found':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertTriangle className="h-3 w-3 mr-1" />Not Found</Badge>;
      case 'invalid':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="h-3 w-3 mr-1" />Invalid</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Mileage Verification</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Verify vehicle mileage and authenticity using chassis number lookup. 
              Get instant verification of vehicle history and inspection records.
            </p>
          </div>

          <ModuleNavigation />

          {/* Verification Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-purple-600" />
                <span>Vehicle Verification</span>
              </CardTitle>
              <CardDescription>
                Enter the chassis number (VIN) to verify vehicle mileage and inspection records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chassisNumber">Chassis Number / VIN</Label>
                <div className="flex space-x-2">
                  <Input
                    id="chassisNumber"
                    placeholder="Enter chassis number (e.g., WBAFB13030AL12345)"
                    value={chassisNumber}
                    onChange={(e) => setChassisNumber(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                    className="font-mono"
                    maxLength={17}
                  />
                  <Button 
                    onClick={handleVerification}
                    disabled={isLoading || !chassisNumber.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Verification service connects to official vehicle inspection databases. 
                  Results may vary based on vehicle registration country and available records.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Verification Result */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Verification Result</span>
                  {getStatusBadge(result.status)}
                </CardTitle>
                <CardDescription>
                  Chassis Number: <span className="font-mono font-semibold">{result.chassisNumber}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result.status === 'verified' && result.vehicleDetails ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.vehicleDetails.make && (
                        <div>
                          <Label className="text-sm text-gray-500">Make</Label>
                          <p className="font-semibold">{result.vehicleDetails.make}</p>
                        </div>
                      )}
                      {result.vehicleDetails.model && (
                        <div>
                          <Label className="text-sm text-gray-500">Model</Label>
                          <p className="font-semibold">{result.vehicleDetails.model}</p>
                        </div>
                      )}
                      {result.vehicleDetails.year && (
                        <div>
                          <Label className="text-sm text-gray-500">Year</Label>
                          <p className="font-semibold">{result.vehicleDetails.year}</p>
                        </div>
                      )}
                      {result.vehicleDetails.engine && (
                        <div>
                          <Label className="text-sm text-gray-500">Engine</Label>
                          <p className="font-semibold">{result.vehicleDetails.engine}</p>
                        </div>
                      )}
                      {result.vehicleDetails.mileage && (
                        <div>
                          <Label className="text-sm text-gray-500">Verified Mileage</Label>
                          <p className="font-semibold text-green-600">{result.vehicleDetails.mileage}</p>
                        </div>
                      )}
                      {result.vehicleDetails.registrationDate && (
                        <div>
                          <Label className="text-sm text-gray-500">Registration Date</Label>
                          <p className="font-semibold">{result.vehicleDetails.registrationDate}</p>
                        </div>
                      )}
                      {result.vehicleDetails.lastInspection && (
                        <div>
                          <Label className="text-sm text-gray-500">Last Inspection</Label>
                          <p className="font-semibold">{result.vehicleDetails.lastInspection}</p>
                        </div>
                      )}
                      {result.vehicleDetails.certificateNumber && (
                        <div>
                          <Label className="text-sm text-gray-500">Certificate Number</Label>
                          <p className="font-mono text-sm">{result.vehicleDetails.certificateNumber}</p>
                        </div>
                      )}
                      {result.vehicleDetails.inspectionCenter && (
                        <div>
                          <Label className="text-sm text-gray-500">Inspection Center</Label>
                          <p className="font-semibold">{result.vehicleDetails.inspectionCenter}</p>
                        </div>
                      )}
                      {result.vehicleDetails.status && (
                        <div>
                          <Label className="text-sm text-gray-500">Inspection Status</Label>
                          <p className={`font-semibold ${result.vehicleDetails.status === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
                            {result.vehicleDetails.status}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <XCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="font-medium mb-2">
                      {result.status === 'not_found' ? 'No Records Found' : 
                       result.status === 'invalid' ? 'Invalid Chassis Number' : 'Verification Error'}
                    </p>
                    <p className="text-sm">
                      {result.message || 'Unable to retrieve vehicle verification data'}
                    </p>
                  </div>
                )}
                
                <Separator className="my-4" />
                <div className="text-xs text-gray-500">
                  Verified at: {result.timestamp}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Searches</CardTitle>
                <CardDescription>Your last verification searches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {searchHistory.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-medium">{search.chassisNumber}</span>
                        {getStatusBadge(search.status)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {search.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How Mileage Verification Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Enter Chassis Number</h3>
                  <p className="text-sm text-gray-600">
                    Input the vehicle's chassis number (VIN) for verification
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">Database Lookup</h3>
                  <p className="text-sm text-gray-600">
                    System queries official inspection databases for records
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Instant Results</h3>
                  <p className="text-sm text-gray-600">
                    Get verified mileage and vehicle history information
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}