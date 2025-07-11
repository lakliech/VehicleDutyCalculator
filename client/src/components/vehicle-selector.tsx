import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Car, Settings, Fuel, AlertCircle, Calculator } from "lucide-react";
import type { VehicleReference, ManualVehicleData } from "@shared/schema";

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: VehicleReference | null, manual?: ManualVehicleData) => void;
  categoryFilter?: string; // Filter vehicles by category
  hideCrsp?: boolean; // Hide CRSP information (for transfer cost calculator)
  hideResults?: boolean; // Hide selected vehicle results card (for sell my car page)
  showManualEntry?: boolean; // Show manual entry option with proration
}

export function VehicleSelector({ onVehicleSelect, categoryFilter, hideCrsp, hideResults, showManualEntry }: VehicleSelectorProps) {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [manualEngineSize, setManualEngineSize] = useState<string>("");
  const [useManualEngine, setUseManualEngine] = useState<boolean>(false);
  const [manualVehicleData, setManualVehicleData] = useState<ManualVehicleData | null>(null);
  const [showManualEntryState, setShowManualEntryState] = useState<boolean>(false);
  const [manualMake, setManualMake] = useState<string>("");
  const [manualModel, setManualModel] = useState<string>("");
  const [manualEngine, setManualEngine] = useState<string>("");

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

  // Fetch engine sizes for selected make and model (filtered by category if provided)
  const { data: engineSizes = [], isLoading: engineSizesLoading } = useQuery<number[]>({
    queryKey: [`/api/vehicle-references/makes/${selectedMake}/models/${selectedModel}/engines`, categoryFilter],
    queryFn: async () => {
      let url = `/api/vehicle-references/makes/${selectedMake}/models/${selectedModel}/engines`;
      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch engine sizes');
      return response.json();
    },
    enabled: !!selectedMake && !!selectedModel,
  });

  // Search for specific vehicle
  const { data: vehicleDetails = [] } = useQuery<VehicleReference[]>({
    queryKey: [`/api/vehicle-references/search`, selectedMake, selectedModel, selectedEngineSize, categoryFilter],
    queryFn: async () => {
      let url = `/api/vehicle-references/search?make=${selectedMake}&model=${selectedModel}&engineCapacity=${selectedEngineSize}`;
      if (categoryFilter) {
        url += `&category=${categoryFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch vehicle details');
      return response.json();
    },
    enabled: !!selectedMake && !!selectedModel && (!!selectedEngineSize || (useManualEngine && !!manualEngineSize)),
  });

  // Check if we need manual engine input when engine sizes load
  useEffect(() => {
    if (!engineSizesLoading && engineSizes.length === 0 && selectedModel) {
      setUseManualEngine(true);
    } else if (engineSizes.length > 0) {
      setUseManualEngine(false);
      setManualEngineSize("");
    }
  }, [engineSizes, engineSizesLoading, selectedModel]);

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
    } else if (vehicleDetails.length === 0 && (showManualEntryState || (selectedMake && selectedModel && useManualEngine && manualEngineSize))) {
      // Try proration for vehicles not in database
      tryProration();
    } else {
      setSelectedVehicle(null);
      onVehicleSelect(null);
    }
  }, [vehicleDetails, onVehicleSelect, useManualEngine, manualEngineSize, selectedMake, selectedModel]);

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedEngineSize("");
    setSelectedVehicle(null);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
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

  // Proration logic for vehicles not in database
  const tryProration = async () => {
    const make = showManualEntryState ? manualMake : selectedMake;
    const model = showManualEntryState ? manualModel : selectedModel;
    const engineCapacity = showManualEntryState ? parseInt(manualEngine) : parseInt(manualEngineSize);

    if (!make || !model || !engineCapacity) {
      setManualVehicleData(null);
      return;
    }

    try {
      // Search for reference vehicles from the same make with CRSP values
      const response = await fetch(`/api/vehicle-references/search?make=${make}&limit=50`);
      const referenceVehicles: VehicleReference[] = await response.json();
      
      // Filter vehicles with valid CRSP and engine data
      const validReferences = referenceVehicles.filter(v => 
        (v.crspKes || v.crsp2020) && v.engineCapacity && v.engineCapacity > 0
      );

      if (validReferences.length === 0) {
        setManualVehicleData(null);
        return;
      }

      // Find the best reference vehicle (prefer same model, then closest engine size)
      let bestReference = validReferences[0];
      
      // First try to find same model
      const sameModel = validReferences.find(v => 
        v.model.toLowerCase() === model.toLowerCase()
      );
      
      if (sameModel) {
        bestReference = sameModel;
      } else {
        // Find closest engine size
        bestReference = validReferences.reduce((closest, current) => {
          const closestDiff = Math.abs((closest.engineCapacity || 0) - engineCapacity);
          const currentDiff = Math.abs((current.engineCapacity || 0) - engineCapacity);
          return currentDiff < closestDiff ? current : closest;
        });
      }

      // Calculate prorated CRSP
      const referenceCrsp = bestReference.crspKes || bestReference.crsp2020 || 0;
      const referenceEngine = bestReference.engineCapacity || 1;
      const proratedCrsp = Math.round((referenceCrsp * engineCapacity) / referenceEngine);

      const manualData: ManualVehicleData = {
        make,
        model,
        engineCapacity,
        referenceVehicle: bestReference,
        proratedCrsp
      };

      setManualVehicleData(manualData);
      setSelectedVehicle(null);
      onVehicleSelect(null, manualData);

    } catch (error) {
      console.error("Proration calculation failed:", error);
      setManualVehicleData(null);
    }
  };

  const handleManualSubmit = () => {
    if (manualMake && manualModel && manualEngine) {
      tryProration();
    }
  };

  const resetToDatabase = () => {
    setShowManualEntryState(false);
    setManualMake("");
    setManualModel("");
    setManualEngine("");
    setManualVehicleData(null);
    setSelectedVehicle(null);
    onVehicleSelect(null);
  };

  return (
    <div className="space-y-4">
      {/* Manual Entry Toggle */}
      {showManualEntryState && (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Manual Vehicle Entry with Proration</span>
          </div>
          <button
            onClick={resetToDatabase}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Back to Database
          </button>
        </div>
      )}

      {!showManualEntryState && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowManualEntryState(true)}
            className="text-sm text-purple-600 hover:text-purple-800 underline flex items-center space-x-1"
          >
            <Calculator className="h-3 w-3" />
            <span>Enter Vehicle Manually</span>
          </button>
        </div>
      )}

      {showManualEntryState ? (
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="manualMake" className="text-sm font-medium text-gray-700 mb-2">
                Vehicle Make
              </Label>
              <Input
                id="manualMake"
                value={manualMake}
                onChange={(e) => setManualMake(e.target.value)}
                placeholder="e.g., Toyota"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="manualModel" className="text-sm font-medium text-gray-700 mb-2">
                Vehicle Model
              </Label>
              <Input
                id="manualModel"
                value={manualModel}
                onChange={(e) => setManualModel(e.target.value)}
                placeholder="e.g., Camry"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="manualEngineCapacity" className="text-sm font-medium text-gray-700 mb-2">
                Engine Capacity (cc)
              </Label>
              <Input
                id="manualEngineCapacity"
                type="number"
                value={manualEngine}
                onChange={(e) => setManualEngine(e.target.value)}
                placeholder="e.g., 2000"
                className="w-full"
                min="0"
                step="100"
              />
            </div>
          </div>
          <button
            onClick={handleManualSubmit}
            disabled={!manualMake || !manualModel || !manualEngine}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Calculate Prorated CRSP
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Manual Vehicle Data Results */}
      {manualVehicleData && !hideResults && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-blue-900">
                    {manualVehicleData.make} {manualVehicleData.model}
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Prorated from {manualVehicleData.referenceVehicle.make} {manualVehicleData.referenceVehicle.model}
                  </p>
                </div>
                {!hideCrsp && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Prorated CRSP Value</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formatCurrency(manualVehicleData.proratedCrsp)}
                    </p>
                    <Badge variant="outline" className="text-blue-600 border-blue-600 mt-1">
                      Prorated
                    </Badge>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-blue-200">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Engine</p>
                    <p className="text-sm font-medium">{manualVehicleData.engineCapacity}cc</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Reference Engine</p>
                    <p className="text-sm font-medium">{manualVehicleData.referenceVehicle.engineCapacity}cc</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Reference CRSP</p>
                    <p className="text-sm font-medium">{formatCurrency(manualVehicleData.referenceVehicle.crspKes || manualVehicleData.referenceVehicle.crsp2020)}</p>
                  </div>
                </div>
              </div>

              <Alert className="bg-blue-100 border-blue-300">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-sm text-blue-800 ml-2">
                  CRSP calculated using proration formula: {formatCurrency(manualVehicleData.referenceVehicle.crspKes || manualVehicleData.referenceVehicle.crsp2020)} × {manualVehicleData.engineCapacity}cc ÷ {manualVehicleData.referenceVehicle.engineCapacity}cc = {formatCurrency(manualVehicleData.proratedCrsp)}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Vehicle Details */}
      {selectedVehicle && !hideResults && (
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