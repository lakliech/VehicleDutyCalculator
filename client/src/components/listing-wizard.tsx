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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Car, ArrowLeft, ArrowRight, MapPin, Camera, Upload, 
  DollarSign, Phone, CheckCircle, X, Plus, Eye, Save 
} from "lucide-react";

// Form schema for each step
const vehicleDetailsSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1990, "Year must be 1990 or later").max(2025, "Year cannot be in the future"),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"], {
    required_error: "Please select fuel type",
  }),
  transmission: z.enum(["manual", "automatic"], {
    required_error: "Please select transmission type",
  }),
  mileage: z.number().min(0, "Mileage cannot be negative").max(999999, "Invalid mileage"),
});

const locationConditionSchema = z.object({
  location: z.string().min(1, "Location is required"),
  condition: z.enum(["new", "used", "accidented"], {
    required_error: "Please select vehicle condition",
  }),
  ownershipStatus: z.enum(["private", "company", "dealer"], {
    required_error: "Please select ownership status",
  }),
});

const photosSchema = z.object({
  images: z.array(z.string()).min(3, "At least 3 photos are required").max(10, "Maximum 10 photos allowed"),
  videoUrl: z.string().url().optional().or(z.literal("")),
});

const pricingSchema = z.object({
  price: z.number().min(50000, "Price must be at least KES 50,000"),
  negotiable: z.boolean().default(true),
  description: z.string().min(50, "Description must be at least 50 characters"),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
  whatsappNumber: z.string().optional(),
  hideContact: z.boolean().default(false),
});

type VehicleDetailsForm = z.infer<typeof vehicleDetailsSchema>;
type LocationConditionForm = z.infer<typeof locationConditionSchema>;
type PhotosForm = z.infer<typeof photosSchema>;
type PricingForm = z.infer<typeof pricingSchema>;
type ContactForm = z.infer<typeof contactSchema>;

interface ListingWizardProps {
  onComplete: (listingId: number) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 1, title: "Vehicle Details", description: "Basic information about your car" },
  { id: 2, title: "Location & Condition", description: "Where is it and what's the condition" },
  { id: 3, title: "Photos & Video", description: "Show off your vehicle" },
  { id: 4, title: "Pricing", description: "Set your asking price" },
  { id: 5, title: "Contact Info", description: "How buyers can reach you" },
];

const KENYAN_COUNTIES = [
  "Nairobi", "Mombasa", "Nakuru", "Eldoret", "Kisumu", "Thika", "Malindi", "Kitale",
  "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Embu", "Kericho", "Migori",
  "Kisii", "Kilifi", "Lamu", "Isiolo", "Marsabit", "Moyale", "Lodwar", "Kitui",
  "Wajir", "Mandera", "Bungoma", "Webuye", "Kapsabet", "Narok", "Bomet", "Sotik",
  "Kapenguria", "Maralal", "Nyahururu", "Murang'a", "Kerugoya", "Karatina", "Mwingi",
  "Mutomo", "Kibwezi", "Taveta", "Voi", "Makindu", "Sultan Hamud", "Busia", "Siaya"
];

const VEHICLE_MAKES = [
  "Toyota", "Nissan", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki", "Isuzu",
  "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Peugeot", "Renault", "Hyundai", "Kia",
  "Ford", "Chevrolet", "Land Rover", "Jeep", "Volvo", "Infiniti", "Lexus", "Acura"
];

const FEATURES_LIST = [
  "Air Conditioning", "Power Steering", "Power Windows", "Central Locking", "Electric Mirrors",
  "Alloy Wheels", "Fog Lights", "Sunroof", "Leather Seats", "Navigation System",
  "Bluetooth", "USB Port", "Reverse Camera", "Parking Sensors", "Cruise Control",
  "ABS Brakes", "Airbags", "Immobilizer", "Alarm System", "Child Safety Locks"
];

