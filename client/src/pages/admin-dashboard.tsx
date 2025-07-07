import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  ArrowLeft
} from "lucide-react";
import { z } from "zod";
import type { 
  VehicleReference, 
  TaxRate, 
  VehicleCategoryRule, 
  DepreciationRate 
} from "@shared/schema";

// Form schemas for validation
const vehicleReferenceSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  engineCapacity: z.number().optional(),
  bodyType: z.string().optional(),
  fuelType: z.string().optional(),
  driveConfiguration: z.string().optional(),
  crspKes: z.string().min(1, "CRSP value is required"),
});

const taxRateSchema = z.object({
  vehicleCategory: z.string().min(1, "Vehicle category is required"),
  importDuty: z.number().min(0).max(100),
  exciseDuty: z.number().min(0).max(100),
  vat: z.number().min(0).max(100),
  rdl: z.number().min(0).max(100),
  idf: z.number().min(0).max(100),
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

type VehicleReferenceForm = z.infer<typeof vehicleReferenceSchema>;
type TaxRateForm = z.infer<typeof taxRateSchema>;
type CategoryRuleForm = z.infer<typeof categoryRuleSchema>;
type DepreciationRateForm = z.infer<typeof depreciationRateSchema>;

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("vehicles");

  // Queries for fetching data
  const { data: vehicleReferences = [], isLoading: vehiclesLoading } = useQuery<VehicleReference[]>({
    queryKey: ["/api/admin/vehicle-references"],
  });

  const { data: taxRates = [], isLoading: taxRatesLoading } = useQuery<TaxRate[]>({
    queryKey: ["/api/admin/tax-rates"],
  });

  const { data: categoryRules = [], isLoading: categoryRulesLoading } = useQuery<VehicleCategoryRule[]>({
    queryKey: ["/api/admin/category-rules"],
  });

  const { data: depreciationRates = [], isLoading: depreciationRatesLoading } = useQuery<DepreciationRate[]>({
    queryKey: ["/api/admin/depreciation-rates"],
  });

  // Vehicle reference mutations
  const addVehicleMutation = useMutation({
    mutationFn: async (data: VehicleReferenceForm) => {
      const response = await apiRequest("POST", "/api/admin/vehicle-references", data);
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

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `KES ${num.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Database className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage vehicle data, tax rates, and categories</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Calculator
                </Button>
              </Link>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Vehicle References
            </TabsTrigger>
            <TabsTrigger value="tax-rates" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Tax Rates
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Category Rules
            </TabsTrigger>
            <TabsTrigger value="depreciation" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Depreciation Rates
            </TabsTrigger>
          </TabsList>

          {/* Vehicle References Tab */}
          <TabsContent value="vehicles">
            <VehicleReferencesTab 
              vehicleReferences={vehicleReferences}
              isLoading={vehiclesLoading}
              onAdd={addVehicleMutation.mutate}
              formatCurrency={formatCurrency}
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
  const [searchTerm, setSearchTerm] = useState("");

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
                    name="crspKes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CRSP Value (KES)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 2500000" />
                        </FormControl>
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
                  <TableHead>CRSP Value</TableHead>
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
                      <TableCell>
                        {vehicle.crspKes ? formatCurrency(vehicle.crspKes) : "N/A"}
                      </TableCell>
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
          {filteredVehicles.length > 100 && (
            <p className="text-sm text-gray-500">Showing first 100 results. Use search to narrow down.</p>
          )}
        </div>
      </CardContent>
    </Card>
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5" />
          Tax Rates by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle Category</TableHead>
                <TableHead>Import Duty (%)</TableHead>
                <TableHead>Excise Duty (%)</TableHead>
                <TableHead>VAT (%)</TableHead>
                <TableHead>RDL (%)</TableHead>
                <TableHead>IDF (%)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">Loading...</TableCell>
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
    importDuty: rate.importDuty,
    exciseDuty: rate.exciseDuty,
    vat: rate.vat,
    rdl: rate.rdl,
    idf: rate.idf,
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
            type="number"
            value={editData.importDuty}
            onChange={(e) => setEditData({ ...editData, importDuty: parseFloat(e.target.value) })}
            className="w-20"
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            value={editData.exciseDuty}
            onChange={(e) => setEditData({ ...editData, exciseDuty: parseFloat(e.target.value) })}
            className="w-20"
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            value={editData.vat}
            onChange={(e) => setEditData({ ...editData, vat: parseFloat(e.target.value) })}
            className="w-20"
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            value={editData.rdl}
            onChange={(e) => setEditData({ ...editData, rdl: parseFloat(e.target.value) })}
            className="w-20"
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            value={editData.idf}
            onChange={(e) => setEditData({ ...editData, idf: parseFloat(e.target.value) })}
            className="w-20"
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
      <TableCell>{rate.importDuty}%</TableCell>
      <TableCell>{rate.exciseDuty}%</TableCell>
      <TableCell>{rate.vat}%</TableCell>
      <TableCell>{rate.rdl}%</TableCell>
      <TableCell>{rate.idf}%</TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
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
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
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