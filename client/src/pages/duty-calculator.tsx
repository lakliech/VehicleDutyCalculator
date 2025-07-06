import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { dutyCalculationSchema, type DutyCalculation, type DutyResult, type DutyRate } from "@shared/schema";
import { 
  Calculator, 
  Car, 
  Truck, 
  Bike, 
  Shield, 
  CheckCircle, 
  Smartphone, 
  DollarSign, 
  Settings, 
  Calendar, 
  Fuel, 
  MapPin, 
  Briefcase, 
  Receipt, 
  Info, 
  HelpCircle, 
  Download, 
  Phone,
  AlertCircle
} from "lucide-react";

const vehicleTypeIcons = {
  car: Car,
  motorcycle: Bike,
  truck: Truck,
  suv: Car,
  van: Truck,
  bus: Truck,
};

export default function DutyCalculator() {
  const { toast } = useToast();
  const [calculationResult, setCalculationResult] = useState<DutyResult | null>(null);

  const form = useForm<DutyCalculation>({
    resolver: zodResolver(dutyCalculationSchema),
    defaultValues: {
      vehicleType: "car",
      vehicleValue: 25000,
      engineSize: 2000,
      vehicleAge: 0,
      fuelType: "gasoline",
      state: "CA",
      usage: "personal",
    },
  });

  const { data: dutyRates, isLoading: ratesLoading } = useQuery({
    queryKey: ["/api/duty-rates"],
  });

  const calculateDutyMutation = useMutation({
    mutationFn: async (data: DutyCalculation) => {
      const response = await apiRequest("POST", "/api/calculate-duty", data);
      return response.json();
    },
    onSuccess: (result: DutyResult) => {
      setCalculationResult(result);
      toast({
        title: "Calculation Complete",
        description: `Total duty calculated: $${result.totalDuty.toFixed(2)}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Calculation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DutyCalculation) => {
    calculateDutyMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Motor Vehicle Duty Calculator</h1>
                <p className="text-sm text-gray-500">Calculate your vehicle registration duties</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Vehicle Information</CardTitle>
                <p className="text-gray-600">Enter your vehicle details to calculate the applicable duty</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Vehicle Type Selection */}
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-3">
                            <Car className="h-4 w-4 mr-2 text-primary" />
                            Vehicle Type
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="grid grid-cols-2 md:grid-cols-3 gap-3"
                            >
                              {Object.entries(vehicleTypeIcons).map(([type, Icon]) => (
                                <div key={type} className="relative">
                                  <RadioGroupItem value={type} id={type} className="sr-only" />
                                  <Label
                                    htmlFor={type}
                                    className={`border-2 rounded-lg p-4 cursor-pointer hover:border-primary/30 transition-all ${
                                      field.value === type
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200"
                                    }`}
                                  >
                                    <div className="text-center">
                                      <Icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                                      <div className="text-sm font-medium text-gray-900 capitalize">{type}</div>
                                      <div className="text-xs text-gray-500">
                                        {type === "car" && "Private vehicle"}
                                        {type === "motorcycle" && "Two-wheeler"}
                                        {type === "truck" && "Commercial"}
                                        {type === "suv" && "Sport utility"}
                                        {type === "van" && "Utility vehicle"}
                                        {type === "bus" && "Passenger"}
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Vehicle Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="vehicleValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <DollarSign className="h-4 w-4 mr-2 text-primary" />
                              Vehicle Value (USD)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  className="pl-7 pr-12"
                                  placeholder="25,000"
                                  min="0"
                                  step="100"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">USD</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>Enter the market value of your vehicle</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="engineSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Settings className="h-4 w-4 mr-2 text-primary" />
                              Engine Size (cc)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  className="pr-12"
                                  placeholder="2000"
                                  min="0"
                                  step="50"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">cc</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>Engine displacement in cubic centimeters</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Additional Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="vehicleAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              Vehicle Age (years)
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value.toString()}
                                onValueChange={(value) => field.onChange(Number(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select age" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">New (0 years)</SelectItem>
                                  <SelectItem value="1">1 year</SelectItem>
                                  <SelectItem value="2">2 years</SelectItem>
                                  <SelectItem value="3">3 years</SelectItem>
                                  <SelectItem value="4">4 years</SelectItem>
                                  <SelectItem value="5">5+ years</SelectItem>
                                </SelectContent>
                              </Select>
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
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Fuel className="h-4 w-4 mr-2 text-primary" />
                              Fuel Type
                            </FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gasoline">Gasoline</SelectItem>
                                  <SelectItem value="diesel">Diesel</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                  <SelectItem value="electric">Electric</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Optional Fields */}
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                                State/Region
                              </FormLabel>
                              <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="CA">California</SelectItem>
                                    <SelectItem value="NY">New York</SelectItem>
                                    <SelectItem value="TX">Texas</SelectItem>
                                    <SelectItem value="FL">Florida</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="usage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                <Briefcase className="h-4 w-4 mr-2 text-primary" />
                                Usage Type
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex space-x-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="personal" id="personal" />
                                    <Label htmlFor="personal">Personal</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="commercial" id="commercial" />
                                    <Label htmlFor="commercial">Commercial</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Calculate Button */}
                    <div className="flex justify-center pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="px-8 py-3 text-lg"
                        disabled={calculateDutyMutation.isPending}
                      >
                        {calculateDutyMutation.isPending ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            <Calculator className="h-4 w-4 mr-2" />
                            Calculate Duty
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Results and Information Panel */}
          <div className="space-y-6">
            {/* Calculation Results */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="h-5 w-5 mr-2 text-primary" />
                  Duty Calculation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {calculationResult ? (
                  <div className="space-y-4">
                    {/* Total Amount */}
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-primary mb-1">Total Motor Vehicle Duty</div>
                        <div className="text-3xl font-bold text-primary">
                          ${calculationResult.totalDuty.toFixed(2)}
                        </div>
                        <div className="text-sm text-primary/70 mt-1">Based on your vehicle specifications</div>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Duty Breakdown</h4>
                      <div className="space-y-2">
                        {calculationResult.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex-1">
                              <span className="text-sm text-gray-600">{item.label}</span>
                              {item.description && (
                                <div className="text-xs text-gray-500">{item.description}</div>
                              )}
                            </div>
                            <span className={`font-medium ${item.amount < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                              {item.amount < 0 ? '-' : ''}${Math.abs(item.amount).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center py-2 font-semibold text-lg border-t border-gray-200">
                          <span>Total Amount</span>
                          <span className="text-primary">${calculationResult.totalDuty.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Formula Explanation */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Calculation Formula</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Base Fee: Fixed amount based on vehicle type</div>
                        <div>• Value Duty: Vehicle value × applicable rate</div>
                        <div>• Engine Surcharge: Based on engine displacement</div>
                        <div>• Age Discount: Applied for older vehicles</div>
                        <div>• Fuel Type Discounts: Electric (20%), Hybrid (10%)</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Receipt className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Enter your vehicle details and click "Calculate Duty" to see the results</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Duty Rates Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Current Duty Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ratesLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-900">Vehicle Type</th>
                          <th className="text-right py-2 font-medium text-gray-900">Base Fee</th>
                          <th className="text-right py-2 font-medium text-gray-900">Value Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {dutyRates?.map((rate: DutyRate) => (
                          <tr key={rate.id}>
                            <td className="py-2 text-gray-700 capitalize">{rate.vehicleType}</td>
                            <td className="py-2 text-right">${parseFloat(rate.baseFee).toFixed(0)}</td>
                            <td className="py-2 text-right">{(parseFloat(rate.valueRate) * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-4 text-xs text-gray-500">
                  <p>* Rates may vary by state and are subject to change</p>
                  <p>* Additional fees may apply for special circumstances</p>
                </div>
              </CardContent>
            </Card>

            {/* Help Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Vehicle Value</h4>
                    <p className="text-gray-600">Use the current market value or purchase price of your vehicle. Check resources like KBB or Edmunds for accurate valuations.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Engine Size</h4>
                    <p className="text-gray-600">Found on your vehicle registration or in the owner's manual. Measured in cubic centimeters (cc) or liters.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Documentation Required</h4>
                    <p className="text-gray-600">You'll need proof of purchase, vehicle title, insurance, and emissions certificate to complete registration.</p>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Guide
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center shadow-sm">
            <CardContent className="pt-6">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Calculation</h3>
              <p className="text-gray-600 text-sm">Your data is processed securely and not stored on our servers</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-sm">
            <CardContent className="pt-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Results</h3>
              <p className="text-gray-600 text-sm">Based on current government duty rates and regulations</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-sm">
            <CardContent className="pt-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm">Calculate duties on any device, anywhere, anytime</p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary p-1.5 rounded">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Motor Vehicle Duty Calculator</span>
              </div>
              <p className="text-gray-600 text-sm">Calculate vehicle registration duties quickly and accurately with our official calculator tool.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Duty Rate Guide</a></li>
                <li><a href="#" className="hover:text-primary">Vehicle Classification</a></li>
                <li><a href="#" className="hover:text-primary">Registration Process</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Phone className="h-3 w-3 mr-2" />
                  1-800-VEHICLE
                </li>
                <li className="flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  support@vehicleduty.gov
                </li>
                <li className="flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Mon-Fri 8AM-6PM
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 Motor Vehicle Duty Calculator. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
