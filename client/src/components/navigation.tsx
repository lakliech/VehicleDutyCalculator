import { Link, useLocation } from "wouter";
import { Calculator, Car, Wrench, DollarSign, CreditCard, FileText, ShoppingCart, Search } from "lucide-react";
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
    href: "/duty-calculator",
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
    href: "/mycars-worth",
    label: "MyCar's Worth",
    icon: <DollarSign className="h-8 w-8" />,
    description: "Calculate current vehicle value"
  },
  {
    href: "/transfer-cost",
    label: "Transfer Cost",
    icon: <FileText className="h-8 w-8" />,
    description: "Calculate ownership transfer fees"
  },
  {
    href: "/buy-a-car",
    label: "Buy a Car",
    icon: <Search className="h-8 w-8" />,
    description: "Browse and buy quality vehicles"
  },
  {
    href: "/sell-my-car",
    label: "Sell My Car",
    icon: <ShoppingCart className="h-8 w-8" />,
    description: "List and sell your vehicle"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-6">
            <img 
              src={gariyangu} 
              alt="Gariyangu Logo" 
              className="h-20 w-auto"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Kenya's Car Marketplace</h1>
              <p className="text-lg text-gray-600">All About Cars</p>
            </div>
          </div>
        </div>
      </div>

      {/* Import Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-medium">
                Do you wish to import a car from Japan/UK/South Africa/Dubai/Australia/Singapore/Thailand? I'm your plug!
              </p>
              <p className="text-xs sm:text-sm text-cyan-100 mt-1">
                Professional car import services with competitive rates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold">Call or WhatsApp:</span>
              <a
                href="https://wa.me/254736272719?text=Hi%2C%20I%27m%20interested%20in%20importing%20a%20car.%20Can%20you%20help%20me%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2c-5.5 0-9.973 4.473-9.973 9.973 0 1.756.459 3.406 1.263 4.832l-1.341 4.89 5.011-1.314a9.924 9.924 0 004.04.835c5.5 0 9.973-4.473 9.973-9.973S17.517 2 12.017 2zm5.941 14.665c-.254.714-1.267 1.315-2.083 1.484-.563.117-1.297.106-2.089-.276-1.372-.662-2.854-1.815-3.93-3.246-1.077-1.431-1.789-3.13-1.789-4.89 0-1.364.553-2.6 1.45-3.5.258-.258.564-.387.904-.387.225 0 .45.008.647.016.209.009.488-.079.765.583.291.696.983 2.4 1.071 2.576.087.176.146.38.029.614-.117.234-.176.38-.351.586-.176.206-.369.46-.527.62-.175.176-.358.366-.154.717.204.351.906 1.495 1.944 2.42 1.336 1.189 2.462 1.557 2.812 1.732.351.176.556.147.759-.088.204-.234.87-.871 1.102-1.17.234-.3.468-.251.789-.15.322.1 2.038 0.961 2.389 1.136.35.176.584.263.671.41.087.146.087.844-.167 1.558z"/>
                </svg>
                0736 272719
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
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