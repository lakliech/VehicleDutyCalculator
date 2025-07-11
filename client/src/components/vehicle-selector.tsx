import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, Settings, Fuel, AlertCircle } from "lucide-react";
import type { VehicleReference } from "@shared/schema";

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: VehicleReference | null) => void;
  categoryFilter?: string; // Filter vehicles by category
  hideCrsp?: boolean; // Hide CRSP information (for transfer cost calculator)
  hideResults?: boolean; // Hide selected vehicle results card (for sell my car page)
}

export function VehicleSelector({ onVehicleSelect, categoryFilter, hideCrsp, hideResults }: VehicleSelectorProps) {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [manualEngineSize, setManualEngineSize] = useState<string>("");
  const [useManualEngine, setUseManualEngine] = useState<boolean>(false);

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

  return (
    <div className="space-y-4">
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