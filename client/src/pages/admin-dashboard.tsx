import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Settings, 
  Car, 
  Percent, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Database,
  TrendingUp,
  TrendingDown,
  Shield,
  Calculator,
  LogOut,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Users,
  Eye,
  MessageSquare,
  AlertTriangle,
  Check,
  X,
  Filter,
  CheckSquare,
  User,
  Heart,
  Search,
  Lock,
  Mail,
  Ban,
  Activity,
  Package,
  RefreshCw,
  Download,
  Building2,
  CreditCard,
  Banknote,
  Receipt,
  BarChart3,
  Menu,
  ChevronRight,
  ChevronDown,
  Home
} from "lucide-react";
import { z } from "zod";
import ProductCatalogManagement from "@/components/ProductCatalogManagement";
import type { 
  VehicleReference, 
  TaxRate, 
  ProcessingFee,
  VehicleCategoryRule, 
  DepreciationRate,
  CarListing,
  AppUser,
  ListingApproval,
  UserRole
} from "@shared/schema";
import { useAuth } from "@/components/auth-provider";
import gariyangu from "@assets/gylogo_1752064168868.png";

export default function AdminDashboard() {
  return <AuthenticatedAdminDashboard />;
}

function AuthenticatedAdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { logout, getAuthHeaders } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(["marketplace", "financial"]);

  const toggleSubmenu = (submenuId: string) => {
    setOpenSubmenus(prev => 
      prev.includes(submenuId) 
        ? prev.filter(id => id !== submenuId)
        : [...prev, submenuId]
    );
  };

  const sidebarItems = [
    {
      id: "overview",
      label: "Dashboard Overview",
      icon: Home,
      type: "single"
    },
    {
      id: "marketplace",
      label: "Marketplace Management",
      icon: Car,
      type: "group",
      children: [
        { id: "listings", label: "Listing Management", icon: FileText },
        { id: "users", label: "User Management", icon: Users }
      ]
    },
    {
      id: "financial",
      label: "Financial Services",
      icon: CreditCard,
      type: "group",
      children: [
        { id: "banks", label: "Bank Partners", icon: Building2 },
        { id: "loan-products", label: "Loan Products", icon: Banknote },
        { id: "loan-applications", label: "Applications", icon: Receipt }
      ]
    },
    {
      id: "product-catalog",
      label: "Product Catalog",
      icon: Package,
      type: "single"
    },
    {
      id: "monetization",
      label: "Monetization Strategy", 
      icon: TrendingUp,
      type: "single"
    },
    {
      id: "system",
      label: "System Configuration",
      icon: Settings,
      type: "group",
      children: [
        { id: "vehicles", label: "Vehicle Database", icon: Car },
        { id: "csv-upload", label: "Data Import", icon: Upload },
        { id: "tax-rates", label: "Tax Configuration", icon: Percent },
        { id: "processing-fees", label: "Processing Fees", icon: Calculator },
        { id: "category-rules", label: "Category Rules", icon: Filter },
        { id: "depreciation-rates", label: "Depreciation Rates", icon: TrendingDown }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "product-catalog":
        return <ProductCatalogManagement />;
      case "listings":
        return <div className="p-4"><h2>Listing Management - Coming Soon</h2></div>;
      case "users":
        return <div className="p-4"><h2>User Management - Coming Soon</h2></div>;
      case "banks":
        return <div className="p-4"><h2>Bank Partners - Coming Soon</h2></div>;
      case "loan-products":
        return <div className="p-4"><h2>Loan Products - Coming Soon</h2></div>;
      case "loan-applications":
        return <div className="p-4"><h2>Loan Applications - Coming Soon</h2></div>;
      case "monetization":
        return <div className="p-4"><h2>Monetization Strategy - Coming Soon</h2></div>;
      case "vehicles":
        return <div className="p-4"><h2>Vehicle Database - Coming Soon</h2></div>;
      case "csv-upload":
        return <div className="p-4"><h2>Data Import - Coming Soon</h2></div>;
      case "tax-rates":
        return <div className="p-4"><h2>Tax Configuration - Coming Soon</h2></div>;
      case "processing-fees":
        return <div className="p-4"><h2>Processing Fees - Coming Soon</h2></div>;
      case "category-rules":
        return <div className="p-4"><h2>Category Rules - Coming Soon</h2></div>;
      case "depreciation-rates":
        return <div className="p-4"><h2>Depreciation Rates - Coming Soon</h2></div>;
      default:
        return <div className="p-4"><h2>Content not found</h2></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 flex">
      {/* Left Sidebar */}
      <aside className={`bg-white border-r border-purple-200 shadow-lg transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      } flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-purple-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <img 
                  src={gariyangu} 
                  alt="Gariyangu Logo" 
                  className="h-12 w-auto"
                />
                <div>
                  <h2 className="text-lg font-semibold text-purple-900">Admin Panel</h2>
                  <p className="text-xs text-purple-600">System Management</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.id}>
                {item.type === "single" ? (
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-10 ${
                      activeTab === item.id 
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm" 
                        : "text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                    } ${sidebarCollapsed ? "px-2" : "px-3"}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between gap-3 h-10 text-purple-700 hover:text-purple-900 hover:bg-purple-50 ${
                        sidebarCollapsed ? "px-2" : "px-3"
                      }`}
                      onClick={() => !sidebarCollapsed && toggleSubmenu(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!sidebarCollapsed && (
                          <span className="text-sm font-medium">{item.label}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && (
                        openSubmenus.includes(item.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )
                      )}
                    </Button>
                    {!sidebarCollapsed && openSubmenus.includes(item.id) && item.children && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Button
                            key={child.id}
                            variant={activeTab === child.id ? "default" : "ghost"}
                            className={`w-full justify-start gap-3 h-9 ${
                              activeTab === child.id 
                                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm" 
                                : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                            } px-3`}
                            onClick={() => setActiveTab(child.id)}
                          >
                            <child.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{child.label}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-purple-200">
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className={`w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 ${
              sidebarCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-purple-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">
                {sidebarItems.find(item => item.id === activeTab)?.label || 
                 sidebarItems.find(item => item.children?.some(child => child.id === activeTab))?.children?.find(child => child.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-purple-600 mt-1">
                Manage and configure system components
              </p>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              <Shield className="h-3 w-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Overview
          </CardTitle>
          <CardDescription>
            Welcome to the admin dashboard. Monitor system health and manage platform components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Total Users</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900">Active Listings</span>
              </div>
              <div className="text-2xl font-bold text-green-600">856</div>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Revenue</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">KES 2.4M</div>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-orange-900">System Health</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">98.5%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}