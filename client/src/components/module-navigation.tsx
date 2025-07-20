import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  Car, 
  Wrench, 
  Coins, 
  FileText, 
  ShoppingCart, 
  CreditCard,
  Search,
  Home,
  User,
  UserPlus,
  Shield
} from "lucide-react";

interface ModuleItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const moduleItems: ModuleItem[] = [
  {
    href: "/",
    label: "Home",
    icon: <Home className="h-4 w-4" />
  },
  {
    href: "/duty-calculator",
    label: "Duty Calculator",
    icon: <Calculator className="h-4 w-4" />
  },
  {
    href: "/importation-estimator", 
    label: "Import Calculator",
    icon: <Car className="h-4 w-4" />
  },
  {
    href: "/mycars-worth",
    label: "MyCar's Worth",
    icon: <Coins className="h-4 w-4" />
  },
  {
    href: "/service-estimator",
    label: "Service Estimates", 
    icon: <Wrench className="h-4 w-4" />
  },
  {
    href: "/transfer-cost",
    label: "Transfer Cost",
    icon: <FileText className="h-4 w-4" />
  },
  {
    href: "/buy-a-car",
    label: "Buy a Car",
    icon: <Search className="h-4 w-4" />
  },
  {
    href: "/sell-my-car",
    label: "Sell My Car",
    icon: <ShoppingCart className="h-4 w-4" />
  },
  {
    href: "/vehicle-loans",
    label: "Vehicle Loans",
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    href: "/mileage-verification",
    label: "Mileage Verify",
    icon: <Shield className="h-4 w-4" />
  }
];

export function ModuleNavigation() {
  const [location] = useLocation();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center">
          {/* Module Links */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            {moduleItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 whitespace-nowrap ${
                      isActive 
                        ? "bg-purple-600 text-white hover:bg-purple-700" 
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>


        </div>
      </div>
    </div>
  );
}