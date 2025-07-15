import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Car, DollarSign, FileText, User, Check, Clock } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

// Schema for loan application form
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
  preferredTenureMonths: z.coerce.number().min(12).max(84, "Tenure must be between 12 and 84 months")
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
  
  // Simple step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
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

  // Form setup
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
      preferredTenureMonths: 60
    }
  });

  // Set default loan amount and terms when vehicle price and product are available
  useEffect(() => {
    if (vehicleData && loanProduct && Array.isArray(loanProduct) && loanProduct.length > 0) {
      const vehiclePrice = parseFloat(vehicleData.price);
      const product = loanProduct[0];
      const maxFinancingPercentage = parseFloat(product.maxFinancingPercentage);
      const maxLoanAmount = vehiclePrice * (maxFinancingPercentage / 100);
      const minDownPayment = vehiclePrice * (parseFloat(product.minDownPaymentPercentage) / 100);
      
      // Auto-populate loan amount from vehicle price
      form.setValue('requestedAmount', Math.round(maxLoanAmount));
      form.setValue('downPaymentAmount', Math.round(minDownPayment));
      
      // Auto-set preferred tenure to product's maximum tenure
      form.setValue('preferredTenureMonths', product.maxTenureMonths);
    }
  }, [vehicleData, loanProduct, form]);

  // Submit mutation
  const submitApplicationMutation = useMutation({
    mutationFn: async (data: LoanApplicationForm) => {
      const response = await apiRequest('POST', '/api/financial/loan-applications', {
        ...data,
        loanProductId: parseInt(productId!),
        vehicleListingId: parseInt(carId!),
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application ${data.applicationNumber} has been submitted for review.`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/financial/loan-applications'] });
      setLocation('/loan-applications');
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit loan application. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Clean navigation functions with validation
  const nextStep = async () => {
    try {
      // Define fields to validate for each step
      const getFieldsForStep = (step: number): (keyof LoanApplicationForm)[] => {
        switch (step) {
          case 1:
            return ['applicantName', 'applicantEmail', 'applicantPhone', 'nationalId', 'dateOfBirth', 'maritalStatus'];
          case 2:
            return ['employmentStatus', 'monthlyIncome', 'employerName'];
          case 3:
            return ['requestedAmount', 'downPaymentAmount', 'preferredTenureMonths'];
          default:
            return [];
        }
      };

      // Skip validation for final step (review)
      if (currentStep >= totalSteps) {
        return;
      }
      
      // Validate current step fields
      const fieldsToValidate = getFieldsForStep(currentStep);
      const isStepValid = await form.trigger(fieldsToValidate);
      
      if (isStepValid) {
        setCurrentStep(currentStep + 1);
      } else {
        toast({
          title: "Please complete all required fields",
          description: "Fill in all required fields before proceeding to the next step.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: LoanApplicationForm) => {
    submitApplicationMutation.mutate(data);
  };

  if (!match) {
    return <div>Invalid loan application URL</div>;
  }

  if (loadingVehicle || loadingProduct || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!authStatus?.authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to continue with your loan application</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation('/login')} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
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
              Apply for financing through {Array.isArray(loanProduct) && loanProduct.length > 0 ? loanProduct[0]?.bankName : 'Selected Bank'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {currentStep === 1 && <User className="h-5 w-5 mr-2" />}
                  {currentStep === 2 && <DollarSign className="h-5 w-5 mr-2" />}
                  {currentStep === 3 && <Check className="h-5 w-5 mr-2" />}
                  
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Employment & Income"}
                  {currentStep === 3 && "Review & Submit"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Please provide your personal details"}
                  {currentStep === 2 && "Tell us about your employment and income"}
                  {currentStep === 3 && "Review your application before submitting"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="applicantName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="applicantEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your.email@example.com" {...field} />
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
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="0712345678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="nationalId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>National ID *</FormLabel>
                                <FormControl>
                                  <Input placeholder="12345678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth *</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="maritalStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marital Status *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select marital status" />
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
                    )}

                    {/* Step 2: Financial Information */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="employmentStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employment Status *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                        <FormField
                          control={form.control}
                          name="employerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employer/Company Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter employer or company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="monthlyIncome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Income (KES) *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="50000"
                                    {...field}
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
                                    placeholder="20000"
                                    {...field}
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
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="requestedAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Requested Loan Amount (KES) *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="1000000"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="downPaymentAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Down Payment (KES) *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="200000"
                                    {...field}
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
                              <FormLabel>Preferred Loan Tenure (Months) *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="60"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />


                      </div>
                    )}

                    {/* Step 3: Review */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><strong>Name:</strong> {form.watch('applicantName')}</p>
                              <p><strong>Email:</strong> {form.watch('applicantEmail')}</p>
                              <p><strong>Phone:</strong> {form.watch('applicantPhone')}</p>
                              <p><strong>National ID:</strong> {form.watch('nationalId')}</p>
                            </div>
                            <div>
                              <p><strong>Monthly Income:</strong> KES {form.watch('monthlyIncome')?.toLocaleString()}</p>
                              <p><strong>Employer:</strong> {form.watch('employerName')}</p>
                              <p><strong>Loan Amount:</strong> KES {form.watch('requestedAmount')?.toLocaleString()}</p>
                              <p><strong>Down Payment:</strong> KES {form.watch('downPaymentAmount')?.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 dark:text-blue-100">Next Steps</h4>
                              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                                After submission, your application will be reviewed within 2-3 business days. 
                                You'll receive updates via email and SMS.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </form>
                </Form>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 mt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={submitApplicationMutation.isPending}
                    >
                      {submitApplicationMutation.isPending ? 'Submitting...' : 'Submit Application'}
                    </Button>
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
                {vehicleData ? (
                  <div className="space-y-2 text-sm">
                    <p><strong>Make:</strong> {vehicleData.make}</p>
                    <p><strong>Model:</strong> {vehicleData.model}</p>
                    <p><strong>Year:</strong> {vehicleData.year}</p>
                    <p><strong>Price:</strong> KES {parseFloat(vehicleData.price).toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Loading vehicle details...</p>
                )}
              </CardContent>
            </Card>

            {/* Loan Product Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Loan Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(loanProduct) && loanProduct.length > 0 ? (
                  <div className="space-y-2 text-sm">
                    <p><strong>Bank:</strong> {loanProduct[0].bankName}</p>
                    <p><strong>Product:</strong> {loanProduct[0].productName}</p>
                    <p><strong>Interest Rate:</strong> {loanProduct[0].minInterestRate}% - {loanProduct[0].maxInterestRate}%</p>
                    <p><strong>Max Financing:</strong> {loanProduct[0].maxFinancingPercentage}%</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Loading loan product details...</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}