import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Car, Settings, Fuel, AlertCircle, Calculator, Database, Edit } from "lucide-react";
import type { VehicleReference, ManualVehicleData } from "@shared/schema";

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: VehicleReference | null) => void;
  onManualVehicleData?: (data: ManualVehicleData | null) => void;
  categoryFilter?: string; // Filter vehicles by category
  hideCrsp?: boolean; // Hide CRSP information (for transfer cost calculator)
}

export function VehicleSelector({ onVehicleSelect, onManualVehicleData, categoryFilter, hideCrsp }: VehicleSelectorProps) {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedDriveConfig, setSelectedDriveConfig] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [manualEngineSize, setManualEngineSize] = useState<string>("");
  const [useManualEngine, setUseManualEngine] = useState<boolean>(false);
  
  // Manual entry mode state
  const [isManualEntry, setIsManualEntry] = useState<boolean>(false);
  const [manualMake, setManualMake] = useState<string>("");
  const [manualModel, setManualModel] = useState<string>("");
  const [manualEngine, setManualEngine] = useState<string>("");
  const [manualVehicleData, setManualVehicleData] = useState<ManualVehicleData | null>(null);
  const [isCalculatingProration, setIsCalculatingProration] = useState<boolean>(false);
  const [selectedReferenceVehicle, setSelectedReferenceVehicle] = useState<VehicleReference | null>(null);

  // Fetch all makes (filtered by category if provided)
  const { data: makes = [], isLoading: makesLoading } = useQuery<string[]>({
    queryKey: ["/api/vehicle-references/makes", categoryFilter],
    queryFn: async () => {
      let url = "/api/vehicle-references/makes";
      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch makes');
      return response.json();
    },
  });

  // Fetch models for selected make (filtered by category if provided)
  const { data: models = [], isLoading: modelsLoading } = useQuery<{
    model: string;
  }[]>({
    queryKey: [`/api/vehicle-references/makes/${selectedMake}/models`, categoryFilter],
    queryFn: async () => {
      let url = `/api/vehicle-references/makes/${selectedMake}/models`;
      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch models');
      return response.json();
    },
    enabled: !!selectedMake,
  });

  // Fetch drive configurations for selected make and model
  const { data: driveConfigs = [], isLoading: driveConfigsLoading } = useQuery<string[]>({
    queryKey: [`/api/vehicle-references/makes/${selectedMake}/models/${selectedModel}/drives`, categoryFilter],
    queryFn: async () => {
      let url = `/api/vehicle-references/makes/${selectedMake}/models/${selectedModel}/drives`;
      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch drive configurations');
      return response.json();
    },
    enabled: !!selectedMake && !!selectedModel,
  });

  // Fetch engine sizes for selected make, model, and drive config (filtered by category if provided)
  const { data: engineSizes = [], isLoading: engineSizesLoading } = useQuery<number[]>({
    queryKey: [`/api/vehicle-references/makes/${selectedMake}/models/${selectedModel}/drives/${selectedDriveConfig}/engines`, categoryFilter],
    queryFn: async () => {
      let url = `/api/vehicle-references/makes/${selectedMake}/models/${selectedModel}/engines`;
      if (selectedDriveConfig) {
        url += `?driveConfig=${selectedDriveConfig}`;
        if (categoryFilter) {
          url += `&category=${categoryFilter}`;
        }
      } else if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch engine sizes');
      return response.json();
    },
    enabled: !!selectedMake && !!selectedModel && !!selectedDriveConfig,
  });

  // Search for specific vehicle
  const { data: vehicleDetails = [] } = useQuery<VehicleReference[]>({
    queryKey: [`/api/vehicle-references/search`, selectedMake, selectedModel, selectedDriveConfig, selectedEngineSize, categoryFilter],
    queryFn: async () => {
      let url = `/api/vehicle-references/search?make=${selectedMake}&model=${selectedModel}&engineCapacity=${selectedEngineSize}`;
      if (selectedDriveConfig) {
        url += `&driveConfig=${selectedDriveConfig}`;
      }
      if (categoryFilter) {
        url += `&category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch vehicle details');
      return response.json();
    },
    enabled: !isManualEntry && !!selectedMake && !!selectedModel && !!selectedDriveConfig && (!!selectedEngineSize || (useManualEngine && !!manualEngineSize)),
  });

  // Search for reference vehicles for proration (manual entry mode)
  // Filter by make to get relevant reference vehicles for better efficiency
  const { data: referenceVehicles = [], isLoading: referenceVehiclesLoading, error: referenceVehiclesError } = useQuery<VehicleReference[]>({
    queryKey: [`/api/vehicle-references/proration-references`, manualMake],
    queryFn: async () => {
      if (!manualMake) return [];
      const trimmedMake = manualMake.trim();
      const response = await fetch(`/api/vehicle-references/proration-references?make=${encodeURIComponent(trimmedMake)}`);
      if (!response.ok) throw new Error('Failed to fetch reference vehicles');
      return response.json();
    },
    enabled: isManualEntry && !!manualMake,
  });

  // Calculate proration when manual entry is complete
  const calculateProration = async () => {
    if (!manualMake || !manualModel || !manualEngine || !selectedReferenceVehicle) {
      return;
    }

    setIsCalculatingProration(true);
    
    try {
      const referenceCrsp = selectedReferenceVehicle.crspKes || selectedReferenceVehicle.crsp2020 || 0;
      const referenceEngineCapacity = selectedReferenceVehicle.engineCapacity || 0;
      const manualEngineCapacity = parseInt(manualEngine);

      let proratedCrsp = referenceCrsp;

      // Calculate proration if reference vehicle has engine capacity
      if (referenceEngineCapacity > 0 && manualEngineCapacity > 0) {
        // Calculate prorated CRSP: reference_crsp × manual_engine_capacity ÷ reference_engine_capacity
        proratedCrsp = Math.round((referenceCrsp * manualEngineCapacity) / referenceEngineCapacity);
      }

      const manualData: ManualVehicleData = {
        make: manualMake,
        model: manualModel,
        engineCapacity: manualEngineCapacity,
        referenceVehicle: selectedReferenceVehicle,
        proratedCrsp: proratedCrsp
      };

      setManualVehicleData(manualData);
      console.log('Calling onManualVehicleData with:', manualData);
      if (onManualVehicleData) {
        onManualVehicleData(manualData);
      }
    } catch (error) {
      console.error('Proration calculation failed:', error);
      setManualVehicleData(null);
      if (onManualVehicleData) {
        onManualVehicleData(null);
      }
    } finally {
      setIsCalculatingProration(false);
    }
  };

  // Check if we need manual engine input when engine sizes load
  useEffect(() => {
    if (!isManualEntry && !engineSizesLoading && engineSizes.length === 0 && selectedModel) {
      setUseManualEngine(true);
    } else if (engineSizes.length > 0) {
      setUseManualEngine(false);
      setManualEngineSize("");
    }
  }, [engineSizes, engineSizesLoading, selectedModel, isManualEntry]);

  // Auto-calculate proration when all required fields are provided
  useEffect(() => {
    console.log('Proration check:', {
      isManualEntry,
      manualMake,
      manualModel,
      manualEngine,
      selectedReferenceVehicle: !!selectedReferenceVehicle,
      shouldCalculate: isManualEntry && manualMake && manualModel && manualEngine && selectedReferenceVehicle
    });
    
    if (isManualEntry && manualMake && manualModel && manualEngine && selectedReferenceVehicle) {
      calculateProration();
    }
  }, [isManualEntry, manualMake, manualModel, manualEngine, selectedReferenceVehicle]);

  // Clear data when switching between modes
  useEffect(() => {
    if (isManualEntry) {
      // Clear database selection
      setSelectedMake("");
      setSelectedModel("");
      setSelectedEngineSize("");
      setSelectedVehicle(null);
      setManualEngineSize("");
      setUseManualEngine(false);
      onVehicleSelect(null);
    } else {
      // Clear manual entry
      setManualMake("");
      setManualModel("");
      setManualEngine("");
      setManualVehicleData(null);
      setSelectedReferenceVehicle(null);
      if (onManualVehicleData) {
        onManualVehicleData(null);
      }
    }
  }, [isManualEntry, onVehicleSelect, onManualVehicleData]);

  useEffect(() => {
    if (vehicleDetails.length === 1) {
      const vehicle = vehicleDetails[0];
      // If using manual engine size, add it to the vehicle object
      if (useManualEngine && manualEngineSize) {
        const vehicleWithEngine = {
          ...vehicle,
          engineCapacity: parseInt(manualEngineSize)
        };
        setSelectedVehicle(vehicleWithEngine);
        onVehicleSelect(vehicleWithEngine);
      } else {
        setSelectedVehicle(vehicle);
        onVehicleSelect(vehicle);
      }
    } else if (vehicleDetails.length === 0 && selectedMake && selectedModel && useManualEngine && manualEngineSize) {
      // For vehicles without engine capacity in DB, find by make and model only
      const searchQuery = `/api/vehicle-references/search?make=${selectedMake}&model=${selectedModel}`;
      fetch(searchQuery)
        .then(res => res.json())
        .then(vehicles => {
          if (vehicles.length === 1) {
            const vehicleWithEngine = {
              ...vehicles[0],
              engineCapacity: parseInt(manualEngineSize)
            };
            setSelectedVehicle(vehicleWithEngine);
            onVehicleSelect(vehicleWithEngine);
          }
        });
    } else {
      setSelectedVehicle(null);
      onVehicleSelect(null);
    }
  }, [vehicleDetails, onVehicleSelect, useManualEngine, manualEngineSize, selectedMake, selectedModel]);

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedDriveConfig("");
    setSelectedEngineSize("");
    setSelectedVehicle(null);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSelectedDriveConfig("");
    setSelectedEngineSize("");
    setSelectedVehicle(null);
    setManualEngineSize("");
    setUseManualEngine(false);
  };

  const handleDriveConfigChange = (driveConfig: string) => {
    setSelectedDriveConfig(driveConfig);
    setSelectedEngineSize("");
    setSelectedVehicle(null);
    setManualEngineSize("");
    setUseManualEngine(false);
  };

  const handleEngineSizeChange = (engineSize: string) => {
    setSelectedEngineSize(engineSize);
  };

  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return "N/A";
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `KES ${num.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-4">
      {/* Toggle between database and manual entry */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Database className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Database Selection</span>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isManualEntry}
            onCheckedChange={setIsManualEntry}
            id="manual-entry-toggle"
          />
          <Label htmlFor="manual-entry-toggle" className="text-sm font-medium cursor-pointer">
            Enter Vehicle Manually
          </Label>
          <Edit className="h-4 w-4 text-gray-600" />
        </div>
      </div>

      {/* Manual Entry Form */}
      {isManualEntry ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="manual-make" className="text-sm font-medium text-gray-700 mb-2">
                Vehicle Make <span className="text-red-500">*</span>
              </Label>
              <Input
                id="manual-make"
                type="text"
                value={manualMake}
                onChange={(e) => setManualMake(e.target.value.toUpperCase())}
                placeholder="e.g., TOYOTA"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="manual-model" className="text-sm font-medium text-gray-700 mb-2">
                Vehicle Model <span className="text-red-500">*</span>
              </Label>
              <Input
                id="manual-model"
                type="text"
                value={manualModel}
                onChange={(e) => setManualModel(e.target.value.toUpperCase())}
                placeholder="e.g., CAMRY"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="manual-engine" className="text-sm font-medium text-gray-700 mb-2">
                Engine Capacity (cc) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="manual-engine"
                type="number"
                value={manualEngine}
                onChange={(e) => setManualEngine(e.target.value)}
                placeholder="e.g., 2000"
                className="w-full"
              />
            </div>
          </div>

          {/* Reference Vehicle Selector */}
          {referenceVehicles.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Select Reference Vehicle for Proration ({manualMake} models) <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-600 mb-2">
                Choose a {manualMake} vehicle from the database to calculate prorated CRSP value. The system will use this vehicle's CRSP and engine capacity to calculate your vehicle's estimated value.
              </p>
              <Select
                value={selectedReferenceVehicle?.id?.toString() || ""}
                onValueChange={(value) => {
                  const vehicle = referenceVehicles.find(v => v.id.toString() === value);
                  setSelectedReferenceVehicle(vehicle || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select a ${manualMake} reference vehicle...`} />
                </SelectTrigger>
                <SelectContent>
                  {referenceVehicles
                    .filter(v => v.engineCapacity && v.engineCapacity > 0 && (v.crspKes || v.crsp2020))
                    .map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                        <div className="flex justify-between items-center w-full">
                          <span>{vehicle.make} {vehicle.model} ({vehicle.engineCapacity}cc)</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatCurrency(vehicle.crspKes || vehicle.crsp2020 || 0)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {referenceVehicles.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Found {referenceVehicles.filter(v => v.engineCapacity && v.engineCapacity > 0 && (v.crspKes || v.crsp2020)).length} valid {manualMake} reference vehicles for proration
                </p>
              )}
            </div>
          )}

          {/* No reference vehicles found */}
          {isManualEntry && manualMake && !referenceVehiclesLoading && referenceVehicles.length === 0 && (
            <Alert className="p-3 bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-sm text-yellow-800 ml-2">
                No {manualMake} reference vehicles found in database. Try a different make or contact support if this is unexpected.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading reference vehicles */}
          {isManualEntry && manualMake && referenceVehiclesLoading && (
            <Alert className="p-3 bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-800 ml-2">
                Loading {manualMake} reference vehicles for proration...
              </AlertDescription>
            </Alert>
          )}

          {/* Proration calculation display */}
          {manualVehicleData && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-green-900">
                        {manualVehicleData.make} {manualVehicleData.model}
                      </h3>
                      <p className="text-sm text-green-700 mt-1">
                        Manual entry with prorated CRSP value
                      </p>
                    </div>
                    {!hideCrsp && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Prorated CRSP</p>
                        <p className="text-xl font-bold text-green-900">
                          {formatCurrency(manualVehicleData.proratedCrsp)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calculator className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Proration Calculation</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Reference: {manualVehicleData.referenceVehicle.make} {manualVehicleData.referenceVehicle.model}</p>
                      <p>Reference Engine: {manualVehicleData.referenceVehicle.engineCapacity}cc</p>
                      <p>Reference CRSP: {formatCurrency(manualVehicleData.referenceVehicle.crspKes || manualVehicleData.referenceVehicle.crsp2020 || 0)}</p>
                      <p className="font-medium text-green-700">
                        Formula: {formatCurrency(manualVehicleData.referenceVehicle.crspKes || manualVehicleData.referenceVehicle.crsp2020 || 0)} × {manualVehicleData.engineCapacity} ÷ {manualVehicleData.referenceVehicle.engineCapacity} = {formatCurrency(manualVehicleData.proratedCrsp)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-green-200">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-600">Engine</p>
                        <p className="text-sm font-medium">{manualVehicleData.engineCapacity}cc</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-600">Body Type</p>
                        <p className="text-sm font-medium">{manualVehicleData.referenceVehicle.bodyType || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-600">Fuel</p>
                        <p className="text-sm font-medium">{manualVehicleData.referenceVehicle.fuelType || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
          <Label htmlFor="make" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Car className="h-4 w-4 mr-2 text-green-600" />
            Vehicle Make
          </Label>
          <Select value={selectedMake} onValueChange={handleMakeChange}>
            <SelectTrigger id="make">
              <SelectValue placeholder={makesLoading ? "Loading..." : "Select a make"} />
            </SelectTrigger>
            <SelectContent>
              {makes.map((make: string, index: number) => (
                <SelectItem key={`make-${index}-${make}`} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="model" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Car className="h-4 w-4 mr-2 text-green-600" />
            Vehicle Model
          </Label>
          <Select 
            value={selectedModel} 
            onValueChange={handleModelChange}
            disabled={!selectedMake}
          >
            <SelectTrigger id="model">
              <SelectValue placeholder={
                !selectedMake ? "Select a make first" : 
                modelsLoading ? "Loading..." : 
                "Select a model"
              } />
            </SelectTrigger>
            <SelectContent>
              {models.map((model: any) => (
                <SelectItem key={`model-${model.model}`} value={model.model}>
                  <span>{model.model}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="driveConfig" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Settings className="h-4 w-4 mr-2 text-green-600" />
            Drive Configuration
          </Label>
          <Select 
            value={selectedDriveConfig} 
            onValueChange={handleDriveConfigChange}
            disabled={!selectedMake || !selectedModel}
          >
            <SelectTrigger id="driveConfig">
              <SelectValue placeholder={
                !selectedMake || !selectedModel ? "Select make and model first" : 
                driveConfigsLoading ? "Loading..." : 
                "Select drive configuration"
              } />
            </SelectTrigger>
            <SelectContent>
              {driveConfigs.map((driveConfig: string) => (
                <SelectItem key={`drive-${driveConfig}`} value={driveConfig}>
                  <span>{driveConfig}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="engineSize" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Settings className="h-4 w-4 mr-2 text-green-600" />
            Engine Size
          </Label>
          {useManualEngine ? (
            <div className="space-y-2">
              <Input
                id="manualEngineSize"
                type="number"
                value={manualEngineSize}
                onChange={(e) => setManualEngineSize(e.target.value)}
                placeholder="Enter engine size in cc"
                className="w-full"
                min="0"
                step="100"
              />
              <Alert className="p-2 bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-sm text-amber-800 ml-2">
                  No engine sizes found in database. Please enter manually.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Select 
              value={selectedEngineSize} 
              onValueChange={handleEngineSizeChange}
              disabled={!selectedModel}
            >
              <SelectTrigger id="engineSize">
                <SelectValue placeholder={
                  !selectedModel ? "Select a model first" : 
                  engineSizesLoading ? "Loading..." : 
                  "Select engine size"
                } />
              </SelectTrigger>
              <SelectContent>
                {engineSizes.map((size: number) => (
                  <SelectItem key={`engine-${size}`} value={size.toString()}>
                    {size}cc
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        </div>
      )}

      {selectedVehicle && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className={hideCrsp ? "text-center" : "flex justify-between items-start"}>
                <div>
                  <h3 className="font-semibold text-lg text-green-900">
                    {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Selected from Kenya vehicle database
                  </p>
                </div>
                {!hideCrsp && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Current Retail Price</p>
                    <p className="text-xl font-bold text-green-900">
                      {formatCurrency(selectedVehicle.crspKes)}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-green-200">
                {selectedVehicle.engineCapacity && (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Engine</p>
                      <p className="text-sm font-medium">{selectedVehicle.engineCapacity}cc</p>
                    </div>
                  </div>
                )}
                
                {selectedVehicle.bodyType && (
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Body Type</p>
                      <p className="text-sm font-medium">{selectedVehicle.bodyType}</p>
                    </div>
                  </div>
                )}
                
                {selectedVehicle.fuelType && (
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Fuel</p>
                      <p className="text-sm font-medium">{selectedVehicle.fuelType}</p>
                    </div>
                  </div>
                )}
                
                {selectedVehicle.driveConfiguration && (
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Drive</p>
                      <p className="text-sm font-medium">{selectedVehicle.driveConfiguration}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}