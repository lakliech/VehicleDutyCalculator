import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { dutyCalculationSchema, type DutyCalculation, type DutyResult } from "@shared/schema";
import { 
  Calculator, 
  Car, 
  Truck, 
  Bike, 
  Shield, 
  DollarSign, 
  Calendar, 
  Receipt,
  Info,
  Download,
  AlertCircle,
  Zap,
  Bus,
  Building,
  Heart,
  Wrench,
  Package
} from "lucide-react";

const vehicleCategoryInfo = {
  under1500cc: { 
    label: "Under 1500cc",
    description: "Vehicles with engine capacity below 1500cc",
    icon: Car
  },
  over1500cc: { 
    label: "Over 1500cc", 
    description: "Vehicles with engine capacity 1500cc and above",
    icon: Car
  },
  largeEngine: { 
    label: "Large Engine", 
    description: "Petrol >3000cc or Diesel >2500cc",
    icon: Truck
  },
  electric: { 
    label: "Electric", 
    description: "Fully electric vehicles (tax incentives apply)",
    icon: Zap
  },
  schoolBus: { 
    label: "School Bus", 
    description: "Vehicles designated for student transport",
    icon: Bus
  },
  primeMover: { 
    label: "Prime Mover", 
    description: "Heavy duty truck heads",
    icon: Building
  },
  trailer: { 
    label: "Trailer", 
    description: "Transport trailers",
    icon: Package
  },
  ambulance: { 
    label: "Ambulance", 
    description: "Emergency medical vehicles",
    icon: Heart
  },
  motorcycle: { 
    label: "Motorcycle", 
    description: "Two-wheeled vehicles",
    icon: Bike
  },
  specialPurpose: { 
    label: "Special Purpose", 
    description: "Specialized vehicles",
    icon: Wrench
  },
  heavyMachinery: { 
    label: "Heavy Machinery", 
    description: "Construction and industrial equipment",
    icon: Building
  }
};

