import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft,
  X,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Users,
  Phone,
  MessageCircle,
  CreditCard,
  Share2,
  Heart
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface CarListing {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  location: string;
  images: string[];
  features: string[];
  favoriteCount: number;
  viewCount: number;
  phoneNumber: string;
  dealerName?: string;
  dealerLogoUrl?: string;
  isVerifiedDealer?: boolean;
  engineSize?: string;
  drivetrain?: string;
  seats?: number;
  color?: string;
  condition?: string;
}

export default function CompareCars() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [compareIds, setCompareIds] = useState<number[]>([]);

  // Get comparison IDs from URL parameters or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idsParam = urlParams.get('ids');
    
    if (idsParam) {
      const ids = idsParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
      setCompareIds(ids);
    } else {
      // Fallback to localStorage
      const storedIds = localStorage.getItem('compareIds');
      if (storedIds) {
        const ids = JSON.parse(storedIds);
        setCompareIds(ids);
      }
    }
  }, []);

  // Fetch car details for comparison
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['/api/car-listings/compare', compareIds],
    enabled: compareIds.length > 0,
    retry: 2,
  });

  const handleRemoveFromComparison = (carId: number) => {
    const newIds = compareIds.filter(id => id !== carId);
    setCompareIds(newIds);
    
    // Update localStorage
    localStorage.setItem('compareIds', JSON.stringify(newIds));
    
    // Update URL
    if (newIds.length > 0) {
      const newUrl = `${window.location.pathname}?ids=${newIds.join(',')}`;
      window.history.replaceState(null, '', newUrl);
    } else {
      setLocation('/buy-a-car');
    }

    toast({
      title: "Removed from comparison",
      description: "Vehicle removed from comparison.",
    });
  };

  const handleContactSeller = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleMessageSeller = (carId: number) => {
    setLocation(`/car/${carId}#message`);
  };

  const handleFinanceOptions = (carId: number) => {
    setLocation(`/car/${carId}#financial`);
  };

  const handleViewDetails = (carId: number) => {
    setLocation(`/car/${carId}`);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/compare?ids=${compareIds.join(',')}`;
    if (navigator.share) {
      navigator.share({
        title: 'Car Comparison - GariYangu',
        text: 'Compare these vehicles on GariYangu',
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Comparison link copied to clipboard.",
      });
    }
  };

  if (compareIds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No vehicles to compare</h2>
          <p className="text-gray-600 mb-6">Select vehicles from the marketplace to compare them here.</p>
          <Button onClick={() => setLocation('/buy-a-car')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse Vehicles
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setLocation('/buy-a-car')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </div>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(compareIds.length)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cars) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              Failed to load comparison data. Please try again.
            </AlertDescription>
          </Alert>
          <Button onClick={() => setLocation('/buy-a-car')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  const comparisonFeatures = [
    { key: 'price', label: 'Price', format: (value: any) => `KES ${value?.toLocaleString() || 'N/A'}` },
    { key: 'year', label: 'Year', format: (value: any) => value || 'N/A' },
    { key: 'mileage', label: 'Mileage', format: (value: any) => `${value?.toLocaleString() || 'N/A'} km` },
    { key: 'fuelType', label: 'Fuel Type', format: (value: any) => value || 'N/A' },
    { key: 'transmission', label: 'Transmission', format: (value: any) => value || 'N/A' },
    { key: 'bodyType', label: 'Body Type', format: (value: any) => value || 'N/A' },
    { key: 'engineSize', label: 'Engine Size', format: (value: any) => value || 'N/A' },
    { key: 'drivetrain', label: 'Drivetrain', format: (value: any) => value || 'N/A' },
    { key: 'seats', label: 'Seats', format: (value: any) => value || 'N/A' },
    { key: 'color', label: 'Color', format: (value: any) => value || 'N/A' },
    { key: 'condition', label: 'Condition', format: (value: any) => value || 'N/A' },
    { key: 'location', label: 'Location', format: (value: any) => value || 'N/A' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation('/buy-a-car')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
            <h1 className="text-2xl font-bold">Compare Vehicles ({cars.length})</h1>
          </div>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Comparison
          </Button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cars.map((car: CarListing) => (
            <Card key={car.id} className="relative">
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white/90"
                onClick={() => handleRemoveFromComparison(car.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <CardHeader className="pb-2">
                <div className="relative">
                  <img
                    src={car.images[0] || '/placeholder-car.jpg'}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {car.isVerifiedDealer && (
                    <Badge className="absolute bottom-2 left-2 bg-green-500">
                      Verified Dealer
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">
                  {car.year} {car.make} {car.model}
                </CardTitle>
                <p className="text-2xl font-bold text-purple-600">
                  KES {car.price.toLocaleString()}
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-gray-500" />
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3 w-3 text-gray-500" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span>{car.location}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button size="sm" onClick={() => handleViewDetails(car.id)}>
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleContactSeller(car.phoneNumber)}>
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleMessageSeller(car.id)}>
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleFinanceOptions(car.id)}>
                    <CreditCard className="h-3 w-3 mr-1" />
                    Finance
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    {cars.map((car: CarListing) => (
                      <th key={car.id} className="text-center p-3 font-semibold min-w-48">
                        {car.year} {car.make} {car.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr key={feature.key} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{feature.label}</td>
                      {cars.map((car: CarListing) => (
                        <td key={car.id} className="p-3 text-center">
                          {feature.format((car as any)[feature.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  
                  {/* Features Comparison */}
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">Features</td>
                    {cars.map((car: CarListing) => (
                      <td key={car.id} className="p-3">
                        <div className="space-y-1">
                          {car.features?.slice(0, 5).map((feature, index) => (
                            <div key={index} className="flex items-center gap-1 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {car.features?.length > 5 && (
                            <p className="text-xs text-gray-500">
                              +{car.features.length - 5} more features
                            </p>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}