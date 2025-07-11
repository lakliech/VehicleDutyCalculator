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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, ImagePlus, MapPin, Phone, Mail, Star, 
  Clock, Camera, Users, MessageSquare, Shield, CheckCircle, 
  Upload, Search, CarFront, X, AlertCircle, LogIn, UserPlus, 
  Lock, User, Eye, EyeOff 
} from "lucide-react";
import { VehicleSelector } from "@/components/vehicle-selector";
import { ModuleNavigation } from "@/components/module-navigation";
import { useAuth } from "../hooks/useAuth";
import type { VehicleReference } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Registration form schema
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

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
  driveConfiguration: z.enum(["2wd", "4wd", "awd"]),
  exteriorColor: z.string().min(1, "Exterior color is required"),
  interiorColor: z.string().min(1, "Interior color is required"),
  condition: z.enum(["new", "locally_used", "foreign_used"]),
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
type RegistrationForm = z.infer<typeof registrationSchema>;
type LoginForm = z.infer<typeof loginSchema>;

export default function SellMyCar() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();

  // Registration form
  const registrationForm = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Login form
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      driveConfiguration: "2wd",
      exteriorColor: "",
      interiorColor: "",
      condition: "locally_used",
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

  // Vehicle colors separated by type
  const exteriorColors = [
    "White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", 
    "Orange", "Brown", "Purple", "Pink", "Gold", "Beige", "Maroon", "Navy Blue",
    "Pearl White", "Metallic Gray", "Dark Blue", "Burgundy", "Bronze", "Champagne",
    "Metallic Silver", "Metallic Blue", "Metallic Red", "Matte Black", "Cream"
  ];

  const interiorColors = [
    "Black", "Gray", "Beige", "Brown", "Tan", "Cream", "Charcoal", "Ivory", 
    "Red", "Blue", "White", "Camel", "Dark Gray", "Light Gray", "Saddle Brown"
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
    
    // Get CRSP value for comparison
    const crspValue = selectedVehicle.crspKes || selectedVehicle.crsp2020 || 0;
    if (crspValue === 0) return null;
    
    const percentage = (price / crspValue) * 100;
    
    if (percentage > 70) {
      return { label: "Price is High", color: "text-red-600 bg-red-50 border-red-200" };
    } else if (percentage >= 50 && percentage <= 70) {
      return { label: "Competitive Price", color: "text-blue-600 bg-blue-50 border-blue-200" };
    } else if (percentage >= 40 && percentage < 50) {
      return { label: "Good Deal", color: "text-green-600 bg-green-50 border-green-200" };
    } else {
      return { label: "Be Careful", color: "text-orange-600 bg-orange-50 border-orange-200" };
    }
  };

  // Authentication mutations
  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      return apiRequest("POST", "/api/auth/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Please sign in.",
      });
      setShowRegistrationForm(false);
      setShowLoginForm(true);
      registrationForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      return apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: () => {
      toast({
        title: "Signed In",
        description: "You have been signed in successfully.",
      });
      setShowLoginForm(false);
      loginForm.reset();
      // Invalidate and refetch auth status to update authentication state
      queryClient.invalidateQueries({ queryKey: ["/api/auth/status"] });
    },
    onError: (error: any) => {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
    },
  });

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
      setMainImageIndex(0);
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

  // Authentication form handlers
  const onRegistrationSubmit = (data: RegistrationForm) => {
    setIsRegistering(true);
    registrationMutation.mutate(data, {
      onSettled: () => setIsRegistering(false)
    });
  };

  const onLoginSubmit = (data: LoginForm) => {
    setIsLoggingIn(true);
    loginMutation.mutate(data, {
      onSettled: () => setIsLoggingIn(false)
    });
  };

  const onListingSubmit = (data: ListingForm) => {
    console.log("Form submission attempt:", data);
    console.log("Form validation errors:", listingForm.formState.errors);
    
    // Check authentication and show login popup if not authenticated
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a listing.",
        variant: "destructive",
      });
      setShowLoginForm(true);
      return;
    }

    // Reorder images so main image is first
    const reorderedImages = uploadedImages.length > 0 ? [
      uploadedImages[mainImageIndex], // Main image first
      ...uploadedImages.filter((_, index) => index !== mainImageIndex) // Rest of images
    ] : [];

    const submissionData = {
      ...data,
      features: selectedFeatures,
      images: reorderedImages,
    };

    console.log("Submitting listing data:", submissionData);
    
    listingMutation.mutate(submissionData);
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

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} is too large. Maximum file size is 5MB.`,
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a valid image file.`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImages(prev => {
          const newImages = [...prev, result];
          listingForm.setValue("images", newImages);
          // Set first uploaded image as main if no images exist
          if (prev.length === 0) {
            setMainImageIndex(0);
          }
          return newImages;
        });
      };
      reader.onerror = () => {
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    listingForm.setValue("images", newImages);
    
    // Adjust main image index if necessary
    if (index === mainImageIndex && newImages.length > 0) {
      setMainImageIndex(0); // Set first image as main
    } else if (index < mainImageIndex) {
      setMainImageIndex(mainImageIndex - 1); // Shift index down
    } else if (mainImageIndex >= newImages.length) {
      setMainImageIndex(Math.max(0, newImages.length - 1)); // Set to last image
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
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
                              <Input 
                                placeholder="2018 Toyota Corolla - Excellent Condition" 
                                {...field}
                                onFocus={() => {
                                  if (!isAuthenticated) {
                                    toast({
                                      title: "Authentication Required",
                                      description: "Please sign in to create a listing.",
                                      variant: "destructive",
                                    });
                                    setShowLoginForm(true);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Photos</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label htmlFor="photo-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Upload car photos
                              </span>
                              <span className="block text-sm text-gray-500">
                                PNG, JPG, WEBP up to 10MB each (Max 6 photos)
                              </span>
                            </label>
                            <input
                              id="photo-upload"
                              name="photo-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              className="sr-only"
                              onChange={handleImageUpload}
                              disabled={uploadedImages.length >= 6}
                            />
                          </div>
                          <div className="mt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                if (!isAuthenticated) {
                                  toast({
                                    title: "Authentication Required",
                                    description: "Please sign in to upload photos.",
                                    variant: "destructive",
                                  });
                                  setShowLoginForm(true);
                                  return;
                                }
                                document.getElementById('photo-upload')?.click();
                              }}
                              disabled={uploadedImages.length >= 6}
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              Choose Photos
                            </Button>
                          </div>
                        </div>
                      </div>

                      {uploadedImages.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-md font-medium">Uploaded Photos ({uploadedImages.length}/6)</h4>
                            <p className="text-sm text-gray-500">Click on any photo to make it your main image</p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="relative group cursor-pointer" onClick={() => setMainImageIndex(index)}>
                                <img
                                  src={image}
                                  alt={`Car photo ${index + 1}`}
                                  className={`w-full h-32 object-cover rounded-lg border-2 transition-all ${
                                    index === mainImageIndex 
                                      ? 'border-purple-500 ring-2 ring-purple-200' 
                                      : 'border-gray-200 hover:border-purple-300'
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                {index === mainImageIndex && (
                                  <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                                    Main Photo
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Vehicle Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
                      
                      {/* Vehicle Selection */}
                      <div className="mb-6">
                        <VehicleSelector 
                          onVehicleSelect={handleVehicleSelect}
                          hideCrsp={true}
                        />
                      </div>

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
                                  <SelectItem value="2wd">2WD (Two Wheel Drive)</SelectItem>
                                  <SelectItem value="4wd">4WD (Four Wheel Drive)</SelectItem>
                                  <SelectItem value="awd">AWD (All Wheel Drive)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="exteriorColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exterior Color *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select exterior color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {exteriorColors.map((color) => (
                                    <SelectItem key={color} value={color}>{color}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={listingForm.control}
                          name="interiorColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interior Color *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select interior color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {interiorColors.map((color) => (
                                    <SelectItem key={color} value={color}>{color}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                      <div className="space-y-4">
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

                    {/* Vehicle Location */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle Location</h3>
                      <div className="space-y-4">
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
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Features & Accessories</h3>
                      <div className="flex flex-wrap gap-3">
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
                      <div className="space-y-4">
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
                      {listingMutation.isPending 
                        ? "Creating Listing..." 
                        : "Create Listing"
                      }
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

        {/* Registration Dialog */}
        <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>
                Create a new account to start listing your car for sale
              </DialogDescription>
            </DialogHeader>
            <Form {...registrationForm}>
              <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={registrationForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="John" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Doe" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={registrationForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="john@example.com" type="email" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registrationForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Create a password" 
                            type={showPassword ? "text" : "password"} 
                            className="pl-10 pr-10" 
                            {...field} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registrationForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Confirm your password" 
                            type={showPassword ? "text" : "password"} 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isRegistering}
                >
                  {isRegistering ? "Creating Account..." : "Create Account"}
                </Button>
                
                {/* Social Login Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">or continue with</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                
                {/* Social Login Options */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="p-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => window.location.href = '/api/auth/google'}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="p-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => window.location.href = '/api/auth/facebook'}
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="p-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => window.location.href = '/api/auth/apple'}
                  >
                    <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 8.013.014 8.013.014 8.013.014 7.648.014 7.648.014 7.265.014 6.918.352 6.918.725v.015l.001.014c0 .373.352.711.725.711.373 0 .725-.338.725-.711V.725C8.369.352 8.021.014 7.648.014h-.01C7.275.014 6.927.352 6.927.725v.015l.001.014c0 .373.352.711.725.711.373 0 .725-.338.725-.711V.725C8.378.352 8.03.014 7.657.014h-.01zm5.98 6.05c-.59-.735-1.516-1.208-2.496-1.208-1.66 0-3.131 1.084-3.633 2.625-.169.519-.263 1.084-.263 1.69 0 2.625 1.66 4.75 3.709 4.75 1.169 0 2.246-.563 2.933-1.455.169-.22.263-.482.263-.754 0-.272-.094-.534-.263-.754-.688-.892-1.764-1.455-2.933-1.455-2.049 0-3.709 2.125-3.709 4.75 0-.606.094-1.171.263-1.69.502-1.541 1.973-2.625 3.633-2.625.98 0 1.906.473 2.496 1.208z"/>
                    </svg>
                  </Button>
                </div>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegistrationForm(false);
                      setShowLoginForm(true);
                    }}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Login Dialog */}
        <Dialog open={showLoginForm} onOpenChange={setShowLoginForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                Sign in to your account to create your car listing
              </DialogDescription>
            </DialogHeader>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="john@example.com" type="email" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Enter your password" 
                            type={showPassword ? "text" : "password"} 
                            className="pl-10 pr-10" 
                            {...field} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Signing In..." : "Sign In"}
                </Button>
                
                {/* Social Login Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">or continue with</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                
                {/* Social Login Options */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="p-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => window.location.href = '/api/auth/google'}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="p-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => window.location.href = '/api/auth/facebook'}
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="p-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => window.location.href = '/api/auth/apple'}
                  >
                    <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 8.013.014 8.013.014 8.013.014 7.648.014 7.648.014 7.265.014 6.918.352 6.918.725v.015l.001.014c0 .373.352.711.725.711.373 0 .725-.338.725-.711V.725C8.369.352 8.021.014 7.648.014h-.01C7.275.014 6.927.352 6.927.725v.015l.001.014c0 .373.352.711.725.711.373 0 .725-.338.725-.711V.725C8.378.352 8.03.014 7.657.014h-.10zm5.98 6.05c-.59-.735-1.516-1.208-2.496-1.208-1.66 0-3.131 1.084-3.633 2.625-.169.519-.263 1.084-.263 1.69 0 2.625 1.66 4.75 3.709 4.75 1.169 0 2.246-.563 2.933-1.455.169-.22.263-.482.263-.754 0-.272-.094-.534-.263-.754-.688-.892-1.764-1.455-2.933-1.455-2.049 0-3.709 2.125-3.709 4.75 0-.606.094-1.171.263-1.69.502-1.541 1.973-2.625 3.633-2.625.98 0 1.906.473 2.496 1.208z"/>
                    </svg>
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginForm(false);
                      setShowRegistrationForm(true);
                    }}
                    className="text-sm text-purple-600 hover:underline block w-full"
                  >
                    Don't have an account? Create one
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toast({
                        title: "Password Reset",
                        description: "Password reset functionality will be available soon.",
                      });
                    }}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}