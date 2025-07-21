import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Building, CheckCircle, Upload, MapPin, Phone, Mail, 
  CreditCard, Shield, Award, ArrowLeft, ArrowRight,
  User, Globe, Camera, FileText, Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

// Registration stages
type RegistrationStage = "account" | "profile" | "package" | "verification" | "complete";

// Form schemas for each stage
const accountSchema = z.object({
  businessEmail: z.string().email("Valid business email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val, "You must accept terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const profileSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.enum(["individual", "limited", "franchise"]),
  location: z.string().min(1, "Location is required"),
  yearsInBusiness: z.number().min(0).max(50),
  kraPin: z.string().optional(),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  whatsappNumber: z.string().optional(),
  description: z.string().max(300, "Description must be under 300 characters"),
  website: z.string().url().optional().or(z.literal("")),
  specialties: z.array(z.string()),
});

const packageSchema = z.object({
  packageType: z.enum(["free", "premium", "featured"]),
});

const verificationSchema = z.object({
  businessRegistration: z.any().optional(),
  directorId: z.any().optional(),
  locationProof: z.any().optional(),
});

export default function DealerRegistration() {
  const [currentStage, setCurrentStage] = useState<RegistrationStage>("account");
  const [registrationData, setRegistrationData] = useState<any>({});
  const [, setLocation] = useLocation();

  // Calculate progress percentage
  const getProgress = () => {
    const stages = ["account", "profile", "package", "verification", "complete"];
    const currentIndex = stages.indexOf(currentStage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  // Account Setup Form
  const accountForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      businessEmail: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Profile Setup Form
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      businessName: "",
      businessType: "individual" as const,
      location: "",
      yearsInBusiness: 0,
      kraPin: "",
      phoneNumber: "",
      whatsappNumber: "",
      description: "",
      website: "",
      specialties: [],
    },
  });

  // Package Selection Form
  const packageForm = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      packageType: "free" as const,
    },
  });

  // Verification Form
  const verificationForm = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      businessRegistration: null,
      directorId: null,
      locationProof: null,
    },
  });

  // Register dealer mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/dealers/register", data);
    },
    onSuccess: () => {
      setCurrentStage("complete");
      toast({
        title: "Registration Successful!",
        description: "Your dealer application has been submitted for review.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleAccountSubmit = (data: z.infer<typeof accountSchema>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setCurrentStage("profile");
  };

  const handleProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setCurrentStage("package");
  };

  const handlePackageSubmit = (data: z.infer<typeof packageSchema>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setCurrentStage("verification");
  };

  const handleVerificationSubmit = (data: z.infer<typeof verificationSchema>) => {
    const finalData = { ...registrationData, ...data };
    registerMutation.mutate(finalData);
  };

  const stages = [
    { id: "account", title: "Account Setup", icon: User },
    { id: "profile", title: "Business Profile", icon: Building },
    { id: "package", title: "Package Selection", icon: CreditCard },
    { id: "verification", title: "Verification", icon: Shield },
    { id: "complete", title: "Complete", icon: CheckCircle },
  ];

  const specialtyOptions = [
    "Luxury Cars", "Economy Cars", "SUVs & 4WDs", "Trucks & Commercial",
    "Motorcycles", "Electric Vehicles", "Classic Cars", "Import Services",
    "Financing", "Insurance", "Parts & Accessories", "Maintenance & Repair"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Register as a Dealer
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Join Kenya's premier automotive marketplace and grow your business
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <Progress value={getProgress()} className="h-3 mb-4" />
            <div className="flex justify-between items-center">
              {stages.map((stage, index) => {
                const isActive = stage.id === currentStage;
                const isCompleted = stages.findIndex(s => s.id === currentStage) > index;
                const Icon = stage.icon;
                
                return (
                  <div key={stage.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-purple-600 text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {stage.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Registration Forms */}
        <div className="max-w-2xl mx-auto">
          {/* Stage 1: Account Setup */}
          {currentStage === "account" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...accountForm}>
                  <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)} className="space-y-6">
                    <FormField
                      control={accountForm.control}
                      name="businessEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="business@company.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password *</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="Create a strong password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password *</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="Confirm your password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountForm.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I accept the Terms & Conditions and Platform Policy *
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center gap-2">
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Business Profile Setup */}
          {currentStage === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Business Profile Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your dealership name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="limited">Limited Company</SelectItem>
                                <SelectItem value="franchise">Franchise</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="City, County" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="yearsInBusiness"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years in Business</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="0" 
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="+254 700 000 000" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="whatsappNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="+254 700 000 000" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="kraPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KRA PIN (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="P000000000A" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Tell customers about your business..." 
                              className="max-h-32" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://yourwebsite.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label className="text-base font-medium">Specialties</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {specialtyOptions.map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <Checkbox
                              id={specialty}
                              checked={profileForm.watch("specialties").includes(specialty)}
                              onCheckedChange={(checked) => {
                                const current = profileForm.getValues("specialties");
                                if (checked) {
                                  profileForm.setValue("specialties", [...current, specialty]);
                                } else {
                                  profileForm.setValue("specialties", current.filter(s => s !== specialty));
                                }
                              }}
                            />
                            <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setCurrentStage("account")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Package Selection */}
          {currentStage === "package" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Choose Your Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...packageForm}>
                  <form onSubmit={packageForm.handleSubmit(handlePackageSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Free Package */}
                      <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        packageForm.watch("packageType") === "free" ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`} onClick={() => packageForm.setValue("packageType", "free")}>
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">Free</h3>
                          <p className="text-3xl font-bold text-purple-600 mb-4">KES 0</p>
                          <ul className="text-left space-y-2 text-sm">
                            <li>• Up to 5 listings/month</li>
                            <li>• Basic profile</li>
                            <li>• Standard support</li>
                          </ul>
                        </div>
                      </div>

                      {/* Premium Package */}
                      <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        packageForm.watch("packageType") === "premium" ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`} onClick={() => packageForm.setValue("packageType", "premium")}>
                        <div className="text-center">
                          <Badge className="mb-2">Popular</Badge>
                          <h3 className="text-xl font-bold mb-2">Premium</h3>
                          <p className="text-3xl font-bold text-purple-600 mb-4">KES 5,000<span className="text-sm">/month</span></p>
                          <ul className="text-left space-y-2 text-sm">
                            <li>• Unlimited listings</li>
                            <li>• Enhanced profile with branding</li>
                            <li>• Analytics dashboard</li>
                            <li>• Priority support</li>
                          </ul>
                        </div>
                      </div>

                      {/* Featured Package */}
                      <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        packageForm.watch("packageType") === "featured" ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`} onClick={() => packageForm.setValue("packageType", "featured")}>
                        <div className="text-center">
                          <Badge variant="secondary" className="mb-2">Best Value</Badge>
                          <h3 className="text-xl font-bold mb-2">Featured</h3>
                          <p className="text-3xl font-bold text-purple-600 mb-4">KES 10,000<span className="text-sm">/month</span></p>
                          <ul className="text-left space-y-2 text-sm">
                            <li>• Everything in Premium</li>
                            <li>• Homepage exposure</li>
                            <li>• Featured badge</li>
                            <li>• Advanced analytics</li>
                            <li>• Dedicated support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setCurrentStage("profile")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Stage 4: Verification */}
          {currentStage === "verification" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...verificationForm}>
                  <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Business Registration Certificate</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Director ID or KRA PIN Certificate</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Location Proof (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Utility bill or business location photo</p>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Verification Process</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Your documents will be reviewed within 2-3 business days. You'll receive an email notification once your account is verified.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setCurrentStage("package")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit" disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? "Submitting..." : "Complete Registration"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Stage 5: Registration Complete */}
          {currentStage === "complete" && (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Gariyangu!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Your dealer registration has been submitted successfully.
                </p>
                
                <div className="max-w-md mx-auto space-y-4 text-left mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Complete profile ✓</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Post your first car</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span>Track inquiries & boost listings</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button onClick={() => setLocation("/sell-my-car")} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Post Your First Vehicle
                  </Button>
                  <Button variant="outline" onClick={() => setLocation("/dealer/profile")} className="w-full">
                    View Dealer Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}