import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Coins,
  Target
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

// Form schemas for validation
const vehicleReferenceSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  engineCapacity: z.number().optional(),
  bodyType: z.string().optional(),
  driveConfiguration: z.string().optional(),
  seating: z.string().optional(),
  fuelType: z.string().optional(),
  gvw: z.string().optional(),
  crspKes: z.number().optional(),
  crsp2020: z.number().optional(),
  discontinuationYear: z.number().optional(),
});

const taxRateSchema = z.object({
  vehicleCategory: z.string().min(1, "Vehicle category is required"),
  importDutyRate: z.string().min(1, "Import duty rate is required"),
  exciseDutyRate: z.string().min(1, "Excise duty rate is required"),
  vatRate: z.string().min(1, "VAT rate is required"),
});

const processingFeeSchema = z.object({
  feeType: z.string().min(1, "Fee type is required"),
  feeName: z.string().min(1, "Fee name is required"),
  rate: z.string().min(1, "Rate is required"),
  applicableToImportType: z.enum(["direct", "previouslyRegistered", "both"]),
  calculationBase: z.string().min(1, "Calculation base is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

const categoryRuleSchema = z.object({
  vehicleCategory: z.string().min(1, "Vehicle category is required"),
  minEngineSize: z.number().optional(),
  maxEngineSize: z.number().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
});

const depreciationRateSchema = z.object({
  vehicleType: z.enum(["direct", "previouslyRegistered"]),
  minAgeMonths: z.number().min(0),
  maxAgeMonths: z.number().min(0),
  depreciationPercentage: z.number().min(0).max(100),
});

const bankSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  bankCode: z.string().min(1, "Bank code is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  address: z.string().optional(),
  isActive: z.boolean().default(true),
});

const loanProductSchema = z.object({
  bankId: z.number().min(1, "Bank selection is required"),
  productName: z.string().min(1, "Product name is required"),
  productType: z.enum(["auto_loan", "asset_finance", "personal_loan"]),
  minInterestRate: z.number().min(0).max(100),
  maxInterestRate: z.number().min(0).max(100),
  minLoanAmount: z.number().min(1000),
  maxLoanAmount: z.number().min(1000),
  minTenureMonths: z.number().min(1),
  maxTenureMonths: z.number().min(1),
  processingFeePercentage: z.number().min(0).max(10).optional(),
  requiresDownPayment: z.boolean().default(true),
  minDownPaymentPercentage: z.number().min(0).max(100).optional(),
  maxLtvRatio: z.number().min(0).max(100),
  eligibilityRequirements: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
});

const listingApprovalSchema = z.object({
  notes: z.string().optional(),
  reason: z.string().optional(),
  changes: z.array(z.string()).optional(),
});

type VehicleReferenceForm = z.infer<typeof vehicleReferenceSchema>;
type TaxRateForm = z.infer<typeof taxRateSchema>;
type ProcessingFeeForm = z.infer<typeof processingFeeSchema>;
type ListingApprovalForm = z.infer<typeof listingApprovalSchema>;
type CategoryRuleForm = z.infer<typeof categoryRuleSchema>;
type DepreciationRateForm = z.infer<typeof depreciationRateSchema>;
type BankForm = z.infer<typeof bankSchema>;
type LoanProductForm = z.infer<typeof loanProductSchema>;

export default function AdminDashboard() {
  // No need for auth check here since the route is protected by ProtectedRoute
  return <AuthenticatedAdminDashboard />;
}

function AuthenticatedAdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { logout, getAuthHeaders } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFinancialTab, setSelectedFinancialTab] = useState("banks");
  const [showAddBankDialog, setShowAddBankDialog] = useState(false);
  const [showEditBankDialog, setShowEditBankDialog] = useState(false);
  const [showAddLoanProductDialog, setShowAddLoanProductDialog] = useState(false);
  const [showEditLoanProductDialog, setShowEditLoanProductDialog] = useState(false);
  const [editingBank, setEditingBank] = useState<any>(null);
  const [editingLoanProduct, setEditingLoanProduct] = useState<any>(null);
  const [uploadResults, setUploadResults] = useState<{
    total: number;
    added: number;
    updated: number;
    failed: number;
    errors: string[];
  } | null>(null);

  // Queries for fetching data with authentication
  const { data: vehicleReferences = [], isLoading: vehiclesLoading } = useQuery<VehicleReference[]>({
    queryKey: ["/api/admin/vehicle-references"],
    queryFn: async () => {
      const response = await fetch("/api/admin/vehicle-references", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: taxRates = [], isLoading: taxRatesLoading } = useQuery<TaxRate[]>({
    queryKey: ["/api/admin/tax-rates"],
    queryFn: async () => {
      const response = await fetch("/api/admin/tax-rates", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: categoryRules = [], isLoading: categoryRulesLoading } = useQuery<VehicleCategoryRule[]>({
    queryKey: ["/api/admin/category-rules"],
    queryFn: async () => {
      const response = await fetch("/api/admin/category-rules", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: depreciationRates = [], isLoading: depreciationRatesLoading } = useQuery<DepreciationRate[]>({
    queryKey: ["/api/admin/depreciation-rates"],
    queryFn: async () => {
      const response = await fetch("/api/admin/depreciation-rates", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: processingFees = [], isLoading: processingFeesLoading } = useQuery<ProcessingFee[]>({
    queryKey: ["/api/admin/processing-fees"],
    queryFn: async () => {
      const response = await fetch("/api/admin/processing-fees", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  // New queries for listings and users
  const { data: listings = [], isLoading: listingsLoading } = useQuery<(CarListing & { seller: AppUser; approval?: ListingApproval })[]>({
    queryKey: ["/api/admin/listings"],
    queryFn: async () => {
      const response = await fetch("/api/admin/listings", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<(AppUser & { role?: UserRole })[]>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: roles = [] } = useQuery<UserRole[]>({
    queryKey: ["/api/admin/roles"],
    queryFn: async () => {
      const response = await fetch("/api/admin/roles", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  // Automated flagging analytics
  const { data: autoFlagRules = [] } = useQuery({
    queryKey: ["/api/admin/auto-flag-rules"],
    queryFn: async () => {
      const response = await fetch("/api/admin/auto-flag-rules", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: flaggingStats } = useQuery({
    queryKey: ["/api/admin/flagging-stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/flagging-stats", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  // Financial Services Queries
  const { data: banks = [], isLoading: banksLoading } = useQuery({
    queryKey: ["/api/admin/financial/banks"],
    queryFn: async () => {
      const response = await fetch("/api/admin/financial/banks", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: loanProducts = [], isLoading: loanProductsLoading } = useQuery({
    queryKey: ["/api/admin/financial/loan-products"],
    queryFn: async () => {
      const response = await fetch("/api/admin/financial/loan-products", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: loanApplications = [], isLoading: loanApplicationsLoading } = useQuery({
    queryKey: ["/api/admin/financial/loan-applications"],
    queryFn: async () => {
      const response = await fetch("/api/admin/financial/loan-applications", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const { data: tradeInEvaluations = [], isLoading: tradeInEvaluationsLoading } = useQuery({
    queryKey: ["/api/admin/financial/trade-in-evaluations"],
    queryFn: async () => {
      const response = await fetch("/api/admin/financial/trade-in-evaluations", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  // CSV Upload mutation
  const uploadCsvMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/admin/upload-vehicle-csv", {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: (result) => {
      setUploadResults(result);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vehicle-references"] });
      toast({
        title: "CSV Upload Complete",
        description: `Added: ${result.added}, Updated: ${result.updated}, Failed: ${result.failed}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Vehicle reference mutations with authentication
  const addVehicleMutation = useMutation({
    mutationFn: async (data: VehicleReferenceForm) => {
      const response = await fetch("/api/admin/vehicle-references", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vehicle-references"] });
      toast({ title: "Success", description: "Vehicle reference added successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Tax rate mutations
  const updateTaxRateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<TaxRateForm> }) => {
      const response = await apiRequest("PUT", `/api/admin/tax-rates/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tax-rates"] });
      toast({ title: "Success", description: "Tax rate updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Category rule mutations
  const addCategoryRuleMutation = useMutation({
    mutationFn: async (data: CategoryRuleForm) => {
      const response = await apiRequest("POST", "/api/admin/category-rules", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/category-rules"] });
      toast({ title: "Success", description: "Category rule added successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Depreciation rate mutations
  const updateDepreciationRateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<DepreciationRateForm> }) => {
      const response = await apiRequest("PUT", `/api/admin/depreciation-rates/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/depreciation-rates"] });
      toast({ title: "Success", description: "Depreciation rate updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Processing fees mutations
  const addProcessingFeeMutation = useMutation({
    mutationFn: async (data: ProcessingFeeForm) => {
      const response = await fetch("/api/admin/processing-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/processing-fees"] });
      toast({ title: "Success", description: "Processing fee added successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateProcessingFeeMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ProcessingFeeForm> }) => {
      const response = await fetch(`/api/admin/processing-fees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/processing-fees"] });
      toast({ title: "Success", description: "Processing fee updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Listing management mutations
  const approveListingMutation = useMutation({
    mutationFn: async ({ listingId, notes }: { listingId: number; notes?: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ notes }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      toast({ title: "Success", description: "Listing approved successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const rejectListingMutation = useMutation({
    mutationFn: async ({ listingId, reason }: { listingId: number; reason: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      toast({ title: "Success", description: "Listing rejected" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const requestChangesListingMutation = useMutation({
    mutationFn: async ({ listingId, changes, notes }: { listingId: number; changes: string[]; notes?: string }) => {
      const response = await fetch(`/api/admin/listings/${listingId}/request-changes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ changes, notes }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings"] });
      toast({ title: "Success", description: "Changes requested" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: number }) => {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ roleId }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "User role updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `KES ${num.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img 
                src={gariyangu} 
                alt="Gariyangu Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-purple-900">Admin Dashboard</h1>
                <p className="text-sm text-purple-700">Manage vehicle data, tax rates, and categories</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                <Shield className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Organized Navigation with Groups */}
          <div className="space-y-4">
            {/* Main Navigation */}
            <TabsList className="grid w-full grid-cols-6 mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Dashboard Overview
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Marketplace Management
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Financial Services
              </TabsTrigger>
              <TabsTrigger value="product-catalog" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Product Catalog
              </TabsTrigger>
              <TabsTrigger value="monetization" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Monetization Strategy
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System Configuration
              </TabsTrigger>
            </TabsList>

            {/* Secondary Navigation for System Configuration */}
            {activeTab === "system" && (
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="vehicles" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Vehicle Database
                </TabsTrigger>
                <TabsTrigger value="csv-upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Data Import
                </TabsTrigger>
                <TabsTrigger value="tax-rates" className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Tax Configuration
                </TabsTrigger>
                <TabsTrigger value="processing-fees" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Fee Structure
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Category Rules
                </TabsTrigger>
                <TabsTrigger value="depreciation" className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Depreciation
                </TabsTrigger>
              </TabsList>
            )}

            {/* Secondary Navigation for Marketplace Management */}
            {activeTab === "marketplace" && (
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Car Listings
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Management
                </TabsTrigger>
                <TabsTrigger value="flagging" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Auto-Flagging System
                </TabsTrigger>
              </TabsList>
            )}
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          {/* Product Catalog Tab */}
          <TabsContent value="product-catalog">
            <ProductCatalogManagement />
          </TabsContent>

          {/* Listings Management Tab */}
          <TabsContent value="listings">
            <EnhancedListingsManagementTab />
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users">
            <UsersManagementTab />
          </TabsContent>

          {/* Automated Flagging System Tab */}
          <TabsContent value="flagging">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Automated Flagging System
                  </CardTitle>
                  <CardDescription>
                    Monitor and manage the intelligent flagging system with automated violation detection and response capabilities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Total Flags</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {flaggingStats?.totalFlags || 0}
                      </div>
                      <p className="text-sm text-blue-700">All-time reports</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-900">Recent Activity</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {flaggingStats?.recentFlags || 0}
                      </div>
                      <p className="text-sm text-green-700">Last 30 days</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold text-purple-900">Auto Actions</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {flaggingStats?.automatedActions || 0}
                      </div>
                      <p className="text-sm text-purple-700">System responses</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold text-orange-900">Active Rules</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {autoFlagRules.length}
                      </div>
                      <p className="text-sm text-orange-700">Monitoring violations</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(
                      autoFlagRules.reduce((acc: any, rule: any) => {
                        if (!acc[rule.category]) acc[rule.category] = [];
                        acc[rule.category].push(rule);
                        return acc;
                      }, {})
                    ).map(([category, rules]: [string, any]) => {
                      const getCategoryIcon = (cat: string) => {
                        switch (cat) {
                          case 'content': return <FileText className="w-5 h-5" />;
                          case 'misleading': return <AlertTriangle className="w-5 h-5" />;
                          case 'suspicious': return <Shield className="w-5 h-5" />;
                          case 'behavior': return <Users className="w-5 h-5" />;
                          case 'platform': return <Settings className="w-5 h-5" />;
                          default: return <Shield className="w-5 h-5" />;
                        }
                      };

                      const getCategoryTitle = (cat: string) => {
                        switch (cat) {
                          case 'content': return 'Content Quality Issues';
                          case 'misleading': return 'Misleading Information';
                          case 'suspicious': return 'Suspicious Activity';
                          case 'behavior': return 'Seller Behavior';
                          case 'platform': return 'Platform Policy Violations';
                          default: return 'Other Issues';
                        }
                      };

                      const getSeverityColor = (severity: string) => {
                        switch (severity) {
                          case 'critical': return 'text-red-600 bg-red-50';
                          case 'high': return 'text-orange-600 bg-orange-50';
                          case 'medium': return 'text-yellow-600 bg-yellow-50';
                          case 'low': return 'text-green-600 bg-green-50';
                          default: return 'text-gray-600 bg-gray-50';
                        }
                      };

                      return (
                        <Card key={category}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-900">
                              {getCategoryIcon(category)}
                              {getCategoryTitle(category)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-4">
                              {rules.map((rule: any) => (
                                <div key={rule.flagType} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                      <span className="font-medium text-gray-900">{rule.displayName}</span>
                                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityColor(rule.severity)}`}>
                                        {rule.severity}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      <strong>Trigger:</strong> {rule.triggerCount} report{rule.triggerCount !== 1 ? 's' : ''} → {rule.actionDescription}
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ID: {rule.flagType}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vehicle References Tab */}
          <TabsContent value="vehicles">
            <VehicleReferencesTab 
              vehicleReferences={vehicleReferences}
              isLoading={vehiclesLoading}
              onAdd={addVehicleMutation.mutate}
              formatCurrency={formatCurrency}
            />
          </TabsContent>

          {/* CSV Upload Tab */}
          <TabsContent value="csv-upload">
            <CsvUploadTab 
              onUpload={uploadCsvMutation.mutate}
              isUploading={uploadCsvMutation.isPending}
              uploadResults={uploadResults}
              onClearResults={() => setUploadResults(null)}
            />
          </TabsContent>

          {/* Tax Rates Tab */}
          <TabsContent value="tax-rates">
            <TaxRatesTab 
              taxRates={taxRates}
              isLoading={taxRatesLoading}
              onUpdate={updateTaxRateMutation.mutate}
            />
          </TabsContent>

          {/* Processing Fees Tab */}
          <TabsContent value="processing-fees">
            <ProcessingFeesTab 
              processingFees={processingFees}
              isLoading={processingFeesLoading}
              onAdd={addProcessingFeeMutation.mutate}
              onUpdate={updateProcessingFeeMutation.mutate}
            />
          </TabsContent>

          {/* Category Rules Tab */}
          <TabsContent value="categories">
            <CategoryRulesTab 
              categoryRules={categoryRules}
              isLoading={categoryRulesLoading}
              onAdd={addCategoryRuleMutation.mutate}
            />
          </TabsContent>

          {/* Financial Services Management Tab */}
          <TabsContent value="financial">
            <FinancialServicesTab 
              banks={banks}
              banksLoading={banksLoading}
              loanProducts={loanProducts}
              loanProductsLoading={loanProductsLoading}
              loanApplications={loanApplications}
              loanApplicationsLoading={loanApplicationsLoading}
              tradeInEvaluations={tradeInEvaluations}
              tradeInEvaluationsLoading={tradeInEvaluationsLoading}
            />
          </TabsContent>

          {/* Monetization Strategy Management Tab */}
          <TabsContent value="monetization">
            <MonetizationStrategyTab />
          </TabsContent>

          {/* Depreciation Rates Tab */}
          <TabsContent value="depreciation">
            <DepreciationRatesTab 
              depreciationRates={depreciationRates}
              isLoading={depreciationRatesLoading}
              onUpdate={updateDepreciationRateMutation.mutate}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Vehicle References Tab Component
function VehicleReferencesTab({ 
  vehicleReferences, 
  isLoading, 
  onAdd, 
  formatCurrency 
}: {
  vehicleReferences: VehicleReference[];
  isLoading: boolean;
  onAdd: (data: VehicleReferenceForm) => void;
  formatCurrency: (amount: string | number) => string;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehicleReference | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Edit vehicle mutation
  const editVehicleMutation = useMutation({
    mutationFn: async (data: { id: number; vehicle: Partial<VehicleReferenceForm> }) => {
      const response = await apiRequest("PUT", `/api/admin/vehicle-references/${data.id}`, data.vehicle);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vehicle-references"] });
      toast({ title: "Success", description: "Vehicle updated successfully" });
      setIsEditDialogOpen(false);
      setEditingVehicle(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete vehicle mutation
  const deleteVehicleMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/vehicle-references/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vehicle-references"] });
      toast({ title: "Success", description: "Vehicle deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const form = useForm<VehicleReferenceForm>({
    resolver: zodResolver(vehicleReferenceSchema),
    defaultValues: {
      make: "",
      model: "",
      engineCapacity: undefined,
      bodyType: "",
      fuelType: "",
      driveConfiguration: "",
      crspKes: "",
    },
  });

  const onSubmit = (data: VehicleReferenceForm) => {
    onAdd(data);
    form.reset();
    setIsAddDialogOpen(false);
  };

  const filteredVehicles = vehicleReferences.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle References ({vehicleReferences.length})
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Vehicle Reference</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., TOYOTA" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., CAMRY" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="engineCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Engine Capacity (cc)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            placeholder="e.g., 2000" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bodyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Sedan, SUV, Hatchback" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driveConfiguration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drive Configuration</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select drive type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FWD">Front Wheel Drive (FWD)</SelectItem>
                              <SelectItem value="RWD">Rear Wheel Drive (RWD)</SelectItem>
                              <SelectItem value="AWD">All Wheel Drive (AWD)</SelectItem>
                              <SelectItem value="4WD">Four Wheel Drive (4WD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seating Capacity</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 5, 7, 2+2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="petrol">Petrol</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gvw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gross Vehicle Weight (GVW)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 3500kg, 5000kg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="crspKes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CRSP Value (KES)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="e.g., 2500000" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discontinuationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discontinuation Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            placeholder="e.g., 2020 (leave empty if current)" 
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty for current models. Vehicles discontinued over 8 years ago cannot be imported.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Vehicle</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Edit Vehicle Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Vehicle</DialogTitle>
              </DialogHeader>
              {editingVehicle && <EditVehicleForm 
                vehicle={editingVehicle} 
                onSave={(data) => editVehicleMutation.mutate({ id: editingVehicle.id, vehicle: data })}
                onCancel={() => setIsEditDialogOpen(false)}
              />}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="rounded-md border max-h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Engine (cc)</TableHead>
                  <TableHead>Body Type</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Drive</TableHead>
                  <TableHead>Seating</TableHead>
                  <TableHead>GVW</TableHead>
                  <TableHead>CRSP Value</TableHead>
                  <TableHead>CRSP 2020</TableHead>
                  <TableHead>Disc. Year</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.slice(0, 100).map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.make}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>
                        {vehicle.engineCapacity ? `${vehicle.engineCapacity}cc` : "N/A"}
                      </TableCell>
                      <TableCell>{vehicle.bodyType || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {vehicle.fuelType || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell>{vehicle.driveConfiguration || "N/A"}</TableCell>
                      <TableCell>{vehicle.seating || "N/A"}</TableCell>
                      <TableCell>{vehicle.gvw || "N/A"}</TableCell>
                      <TableCell>
                        {vehicle.crspKes ? formatCurrency(vehicle.crspKes) : "N/A"}
                      </TableCell>
                      <TableCell>
                        {vehicle.crsp2020 ? (
                          <div className="flex items-center gap-1">
                            <span>{formatCurrency(vehicle.crsp2020)}</span>
                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                              2020
                            </Badge>
                          </div>
                        ) : "N/A"}
                      </TableCell>
                      <TableCell>
                        {vehicle.discontinuationYear ? (
                          <div className="flex items-center space-x-1">
                            <span>{vehicle.discontinuationYear}</span>
                            {(() => {
                              const yearsSince = new Date().getFullYear() - vehicle.discontinuationYear;
                              const isRestricted = yearsSince > 8;
                              return isRestricted ? (
                                <Badge variant="destructive" className="text-xs">
                                  Cannot Import
                                </Badge>
                              ) : yearsSince > 5 ? (
                                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                                  Limited
                                </Badge>
                              ) : null;
                            })()}
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-xs">Current</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setEditingVehicle(vehicle);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this vehicle?")) {
                                deleteVehicleMutation.mutate(vehicle.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {filteredVehicles.length > 100 && (
            <p className="text-sm text-gray-500">Showing first 100 results. Use search to narrow down.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Edit Vehicle Form Component
function EditVehicleForm({ 
  vehicle, 
  onSave, 
  onCancel 
}: {
  vehicle: VehicleReference;
  onSave: (data: VehicleReferenceForm) => void;
  onCancel: () => void;
}) {
  const form = useForm<VehicleReferenceForm>({
    resolver: zodResolver(vehicleReferenceSchema),
    defaultValues: {
      make: vehicle.make || "",
      model: vehicle.model || "",
      engineCapacity: vehicle.engineCapacity || undefined,
      bodyType: vehicle.bodyType || "",
      driveConfiguration: vehicle.driveConfiguration || "",
      seating: vehicle.seating || "",
      fuelType: vehicle.fuelType || "",
      gvw: vehicle.gvw || "",
      crspKes: vehicle.crspKes ? parseFloat(vehicle.crspKes.toString()) : undefined,
      crsp2020: vehicle.crsp2020 ? parseFloat(vehicle.crsp2020.toString()) : undefined,
      discontinuationYear: vehicle.discontinuationYear || undefined,
    },
  });

  const onSubmit = (data: VehicleReferenceForm) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., TOYOTA" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., CAMRY" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="engineCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine Capacity (cc)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="e.g., 2000" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bodyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Sedan, SUV, Hatchback" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driveConfiguration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drive Configuration</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drive type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2WD">2WD</SelectItem>
                      <SelectItem value="4WD">4WD</SelectItem>
                      <SelectItem value="AWD">AWD</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seating Capacity</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 5, 7, 9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gvw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gross Vehicle Weight (GVW)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 3500kg, 5000kg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="crspKes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRSP Value (KES)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="e.g., 2500000" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="crsp2020"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRSP 2020 Value (KES)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="e.g., 2200000" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discontinuationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discontinuation Year</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="e.g., 2020 (leave empty if current)" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}

// Tax Rates Tab Component  
function TaxRatesTab({ 
  taxRates, 
  isLoading, 
  onUpdate 
}: {
  taxRates: TaxRate[];
  isLoading: boolean;
  onUpdate: (params: { id: number; data: Partial<TaxRateForm> }) => void;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Add tax rate mutation
  const addTaxRateMutation = useMutation({
    mutationFn: async (data: TaxRateForm) => {
      const response = await apiRequest("POST", "/api/admin/tax-rates", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tax-rates"] });
      toast({ title: "Success", description: "Tax rate added successfully" });
      setIsAddDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax Rates by Category
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Tax Rate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tax Rate</DialogTitle>
              </DialogHeader>
              <AddTaxRateForm onSubmit={addTaxRateMutation.mutate} onCancel={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle Category</TableHead>
                <TableHead>Import Duty Rate</TableHead>
                <TableHead>Excise Duty Rate</TableHead>
                <TableHead>VAT Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : (
                taxRates.map((rate) => (
                  <TaxRateRow key={rate.id} rate={rate} onUpdate={onUpdate} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function TaxRateRow({ 
  rate, 
  onUpdate 
}: { 
  rate: TaxRate; 
  onUpdate: (params: { id: number; data: Partial<TaxRateForm> }) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    importDutyRate: rate.importDutyRate,
    exciseDutyRate: rate.exciseDutyRate,
    vatRate: rate.vatRate,
  });

  const handleSave = () => {
    onUpdate({ id: rate.id, data: editData });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell className="font-medium">{rate.vehicleCategory}</TableCell>
        <TableCell>
          <Input
            value={editData.importDutyRate}
            onChange={(e) => setEditData({ ...editData, importDutyRate: e.target.value })}
            className="w-20"
            placeholder="0.35"
          />
        </TableCell>
        <TableCell>
          <Input
            value={editData.exciseDutyRate}
            onChange={(e) => setEditData({ ...editData, exciseDutyRate: e.target.value })}
            className="w-20"
            placeholder="0.20"
          />
        </TableCell>
        <TableCell>
          <Input
            value={editData.vatRate}
            onChange={(e) => setEditData({ ...editData, vatRate: e.target.value })}
            className="w-20"
            placeholder="0.16"
          />
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{rate.vehicleCategory}</TableCell>
      <TableCell>{(parseFloat(rate.importDutyRate) * 100).toFixed(1)}%</TableCell>
      <TableCell>{(parseFloat(rate.exciseDutyRate) * 100).toFixed(1)}%</TableCell>
      <TableCell>{(parseFloat(rate.vatRate) * 100).toFixed(1)}%</TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Add Tax Rate Form Component
function AddTaxRateForm({ 
  onSubmit, 
  onCancel 
}: {
  onSubmit: (data: TaxRateForm) => void;
  onCancel: () => void;
}) {
  const form = useForm<TaxRateForm>({
    resolver: zodResolver(taxRateSchema),
    defaultValues: {
      vehicleCategory: "",
      importDutyRate: "0.35",
      exciseDutyRate: "0.20",
      vatRate: "0.16",
    },
  });

  const handleSubmit = (data: TaxRateForm) => {
    onSubmit(data);
  };

  const vehicleCategories = [
    { value: "under1500cc", label: "Under 1500cc" },
    { value: "over1500cc", label: "Over 1500cc" },
    { value: "largeEngine", label: "Large Engine" },
    { value: "electric", label: "Electric" },
    { value: "schoolBus", label: "School Bus" },
    { value: "primeMover", label: "Prime Mover" },
    { value: "trailer", label: "Trailer" },
    { value: "ambulance", label: "Ambulance" },
    { value: "motorcycle", label: "Motorcycle" },
    { value: "specialPurpose", label: "Special Purpose" },
    { value: "heavyMachinery", label: "Heavy Machinery" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="vehicleCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle category" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="importDutyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Import Duty Rate</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0.35" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exciseDutyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excise Duty Rate</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0.20" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vatRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VAT Rate</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0.16" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Tax Rate</Button>
        </div>
      </form>
    </Form>
  );
}

// Processing Fees Tab Component  
function ProcessingFeesTab({ 
  processingFees, 
  isLoading, 
  onAdd,
  onUpdate 
}: {
  processingFees: ProcessingFee[];
  isLoading: boolean;
  onAdd: (data: ProcessingFeeForm) => void;
  onUpdate: (params: { id: number; data: Partial<ProcessingFeeForm> }) => void;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Processing Fees (RDL & IDF)
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Processing Fee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Processing Fee</DialogTitle>
              </DialogHeader>
              <AddProcessingFeeForm 
                onSubmit={(data) => {
                  onAdd(data);
                  setIsAddDialogOpen(false);
                }} 
                onCancel={() => setIsAddDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Fee Name</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Applicable To</TableHead>
                <TableHead>Calculation Base</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : (
                processingFees.map((fee) => (
                  <ProcessingFeeRow key={fee.id} fee={fee} onUpdate={onUpdate} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ProcessingFeeRow({ 
  fee, 
  onUpdate 
}: { 
  fee: ProcessingFee; 
  onUpdate: (params: { id: number; data: Partial<ProcessingFeeForm> }) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    feeName: fee.feeName,
    rate: fee.rate,
    applicableToImportType: fee.applicableToImportType as "direct" | "previouslyRegistered" | "both",
    calculationBase: fee.calculationBase,
    description: fee.description || "",
    isActive: fee.isActive,
  });

  const handleSave = () => {
    onUpdate({ id: fee.id, data: editData });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell className="font-medium">{fee.feeType.toUpperCase()}</TableCell>
        <TableCell>
          <Input
            value={editData.feeName}
            onChange={(e) => setEditData({ ...editData, feeName: e.target.value })}
            className="w-32"
          />
        </TableCell>
        <TableCell>
          <Input
            value={editData.rate}
            onChange={(e) => setEditData({ ...editData, rate: e.target.value })}
            className="w-20"
            placeholder="0.015"
          />
        </TableCell>
        <TableCell>
          <Select 
            value={editData.applicableToImportType} 
            onValueChange={(value: "direct" | "previouslyRegistered" | "both") => 
              setEditData({ ...editData, applicableToImportType: value })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct">Direct Import</SelectItem>
              <SelectItem value="previouslyRegistered">Previously Registered</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Input
            value={editData.calculationBase}
            onChange={(e) => setEditData({ ...editData, calculationBase: e.target.value })}
            className="w-32"
          />
        </TableCell>
        <TableCell>
          <Button
            variant={editData.isActive ? "default" : "secondary"}
            size="sm"
            onClick={() => setEditData({ ...editData, isActive: !editData.isActive })}
          >
            {editData.isActive ? "Active" : "Inactive"}
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{fee.feeType.toUpperCase()}</TableCell>
      <TableCell>{fee.feeName}</TableCell>
      <TableCell>{(parseFloat(fee.rate) * 100).toFixed(2)}%</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {fee.applicableToImportType.replace(/([A-Z])/g, ' $1').trim()}
        </Badge>
      </TableCell>
      <TableCell className="capitalize">{fee.calculationBase}</TableCell>
      <TableCell>
        <Badge variant={fee.isActive ? "default" : "secondary"}>
          {fee.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Add Processing Fee Form Component
function AddProcessingFeeForm({ 
  onSubmit, 
  onCancel 
}: {
  onSubmit: (data: ProcessingFeeForm) => void;
  onCancel: () => void;
}) {
  const form = useForm<ProcessingFeeForm>({
    resolver: zodResolver(processingFeeSchema),
    defaultValues: {
      feeType: "rdl",
      feeName: "",
      rate: "0.015",
      applicableToImportType: "direct",
      calculationBase: "customsValue",
      description: "",
      isActive: true,
    },
  });

  const handleSubmit = (data: ProcessingFeeForm) => {
    onSubmit(data);
  };

  const feeTypes = [
    { value: "rdl", label: "Railway Development Levy (RDL)" },
    { value: "idf", label: "Import Declaration Fee (IDF)" },
    { value: "other", label: "Other Processing Fee" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="feeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee type" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Railway Development Levy" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate (decimal)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0.015 (for 1.5%)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicableToImportType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicable To</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct Import Only</SelectItem>
                      <SelectItem value="previouslyRegistered">Previously Registered Only</SelectItem>
                      <SelectItem value="both">Both Import Types</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="calculationBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calculation Base</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., customsValue, vatValue" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Optional description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Processing Fee</Button>
        </div>
      </form>
    </Form>
  );
}

// Category Rules Tab Component
function CategoryRulesTab({ 
  categoryRules, 
  isLoading, 
  onAdd 
}: {
  categoryRules: VehicleCategoryRule[];
  isLoading: boolean;
  onAdd: (data: CategoryRuleForm) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Category Rules ({categoryRules.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Min Engine (cc)</TableHead>
                <TableHead>Max Engine (cc)</TableHead>
                <TableHead>Fuel Type</TableHead>
                <TableHead>Body Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : (
                categoryRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.vehicleCategory}</TableCell>
                    <TableCell>{rule.minEngineSize || "N/A"}</TableCell>
                    <TableCell>{rule.maxEngineSize || "N/A"}</TableCell>
                    <TableCell>{rule.fuelType || "Any"}</TableCell>
                    <TableCell>{rule.bodyType || "Any"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// Depreciation Rates Tab Component
function DepreciationRatesTab({ 
  depreciationRates, 
  isLoading, 
  onUpdate 
}: {
  depreciationRates: DepreciationRate[];
  isLoading: boolean;
  onUpdate: (params: { id: number; data: Partial<DepreciationRateForm> }) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Depreciation Rates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Age Range (Months)</TableHead>
                <TableHead>Depreciation (%)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : (
                depreciationRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium capitalize">{rate.vehicleType}</TableCell>
                    <TableCell>{rate.minAgeMonths} - {rate.maxAgeMonths} months</TableCell>
                    <TableCell>{rate.depreciationPercentage}%</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// CSV Upload Tab Component
function CsvUploadTab({ 
  onUpload, 
  isUploading, 
  uploadResults, 
  onClearResults 
}: {
  onUpload: (formData: FormData) => void;
  isUploading: boolean;
  uploadResults: {
    total: number;
    added: number;
    updated: number;
    failed: number;
    errors: string[];
  } | null;
  onClearResults: () => void;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        uploadFile(file);
      } else {
        alert("Please upload a CSV file only.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('csv', file);
    onUpload(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Vehicle References CSV
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">CSV Format Requirements:</h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p><strong>Column Order:</strong> Make, Model, Engine Capacity, Body Type, Drive Config, [Empty], Fuel Type, [Empty], CRSP Value</p>
            <p><strong>Example:</strong> TOYOTA,CAMRY,2000,SALOON,FWD,,Petrol,,"2,500,000"</p>
            <p><strong>Note:</strong> CRSP values can include commas and quotes. System will clean them automatically.</p>
          </div>
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-medium">Drop your CSV file here</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
            </div>
            <input
              ref={setFileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
            <Button 
              onClick={() => fileInputRef?.click()}
              disabled={isUploading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isUploading ? "Uploading..." : "Select CSV File"}
            </Button>
          </div>
        </div>

        {/* Upload Results */}
        {uploadResults && (
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Upload Results</h3>
              <Button variant="outline" size="sm" onClick={onClearResults}>
                Clear Results
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{uploadResults.total}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Total Processed</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{uploadResults.added}</div>
                <div className="text-sm text-green-700 dark:text-green-300">Added New</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{uploadResults.updated}</div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">Updated</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{uploadResults.failed}</div>
                <div className="text-sm text-red-700 dark:text-red-300">Failed</div>
              </div>
            </div>

            {uploadResults.errors && uploadResults.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Errors:</h4>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {uploadResults.errors.map((error, index) => (
                    <div key={index} className="text-xs text-red-700 dark:text-red-300 mb-1">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Overview Tab Component
function OverviewTab() {
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.newUsersThisMonth || 0} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Car className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalListings || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.newListingsThisMonth || 0} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingApprovals || 0}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle References</CardTitle>
            <Database className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVehicleReferences || 0}</div>
            <p className="text-xs text-muted-foreground">
              In database
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



// Helper function for auth headers
function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

// Enhanced Listings Management Tab Component
function EnhancedListingsManagementTab() {
  // Enhanced filtering and sorting state
  const [filters, setFilters] = useState({
    status: 'all',
    sellerType: 'all', 
    make: 'all',
    model: 'all',
    minPrice: '',
    maxPrice: '',
    location: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  
  const [sorting, setSorting] = useState({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50
  });

  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");

  // Build query parameters
  const queryParams = new URLSearchParams({
    ...filters,
    ...sorting,
    page: pagination.page.toString(),
    limit: pagination.limit.toString()
  });

  const { data: listingsResponse, isLoading } = useQuery({
    queryKey: ["/api/admin/listings-with-stats", queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/admin/listings-with-stats?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
  });

  const listings = listingsResponse?.listings || [];
  const paginationInfo = listingsResponse?.pagination;
  const filterOptions = listingsResponse?.filters;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const approveListingMutation = useMutation({
    mutationFn: async ({ listingId, notes }: { listingId: number; notes?: string }) => {
      const response = await fetch(`/api/admin/listing/${listingId}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings-with-stats"] });
      toast({ title: "Success", description: "Listing approved successfully" });
    },
  });

  const rejectListingMutation = useMutation({
    mutationFn: async ({ listingId, reason }: { listingId: number; reason: string }) => {
      const response = await fetch(`/api/admin/listing/${listingId}/reject`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings-with-stats"] });
      toast({ title: "Success", description: "Listing rejected" });
    },
  });

  const bulkActionMutation = useMutation({
    mutationFn: async ({ listingIds, action }: { listingIds: number[]; action: string }) => {
      const response = await fetch(`/api/admin/bulk-update-listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingIds, status: action }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/listings-with-stats"] });
      setSelectedListings([]);
      setBulkAction("");
      toast({ title: "Success", description: "Bulk action completed successfully" });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "suspended": return "bg-red-500";
      case "draft": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "pending": return "Pending Review";
      case "suspended": return "Suspended";
      case "draft": return "Draft";
      default: return status;
    }
  };

  const handleSelectListing = (listingId: number) => {
    setSelectedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  // Filter handlers
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleSortChange = (sortBy: string) => {
    setSorting(prev => ({
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      sellerType: 'all', 
      make: 'all',
      model: 'all',
      minPrice: '',
      maxPrice: '',
      location: 'all',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
    setPagination({ page: 1, limit: 50 });
  };

  const handleSelectAll = () => {
    if (selectedListings.length === listings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(listings.map((listing: any) => listing.id));
    }
  };

  const handleBulkAction = () => {
    if (bulkAction && selectedListings.length > 0) {
      bulkActionMutation.mutate({ listingIds: selectedListings, action: bulkAction });
    }
  };

  return (
    <div className="flex gap-6">
      {/* Filters Sidebar */}
      <div className="w-80 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search listings, sellers..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {filterOptions?.statusOptions?.map((status: string) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Seller Type Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Seller Type</label>
              <Select value={filters.sellerType} onValueChange={(value) => handleFilterChange('sellerType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions?.sellerTypes?.map((type: string) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Make Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Make</label>
              <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {filterOptions?.makes?.map((make: string) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {filterOptions?.locations?.map((location: string) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range (KES)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="space-y-2">
                <Input
                  placeholder="From"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
                <Input
                  placeholder="To"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Listings Management
                </CardTitle>
                <CardDescription>
                  {paginationInfo && `Showing ${((paginationInfo.page - 1) * paginationInfo.limit) + 1}-${Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of ${paginationInfo.total} listings`}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSorting(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}>
                  {sorting.sortOrder === 'asc' ? '↑' : '↓'} Sort
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Bulk Actions */}
              {selectedListings.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{selectedListings.length} listing(s) selected</span>
                    <Select value={bulkAction} onValueChange={setBulkAction}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Set Active</SelectItem>
                        <SelectItem value="inactive">Set Inactive</SelectItem>
                        <SelectItem value="pending">Set Pending</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                        <SelectItem value="archived">Archive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleBulkAction}
                      disabled={!bulkAction || bulkActionMutation.isPending}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Apply
                    </Button>
                    <Button 
                      onClick={() => setSelectedListings([])}
                      variant="outline"
                    >
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}

              {/* Sorting Controls */}
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSortChange('createdAt')}
                  className={sorting.sortBy === 'createdAt' ? 'bg-purple-100' : ''}
                >
                  Date {sorting.sortBy === 'createdAt' && (sorting.sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSortChange('price')}
                  className={sorting.sortBy === 'price' ? 'bg-purple-100' : ''}
                >
                  Price {sorting.sortBy === 'price' && (sorting.sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSortChange('viewCount')}
                  className={sorting.sortBy === 'viewCount' ? 'bg-purple-100' : ''}
                >
                  Views {sorting.sortBy === 'viewCount' && (sorting.sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
              </div>

              {/* Listings */}
              {isLoading ? (
                <div className="text-center py-8">Loading listings...</div>
              ) : listings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No listings found</div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Checkbox
                      checked={selectedListings.length === listings.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm text-gray-600">Select All</span>
                  </div>
                  
                  {listings.map((listing: any) => (
                    <div key={listing.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={selectedListings.includes(listing.id)}
                          onCheckedChange={() => handleSelectListing(listing.id)}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{listing.title}</h3>
                            <Badge className={`${getStatusColor(listing.status)} text-white`}>
                              {getStatusText(listing.status)}
                            </Badge>
                            {listing.isFlagged && (
                              <Badge variant="destructive">Flagged</Badge>
                            )}
                            {listing.isVerified && (
                              <Badge variant="default" className="bg-green-600">Verified</Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Price:</span> KES {Number(listing.price).toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Make:</span> {listing.make}
                            </div>
                            <div>
                              <span className="font-medium">Model:</span> {listing.model}
                            </div>
                            <div>
                              <span className="font-medium">Year:</span> {listing.year}
                            </div>
                            <div>
                              <span className="font-medium">Views:</span> {listing.viewCount || 0}
                            </div>
                            <div>
                              <span className="font-medium">Favorites:</span> {listing.favoriteCount || 0}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span> {listing.location}
                            </div>
                            <div>
                              <span className="font-medium">Listed:</span> {new Date(listing.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Seller:</span> {listing.sellerFirstName} {listing.sellerLastName} ({listing.sellerEmail})
                            {listing.sellerRoleId > 1 && (
                              <Badge variant="outline" className="ml-2">Premium</Badge>
                            )}
                          </div>
                          {listing.flagReason && (
                            <div className="mt-2 text-sm text-red-600">
                              <span className="font-medium">Flag Reason:</span> {listing.flagReason}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/admin/listing-details/${listing.id}`, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {listing.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => approveListingMutation.mutate({ listingId: listing.id })}
                                disabled={approveListingMutation.isPending}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejectListingMutation.mutate({ listingId: listing.id, reason: "Rejected by admin" })}
                                disabled={rejectListingMutation.isPending}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {paginationInfo && paginationInfo.pages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {paginationInfo.page} of {paginationInfo.pages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={paginationInfo.page <= 1}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={paginationInfo.page >= paginationInfo.pages}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Enhanced Users Management Tab Component
function UsersManagementTab() {
  // State for filtering and searching
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    joinedFrom: "",
    joinedTo: "",
    status: "",
  });
  
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [sortConfig, setSortConfig] = useState({ field: "createdAt", direction: "desc" });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserDetails, setShowUserDetails] = useState<string | null>(null);

  // Build query parameters
  const queryParams = new URLSearchParams({
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
    sort: sortConfig.field,
    order: sortConfig.direction,
    ...(filters.search && { search: filters.search }),
    ...(filters.role && filters.role !== "all" && { role: filters.role }),
    ...(filters.joinedFrom && { joinedFrom: filters.joinedFrom }),
    ...(filters.joinedTo && { joinedTo: filters.joinedTo }),
    ...(filters.status && filters.status !== "all" && { status: filters.status }),
  });

  const { data: usersData, isLoading } = useQuery<{
    users: (AppUser & { role?: UserRole; listingsCount?: number; recentActivity?: string })[];
    totalCount: number;
    pageCount: number;
  }>({
    queryKey: ["/api/admin/users-management", queryParams.toString()],
  });

  const { data: roles = [] } = useQuery<UserRole[]>({
    queryKey: ["/api/admin/roles"],
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Mutations
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: number }) => {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users-management"] });
      toast({ title: "Success", description: "User role updated successfully" });
    },
  });

  const suspendUserMutation = useMutation({
    mutationFn: async ({ userId, reason, duration }: { userId: string; reason: string; duration?: string }) => {
      const response = await fetch(`/api/admin/user/${userId}/suspend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, duration }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users-management"] });
      toast({ title: "Success", description: "User suspended successfully" });
    },
  });

  const bulkActionMutation = useMutation({
    mutationFn: async ({ userIds, action, data }: { userIds: string[]; action: string; data?: any }) => {
      const response = await fetch(`/api/admin/users/bulk-action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds, action, data }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users-management"] });
      setSelectedUsers([]);
      toast({ title: "Success", description: "Bulk action completed successfully" });
    },
  });

  // Helper functions
  const getRoleColor = (roleName: string) => {
    switch (roleName?.toLowerCase()) {
      case "superadmin": return "bg-red-500";
      case "admin": return "bg-purple-500";
      case "editor": return "bg-blue-500";
      case "user": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(usersData?.users.map(user => user.id) || []);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const paginationInfo = usersData ? {
    page: pagination.page,
    pages: usersData.pageCount,
    total: usersData.totalCount,
    showing: usersData.users.length
  } : null;

  return (
    <div className="flex gap-6">
      {/* Filter Sidebar */}
      <div className="w-80 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search Users</label>
              <Input
                placeholder="Search by name, email, phone..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Role</label>
              <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  {roles.filter(role => role.name && role.name.trim() !== "").map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Joined Date Range</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  placeholder="From date"
                  value={filters.joinedFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, joinedFrom: e.target.value }))}
                />
                <Input
                  type="date"
                  placeholder="To date"
                  value={filters.joinedTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, joinedTo: e.target.value }))}
                />
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => setFilters({ search: "", role: "", joinedFrom: "", joinedTo: "", status: "" })}
              className="w-full"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bulk Actions ({selectedUsers.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                onClick={() => bulkActionMutation.mutate({ userIds: selectedUsers, action: "suspend" })}
                className="w-full"
              >
                Suspend Selected
              </Button>
              <Button
                variant="outline"
                onClick={() => bulkActionMutation.mutate({ userIds: selectedUsers, action: "activate" })}
                className="w-full"
              >
                Activate Selected
              </Button>
              <Select onValueChange={(roleId) => bulkActionMutation.mutate({ userIds: selectedUsers, action: "changeRole", data: { roleId: parseInt(roleId) } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Change role..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.filter(role => role.name && role.name.trim() !== "").map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      Change to {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management 
                {paginationInfo && (
                  <span className="text-sm font-normal text-gray-600">
                    ({paginationInfo.total} total, showing {paginationInfo.showing})
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select 
                  value={`${sortConfig.field}-${sortConfig.direction}`}
                  onValueChange={(value) => {
                    const [field, direction] = value.split('-');
                    setSortConfig({ field, direction: direction as 'asc' | 'desc' });
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt-desc">Newest First</SelectItem>
                    <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                    <SelectItem value="firstName-asc">Name A-Z</SelectItem>
                    <SelectItem value="firstName-desc">Name Z-A</SelectItem>
                    <SelectItem value="email-asc">Email A-Z</SelectItem>
                    <SelectItem value="listingsCount-desc">Most Listings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : !usersData?.users || usersData.users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No users found</div>
            ) : (
              <div className="space-y-4">
                {/* Users Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedUsers.length === usersData.users.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('firstName')}
                        >
                          Name {sortConfig.field === 'firstName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('email')}
                        >
                          Email {sortConfig.field === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Listings</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('createdAt')}
                        >
                          Joined {sortConfig.field === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                              </div>
                              <div>
                                <div>{user.firstName} {user.lastName}</div>
                                {user.recentActivity && (
                                  <div className="text-xs text-gray-500">{user.recentActivity}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phoneNumber || "-"}</TableCell>
                          <TableCell>
                            <Badge className={`${getRoleColor(user.role?.name)} text-white`}>
                              {user.role?.name || "No Role"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status || "active")}>
                              {user.status || "active"}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.listingsCount || 0}</TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowUserDetails(user.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Select
                                value={user.role?.id?.toString() || ""}
                                onValueChange={(value) => 
                                  updateUserRoleMutation.mutate({ 
                                    userId: user.id, 
                                    roleId: parseInt(value) 
                                  })
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.filter(role => role.name && role.name.trim() !== "").map((role) => (
                                    <SelectItem key={role.id} value={role.id.toString()}>
                                      {role.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {paginationInfo && paginationInfo.pages > 1 && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Page {paginationInfo.page} of {paginationInfo.pages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={paginationInfo.page <= 1}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={paginationInfo.page >= paginationInfo.pages}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Details Modal */}
      {showUserDetails && (
        <UserDetailsModal 
          userId={showUserDetails}
          onClose={() => setShowUserDetails(null)}
        />
      )}
    </div>
  );
}

// User Profile Dashboard Modal (Admin View of User's Profile)
function UserDetailsModal({ userId, onClose }: { userId: string; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Get user's actual profile data (what they see when logged in)
  const { data: userDetails, isLoading: loadingHistory } = useQuery<{
    listings: any[];
    warnings: any[];
    activities: any[];
  }>({
    queryKey: [`/api/admin/user/${userId}/history`],
  });

  // Get user info from users list
  const { data: usersData } = useQuery({
    queryKey: ["/api/admin/users-management"],
  });

  // Get user's favorites and wishlists (their actual profile data)
  const { data: userFavorites } = useQuery({
    queryKey: [`/api/user/${userId}/favorites`],
    enabled: !!userId,
  });

  const { data: userSavedSearches } = useQuery({
    queryKey: [`/api/user/${userId}/saved-searches`],
    enabled: !!userId,
  });

  const currentUser = usersData?.users?.find((u: any) => u.id === userId);

  const { data: rolesData } = useQuery({
    queryKey: ["/api/admin/roles"],
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const suspendUserMutation = useMutation({
    mutationFn: async ({ reason, duration }: { reason: string; duration?: string }) => {
      const response = await fetch(`/api/admin/user/${userId}/suspend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, duration }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users-management"] });
      queryClient.invalidateQueries({ queryKey: [`/api/admin/user/${userId}/history`] });
      toast({ title: "Success", description: "User suspended successfully" });
      setShowSuspendDialog(false);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async (roleId: number) => {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users-management"] });
      toast({ title: "Success", description: "User role updated successfully" });
      setShowRoleDialog(false);
    },
  });

  if (loadingHistory) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh]">
          <DialogTitle>Loading User Profile</DialogTitle>
          <div className="text-center py-8">Loading user profile...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!currentUser) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl">
          <DialogTitle>User Profile</DialogTitle>
          <div className="text-center py-8 text-red-500">Failed to load user profile</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
        {/* Admin Control Bar */}
        <div className="bg-red-50 border-b border-red-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Admin View: {currentUser.firstName} {currentUser.lastName}'s Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="border-red-200 text-red-700 hover:bg-red-100"
            >
              {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={onClose}
              className="border-red-200 text-red-700 hover:bg-red-100"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Admin Panel (Collapsible) */}
        {showAdminPanel && (
          <div className="bg-gray-50 border-b px-6 py-4">
            <div className="flex gap-3 flex-wrap">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowRoleDialog(true)}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Change Role
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowSuspendDialog(true)}
                className="flex items-center gap-2"
              >
                <Ban className="h-4 w-4" />
                Suspend User
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Send Message
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        )}

        {/* User's Actual Profile Header (what they see) */}
        <div className="px-6 py-6 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser.profilePicture} />
              <AvatarFallback className="bg-white text-purple-600 text-xl">
                {currentUser.firstName?.[0]}{currentUser.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{currentUser.firstName} {currentUser.lastName}</h1>
              <p className="text-purple-100">{currentUser.email}</p>
              <p className="text-purple-100">{currentUser.phoneNumber || "Phone not provided"}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Member since {new Date(currentUser.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {currentUser.location || "Location not set"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{userDetails?.listings?.length || 0}</div>
                  <div className="text-sm">Listings</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{userFavorites?.length || 0}</div>
                  <div className="text-sm">Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's Profile Navigation (what they see) */}
        <div className="border-b bg-white px-6">
          <div className="flex space-x-1">
            {[
              { id: "profile", label: "Profile Overview", icon: User },
              { id: "my-listings", label: "My Listings", icon: Car },
              { id: "favorites", label: "My Favorites", icon: Heart },
              { id: "saved-searches", label: "Saved Searches", icon: Search },
              { id: "account-settings", label: "Account Settings", icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* User's Profile Content (what they actually see when logged in) */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">My Listings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{userDetails?.listings?.length || 0}</div>
                    <div className="text-sm text-gray-600">
                      {userDetails?.listings?.filter((l: any) => l.status === 'active').length || 0} active, {' '}
                      {userDetails?.listings?.filter((l: any) => l.status === 'pending').length || 0} pending
                    </div>
                    <Button size="sm" className="mt-3 w-full">View All Listings</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Favorite Cars</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-2">{userFavorites?.length || 0}</div>
                    <div className="text-sm text-gray-600">Cars you've saved</div>
                    <Button size="sm" className="mt-3 w-full" variant="outline">View Favorites</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Saved Searches</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{userSavedSearches?.length || 0}</div>
                    <div className="text-sm text-gray-600">Search alerts</div>
                    <Button size="sm" className="mt-3 w-full" variant="outline">Manage Searches</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {userDetails?.activities && userDetails.activities.length > 0 ? (
                    <div className="space-y-4">
                      {userDetails.activities.slice(0, 5).map((activity: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Activity className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.activity_type}</div>
                            <div className="text-sm text-gray-600">{activity.description}</div>
                            <div className="text-xs text-gray-500">
                              {activity.created_at ? new Date(activity.created_at).toLocaleDateString() : 'Unknown date'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No recent activity</div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "my-listings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </Button>
              </div>
              
              {userDetails?.listings && userDetails.listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userDetails.listings.map((listing: any) => (
                    <Card key={listing.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <Car className="h-12 w-12 text-gray-400" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                          <Badge className={
                            listing.status === 'active' ? 'bg-green-500' :
                            listing.status === 'pending' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }>
                            {listing.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{listing.make} {listing.model} • {listing.year}</p>
                        <p className="text-xl font-bold text-green-600 mb-3">KES {listing.price?.toLocaleString()}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                          <Button size="sm" variant="outline" className="flex-1">View</Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Created: {new Date(listing.createdAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings yet</h3>
                    <p className="text-gray-500 mb-4">Start selling your car by creating your first listing</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Listing
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Favorite Cars</h2>
              
              <Card className="bg-white shadow-sm">
                <CardContent className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
                  <p className="text-gray-500 mb-4">Save cars you're interested in to view them here</p>
                  <Button variant="outline">Browse Cars</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "saved-searches" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Saved Searches</h2>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Create Search Alert
                </Button>
              </div>
              
              <Card className="bg-white shadow-sm">
                <CardContent className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved searches</h3>
                  <p className="text-gray-500 mb-4">Create search alerts to get notified when new cars match your criteria</p>
                  <Button variant="outline">Create Search Alert</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "account-settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="font-medium">{currentUser.firstName} {currentUser.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="font-medium">{currentUser.phoneNumber || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="font-medium">{currentUser.location || "Not set"}</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => setActiveTab("settings")}>
              Admin Actions
            </Button>
          </div>
        </div>

        {/* Suspend User Dialog */}
        {showSuspendDialog && (
          <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Suspend User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Are you sure you want to suspend {currentUser.firstName} {currentUser.lastName}?</p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const reason = prompt("Enter suspension reason:");
                      if (reason) {
                        suspendUserMutation.mutate({ reason });
                      }
                    }}
                  >
                    Confirm Suspension
                  </Button>
                  <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Change Role Dialog */}
        {showRoleDialog && (
          <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change User Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Select a new role for {currentUser.firstName} {currentUser.lastName}:</p>
                <div className="space-y-2">
                  {rolesData?.map((role: any) => (
                    <Button
                      key={role.id}
                      variant={currentUser.role?.id === role.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => updateRoleMutation.mutate(role.id)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {role.name} - {role.description}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" onClick={() => setShowRoleDialog(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Financial Services Tab Component
function FinancialServicesTab({ 
  banks, 
  banksLoading,
  loanProducts,
  loanProductsLoading,
  loanApplications,
  loanApplicationsLoading,
  tradeInEvaluations,
  tradeInEvaluationsLoading
}: {
  banks: any[];
  banksLoading: boolean;
  loanProducts: any[];
  loanProductsLoading: boolean;
  loanApplications: any[];
  loanApplicationsLoading: boolean;
  tradeInEvaluations: any[];
  tradeInEvaluationsLoading: boolean;
}) {
  const [selectedFinancialTab, setSelectedFinancialTab] = useState("banks");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Bank management mutations
  const createBankMutation = useMutation({
    mutationFn: async (bankData: any) => {
      const response = await fetch("/api/admin/financial/banks", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(bankData),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/banks"] });
      toast({ title: "Success", description: "Bank created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateBankMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/admin/financial/banks/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/banks"] });
      toast({ title: "Success", description: "Bank updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteBankMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/financial/banks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/banks"] });
      toast({ title: "Success", description: "Bank deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Loan product management mutations
  const createLoanProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const response = await fetch("/api/admin/financial/loan-products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/loan-products"] });
      toast({ title: "Success", description: "Loan product created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateLoanProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/admin/financial/loan-products/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/loan-products"] });
      toast({ title: "Success", description: "Loan product updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteLoanProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/financial/loan-products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/loan-products"] });
      toast({ title: "Success", description: "Loan product deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Loan application status update
  const updateLoanApplicationMutation = useMutation({
    mutationFn: async ({ id, status, remarks, preApprovalAmount, approvedInterestRate, approvedTenureMonths }: any) => {
      const response = await fetch(`/api/admin/financial/loan-applications/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status, remarks, preApprovalAmount, approvedInterestRate, approvedTenureMonths }),
      });
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/financial/loan-applications"] });
      toast({ title: "Success", description: "Loan application updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Financial Services Management
          </CardTitle>
          <CardDescription>
            Manage bank partners, loan products, applications, and trade-in evaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedFinancialTab} onValueChange={setSelectedFinancialTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="banks" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Bank Partners ({banks.length})
              </TabsTrigger>
              <TabsTrigger value="loan-products" className="flex items-center gap-2">
                <Banknote className="h-4 w-4" />
                Loan Products ({loanProducts.length})
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Applications ({loanApplications.length})
              </TabsTrigger>
              <TabsTrigger value="trade-ins" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Trade-in Evaluations ({tradeInEvaluations.length})
              </TabsTrigger>
            </TabsList>

            {/* Bank Partners Tab */}
            <TabsContent value="banks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Bank Partners</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Bank
                    </Button>
                  </DialogTrigger>
                  <AddBankDialog 
                    onSubmit={(data) => createBankMutation.mutate(data)}
                    isLoading={createBankMutation.isPending}
                  />
                </Dialog>
              </div>
              
              {banksLoading ? (
                <div className="text-center py-8">Loading banks...</div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bank Name</TableHead>
                        <TableHead>Bank Code</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Contact Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {banks.map((bank) => (
                        <TableRow key={bank.id}>
                          <TableCell className="font-medium">{bank.bankName}</TableCell>
                          <TableCell>{bank.bankCode}</TableCell>
                          <TableCell>{bank.contactEmail}</TableCell>
                          <TableCell>{bank.contactPhone}</TableCell>
                          <TableCell>
                            <Badge variant={bank.isActive ? "default" : "secondary"}>
                              {bank.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <EditBankDialog 
                                  bank={bank}
                                  onSubmit={(data) => updateBankMutation.mutate({ id: bank.id, data })}
                                  isLoading={updateBankMutation.isPending}
                                />
                              </Dialog>
                              <Button variant="outline" size="sm" onClick={() => deleteBankMutation.mutate(bank.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Loan Products Tab */}
            <TabsContent value="loan-products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Loan Products</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Loan Product
                    </Button>
                  </DialogTrigger>
                  <AddLoanProductDialog 
                    banks={banks}
                    onSubmit={(data) => createLoanProductMutation.mutate(data)}
                    isLoading={createLoanProductMutation.isPending}
                  />
                </Dialog>
              </div>
              
              {loanProductsLoading ? (
                <div className="text-center py-8">Loading loan products...</div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bank</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Interest Rate</TableHead>
                        <TableHead>Loan Amount</TableHead>
                        <TableHead>Tenure</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.bankName}</TableCell>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.productType}</Badge>
                          </TableCell>
                          <TableCell>{product.minInterestRate}% - {product.maxInterestRate}%</TableCell>
                          <TableCell>
                            KES {product.minLoanAmount?.toLocaleString()} - {product.maxLoanAmount?.toLocaleString()}
                          </TableCell>
                          <TableCell>{product.minTenureMonths} - {product.maxTenureMonths} months</TableCell>
                          <TableCell>
                            <Badge variant={product.isActive ? "default" : "secondary"}>
                              {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <EditLoanProductDialog 
                                  product={product}
                                  banks={banks}
                                  onSubmit={(data) => updateLoanProductMutation.mutate({ id: product.id, data })}
                                  isLoading={updateLoanProductMutation.isPending}
                                />
                              </Dialog>
                              <Button variant="outline" size="sm" onClick={() => deleteLoanProductMutation.mutate(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Loan Applications Tab */}
            <TabsContent value="applications" className="space-y-4">
              <h3 className="text-lg font-semibold">Loan Applications</h3>
              
              {loanApplicationsLoading ? (
                <div className="text-center py-8">Loading applications...</div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application #</TableHead>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Bank/Product</TableHead>
                        <TableHead>Requested Amount</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{application.applicantName}</p>
                              <p className="text-sm text-gray-500">{application.applicantEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{application.bankName}</p>
                              <p className="text-sm text-gray-500">{application.productName}</p>
                            </div>
                          </TableCell>
                          <TableCell>KES {application.requestedAmount?.toLocaleString()}</TableCell>
                          <TableCell>
                            {application.vehicleYear} {application.vehicleMake} {application.vehicleModel}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                application.status === 'approved' ? 'default' :
                                application.status === 'rejected' ? 'destructive' :
                                application.status === 'pending' ? 'secondary' : 'outline'
                              }
                            >
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {application.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => updateLoanApplicationMutation.mutate({
                                      id: application.id,
                                      status: 'approved',
                                      remarks: 'Approved by admin'
                                    })}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => updateLoanApplicationMutation.mutate({
                                      id: application.id,
                                      status: 'rejected',
                                      remarks: 'Rejected by admin'
                                    })}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Trade-in Evaluations Tab */}
            <TabsContent value="trade-ins" className="space-y-4">
              <h3 className="text-lg font-semibold">Trade-in Evaluations</h3>
              
              {tradeInEvaluationsLoading ? (
                <div className="text-center py-8">Loading evaluations...</div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Evaluation #</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Market Value</TableHead>
                        <TableHead>Trade-in Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tradeInEvaluations.map((evaluation) => (
                        <TableRow key={evaluation.id}>
                          <TableCell className="font-medium">{evaluation.evaluationNumber}</TableCell>
                          <TableCell>
                            {evaluation.year} {evaluation.make} {evaluation.model}
                          </TableCell>
                          <TableCell>KES {evaluation.marketValue?.toLocaleString()}</TableCell>
                          <TableCell>KES {evaluation.tradeInValue?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={evaluation.status === 'completed' ? 'default' : 'secondary'}>
                              {evaluation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(evaluation.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function MonetizationStrategyTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [transactionFilters, setTransactionFilters] = useState({
    status: 'all',
    method: 'all',
    type: 'all',
    startDate: '',
    endDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch dashboard analytics
  const { data: dashboardAnalytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/monetization/dashboard-analytics', selectedPeriod],
    queryFn: () => fetch(`/api/monetization/dashboard-analytics?period=${selectedPeriod}`, { credentials: 'include' }).then(r => r.json()),
    enabled: true
  });

  // Fetch revenue per product
  const { data: revenuePerProduct, isLoading: revenueLoading } = useQuery({
    queryKey: ['/api/monetization/revenue-per-product'],
    queryFn: () => fetch('/api/monetization/revenue-per-product', { credentials: 'include' }).then(r => r.json()),
    enabled: true
  });

  // Fetch filtered transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/monetization/transactions', transactionFilters, currentPage],
    queryFn: () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '25',
        ...Object.fromEntries(Object.entries(transactionFilters).filter(([_, value]) => value && value !== 'all'))
      });
      return fetch(`/api/monetization/transactions?${params}`, { credentials: 'include' }).then(r => r.json());
    },
    enabled: true
  });

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date | string) => {
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'completed': 'default',
      'processing': 'secondary',
      'pending': 'outline',
      'failed': 'destructive',
      'cancelled': 'destructive',
      'refunded': 'secondary'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <span className="inline-flex items-center text-green-600">
          <TrendingUp className="h-3 w-3 mr-1" />
          +{growth.toFixed(1)}%
        </span>
      );
    } else if (growth < 0) {
      return (
        <span className="inline-flex items-center text-red-600">
          <TrendingDown className="h-3 w-3 mr-1" />
          {growth.toFixed(1)}%
        </span>
      );
    }
    return <span className="text-gray-500">0%</span>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Track product revenue, transaction data, and financial performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="product-revenue" className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Product Revenue
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Transactions
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              {/* Period Selector */}
              <div className="flex items-center gap-4">
                <Label htmlFor="period">Period:</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Key Metrics */}
              {analyticsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : dashboardAnalytics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <Coins className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(dashboardAnalytics.totalRevenue)}</div>
                      <p className="text-xs text-muted-foreground">
                        {getGrowthIndicator(dashboardAnalytics.revenueGrowth)} from last period
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardAnalytics.totalTransactions.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        {getGrowthIndicator(dashboardAnalytics.transactionGrowth)} from last period
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Top Product</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {dashboardAnalytics.topProducts?.[0]?.productName || 'No Data'}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardAnalytics.topProducts?.[0] ? 
                          formatCurrency(dashboardAnalytics.topProducts[0].revenue) : 'No revenue data'
                        }
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {dashboardAnalytics.transactionsByStatus ? 
                          (dashboardAnalytics.transactionsByStatus.find(s => s.status === 'completed')?.percentage || 0).toFixed(1) : 0
                        }%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Completed transactions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Revenue by Category */}
              {dashboardAnalytics?.revenueByCategory && (
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardAnalytics.revenueByCategory.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="font-medium">{category.categoryName}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(category.revenue)}</div>
                            <div className="text-sm text-muted-foreground">{category.percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Product Revenue Tab */}
            <TabsContent value="product-revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Revenue Analysis</CardTitle>
                  <CardDescription>Revenue breakdown by individual products</CardDescription>
                </CardHeader>
                <CardContent>
                  {revenueLoading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Revenue</TableHead>
                          <TableHead className="text-right">Transactions</TableHead>
                          <TableHead className="text-right">Avg. Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {revenuePerProduct?.productRevenue?.map((product: any) => (
                          <TableRow key={product.productId}>
                            <TableCell className="font-medium">{product.productName}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{product.categoryName}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatCurrency(product.totalRevenue)}
                            </TableCell>
                            <TableCell className="text-right">{product.transactionCount}</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(product.avgTransactionAmount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              {/* Transaction Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Transaction Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={transactionFilters.status}
                        onValueChange={(value) => setTransactionFilters(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Method</Label>
                      <Select
                        value={transactionFilters.method}
                        onValueChange={(value) => setTransactionFilters(prev => ({ ...prev, method: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All methods" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All methods</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="airtel">Airtel Money</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Type</Label>
                      <Select
                        value={transactionFilters.type}
                        onValueChange={(value) => setTransactionFilters(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All types</SelectItem>
                          <SelectItem value="purchase">Purchase</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="topup">Top-up</SelectItem>
                          <SelectItem value="refund">Refund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={transactionFilters.startDate}
                        onChange={(e) => setTransactionFilters(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={transactionFilters.endDate}
                        onChange={(e) => setTransactionFilters(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setTransactionFilters({ status: 'all', method: 'all', type: 'all', startDate: '', endDate: '' })}
                    >
                      Clear Filters
                    </Button>
                    <Button variant="outline" className="ml-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transactions Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    {transactions?.totalCount ? `${transactions.totalCount} total transactions` : 'No transactions found'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {transactionsLoading ? (
                    <div className="space-y-4">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Reference</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions?.transactions?.map((transaction: any) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-mono text-sm">
                                {transaction.reference}
                              </TableCell>
                              <TableCell>{transaction.userId}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{transaction.productName || 'N/A'}</div>
                                  <div className="text-sm text-gray-500">{transaction.categoryName || 'N/A'}</div>
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">
                                {formatCurrency(transaction.amount)}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(transaction.status)}
                              </TableCell>
                              <TableCell className="capitalize">{transaction.method}</TableCell>
                              <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* Pagination */}
                      {transactions?.totalPages > 1 && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Page {currentPage} of {transactions.totalPages}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentPage <= 1}
                              onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                              Previous
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={currentPage >= transactions.totalPages}
                              onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Bank Dialog Components
function AddBankDialog({ onSubmit, isLoading }: { onSubmit: (data: BankForm) => void; isLoading: boolean }) {
  const form = useForm<BankForm>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bankName: "",
      bankCode: "",
      contactEmail: "",
      contactPhone: "",
      websiteUrl: "",
      address: "",
      isActive: true,
    },
  });

  const handleSubmit = (data: BankForm) => {
    onSubmit(data);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Bank Partner</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bank name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Code *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bank code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter contact email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter bank address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Active Status</FormLabel>
                  <FormDescription>
                    Enable this bank for loan products
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Adding..." : "Add Bank"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

function EditBankDialog({ bank, onSubmit, isLoading }: { bank: any; onSubmit: (data: BankForm) => void; isLoading: boolean }) {
  const form = useForm<BankForm>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bankName: bank.bankName || "",
      bankCode: bank.bankCode || "",
      contactEmail: bank.contactEmail || "",
      contactPhone: bank.contactPhone || "",
      websiteUrl: bank.websiteUrl || "",
      address: bank.address || "",
      isActive: bank.isActive ?? true,
    },
  });

  const handleSubmit = (data: BankForm) => {
    onSubmit(data);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Bank Partner</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bank name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Code *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bank code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter contact email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter bank address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Active Status</FormLabel>
                  <FormDescription>
                    Enable this bank for loan products
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Bank"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

// Loan Product Dialog Components
function AddLoanProductDialog({ banks, onSubmit, isLoading }: { banks: any[]; onSubmit: (data: LoanProductForm) => void; isLoading: boolean }) {
  const form = useForm<LoanProductForm>({
    resolver: zodResolver(loanProductSchema),
    defaultValues: {
      bankId: 0,
      productName: "",
      productType: "auto_loan",
      minInterestRate: 0,
      maxInterestRate: 0,
      minLoanAmount: 100000,
      maxLoanAmount: 5000000,
      minTenureMonths: 12,
      maxTenureMonths: 60,
      processingFeePercentage: 1,
      requiresDownPayment: true,
      minDownPaymentPercentage: 20,
      maxLtvRatio: 80,
      eligibilityRequirements: [],
      features: [],
      isActive: true,
    },
  });

  const handleSubmit = (data: LoanProductForm) => {
    onSubmit(data);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Loan Product</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank *</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id.toString()}>
                          {bank.bankName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="auto_loan">Auto Loan</SelectItem>
                      <SelectItem value="asset_finance">Asset Finance</SelectItem>
                      <SelectItem value="personal_loan">Personal Loan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLtvRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max LTV Ratio (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="80" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="12.5" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="18.5" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minLoanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Loan Amount (KES)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="100000" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLoanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Loan Amount (KES)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="5000000" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minTenureMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Tenure (Months)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="12" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxTenureMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Tenure (Months)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="60" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="processingFeePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Fee (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="1.0" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minDownPaymentPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Down Payment (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="20" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="requiresDownPayment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Requires Down Payment</FormLabel>
                    <FormDescription>
                      Does this product require a down payment?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>
                      Enable this loan product
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Adding..." : "Add Loan Product"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

function EditLoanProductDialog({ product, banks, onSubmit, isLoading }: { product: any; banks: any[]; onSubmit: (data: LoanProductForm) => void; isLoading: boolean }) {
  const form = useForm<LoanProductForm>({
    resolver: zodResolver(loanProductSchema),
    defaultValues: {
      bankId: product.bankId || 0,
      productName: product.productName || "",
      productType: product.productType || "auto_loan",
      minInterestRate: product.minInterestRate || 0,
      maxInterestRate: product.maxInterestRate || 0,
      minLoanAmount: product.minLoanAmount || 100000,
      maxLoanAmount: product.maxLoanAmount || 5000000,
      minTenureMonths: product.minTenureMonths || 12,
      maxTenureMonths: product.maxTenureMonths || 60,
      processingFeePercentage: product.processingFeePercentage || 1,
      requiresDownPayment: product.requiresDownPayment ?? true,
      minDownPaymentPercentage: product.minDownPaymentPercentage || 20,
      maxLtvRatio: product.maxLtvRatio || 80,
      eligibilityRequirements: product.eligibilityRequirements || [],
      features: product.features || [],
      isActive: product.isActive ?? true,
    },
  });

  const handleSubmit = (data: LoanProductForm) => {
    onSubmit(data);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Loan Product</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank *</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id.toString()}>
                          {bank.bankName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="auto_loan">Auto Loan</SelectItem>
                      <SelectItem value="asset_finance">Asset Finance</SelectItem>
                      <SelectItem value="personal_loan">Personal Loan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLtvRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max LTV Ratio (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="80" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="12.5" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="18.5" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minLoanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Loan Amount (KES)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="100000" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLoanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Loan Amount (KES)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="5000000" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minTenureMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Tenure (Months)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="12" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxTenureMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Tenure (Months)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="60" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="processingFeePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Fee (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="1.0" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minDownPaymentPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Down Payment (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="20" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="requiresDownPayment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Requires Down Payment</FormLabel>
                    <FormDescription>
                      Does this product require a down payment?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>
                      Enable this loan product
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Loan Product"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

// Create Strategy Dialog Component
function CreateStrategyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    strategyName: '',
    targetRevenue: '',
    timeframe: '',
    description: '',
    tactics: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await apiRequest('POST', '/api/monetization/admin/create-strategy', {
        strategyName: formData.strategyName,
        targetRevenue: parseFloat(formData.targetRevenue),
        timeframe: formData.timeframe,
        description: formData.description,
        tactics: formData.tactics
      });

      toast({
        title: "Strategy Created",
        description: `New strategy "${formData.strategyName}" has been created successfully.`
      });
      
      setIsOpen(false);
      setFormData({
        strategyName: '',
        targetRevenue: '',
        timeframe: '',
        description: '',
        tactics: ''
      });
    } catch (error) {
      console.error('Error creating strategy:', error);
      toast({
        title: "Error",
        description: "Failed to create strategy. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex flex-col h-20">
          <Plus className="h-5 w-5 mb-1" />
          <span className="text-xs">New Strategy</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Monetization Strategy
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategyName">Strategy Name</Label>
              <Input
                id="strategyName"
                value={formData.strategyName}
                onChange={(e) => setFormData(prev => ({ ...prev, strategyName: e.target.value }))}
                placeholder="e.g., Q2 Growth Strategy"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetRevenue">Target Revenue (KES)</Label>
              <Input
                id="targetRevenue"
                type="number"
                value={formData.targetRevenue}
                onChange={(e) => setFormData(prev => ({ ...prev, targetRevenue: e.target.value }))}
                placeholder="e.g., 5000000"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timeframe: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
                <SelectItem value="12-months">12 Months</SelectItem>
                <SelectItem value="18-months">18 Months</SelectItem>
                <SelectItem value="24-months">24 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the strategy objectives and approach..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tactics">Key Tactics (comma-separated)</Label>
            <Textarea
              id="tactics"
              value={formData.tactics}
              onChange={(e) => setFormData(prev => ({ ...prev, tactics: e.target.value }))}
              placeholder="e.g., Premium features, Enterprise partnerships, Freemium conversion"
              rows={2}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Strategy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Create Plan Dialog Component
function CreatePlanDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [planData, setPlanData] = useState({
    name: '',
    description: '',
    priceKes: '',
    billingCycle: 'monthly' as 'monthly' | 'quarterly' | 'annually',
    features: '',
    maxListings: '',
    calculationsPerMonth: '',
    isActive: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!planData.name || !planData.priceKes || parseFloat(planData.priceKes) <= 0) {
      toast({
        title: "Error",
        description: "Plan name and a valid price greater than 0 are required.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const featuresArray = planData.features.split(',').map(f => f.trim()).filter(f => f);
      const limits: any = {};
      
      if (planData.maxListings) limits.maxListings = parseInt(planData.maxListings);
      if (planData.calculationsPerMonth) limits.calculationsPerMonth = parseInt(planData.calculationsPerMonth);
      
      const payload = {
        name: planData.name,
        description: planData.description,
        priceKes: parseFloat(planData.priceKes),
        billingCycle: planData.billingCycle,
        features: featuresArray,
        limits,
        isActive: planData.isActive
      };
      
      console.log('Creating plan with payload:', payload);
      
      const response = await apiRequest('POST', '/api/monetization/admin/create-plan', payload);

      toast({
        title: "Plan Created",
        description: `${planData.name} has been created successfully.`
      });
      
      setIsOpen(false);
      setPlanData({
        name: '',
        description: '',
        priceKes: '',
        billingCycle: 'monthly',
        features: '',
        maxListings: '',
        calculationsPerMonth: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error creating plan:', error);
      toast({
        title: "Error",
        description: "Failed to create plan. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-col h-20">
          <CreditCard className="h-5 w-5 mb-1" />
          <span className="text-xs">Create Plan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Subscription Plan</DialogTitle>
          <DialogDescription>
            Create a new subscription plan with features and pricing
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="planName">Plan Name *</Label>
            <Input
              id="planName"
              value={planData.name}
              onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
              placeholder="e.g., Basic, Professional, Enterprise"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={planData.description}
              onChange={(e) => setPlanData({ ...planData, description: e.target.value })}
              placeholder="Brief description of the plan"
            />
          </div>
          
          <div>
            <Label htmlFor="price">Price (KES) *</Label>
            <Input
              id="price"
              type="number"
              min="1"
              step="1"
              value={planData.priceKes}
              onChange={(e) => setPlanData({ ...planData, priceKes: e.target.value })}
              placeholder="2500"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="billing">Billing Cycle</Label>
            <select
              id="billing"
              value={planData.billingCycle}
              onChange={(e) => setPlanData({ ...planData, billingCycle: e.target.value as any })}
              className="w-full p-2 border rounded-md"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              value={planData.features}
              onChange={(e) => setPlanData({ ...planData, features: e.target.value })}
              placeholder="Unlimited listings, Premium support, Analytics"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="maxListings">Max Listings</Label>
              <Input
                id="maxListings"
                type="number"
                value={planData.maxListings}
                onChange={(e) => setPlanData({ ...planData, maxListings: e.target.value })}
                placeholder="50"
              />
            </div>
            <div>
              <Label htmlFor="calculations">Calculations/Month</Label>
              <Input
                id="calculations"
                type="number"
                value={planData.calculationsPerMonth}
                onChange={(e) => setPlanData({ ...planData, calculationsPerMonth: e.target.value })}
                placeholder="100"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={planData.isActive}
              onChange={(e) => setPlanData({ ...planData, isActive: e.target.checked })}
            />
            <Label htmlFor="isActive">Active Plan</Label>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Plans Dialog Component
function EditPlansDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [planData, setPlanData] = useState({
    name: '',
    description: '',
    priceKes: '',
    billingCycle: '',
    features: '',
    isActive: true
  });

  const plans = [
    { id: 'basic', name: 'Basic Plan', price: '2500', description: 'Essential tools for individual users' },
    { id: 'professional', name: 'Professional Plan', price: '8000', description: 'Advanced features for professionals' },
    { id: 'enterprise', name: 'Enterprise Plan', price: '20000', description: 'Full-featured solution for businesses' }
  ];

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setPlanData({
        name: plan.name,
        description: plan.description,
        priceKes: plan.price,
        billingCycle: 'monthly',
        features: 'Feature 1, Feature 2, Feature 3',
        isActive: true
      });
    }
    setSelectedPlan(planId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) return;
    
    try {
      const featuresArray = planData.features.split(',').map(f => f.trim()).filter(f => f);
      
      const response = await apiRequest('PUT', `/api/monetization/admin/update-plan/${selectedPlan}`, {
        name: planData.name,
        description: planData.description,
        priceKes: parseFloat(planData.priceKes),
        billingCycle: planData.billingCycle,
        features: featuresArray,
        isActive: planData.isActive
      });

      toast({
        title: "Plan Updated",
        description: `${planData.name} has been updated successfully.`
      });
      
      setIsOpen(false);
      setSelectedPlan('');
    } catch (error) {
      console.error('Error updating plan:', error);
      toast({
        title: "Error",
        description: "Failed to update plan. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-col h-20">
          <Edit className="h-5 w-5 mb-1" />
          <span className="text-xs">Edit Plans</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Subscription Plans
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Plan to Edit</Label>
            <Select onValueChange={handlePlanSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a plan to edit" />
              </SelectTrigger>
              <SelectContent>
                {plans.map(plan => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name} - KES {plan.price}/month
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPlan && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planName">Plan Name</Label>
                  <Input
                    id="planName"
                    value={planData.name}
                    onChange={(e) => setPlanData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceKes">Price (KES)</Label>
                  <Input
                    id="priceKes"
                    type="number"
                    value={planData.priceKes}
                    onChange={(e) => setPlanData(prev => ({ ...prev, priceKes: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="planDescription">Description</Label>
                <Textarea
                  id="planDescription"
                  value={planData.description}
                  onChange={(e) => setPlanData(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingCycle">Billing Cycle</Label>
                <Select onValueChange={(value) => setPlanData(prev => ({ ...prev, billingCycle: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  value={planData.features}
                  onChange={(e) => setPlanData(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="e.g., Feature 1, Feature 2, Feature 3"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={planData.isActive}
                  onCheckedChange={(checked) => setPlanData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Plan is active</Label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Plan
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Pricing Rules Dialog Component  
function PricingRulesDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [ruleData, setRuleData] = useState({
    feature: '',
    basePrice: '',
    tierMultiplier: '',
    usageBased: false,
    overage: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await apiRequest('POST', '/api/monetization/admin/create-pricing-rule', {
        feature: ruleData.feature,
        basePrice: parseFloat(ruleData.basePrice),
        tierMultiplier: ruleData.tierMultiplier ? parseFloat(ruleData.tierMultiplier) : undefined,
        usageBased: ruleData.usageBased,
        overage: ruleData.overage ? parseFloat(ruleData.overage) : undefined
      });

      toast({
        title: "Pricing Rule Created",
        description: `New pricing rule for "${ruleData.feature}" has been created.`
      });
      
      setIsOpen(false);
      setRuleData({
        feature: '',
        basePrice: '',
        tierMultiplier: '',
        usageBased: false,
        overage: ''
      });
    } catch (error) {
      console.error('Error creating pricing rule:', error);
      toast({
        title: "Error",
        description: "Failed to create pricing rule. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-col h-20">
          <Calculator className="h-5 w-5 mb-1" />
          <span className="text-xs">Pricing Rules</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Configure Pricing Rules
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feature">Feature/Service</Label>
            <Select onValueChange={(value) => setRuleData(prev => ({ ...prev, feature: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select feature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="listing_slots">Listing Slots</SelectItem>
                <SelectItem value="premium_analytics">Premium Analytics</SelectItem>
                <SelectItem value="lead_generation">Lead Generation</SelectItem>
                <SelectItem value="white_label">White Label</SelectItem>
                <SelectItem value="api_access">API Access</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (KES)</Label>
              <Input
                id="basePrice"
                type="number"
                value={ruleData.basePrice}
                onChange={(e) => setRuleData(prev => ({ ...prev, basePrice: e.target.value }))}
                placeholder="e.g., 1000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tierMultiplier">Tier Multiplier</Label>
              <Input
                id="tierMultiplier"
                type="number"
                step="0.1"
                value={ruleData.tierMultiplier}
                onChange={(e) => setRuleData(prev => ({ ...prev, tierMultiplier: e.target.value }))}
                placeholder="e.g., 1.5"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="usageBased"
              checked={ruleData.usageBased}
              onCheckedChange={(checked) => setRuleData(prev => ({ ...prev, usageBased: checked }))}
            />
            <Label htmlFor="usageBased">Usage-based pricing</Label>
          </div>
          
          {ruleData.usageBased && (
            <div className="space-y-2">
              <Label htmlFor="overage">Overage Rate (KES per unit)</Label>
              <Input
                id="overage"
                type="number"
                value={ruleData.overage}
                onChange={(e) => setRuleData(prev => ({ ...prev, overage: e.target.value }))}
                placeholder="e.g., 50"
              />
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Rule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}