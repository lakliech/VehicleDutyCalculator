import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  DollarSign,
  FileText,
  Plus,
  X,
  CheckCircle,
  Upload,
  Image as ImageIcon,
  Camera,
  Star,
  ArrowRight,
  ArrowLeft,
  ChevronDown
} from "lucide-react";

// Progressive disclosure registration schema - starts light, expands later
const baseRegistrationSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  shortDescription: z.string().max(300, "Description must be under 300 characters").optional(),
  contactPerson: z.string().min(2, "Contact person name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required").optional().or(z.literal("")),
  county: z.string().min(1, "Please select a county"),
  area: z.string().min(1, "Please select an area"),
  categoryIds: z.array(z.string()).min(1, "Please select at least one category"),
  subcategoryIds: z.array(z.string()).optional(),
  yearsInOperation: z.string().optional(),
  priceRange: z.string().optional(),
  servicesOffered: z.string().optional(),
  workingHours: z.string().optional(),
  website: z.string().url("Valid website URL is required").optional().or(z.literal("")),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  kraPin: z.string().optional(),
  verificationDocumentUrl: z.string().optional(),
});

type RegistrationForm = z.infer<typeof baseRegistrationSchema>;

const steps = [
  { id: 1, title: "Basic Info", description: "Business name and description" },
  { id: 2, title: "Categories", description: "Select services you offer" },
  { id: 3, title: "Contact & Location", description: "How customers reach you" },
  { id: 4, title: "Business Details", description: "Additional information" },
  { id: 5, title: "Verification", description: "Optional verification documents" }
];

