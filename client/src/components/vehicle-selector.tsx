import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, DollarSign, Settings, Fuel } from "lucide-react";
import type { VehicleReference } from "@shared/schema";

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: VehicleReference | null) => void;
}

export function VehicleSelector({ onVehicleSelect }: VehicleSelectorProps) {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);

  // Fetch all makes
  const { data: makes = [], isLoading: makesLoading } = useQuery<string[]>({
    queryKey: ["/api/vehicle-references/makes"],
  });

  // Fetch models for selected make
  const { data: models = [], isLoading: modelsLoading } = useQuery<{
    model: string;
    engineCapacity: number | null;
    bodyType: string | null;
    fuelType: string | null;
    crspKes: string | null;
  }[]>({
    queryKey: [`/api/vehicle-references/makes/${selectedMake}/models`],
    enabled: !!selectedMake,
  });

  // Search for specific vehicle
  const { data: vehicleDetails = [] } = useQuery<VehicleReference[]>({
    queryKey: [`/api/vehicle-references/search?make=${selectedMake}&model=${selectedModel}`],
    enabled: !!selectedMake && !!selectedModel,
  });

  useEffect(() => {
    if (vehicleDetails.length === 1) {
      setSelectedVehicle(vehicleDetails[0]);
      onVehicleSelect(vehicleDetails[0]);
    } else {
      setSelectedVehicle(null);
      onVehicleSelect(null);
    }
  }, [vehicleDetails, onVehicleSelect]);

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedVehicle(null);
  };

  const handleModelChange = (value: string) => {
    // Extract the actual model name from the value (format: "index|modelName")
    const modelName = value.split('|')[1] || value;
    setSelectedModel(modelName);
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
              {models.map((model: any, index: number) => (
                <SelectItem key={`model-${index}`} value={`${index}|${model.model}`}>
                  <div className="flex items-center justify-between w-full">
                    <span>{model.model}</span>
                    {model.engineCapacity && (
                      <Badge variant="secondary" className="ml-2">
                        {model.engineCapacity}cc
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selected Vehicle Details */}
      {selectedVehicle && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-green-900">
                    {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Selected from Kenya vehicle database
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Current Retail Price</p>
                  <p className="text-xl font-bold text-green-900">
                    {formatCurrency(selectedVehicle.crspKes)}
                  </p>
                </div>
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