import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  MessageCircle, 
  Heart, 
  Search, 
  Calculator, 
  Car, 
  PlusCircle,
  X,
  Bot,
  TrendingUp,
  CreditCard,
  Import,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionMenuProps {
  className?: string;
}

export function QuickActionMenu({ className }: QuickActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // Get unread message count
  const { data: messagingStats } = useQuery({
    queryKey: ['/api/messaging/stats'],
    refetchInterval: 30000, // Poll every 30 seconds
  });

  // Hide menu on admin pages
  const shouldHideMenu = location.startsWith('/admin');

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle menu with 'Q' key
      if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      // Close menu with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  if (shouldHideMenu) {
    return null;
  }

  const quickActions = [
    {
      icon: Car,
      label: "Sell Car",
      href: "/sell-my-car",
      color: "bg-green-500 hover:bg-green-600",
      description: "List your vehicle"
    },
    {
      icon: Search,
      label: "Buy Car",
      href: "/buy-a-car", 
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Browse vehicles"
    },
    {
      icon: Calculator,
      label: "Duty Calculator",
      href: "/duty-calculator",
      color: "bg-purple-500 hover:bg-purple-600", 
      description: "Calculate import duties"
    },
    {
      icon: Import,
      label: "Import Estimator",
      href: "/importation-estimator",
      color: "bg-orange-500 hover:bg-orange-600",
      description: "Estimate import costs"
    },
    {
      icon: Bot,
      label: "AI Advisor",
      href: "/ai-advisor",
      color: "bg-cyan-500 hover:bg-cyan-600",
      description: "Get recommendations"
    },
    {
      icon: TrendingUp,
      label: "Price Trends",
      href: "/price-trends",
      color: "bg-pink-500 hover:bg-pink-600",
      description: "Market analysis"
    },
    {
      icon: Heart,
      label: "Wishlists",
      href: "/my-wishlists",
      color: "bg-red-500 hover:bg-red-600",
      description: "Saved vehicles"
    },
    {
      icon: CreditCard,
      label: "Transfer Cost",
      href: "/transfer-cost",
      color: "bg-indigo-500 hover:bg-indigo-600",
      description: "Calculate transfer fees"
    }
  ];

  return (
    <div className={cn("fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50", className)}>
      {/* Action Items */}
      <div className={cn(
        "flex flex-col-reverse items-end space-y-reverse space-y-3 mb-4 transition-all duration-300",
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
      )}>
        {quickActions.map((action, index) => (
          <div
            key={action.label}
            className={cn(
              "transform transition-all duration-300 delay-75",
              isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
          >
            <Link href={action.href}>
              <Button
                onClick={() => setIsOpen(false)}
                className={cn(
                  "h-11 md:h-12 px-3 md:px-4 rounded-full shadow-lg text-white border-0 min-w-[120px] md:min-w-[140px] justify-start backdrop-blur-sm",
                  action.color
                )}
              >
                <action.icon className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-xs md:text-sm truncate">{action.label}</div>
                  <div className="text-xs opacity-90 truncate hidden md:block">{action.description}</div>
                </div>
              </Button>
            </Link>
          </div>
        ))}

        {/* Messages with Badge */}
        <div className={cn(
          "transform transition-all duration-300 delay-75",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        )}>
          <Link href="/messages">
            <Button
              onClick={() => setIsOpen(false)}
              className="h-11 md:h-12 px-3 md:px-4 rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white border-0 min-w-[120px] md:min-w-[140px] justify-start relative backdrop-blur-sm"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-xs md:text-sm truncate">Messages</div>
                <div className="text-xs opacity-90 truncate hidden md:block">View conversations</div>
              </div>
              {messagingStats?.unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-5 w-5 md:h-6 md:w-6 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {messagingStats.unreadCount > 99 ? '99+' : messagingStats.unreadCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main FAB */}
      <Button
        onClick={toggleMenu}
        className={cn(
          "h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg transition-all duration-300 ring-2 ring-white/20",
          "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600",
          "text-white border-0 flex items-center justify-center backdrop-blur-sm",
          isOpen && "rotate-45 scale-110"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <Menu className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}