export default function EcosystemRegistration() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(baseRegistrationSchema),
    defaultValues: {
      businessName: "",
      shortDescription: "",
      contactPerson: "",
      phoneNumber: "",
      email: "",
      county: "",
      area: "",
      categoryIds: [],
      subcategoryIds: [],
      yearsInOperation: "",
      priceRange: "",
      servicesOffered: "",
      workingHours: "",
      website: "",
      logoUrl: "",
      bannerUrl: "",
      businessRegistrationNumber: "",
      kraPin: "",
      verificationDocumentUrl: "",
    },
  });

  // Fetch service categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/ecosystem/categories'],
  });

  // Fetch subcategories when categories are selected
  const { data: allSubcategories } = useQuery({
    queryKey: ['/api/ecosystem/subcategories/all'],
    enabled: selectedCategories.length > 0
  });

  // Fetch Kenya counties for location
  const { data: counties } = useQuery({
    queryKey: ['/api/kenyan-counties'],
  });

  // Fetch areas when county is selected
  const selectedCounty = form.watch("county");
  const { data: areas } = useQuery({
    queryKey: [`/api/kenyan-counties/${selectedCounty}/areas`],
    enabled: !!selectedCounty
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      return await apiRequest("POST", "/api/ecosystem/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Your business has been registered. We'll review your information and contact you soon.",
      });
      setLocation("/ecosystem");
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newCategories);
    form.setValue("categoryIds", newCategories);
  };

  const handleSubcategoryToggle = (subcategoryId: string) => {
    const newSubcategories = selectedSubcategories.includes(subcategoryId)
      ? selectedSubcategories.filter(id => id !== subcategoryId)
      : [...selectedSubcategories, subcategoryId];
    
    setSelectedSubcategories(newSubcategories);
    form.setValue("subcategoryIds", newSubcategories);
  };

  const handleFileUpload = (type: 'logo' | 'banner' | 'document') => {
    // Placeholder for file upload - would integrate with actual file upload service
    const input = type === 'logo' ? logoInputRef.current : 
                  type === 'banner' ? bannerInputRef.current : docInputRef.current;
    
    if (input) {
      input.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner' | 'document') => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder - would upload to actual file storage and get URL
      const mockUrl = `https://example.com/${type}/${file.name}`;
      if (type === 'logo') form.setValue("logoUrl", mockUrl);
      if (type === 'banner') form.setValue("bannerUrl", mockUrl);
      if (type === 'document') form.setValue("verificationDocumentUrl", mockUrl);
      
      toast({
        title: "File Selected",
        description: `${file.name} selected for upload`,
      });
    }
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      const isValid = await form.trigger(['businessName', 'contactPerson', 'phoneNumber']);
      if (!isValid) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      const isValid = await form.trigger(['categoryIds']);
      if (!isValid || selectedCategories.length === 0) {
        toast({
          title: "Category Selection Required",
          description: "Please select at least one category before proceeding.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      const isValid = await form.trigger(['county', 'area']);
      if (!isValid) {
        toast({
          title: "Location Required",
          description: "Please select your county and area before proceeding.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: RegistrationForm) => {
    registerMutation.mutate(data);
  };

  const getStepProgress = () => (currentStep / steps.length) * 100;

  const getFilteredSubcategories = () => {
    if (!allSubcategories || selectedCategories.length === 0) return [];
    return (allSubcategories as any[])?.filter((sub: any) => 
      selectedCategories.includes(sub.categoryId.toString())
    ) || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Ecosystem</h1>
          <p className="text-xl text-gray-600 mb-6">
            Connect with customers and grow your automotive business
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <Progress value={getStepProgress()} className="h-2" />
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex flex-col items-center ${
                  index + 1 <= currentStep ? 'text-purple-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index + 1 < currentStep ? 'bg-purple-600 text-white' :
                    index + 1 === currentStep ? 'bg-purple-100 text-purple-600 border-2 border-purple-600' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {index + 1 < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && <Building2 className="w-5 h-5" />}
                  {currentStep === 2 && <Star className="w-5 h-5" />}
                  {currentStep === 3 && <MapPin className="w-5 h-5" />}
                  {currentStep === 4 && <Clock className="w-5 h-5" />}
                  {currentStep === 5 && <FileText className="w-5 h-5" />}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name of contact person" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 0722123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of your business (max 300 characters)"
                              maxLength={300}
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value?.length || 0}/300 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <FormLabel>Business Logo (Optional)</FormLabel>
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleFileUpload('logo')}
                          className="flex items-center gap-2"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Upload Logo
                        </Button>
                        {form.watch("logoUrl") && (
                          <Badge variant="secondary">Logo selected</Badge>
                        )}
                      </div>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFileChange(e, 'logo')}
                      />
                    </div>

                    {/* Banner Upload */}
                    <div className="space-y-2">
                      <FormLabel>Cover Image / Banner (Optional)</FormLabel>
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleFileUpload('banner')}
                          className="flex items-center gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          Upload Banner
                        </Button>
                        {form.watch("bannerUrl") && (
                          <Badge variant="secondary">Banner selected</Badge>
                        )}
                      </div>
                      <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFileChange(e, 'banner')}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Categories */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <FormLabel className="text-base font-semibold">
                        Select Categories You Serve *
                      </FormLabel>
                      <FormDescription className="mb-4">
                        Choose all categories that apply to your business
                      </FormDescription>
                      
                      {categoriesLoading ? (
                        <div className="text-center py-8">Loading categories...</div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(categories as any[])?.map((category) => (
                            <Card 
                              key={category.id} 
                              className={`cursor-pointer transition-all ${
                                selectedCategories.includes(category.id.toString())
                                  ? 'ring-2 ring-purple-500 bg-purple-50'
                                  : 'hover:shadow-md'
                              }`}
                              onClick={() => handleCategoryToggle(category.id.toString())}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    checked={selectedCategories.includes(category.id.toString())}
                                    onChange={() => {}}
                                  />
                                  <div>
                                    <h3 className="font-medium">{category.name}</h3>
                                    <p className="text-sm text-gray-600">{category.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Subcategories */}
                    {selectedCategories.length > 0 && (
                      <div>
                        <FormLabel className="text-base font-semibold">
                          Select Specific Services (Optional)
                        </FormLabel>
                        <FormDescription className="mb-4">
                          Choose specific services you offer
                        </FormDescription>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {getFilteredSubcategories().map((subcategory: any) => (
                            <div
                              key={subcategory.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                selectedSubcategories.includes(subcategory.id.toString())
                                  ? 'bg-purple-100 border-purple-500'
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleSubcategoryToggle(subcategory.id.toString())}
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={selectedSubcategories.includes(subcategory.id.toString())}
                                  onChange={() => {}}
                                />
                                <span className="text-sm">{subcategory.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="servicesOffered"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Services Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe any additional services you offer"
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Contact & Location */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="business@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourwebsite.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="county"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>County *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select county" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(counties as string[])?.map((county) => (
                                  <SelectItem key={county} value={county}>
                                    {county}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={!selectedCounty}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(areas as string[])?.map((area) => (
                                  <SelectItem key={area} value={area}>
                                    {area}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Business Details */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="yearsInOperation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years in Operation</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select years" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="11-20">11-20 years</SelectItem>
                                <SelectItem value="more-than-20">More than 20 years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priceRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing Information</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="budget">Budget-friendly (Under 50K)</SelectItem>
                                <SelectItem value="mid-range">Mid-range (50K - 200K)</SelectItem>
                                <SelectItem value="premium">Premium (200K - 500K)</SelectItem>
                                <SelectItem value="luxury">Luxury (500K+)</SelectItem>
                                <SelectItem value="on-request">Pricing on request</SelectItem>
                                <SelectItem value="varies">Varies by service</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="workingHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Working Hours</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Monday - Friday: 8AM - 6PM, Saturday: 8AM - 2PM" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            When are you available to serve customers?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 5: Verification */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Optional Verification</h3>
                      <p className="text-blue-800 text-sm">
                        Adding verification documents helps build trust with customers and may qualify you for premium features.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessRegistrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Registration Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., PVT-123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="kraPin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>KRA PIN / VAT Certificate</FormLabel>
                            <FormControl>
                              <Input placeholder="KRA PIN or VAT number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormLabel>Verification Documents</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleFileUpload('document')}
                        >
                          Upload Business Registration / KRA Certificate
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          PNG, JPG, PDF up to 10MB
                        </p>
                        {form.watch("verificationDocumentUrl") && (
                          <Badge variant="secondary" className="mt-2">Document selected</Badge>
                        )}
                      </div>
                      <input
                        ref={docInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => onFileChange(e, 'document')}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {registerMutation.isPending ? "Registering..." : "Complete Registration"}
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}