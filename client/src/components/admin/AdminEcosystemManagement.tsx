import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Shield,
  Plus,
  Building2,
  Settings,
  Eye,
  Users,
  Activity
} from "lucide-react";
import { z } from "zod";

// Schemas for forms
const providerEditSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  description: z.string().optional(),
  isVerified: z.boolean(),
  isApproved: z.boolean(),
  isActive: z.boolean(),
  verificationNotes: z.string().optional()
});

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true)
});

const subcategorySchema = z.object({
  categoryId: z.number(),
  name: z.string().min(1, "Subcategory name is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});

export default function AdminEcosystemManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("providers");
  const [editingProvider, setEditingProvider] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<any>(null);

  // Fetch providers
  const { data: providersData, isLoading: providersLoading } = useQuery({
    queryKey: ["/api/admin/ecosystem/providers"],
    enabled: activeTab === "providers"
  });

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/admin/ecosystem/categories"],
    enabled: activeTab === "categories"
  });

  // Fetch subcategories
  const { data: subcategories, isLoading: subcategoriesLoading } = useQuery({
    queryKey: ["/api/admin/ecosystem/subcategories"],
    enabled: activeTab === "subcategories"
  });

  // Provider mutations
  const updateProviderMutation = useMutation({
    mutationFn: (data: { id: number; updates: any }) =>
      apiRequest("PUT", `/api/admin/ecosystem/providers/${data.id}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/providers"] });
      toast({ title: "Success", description: "Provider updated successfully" });
      setEditingProvider(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update provider", variant: "destructive" });
    }
  });

  const verifyProviderMutation = useMutation({
    mutationFn: (data: { id: number; isVerified: boolean; verificationNotes?: string }) =>
      apiRequest("PUT", `/api/admin/ecosystem/providers/${data.id}/verify`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/providers"] });
      toast({ title: "Success", description: "Provider verification updated" });
    }
  });

  const toggleProviderStatusMutation = useMutation({
    mutationFn: (data: { id: number; field: string; value: boolean }) => {
      if (data.field === "isApproved") {
        return apiRequest("PUT", `/api/admin/ecosystem/providers/${data.id}/approve`, { isApproved: data.value });
      } else if (data.field === "isActive") {
        return apiRequest("PUT", `/api/admin/ecosystem/providers/${data.id}/activate`, { isActive: data.value });
      }
      throw new Error("Invalid field");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/providers"] });
      toast({ title: "Success", description: "Provider status updated" });
    }
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/ecosystem/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/categories"] });
      toast({ title: "Success", description: "Category created successfully" });
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: { id: number; updates: any }) =>
      apiRequest("PUT", `/api/admin/ecosystem/categories/${data.id}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/categories"] });
      toast({ title: "Success", description: "Category updated successfully" });
      setEditingCategory(null);
    }
  });

  // Subcategory mutations
  const createSubcategoryMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/ecosystem/subcategories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/subcategories"] });
      toast({ title: "Success", description: "Subcategory created successfully" });
    }
  });

  const updateSubcategoryMutation = useMutation({
    mutationFn: (data: { id: number; updates: any }) =>
      apiRequest("PUT", `/api/admin/ecosystem/subcategories/${data.id}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ecosystem/subcategories"] });
      toast({ title: "Success", description: "Subcategory updated successfully" });
      setEditingSubcategory(null);
    }
  });

  // Forms
  const providerForm = useForm({
    resolver: zodResolver(providerEditSchema),
    defaultValues: {
      businessName: "",
      description: "",
      isVerified: false,
      isApproved: false,
      isActive: true,
      verificationNotes: ""
    }
  });

  const categoryForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      isActive: true
    }
  });

  const subcategoryForm = useForm({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      categoryId: 0,
      name: "",
      description: "",
      isActive: true
    }
  });

  // Handlers
  const handleEditProvider = (provider: any) => {
    setEditingProvider(provider);
    providerForm.reset({
      businessName: provider.businessName,
      description: provider.description || "",
      isVerified: provider.isVerified,
      isApproved: provider.isApproved,
      isActive: provider.isActive,
      verificationNotes: provider.verificationNotes || ""
    });
  };

  const handleProviderSubmit = (data: any) => {
    updateProviderMutation.mutate({
      id: editingProvider.id,
      updates: data
    });
  };

  const handleCreateCategory = (data: any) => {
    createCategoryMutation.mutate(data);
    categoryForm.reset();
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    categoryForm.reset(category);
  };

  const handleCategorySubmit = (data: any) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({
        id: editingCategory.id,
        updates: data
      });
    } else {
      handleCreateCategory(data);
    }
  };

  const handleCreateSubcategory = (data: any) => {
    createSubcategoryMutation.mutate(data);
    subcategoryForm.reset();
  };

  const handleEditSubcategory = (subcategory: any) => {
    setEditingSubcategory(subcategory);
    subcategoryForm.reset(subcategory);
  };

  const handleSubcategorySubmit = (data: any) => {
    if (editingSubcategory) {
      updateSubcategoryMutation.mutate({
        id: editingSubcategory.id,
        updates: data
      });
    } else {
      handleCreateSubcategory(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ecosystem management</h2>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#740a72]" />
          <span className="text-sm text-gray-600">Automotive service ecosystem</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Service providers
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="subcategories" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Subcategories
          </TabsTrigger>
        </TabsList>

        {/* Providers Tab */}
        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle>Service providers</CardTitle>
              <CardDescription>
                Manage service providers: approve, verify, and monitor status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {providersLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-[#740a72] border-t-transparent rounded-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verification</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(providersData?.providers || []).map((provider: any) => (
                        <TableRow key={provider.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{provider.businessName}</div>
                              <div className="text-sm text-gray-500">{provider.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {provider.county}, {provider.area}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={provider.isApproved}
                                  onCheckedChange={(checked) =>
                                    toggleProviderStatusMutation.mutate({
                                      id: provider.id,
                                      field: "isApproved",
                                      value: checked
                                    })
                                  }
                                />
                                <span className="text-xs">
                                  {provider.isApproved ? "Approved" : "Pending"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={provider.isActive}
                                  onCheckedChange={(checked) =>
                                    toggleProviderStatusMutation.mutate({
                                      id: provider.id,
                                      field: "isActive",
                                      value: checked
                                    })
                                  }
                                />
                                <span className="text-xs">
                                  {provider.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {provider.isVerified ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Unverified
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProvider(provider)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  verifyProviderMutation.mutate({
                                    id: provider.id,
                                    isVerified: !provider.isVerified,
                                    verificationNotes: provider.isVerified ? "Verification revoked" : "Verified by admin"
                                  })
                                }
                              >
                                <Shield className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add new category</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...categoryForm}>
                  <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={categoryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter category name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={categoryForm.control}
                        name="icon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Icon class or emoji" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={categoryForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter category description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={categoryForm.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Active</FormLabel>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={createCategoryMutation.isPending}>
                      <Plus className="w-4 h-4 mr-2" />
                      {editingCategory ? "Update category" : "Create category"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing categories</CardTitle>
              </CardHeader>
              <CardContent>
                {categoriesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-[#740a72] border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(categories || []).map((category: any) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.description}</TableCell>
                          <TableCell>{category.icon}</TableCell>
                          <TableCell>
                            <Badge variant={category.isActive ? "default" : "secondary"}>
                              {category.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Subcategories Tab */}
        <TabsContent value="subcategories">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add new subcategory</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...subcategoryForm}>
                  <form onSubmit={subcategoryForm.handleSubmit(handleSubcategorySubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={subcategoryForm.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent category</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(categories || []).map((category: any) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={subcategoryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subcategory name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter subcategory name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={subcategoryForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter subcategory description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={subcategoryForm.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>Active</FormLabel>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={createSubcategoryMutation.isPending}>
                      <Plus className="w-4 h-4 mr-2" />
                      {editingSubcategory ? "Update subcategory" : "Create subcategory"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing subcategories</CardTitle>
              </CardHeader>
              <CardContent>
                {subcategoriesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-[#740a72] border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(subcategories || []).map((subcategory: any) => (
                        <TableRow key={subcategory.id}>
                          <TableCell className="font-medium">{subcategory.name}</TableCell>
                          <TableCell>
                            {(categories || []).find((c: any) => c.id === subcategory.categoryId)?.name}
                          </TableCell>
                          <TableCell>{subcategory.description}</TableCell>
                          <TableCell>
                            <Badge variant={subcategory.isActive ? "default" : "secondary"}>
                              {subcategory.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditSubcategory(subcategory)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Provider Dialog */}
      <Dialog open={!!editingProvider} onOpenChange={(open) => !open && setEditingProvider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit provider</DialogTitle>
            <DialogDescription>Update provider information and status</DialogDescription>
          </DialogHeader>
          <Form {...providerForm}>
            <form onSubmit={providerForm.handleSubmit(handleProviderSubmit)} className="space-y-4">
              <FormField
                control={providerForm.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={providerForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={providerForm.control}
                  name="isVerified"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Verified</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={providerForm.control}
                  name="isApproved"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Approved</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={providerForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={providerForm.control}
                name="verificationNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Add verification notes..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingProvider(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateProviderMutation.isPending}>
                  Update provider
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}