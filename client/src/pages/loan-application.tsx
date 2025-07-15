import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { ArrowLeft, Car, CreditCard, User, MapPin, FileText, Calculator, Check, Clock, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const loanApplicationSchema = z.object({
  applicantName: z.string().min(2, "Name must be at least 2 characters"),
  applicantEmail: z.string().email("Valid email required"),
  applicantPhone: z.string().min(10, "Valid phone number required"),
  nationalId: z.string().min(8, "Valid National ID required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  employmentStatus: z.enum(['employed', 'self_employed', 'business_owner', 'unemployed']),
  employerName: z.string().min(1, "Employer name is required"),
  monthlyIncome: z.coerce.number().min(20000, "Minimum monthly income is KES 20,000"),
  monthlyExpenses: z.coerce.number().min(0, "Monthly expenses cannot be negative"),
  requestedAmount: z.coerce.number().min(100000, "Minimum loan amount is KES 100,000"),
  downPaymentAmount: z.coerce.number().min(0, "Down payment cannot be negative"),
  preferredTenureMonths: z.coerce.number().min(12).max(84, "Tenure must be between 12 and 84 months"),
  collateralDescription: z.string().optional(),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  emergencyContactRelation: z.string().min(1, "Emergency contact relation is required")
});

type LoanApplicationForm = z.infer<typeof loanApplicationSchema>;

interface LoanProduct {
  id: number;
  bankName: string;
  productName: string;
  minInterestRate: string;
  maxInterestRate: string;
  maxFinancingPercentage: string;
  minDownPaymentPercentage: string;
  minTenureMonths: number;
  maxTenureMonths: number;
  features: string[];
  eligibilityCriteria: string[];
}

interface VehicleDetails {
  id: number;
  make: string;
  model: string;
  year: number;
  price: string;
}

export default function LoanApplicationPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/loan-application/:carId/:productId');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Handle authentication redirects
  useAuthRedirect();
  
  const carId = params?.carId;
  const productId = params?.productId;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const totalSteps = 4;
  


  // Check authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery({
    queryKey: ['/api/auth/status'],
    refetchOnWindowFocus: true,
  });

  // Fetch vehicle details
  const { data: vehicleData, isLoading: loadingVehicle } = useQuery({
    queryKey: [`/api/car-listings/${carId}/details`],
    enabled: !!carId && !!authStatus?.authenticated,
  });

  // Fetch loan product details
  const { data: loanProduct, isLoading: loadingProduct } = useQuery({
    queryKey: ['/api/financial/loan-products/single', productId],
    enabled: !!productId && !!authStatus?.authenticated,
  });

  const form = useForm<LoanApplicationForm>({
    resolver: zodResolver(loanApplicationSchema),
    mode: 'onChange',
    defaultValues: {
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      nationalId: '',
      dateOfBirth: '',
      maritalStatus: 'single',
      employmentStatus: 'employed',
      employerName: '',
      monthlyIncome: 20000,
      monthlyExpenses: 0,
      requestedAmount: 100000,
      downPaymentAmount: 0,
      preferredTenureMonths: 60,
      collateralDescription: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelation: ''
    }
  });

  // Set default loan amount when vehicle price is available
  useEffect(() => {
    if (vehicleData && loanProduct && Array.isArray(loanProduct) && loanProduct.length > 0) {
      // Use the price field from vehicle data
      const vehiclePrice = parseFloat(vehicleData.price);
      
      // Get the first loan product from the array
      const selectedProduct = loanProduct[0];
      const maxFinancing = parseFloat(selectedProduct.maxFinancingPercentage);
      const minDownPayment = parseFloat(selectedProduct.minDownPaymentPercentage);
      
      // Calculate loan amounts
      const requestedAmount = vehiclePrice;
      const minDownPaymentAmount = vehiclePrice * minDownPayment;
      
      if (!isNaN(vehiclePrice) && !isNaN(minDownPaymentAmount)) {
        form.setValue('requestedAmount', Math.round(requestedAmount));
        form.setValue('downPaymentAmount', Math.round(minDownPaymentAmount));
      }
    }
  }, [vehicleData, loanProduct, form]);

  const submitApplicationMutation = useMutation({
    mutationFn: async (data: LoanApplicationForm) => {
      return apiRequest('POST', '/api/financial/loan-application', {
        ...data,
        userId: authStatus?.user?.id,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        monthlyExpenses: data.monthlyExpenses?.toString() || "0",
        loanProductId: parseInt(productId!),
        vehicleListingId: carId ? parseInt(carId) : null,
        vehicleMake: vehicleData?.make,
        vehicleModel: vehicleData?.model,
        vehicleYear: vehicleData?.year,
        vehiclePrice: vehicleData?.price?.toString()
      });
    },
    onSuccess: (response) => {
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application number is ${response.applicationNumber}. We'll review it within 2-3 business days.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/loan-applications'] });
      setLocation('/loan-applications');
    },
    onError: (error: any) => {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit loan application. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Handle authentication properly
  const isAuthenticated = !authLoading && authStatus?.authenticated;
  
  // Only redirect if user is definitely not authenticated (not loading)
  if (!authLoading && !authStatus?.authenticated) {
    const currentUrl = window.location.pathname;
    localStorage.setItem('returnUrl', currentUrl);
    window.location.href = `/api/auth/google?returnUrl=${encodeURIComponent(currentUrl)}`;
    return null;
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data: LoanApplicationForm) => {
    submitApplicationMutation.mutate(data);
  };

  const nextStep = async () => {
    console.log('=== NEXTSTEP FUNCTION CALLED ===');
    console.log('Next button clicked, current step:', currentStep);
    setIsValidating(true);
    
    try {
      // Skip validation for now to test if this is the issue
      console.log('Skipping validation, moving to next step');
      if (currentStep < totalSteps) {
        console.log('Moving to next step:', currentStep + 1);
        setCurrentStep(currentStep + 1);
        console.log('Step updated successfully');
      } else {
        console.log('Already at last step');
      }
    } catch (error) {
      console.error('Error in nextStep:', error);
    } finally {
      console.log('Setting isValidating to false');
      setIsValidating(false);
    }
  };

  // Define which fields to validate for each step
  const getFieldsForStep = (step: number): (keyof LoanApplicationForm)[] => {
    switch (step) {
      case 1:
        return ['applicantName', 'applicantEmail', 'applicantPhone', 'nationalId', 'dateOfBirth', 'maritalStatus'];
      case 2:
        return ['employmentStatus', 'monthlyIncome', 'monthlyExpenses', 'employerName'];
      case 3:
        return ['requestedAmount', 'downPaymentAmount', 'preferredTenureMonths'];
      case 4:
        return ['emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation'];
      default:
        return [];
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!match) {
    return <div>Invalid loan application URL</div>;
  }

  if (loadingVehicle || loadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading application details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation(`/car/${carId}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicle Details
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Vehicle Loan Application
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Apply for financing through {loanProduct?.bankName}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {currentStep === 1 && <User className="h-5 w-5 mr-2" />}
                  {currentStep === 2 && <CreditCard className="h-5 w-5 mr-2" />}
                  {currentStep === 3 && <MapPin className="h-5 w-5 mr-2" />}
                  {currentStep === 4 && <FileText className="h-5 w-5 mr-2" />}
                  
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Financial Details"}
                  {currentStep === 3 && "Loan Details"}
                  {currentStep === 4 && "Review & Submit"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Please provide your personal information"}
                  {currentStep === 2 && "Tell us about your financial situation"}
                  {currentStep === 3 && "Configure your loan preferences"}
                  {currentStep === 4 && "Review your application before submitting"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Quick Test - Check if ANY button works */}
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded">
                  <button 
                    onClick={() => {
                      console.log('=== GREEN TEST BUTTON WORKS ===');
                      console.log('Auth status:', authStatus?.authenticated);
                      console.log('Auth loading:', authLoading);
                      alert(`Green button clicked! Auth: ${authStatus?.authenticated}, Loading: ${authLoading}`);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Test Auth Status
                  </button>
                  <span className="text-sm text-green-800">Step {currentStep} of {totalSteps}</span>
                </div>
                
                <Form {...form}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Form submitted');
                    form.handleSubmit(onSubmit)(e);
                  }} className="space-y-6">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="applicantName"
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
                          
                          <FormField
                            control={form.control}
                            name="nationalId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>National ID</FormLabel>
                                <FormControl>
                                  <Input placeholder="12345678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="applicantEmail"
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
                            name="applicantPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254700000000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="maritalStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Marital Status</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="divorced">Divorced</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Financial Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="employmentStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employment Status</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select employment status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="employed">Employed</SelectItem>
                                  <SelectItem value="self_employed">Self Employed</SelectItem>
                                  <SelectItem value="business_owner">Business Owner</SelectItem>
                                  <SelectItem value="unemployed">Unemployed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="employerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Employer/Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Company XYZ Ltd" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="monthlyIncome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Income (KES)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="100000"
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
                            name="monthlyExpenses"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Expenses (KES)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="30000"
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
                    )}

                    {/* Step 3: Loan Details */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        {/* Vehicle Summary */}
                        <Alert className="border-purple-200 bg-purple-50">
                          <Car className="h-4 w-4" />
                          <AlertDescription>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">Financing for:</span> {vehicleData?.year} {vehicleData?.make} {vehicleData?.model}
                              </div>
                              <div className="font-bold text-purple-600">
                                KES {parseFloat(vehicleData?.price || '0').toLocaleString()}
                              </div>
                            </div>
                          </AlertDescription>
                        </Alert>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="requestedAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Requested Loan Amount (KES)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="500000"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Default amount set to vehicle price. You can adjust based on your down payment.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="downPaymentAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Down Payment (KES)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="100000"
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
                          name="preferredTenureMonths"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Loan Tenure (Months)</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select tenure" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="12">12 months</SelectItem>
                                  <SelectItem value="24">24 months</SelectItem>
                                  <SelectItem value="36">36 months</SelectItem>
                                  <SelectItem value="48">48 months</SelectItem>
                                  <SelectItem value="60">60 months</SelectItem>
                                  <SelectItem value="72">72 months</SelectItem>
                                  <SelectItem value="84">84 months</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="purposeOfLoan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Purpose of Loan</FormLabel>
                              <FormControl>
                                <Input placeholder="Vehicle purchase for personal use" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="additionalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any additional information you'd like to share..."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Please review all information carefully before submitting your application.
                          </AlertDescription>
                        </Alert>

                        {/* Vehicle Summary */}
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Car className="h-4 w-4 mr-2" />
                            Vehicle Being Financed
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><span className="font-medium">Make & Model:</span> {vehicleData?.make} {vehicleData?.model}</p>
                              <p><span className="font-medium">Year:</span> {vehicleData?.year}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">Vehicle Price:</span> KES {parseFloat(vehicleData?.price || '0').toLocaleString()}</p>
                              <p><span className="font-medium">Loan Bank:</span> {loanProduct?.[0]?.bankName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Application Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold">Personal Information</h4>
                            <div className="text-sm space-y-1">
                              <p><span className="font-medium">Name:</span> {form.watch('applicantName')}</p>
                              <p><span className="font-medium">Email:</span> {form.watch('applicantEmail')}</p>
                              <p><span className="font-medium">Phone:</span> {form.watch('applicantPhone')}</p>
                              <p><span className="font-medium">National ID:</span> {form.watch('nationalId')}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">Loan Details</h4>
                            <div className="text-sm space-y-1">
                              <p><span className="font-medium">Employment:</span> {form.watch('employmentStatus')}</p>
                              <p><span className="font-medium">Monthly Income:</span> KES {form.watch('monthlyIncome')?.toLocaleString()}</p>
                              <p><span className="font-medium">Loan Amount:</span> KES {form.watch('requestedAmount')?.toLocaleString()}</p>
                              <p><span className="font-medium">Down Payment:</span> KES {form.watch('downPaymentAmount')?.toLocaleString()}</p>
                              <p><span className="font-medium">Tenure:</span> {form.watch('preferredTenureMonths')} months</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    )}

                  </form>
                </Form>
                
                {/* Navigation Buttons - OUTSIDE FORM */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      console.log('=== PREV BUTTON CLICKED ===');
                      prevStep();
                    }}
                    disabled={currentStep === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {currentStep < totalSteps ? (
                    <div className="space-y-2">
                      <button 
                        type="button"
                        onClick={() => {
                          console.log('=== SIMPLE NEXT CLICKED ===');
                          console.log('Current step before:', currentStep);
                          setCurrentStep(currentStep + 1);
                          console.log('Current step after:', currentStep + 1);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium mr-2"
                      >
                        Simple Next (No validation)
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => {
                          console.log('=== NEXT BUTTON CLICKED OUTSIDE FORM ===');
                          console.log('Current step:', currentStep);
                          console.log('Is authenticated:', isAuthenticated);
                          console.log('Is validating:', isValidating);
                          console.log('Disabled state:', isValidating);
                          e.preventDefault();
                          e.stopPropagation();
                          nextStep();
                        }}
                        disabled={isValidating}
                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        {isValidating ? (
                          <>⏳ Validating...</>
                        ) : (
                          `Next Step ${currentStep + 1} (With validation)`
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        console.log('=== SUBMIT BUTTON CLICKED OUTSIDE FORM ===');
                        const formData = form.getValues();
                        console.log('Form data:', formData);
                        onSubmit(formData);
                      }}
                      disabled={submitApplicationMutation.isPending}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      {submitApplicationMutation.isPending ? (
                        <>⏳ Submitting...</>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vehicle Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{vehicleData?.make} {vehicleData?.model}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Year: {vehicleData?.year}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-lg font-bold text-purple-600">
                      KES {parseFloat(vehicleData?.price || '0').toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Product Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Loan Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{loanProduct?.productName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{loanProduct?.bankName}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Interest Rate:</span>
                      <span>{loanProduct?.minInterestRate}% - {loanProduct?.maxInterestRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Financing:</span>
                      <span>{(parseFloat(loanProduct?.maxFinancingPercentage || '0') * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Min Down Payment:</span>
                      <span>{(parseFloat(loanProduct?.minDownPaymentPercentage || '0') * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  
                  {loanProduct?.features && loanProduct.features.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h5 className="font-medium mb-2">Features:</h5>
                        <div className="space-y-1">
                          {loanProduct.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Contact our loan specialists for assistance with your application.</p>
                  <div>
                    <p className="font-medium">Phone: +254-700-000-000</p>
                    <p className="font-medium">Email: loans@gariyangu.com</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Available Monday - Friday, 8:00 AM - 6:00 PM EAT
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}