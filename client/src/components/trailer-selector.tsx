import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trailer } from "@shared/schema";

interface TrailerSelectorProps {
  onTrailerSelect: (trailer: Trailer | null) => void;
  disabled?: boolean;
}

export function TrailerSelector({ onTrailerSelect, disabled }: TrailerSelectorProps) {
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);

  const { data: trailers, isLoading } = useQuery<Trailer[]>({
    queryKey: ['/api/trailers'],
  });

  const handleTrailerSelect = (trailerId: string) => {
    const trailer = trailers?.find(t => t.id.toString() === trailerId) || null;
    setSelectedTrailer(trailer);
    onTrailerSelect(trailer);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="trailer-select" className="text-base font-semibold text-gray-900">
          Select Trailer *
        </Label>
        <Select
          disabled={disabled || isLoading}
          onValueChange={handleTrailerSelect}
          value={selectedTrailer?.id.toString() || ""}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={isLoading ? "Loading trailers..." : "Choose a trailer"} />
          </SelectTrigger>
          <SelectContent>
            {trailers?.map((trailer) => (
              <SelectItem key={trailer.id} value={trailer.id.toString()}>
                <div className="flex flex-col">
                  <span className="font-medium">{trailer.description}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {trailer.make}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      KES {trailer.crspKes?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTrailer && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold text-sm text-gray-900 mb-2">Selected Trailer Details</h4>
          <div className="space-y-1 text-sm">
            <div><strong>Type:</strong> {selectedTrailer.type}</div>
            {selectedTrailer.specifications && (
              <div><strong>Specifications:</strong> {selectedTrailer.specifications}</div>
            )}
            <div><strong>Make:</strong> {selectedTrailer.make}</div>
            <div><strong>CRSP Value:</strong> KES {selectedTrailer.crspKes?.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}