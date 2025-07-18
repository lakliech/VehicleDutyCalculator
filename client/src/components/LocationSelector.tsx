import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Home } from 'lucide-react';
import { Country, County, Constituency, Ward } from '@shared/schema-minimal';

interface LocationSelectorProps {
  onLocationChange: (location: {
    locationType: 'locally_available' | 'overseas';
    countryId?: number;
    countyId?: number;
    constituencyId?: number;
    wardId?: number;
    specificLocation?: string;
  }) => void;
  defaultValues?: {
    locationType?: 'locally_available' | 'overseas';
    countryId?: number;
    countyId?: number;
    constituencyId?: number;
    wardId?: number;
    specificLocation?: string;
  };
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange, defaultValues }) => {
  const [locationType, setLocationType] = useState<'locally_available' | 'overseas'>(
    defaultValues?.locationType || 'locally_available'
  );
  const [selectedCountryId, setSelectedCountryId] = useState<number | undefined>(defaultValues?.countryId);
  const [selectedCountyId, setSelectedCountyId] = useState<number | undefined>(defaultValues?.countyId);
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<number | undefined>(defaultValues?.constituencyId);
  const [selectedWardId, setSelectedWardId] = useState<number | undefined>(defaultValues?.wardId);

  // Fetch all countries
  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ['/api/countries'],
    staleTime: 60000 * 60, // Cache for 1 hour
  });

  // Fetch counties based on selected country
  const { data: counties = [] } = useQuery<County[]>({
    queryKey: ['/api/countries', selectedCountryId, 'counties'],
    enabled: !!selectedCountryId,
    staleTime: 60000 * 60, // Cache for 1 hour
  });

  // Fetch constituencies based on selected county
  const { data: constituencies = [] } = useQuery<Constituency[]>({
    queryKey: ['/api/counties', selectedCountyId, 'constituencies'],
    enabled: !!selectedCountyId,
    staleTime: 60000 * 60, // Cache for 1 hour
  });

  // Fetch wards based on selected constituency
  const { data: wards = [] } = useQuery<Ward[]>({
    queryKey: ['/api/constituencies', selectedConstituencyId, 'wards'],
    enabled: !!selectedConstituencyId,
    staleTime: 60000 * 60, // Cache for 1 hour
  });

  // Get Kenya country for locally available option
  const kenyaCountry = countries.find(c => c.code === 'KE');

  useEffect(() => {
    // Auto-select Kenya for locally available
    if (locationType === 'locally_available' && kenyaCountry && !selectedCountryId) {
      setSelectedCountryId(kenyaCountry.id);
    }
  }, [locationType, kenyaCountry, selectedCountryId]);

  // Reset downstream selections when upstream changes
  useEffect(() => {
    if (locationType === 'overseas') {
      setSelectedCountyId(undefined);
      setSelectedConstituencyId(undefined);
      setSelectedWardId(undefined);
    }
  }, [locationType]);

  useEffect(() => {
    setSelectedConstituencyId(undefined);
    setSelectedWardId(undefined);
  }, [selectedCountyId]);

  useEffect(() => {
    setSelectedWardId(undefined);
  }, [selectedConstituencyId]);

  // Notify parent of changes
  useEffect(() => {
    onLocationChange({
      locationType,
      countryId: selectedCountryId,
      countyId: selectedCountyId,
      constituencyId: selectedConstituencyId,
      wardId: selectedWardId,
    });
  }, [locationType, selectedCountryId, selectedCountyId, selectedConstituencyId, selectedWardId, onLocationChange]);

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
          <Label htmlFor="location-type">Where is your vehicle located? *</Label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                locationType === 'locally_available'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setLocationType('locally_available')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-4 w-4" />
                <span className="font-medium">Locally Available</span>
              </div>
              <p className="text-sm text-gray-600">Vehicle is currently in Kenya</p>
              {locationType === 'locally_available' && (
                <Badge variant="secondary" className="mt-2">Selected</Badge>
              )}
            </div>
            
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                locationType === 'overseas'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setLocationType('overseas')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">Overseas</span>
              </div>
              <p className="text-sm text-gray-600">Vehicle is outside Kenya</p>
              {locationType === 'overseas' && (
                <Badge variant="secondary" className="mt-2">Selected</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select 
            value={selectedCountryId?.toString() || ''} 
            onValueChange={(value) => setSelectedCountryId(value ? parseInt(value) : undefined)}
            disabled={locationType === 'locally_available'} // Auto Kenya for local
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {locationType === 'locally_available' ? (
                kenyaCountry && (
                  <SelectItem value={kenyaCountry.id.toString()}>
                    🇰🇪 {kenyaCountry.name}
                  </SelectItem>
                )
              ) : (
                countries
                  .filter(c => c.code !== 'KE') // Exclude Kenya for overseas
                  .map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* County Selection (only for Kenya) */}
        {locationType === 'locally_available' && selectedCountryId && (
          <div className="space-y-2">
            <Label htmlFor="county">County *</Label>
            <Select 
              value={selectedCountyId?.toString() || ''} 
              onValueChange={(value) => setSelectedCountyId(value ? parseInt(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select county" />
              </SelectTrigger>
              <SelectContent>
                {counties.map((county) => (
                  <SelectItem key={county.id} value={county.id.toString()}>
                    {county.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Constituency Selection (only for Kenya) */}
        {locationType === 'locally_available' && selectedCountyId && (
          <div className="space-y-2">
            <Label htmlFor="constituency">Constituency</Label>
            <Select 
              value={selectedConstituencyId?.toString() || ''} 
              onValueChange={(value) => setSelectedConstituencyId(value ? parseInt(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select constituency (optional)" />
              </SelectTrigger>
              <SelectContent>
                {constituencies.map((constituency) => (
                  <SelectItem key={constituency.id} value={constituency.id.toString()}>
                    {constituency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Ward Selection (only for Kenya) */}
        {locationType === 'locally_available' && selectedConstituencyId && (
          <div className="space-y-2">
            <Label htmlFor="ward">Ward</Label>
            <Select 
              value={selectedWardId?.toString() || ''} 
              onValueChange={(value) => setSelectedWardId(value ? parseInt(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ward (optional)" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((ward) => (
                  <SelectItem key={ward.id} value={ward.id.toString()}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Summary */}
        <div className="pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {locationType === 'locally_available' ? 'Locally Available in Kenya' : 'Overseas Vehicle'}
              {selectedCountyId && counties.find(c => c.id === selectedCountyId) && 
                ` • ${counties.find(c => c.id === selectedCountyId)?.name}`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;