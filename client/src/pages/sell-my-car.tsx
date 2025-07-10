import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, ImagePlus, MapPin, Phone, Mail, Star, 
  Clock, Camera, Users, MessageSquare, Shield, CheckCircle, 
  Upload, Search, CarFront 
} from "lucide-react";
import { VehicleSelector } from "@/components/vehicle-selector";
import type { VehicleReference } from "@shared/schema";

// Car listing form schema
const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1990).max(2025),
  engineSize: z.number().min(500).max(10000),
  mileage: z.number().min(0).max(999999),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  bodyType: z.enum(["sedan", "hatchback", "suv", "estate", "coupe", "convertible", "pickup", "van"]),
  transmission: z.enum(["manual", "automatic"]),
  color: z.string().min(1, "Color is required"),
  condition: z.enum(["new", "locally_used", "foreign_used"]),
  driveConfiguration: z.enum(["2wd", "4wd", "awd"]),
  price: z.number().min(50000, "Price must be at least KES 50,000"),
  negotiable: z.boolean(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  features: z.array(z.string()),
  images: z.array(z.string()).max(8, "Maximum 8 photos allowed").optional(),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  whatsappNumber: z.string().optional(),
});

type ListingForm = z.infer<typeof listingSchema>;

export default function SellMyCar() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const { toast } = useToast();

  // Listing form
  const listingForm = useForm<ListingForm>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      make: "",
      model: "",
      year: 2020,
      engineSize: 1500,
      mileage: 0,
      fuelType: "petrol",
      bodyType: "sedan",
      transmission: "manual",
      color: "",
      condition: "locally_used",
      driveConfiguration: "2wd",
      price: 0,
      negotiable: true,
      description: "",
      features: [],
      images: [],
      location: "",
      phoneNumber: "",
      whatsappNumber: "",
    },
  });

  // Kenyan counties for location dropdown
  const kenyanCounties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
    "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
    "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
    "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
    "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
    "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ];

  // Handle vehicle selection from database
  const handleVehicleSelect = (vehicle: VehicleReference | null) => {
    setSelectedVehicle(vehicle);
    if (vehicle) {
      // Auto-populate form fields from selected vehicle
      listingForm.setValue("make", vehicle.make);
      listingForm.setValue("model", vehicle.model);
      listingForm.setValue("engineSize", vehicle.engineCapacity);
      listingForm.setValue("fuelType", vehicle.fuel as any);
      
      // Map body type if available
      if (vehicle.bodyType) {
        const bodyTypeMapping: Record<string, string> = {
          "wagon": "estate",
          "suv/4x4": "suv",
          "4x4": "suv",
          "truck": "pickup",
          "lorry": "van"
        };
        const mappedBodyType = bodyTypeMapping[vehicle.bodyType.toLowerCase()] || vehicle.bodyType.toLowerCase();
        
        // Only set if it's a valid option in our schema
        const validBodyTypes = ["sedan", "hatchback", "suv", "estate", "coupe", "convertible", "pickup", "van"];
        if (validBodyTypes.includes(mappedBodyType)) {
          listingForm.setValue("bodyType", mappedBodyType as any);
        }
      }
    } else {
      // Clear form fields when no vehicle selected
      listingForm.setValue("make", "");
      listingForm.setValue("model", "");
      listingForm.setValue("engineSize", 0);
    }
  };

  // Price comparison logic
  const watchedPrice = listingForm.watch("price");
  const getPriceIndicator = (price: number) => {
    if (!selectedVehicle || !price) return null;
    
    // Simple market price estimation based on CRSP
    const baseMarketPrice = selectedVehicle.crspKes || selectedVehicle.crsp2020 || 0;
    if (baseMarketPrice === 0) return null;
    
    const ratio = price / baseMarketPrice;
    
    if (ratio < 0.8) {
      return { label: "Below Market Price", color: "text-green-600 bg-green-50 border-green-200" };
    } else if (ratio > 1.2) {
      return { label: "Above Market Price", color: "text-red-600 bg-red-50 border-red-200" };
    } else {
      return { label: "Fair Price", color: "text-blue-600 bg-blue-50 border-blue-200" };
    }
  };

  // Mutations
  const listingMutation = useMutation({
    mutationFn: async (data: ListingForm & { images: string[] }) => {
      return apiRequest("POST", "/api/marketplace/listings", data);
    },
    onSuccess: () => {
      toast({
        title: "Listing Created",
        description: "Your car has been listed successfully. We'll review it shortly.",
      });
      listingForm.reset();
      setSelectedFeatures([]);
      setUploadedImages([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Feature options
  const featureOptions = [
    "Air Conditioning", "Power Steering", "ABS", "Airbags", "Alloy Wheels",
    "Sunroof", "Leather Seats", "Navigation System", "Reverse Camera",
    "Bluetooth", "USB/AUX", "Cruise Control", "Parking Sensors",
    "Electric Windows", "Central Locking", "4WD/AWD"
  ];

  const onListingSubmit = (data: ListingForm) => {
    listingMutation.mutate({
      ...data,
      features: selectedFeatures,
      images: uploadedImages,
    });
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Image upload handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to base64 for demo (in production, upload to storage service)
    Array.from(files).forEach((file) => {
      if (uploadedImages.length >= 8) {
        toast({
          title: "Maximum Photos Reached",
          description: "You can upload a maximum of 8 photos.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImages(prev => [...prev, result]);
        listingForm.setValue("images", [...uploadedImages, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    listingForm.setValue("images", newImages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sell My Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            List your vehicle on Kenya's most trusted car marketplace. Get maximum exposure 
            to genuine buyers and sell your car quickly at the best price.
          </p>
        </div>

        {/* Create Listing */}
        <div className="mb-12">
            <Card className="max-w-6xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CarFront className="h-5 w-5 text-purple-600" />
                  Create Car Listing
                </CardTitle>
                <CardDescription>
                  List your car for sale with detailed information and photos to attract serious buyers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...listingForm}>
                  <form onSubmit={listingForm.handleSubmit(onListingSubmit)} className="space-y-8">
                    {/* Listing Title */}
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={listingForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Listing Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="2018 Toyota Corolla - Excellent Condition" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Vehicle Selection */}
                    <div className="mb-6">
                      <VehicleSelector 
                        onVehicleSelect={handleVehicleSelect}
                        hideCrsp={true}
                      />
                    </div>

                    {/* Vehicle Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={listingForm.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year *</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 2025 - 1975 + 1 }, (_, i) => 2025 - i).map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="mileage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mileage (km) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="50000" 
                                  value={field.value || ""}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="transmission"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transmission *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select transmission" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="automatic">Automatic</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color *</FormLabel>
                              <FormControl>
                                <Input placeholder="White" value={field.value || ""} onChange={field.onChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condition *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="locally_used">Locally Used</SelectItem>
                                  <SelectItem value="foreign_used">Foreign Used</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="driveConfiguration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Drive Configuration *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select drive type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="2wd">2WD</SelectItem>
                                  <SelectItem value="4wd">4WD</SelectItem>
                                  <SelectItem value="awd">AWD</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={listingForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (KES) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="2500000" 
                                  value={field.value || ""}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                                />
                              </FormControl>
                              {watchedPrice && getPriceIndicator(watchedPrice) && (
                                <div className={`mt-2 text-xs px-2 py-1 rounded border inline-block ${getPriceIndicator(watchedPrice)?.color}`}>
                                  {getPriceIndicator(watchedPrice)?.label}
                                </div>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="negotiable"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Price is negotiable</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Features & Accessories</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {featureOptions.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={selectedFeatures.includes(feature)}
                              onCheckedChange={() => handleFeatureToggle(feature)}
                            />
                            <Label htmlFor={feature} className="text-sm">{feature}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Photos</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="photo-upload"
                          disabled={uploadedImages.length >= 8}
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Upload vehicle photos</p>
                          <p className="text-sm text-gray-500">
                            {uploadedImages.length >= 8 
                              ? "Maximum 8 photos reached" 
                              : `Add up to ${8 - uploadedImages.length} more photos (JPG, PNG)`
                            }
                          </p>
                        </label>
                      </div>
                      
                      {/* Image Preview Grid */}
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image} 
                                alt={`Vehicle photo ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                                  Main Photo
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Description</h3>
                      <FormField
                        control={listingForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detailed Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your vehicle's condition, history, and any other relevant details..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={listingForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>County *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select county" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {kenyanCounties.map((county) => (
                                    <SelectItem key={county} value={county}>{county}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="0712345678" value={field.value || ""} onChange={field.onChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="whatsappNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>WhatsApp Number (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="0712345678" value={field.value || ""} onChange={field.onChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                      disabled={listingMutation.isPending}
                    >
                      {listingMutation.isPending ? "Creating Listing..." : "Create Listing"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-purple-600" />
                <span>Professional Listing</span>
              </CardTitle>
              <CardDescription>
                Create attractive listings with professional photos and detailed descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• High-quality photo uploads</li>
                <li>• Detailed specification forms</li>
                <li>• Condition assessment guide</li>
                <li>• Price recommendation tool</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Wide Reach</span>
              </CardTitle>
              <CardDescription>
                Access thousands of potential buyers across Kenya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Nationwide buyer network</li>
                <li>• Social media promotion</li>
                <li>• Featured listing options</li>
                <li>• Search engine optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <span>Easy Communication</span>
              </CardTitle>
              <CardDescription>
                Seamless communication tools for buyer-seller interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Integrated messaging system</li>
                <li>• WhatsApp integration</li>
                <li>• Inquiry management</li>
                <li>• Appointment scheduling</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              How to Sell Your Car
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Create Listing</h4>
                <p className="text-sm text-gray-600">Upload photos and fill in vehicle details</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Set Price</h4>
                <p className="text-sm text-gray-600">Use our valuation tool for competitive pricing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Manage Inquiries</h4>
                <p className="text-sm text-gray-600">Respond to interested buyers and schedule viewings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Complete Sale</h4>
                <p className="text-sm text-gray-600">Finalize the deal with secure transaction support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Trusted Car Selling Platform
              </h3>
              <p className="text-purple-100">
                Join thousands of successful sellers who have found buyers through our platform. 
                Safe, secure, and hassle-free car selling experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-purple-200 text-sm">Cars Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-purple-200 text-sm">Active Buyers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">14 Days</div>
                <div className="text-purple-200 text-sm">Average Sale Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-purple-200 text-sm">Seller Satisfaction</div>
              </div>
            </div>
            <div className="text-center mt-6 text-purple-200 text-sm">
              Expected Launch: Q2 2025 • Contact: 0736 272719
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-800">Safe & Secure Transactions</h3>
              </div>
              <p className="text-green-700 text-center mb-4">
                We prioritize your safety with verified buyers, secure payment options, and transaction protection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-600">
                <div className="text-center">
                  <strong>Verified Buyers</strong><br />
                  All buyers go through identity verification
                </div>
                <div className="text-center">
                  <strong>Secure Payments</strong><br />
                  Multiple secure payment methods available
                </div>
                <div className="text-center">
                  <strong>Transaction Support</strong><br />
                  Expert help throughout the selling process
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}