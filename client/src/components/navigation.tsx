import { Link, useLocation } from "wouter";
import { Calculator, Car, Wrench, FileText } from "lucide-react";
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
    label: "Motor Vehicle Calculator",
    icon: <Calculator className="h-4 w-4" />,
    description: "Calculate import duties and taxes"
  },
  {
    href: "/importation-estimator",
    label: "Vehicle Importation Estimator",
    icon: <Car className="h-4 w-4" />,
    description: "Estimate total importation costs"
  },
  {
    href: "/service-estimator",
    label: "Vehicle Service Estimator",
    icon: <Wrench className="h-4 w-4" />,
    description: "Estimate service and maintenance costs"
  },
  {
    href: "/transfer-cost",
    label: "Vehicle Transfer Cost",
    icon: <FileText className="h-4 w-4" />,
    description: "Calculate ownership transfer fees"
  }
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <img 
              src={gariyangu} 
              alt="Gariyangu Logo" 
              className="h-8 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900">Automotive Tools</h1>
              <p className="text-xs text-gray-600">All About Cars</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex space-x-1">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    )}
                    title={item.description}
                  >
                    {item.icon}
                    <span className="hidden lg:inline">{item.label}</span>
                    <span className="lg:hidden">{item.label.split(' ')[0]}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}