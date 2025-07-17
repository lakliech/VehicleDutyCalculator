import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FeatureManagement } from "./feature-management";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Tags, 
  Coins,
  Settings,
  Users,
  Target,
  Calendar,
  Clock,
  Hash,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

type ProductCategory = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type ProductFeature = {
  id: number;
  name: string;
  description: string;
  limitType: string;
  limitValue: number | null;
  limitDuration: number | null;
  isIncluded: boolean;
  additionalCost: string;
  sortOrder: number;
};

type ProductForm = {
  categoryId: string;
  name: string;
  description: string;
  basePrice: string;
  billingType: string;
  targetUsers: string;
  isActive: boolean;
  sortOrder: number;
  features: ProductFeature[];
  selectedFeatures: number[];
};

type CategoryForm = {
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
};

// Feature constraint schema
const featureConstraintSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  description: z.string().optional(),
  limitType: z.enum(['count', 'duration', 'size', 'frequency', 'concurrent', 'boolean', 'unlimited'], {
    required_error: "Please select a limit type",
  }),
  limitValue: z.number().optional(),
  limitDuration: z.number().optional(),
  limitSize: z.number().optional(),
  limitFrequency: z.number().optional(),
  frequencyPeriod: z.number().optional(),
  constraintConfig: z.record(z.any()).optional(),
  isIncluded: z.boolean().default(true),
  additionalCost: z.number().default(0),
  sortOrder: z.number().default(0),
});

type FeatureConstraint = z.infer<typeof featureConstraintSchema>;

