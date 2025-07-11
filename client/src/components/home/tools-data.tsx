import { 
  Calculator, 
  Car, 
  Wrench, 
  DollarSign, 
  FileText, 
  ShoppingCart, 
  CreditCard,
  Search,
  TrendingUp,
  BarChart3,
  Target
} from "lucide-react";

export const toolsData = [
  {
    href: "/duty-calculator",
    title: "Duty Calculator",
    description: "Calculate Kenya import duties and taxes with KRA official rates",
    icon: <Calculator className="h-12 w-12" />,
    color: "bg-purple-500",
    featured: true
  },
  {
    href: "/importation-estimator", 
    title: "Import Calculator",
    description: "Estimate total vehicle importation costs",
    icon: <Car className="h-12 w-12" />,
    color: "bg-blue-500"
  },
  {
    href: "/mycars-worth",
    title: "MyCar's Worth", 
    description: "Get current market value of your vehicle",
    icon: <DollarSign className="h-12 w-12" />,
    color: "bg-green-500"
  },
  {
    href: "/vehicle-recommendations",
    title: "Vehicle Recommendations",
    description: "Get personalized vehicle recommendations based on your preferences",
    icon: <Target className="h-12 w-12" />,
    color: "bg-purple-600"
  },
  {
    href: "/service-estimator",
    title: "Service Estimates", 
    description: "Estimate maintenance costs",
    icon: <Wrench className="h-12 w-12" />,
    color: "bg-orange-500"
  },
  {
    href: "/transfer-cost",
    title: "Transfer Cost",
    description: "Calculate ownership transfer fees", 
    icon: <FileText className="h-12 w-12" />,
    color: "bg-cyan-500"
  },
  {
    href: "/buy-a-car",
    title: "Buy a Car",
    description: "Browse and buy quality vehicles",
    icon: <Search className="h-12 w-12" />,
    color: "bg-indigo-500"
  },
  {
    href: "/sell-my-car",
    title: "Sell My Car",
    description: "List and sell your vehicle",
    icon: <ShoppingCart className="h-12 w-12" />,
    color: "bg-pink-500"
  },
  {
    href: "/vehicle-loans",
    title: "Vehicle Loan Products",
    description: "Explore financing options",
    icon: <CreditCard className="h-12 w-12" />,
    color: "bg-yellow-500"
  },
  {
    href: "/price-trends",
    title: "AI Price Trends",
    description: "AI-powered vehicle price trend analysis",
    icon: <TrendingUp className="h-12 w-12" />,
    color: "bg-emerald-500"
  },
  {
    href: "/market-heatmap",
    title: "Market Heatmap",
    description: "Visual market trends with color-coded insights",
    icon: <BarChart3 className="h-12 w-12" />,
    color: "bg-red-500"
  }
];