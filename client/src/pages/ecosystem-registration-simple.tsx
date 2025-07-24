import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Building2, 
  MapPin, 
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";

export default function EcosystemRegistrationSimple() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phoneNumber: "",
    shortDescription: "",
    email: "",
    website: "",
    county: "",
    area: "",
    categoryIds: [] as string[],
    subcategoryIds: [] as string[],
    yearsInOperation: "",
    priceRange: "",
    servicesOffered: "",
    workingHours: "",
    businessRegistrationNumber: "",
    kraPin: "",
  });

  const steps = [
    { id: 1, title: "Basic Info", description: "Business name and description" },
    { id: 2, title: "Categories", description: "Select services you offer" },
    { id: 3, title: "Contact & Location", description: "How customers reach you" },
    { id: 4, title: "Business Details", description: "Additional information" },
    { id: 5, title: "Complete", description: "Review and submit" }
  ];

  // Fetch service categories
  const { data: categories } = useQuery({
    queryKey: ['/api/ecosystem/categories'],
  });

  // Fetch subcategories when categories are selected
  const { data: allSubcategories } = useQuery({
    queryKey: ['/api/ecosystem/subcategories/all'],
    enabled: formData.categoryIds.length > 0
  });

  // Fetch Kenya counties for location
  const { data: counties } = useQuery({
    queryKey: ['/api/kenyan-counties'],
  });

  // Fetch areas when county is selected
  const { data: areas } = useQuery({
    queryKey: [`/api/kenyan-counties/${formData.county}/areas`],
    enabled: !!formData.county
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
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

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = formData.categoryIds.includes(categoryId)
      ? formData.categoryIds.filter(id => id !== categoryId)
      : [...formData.categoryIds, categoryId];
    updateFormData("categoryIds", newCategories);
  };

  const handleSubcategoryToggle = (subcategoryId: string) => {
    const newSubcategories = formData.subcategoryIds.includes(subcategoryId)
      ? formData.subcategoryIds.filter(id => id !== subcategoryId)
      : [...formData.subcategoryIds, subcategoryId];
    updateFormData("subcategoryIds", newSubcategories);
  };

  const nextStep = () => {
    console.log("nextStep called, current step:", currentStep);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      console.log("Moving to step:", currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    registerMutation.mutate(formData);
  };

  const getFilteredSubcategories = () => {
    if (!allSubcategories || formData.categoryIds.length === 0) return [];
    return (allSubcategories as any[])?.filter((sub: any) => 
      formData.categoryIds.includes(sub.categoryId.toString())
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
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                  index + 1 <= currentStep 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index + 1 < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs font-medium hidden sm:block ml-2">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name *</label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => updateFormData("businessName", e.target.value)}
                    placeholder="Your business name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Person *</label>
                  <Input
                    value={formData.contactPerson}
                    onChange={(e) => updateFormData("contactPerson", e.target.value)}
                    placeholder="Full name of contact person"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <Input
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                    placeholder="e.g., 0722123456"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Short Description</label>
                  <Textarea
                    value={formData.shortDescription}
                    onChange={(e) => updateFormData("shortDescription", e.target.value)}
                    placeholder="Brief description of your business (max 300 characters)"
                    maxLength={300}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.shortDescription.length}/300 characters
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Categories */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Select Categories *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(categories as any[])?.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={formData.categoryIds.includes(category.id.toString())}
                          onCheckedChange={() => handleCategoryToggle(category.id.toString())}
                        />
                        <label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.categoryIds.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-3">Select Subcategories (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getFilteredSubcategories().map((subcategory: any) => (
                        <div key={subcategory.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subcategory-${subcategory.id}`}
                            checked={formData.subcategoryIds.includes(subcategory.id.toString())}
                            onCheckedChange={() => handleSubcategoryToggle(subcategory.id.toString())}
                          />
                          <label htmlFor={`subcategory-${subcategory.id}`} className="text-sm">
                            {subcategory.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact & Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="business@example.com"
                      type="email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => updateFormData("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">County *</label>
                    <Select value={formData.county} onValueChange={(value) => updateFormData("county", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent>
                        {(counties as string[])?.map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Area *</label>
                    <Select 
                      value={formData.area} 
                      onValueChange={(value) => updateFormData("area", value)}
                      disabled={!formData.county}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {(areas as string[])?.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Business Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Years in Operation</label>
                    <Select value={formData.yearsInOperation} onValueChange={(value) => updateFormData("yearsInOperation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Range</label>
                    <Select value={formData.priceRange} onValueChange={(value) => updateFormData("priceRange", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget (Under 100K)</SelectItem>
                        <SelectItem value="mid-range">Mid-range (100K-500K)</SelectItem>
                        <SelectItem value="premium">Premium (500K+)</SelectItem>
                        <SelectItem value="luxury">Luxury (1M+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Services Offered</label>
                  <Textarea
                    value={formData.servicesOffered}
                    onChange={(e) => updateFormData("servicesOffered", e.target.value)}
                    placeholder="Describe any additional services you offer"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Working Hours</label>
                  <Input
                    value={formData.workingHours}
                    onChange={(e) => updateFormData("workingHours", e.target.value)}
                    placeholder="e.g., Mon-Fri 8AM-6PM, Sat 9AM-3PM"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Registration Number</label>
                    <Input
                      value={formData.businessRegistrationNumber}
                      onChange={(e) => updateFormData("businessRegistrationNumber", e.target.value)}
                      placeholder="Business registration number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">KRA PIN</label>
                    <Input
                      value={formData.kraPin}
                      onChange={(e) => updateFormData("kraPin", e.target.value)}
                      placeholder="KRA PIN or VAT number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Review Your Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Business:</strong> {formData.businessName}</p>
                  <p><strong>Contact:</strong> {formData.contactPerson}</p>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Email:</strong> {formData.email || "Not provided"}</p>
                  <p><strong>Location:</strong> {formData.area}, {formData.county}</p>
                  <p><strong>Categories:</strong> {formData.categoryIds.length} selected</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => {
                  console.log("PREVIOUS CLICKED");
                  alert("Previous clicked");
                  prevStep();
                }}
                disabled={currentStep === 1}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                ← Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={() => {
                    console.log("NEXT CLICKED - STEP:", currentStep);
                    alert("Next clicked! Current step: " + currentStep);
                    setCurrentStep(currentStep + 1);
                  }}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium"
                >
                  Next ({currentStep}/{steps.length}) →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    console.log("SUBMIT CLICKED");
                    alert("Submit clicked");
                    handleSubmit();
                  }}
                  disabled={registerMutation.isPending}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium disabled:opacity-50"
                >
                  {registerMutation.isPending ? "Registering..." : "Complete Registration ✓"}
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}