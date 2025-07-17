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
};

type CategoryForm = {
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
};

export default function ProductCatalogManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Dialog states
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);

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
    features: []
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
        features: []
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
      categoryId: parseInt(productForm.categoryId),
      basePrice: parseFloat(productForm.basePrice)
    };
    
    createProductMutation.mutate(productData);
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
          <FeaturesAndPricingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Features and Pricing Management Component
function FeaturesAndPricingManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');

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
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Product Features
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
                      </div>
                      
                      {feature.additionalCost && parseFloat(feature.additionalCost) > 0 && (
                        <div className="text-xs font-medium text-green-600">
                          Additional Cost: +KES {parseFloat(feature.additionalCost).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No features found for this product</p>
                <p className="text-sm">Add features to this product to manage them here</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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