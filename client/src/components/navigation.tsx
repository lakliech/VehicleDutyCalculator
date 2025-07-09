import { Link, useLocation } from "wouter";
import { Calculator, Car, Wrench, DollarSign, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import gariyangu from "@assets/gylogo_1752064168868.png";

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "Duty Calculator",
    icon: <Calculator className="h-8 w-8" />,
    description: "Calculate import duties and taxes"
  },
  {
    href: "/importation-estimator",
    label: "Import Calculator",
    icon: <Car className="h-8 w-8" />,
    description: "Estimate total importation costs"
  },
  {
    href: "/service-estimator",
    label: "Service Estimates",
    icon: <Wrench className="h-8 w-8" />,
    description: "Estimate service and maintenance costs"
  },
  {
    href: "/transfer-cost",
    label: "MyCar's Worth",
    icon: <DollarSign className="h-8 w-8" />,
    description: "Calculate vehicle value and transfer costs"
  },
  {
    href: "/vehicle-loans",
    label: "Vehicle Loan Products",
    icon: <CreditCard className="h-8 w-8" />,
    description: "Explore vehicle financing options"
  }
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4">
            <img 
              src={gariyangu} 
              alt="Gariyangu Logo" 
              className="h-12 w-auto"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Automotive Tools</h1>
              <p className="text-sm text-gray-600">All About Cars</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {navigationItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-lg",
                    isActive
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  )}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={cn(
                      "flex items-center justify-center",
                      isActive ? "text-white" : "text-purple-600"
                    )}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-semibold text-lg",
                        isActive ? "text-white" : "text-gray-900"
                      )}>
                        {item.label}
                      </h3>
                      <p className={cn(
                        "text-sm mt-1",
                        isActive ? "text-purple-100" : "text-gray-600"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}