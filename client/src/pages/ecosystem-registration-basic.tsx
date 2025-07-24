import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Building2, CheckCircle } from "lucide-react";

export default function EcosystemRegistrationBasic() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
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

  // Fetch service categories
  const { data: categories } = useQuery({
    queryKey: ['/api/ecosystem/categories'],
  });

  // Fetch subcategories
  const { data: allSubcategories } = useQuery({
    queryKey: ['/api/ecosystem/subcategories/all'],
    enabled: formData.categoryIds.length > 0
  });

  // Fetch Kenya counties
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

  const handleSubmit = () => {
    // Basic validation
    if (!formData.businessName || !formData.contactPerson || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in business name, contact person, and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (formData.categoryIds.length === 0) {
      toast({
        title: "Missing Categories",
        description: "Please select at least one category.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.county || !formData.area) {
      toast({
        title: "Missing Location",
        description: "Please select county and area.",
        variant: "destructive",
      });
      return;
    }

    console.log("Submitting registration data:", JSON.stringify(formData, null, 2));
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Business Registration
            </CardTitle>
            <CardDescription>Fill in your business details to join our marketplace</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <Input
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                    placeholder="e.g., 0722123456"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="business@example.com"
                    type="email"
                  />
                </div>
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

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Categories *</h3>
              
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

              {formData.categoryIds.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-3">Subcategories (Optional)</label>
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

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Location *</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">County</label>
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
                  <label className="block text-sm font-medium mb-1">Area</label>
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

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Additional Details (Optional)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <div>
                  <label className="block text-sm font-medium mb-1">Working Hours</label>
                  <Input
                    value={formData.workingHours}
                    onChange={(e) => updateFormData("workingHours", e.target.value)}
                    placeholder="e.g., Mon-Fri 8AM-6PM, Sat 9AM-3PM"
                  />
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

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={registerMutation.isPending}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {registerMutation.isPending ? (
                  "Registering..."
                ) : (
                  <>
                    Complete Registration
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}