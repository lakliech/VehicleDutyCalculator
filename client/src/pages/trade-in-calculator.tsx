import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ModuleNavigation } from '@/components/module-navigation';
import { apiRequest } from '@/lib/queryClient';
import { tradeInEvaluationSchema, type InsertTradeInEvaluation } from '@shared/schema';
import { 
  Car, 
  Calculator, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Banknote,
  Camera,
  FileText,
  MapPin,
  Clock,
  Wrench,
  Shield
} from 'lucide-react';

interface TradeInResult {
  evaluationNumber: string;
  marketValue: number;
  tradeInValue: number;
  privatePartyValue: number;
  dealerRetailValue: number;
  depreciationFactor: number;
  conditionAdjustment: number;
  mileageAdjustment: number;
  marketDemandFactor: number;
  factorsBreakdown: {
    baseValue: number;
    depreciationDeduction: number;
    conditionAdjustment: number;
    mileageAdjustment: number;
    marketAdjustment: number;
  };
}

export default function TradeInCalculator() {
  const { toast } = useToast();
  const [evaluationResult, setEvaluationResult] = useState<TradeInResult | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<InsertTradeInEvaluation>({
    resolver: zodResolver(tradeInEvaluationSchema),
    defaultValues: {
      make: '',
      model: '',
      year: new Date().getFullYear() - 5,
      mileage: 0,
      engineSize: 0,
      fuelType: 'petrol',
      transmission: 'manual',
      bodyType: 'sedan',
      exteriorColor: '',
      condition: 'good',
      hasAccidents: false,
      accidentDetails: '',
      serviceHistory: 'partial',
      hasModifications: false,
      modificationDetails: '',
      hasDefects: false,
      defectDetails: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      location: '',
      images: [],
    },
  });

  // Submit trade-in evaluation
  const submitEvaluation = useMutation({
    mutationFn: (data: InsertTradeInEvaluation) =>
      apiRequest('post', '/api/financial/trade-in-evaluation', data),
    onSuccess: (data: TradeInResult) => {
      setEvaluationResult(data);
      toast({
        title: "Evaluation Complete",
        description: `Your vehicle evaluation has been completed. Reference: ${data.evaluationNumber}`,
      });
    },
    onError: () => {
      toast({
        title: "Evaluation Failed",
        description: "Failed to complete vehicle evaluation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTradeInEvaluation) => {
    const evaluationData = {
      ...data,
      images: uploadedImages,
    };
    submitEvaluation.mutate(evaluationData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Simulate image upload - in real implementation, upload to cloud storage
    const newImages = Array.from(files).map((file, index) => 
      `https://example.com/uploads/${Date.now()}_${index}_${file.name}`
    );
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade-In Value Calculator</h1>
          <p className="text-gray-600">Get an accurate estimate of your vehicle's trade-in value based on current market conditions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Evaluation Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-purple-600" />
                  Vehicle Information
                </CardTitle>
                <CardDescription>
                  Provide accurate details about your vehicle for precise valuation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Vehicle Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="make"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Make</FormLabel>
                              <FormControl>
                                <Input placeholder="Toyota" {...field} />
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
                                <Input placeholder="Camry" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="2019" 
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
                          name="mileage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mileage (KM)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="80000" 
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
                          name="engineSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Engine Size (CC)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="2000" 
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
                          name="fuelType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fuel Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select fuel type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="petrol">Petrol</SelectItem>
                                  <SelectItem value="diesel">Diesel</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                  <SelectItem value="electric">Electric</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="transmission"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transmission</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select transmission" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="automatic">Automatic</SelectItem>
                                  <SelectItem value="cvt">CVT</SelectItem>
                                </SelectContent>
                              </Select>
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select body type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sedan">Sedan</SelectItem>
                                  <SelectItem value="hatchback">Hatchback</SelectItem>
                                  <SelectItem value="suv">SUV</SelectItem>
                                  <SelectItem value="wagon">Wagon</SelectItem>
                                  <SelectItem value="coupe">Coupe</SelectItem>
                                  <SelectItem value="pickup">Pickup</SelectItem>
                                  <SelectItem value="van">Van</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="exteriorColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exterior Color</FormLabel>
                              <FormControl>
                                <Input placeholder="White" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Vehicle Condition */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle Condition</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Overall Condition</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="excellent">Excellent - Like new, minimal wear</SelectItem>
                                  <SelectItem value="good">Good - Well maintained, minor signs of use</SelectItem>
                                  <SelectItem value="fair">Fair - Average condition, some wear and issues</SelectItem>
                                  <SelectItem value="poor">Poor - Significant wear, major issues</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="serviceHistory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service History</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select service history" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="complete">Complete - Full service records</SelectItem>
                                    <SelectItem value="partial">Partial - Some service records</SelectItem>
                                    <SelectItem value="none">None - No service records</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Condition Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="hasAccidents"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Has been in accidents
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hasModifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Has modifications/upgrades
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hasDefects"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Has defects/issues
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Conditional Detail Fields */}
                        {form.watch('hasAccidents') && (
                          <FormField
                            control={form.control}
                            name="accidentDetails"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Accident Details</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe the accident history and any repairs made..."
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {form.watch('hasModifications') && (
                          <FormField
                            control={form.control}
                            name="modificationDetails"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Modification Details</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe any modifications, upgrades, or aftermarket parts..."
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {form.watch('hasDefects') && (
                          <FormField
                            control={form.control}
                            name="defectDetails"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Defect Details</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe any known issues, defects, or required repairs..."
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Vehicle Photos */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle Photos</h3>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Upload Vehicle Photos</p>
                            <p className="text-xs text-gray-500">
                              Include exterior, interior, engine bay, and any damage photos
                            </p>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                          </div>
                        </div>
                        
                        {uploadedImages.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`Vehicle photo ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="ownerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Owner Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ownerPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="0712345678" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ownerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Nairobi, Kenya" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitEvaluation.isPending}
                      className="w-full flex items-center gap-2"
                    >
                      <Calculator className="h-4 w-4" />
                      Get Trade-In Valuation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Evaluation Results */}
            {evaluationResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Valuation Results
                  </CardTitle>
                  <CardDescription>
                    Reference: {evaluationResult.evaluationNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 mb-1">Trade-In Value</p>
                      <p className="text-2xl font-bold text-green-800">
                        KES {evaluationResult.tradeInValue.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Value:</span>
                        <span className="font-semibold">
                          KES {evaluationResult.marketValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Private Party:</span>
                        <span className="font-semibold">
                          KES {evaluationResult.privatePartyValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dealer Retail:</span>
                        <span className="font-semibold">
                          KES {evaluationResult.dealerRetailValue.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Value Factors</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base Value:</span>
                          <span>KES {evaluationResult.factorsBreakdown.baseValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Depreciation:</span>
                          <span>-KES {evaluationResult.factorsBreakdown.depreciationDeduction.toLocaleString()}</span>
                        </div>
                        <div className={`flex justify-between ${evaluationResult.factorsBreakdown.conditionAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span>Condition:</span>
                          <span>
                            {evaluationResult.factorsBreakdown.conditionAdjustment >= 0 ? '+' : ''}
                            KES {evaluationResult.factorsBreakdown.conditionAdjustment.toLocaleString()}
                          </span>
                        </div>
                        <div className={`flex justify-between ${evaluationResult.factorsBreakdown.mileageAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span>Mileage:</span>
                          <span>
                            {evaluationResult.factorsBreakdown.mileageAdjustment >= 0 ? '+' : ''}
                            KES {evaluationResult.factorsBreakdown.mileageAdjustment.toLocaleString()}
                          </span>
                        </div>
                        <div className={`flex justify-between ${evaluationResult.factorsBreakdown.marketAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span>Market Demand:</span>
                          <span>
                            {evaluationResult.factorsBreakdown.marketAdjustment >= 0 ? '+' : ''}
                            KES {evaluationResult.factorsBreakdown.marketAdjustment.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Valuation Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Maximize Your Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Service Records</p>
                      <p className="text-xs text-gray-600">Complete maintenance history adds value</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Camera className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Quality Photos</p>
                      <p className="text-xs text-gray-600">Clear, well-lit photos improve assessment</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Honest Assessment</p>
                      <p className="text-xs text-gray-600">Accurate condition details ensure fair pricing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Documentation</p>
                      <p className="text-xs text-gray-600">Original papers increase value</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                    <div>
                      <p className="font-semibold text-sm">Enter Details</p>
                      <p className="text-xs text-gray-600">Provide vehicle information and condition</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                    <div>
                      <p className="font-semibold text-sm">AI Analysis</p>
                      <p className="text-xs text-gray-600">Our AI analyzes market data and condition</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                    <div>
                      <p className="font-semibold text-sm">Get Values</p>
                      <p className="text-xs text-gray-600">Receive multiple value estimates instantly</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                    <div>
                      <p className="font-semibold text-sm">Trade-In</p>
                      <p className="text-xs text-gray-600">Use for vehicle purchase negotiations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Market Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Current demand for your vehicle model</p>
                <p>• Seasonal market variations</p>
                <p>• Economic conditions affecting auto sales</p>
                <p>• Supply of similar vehicles in market</p>
                <p>• Regional preferences and location</p>
                <div className="mt-3 p-2 bg-orange-50 rounded text-orange-700">
                  <p className="text-xs">Values are estimates based on current market data and may vary from actual offers.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}