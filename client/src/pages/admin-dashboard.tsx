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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  User
} from "lucide-react";
import { z } from "zod";
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

export default function AdminDashboard() {
  // No need for auth check here since the route is protected by ProtectedRoute
  return <AuthenticatedAdminDashboard />;
}

function AuthenticatedAdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { logout, getAuthHeaders } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
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
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Listings
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="flagging" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Auto-Flagging
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Vehicle Refs
            </TabsTrigger>
            <TabsTrigger value="csv-upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              CSV Upload
            </TabsTrigger>
            <TabsTrigger value="tax-rates" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Tax Rates
            </TabsTrigger>
            <TabsTrigger value="processing-fees" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Processing Fees
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Category Rules
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab />
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

// Enhanced User Profile Management Modal
function UserDetailsModal({ userId, onClose }: { userId: string; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  
  const { data: userDetails, isLoading } = useQuery<{
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

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogTitle>Loading User Profile</DialogTitle>
          <div className="text-center py-8">Loading user profile...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!userDetails || !currentUser) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl">
          <DialogTitle>User Profile</DialogTitle>
          <div className="text-center py-8 text-red-500">Failed to load user profile</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.profilePicture} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {currentUser.firstName?.[0]}{currentUser.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{currentUser.firstName} {currentUser.lastName}</h2>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={currentUser.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                {currentUser.status}
              </Badge>
              <Badge className="bg-purple-500">{currentUser.role?.name || 'No Role'}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Quick Admin Actions Bar */}
        <div className="flex gap-2 py-3 border-b">
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
            View Reports
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "listings", label: "Listings", icon: Car },
            { id: "activity", label: "Activity", icon: Activity },
            { id: "warnings", label: "Warnings", icon: AlertTriangle },
            { id: "settings", label: "Settings", icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">First Name</label>
                      <p className="font-medium">{currentUser.firstName || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Name</label>
                      <p className="font-medium">{currentUser.lastName || "Not provided"}</p>
                    </div>
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
                    <label className="text-sm font-medium text-gray-600">Joined</label>
                    <p className="font-medium">{new Date(currentUser.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="font-medium">{currentUser.location || "Not provided"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{userDetails.listings?.length || 0}</div>
                      <div className="text-sm text-blue-600">Total Listings</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {userDetails.listings?.filter((l: any) => l.status === 'active').length || 0}
                      </div>
                      <div className="text-sm text-green-600">Active Listings</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{userDetails.warnings?.length || 0}</div>
                      <div className="text-sm text-yellow-600">Warnings</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{userDetails.activities?.length || 0}</div>
                      <div className="text-sm text-purple-600">Activities</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "listings" && (
            <Card>
              <CardHeader>
                <CardTitle>User Listings ({userDetails.listings?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails.listings && userDetails.listings.length > 0 ? (
                  <div className="space-y-4">
                    {userDetails.listings.map((listing: any) => (
                      <div key={listing.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{listing.title}</h4>
                            <p className="text-sm text-gray-600">
                              {listing.make} {listing.model} • {listing.year}
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                              KES {listing.price?.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              listing.status === 'active' ? 'bg-green-500' :
                              listing.status === 'pending' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }>
                              {listing.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Created: {new Date(listing.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No listings found</div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "activity" && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities ({userDetails.activities?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails.activities && userDetails.activities.length > 0 ? (
                  <div className="space-y-3">
                    {userDetails.activities.map((activity: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.activity_type || activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.description}</div>
                          <div className="text-xs text-gray-500">
                            {activity.created_at ? new Date(activity.created_at).toLocaleString() : 'Unknown date'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No recent activities</div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "warnings" && (
            <Card>
              <CardHeader>
                <CardTitle>Warnings & Flags ({userDetails.warnings?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails.warnings && userDetails.warnings.length > 0 ? (
                  <div className="space-y-3">
                    {userDetails.warnings.map((warning: any, index: number) => (
                      <div key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-red-800">{warning.warning_type || 'Warning'}</div>
                            <div className="text-sm text-red-700">{warning.description}</div>
                            <div className="text-xs text-red-600 mt-1">
                              Severity: {warning.severity} • {warning.created_at ? new Date(warning.created_at).toLocaleDateString() : 'Unknown date'}
                            </div>
                          </div>
                          <Badge className={warning.acknowledged ? 'bg-green-500' : 'bg-yellow-500'}>
                            {warning.acknowledged ? 'Acknowledged' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No warnings or flags</div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings & Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center gap-2"
                    onClick={() => setShowRoleDialog(true)}
                  >
                    <Shield className="h-6 w-6" />
                    Change User Role
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center gap-2"
                    onClick={() => setShowSuspendDialog(true)}
                  >
                    <Ban className="h-6 w-6" />
                    Suspend Account
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center gap-2"
                  >
                    <RefreshCw className="h-6 w-6" />
                    Reset Password
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex flex-col items-center gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
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