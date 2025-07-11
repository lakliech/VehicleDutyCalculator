import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { VehicleSelector } from "@/components/vehicle-selector";
import { ModuleNavigation } from "@/components/module-navigation";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Calculator, Car, User, MapPin, CheckCircle, AlertTriangle } from "lucide-react";

// Insurance quote form schema
const insuranceQuoteFormSchema = z.object({
  // Vehicle information
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.number().min(1980, "Year must be 1980 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  engineCapacity: z.number().min(50, "Engine capacity must be at least 50cc"),
  vehicleValue: z.number().min(50000, "Vehicle value must be at least KES 50,000"),
  vehicleCategory: z.enum(["private", "commercial", "motorcycle", "matatu", "truck"]),
  
  // Driver information
  driverAge: z.number().min(18, "Driver must be at least 18 years old").max(80, "Maximum age is 80"),
  drivingExperience: z.number().min(0, "Experience cannot be negative").max(60, "Maximum experience is 60 years"),
  previousClaims: z.number().min(0, "Claims cannot be negative").max(20, "Maximum 20 claims"),
  hasAccidentHistory: z.boolean(),
  
  // Coverage information
  coverageType: z.enum(["comprehensive", "third_party", "fire_theft"]),
  excess: z.number().min(10000, "Minimum excess is KES 10,000").max(500000, "Maximum excess is KES 500,000"),
  location: z.enum(["nairobi", "mombasa", "kisumu", "nakuru", "eldoret", "thika", "other_urban", "rural"]),
  
  // Contact information (optional)
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerPhone: z.string().optional(),
});

type InsuranceQuoteForm = z.infer<typeof insuranceQuoteFormSchema>;

interface InsuranceQuoteResult {
  annualPremium: number;
  monthlyPremium: number;
  coverageDetails: {
    type: string;
    features: string[];
    excess: number;
  };
  riskFactors: {
    factor: string;
    impact: string;
    multiplier: number;
  }[];
  recommendations: string[];
  breakdown: {
    basePremium: number;
    riskAdjustments: number;
    locationAdjustment: number;
    finalPremium: number;
  };
}

export default function InsuranceEstimator() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [quoteResult, setQuoteResult] = useState<InsuranceQuoteResult | null>(null);
  const { toast } = useToast();

  const form = useForm<InsuranceQuoteForm>({
    resolver: zodResolver(insuranceQuoteFormSchema),
    defaultValues: {
      vehicleCategory: "private",
      driverAge: 30,
      drivingExperience: 5,
      previousClaims: 0,
      hasAccidentHistory: false,
      coverageType: "comprehensive",
      excess: 50000,
      location: "nairobi",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    },
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: InsuranceQuoteForm) => {
      const response = await apiRequest("POST", "/api/insurance-quote", data);
      return response;
    },
    onSuccess: (data) => {
      setQuoteResult(data);
      toast({
        title: "Insurance Quote Generated",
        description: "Your personalized insurance quote has been calculated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Quote Generation Failed",
        description: error.message || "Unable to generate insurance quote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsuranceQuoteForm) => {
    // Add selected vehicle data if available
    if (selectedVehicle) {
      data.make = selectedVehicle.make;
      data.model = selectedVehicle.model;
      data.engineCapacity = selectedVehicle.engineCapacity;
      // Use CRSP value as vehicle value if available
      if (selectedVehicle.crspKes) {
        data.vehicleValue = parseFloat(selectedVehicle.crspKes);
      }
    }
    
    quoteMutation.mutate(data);
  };

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount) || numAmount === null || numAmount === undefined) {
      return 'KES 0';
    }
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const getRiskColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Insurance Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized vehicle insurance quotes based on your profile and vehicle details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quote Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-purple-600" />
                  <span>Vehicle Information</span>
                </CardTitle>
                <CardDescription>
                  Select your vehicle or enter details manually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleSelector
                  onVehicleSelect={setSelectedVehicle}
                  selectedVehicle={selectedVehicle}
                />
                
                {selectedVehicle && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Selected Vehicle</h4>
                    <p className="text-sm text-purple-700">
                      {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.engineCapacity}cc)
                    </p>
                    {selectedVehicle.crspKes && (
                      <p className="text-sm text-purple-600">
                        Estimated Value: {formatCurrency(selectedVehicle.crspKes)}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5 text-purple-600" />
                      <span>Vehicle Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Manufacture</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="2020"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vehicleValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Value (KES)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="1500000"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="vehicleCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="private">Private Vehicle</SelectItem>
                              <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                              <SelectItem value="motorcycle">Motorcycle</SelectItem>
                              <SelectItem value="matatu">Matatu/PSV</SelectItem>
                              <SelectItem value="truck">Truck/Heavy Vehicle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-600" />
                      <span>Driver Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="driverAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driver Age</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="30"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="drivingExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driving Experience (Years)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="5"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="previousClaims"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Claims (Last 5 Years)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasAccidentHistory"
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
                              I have been involved in accidents in the past 3 years
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span>Coverage Options</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="coverageType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coverage Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select coverage type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="comprehensive">Comprehensive Insurance</SelectItem>
                              <SelectItem value="third_party">Third Party Only</SelectItem>
                              <SelectItem value="fire_theft">Fire & Theft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="excess"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excess/Deductible (KES)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="50000"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="nairobi">Nairobi</SelectItem>
                                <SelectItem value="mombasa">Mombasa</SelectItem>
                                <SelectItem value="kisumu">Kisumu</SelectItem>
                                <SelectItem value="nakuru">Nakuru</SelectItem>
                                <SelectItem value="eldoret">Eldoret</SelectItem>
                                <SelectItem value="thika">Thika</SelectItem>
                                <SelectItem value="other_urban">Other Urban</SelectItem>
                                <SelectItem value="rural">Rural Area</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <span>Contact Information (Optional)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerEmail"
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
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+254 700 000 000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={quoteMutation.isPending}
                >
                  {quoteMutation.isPending ? "Calculating Quote..." : "Get Insurance Quote"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Quote Results */}
          <div>
            {quoteResult ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Your Insurance Quote</span>
                    </CardTitle>
                    <CardDescription>
                      Personalized quote based on your vehicle and profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg mb-6">
                      <div className="text-3xl font-bold text-purple-900 mb-2">
                        {formatCurrency(quoteResult.annualPremium)}
                      </div>
                      <div className="text-lg text-gray-600">Annual Premium</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Monthly: {formatCurrency(quoteResult.monthlyPremium)}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Coverage Details</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{quoteResult.coverageDetails.type}</p>
                          <p className="text-sm text-gray-600">Excess: {formatCurrency(quoteResult.coverageDetails.excess)}</p>
                          <div className="mt-2">
                            {quoteResult.coverageDetails.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="mr-1 mb-1">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Premium Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Base Premium:</span>
                            <span>{formatCurrency(quoteResult.breakdown.basePremium)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Adjustments:</span>
                            <span>{formatCurrency(quoteResult.breakdown.riskAdjustments)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location Adjustment:</span>
                            <span>{formatCurrency(quoteResult.breakdown.locationAdjustment)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Final Premium:</span>
                            <span>{formatCurrency(quoteResult.breakdown.finalPremium)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span>Risk Factors</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quoteResult.riskFactors.map((risk, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{risk.factor}</p>
                            <Badge className={getRiskColor(risk.impact)}>{risk.impact} Risk</Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{(risk.multiplier * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {quoteResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Get Your Quote</h3>
                  <p className="text-gray-600">
                    Fill out the form to receive a personalized insurance quote for your vehicle.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}