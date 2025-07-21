import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
  triggerEvent: string;
  triggerValue?: number;
  showOncePerSession: boolean;
  showOncePerDay: boolean;
  maxShowsPerUser?: number;
  enterAnimation: string;
  exitAnimation: string;
  animationDuration: number;
}

export function FloatingAd() {
  const [visibleAds, setVisibleAds] = useState<Set<number>>(new Set());
  const [closedAds, setClosedAds] = useState<Set<number>>(new Set());
  const [sessionShownAds, setSessionShownAds] = useState<Set<number>>(new Set());

  // Query for active floating ads
  const { data: floatingAds } = useQuery({
    queryKey: ['/api/advertisements/floating-ads/active'],
    queryFn: () => apiRequest('GET', '/api/advertisements/floating-ads/active').then(res => res.json()),
    refetchInterval: 60000, // Refetch every minute to get updated ads
  });

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
    localStorage.setItem(`floatingAds_${today}`, JSON.stringify([...dailyShown]));
  };

  // Show ad with delay and animation
  const showAd = (ad: FloatingAdData) => {
    const dailyShown = getDailyShownAds();
    
    // Check if ad should be shown based on frequency controls
    if (ad.showOncePerSession && sessionShownAds.has(ad.id)) return;
    if (ad.showOncePerDay && dailyShown.has(ad.id)) return;
    if (closedAds.has(ad.id)) return;

    setTimeout(() => {
      setVisibleAds(prev => new Set([...prev, ad.id]));
      setSessionShownAds(prev => new Set([...prev, ad.id]));
      
      if (ad.showOncePerDay) {
        setDailyShownAd(ad.id);
      }

      // Auto-hide after specified duration
      if (ad.hideDuration > 0) {
        setTimeout(() => {
          hideAd(ad.id, ad.exitAnimation, ad.animationDuration);
        }, ad.hideDuration * 1000);
      }
    }, ad.showDelay * 1000);
  };

  // Hide ad with animation
  const hideAd = (adId: number, exitAnimation: string, animationDuration: number) => {
    const adElement = document.getElementById(`floating-ad-${adId}`);
    if (adElement) {
      adElement.style.animation = `${exitAnimation} ${animationDuration}ms ease-out`;
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
    
    setClosedAds(prev => new Set([...prev, ad.id]));
    hideAd(ad.id, ad.exitAnimation, ad.animationDuration);
  };

  // Handle trigger events
  useEffect(() => {
    if (!floatingAds || floatingAds.length === 0) return;

    floatingAds.forEach((ad: FloatingAdData) => {
      if (ad.triggerEvent === 'page_load') {
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
    return {
      animation: `${ad.enterAnimation} ${ad.animationDuration}ms ease-out`,
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
              border: '1px solid #e5e7eb',
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
                      // Track impression
                      apiRequest('POST', `/api/advertisements/track/impression/${ad.id}`, {
                        userAgent: navigator.userAgent,
                        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
                      }).catch(console.error);
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

      <style jsx>{`
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