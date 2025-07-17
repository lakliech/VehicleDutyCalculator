import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Settings, Clock, Hash, HardDrive, Repeat, Users, Check, X } from "lucide-react";

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

interface FeatureManagementProps {
  productId: number;
}

export function FeatureManagement({ productId }: FeatureManagementProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch product features
  const { data: features = [], isLoading } = useQuery({
    queryKey: ['product-features', productId],
    queryFn: () => apiRequest('GET', `/api/products/${productId}/features`),
  });

  // Create feature mutation
  const createFeatureMutation = useMutation({
    mutationFn: (data: FeatureConstraint) => 
      apiRequest('POST', `/api/products/${productId}/features`, data),
    onSuccess: () => {
      toast({
        title: "Feature created",
        description: "Feature has been created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['product-features', productId] });
      setIsCreateOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error creating feature",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update feature mutation
  const updateFeatureMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FeatureConstraint }) => 
      apiRequest('PUT', `/api/products/${productId}/features/${id}`, data),
    onSuccess: () => {
      toast({
        title: "Feature updated",
        description: "Feature has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['product-features', productId] });
      setEditingFeature(null);
    },
    onError: (error) => {
      toast({
        title: "Error updating feature",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete feature mutation
  const deleteFeatureMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/products/${productId}/features/${id}`),
    onSuccess: () => {
      toast({
        title: "Feature deleted",
        description: "Feature has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['product-features', productId] });
    },
    onError: (error) => {
      toast({
        title: "Error deleting feature",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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

  const getLimitTypeColor = (type: string) => {
    switch (type) {
      case 'count': return 'bg-blue-100 text-blue-800';
      case 'duration': return 'bg-green-100 text-green-800';
      case 'size': return 'bg-yellow-100 text-yellow-800';
      case 'frequency': return 'bg-purple-100 text-purple-800';
      case 'concurrent': return 'bg-orange-100 text-orange-800';
      case 'boolean': return 'bg-teal-100 text-teal-800';
      case 'unlimited': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLimitDescription = (feature: any) => {
    switch (feature.limitType) {
      case 'count':
        return `${feature.limitValue || 0} uses`;
      case 'duration':
        return `${feature.limitDuration || 0} days`;
      case 'size':
        return `${feature.limitSize || 0} MB`;
      case 'frequency':
        return `${feature.limitFrequency || 0} times per ${feature.frequencyPeriod || 24} hours`;
      case 'concurrent':
        return `${feature.limitValue || 0} concurrent`;
      case 'boolean':
        return 'Yes/No feature';
      case 'unlimited':
        return 'No limits';
      default:
        return 'Custom';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feature Management</h2>
          <p className="text-gray-600">Define and manage product features with constraints</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Feature
            </Button>
          </DialogTrigger>
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
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature: any) => (
          <Card key={feature.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getLimitTypeIcon(feature.limitType)}
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </div>
                <Badge className={getLimitTypeColor(feature.limitType)}>
                  {feature.limitType}
                </Badge>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Limit:</span>
                  <span className="font-medium">{formatLimitDescription(feature)}</span>
                </div>
                
                {feature.additionalCost > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Additional Cost:</span>
                    <span className="font-medium">KES {feature.additionalCost}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={feature.isIncluded ? "default" : "secondary"}>
                    {feature.isIncluded ? "Included" : "Add-on"}
                  </Badge>
                </div>
                
                <div className="flex gap-2 pt-2">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Feature Dialog */}
      <Dialog open={!!editingFeature} onOpenChange={() => setEditingFeature(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
          </DialogHeader>
          {editingFeature && (
            <FeatureForm
              defaultValues={editingFeature}
              onSubmit={(data) => 
                updateFeatureMutation.mutate({ id: editingFeature.id, data })
              }
              isLoading={updateFeatureMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
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
                <Textarea 
                  placeholder="Describe this feature and its constraints..."
                  {...field}
                  value={field.value || ""}
                />
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                <FormLabel>Duration Limit (days)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 30"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {limitType === 'frequency' && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="limitFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency Limit</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 3"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 24)}
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="isIncluded"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Included in plan</FormLabel>
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Order</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Feature"}
          </Button>
        </div>
      </form>
    </Form>
  );
}