export function ListingWizard({ onComplete, onCancel }: ListingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [savedData, setSavedData] = useState<any>({});
  const { toast } = useToast();

  // Form instances for each step
  const vehicleForm = useForm<VehicleDetailsForm>({
    resolver: zodResolver(vehicleDetailsSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      fuelType: "petrol",
      transmission: "manual",
      mileage: 0,
      ...savedData.vehicleDetails
    },
    mode: "onChange"
  });

  const locationForm = useForm<LocationConditionForm>({
    resolver: zodResolver(locationConditionSchema),
    defaultValues: {
      location: "",
      condition: "used",
      ownershipStatus: "private",
      ...savedData.locationCondition
    },
    mode: "onChange"
  });

  const photosForm = useForm<PhotosForm>({
    resolver: zodResolver(photosSchema),
    defaultValues: {
      images: [],
      videoUrl: "",
      ...savedData.photos
    },
    mode: "onChange"
  });

  const pricingForm = useForm<PricingForm>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      askingPrice: 0,
      negotiable: true,
      acceptsInstallments: false,
      ...savedData.pricing
    },
    mode: "onChange"
  });

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      preferredContactMethod: "phone",
      availableForCalls: true,
      ...savedData.contact
    },
    mode: "onChange"
  });

  // Save form data to localStorage
  const saveProgress = (stepData: any, stepName: string) => {
    const updatedData = { ...savedData, [stepName]: stepData };
    setSavedData(updatedData);
    localStorage.setItem("listing-wizard-progress", JSON.stringify(updatedData));
  };

  // Load saved progress
  useState(() => {
    const saved = localStorage.getItem("listing-wizard-progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSavedData(data);
      } catch (error) {
        console.error("Failed to load saved progress:", error);
      }
    }
  });

  // Submit final listing
  const submitListingMutation = useMutation({
    mutationFn: async (listingData: any) => {
      return apiRequest("POST", "/api/listings", listingData);
    },
    onSuccess: (data) => {
      localStorage.removeItem("listing-wizard-progress");
      toast({
        title: "Listing Created!",
        description: "Your car listing has been submitted successfully.",
      });
      onComplete(data.id);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create listing",
        variant: "destructive",
      });
    },
  });

  const nextStep = async (stepData: any, stepName: string) => {
    saveProgress(stepData, stepName);
    setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep]);
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    if (completedSteps.includes(step - 1) || step === 1) {
      setCurrentStep(step);
    }
  };

  const submitFinalListing = async (contactData: ContactForm) => {
    const allData = {
      ...savedData.vehicleDetails,
      ...savedData.locationCondition,
      ...savedData.photos,
      ...savedData.pricing,
      ...contactData,
      title: `${savedData.vehicleDetails?.year} ${savedData.vehicleDetails?.make} ${savedData.vehicleDetails?.model}`,
    };

    submitListingMutation.mutate(allData);
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Sell Your Car</h1>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {STEPS.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => goToStep(step.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                step.id === currentStep
                  ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                  : completedSteps.includes(step.id)
                  ? "bg-green-100 text-green-700 border-2 border-green-300"
                  : "bg-gray-100 text-gray-500 border-2 border-gray-200"
              } ${
                completedSteps.includes(step.id - 1) || step.id === 1
                  ? "cursor-pointer hover:bg-opacity-80"
                  : "cursor-not-allowed opacity-50"
              }`}
              disabled={!completedSteps.includes(step.id - 1) && step.id !== 1}
            >
              <div className="flex items-center space-x-2">
                {completedSteps.includes(step.id) && (
                  <CheckCircle className="h-4 w-4" />
                )}
                <span>{step.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="min-h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-purple-600" />
            <span>{STEPS[currentStep - 1].title}</span>
          </CardTitle>
          <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && <VehicleDetailsStep form={vehicleForm} onNext={nextStep} />}
          {currentStep === 2 && <LocationConditionStep form={locationForm} onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 3 && <PhotosStep form={photosForm} onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 4 && <PricingStep form={pricingForm} onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 5 && <ContactStep form={contactForm} onSubmit={submitFinalListing} onPrev={prevStep} isSubmitting={submitListingMutation.isPending} />}
        </CardContent>
      </Card>
    </div>
  );
}

// Step 1: Vehicle Details
function VehicleDetailsStep({ form, onNext }: { form: any; onNext: (data: any, stepName: string) => void }) {
  const onSubmit = (data: VehicleDetailsForm) => {
    onNext(data, "vehicleDetails");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VEHICLE_MAKES.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
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
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter model" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Manufacture *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2020" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage (KM) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="50000" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Step 2: Location & Condition
function LocationConditionStep({ form, onNext, onPrev }: { form: any; onNext: (data: any, stepName: string) => void; onPrev: () => void }) {
  const onSubmit = (data: LocationConditionForm) => {
    onNext(data, "locationCondition");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select county/city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {KENYAN_COUNTIES.map((county) => (
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
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Condition *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">New (0-1 year, minimal use)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="used" />
                      <Label htmlFor="used">Used (good condition)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="accidented" id="accidented" />
                      <Label htmlFor="accidented">Previously accidented</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownershipStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ownership Status *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="private">Private Individual</SelectItem>
                    <SelectItem value="company">Company Vehicle</SelectItem>
                    <SelectItem value="dealer">Dealer/Showroom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Step 3: Photos & Video
function PhotosStep({ form, onNext, onPrev }: { form: any; onNext: (data: any, stepName: string) => void; onPrev: () => void }) {
  const [uploadedImages, setUploadedImages] = useState<Array<{url: string, file: File}>>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: PhotosForm) => {
    console.log("PhotosStep onSubmit called", data, "uploadedImages count:", uploadedImages.length);
    
    if (uploadedImages.length < 3) {
      console.log("Not enough images uploaded");
      toast({
        title: "Photos Required",
        description: "Please upload at least 3 photos of your vehicle",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      console.log("Starting base64 conversion for", uploadedImages.length, "images");
      
      // Convert to base64 for storage (in production, upload to cloud storage)
      const imagePromises = uploadedImages.map(async (item) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(item.file);
        });
      });

      const base64Images = await Promise.all(imagePromises);
      console.log("Base64 conversion complete, calling onNext with", base64Images.length, "images");
      
      onNext({ ...data, images: base64Images }, "photos");
      
      toast({
        title: "Photos processed",
        description: `${base64Images.length} photos ready for your listing`,
      });
    } catch (error) {
      console.error("Error in photo processing:", error);
      toast({
        title: "Upload failed",
        description: "Failed to process photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageUpload called", event.target.files);
    const files = event.target.files;
    
    if (!files || files.length === 0) {
      console.log("No files selected");
      return;
    }

    console.log(`Processing ${files.length} files`);
    setUploading(true);
    
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    
    // Validate file types and sizes
    Array.from(files).forEach(file => {
      console.log(`Validating file: ${file.name}, type: ${file.type}, size: ${file.size}`);
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        invalidFiles.push(`${file.name} (not an image)`);
      } else if (!isValidSize) {
        invalidFiles.push(`${file.name} (too large - max 5MB)`);
      } else {
        validFiles.push(file);
      }
    });

    console.log(`Valid files: ${validFiles.length}, Invalid files: ${invalidFiles.length}`);

    // Show error toast for invalid files
    if (invalidFiles.length > 0) {
      toast({
        title: "Some files were skipped",
        description: `Invalid files: ${invalidFiles.join(", ")}`,
        variant: "destructive",
      });
    }

    // Create preview URLs and store files
    const newImages = validFiles.map((file) => {
      const url = URL.createObjectURL(file);
      console.log(`Created object URL for ${file.name}: ${url}`);
      return {
        url,
        file: file
      };
    });

    const totalImages = uploadedImages.length + newImages.length;
    console.log(`Total images will be: ${totalImages}`);
    
    if (totalImages > 10) {
      toast({
        title: "Too many photos",
        description: "Maximum 10 photos allowed. Some photos were not added.",
        variant: "destructive",
      });
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 10));
    } else {
      setUploadedImages(prev => {
        const updated = [...prev, ...newImages];
        console.log(`Updated images state with ${updated.length} total images`);
        return updated;
      });
      
      if (newImages.length > 0) {
        toast({
          title: "Photos uploaded",
          description: `${newImages.length} photo(s) added successfully`,
        });
      }
    }
    
    setUploading(false);
    
    // Clear the input value to allow re-selecting the same files
    event.target.value = '';
    
    console.log(`Upload complete. Total images now: ${uploadedImages.length + validFiles.length}`);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      // Revoke URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
    
    toast({
      title: "Photo removed",
      description: "Photo was removed from your listing",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="text-base font-medium">Vehicle Photos *</Label>
          <p className="text-sm text-gray-600 mb-4">Upload 3-10 high-quality photos. Include front, side, and interior views.</p>
          
          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors"
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-purple-400', 'bg-purple-50'); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-purple-400', 'bg-purple-50'); }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-purple-400', 'bg-purple-50');
              const files = e.dataTransfer.files;
              if (files) {
                const event = { target: { files } } as React.ChangeEvent<HTMLInputElement>;
                handleImageUpload(event);
              }
            }}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                <p className="text-gray-600">Processing photos...</p>
              </div>
            ) : (
              <>
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Drag photos here or click to browse</p>
                <p className="text-xs text-gray-500 mb-4">Supports JPG, PNG, WEBP (max 5MB per file)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  ref={(el) => {
                    if (el) {
                      (window as any).imageUploadRef = el;
                    }
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="camera-capture"
                  ref={(el) => {
                    if (el) {
                      (window as any).cameraUploadRef = el;
                    }
                  }}
                />
                <div className="flex gap-2 flex-wrap justify-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("Choose Photos button clicked");
                      const input = document.getElementById('image-upload') as HTMLInputElement;
                      if (input) {
                        input.click();
                        console.log("File input clicked");
                      }
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Photos
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("Take Photo button clicked");
                      const input = document.getElementById('camera-capture') as HTMLInputElement;
                      if (input) {
                        input.click();
                        console.log("Camera input clicked");
                      }
                    }}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Image Preview Grid */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {uploadedImages.map((imageData, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageData.url}
                    alt={`Vehicle photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-purple-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <Badge className="absolute bottom-2 left-2 bg-blue-500">Main Photo</Badge>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {Math.round(imageData.file.size / 1024)}KB
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open(imageData.url, '_blank')}
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center"
                  >
                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadedImages.length < 3 && (
            <p className="text-red-600 text-sm mt-2">Please upload at least 3 photos</p>
          )}
        </div>

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://youtube.com/watch?v=..." 
                  {...field} 
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || "")}
                />
              </FormControl>
              <p className="text-sm text-gray-600">Add a YouTube or video link to showcase your vehicle</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            type="submit" 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={uploadedImages.length < 3 || uploading}
            onClick={(e) => {
              console.log("Next button clicked, uploaded images:", uploadedImages.length);
              console.log("Button disabled state:", uploadedImages.length < 3 || uploading);
              console.log("Form errors:", form.formState.errors);
            }}
          >
            {uploading ? "Processing..." : "Next Step"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Step 4: Pricing
function PricingStep({ form, onNext, onPrev }: { form: any; onNext: (data: any, stepName: string) => void; onPrev: () => void }) {
  const onSubmit = (data: PricingForm) => {
    onNext(data, "pricing");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price (KES) *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="number" 
                      placeholder="1500000" 
                      className="pl-10"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </FormControl>
                <p className="text-sm text-gray-600">Minimum: KES 50,000</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="negotiable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Price Negotiable</FormLabel>
                  <p className="text-sm text-gray-600">Allow buyers to negotiate the price</p>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your vehicle's condition, features, history, and any important details buyers should know..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-600">Minimum 50 characters. Be honest and detailed.</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Step 5: Contact Information
function ContactStep({ form, onSubmit, onPrev, isSubmitting }: { 
  form: any; 
  onSubmit: (data: ContactForm) => void; 
  onPrev: () => void; 
  isSubmitting: boolean;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="0712345678" 
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="0712345678" {...field} />
                </FormControl>
                <p className="text-sm text-gray-600">If different from phone number</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hideContact"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Hide Contact Details</FormLabel>
                <p className="text-sm text-gray-600">Only show chat option, hide phone/email from public listing</p>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Listing...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Create Listing
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}