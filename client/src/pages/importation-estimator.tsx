import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calculator, Banknote, FileText, Truck, Ship, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ModuleNavigation } from "@/components/module-navigation";
import { VehicleSelector } from "@/components/vehicle-selector";
import { queryClient } from "@/lib/queryClient";
import { generateImportEstimatePDF, type ImportEstimateResult } from "@/lib/pdf-generator";
import React from "react";

// Form schema for import estimation
const importEstimateFormSchema = z.object({
  // Vehicle details
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1990).max(new Date().getFullYear() + 1),
  engineCapacity: z.number().min(1).max(10000),
  
  // CIF details
  cifCurrency: z.enum(["USD", "JPY", "GBP"]),
  cifAmount: z.number().min(1, "CIF amount is required"),
  exchangeRate: z.number().min(0.01, "Exchange rate is required"),
  
  // Optional costs
  transportCost: z.number().min(0).default(0),
  serviceFeePercentage: z.number().min(0).max(20).default(5),
  
  // Contact information (optional)
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerPhone: z.string().optional(),
});

type ImportEstimateForm = z.infer<typeof importEstimateFormSchema>;

export default function ImportationEstimator() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [manualVehicleData, setManualVehicleData] = useState<any>(null);
  
  // Use refs to store the latest values for reliable access in event handlers
  const manualVehicleDataRef = useRef<any>(null);
  const selectedVehicleRef = useRef<any>(null);
  
  // Debug log state changes and update refs
  React.useEffect(() => {
    console.log('manualVehicleData state changed:', manualVehicleData);
    manualVehicleDataRef.current = manualVehicleData;
  }, [manualVehicleData]);
  
  React.useEffect(() => {
    selectedVehicleRef.current = selectedVehicle;
  }, [selectedVehicle]);
  const [showResults, setShowResults] = useState(false);
  const [estimateResult, setEstimateResult] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<ImportEstimateForm>({
    resolver: zodResolver(importEstimateFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: 2020,
      engineCapacity: 0,
      cifCurrency: "USD",
      cifAmount: 0,
      exchangeRate: 129.50,
      transportCost: 0,
      serviceFeePercentage: 5,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    },
  });

  // Handle URL parameters from AI Advisor
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const make = urlParams.get('make');
    const model = urlParams.get('model');
    const engineCapacity = urlParams.get('engineCapacity');
    
    if (make && model && engineCapacity) {
      const vehicleData = {
        make,
        model,
        engineCapacity: parseInt(engineCapacity)
      };
      
      setSelectedVehicle(vehicleData);
      
      // Update form values
      form.setValue('make', make);
      form.setValue('model', model);
      form.setValue('engineCapacity', parseInt(engineCapacity));
      
      toast({
        title: "AI Recommendation Applied",
        description: `Pre-filled vehicle: ${make} ${model} (${engineCapacity}cc)`,
      });
    }
  }, [toast, form]);

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    if (!estimateResult) return;
    
    const pdfData: ImportEstimateResult = {
      vehicleInfo: estimateResult.vehicleInfo,
      breakdown: estimateResult.breakdown
    };
    
    generateImportEstimatePDF(pdfData);
    
    toast({
      title: "PDF Downloaded",
      description: "Your import estimate report has been downloaded successfully.",
    });
  };

  // Fetch exchange rates
  const { data: exchangeRates } = useQuery({
    queryKey: ['/api/exchange-rates'],
    select: (data) => data || [],
  });

  // Fetch clearing charges
  const { data: clearingCharges } = useQuery({
    queryKey: ['/api/clearing-charges'],
    select: (data) => data || [],
  });

  // Auto-update exchange rate when currency changes
  const selectedCurrency = form.watch("cifCurrency");
  React.useEffect(() => {
    if (exchangeRates && selectedCurrency && Array.isArray(exchangeRates)) {
      const rate = exchangeRates.find((r: any) => r.currency === selectedCurrency);
      if (rate) {
        form.setValue("exchangeRate", parseFloat(rate.rate));
      }
    }
  }, [selectedCurrency, exchangeRates, form]);

  // Watch for changes in key form fields to clear results - DISABLED TO PREVENT CLEARING AFTER API SUCCESS
  // const watchedFields = form.watch(["make", "model", "engineCapacity", "year", "cifAmount", "cifCurrency", "exchangeRate"]);
  // React.useEffect(() => {
  //   // Clear results when any key calculation field changes (but not on initial load)
  //   if (estimateResult && showResults && watchedFields.some(field => field !== "" && field !== 0)) {
  //     setEstimateResult(null);
  //     setShowResults(false);
  //   }
  // }, [watchedFields]);

  // Auto-populate vehicle details when vehicle is selected and clear previous results
  React.useEffect(() => {
    if (selectedVehicle) {
      // Clear previous results when a new vehicle is selected
      setEstimateResult(null);
      setShowResults(false);
      
      // Update form with new vehicle details
      form.setValue("make", selectedVehicle.make);
      form.setValue("model", selectedVehicle.model);
      form.setValue("engineCapacity", selectedVehicle.engineCapacity);
    }
  }, [selectedVehicle, form]);

  // Auto-populate vehicle details when manual vehicle data is available
  React.useEffect(() => {
    console.log('Manual vehicle data effect triggered:', manualVehicleData);
    if (manualVehicleData) {
      // Don't clear results - let user recalculate if needed
      
      // Update form with manual vehicle details
      console.log('Setting form values from manual data:', {
        make: manualVehicleData.make,
        model: manualVehicleData.model,
        engineCapacity: manualVehicleData.engineCapacity
      });
      form.setValue("make", manualVehicleData.make);
      form.setValue("model", manualVehicleData.model);
      form.setValue("engineCapacity", manualVehicleData.engineCapacity);
      
      // Trigger validation to clear errors
      form.trigger(["make", "model", "engineCapacity"]);
    }
  }, [manualVehicleData, form]);

  // Calculate import estimate mutation
  const calculateEstimate = useMutation({
    mutationFn: async (data: any) => {
      console.log('Sending data to API:', data);
      const response = await fetch('/api/import-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Failed to calculate import estimate: ${errorText}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      console.log('✅ API Success - received data:', data);
      
      // Clear previous results first to force refresh
      setEstimateResult(null);
      setShowResults(false);
      console.log('🧹 Cleared previous results');
      
      // Set new results after brief delay to ensure UI refresh
      setTimeout(() => {
        console.log('⏰ Setting new results after delay:', data);
        setEstimateResult(data);
        setShowResults(true);
        console.log('✅ Results state updated - should now display');
      }, 100);
      
      toast({
        title: "Import estimate calculated",
        description: "Your vehicle import cost estimate is ready.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/import-estimates/history'] });
    },
    onError: (error) => {
      console.error('Import estimate calculation error:', error);
      
      // Check if it's a usage limit error
      if (error.message && error.message.includes('Usage limit exceeded')) {
        toast({
          title: "Usage Limit Reached",
          description: "You've reached your import estimate limit. Upgrade to Premium for unlimited calculations.",
          variant: "destructive",
        });
        
        // Redirect to billing page after short delay
        setTimeout(() => {
          window.location.href = '/billing';
        }, 2000);
        
        return;
      }
      
      toast({
        title: "Calculation failed",
        description: error.message || "Please check your inputs and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ImportEstimateForm) => {
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('1. Form data received:', data);
    console.log('2. Manual vehicle data in state:', manualVehicleData);
    console.log('3. Selected vehicle in state:', selectedVehicle);
    console.log('4. Form validation state:', form.formState);
    console.log('5. Form errors:', form.formState.errors);
    
    // Validate required vehicle selection
    if (!manualVehicleData && !selectedVehicle) {
      console.error('❌ No vehicle selected - blocking submission');
      toast({
        title: "Vehicle Required",
        description: "Please select a vehicle from database or enter manual vehicle data",
        variant: "destructive"
      });
      return;
    }
    
    // For manual vehicle entry, override form validation by using manual data
    let finalData = data;
    if (manualVehicleData) {
      console.log('🔧 Using manual vehicle data to override form values');
      finalData = {
        ...data,
        make: manualVehicleData.make,
        model: manualVehicleData.model,
        engineCapacity: manualVehicleData.engineCapacity
      };
      console.log('📝 Final form data with manual overrides:', finalData);
    }
    
    // Use data as numbers directly - schema will handle conversion
    const backendData = {
      ...finalData,
    };
    
    // Include manual vehicle data if available
    const submitData = {
      ...backendData,
      ...(manualVehicleData && {
        manualVehicleData: {
          make: manualVehicleData.make,
          model: manualVehicleData.model,
          engineCapacity: manualVehicleData.engineCapacity,
          proratedCrsp: manualVehicleData.proratedCrsp,
          referenceVehicle: manualVehicleData.referenceVehicle
        }
      }),
      ...(selectedVehicle && {
        vehicleId: selectedVehicle.id,
        crspValue: selectedVehicle.crspKes || selectedVehicle.crsp2020
      })
    };
    
    console.log('6. Final submit data to API:', submitData);
    console.log('✅ Proceeding with API call...');
    calculateEstimate.mutate(submitData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Vehicle Import Estimator
            </h1>
            <p className="text-xl text-gray-600">
              Calculate total costs for importing vehicles to Kenya including CIF conversion, duties, and clearance fees
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-5 w-5" />
                    Import Cost Calculator
                  </CardTitle>
                  <CardDescription>
                    Enter your vehicle details and import costs to get a comprehensive estimate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Vehicle Selection */}
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Vehicle Details</Label>
                        <VehicleSelector
                          onVehicleSelect={(vehicle) => {
                            // Clear results immediately when vehicle selection starts
                            if (vehicle !== selectedVehicle) {
                              setEstimateResult(null);
                              setShowResults(false);
                            }
                            setSelectedVehicle(vehicle);
                            // Don't clear manual data automatically - let user manually toggle
                          }}
                          onManualVehicleData={(data) => {
                            console.log('Manual vehicle data received in parent callback:', data);
                            console.log('Setting manualVehicleData state to:', data);
                            setManualVehicleData(data);
                            // Don't clear results when manual vehicle data changes - let user recalculate if needed
                          }}
                        />
                        
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year of Manufacture *</FormLabel>
                              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {(() => {
                                    const currentYear = new Date().getFullYear();
                                    const years = [];
                                    for (let i = currentYear - 7; i <= currentYear; i++) {
                                      years.push(i);
                                    }
                                    return years.map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ));
                                  })()}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* CIF Details */}
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">CIF (Cost, Insurance, Freight) Details</Label>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cifCurrency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Currency *</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="exchangeRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Exchange Rate (to KES) *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g., 129.50"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="cifAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CIF Amount *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="e.g., 14000"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Additional Costs */}
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Additional Costs</Label>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="transportCost"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Transport Cost (KES)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="e.g., 50000"
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
                            name="serviceFeePercentage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Fee (%)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g., 5.0"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>



                      <Button
                        type="button"
                        className="w-full"
                        disabled={calculateEstimate.isPending}
                        onClick={async (e) => {
                          e.preventDefault();
                          
                          // Debug form validation issues
                          const formState = form.formState;
                          console.log('=== BUTTON CLICK DEBUG ===');
                          console.log('Form validation state:', formState);
                          console.log('Form errors:', formState.errors);
                          console.log('Form values:', form.getValues());
                          console.log('Manual vehicle data (state):', manualVehicleData);
                          console.log('Manual vehicle data (ref):', manualVehicleDataRef.current);
                          console.log('Selected vehicle (state):', selectedVehicle);
                          console.log('Selected vehicle (ref):', selectedVehicleRef.current);
                          
                          // Use ref values for more reliable access to current state
                          const currentManualData = manualVehicleDataRef.current;
                          const currentSelectedVehicle = selectedVehicleRef.current;
                          
                          // Handle custom submission with validation bypass for manual entry
                          if (currentManualData || currentSelectedVehicle) {
                            console.log('✅ Vehicle data available - bypassing form validation');
                            const formData = form.getValues();
                            onSubmit(formData);
                          } else {
                            console.log('❌ No vehicle data - triggering form validation');
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      >
                        {calculateEstimate.isPending ? (
                          <>
                            <Calculator className="mr-2 h-4 w-4 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculate Import Cost
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {(() => {
                console.log('🔍 Render check - showResults:', showResults, 'estimateResult:', !!estimateResult);
                console.log('🔍 Actual estimateResult data:', estimateResult);
                return null;
              })()}
              {showResults && estimateResult ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Import Cost Breakdown
                    </CardTitle>
                    <CardDescription>
                      Total estimated cost for importing your vehicle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Total Cost */}
                    <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Total Payable Amount</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {formatCurrency(estimateResult.breakdown.totalPayable)}
                        </p>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Cost Breakdown
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">CIF ({estimateResult.breakdown.cifCurrency})</span>
                          <Badge variant="outline">
                            {estimateResult.breakdown.cifCurrency} {estimateResult.breakdown.cifAmount.toLocaleString()}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">CIF in KES (Rate: {estimateResult.breakdown.exchangeRate})</span>
                          <span className="font-medium">{formatCurrency(estimateResult.breakdown.cifKes)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Import Duties & Taxes</span>
                          <span className="font-medium">{formatCurrency(estimateResult.breakdown.dutyPayable)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Clearing Charges</span>
                          <span className="font-medium">{formatCurrency(estimateResult.breakdown.clearingCharges)}</span>
                        </div>
                        
                        {estimateResult.breakdown.transportCost > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Transport Cost</span>
                            <span className="font-medium">{formatCurrency(estimateResult.breakdown.transportCost)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Service Fee ({estimateResult.breakdown.serviceFeePercentage}%)</span>
                          <span className="font-medium">{formatCurrency(estimateResult.breakdown.serviceFeeAmount)}</span>
                        </div>
                      </div>
                    </div>



                    {/* PDF Download Button */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleDownloadPDF()}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download PDF Report
                      </Button>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        This is an estimate. Actual costs may vary based on current exchange rates, 
                        inspection fees, and other factors. Contact a clearing agent for precise quotes.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64 text-center">
                    <div>
                      <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Enter your vehicle details and import costs to see the estimated total
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}