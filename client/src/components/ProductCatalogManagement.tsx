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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Tags, 
  DollarSign,
  Settings,
  Users,
  Target,
  Calendar,
  Clock,
  Hash
} from "lucide-react";

interface ProductCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  basePrice: string;
  billingType: string;
  targetUsers: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: number;
    name: string;
  };
  pricing?: Array<{
    id: number;
    tierName: string;
    price: string;
    billingCycle: number | null;
    minQuantity: number;
    maxQuantity: number | null;
    discountPercentage: string;
    isActive: boolean;
  }>;
}

interface ProductFeature {
  id: number;
  productId: number;
  name: string;
  description: string;
  limitType: 'duration' | 'count' | 'unlimited';
  limitValue: number | null;
  limitDuration: number | null;
  isIncluded: boolean;
  additionalCost: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function ProductCatalogManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/products/categories'],
    queryFn: () => fetch('/api/products/categories').then(res => res.json())
  });

  // Fetch all products (admin)
  const { data: productsResponse, isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products/admin/products'],
    queryFn: () => fetch('/api/products/admin/products').then(res => res.json())
  });

  // Ensure categories and products are arrays
  const categories = Array.isArray(categoriesResponse) ? categoriesResponse : [];
  const products = Array.isArray(productsResponse) ? productsResponse : [];

  // State for forms
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    isActive: true,
    sortOrder: 0
  });

  const [productForm, setProductForm] = useState({
    categoryId: '',
    name: '',
    description: '',
    basePrice: '',
    billingType: 'per_period',
    targetUsers: '',
    isActive: true,
    sortOrder: 0
  });

  const [featureForm, setFeatureForm] = useState({
    productId: '',
    name: '',
    description: '',
    limitType: 'unlimited',
    limitValue: '',
    limitDuration: '',
    isIncluded: true,
    additionalCost: '0',
    sortOrder: 0
  });

  // Dialog states
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showFeatureDialog, setShowFeatureDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/products/admin/categories', data),
    onSuccess: () => {
      toast({ title: "Success", description: "Category created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products/categories'] });
      setShowCategoryDialog(false);
      setCategoryForm({ name: '', description: '', isActive: true, sortOrder: 0 });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.details?.[0]?.message || "Failed to create category",
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
        sortOrder: 0
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.details?.[0]?.message || "Failed to create product",
        variant: "destructive" 
      });
    }
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/products/admin/categories/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Category deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products/categories'] });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to delete category",
        variant: "destructive" 
      });
    }
  });

  const handleCreateCategory = () => {
    if (!categoryForm.name.trim()) {
      toast({ 
        title: "Error", 
        description: "Category name is required",
        variant: "destructive" 
      });
      return;
    }

    createCategoryMutation.mutate({
      ...categoryForm,
      sortOrder: parseInt(categoryForm.sortOrder.toString()) || 0
    });
  };

  const handleCreateProduct = () => {
    if (!productForm.name.trim() || !productForm.categoryId || !productForm.basePrice) {
      toast({ 
        title: "Error", 
        description: "Product name, category, and base price are required",
        variant: "destructive" 
      });
      return;
    }

    createProductMutation.mutate({
      ...productForm,
      categoryId: parseInt(productForm.categoryId),
      basePrice: parseFloat(productForm.basePrice).toString(),
      sortOrder: parseInt(productForm.sortOrder.toString()) || 0
    });
  };

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
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Product</DialogTitle>
                      <DialogDescription>
                        Add a new product with pricing and billing model
                      </DialogDescription>
                    </DialogHeader>
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
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
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
          <Card>
            <CardHeader>
              <CardTitle>Features & Pricing Management</CardTitle>
              <CardDescription>Configure product features, limits, and pricing tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Feature and pricing management coming soon...</p>
                <p className="text-sm">This section will allow you to:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Configure product features with usage limits</li>
                  <li>• Set up pricing tiers and billing cycles</li>
                  <li>• Manage user subscriptions and usage tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}