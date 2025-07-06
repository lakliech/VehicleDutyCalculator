import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface VehicleCategoryOption {
  value: string;
  emoji: string;
  label: string;
  description: string;
  importDuty: string;
  exciseDuty: string;
}

const categoryOptions: VehicleCategoryOption[] = [
  {
    value: "under1500cc",
    emoji: "🚗",
    label: "Under 1500cc",
    description: "Standard cars with engine below 1500cc",
    importDuty: "35%",
    exciseDuty: "20%"
  },
  {
    value: "over1500cc",
    emoji: "🚙",
    label: "Over 1500cc",
    description: "Cars with engine 1500cc-3000cc (petrol) / 1500cc-2500cc (diesel)",
    importDuty: "35%",
    exciseDuty: "20%"
  },
  {
    value: "largeEngine",
    emoji: "🚛",
    label: "Large Engine",
    description: "Petrol >3000cc or Diesel >2500cc",
    importDuty: "35%",
    exciseDuty: "35%"
  },
  {
    value: "electric",
    emoji: "⚡",
    label: "Electric",
    description: "Fully electric vehicles (reduced taxes)",
    importDuty: "25%",
    exciseDuty: "10%"
  },
  {
    value: "schoolBus",
    emoji: "🚌",
    label: "School Bus",
    description: "Student transport vehicles",
    importDuty: "35%",
    exciseDuty: "25%"
  },
  {
    value: "primeMover",
    emoji: "🚚",
    label: "Prime Mover",
    description: "Heavy duty truck heads",
    importDuty: "25%",
    exciseDuty: "0%"
  },
  {
    value: "trailer",
    emoji: "🚛",
    label: "Trailer",
    description: "Transport trailers",
    importDuty: "35%",
    exciseDuty: "0%"
  },
  {
    value: "ambulance",
    emoji: "🚑",
    label: "Ambulance",
    description: "Emergency medical vehicles",
    importDuty: "0%",
    exciseDuty: "25%"
  },
  {
    value: "motorcycle",
    emoji: "🏍️",
    label: "Motorcycle",
    description: "Two-wheeled vehicles",
    importDuty: "25%",
    exciseDuty: "Fixed"
  },
  {
    value: "specialPurpose",
    emoji: "🚜",
    label: "Special Purpose",
    description: "Specialized vehicles",
    importDuty: "25%",
    exciseDuty: "10%"
  },
  {
    value: "heavyMachinery",
    emoji: "🏗️",
    label: "Heavy Machinery",
    description: "Construction and industrial equipment",
    importDuty: "10%",
    exciseDuty: "25%"
  }
];

interface VehicleCategorySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function VehicleCategorySelector({ value, onValueChange, disabled }: VehicleCategorySelectorProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">
        Vehicle Category <span className="text-red-500">*</span>
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categoryOptions.map((category) => (
          <Card
            key={category.value}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              value === category.value 
                ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20" 
                : "hover:ring-1 hover:ring-gray-300",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !disabled && onValueChange(category.value)}
            onMouseEnter={() => setHoveredCategory(category.value)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0">
                  {category.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {category.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {category.description}
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      Import: {category.importDuty}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      Excise: {category.exciseDuty}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {value && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {categoryOptions.find(cat => cat.value === value)?.emoji}
            </span>
            <span className="font-medium text-sm">
              Selected: {categoryOptions.find(cat => cat.value === value)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}