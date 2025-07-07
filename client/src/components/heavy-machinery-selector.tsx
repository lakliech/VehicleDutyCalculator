import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HeavyMachinery } from "@shared/schema";

interface HeavyMachinerySelectorProps {
  onMachinerySelect: (machinery: HeavyMachinery | null) => void;
  disabled?: boolean;
}

export function HeavyMachinerySelector({ onMachinerySelect, disabled }: HeavyMachinerySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMachinery, setSelectedMachinery] = useState<HeavyMachinery | null>(null);

  const { data: categories, isLoading: categoriesLoading } = useQuery<string[]>({
    queryKey: ['/api/heavy-machinery/categories'],
  });

  const { data: machinery, isLoading: machineryLoading } = useQuery<HeavyMachinery[]>({
    queryKey: ['/api/heavy-machinery'],
  });

  const filteredMachinery = machinery?.filter(m => 
    !selectedCategory || m.category === selectedCategory
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedMachinery(null);
    onMachinerySelect(null);
  };

  const handleMachinerySelect = (machineryId: string) => {
    const selected = machinery?.find(m => m.id.toString() === machineryId) || null;
    setSelectedMachinery(selected);
    onMachinerySelect(selected);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category-select" className="text-base font-semibold text-gray-900">
          Select Equipment Category *
        </Label>
        <Select
          disabled={disabled || categoriesLoading}
          onValueChange={handleCategorySelect}
          value={selectedCategory}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Choose a category"} />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div>
          <Label htmlFor="machinery-select" className="text-base font-semibold text-gray-900">
            Select Equipment *
          </Label>
          <Select
            disabled={disabled || machineryLoading}
            onValueChange={handleMachinerySelect}
            value={selectedMachinery?.id.toString() || ""}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder={machineryLoading ? "Loading equipment..." : "Choose equipment"} />
            </SelectTrigger>
            <SelectContent>
              {filteredMachinery?.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.make} {item.model}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {item.powerSpec && (
                        <Badge variant="secondary" className="text-xs">
                          {item.powerSpec}
                        </Badge>
                      )}
                      {item.driveType && (
                        <Badge variant="outline" className="text-xs">
                          {item.driveType}
                        </Badge>
                      )}
                      <span className="text-sm text-gray-600">
                        KES {item.crspKes?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedMachinery && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold text-sm text-gray-900 mb-2">Selected Equipment Details</h4>
          <div className="space-y-1 text-sm">
            <div><strong>Make:</strong> {selectedMachinery.make}</div>
            <div><strong>Model:</strong> {selectedMachinery.model}</div>
            <div><strong>Category:</strong> {selectedMachinery.category}</div>
            {selectedMachinery.powerSpec && (
              <div><strong>Power:</strong> {selectedMachinery.powerSpec}</div>
            )}
            {selectedMachinery.driveType && (
              <div><strong>Drive Type:</strong> {selectedMachinery.driveType}</div>
            )}
            <div><strong>CRSP Value:</strong> KES {selectedMachinery.crspKes?.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}