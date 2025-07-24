import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
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
  CheckCircle
} from "lucide-react";

const registrationSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Please select a category"),
  subcategoryId: z.string().optional(),
  contactPerson: z.string().min(2, "Contact person name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required").optional().or(z.literal("")),
  website: z.string().url("Valid website URL is required").optional().or(z.literal("")),
  county: z.string().min(1, "Please select a county"),
  area: z.string().min(1, "Please select an area"),
  address: z.string().optional(),
  services: z.string().optional(),
  priceRange: z.string().optional(),
  operatingHours: z.string().optional(),
  socialMediaLinks: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  yearsInBusiness: z.string().optional()
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function EcosystemRegistration() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [additionalPhones, setAdditionalPhones] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      businessName: "",
      description: "",
      categoryId: "",
      subcategoryId: "",
      contactPerson: "",
      phoneNumber: "",
      email: "",
      website: "",
      county: "",
      area: "",
      address: "",
      services: "",
      priceRange: "",
      operatingHours: "",
      socialMediaLinks: "",
      businessRegistrationNumber: "",
      yearsInBusiness: ""
    },
  });

  // Watch category to reload subcategories
  const selectedCategory = form.watch("categoryId");
  const selectedCounty = form.watch("county");

  // Fetch service categories
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/ecosystem/categories'],
  });

  // Fetch subcategories when category is selected
  const { data: subcategories = [] } = useQuery({
    queryKey: ['/api/ecosystem/categories', selectedCategory, 'subcategories'],
    enabled: !!selectedCategory
  });

  // Fetch Kenya counties
  const { data: counties = [] } = useQuery({
    queryKey: ['/api/kenyan-counties'],
  });

  // Fetch areas when county is selected
  const { data: areas = [] } = useQuery({
    queryKey: ['/api/kenyan-counties', selectedCounty, 'areas'],
    enabled: !!selectedCounty
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationForm & { additionalPhones: string[]; socialLinks: string[] }) => {
      return apiRequest("POST", "/api/ecosystem/providers", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Your business has been submitted for review. You'll be notified once verified.",
      });
      setCurrentStep(4); // Success step
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: RegistrationForm) => {
    // Combine main phone with additional phones
    const allPhones = [data.phoneNumber, ...additionalPhones.filter(phone => phone.trim())];
    
    // Combine social media links
    const allSocialLinks = socialLinks.filter(link => link.trim());

    await registerMutation.mutateAsync({
      ...data,
      additionalPhones: allPhones,
      socialLinks: allSocialLinks
    });
  };

  const addPhoneNumber = () => {
    if (additionalPhones.length < 3) {
      setAdditionalPhones([...additionalPhones, ""]);
    }
  };

  const removePhoneNumber = (index: number) => {
    setAdditionalPhones(additionalPhones.filter((_, i) => i !== index));
  };

  const updatePhoneNumber = (index: number, value: string) => {
    const updated = [...additionalPhones];
    updated[index] = value;
    setAdditionalPhones(updated);
  };

  const addSocialLink = () => {
    if (socialLinks.length < 5) {
      setSocialLinks([...socialLinks, ""]);
    }
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Registration Complete!</CardTitle>
            <CardDescription>
              Your business has been submitted for review. We'll notify you once it's verified and live in the ecosystem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button 
                onClick={() => setLocation("/ecosystem")}
                className="bg-green-600 hover:bg-green-700"
              >
                Browse Ecosystem
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Kenya's Automotive Ecosystem
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Register your automotive business or service to connect with customers across Kenya
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Tell us about your automotive business or service
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ABC Motors Ltd" {...field} />
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
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your automotive business, services, and what makes you unique..."
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed to potential customers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((category: any) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.name}
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
                      name="subcategoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={!selectedCategory}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subcategories?.map((subcategory: any) => (
                                <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                                  {subcategory.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessRegistrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Registration Number</FormLabel>
                          <FormControl>
                            <Input placeholder="KRA PIN or Company Registration" {...field} />
                          </FormControl>
                          <FormDescription>
                            Helps customers identify legitimate businesses
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearsInBusiness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years in Business</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 5" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                      Next Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Contact & Location */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Contact & Location Information
                  </CardTitle>
                  <CardDescription>
                    How can customers reach you and where are you located?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Primary Phone */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., +254712345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional Phones */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <FormLabel>Additional Phone Numbers</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPhoneNumber}
                        disabled={additionalPhones.length >= 3}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Phone
                      </Button>
                    </div>
                    {additionalPhones.map((phone, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Additional phone number"
                          value={phone}
                          onChange={(e) => updatePhoneNumber(index, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePhoneNumber(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="business@example.com" type="email" {...field} />
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

                  {/* Location */}
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
                              {counties?.map((county: any) => (
                                <SelectItem key={county.county} value={county.county}>
                                  {county.county}
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
                          <FormLabel>Area/Town *</FormLabel>
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
                              {areas?.map((area: any) => (
                                <SelectItem key={area.area} value={area.area}>
                                  {area.area}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physical Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Building name, street, landmark, etc."
                            rows={2}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Social Media Links */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <FormLabel>Social Media Links</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSocialLink}
                        disabled={socialLinks.length >= 5}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Link
                      </Button>
                    </div>
                    {socialLinks.map((link, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="https://facebook.com/yourbusiness"
                          value={link}
                          onChange={(e) => updateSocialLink(index, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSocialLink(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="button" onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                      Next Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Service Details */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Service Details
                  </CardTitle>
                  <CardDescription>
                    Provide details about your services, pricing, and operating hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services Offered</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the specific services you offer (e.g., engine repair, oil change, wheel alignment, etc.)"
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Be specific about your services to help customers find you
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select price range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="budget">Budget (KES 500 - 2,000)</SelectItem>
                              <SelectItem value="mid-range">Mid-range (KES 2,000 - 10,000)</SelectItem>
                              <SelectItem value="premium">Premium (KES 10,000 - 50,000)</SelectItem>
                              <SelectItem value="luxury">Luxury (KES 50,000+)</SelectItem>
                              <SelectItem value="varies">Varies by Service</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="operatingHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operating Hours</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Mon-Fri: 8AM-6PM, Sat: 8AM-4PM" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={registerMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}