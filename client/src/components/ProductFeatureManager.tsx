import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Settings,
  Hash,
  Clock,
  HardDrive,
  Repeat,
  Users,
  Check,
  X,
  AlertCircle
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  basePrice: string;
  billingType: string;
  category?: {
    name: string;
  };
};

type SystemFeature = {
  id: number;
  name: string;
  description: string;
  capability: string;
  limitType: string;
  isActive: boolean;
};

type ProductFeatureAssociation = {
  id: number;
  productId: number;
  featureId: number;
  limitValue?: number;
  limitDuration?: number;
  limitSize?: number;
  limitFrequency?: number;
  frequencyPeriod?: number;
  isIncluded: boolean;
  additionalCost: string;
  feature: SystemFeature;
};

export default function ProductFeatureManager() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  const [editingAssociation, setEditingAssociation] = useState<ProductFeatureAssociation | null>(null);
  const [featureForm, setFeatureForm] = useState({
    featureId: "",
    limitValue: 0,
    limitDuration: 0,
    limitSize: 0,
    limitFrequency: 0,
    frequencyPeriod: 24,
    isIncluded: true,
    additionalCost: "0"
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products/admin/products'],
    queryFn: async () => {
      const response = await fetch('/api/products/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  // Fetch system features
  const { data: systemFeatures = [], isLoading: featuresLoading } = useQuery({
    queryKey: ['/api/products/features'],
    queryFn: async () => {
      const response = await fetch('/api/products/features');
      if (!response.ok) throw new Error('Failed to fetch system features');
      return response.json();
    }
  });

  // Fetch product feature associations
  const { data: productFeatures = [], isLoading: productFeaturesLoading } = useQuery({
    queryKey: ['/api/products', selectedProduct, 'features'],
    queryFn: async () => {
      if (!selectedProduct) return [];
      const response = await fetch(`/api/products/${selectedProduct}/features`);
      if (!response.ok) throw new Error('Failed to fetch product features');
      return response.json();
    },
    enabled: !!selectedProduct
  });

  // Add feature to product mutation
  const addFeatureMutation = useMutation({
    mutationFn: (data: any) => {
      return apiRequest('POST', `/api/products/${selectedProduct}/features`, data);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Feature added to product successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
      setIsAddFeatureOpen(false);
      resetFeatureForm();
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to add feature to product",
        variant: "destructive" 
      });
    }
  });

  // Update feature association mutation
  const updateAssociationMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest('PUT', `/api/products/${selectedProduct}/features/${id}`, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Feature configuration updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
      setEditingAssociation(null);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update feature configuration",
        variant: "destructive" 
      });
    }
  });

  // Remove feature from product mutation
  const removeFeatureMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/products/${selectedProduct}/features/${id}`),
    onSuccess: () => {
      toast({ title: "Success", description: "Feature removed from product successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', selectedProduct, 'features'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to remove feature from product",
        variant: "destructive" 
      });
    }
  });

  const resetFeatureForm = () => {
    setFeatureForm({
      featureId: "",
      limitValue: 0,
      limitDuration: 0,
      limitSize: 0,
      limitFrequency: 0,
      frequencyPeriod: 24,
      isIncluded: true,
      additionalCost: "0"
    });
  };

  const handleAddFeature = () => {
    if (!featureForm.featureId) {
      toast({ title: "Error", description: "Please select a feature", variant: "destructive" });
      return;
    }

    const selectedFeature = systemFeatures.find((f: SystemFeature) => f.id.toString() === featureForm.featureId);
    if (!selectedFeature) return;

    const constraintData: any = {
      featureId: parseInt(featureForm.featureId),
      isIncluded: featureForm.isIncluded,
      additionalCost: featureForm.additionalCost
    };

    // Add relevant constraint based on feature limit type
    switch (selectedFeature.limitType) {
      case 'count':
        constraintData.limitValue = featureForm.limitValue;
        break;
      case 'duration':
        constraintData.limitDuration = featureForm.limitDuration;
        break;
      case 'size':
        constraintData.limitSize = featureForm.limitSize;
        break;
      case 'frequency':
        constraintData.limitFrequency = featureForm.limitFrequency;
        constraintData.frequencyPeriod = featureForm.frequencyPeriod;
        break;
    }

    addFeatureMutation.mutate(constraintData);
  };

  const handleUpdateAssociation = () => {
    if (!editingAssociation) return;

    const selectedFeature = systemFeatures.find((f: SystemFeature) => f.id === editingAssociation.featureId);
    if (!selectedFeature) return;

    const constraintData: any = {
      isIncluded: editingAssociation.isIncluded,
      additionalCost: editingAssociation.additionalCost
    };

    // Add relevant constraint based on feature limit type
    switch (selectedFeature.limitType) {
      case 'count':
        constraintData.limitValue = editingAssociation.limitValue;
        break;
      case 'duration':
        constraintData.limitDuration = editingAssociation.limitDuration;
        break;
      case 'size':
        constraintData.limitSize = editingAssociation.limitSize;
        break;
      case 'frequency':
        constraintData.limitFrequency = editingAssociation.limitFrequency;
        constraintData.frequencyPeriod = editingAssociation.frequencyPeriod;
        break;
    }

    updateAssociationMutation.mutate({ id: editingAssociation.id, data: constraintData });
  };

  const getLimitTypeIcon = (type: string) => {
    switch (type) {
      case 'count': return <Hash className="h-4 w-4" />;
      case 'duration': return <Clock className="h-4 w-4" />;
      case 'size': return <HardDrive className="h-4 w-4" />;
      case 'frequency': return <Repeat className="h-4 w-4" />;
      case 'concurrent': return <Users className="h-4 w-4" />;
      case 'boolean': return <Check className="h-4 w-4" />;
      case 'unlimited': return <X className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const formatConstraintValue = (association: ProductFeatureAssociation) => {
    const { feature } = association;
    switch (feature.limitType) {
      case 'count':
        return `${association.limitValue || 0} uses`;
      case 'duration':
        return `${association.limitDuration || 0} days`;
      case 'size':
        return `${association.limitSize || 0} MB`;
      case 'frequency':
        return `${association.limitFrequency || 0} times per ${association.frequencyPeriod || 24}h`;
      case 'boolean':
        return 'Yes/No';
      case 'unlimited':
        return 'Unlimited';
      default:
        return 'Custom';
    }
  };

  const selectedProductDetails = products.find((p: any) => {
    const product = p.product || p;
    return product.id.toString() === selectedProduct;
  });

  const availableFeatures = systemFeatures.filter((feature: SystemFeature) => 
    feature.isActive && !productFeatures.some((pf: ProductFeatureAssociation) => pf.featureId === feature.id)
  );

  return (
    <div className="space-y-6">
      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Product Feature Management</CardTitle>
          <CardDescription>
            Configure features for products with product-specific constraints and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="product-select">Select Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product to manage features" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((item: any) => {
                    const product = item.product || item;
                    const category = item.category || null;
                    return (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          {product.name} {category && `(${category.name})`}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Product Details */}
            {selectedProductDetails && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Product</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedProductDetails.product?.name || selectedProductDetails.name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedProductDetails.category?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Base Price</Label>
                    <p className="text-sm text-muted-foreground">
                      KES {parseFloat(selectedProductDetails.product?.basePrice || selectedProductDetails.basePrice || '0').toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Billing</Label>
                    <p className="text-sm text-muted-foreground capitalize">
                      {(selectedProductDetails.product?.billingType || selectedProductDetails.billingType || 'per_period').replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Features Management */}
      {selectedProduct && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Product Features</CardTitle>
                <CardDescription>
                  Features configured for this product with specific constraints
                </CardDescription>
              </div>
              <Dialog open={isAddFeatureOpen} onOpenChange={setIsAddFeatureOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Feature to Product</DialogTitle>
                    <DialogDescription>
                      Select a system feature and configure product-specific constraints
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="feature-select">System Feature</Label>
                      <Select value={featureForm.featureId} onValueChange={(value) => setFeatureForm({ ...featureForm, featureId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a feature to add" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFeatures.map((feature: SystemFeature) => (
                            <SelectItem key={feature.id} value={feature.id.toString()}>
                              <div className="flex items-center gap-2">
                                {getLimitTypeIcon(feature.limitType)}
                                <div>
                                  <div className="font-medium">{feature.name}</div>
                                  <div className="text-sm text-muted-foreground">{feature.capability}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Constraint Configuration */}
                    {featureForm.featureId && (() => {
                      const selectedFeature = systemFeatures.find((f: SystemFeature) => f.id.toString() === featureForm.featureId);
                      if (!selectedFeature) return null;

                      return (
                        <div className="space-y-4 p-4 border rounded-lg">
                          <Label className="text-base font-medium">Product-Specific Constraints</Label>
                          
                          {selectedFeature.limitType === 'count' && (
                            <div>
                              <Label htmlFor="limit-value">Count Limit</Label>
                              <Input
                                id="limit-value"
                                type="number"
                                value={featureForm.limitValue}
                                onChange={(e) => setFeatureForm({ ...featureForm, limitValue: parseInt(e.target.value) || 0 })}
                                placeholder="e.g., 5 for 5 photos"
                              />
                            </div>
                          )}

                          {selectedFeature.limitType === 'duration' && (
                            <div>
                              <Label htmlFor="limit-duration">Duration Limit (days)</Label>
                              <Input
                                id="limit-duration"
                                type="number"
                                value={featureForm.limitDuration}
                                onChange={(e) => setFeatureForm({ ...featureForm, limitDuration: parseInt(e.target.value) || 0 })}
                                placeholder="e.g., 30 for 30 days"
                              />
                            </div>
                          )}

                          {selectedFeature.limitType === 'size' && (
                            <div>
                              <Label htmlFor="limit-size">Size Limit (MB)</Label>
                              <Input
                                id="limit-size"
                                type="number"
                                value={featureForm.limitSize}
                                onChange={(e) => setFeatureForm({ ...featureForm, limitSize: parseInt(e.target.value) || 0 })}
                                placeholder="e.g., 10 for 10MB max"
                              />
                            </div>
                          )}

                          {selectedFeature.limitType === 'frequency' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="limit-frequency">Frequency Limit</Label>
                                <Input
                                  id="limit-frequency"
                                  type="number"
                                  value={featureForm.limitFrequency}
                                  onChange={(e) => setFeatureForm({ ...featureForm, limitFrequency: parseInt(e.target.value) || 0 })}
                                  placeholder="e.g., 3 times"
                                />
                              </div>
                              <div>
                                <Label htmlFor="frequency-period">Period (hours)</Label>
                                <Input
                                  id="frequency-period"
                                  type="number"
                                  value={featureForm.frequencyPeriod}
                                  onChange={(e) => setFeatureForm({ ...featureForm, frequencyPeriod: parseInt(e.target.value) || 24 })}
                                  placeholder="e.g., 24 for per day"
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="is-included"
                              checked={featureForm.isIncluded}
                              onCheckedChange={(checked) => setFeatureForm({ ...featureForm, isIncluded: checked })}
                            />
                            <Label htmlFor="is-included">Included in base price</Label>
                          </div>

                          {!featureForm.isIncluded && (
                            <div>
                              <Label htmlFor="additional-cost">Additional Cost (KES)</Label>
                              <Input
                                id="additional-cost"
                                value={featureForm.additionalCost}
                                onChange={(e) => setFeatureForm({ ...featureForm, additionalCost: e.target.value })}
                                placeholder="0.00"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddFeatureOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddFeature} disabled={addFeatureMutation.isPending}>
                      {addFeatureMutation.isPending ? "Adding..." : "Add Feature"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {productFeaturesLoading ? (
              <div className="text-center py-8">Loading features...</div>
            ) : productFeatures.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No features configured</p>
                <p className="text-sm text-muted-foreground">
                  Add features to this product with specific constraints and pricing.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Capability</TableHead>
                    <TableHead>Constraint</TableHead>
                    <TableHead>Pricing</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productFeatures.map((association: ProductFeatureAssociation) => (
                    <TableRow key={association.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getLimitTypeIcon(association.feature.limitType)}
                          <div>
                            <div className="font-medium">{association.feature.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {association.feature.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{association.feature.capability}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{formatConstraintValue(association)}</Badge>
                      </TableCell>
                      <TableCell>
                        {association.isIncluded ? (
                          <Badge variant="default">Included</Badge>
                        ) : (
                          <Badge variant="outline">
                            +KES {parseFloat(association.additionalCost).toLocaleString()}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={association.feature.isActive ? "default" : "secondary"}>
                          {association.feature.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingAssociation(association)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFeatureMutation.mutate(association.id)}
                            disabled={removeFeatureMutation.isPending}
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
      )}

      {/* Edit Feature Association Dialog */}
      <Dialog open={!!editingAssociation} onOpenChange={() => setEditingAssociation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Feature Configuration</DialogTitle>
            <DialogDescription>
              Modify the product-specific constraints and pricing for this feature
            </DialogDescription>
          </DialogHeader>
          {editingAssociation && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getLimitTypeIcon(editingAssociation.feature.limitType)}
                  <span className="font-medium">{editingAssociation.feature.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{editingAssociation.feature.description}</p>
              </div>

              <div className="space-y-4 p-4 border rounded-lg">
                <Label className="text-base font-medium">Product-Specific Constraints</Label>
                
                {editingAssociation.feature.limitType === 'count' && (
                  <div>
                    <Label htmlFor="edit-limit-value">Count Limit</Label>
                    <Input
                      id="edit-limit-value"
                      type="number"
                      value={editingAssociation.limitValue || 0}
                      onChange={(e) => setEditingAssociation({ 
                        ...editingAssociation, 
                        limitValue: parseInt(e.target.value) || 0 
                      })}
                    />
                  </div>
                )}

                {editingAssociation.feature.limitType === 'duration' && (
                  <div>
                    <Label htmlFor="edit-limit-duration">Duration Limit (days)</Label>
                    <Input
                      id="edit-limit-duration"
                      type="number"
                      value={editingAssociation.limitDuration || 0}
                      onChange={(e) => setEditingAssociation({ 
                        ...editingAssociation, 
                        limitDuration: parseInt(e.target.value) || 0 
                      })}
                    />
                  </div>
                )}

                {editingAssociation.feature.limitType === 'size' && (
                  <div>
                    <Label htmlFor="edit-limit-size">Size Limit (MB)</Label>
                    <Input
                      id="edit-limit-size"
                      type="number"
                      value={editingAssociation.limitSize || 0}
                      onChange={(e) => setEditingAssociation({ 
                        ...editingAssociation, 
                        limitSize: parseInt(e.target.value) || 0 
                      })}
                    />
                  </div>
                )}

                {editingAssociation.feature.limitType === 'frequency' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-limit-frequency">Frequency Limit</Label>
                      <Input
                        id="edit-limit-frequency"
                        type="number"
                        value={editingAssociation.limitFrequency || 0}
                        onChange={(e) => setEditingAssociation({ 
                          ...editingAssociation, 
                          limitFrequency: parseInt(e.target.value) || 0 
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-frequency-period">Period (hours)</Label>
                      <Input
                        id="edit-frequency-period"
                        type="number"
                        value={editingAssociation.frequencyPeriod || 24}
                        onChange={(e) => setEditingAssociation({ 
                          ...editingAssociation, 
                          frequencyPeriod: parseInt(e.target.value) || 24 
                        })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-is-included"
                    checked={editingAssociation.isIncluded}
                    onCheckedChange={(checked) => setEditingAssociation({ 
                      ...editingAssociation, 
                      isIncluded: checked 
                    })}
                  />
                  <Label htmlFor="edit-is-included">Included in base price</Label>
                </div>

                {!editingAssociation.isIncluded && (
                  <div>
                    <Label htmlFor="edit-additional-cost">Additional Cost (KES)</Label>
                    <Input
                      id="edit-additional-cost"
                      value={editingAssociation.additionalCost}
                      onChange={(e) => setEditingAssociation({ 
                        ...editingAssociation, 
                        additionalCost: e.target.value 
                      })}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAssociation(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAssociation} disabled={updateAssociationMutation.isPending}>
              {updateAssociationMutation.isPending ? "Updating..." : "Update Configuration"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* No Product Selected */}
      {!selectedProduct && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Select a product to manage features</p>
            <p className="text-sm text-muted-foreground">
              Configure features for products with specific constraints and pricing at the product level.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}