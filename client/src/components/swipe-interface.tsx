import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Heart, 
  X, 
  Phone, 
  MessageCircle, 
  Share2, 
  MapPin,
  Fuel,
  Calendar,
  Gauge,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeInterfaceProps {
  vehicles: any[];
  onSwipeLeft?: (vehicle: any) => void;
  onSwipeRight?: (vehicle: any) => void;
  onViewDetails?: (vehicle: any) => void;
  className?: string;
}

interface SwipeGesture {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
}

export function SwipeInterface({ 
  vehicles, 
  onSwipeLeft, 
  onSwipeRight, 
  onViewDetails,
  className 
}: SwipeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeGesture, setSwipeGesture] = useState<SwipeGesture>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false
  });
  const [removedVehicles, setRemovedVehicles] = useState<Set<number>>(new Set());
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Get available vehicles (not removed)
  const availableVehicles = vehicles.filter((_, index) => !removedVehicles.has(index));
  const currentVehicle = availableVehicles[currentIndex];

  // Track favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: async (vehicleId: number) => {
      return apiRequest('POST', `/api/track-favorite`, { listingId: vehicleId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/car-listings'] });
    }
  });

  // Track phone click mutation
  const phoneClickMutation = useMutation({
    mutationFn: async (vehicleId: number) => {
      return apiRequest('POST', `/api/track-phone-click`, { listingId: vehicleId });
    }
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipeGesture({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isDragging: true
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeGesture.isDragging) return;
    
    const touch = e.touches[0];
    setSwipeGesture(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY
    }));

    // Apply transform to card
    if (cardRef.current) {
      const deltaX = touch.clientX - swipeGesture.startX;
      const rotation = deltaX * 0.1; // Subtle rotation
      const opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 300);
      
      cardRef.current.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
      cardRef.current.style.opacity = opacity.toString();
    }
  };

  const handleTouchEnd = () => {
    if (!swipeGesture.isDragging) return;

    const deltaX = swipeGesture.currentX - swipeGesture.startX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else {
      // Snap back to center
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
        cardRef.current.style.opacity = '1';
      }
    }

    setSwipeGesture(prev => ({ ...prev, isDragging: false }));
  };

  const handleSwipeLeft = () => {
    if (currentVehicle) {
      onSwipeLeft?.(currentVehicle);
      nextVehicle();
      toast({ title: "Passed on this vehicle" });
    }
  };

  const handleSwipeRight = () => {
    if (currentVehicle) {
      favoriteMutation.mutate(currentVehicle.id);
      onSwipeRight?.(currentVehicle);
      nextVehicle();
      toast({ title: "Added to favorites!" });
    }
  };

  const nextVehicle = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
      cardRef.current.style.opacity = '1';
    }
    
    if (currentIndex < availableVehicles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of stack
      toast({ title: "No more vehicles to show", description: "Try adjusting your filters" });
    }
  };

  const previousVehicle = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setRemovedVehicles(new Set());
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
      cardRef.current.style.opacity = '1';
    }
  };

  const handlePhoneClick = () => {
    if (currentVehicle) {
      phoneClickMutation.mutate(currentVehicle.id);
      window.open(`tel:${currentVehicle.contactPhone}`, '_self');
    }
  };

  const handleViewDetails = () => {
    if (currentVehicle && onViewDetails) {
      onViewDetails(currentVehicle);
    }
  };

  if (!currentVehicle) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-96 text-center", className)}>
        <div className="text-muted-foreground mb-4">
          <Heart className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">No more vehicles</h3>
          <p>You've seen all available vehicles with your current filters</p>
        </div>
        <Button onClick={resetStack} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("relative max-w-sm mx-auto", className)}>
      {/* Stack indicator */}
      <div className="text-center mb-4">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {availableVehicles.length}
        </span>
      </div>

      {/* Vehicle Cards Stack */}
      <div className="relative h-[600px]">
        {/* Next card (behind) */}
        {availableVehicles[currentIndex + 1] && (
          <Card className="absolute inset-0 transform scale-95 opacity-50 z-0">
            <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
          </Card>
        )}

        {/* Current card */}
        <Card 
          ref={cardRef}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing transition-transform duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="p-0">
            {/* Main Image */}
            <div className="aspect-[4/3] relative">
              {currentVehicle.images && currentVehicle.images.length > 0 ? (
                <img 
                  src={currentVehicle.images[0]} 
                  alt={`${currentVehicle.make} ${currentVehicle.model}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              
              {/* Image count badge */}
              {currentVehicle.images && currentVehicle.images.length > 1 && (
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  1/{currentVehicle.images.length}
                </Badge>
              )}

              {/* Swipe indicators */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 flex items-center justify-start pl-4 opacity-0 transition-opacity">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    PASS
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-end pr-4 opacity-0 transition-opacity">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    LIKE
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold">
                  {currentVehicle.make} {currentVehicle.model}
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  KES {currentVehicle.price?.toLocaleString()}
                </p>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {currentVehicle.year}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Gauge className="h-4 w-4 mr-2" />
                  {currentVehicle.mileage?.toLocaleString()} km
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Fuel className="h-4 w-4 mr-2" />
                  {currentVehicle.fuelType}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {currentVehicle.location}
                </div>
              </div>

              {/* Description preview */}
              {currentVehicle.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {currentVehicle.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 border-red-200 hover:border-red-400 hover:bg-red-50"
          onClick={handleSwipeLeft}
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14"
          onClick={handleViewDetails}
        >
          <Info className="h-6 w-6" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14"
          onClick={handlePhoneClick}
        >
          <Phone className="h-6 w-6" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 border-green-200 hover:border-green-400 hover:bg-green-50"
          onClick={handleSwipeRight}
        >
          <Heart className="h-6 w-6 text-green-500" />
        </Button>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousVehicle}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetStack}
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextVehicle}
          disabled={currentIndex >= availableVehicles.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}