import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingAdData {
  floating_ads: {
    id: number;
    advertisementId: number;
    positionX: string;
    positionY: string;
    width: string;
    height: string;
    hideDuration: number;
    showDelay: number;
    startTime: string;
    endTime: string;
    triggerEvent: string;
    isCloseable: boolean;
    enterAnimation: string;
    exitAnimation: string;
    isActive: boolean;
  };
  advertisements: {
    id: number;
    adTitle: string;
    adDescription: string;
    adImageUrl: string;
    adTargetUrl: string;
    advertiserName: string;
  };
}

export default function FloatingAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { data: floatingAds } = useQuery<FloatingAdData[]>({
    queryKey: ["/api/advertisements/floating-ads/active"],
    refetchInterval: 60000, // Check every minute
  });

  useEffect(() => {
    if (!floatingAds || !Array.isArray(floatingAds) || floatingAds.length === 0) return;

    const ad = floatingAds[0];
    const { floating_ads: floatingAd } = ad;

    // Show delay
    const showTimer = setTimeout(() => {
      setShouldShow(true);
      setIsVisible(true);
    }, floatingAd.showDelay * 1000);

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      handleClose();
    }, (floatingAd.showDelay + floatingAd.hideDuration) * 1000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [floatingAds]);

  const handleClose = () => {
    if (!isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        setShouldShow(false);
        setIsClosing(false);
      }, 300); // Animation duration
    }
  };

  const handleAdClick = (targetUrl: string) => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  if (!shouldShow || !floatingAds || !Array.isArray(floatingAds) || floatingAds.length === 0) {
    return null;
  }

  const ad = floatingAds[0];
  const { floating_ads: floatingAd, advertisements: adData } = ad;

  const getPositionClasses = () => {
    let classes = "fixed z-50 ";
    
    // Position X
    switch (floatingAd.positionX) {
      case 'left':
        classes += "left-4 ";
        break;
      case 'center':
        classes += "left-1/2 transform -translate-x-1/2 ";
        break;
      case 'right':
      default:
        classes += "right-4 ";
        break;
    }
    
    // Position Y
    switch (floatingAd.positionY) {
      case 'top':
        classes += "top-4 ";
        break;
      case 'bottom':
        classes += "bottom-4 ";
        break;
      case 'center':
      default:
        classes += "top-1/2 transform -translate-y-1/2 ";
        break;
    }

    return classes;
  };

  const getAnimationClasses = () => {
    if (isClosing) {
      switch (floatingAd.exitAnimation) {
        case 'slide-up':
          return 'animate-slide-up';
        case 'slide-down':
          return 'animate-slide-down';
        case 'zoom-out':
          return 'animate-zoom-out';
        case 'fade':
        default:
          return 'animate-fade-out';
      }
    } else {
      switch (floatingAd.enterAnimation) {
        case 'slide-up':
          return 'animate-slide-up';
        case 'slide-down':
          return 'animate-slide-down';
        case 'bounce':
          return 'animate-bounce';
        case 'zoom':
          return 'animate-zoom-in';
        case 'fade':
        default:
          return 'animate-fade-in';
      }
    }
  };

  return (
    <div
      className={`${getPositionClasses()} ${getAnimationClasses()}`}
      style={{
        width: floatingAd.width,
        height: floatingAd.height,
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden relative group hover:shadow-3xl transition-shadow duration-300">
        {/* Close button */}
        {floatingAd.isCloseable && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 h-6 w-6 p-0 bg-black/20 hover:bg-black/40 rounded-full"
            onClick={handleClose}
          >
            <X className="h-3 w-3 text-white" />
          </Button>
        )}

        {/* Ad Content */}
        <div 
          className="h-full cursor-pointer"
          onClick={() => handleAdClick(adData.adTargetUrl)}
        >
          {/* Ad Image */}
          {adData.adImageUrl && (
            <div className="relative h-2/3 overflow-hidden">
              <img
                src={adData.adImageUrl}
                alt={adData.adTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/300/200?text=' + encodeURIComponent(adData.adTitle);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Ad Text Content */}
          <div className="p-4 h-1/3">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 text-gray-900">
              {adData.adTitle}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {adData.adDescription}
            </p>
            <div className="text-xs text-gray-500">
              By {adData.advertiserName}
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
}