export default function DutyCalculator() {
  const { toast } = useToast();
  const [calculationResult, setCalculationResult] = useState<DutyResult | null>(null);

  const form = useForm<DutyCalculation>({
    resolver: zodResolver(dutyCalculationSchema),
    defaultValues: {
      vehicleCategory: "under1500cc",
      vehicleValue: 1000000,
      engineSize: 1500,
      vehicleAge: 0,
      isDirectImport: true,
      fuelType: "petrol",
    },
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
        description: `Total taxes: KES ${result.totalTaxes.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Kenya Motor Vehicle Duty Calculator</h1>
                <p className="text-sm text-gray-500">Calculate import duties and taxes for vehicles</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Official Rates
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
                <p className="text-gray-600">Enter your vehicle details to calculate applicable duties and taxes</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Vehicle Category Selection */}
                    <FormField
                      control={form.control}
                      name="vehicleCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-3">
                            <Car className="h-4 w-4 mr-2 text-green-600" />
                            Vehicle Category
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="grid grid-cols-2 gap-3"
                            >
                              {Object.entries(vehicleCategoryInfo).map(([key, info]) => {
                                const Icon = info.icon;
                                return (
                                  <div key={key} className="relative">
                                    <RadioGroupItem value={key} id={key} className="sr-only" />
                                    <Label
                                      htmlFor={key}
                                      className={`border-2 rounded-lg p-3 cursor-pointer hover:border-green-300 transition-all ${
                                        field.value === key
                                          ? "border-green-600 bg-green-50"
                                          : "border-gray-200"
                                      }`}
                                    >
                                      <div className="flex items-start space-x-3">
                                        <Icon className="h-5 w-5 text-gray-600 mt-0.5" />
                                        <div className="flex-1">
                                          <div className="text-sm font-medium text-gray-900">{info.label}</div>
                                          <div className="text-xs text-gray-500 mt-0.5">{info.description}</div>
                                        </div>
                                      </div>
                                    </Label>
                                  </div>
                                );
                              })}
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
                              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                              Current Retail Selling Price (KES)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">KES</span>
                                </div>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  className="pl-12"
                                  placeholder="1,000,000"
                                  min="0"
                                  step="1000"
                                />
                              </div>
                            </FormControl>
                            <FormDescription>Enter the current market value of the vehicle</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="vehicleAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="h-4 w-4 mr-2 text-green-600" />
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
                                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year === 0 ? "New (0 years)" : `${year} year${year > 1 ? 's' : ''}`}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="16">Over 15 years</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>Age affects depreciation rate</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Import Type */}
                    <FormField
                      control={form.control}
                      name="isDirectImport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 mb-2">Import Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value ? "direct" : "registered"}
                              onValueChange={(value) => field.onChange(value === "direct")}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="direct" id="direct" />
                                <Label htmlFor="direct">Direct Import</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="registered" id="registered" />
                                <Label htmlFor="registered">Previously Registered</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription>
                            Direct imports include RDL and IDF fees
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Optional Engine Size */}
                    {["under1500cc", "over1500cc", "largeEngine"].includes(form.watch("vehicleCategory")) && (
                      <FormField
                        control={form.control}
                        name="engineSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 mb-2">
                              Engine Size (cc) - Optional
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  className="pr-12"
                                  placeholder="1500"
                                  min="0"
                                  step="50"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">cc</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Optional Fuel Type */}
                    {["under1500cc", "over1500cc", "largeEngine"].includes(form.watch("vehicleCategory")) && (
                      <FormField
                        control={form.control}
                        name="fuelType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 mb-2">
                              Fuel Type - Optional
                            </FormLabel>
                            <FormControl>
                              <Select value={field.value || ""} onValueChange={field.onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="petrol">Petrol</SelectItem>
                                  <SelectItem value="diesel">Diesel</SelectItem>
                                  <SelectItem value="electric">Electric</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Required for large engine categorization
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={calculateDutyMutation.isPending}
                    >
                      {calculateDutyMutation.isPending ? (
                        <>Calculating...</>
                      ) : (
                        <>
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculate Duties & Taxes
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {calculationResult ? (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Calculation Results</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Implement download functionality
                        toast({
                          title: "Download Feature",
                          description: "Coming soon!",
                        });
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary Card */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Total Taxes Payable</span>
                      <Receipt className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {formatCurrency(calculationResult.totalTaxes)}
                    </div>
                  </div>

                  {/* Value Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Retail Price:</span>
                      <span className="font-medium">{formatCurrency(calculationResult.currentRetailPrice)}</span>
                    </div>
                    {calculationResult.depreciationRate > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depreciation ({(calculationResult.depreciationRate * 100).toFixed(0)}%):</span>
                          <span className="font-medium text-red-600">
                            -{formatCurrency(calculationResult.currentRetailPrice - calculationResult.depreciatedPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depreciated Price:</span>
                          <span className="font-medium">{formatCurrency(calculationResult.depreciatedPrice)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customs Value:</span>
                      <span className="font-medium">{formatCurrency(calculationResult.customsValue)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900">Tax Breakdown</h4>
                    {calculationResult.breakdown.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${item.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.amount < 0 ? '-' : ''}{formatCurrency(Math.abs(item.amount))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info Alert */}
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-xs text-blue-800">
                      Calculations are based on current Kenya Revenue Authority rates. 
                      Additional fees may apply during registration.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Enter vehicle details and click calculate to see results</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information Card */}
            <Card className="shadow-sm mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-700">Direct Imports:</strong>
                  <p className="mt-1">Include Import Duty, Excise Duty, VAT, Railway Development Levy (RDL), and Import Declaration Fee (IDF).</p>
                </div>
                <div>
                  <strong className="text-gray-700">Previously Registered:</strong>
                  <p className="mt-1">Include Import Duty, Excise Duty, and VAT only.</p>
                </div>
                <div>
                  <strong className="text-gray-700">Depreciation:</strong>
                  <p className="mt-1">Applied based on vehicle age using official KRA rates.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}