import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Home } from 'lucide-react';

interface KenyanLocationSelectorProps {
  onLocationChange: (location: {
    locationType: 'locally_available' | 'overseas';
    county?: string;
    area?: string;
    specificLocation?: string;
  }) => void;
  defaultValues?: {
    locationType?: 'locally_available' | 'overseas';
    county?: string;
    area?: string;
    specificLocation?: string;
  };
}

const KenyanLocationSelector: React.FC<KenyanLocationSelectorProps> = ({ 
  onLocationChange, 
  defaultValues 
}) => {
  const [locationType, setLocationType] = useState<'locally_available' | 'overseas'>(
    defaultValues?.locationType || 'locally_available'
  );
  const [selectedCounty, setSelectedCounty] = useState<string | undefined>(defaultValues?.county);
  const [selectedArea, setSelectedArea] = useState<string | undefined>(defaultValues?.area);
  const [specificLocation, setSpecificLocation] = useState<string>(defaultValues?.specificLocation || '');

  // Fetch all Kenyan counties
  const { data: counties = [], isLoading: countiesLoading } = useQuery({
    queryKey: ['/api/kenyan-counties'],
    queryFn: () => fetch('/api/kenyan-counties').then(res => res.json()),
    staleTime: 60000 * 60, // Cache for 1 hour
  });

  // Fetch areas based on selected county
  const { data: areas = [], isLoading: areasLoading } = useQuery({
    queryKey: ['/api/kenyan-counties', selectedCounty, 'areas'],
    queryFn: () => {
      if (!selectedCounty) return Promise.resolve([]);
      return fetch(`/api/kenyan-counties/${encodeURIComponent(selectedCounty)}/areas`)
        .then(res => res.json());
    },
    enabled: !!selectedCounty,
    staleTime: 60000 * 60, // Cache for 1 hour
  });

  const handleLocationTypeChange = (type: 'locally_available' | 'overseas') => {
    setLocationType(type);
    setSelectedCounty(undefined);
    setSelectedArea(undefined);
    setSpecificLocation('');
    
    onLocationChange({
      locationType: type,
      county: undefined,
      area: undefined,
      specificLocation: ''
    });
  };

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    setSelectedArea(undefined); // Reset area when county changes
    
    onLocationChange({
      locationType,
      county,
      area: undefined,
      specificLocation
    });
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    
    onLocationChange({
      locationType,
      county: selectedCounty,
      area,
      specificLocation
    });
  };

  const handleSpecificLocationChange = (location: string) => {
    setSpecificLocation(location);
    
    onLocationChange({
      locationType,
      county: selectedCounty,
      area: selectedArea,
      specificLocation: location
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          Vehicle Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Type Selection */}
        <div className="space-y-2">
          <Label>Location Type</Label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                locationType === 'locally_available'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleLocationTypeChange('locally_available')}
            >
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium">Locally Available</p>
                  <p className="text-sm text-gray-600">Vehicle is in Kenya</p>
                </div>
              </div>
            </div>
            <div
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                locationType === 'overseas'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleLocationTypeChange('overseas')}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium">Overseas</p>
                  <p className="text-sm text-gray-600">Vehicle is abroad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kenya Location Selection */}
        {locationType === 'locally_available' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                Kenya
              </Badge>
              <span className="text-sm text-gray-600">Select county and area</span>
            </div>

            {/* County Selection */}
            <div className="space-y-2">
              <Label>County *</Label>
              <Select 
                value={selectedCounty || ""} 
                onValueChange={handleCountyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={countiesLoading ? "Loading counties..." : "Select county"} />
                </SelectTrigger>
                <SelectContent>
                  {counties.map((county: string) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Area Selection */}
            <div className="space-y-2">
              <Label>Area *</Label>
              <Select 
                value={selectedArea || ""} 
                onValueChange={handleAreaChange}
                disabled={!selectedCounty || areasLoading}
              >
                <SelectTrigger>
                  <SelectValue 
                    placeholder={
                      !selectedCounty 
                        ? "Select county first" 
                        : areasLoading 
                        ? "Loading areas..." 
                        : "Select area"
                    } 
                  />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area: string) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Specific Location */}
            <div className="space-y-2">
              <Label>Specific Location (Optional)</Label>
              <Input
                placeholder="e.g., Near ABC Mall, Street name, etc."
                value={specificLocation}
                onChange={(e) => handleSpecificLocationChange(e.target.value)}
              />
              <p className="text-sm text-gray-600">
                Add more details to help buyers find your vehicle
              </p>
            </div>
          </div>
        )}

        {/* Overseas Location */}
        {locationType === 'overseas' && (
          <div className="space-y-2">
            <Label>Location Details</Label>
            <Input
              placeholder="e.g., Tokyo, Japan or Dubai, UAE"
              value={specificLocation}
              onChange={(e) => handleSpecificLocationChange(e.target.value)}
            />
            <p className="text-sm text-gray-600">
              Specify the country and city where the vehicle is located
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KenyanLocationSelector;