export default function ProductCatalogManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Dialog states
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showEditProductDialog, setShowEditProductDialog] = useState(false);

  // Edit states
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    name: '',
    description: '',
    isActive: true,
    sortOrder: 0
  });

  const [productForm, setProductForm] = useState<ProductForm>({
    categoryId: '',
    name: '',
    description: '',
    basePrice: '',
    billingType: 'per_period',
    targetUsers: '',
    isActive: true,
    sortOrder: 0,
    features: [],
    selectedFeatures: []
  });

  const [editProductForm, setEditProductForm] = useState<ProductForm>({
    categoryId: '',
    name: '',
    description: '',
    basePrice: '',
    billingType: 'per_period',
    targetUsers: '',
    isActive: true,
    sortOrder: 0,
    features: [],
    selectedFeatures: []
  });

  const billingTypeOptions = [
    { value: 'per_period', label: 'Per Period (Monthly/Yearly)' },
    { value: 'per_listing', label: 'Per Listing' },
    { value: 'per_policy', label: 'Per Policy' },
    { value: 'per_report', label: 'Per Report/Item' },
    { value: 'per_item', label: 'Per Transaction' },
    { value: 'one_time', label: 'One Time Payment' },
    { value: 'pay_per_boost', label: 'Pay Per Boost' }
  ];

  const limitTypeOptions = [
    { value: 'unlimited', label: 'Unlimited' },
    { value: 'count', label: 'Limited by Count' },
    { value: 'duration', label: 'Limited by Duration' }
  ];

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/products/categories'],
    queryFn: () => fetch('/api/products/categories').then(res => res.json())
  });

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products/admin/products'],
    queryFn: () => fetch('/api/products/admin/products').then(res => res.json())
  });

  // Fetch all features for selection
  const { data: allFeatures = [], isError: allFeaturesError } = useQuery({
    queryKey: ['/api/products/features'],
    queryFn: async () => {
      const res = await fetch('/api/products/features');
      if (!res.ok) {
        throw new Error('Failed to fetch features');
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: (data: CategoryForm) => apiRequest('POST', '/api/products/admin/categories', data),
    onSuccess: () => {
      toast({ title: "Success", description: "Category created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products/categories'] });
      setShowCategoryDialog(false);
      setCategoryForm({ name: '', description: '', isActive: true, sortOrder: 0 });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create category",
        variant: "destructive" 
      });
    }
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/products/admin/products', data),
    onSuccess: () => {
      toast({ title: "Success", description: "Product created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products/admin/products'] });
      setShowProductDialog(false);
      setProductForm({
        categoryId: '',
        name: '',
        description: '',
        basePrice: '',
        billingType: 'per_period',
        targetUsers: '',
        isActive: true,
        sortOrder: 0,
        features: [],
        selectedFeatures: []
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create product",
        variant: "destructive" 
      });
    }
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: (data: { id: number; productData: any }) => 
      apiRequest('PUT', `/api/products/admin/products/${data.id}`, data.productData),
    onSuccess: () => {
      toast({ title: "Success", description: "Product updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products/admin/products'] });
      setShowEditProductDialog(false);
      setEditingProduct(null);
      setEditProductForm({
        categoryId: '',
        name: '',
        description: '',
        basePrice: '',
        billingType: 'per_period',
        targetUsers: '',
        isActive: true,
        sortOrder: 0,
        features: [],
        selectedFeatures: []
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update product",
        variant: "destructive" 
      });
    }
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/products/admin/categories/${id}`),
    onSuccess: () => {
      toast({ title: "Success", description: "Category deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products/categories'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete category",
        variant: "destructive" 
      });
    }
  });

  // Handlers
  const handleCreateCategory = () => {
    if (!categoryForm.name.trim()) {
      toast({ title: "Error", description: "Category name is required", variant: "destructive" });
      return;
    }
    createCategoryMutation.mutate(categoryForm);
  };

  const handleCreateProduct = () => {
    if (!productForm.name.trim() || !productForm.categoryId || !productForm.basePrice) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    
    const productData = {
      ...productForm,
      categoryId: productForm.categoryId,
      basePrice: productForm.basePrice
    };
    
    createProductMutation.mutate(productData);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setEditProductForm({
      categoryId: product.product.categoryId.toString(),
      name: product.product.name,
      description: product.product.description || '',
      basePrice: product.product.basePrice.toString(),
      billingType: product.product.billingType,
      targetUsers: product.product.targetUsers || '',
      isActive: product.product.isActive,
      sortOrder: product.product.sortOrder,
      features: [],
      selectedFeatures: []
    });
    setShowEditProductDialog(true);
  };

  const handleUpdateProduct = () => {
    if (!editProductForm.name.trim() || !editProductForm.categoryId || !editProductForm.basePrice) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    
    const productData = {
      ...editProductForm,
      categoryId: editProductForm.categoryId,
      basePrice: editProductForm.basePrice
    };
    
    updateProductMutation.mutate({
      id: editingProduct.product.id,
      productData: productData
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Catalog Management</h2>
          <p className="text-muted-foreground">Manage product categories, products, features, and pricing</p>
        </div>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Features & Pricing
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Manage product categories for your platform</CardDescription>
                </div>
                <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Category</DialogTitle>
                      <DialogDescription>
                        Add a new product category to organize your offerings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="category-name">Category Name *</Label>
                        <Input
                          id="category-name"
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                          placeholder="e.g., Marketplace Listings"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-description">Description</Label>
                        <Textarea
                          id="category-description"
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                          placeholder="Brief description of this category"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="category-active"
                          checked={categoryForm.isActive}
                          onCheckedChange={(checked) => setCategoryForm({ ...categoryForm, isActive: checked })}
                        />
                        <Label htmlFor="category-active">Active</Label>
                      </div>
                      <div>
                        <Label htmlFor="category-sort">Sort Order</Label>
                        <Input
                          id="category-sort"
                          type="number"
                          value={categoryForm.sortOrder}
                          onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: parseInt(e.target.value) || 0 })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreateCategory}
                        disabled={createCategoryMutation.isPending}
                      >
                        {createCategoryMutation.isPending ? "Creating..." : "Create Category"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {categoriesLoading ? (
                <div className="text-center py-4">Loading categories...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sort Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category: ProductCategory) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          <Badge variant={category.isActive ? "default" : "secondary"}>
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{category.sortOrder}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteCategoryMutation.mutate(category.id)}
                              disabled={deleteCategoryMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage individual products and their pricing models</CardDescription>
                </div>
                <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Product</DialogTitle>
                      <DialogDescription>
                        Add a new product with pricing, billing model, and features
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Product Basic Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="product-category">Category *</Label>
                            <Select 
                              value={productForm.categoryId} 
                              onValueChange={(value) => setProductForm({ ...productForm, categoryId: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category: ProductCategory) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="product-name">Product Name *</Label>
                            <Input
                              id="product-name"
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              placeholder="e.g., Basic Listings"
                            />
                          </div>
                          <div>
                            <Label htmlFor="product-price">Base Price (KES) *</Label>
                            <Input
                              id="product-price"
                              type="number"
                              min="0"
                              step="0.01"
                              value={productForm.basePrice}
                              onChange={(e) => setProductForm({ ...productForm, basePrice: e.target.value })}
                              placeholder="2500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="product-billing">Billing Type</Label>
                            <Select 
                              value={productForm.billingType} 
                              onValueChange={(value) => setProductForm({ ...productForm, billingType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {billingTypeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="product-description">Description</Label>
                            <Textarea
                              id="product-description"
                              value={productForm.description}
                              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                              placeholder="Product description"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="product-target">Target Users</Label>
                            <Input
                              id="product-target"
                              value={productForm.targetUsers}
                              onChange={(e) => setProductForm({ ...productForm, targetUsers: e.target.value })}
                              placeholder="e.g., Small dealers, Private sellers"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="product-active"
                              checked={productForm.isActive}
                              onCheckedChange={(checked) => setProductForm({ ...productForm, isActive: checked })}
                            />
                            <Label htmlFor="product-active">Active</Label>
                          </div>
                          <div>
                            <Label htmlFor="product-sort">Sort Order</Label>
                            <Input
                              id="product-sort"
                              type="number"
                              value={productForm.sortOrder}
                              onChange={(e) => setProductForm({ ...productForm, sortOrder: parseInt(e.target.value) || 0 })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Feature Selection */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-medium">Product Features</Label>
                          <p className="text-sm text-muted-foreground">
                            Select existing features or create new ones. Features control system functionality like photo limits, listing duration, etc.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-3">
                            {allFeaturesError ? (
                              <div className="col-span-2 text-center py-4 text-red-600">
                                <p>Error loading features</p>
                                <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
                              </div>
                            ) : allFeatures.length === 0 ? (
                              <div className="col-span-2 text-center py-4 text-muted-foreground">
                                <p>No features available</p>
                                <p className="text-sm">Create features first to assign them to products</p>
                              </div>
                            ) : (
                              allFeatures.map((feature: ProductFeature) => (
                                <div key={feature.id} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`feature-${feature.id}`}
                                    checked={productForm.selectedFeatures.includes(feature.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setProductForm({
                                          ...productForm,
                                          selectedFeatures: [...productForm.selectedFeatures, feature.id]
                                        });
                                      } else {
                                        setProductForm({
                                          ...productForm,
                                          selectedFeatures: productForm.selectedFeatures.filter(id => id !== feature.id)
                                        });
                                      }
                                    }}
                                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                  />
                                  <Label htmlFor={`feature-${feature.id}`} className="text-sm">
                                    <span className="font-medium">{feature.name}</span>
                                    <span className="text-muted-foreground ml-2">
                                      {feature.limitType === 'unlimited' && '(Unlimited)'}
                                      {feature.limitType === 'count' && `(${feature.limitValue} max)`}
                                      {feature.limitType === 'duration' && `(${feature.limitDuration} days)`}
                                    </span>
                                  </Label>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowProductDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreateProduct}
                        disabled={createProductMutation.isPending}
                      >
                        {createProductMutation.isPending ? "Creating..." : "Create Product"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Edit Product Dialog */}
                <Dialog open={showEditProductDialog} onOpenChange={setShowEditProductDialog}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Update the product information and settings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-product-category">Category *</Label>
                            <Select
                              value={editProductForm.categoryId}
                              onValueChange={(value) => setEditProductForm({ ...editProductForm, categoryId: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category: ProductCategory) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-product-name">Product Name *</Label>
                            <Input
                              id="edit-product-name"
                              value={editProductForm.name}
                              onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                              placeholder="e.g., Basic Marketplace Listing"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-product-price">Base Price (KES) *</Label>
                            <Input
                              id="edit-product-price"
                              type="number"
                              value={editProductForm.basePrice}
                              onChange={(e) => setEditProductForm({ ...editProductForm, basePrice: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-product-billing">Billing Type *</Label>
                            <Select
                              value={editProductForm.billingType}
                              onValueChange={(value) => setEditProductForm({ ...editProductForm, billingType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select billing type" />
                              </SelectTrigger>
                              <SelectContent>
                                {billingTypeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-product-description">Description</Label>
                            <Textarea
                              id="edit-product-description"
                              value={editProductForm.description}
                              onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                              placeholder="Product description"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-product-target">Target Users</Label>
                            <Input
                              id="edit-product-target"
                              value={editProductForm.targetUsers}
                              onChange={(e) => setEditProductForm({ ...editProductForm, targetUsers: e.target.value })}
                              placeholder="e.g., Small dealers, Private sellers"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="edit-product-active"
                              checked={editProductForm.isActive}
                              onCheckedChange={(checked) => setEditProductForm({ ...editProductForm, isActive: checked })}
                            />
                            <Label htmlFor="edit-product-active">Active</Label>
                          </div>
                          <div>
                            <Label htmlFor="edit-product-sort">Sort Order</Label>
                            <Input
                              id="edit-product-sort"
                              type="number"
                              value={editProductForm.sortOrder}
                              onChange={(e) => setEditProductForm({ ...editProductForm, sortOrder: parseInt(e.target.value) || 0 })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowEditProductDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleUpdateProduct}
                        disabled={updateProductMutation.isPending}
                      >
                        {updateProductMutation.isPending ? "Updating..." : "Update Product"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="text-center py-4">Loading products...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Billing Type</TableHead>
                      <TableHead>Target Users</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((productWrapper: any) => {
                      const product = productWrapper.product || productWrapper;
                      const category = productWrapper.category;
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{category?.name || 'N/A'}</TableCell>
                          <TableCell>KES {parseFloat(product.basePrice || '0').toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {product.billingType?.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{product.targetUsers}</TableCell>
                          <TableCell>
                            <Badge variant={product.isActive ? "default" : "secondary"}>
                              {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProduct(productWrapper)}
                                disabled={updateProductMutation.isPending}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteCategoryMutation.mutate(product.id)}
                                disabled={deleteCategoryMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features & Pricing Tab */}
        <TabsContent value="features" className="space-y-4">
          <FeaturesAndPricingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Feature Form Component
interface FeatureFormProps {
  defaultValues?: any;
  onSubmit: (data: FeatureConstraint) => void;
  isLoading?: boolean;
}

function FeatureForm({ defaultValues, onSubmit, isLoading = false }: FeatureFormProps) {
  const form = useForm<FeatureConstraint>({
    resolver: zodResolver(featureConstraintSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      limitType: "unlimited",
      isIncluded: true,
      additionalCost: 0,
      sortOrder: 0,
    },
  });

  const limitType = form.watch("limitType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feature Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Photo Upload" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="limitType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Constraint Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select constraint type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="count">Count-based (e.g., 5 photos)</SelectItem>
                    <SelectItem value="duration">Duration-based (e.g., 30 days)</SelectItem>
                    <SelectItem value="size">Size-based (e.g., 5MB)</SelectItem>
                    <SelectItem value="frequency">Frequency-based (e.g., 3 per day)</SelectItem>
                    <SelectItem value="concurrent">Concurrent usage (e.g., 2 active)</SelectItem>
                    <SelectItem value="boolean">Boolean (Yes/No)</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe what this feature does..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Constraint-specific fields */}
        {limitType === 'count' && (
          <FormField
            control={form.control}
            name="limitValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Count Limit</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 5" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {limitType === 'duration' && (
          <FormField
            control={form.control}
            name="limitDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (days)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 30" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {limitType === 'size' && (
          <FormField
            control={form.control}
            name="limitSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size Limit (MB)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 5" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {limitType === 'frequency' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="limitFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 3" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequencyPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period (hours)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 24" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {limitType === 'concurrent' && (
          <FormField
            control={form.control}
            name="limitValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concurrent Limit</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 2" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="isIncluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Included by Default</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Feature is included without additional cost
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Cost (KES)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Feature"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

// Features and Pricing Management Component
function FeaturesAndPricingManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isCreateFeatureOpen, setIsCreateFeatureOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<any>(null);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/products/categories'],
    queryFn: () => fetch('/api/products/categories').then(res => res.json())
  });

  // Fetch products for selected category
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products/admin/products'],
    queryFn: () => fetch('/api/products/admin/products').then(res => res.json())
  });

  // Fetch features for selected product
  const { data: productFeatures = [], isLoading: featuresLoading } = useQuery({
    queryKey: ['/api/products', selectedProduct, 'features'],
    queryFn: async () => {
      if (!selectedProduct) return [];
      const response = await fetch(`/api/products/${selectedProduct}/features`);
      if (!response.ok) throw new Error('Failed to fetch features');
      return response.json();
    },
    enabled: !!selectedProduct
  });

  // Create feature mutation
  const createFeatureMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', `/api/products/${selectedProduct}/features`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Feature created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
      setIsCreateFeatureOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create feature",
        variant: "destructive" 
      });
    }
  });

  // Update feature mutation
  const updateFeatureMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest('PUT', `/api/products/${selectedProduct}/features/${id}`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Feature updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
      setEditingFeature(null);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update feature",
        variant: "destructive" 
      });
    }
  });

  // Delete feature mutation
  const deleteFeatureMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/products/${selectedProduct}/features/${id}`),
    onSuccess: () => {
      toast({ title: "Success", description: "Feature deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete feature",
        variant: "destructive" 
      });
    }
  });

  // Toggle feature activation
  const toggleFeatureMutation = useMutation({
    mutationFn: async ({ featureId, isActive }: { featureId: number; isActive: boolean }) => {
      return apiRequest('PUT', `/api/products/features/${featureId}`, { isIncluded: isActive });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Feature updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update feature",
        variant: "destructive" 
      });
    }
  });

  // Filter products by selected category
  const filteredProducts = products.filter((productWrapper: any) => {
    const product = productWrapper.product || productWrapper;
    const category = productWrapper.category;
    return selectedCategory && selectedCategory !== 'all' ? category?.id.toString() === selectedCategory : true;
  });

  // Get selected product details
  const selectedProductDetails = products.find((p: any) => {
    const product = p.product || p;
    return product.id.toString() === selectedProduct;
  });

  const handleFeatureToggle = (featureId: number, currentStatus: boolean) => {
    toggleFeatureMutation.mutate({
      featureId,
      isActive: !currentStatus
    });
  };

  return (
    <div className="space-y-6">
      {/* Category and Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Features & Pricing Management
          </CardTitle>
          <CardDescription>
            Select a category and product to manage features and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Selection */}
            <div>
              <Label htmlFor="category-select">Select Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Selection */}
            <div>
              <Label htmlFor="product-select">Select Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product" />
                </SelectTrigger>
                <SelectContent>
                  {filteredProducts.map((productWrapper: any) => {
                    const product = productWrapper.product || productWrapper;
                    const category = productWrapper.category;
                    return (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} ({category?.name || 'No Category'})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details and Pricing */}
      {selectedProductDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Details & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium">Product Name</Label>
                <p className="text-sm text-muted-foreground">{selectedProductDetails.product?.name || selectedProductDetails.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Category</Label>
                <p className="text-sm text-muted-foreground">{selectedProductDetails.category?.name || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Base Price</Label>
                <p className="text-sm text-muted-foreground font-semibold">
                  KES {parseFloat(selectedProductDetails.product?.basePrice || selectedProductDetails.basePrice || '0').toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Billing Type</Label>
                <Badge variant="outline">
                  {(selectedProductDetails.product?.billingType || selectedProductDetails.billingType || 'per_period').replace('_', ' ')}
                </Badge>
              </div>
            </div>
            {selectedProductDetails.product?.description || selectedProductDetails.description && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedProductDetails.product?.description || selectedProductDetails.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Product Features */}
      {selectedProduct && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Product Features
              </div>
              <Button onClick={() => setIsCreateFeatureOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Feature
              </Button>
            </CardTitle>
            <CardDescription>
              Manage features for {selectedProductDetails?.product?.name || selectedProductDetails?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {featuresLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading features...</p>
              </div>
            ) : productFeatures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productFeatures.map((feature: any) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {feature.isIncluded ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium text-sm">{feature.name}</span>
                      </div>
                      <Switch
                        checked={feature.isIncluded}
                        onCheckedChange={() => handleFeatureToggle(feature.id, feature.isIncluded)}
                        disabled={toggleFeatureMutation.isPending}
                      />
                    </div>
                    
                    {feature.description && (
                      <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                    )}
                    
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {feature.limitType === 'unlimited' && 'Unlimited usage'}
                        {feature.limitType === 'count' && `Limit: ${feature.limitValue} items`}
                        {feature.limitType === 'duration' && `Duration: ${feature.limitDuration} days`}
                        {feature.limitType === 'size' && `Size: ${feature.limitSize} MB`}
                        {feature.limitType === 'frequency' && `${feature.limitFrequency} times per ${feature.frequencyPeriod || 24} hours`}
                        {feature.limitType === 'concurrent' && `${feature.limitValue} concurrent`}
                        {feature.limitType === 'boolean' && 'Yes/No feature'}
                      </div>
                      
                      {feature.additionalCost && parseFloat(feature.additionalCost) > 0 && (
                        <div className="text-xs font-medium text-green-600">
                          Additional Cost: +KES {parseFloat(feature.additionalCost).toLocaleString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingFeature(feature)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteFeatureMutation.mutate(feature.id)}
                        disabled={deleteFeatureMutation.isPending}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No features found for this product</p>
                <p className="text-sm">Create features to manage them here</p>
                <Button 
                  onClick={() => setIsCreateFeatureOpen(true)}
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Feature
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Create Feature Dialog */}
      <Dialog open={isCreateFeatureOpen} onOpenChange={setIsCreateFeatureOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Feature</DialogTitle>
          </DialogHeader>
          <FeatureForm
            onSubmit={(data) => createFeatureMutation.mutate(data)}
            isLoading={createFeatureMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Feature Dialog */}
      <Dialog open={!!editingFeature} onOpenChange={() => setEditingFeature(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
          </DialogHeader>
          {editingFeature && (
            <FeatureForm
              defaultValues={editingFeature}
              onSubmit={(data) => updateFeatureMutation.mutate({ id: editingFeature.id, data })}
              isLoading={updateFeatureMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {!selectedProduct && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
            <p className="text-muted-foreground">Select a product to manage its features and pricing</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Feature Management Wrapper Component
function FeatureManagementWrapper() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  
  // Fetch all products for the dropdown
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });

  const selectedProductDetails = products.find((p: any) => {
    const product = p.product || p;
    return product.id.toString() === selectedProduct;
  });

  return (
    <div className="space-y-6">
      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Product</CardTitle>
          <CardDescription>Choose a product to manage its features with comprehensive constraints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="product-select">Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((item: any) => {
                    const product = item.product || item;
                    const category = item.category || null;
                    return (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} {category && `(${category.name})`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      {selectedProductDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-muted-foreground">{selectedProductDetails.product?.name || selectedProductDetails.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Category</Label>
                <p className="text-sm text-muted-foreground">{selectedProductDetails.category?.name || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Base Price</Label>
                <p className="text-sm text-muted-foreground">
                  KES {parseFloat(selectedProductDetails.product?.basePrice || selectedProductDetails.basePrice || '0').toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Billing Type</Label>
                <p className="text-sm text-muted-foreground capitalize">
                  {(selectedProductDetails.product?.billingType || selectedProductDetails.billingType || 'per_period').replace('_', ' ')}
                </p>
              </div>
            </div>
            {selectedProductDetails.product?.description || selectedProductDetails.description && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedProductDetails.product?.description || selectedProductDetails.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Feature Management */}
      {selectedProduct && (
        <FeatureManagement productId={parseInt(selectedProduct)} />
      )}

      {/* No Product Selected */}
      {!selectedProduct && (
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Select a product to manage its features</p>
            <p className="text-sm text-muted-foreground">
              Create and define features with various constraint types including count, duration, size, frequency, concurrent, and boolean limits.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}