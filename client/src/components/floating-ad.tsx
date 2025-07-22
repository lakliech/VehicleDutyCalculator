import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

interface FloatingAdData {
  id: number;
  adTitle: string;
  adDescription?: string;
  adImageUrl: string;
  adTargetUrl: string;
  backgroundColor?: string;
  textColor?: string;
  animationType?: string;
  positionX: string;
  positionY: string;
  width: string;
  height: string;
  zIndex: number;
  showDelay: number;
  hideDuration: number;
  isCloseable: boolean;
  closeButtonStyle: string;
  triggerEvent: string | null;
  triggerValue?: number | null;
  showOncePerSession: boolean;
  showOncePerDay: boolean;
  maxShowsPerUser?: number | null;
  enterAnimation: string | null;
  exitAnimation: string | null;
  animationDuration: number;
}

export function FloatingAd() {
  const [visibleAds, setVisibleAds] = useState<Set<number>>(new Set());
  const [closedAds, setClosedAds] = useState<Set<number>>(new Set());
  const [sessionShownAds, setSessionShownAds] = useState<Set<number>>(new Set());
  const queryClient = useQueryClient();

  // Force cache invalidation on mount to ensure fresh data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['/api/advertisements/floating-ads/active'] });
  }, [queryClient]);

  // Query for active floating ads
  const { data: rawFloatingAds } = useQuery({
    queryKey: ['/api/advertisements/floating-ads/active'],
    queryFn: () => apiRequest('GET', '/api/advertisements/floating-ads/active').then(res => res.json()),
    refetchInterval: 60000, // Refetch every minute to get updated ads
    staleTime: 0, // Always refetch to get latest data
  });

  // Transform the API response to match expected format
  const floatingAds = rawFloatingAds?.map((item: any) => ({
    id: item.floating_ads.id,
    adTitle: item.advertisements.adTitle,
    adDescription: item.advertisements.adDescription,
    adImageUrl: item.advertisements.adImageUrl,
    adTargetUrl: item.advertisements.adTargetUrl,
    backgroundColor: item.advertisements.backgroundColor,
    textColor: item.advertisements.textColor,
    animationType: item.advertisements.animationType,
    positionX: item.floating_ads.positionX,
    positionY: item.floating_ads.positionY,
    width: item.floating_ads.width,
    height: item.floating_ads.height,
    zIndex: item.floating_ads.zIndex,
    showDelay: item.floating_ads.showDelay,
    hideDuration: item.floating_ads.hideDuration,
    isCloseable: item.floating_ads.isCloseable,
    closeButtonStyle: item.floating_ads.closeButtonStyle,
    triggerEvent: item.floating_ads.triggerEvent,
    triggerValue: item.floating_ads.triggerValue,
    showOncePerSession: item.floating_ads.showOncePerSession,
    showOncePerDay: item.floating_ads.showOncePerDay,
    maxShowsPerUser: item.floating_ads.maxShowsPerUser,
    enterAnimation: item.floating_ads.enterAnimation || 'fade',
    exitAnimation: item.floating_ads.exitAnimation || 'fade',
    animationDuration: item.floating_ads.animationDuration,
  })) || [];

  // Check localStorage for daily shown ads
  const getDailyShownAds = (): Set<number> => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(`floatingAds_${today}`);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  };

  const setDailyShownAd = (adId: number) => {
    const today = new Date().toDateString();
    const dailyShown = getDailyShownAds();
    dailyShown.add(adId);
    localStorage.setItem(`floatingAds_${today}`, JSON.stringify(Array.from(dailyShown)));
  };

  // Show ad with delay and animation
  const showAd = (ad: FloatingAdData) => {
    console.log(`FloatingAd: showAd called for ad ${ad.id}, delay: ${ad.showDelay}s`);
    const dailyShown = getDailyShownAds();
    
    // Check if ad should be shown based on frequency controls
    if (ad.showOncePerSession && sessionShownAds.has(ad.id)) {
      console.log(`FloatingAd: Ad ${ad.id} already shown this session`);
      return;
    }
    if (ad.showOncePerDay && dailyShown.has(ad.id)) {
      console.log(`FloatingAd: Ad ${ad.id} already shown today`);
      return;
    }
    if (closedAds.has(ad.id)) {
      console.log(`FloatingAd: Ad ${ad.id} already closed`);
      return;
    }

    console.log(`FloatingAd: Scheduling ad ${ad.id} to show after ${ad.showDelay} seconds`);
    setTimeout(() => {
      console.log(`FloatingAd: Making ad ${ad.id} visible now`);
      setVisibleAds(prev => new Set(Array.from(prev).concat(ad.id)));
      setSessionShownAds(prev => new Set(Array.from(prev).concat(ad.id)));
      
      if (ad.showOncePerDay) {
        setDailyShownAd(ad.id);
      }

      // Auto-hide after specified duration
      if (ad.hideDuration > 0) {
        console.log(`FloatingAd: Scheduling ad ${ad.id} to hide after ${ad.hideDuration} seconds`);
        setTimeout(() => {
          hideAd(ad.id, ad.exitAnimation, ad.animationDuration);
        }, ad.hideDuration * 1000);
      }
    }, ad.showDelay * 1000);
  };

  // Hide ad with animation
  const hideAd = (adId: number, exitAnimation: string | null, animationDuration: number) => {
    const adElement = document.getElementById(`floating-ad-${adId}`);
    if (adElement) {
      const animation = exitAnimation || 'fade';
      adElement.style.animation = `${animation} ${animationDuration}ms ease-out`;
      setTimeout(() => {
        setVisibleAds(prev => {
          const newSet = new Set(prev);
          newSet.delete(adId);
          return newSet;
        });
      }, animationDuration);
    }
  };

  // Close ad manually
  const closeAd = (ad: FloatingAdData) => {
    if (!ad.isCloseable) return;
    
    setClosedAds(prev => new Set(Array.from(prev).concat(ad.id)));
    hideAd(ad.id, ad.exitAnimation, ad.animationDuration);
  };

  // Handle trigger events
  useEffect(() => {
    if (!floatingAds || floatingAds.length === 0) return;

    floatingAds.forEach((ad: FloatingAdData) => {
      if (ad.triggerEvent === 'page_load' || ad.triggerEvent === null) {
        showAd(ad);
      } else if (ad.triggerEvent === 'scroll' && ad.triggerValue) {
        const handleScroll = () => {
          const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercent >= ad.triggerValue!) {
            showAd(ad);
            window.removeEventListener('scroll', handleScroll);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      } else if (ad.triggerEvent === 'scroll' && !ad.triggerValue) {
        // If scroll trigger without value, trigger immediately on any scroll
        const handleScroll = () => {
          showAd(ad);
          window.removeEventListener('scroll', handleScroll);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      } else if (ad.triggerEvent === 'time_spent' && ad.triggerValue) {
        setTimeout(() => showAd(ad), ad.triggerValue * 1000);
      }
    });
  }, [floatingAds]);

  // Get position styles
  const getPositionStyles = (ad: FloatingAdData) => {
    const styles: React.CSSProperties = {
      position: 'fixed',
      zIndex: ad.zIndex,
      width: ad.width,
      height: ad.height,
    };

    // Handle X position
    if (ad.positionX === 'left') styles.left = '20px';
    else if (ad.positionX === 'center') styles.left = '50%', styles.transform = 'translateX(-50%)';
    else if (ad.positionX === 'right') styles.right = '20px';
    else styles.left = ad.positionX;

    // Handle Y position
    if (ad.positionY === 'top') styles.top = '20px';
    else if (ad.positionY === 'center') styles.top = '50%', styles.transform = styles.transform ? styles.transform + ' translateY(-50%)' : 'translateY(-50%)';
    else if (ad.positionY === 'bottom') styles.bottom = '20px';
    else styles.top = ad.positionY;

    return styles;
  };

  // Get animation styles
  const getAnimationStyles = (ad: FloatingAdData) => {
    const animation = ad.enterAnimation || 'fade';
    return {
      animation: `${animation} ${ad.animationDuration}ms ease-out`,
    };
  };

  if (!floatingAds || floatingAds.length === 0) return null;

  return (
    <>
      {floatingAds.map((ad: FloatingAdData) => {
        if (!visibleAds.has(ad.id)) return null;

        return (
          <div
            key={ad.id}
            id={`floating-ad-${ad.id}`}
            style={{
              ...getPositionStyles(ad),
              ...getAnimationStyles(ad),
              backgroundColor: ad.backgroundColor || '#ffffff',
              color: ad.textColor || '#000000',
              border: '3px solid #ff0000',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
            }}
            className="floating-ad"
          >
            {/* Close button */}
            {ad.isCloseable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => closeAd(ad)}
                className={`absolute ${
                  ad.closeButtonStyle === 'top-left' ? 'top-1 left-1' : 'top-1 right-1'
                } w-6 h-6 p-0 rounded-full bg-gray-100 hover:bg-gray-200 z-10`}
              >
                <X className="h-3 w-3" />
              </Button>
            )}

            {/* Ad content */}
            <a
              href={ad.adTargetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              onClick={() => {
                // Track click
                apiRequest('POST', `/api/advertisements/track/click/${ad.id}`, {
                  userAgent: navigator.userAgent,
                  deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
                }).catch(console.error);
              }}
            >
              <div className="relative w-full h-full flex flex-col">
                {/* Ad image */}
                <div className="flex-1 relative">
                  <img
                    src={ad.adImageUrl}
                    alt={ad.adTitle}
                    className="w-full h-full object-cover"
                    onLoad={() => {
                      console.log(`FloatingAd: Image loaded for ad ${ad.id}`);
                      // Track impression
                      apiRequest('POST', `/api/advertisements/track/impression/${ad.id}`, {
                        userAgent: navigator.userAgent,
                        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
                      }).catch(console.error);
                    }}
                    onError={(e) => {
                      console.log(`FloatingAd: Image failed to load for ad ${ad.id}:`, e);
                    }}
                  />
                </div>

                {/* Ad text overlay if description exists */}
                {ad.adDescription && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">{ad.adTitle}</h3>
                    <p className="text-white/90 text-xs line-clamp-2">{ad.adDescription}</p>
                  </div>
                )}
              </div>
            </a>
          </div>
        );
      })}

      <style>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes zoom {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes zoom-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.5); }
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
}