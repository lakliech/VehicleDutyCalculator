import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ModuleNavigation } from '@/components/module-navigation';
import { apiRequest } from '@/lib/queryClient';
import { loanApplicationSchema, type InsertLoanApplication } from '@shared/schema';
import { 
  CreditCard, 
  Banknote, 
  FileText, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  Users,
  Calculator,
  Phone
} from 'lucide-react';

interface BankPartner {
  id: number;
  bankName: string;
  logoUrl?: string;
  contactPhone?: string;
  isActive: boolean;
}

interface LoanProduct {
  id: number;
  bankId: number;
  productName: string;
  productType: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  minInterestRate: string;
  maxInterestRate: string;
  minTenureMonths: number;
  maxTenureMonths: number;
  maxFinancingPercentage: string;
  minDownPaymentPercentage: string;
  processingFeeRate?: string;
  processingFeeFixed?: string;
  insuranceRequired: boolean;
  guarantorRequired: boolean;
  minMonthlyIncome?: string;
  maxAge?: number;
  eligibilityCriteria?: string[];
  requiredDocuments?: string[];
  features?: string[];
  bankName?: string;
}

export default function LoanPreApproval() {
  const { toast } = useToast();
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [calculatedPayment, setCalculatedPayment] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayable: number;
  } | null>(null);

  const form = useForm<InsertLoanApplication>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      nationalId: '',
      maritalStatus: 'single',
      employmentStatus: 'employed',
      employerName: '',
      jobTitle: '',
      monthlyIncome: 0,
      monthlyExpenses: 0,
      requestedAmount: 0,
      downPaymentAmount: 0,
      preferredTenureMonths: 12,
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: new Date().getFullYear(),
      vehiclePrice: 0,
    },
  });

  // Fetch bank partners
  const { data: banks = [] } = useQuery<BankPartner[]>({
    queryKey: ['/api/financial/banks'],
  });

  // Fetch loan products for selected bank
  const { data: loanProducts = [] } = useQuery<LoanProduct[]>({
    queryKey: ['/api/financial/loan-products', selectedBank],
    enabled: !!selectedBank,
  });

  // Submit loan application
  const submitApplication = useMutation({
    mutationFn: (data: InsertLoanApplication & { loanProductId: number }) =>
      apiRequest('post', '/api/financial/loan-application', data),
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your loan pre-approval application has been submitted successfully. You'll receive a response within 24-48 hours.",
      });
      form.reset();
      setSelectedBank(null);
      setSelectedProduct(null);
      setCalculatedPayment(null);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Calculate loan payment
  const calculatePayment = useMutation({
    mutationFn: (data: {
      vehiclePrice: number;
      downPayment: number;
      interestRate: number;
      tenureMonths: number;
    }) => apiRequest('post', '/api/financial/calculate-loan', data),
    onSuccess: (data) => {
      setCalculatedPayment(data);
    },
  });

  const onSubmit = (data: InsertLoanApplication) => {
    if (!selectedProduct) {
      toast({
        title: "Product Required",
        description: "Please select a loan product before submitting.",
        variant: "destructive",
      });
      return;
    }

    submitApplication.mutate({
      ...data,
      loanProductId: selectedProduct,
    });
  };

  const handleCalculatePayment = () => {
    const selectedProductData = loanProducts.find(p => p.id === selectedProduct);
    if (!selectedProductData) return;

    const vehiclePrice = form.getValues('vehiclePrice');
    const downPayment = form.getValues('downPaymentAmount');
    const tenureMonths = form.getValues('preferredTenureMonths');
    const interestRate = parseFloat(selectedProductData.minInterestRate);

    if (vehiclePrice && downPayment >= 0 && tenureMonths && interestRate) {
      calculatePayment.mutate({
        vehiclePrice,
        downPayment,
        interestRate,
        tenureMonths,
      });
    }
  };

  const selectedProductData = loanProducts.find(p => p.id === selectedProduct);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <ModuleNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Loan Pre-Approval</h1>
          <p className="text-gray-600">Get instant pre-approval for your vehicle financing from our trusted bank partners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Application Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bank Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Choose Your Bank Partner
                </CardTitle>
                <CardDescription>
                  Select from our verified banking partners offering competitive rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {banks.map((bank) => (
                    <Card
                      key={bank.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedBank === bank.id
                          ? 'ring-2 ring-purple-500 border-purple-200'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedBank(bank.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {bank.logoUrl && (
                            <img
                              src={bank.logoUrl}
                              alt={bank.bankName}
                              className="h-8 w-8 rounded object-contain"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{bank.bankName}</h3>
                            {bank.contactPhone && (
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {bank.contactPhone}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Loan Product Selection */}
            {selectedBank && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    Select Loan Product
                  </CardTitle>
                  <CardDescription>
                    Choose the loan product that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanProducts.map((product) => (
                      <Card
                        key={product.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedProduct === product.id
                            ? 'ring-2 ring-purple-500 border-purple-200'
                            : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{product.productName}</h3>
                              <Badge variant="secondary" className="mt-1">
                                {product.productType.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Interest Rate</p>
                              <p className="font-bold text-purple-600">
                                {product.minInterestRate}% - {product.maxInterestRate}%
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Loan Amount</p>
                              <p className="font-semibold">
                                KES {parseInt(product.minLoanAmount).toLocaleString()} - {parseInt(product.maxLoanAmount).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Tenure</p>
                              <p className="font-semibold">
                                {product.minTenureMonths} - {product.maxTenureMonths} months
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Max Financing</p>
                              <p className="font-semibold">
                                {(parseFloat(product.maxFinancingPercentage) * 100).toFixed(0)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Min Down Payment</p>
                              <p className="font-semibold">
                                {(parseFloat(product.minDownPaymentPercentage) * 100).toFixed(0)}%
                              </p>
                            </div>
                          </div>
                          {product.features && product.features.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {product.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {product.features.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Form */}
            {selectedProduct && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Application Details
                  </CardTitle>
                  <CardDescription>
                    Fill in your details for loan pre-approval assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="applicantName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="applicantEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
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
                                  <Input placeholder="0712345678" {...field} />
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
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    {...field} 
                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                  />
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
                      </div>

                      <Separator />

                      {/* Employment Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Employment Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="employmentStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Employment Status</FormLabel>
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
                                <FormLabel>Employer Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Company name" {...field} />
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
                                  <Input placeholder="Your position" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="monthlyIncome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Income (KES)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="50000" 
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
                                    placeholder="20000" 
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

                      <Separator />

                      {/* Loan & Vehicle Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Loan & Vehicle Information</h3>
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
                                    placeholder="1000000" 
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
                            name="downPaymentAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Down Payment (KES)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="200000" 
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
                            name="preferredTenureMonths"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Tenure (Months)</FormLabel>
                                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
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
                            name="vehiclePrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Price (KES)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="1200000" 
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
                            name="vehicleMake"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Make</FormLabel>
                                <FormControl>
                                  <Input placeholder="Toyota" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Model</FormLabel>
                                <FormControl>
                                  <Input placeholder="Camry" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Year</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="2023" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || new Date().getFullYear())}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCalculatePayment}
                          disabled={calculatePayment.isPending}
                          className="flex items-center gap-2"
                        >
                          <Calculator className="h-4 w-4" />
                          Calculate Payment
                        </Button>
                        <Button
                          type="submit"
                          disabled={submitApplication.isPending}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Submit Application
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loan Calculator Results */}
            {calculatedPayment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    Payment Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-bold text-lg">
                        KES {calculatedPayment.monthlyPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold">
                        KES {calculatedPayment.totalInterest.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payable:</span>
                      <span className="font-semibold">
                        KES {calculatedPayment.totalPayable.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Requirements */}
            {selectedProductData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProductData.eligibilityCriteria && (
                      <div>
                        <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                        <ul className="space-y-1">
                          {selectedProductData.eligibilityCriteria.map((criteria, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProductData.requiredDocuments && (
                      <div>
                        <h4 className="font-semibold mb-2">Required Documents</h4>
                        <ul className="space-y-1">
                          {selectedProductData.requiredDocuments.map((document, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <FileText className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              {document}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span className={selectedProductData.guarantorRequired ? 'text-orange-600' : 'text-green-600'}>
                          {selectedProductData.guarantorRequired ? 'Guarantor Required' : 'No Guarantor Required'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-3 w-3 text-blue-500" />
                        <span className={selectedProductData.insuranceRequired ? 'text-blue-600' : 'text-gray-600'}>
                          {selectedProductData.insuranceRequired ? 'Insurance Required' : 'Insurance Optional'}
                        </span>
                      </div>
                      {selectedProductData.minMonthlyIncome && (
                        <div className="flex items-center gap-2 text-sm">
                          <Banknote className="h-3 w-3 text-purple-500" />
                          <span className="text-purple-600">
                            Min Income: KES {parseInt(selectedProductData.minMonthlyIncome).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Fast Pre-Approval</p>
                      <p className="text-xs text-gray-600">Get approved within 24-48 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Banknote className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Competitive Rates</p>
                      <p className="text-xs text-gray-600">Access to best market rates</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Expert Support</p>
                      <p className="text-xs text-gray-600">Dedicated relationship managers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Secure Process</p>
                      <p className="text-xs text-gray-600">Bank-grade security & privacy</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}