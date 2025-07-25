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
  Coins, Phone, CheckCircle, X, Plus, Eye, Save 
} from "lucide-react";
import { ImageUpload } from "./image-upload";
import { BulkImageUpload } from "./bulk-image-upload";
import KenyanLocationSelector from "./KenyanLocationSelector";

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
  locationType: z.enum(["locally_available", "overseas"]).default("locally_available"),
  county: z.string().optional(),
  area: z.string().optional(),
  specificLocation: z.string().optional(),
  condition: z.enum(["new", "used", "accidented"], {
    required_error: "Please select vehicle condition",
  }),
  ownershipStatus: z.enum(["private", "company", "dealer"], {
    required_error: "Please select ownership status",
  }),
});

const photosSchema = z.object({
  images: z.array(z.string()).optional(),
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

const paymentSchema = z.object({
  selectedProduct: z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    billingType: z.string(),
    categoryId: z.number(),
    description: z.string(),
  }).refine((data) => data.id > 0, {
    message: "Please select a payment plan before proceeding",
  }),
});

type VehicleDetailsForm = z.infer<typeof vehicleDetailsSchema>;
type LocationConditionForm = z.infer<typeof locationConditionSchema>;
type PhotosForm = z.infer<typeof photosSchema>;
type PricingForm = z.infer<typeof pricingSchema>;
type ContactForm = z.infer<typeof contactSchema>;
type PaymentForm = z.infer<typeof paymentSchema>;

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
  { id: 6, title: "Payment Plan", description: "Choose your listing package" },
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
      locationType: "locally_available",
      countryId: undefined,
      countyId: undefined,
      constituencyId: undefined,
      wardId: undefined,
      specificLocation: "",
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
      price: 0,
      negotiable: true,
      description: "",
      ...savedData.pricing
    },
    mode: "onChange"
  });

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      whatsappNumber: "",
      hideContact: false,
      ...savedData.contact
    },
    mode: "onChange"
  });

  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      selectedProduct: null,
      ...savedData.payment
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

  const submitContact = async (contactData: ContactForm) => {
    console.log("ContactStep submitContact called", contactData);
    saveProgress(contactData, "contact");
    setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep]);
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    console.log("Moving to payment step (step 6)");
  };

  const submitFinalListing = async (paymentData: PaymentForm) => {
    console.log("PaymentStep submitFinalListing called", paymentData);
    
    // Critical validation: Ensure payment data has a selected product
    if (!paymentData.selectedProduct || !paymentData.selectedProduct.id) {
      toast({
        title: "Payment plan required",
        description: "Please select a payment plan before creating your listing.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Initialize Paystack payment
      // Store listing data locally to avoid Paystack's 200KB limit
      const listingData = {
        ...savedData.vehicleDetails,
        ...savedData.locationCondition,
        ...savedData.photos,
        ...savedData.pricing,
        ...savedData.contact,
        title: `${savedData.vehicleDetails?.year} ${savedData.vehicleDetails?.make} ${savedData.vehicleDetails?.model}`,
        selectedProductId: paymentData.selectedProduct.id,
      };

      // Store listing data in localStorage for retrieval after payment
      localStorage.setItem('pendingListingData', JSON.stringify(listingData));

      // Minimal payload as per Paystack documentation
      const paymentPayload = {
        amount: parseFloat(paymentData.selectedProduct.price),
        callback_url: `${window.location.origin}/payment-success`,
        currency: 'KES',
        metadata: {
          product_id: paymentData.selectedProduct.id,
          listing_title: listingData.title
        }
      };

      console.log('Initializing payment with payload:', paymentPayload);

      const paymentResponse = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(paymentPayload),
      });

      console.log('Payment response status:', paymentResponse.status);

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        console.error('Payment initialization failed:', errorText);
        throw new Error(`Payment initialization failed: ${errorText}`);
      }

      const paymentResult = await paymentResponse.json();
      console.log('Payment initialization result:', paymentResult);
      
      if (!paymentResult.paymentUrl) {
        console.error('No payment URL received:', paymentResult);
        throw new Error('No payment URL received from server');
      }
      
      // Show success message and redirect
      toast({
        title: "Payment Initialized Successfully",
        description: "Redirecting to Paystack for payment...",
        duration: 3000,
      });
      
      console.log('Redirecting to payment URL:', paymentResult.paymentUrl);
      
      // Small delay to let user see the success message
      setTimeout(() => {
        try {
          window.location.href = paymentResult.paymentUrl;
        } catch (redirectError) {
          console.error('Redirect error:', redirectError);
          // Fallback redirect method
          window.open(paymentResult.paymentUrl, '_self');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
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
          {currentStep === 5 && <ContactStep form={contactForm} onSubmit={submitContact} onPrev={prevStep} isSubmitting={false} />}
          {currentStep === 6 && <PaymentStep form={paymentForm} onSubmit={submitFinalListing} onPrev={prevStep} isSubmitting={submitListingMutation.isPending} />}
        </CardContent>
      </Card>
    </div>
  );
}

// Step 1: Vehicle Details
function VehicleDetailsStep({ form, onNext }: { form: any; onNext: (data: any, stepName: string) => void }) {
  const [selectedMake, setSelectedMake] = useState<string>(form.getValues("make") || "");
  
  // Query for vehicle makes
  const { data: vehicleMakes = [], isLoading: makesLoading } = useQuery({
    queryKey: ['/api/vehicle-makes'],
    enabled: true,
  });

  // Query for vehicle models based on selected make
  const { data: vehicleModels = [], isLoading: modelsLoading } = useQuery({
    queryKey: ['/api/vehicle-makes', selectedMake, 'models'],
    queryFn: () => {
      if (!selectedMake) return Promise.resolve([]);
      return fetch(`/api/vehicle-makes/${encodeURIComponent(selectedMake)}/models`)
        .then(res => res.json());
    },
    enabled: !!selectedMake,
  });

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    form.setValue("make", make);
    // Clear model when make changes
    form.setValue("model", "");
  };

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
                <Select onValueChange={handleMakeChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={makesLoading ? "Loading makes..." : "Select make"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleMakes.map((make: string) => (
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
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value || ""} 
                  disabled={!selectedMake || modelsLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue 
                        placeholder={
                          !selectedMake 
                            ? "Select make first" 
                            : modelsLoading 
                            ? "Loading models..." 
                            : "Select model"
                        } 
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleModels.map((model: string) => (
                      <SelectItem key={model} value={model}>
                        {model}
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
  const [locationData, setLocationData] = useState({
    locationType: form.getValues("locationType") || "locally_available",
    county: form.getValues("county"),
    area: form.getValues("area"),
    specificLocation: form.getValues("specificLocation"),
  });

  const handleLocationChange = (location: any) => {
    setLocationData(location);
    form.setValue("locationType", location.locationType);
    form.setValue("county", location.county);
    form.setValue("area", location.area);
    form.setValue("specificLocation", location.specificLocation);
    
    // Auto-populate the legacy location field for compatibility
    const locationParts = [];
    if (location.specificLocation) locationParts.push(location.specificLocation);
    if (location.area) locationParts.push(location.area);
    if (location.county) locationParts.push(location.county);
    if (location.locationType === 'overseas') locationParts.push("Overseas");
    
    const formattedLocation = locationParts.join(", ");
    form.setValue("location", formattedLocation || "Location not specified");
  };

  const onSubmit = (data: LocationConditionForm) => {
    onNext(data, "locationCondition");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Location Selection */}
        <KenyanLocationSelector 
          onLocationChange={handleLocationChange}
          defaultValues={{
            locationType: locationData.locationType,
            county: form.getValues("county"),
            area: form.getValues("area"),
            specificLocation: form.getValues("specificLocation")
          }}
        />

        {/* Additional Location Details */}
        <FormField
          control={form.control}
          name="specificLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specific Location (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Near City Mall, Industrial Area, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  const [uploadMode, setUploadMode] = useState<'bulk' | 'individual'>('bulk');
  const [uploadedImages, setUploadedImages] = useState<Array<{url: string, file: File} | null>>(new Array(20).fill(null));
  const [uploading, setUploading] = useState(false);
  const [currentPhotoCount, setCurrentPhotoCount] = useState(0);
  const { toast } = useToast();

  const onSubmit = async (data: PhotosForm) => {
    console.log("PhotosStep onSubmit called", data);
    
    const images = uploadMode === 'bulk' 
      ? (data.images || [])
      : uploadedImages.filter(img => img !== null).map(img => img.url);

    console.log("Final images array:", images, "Length:", images.length);

    try {
      setUploading(true);
      
      onNext({ ...data, images }, "photos");
      
      toast({
        title: "Step completed",
        description: images.length > 0 
          ? `${images.length} photos ready for your listing`
          : "Proceeding to next step (photos can be added later)",
      });
    } catch (error) {
      console.error("Error in photo processing:", error);
      toast({
        title: "Step failed",
        description: "Failed to proceed to next step. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = (base64Image: string) => {
    // Convert base64 to File object for consistency
    const base64Data = base64Image.split(',')[1];
    const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/jpeg' });
    const file = new File([blob], `image_${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    const newImage = {
      url: base64Image,
      file: file
    };
    
    const updatedImages = [...uploadedImages, newImage];
    setUploadedImages(updatedImages);
    setCurrentPhotoCount(updatedImages.length);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    setCurrentPhotoCount(updatedImages.length);
    
    // Update form field with remaining image URLs
    const imageUrls = updatedImages.map(img => img.url);
    form.setValue('images', imageUrls);
    
    toast({
      title: "Photo removed",
      description: "Photo was removed from your listing",
    });
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          console.log("PhotosStep form submit event triggered");
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }} 
        className="space-y-6"
      >
        <div>
          {/* Upload Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label className="text-base font-medium">Vehicle Photos</Label>
              <p className="text-sm text-gray-600">Upload high-quality photos of your vehicle for better visibility.</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={uploadMode === 'bulk' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUploadMode('bulk')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Upload className="w-4 h-4 mr-1" />
                Bulk Upload
              </Button>
              <Button
                type="button"
                variant={uploadMode === 'individual' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUploadMode('individual')}
              >
                <Camera className="w-4 h-4 mr-1" />
                Individual
              </Button>
            </div>
          </div>
          
          {uploadMode === 'bulk' ? (
            /* Bulk Upload Component */
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <BulkImageUpload
                      value={field.value || []}
                      onChange={field.onChange}
                      maxFiles={50}
                      maxFileSize={5}
                      className="mb-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            /* Individual Upload Slots */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[...Array(20)].map((_, index) => (
                <ImageUpload
                  key={index}
                  label={`Photo ${index + 1}`}
                  description="Optional"
                  value={uploadedImages[index]?.url}
                  onChange={(base64) => {
                    if (base64) {
                      const base64Data = base64.split(',')[1];
                      const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/jpeg' });
                      const file = new File([blob], `image_${Date.now()}.jpg`, { type: 'image/jpeg' });
                      
                      const newImage = { url: base64, file };
                      const updatedImages = [...uploadedImages];
                      updatedImages[index] = newImage;
                      setUploadedImages(updatedImages);
                      setCurrentPhotoCount(updatedImages.filter(img => img).length);
                      
                      // Update form field
                      const imageUrls = updatedImages.map(img => img?.url).filter(Boolean);
                      form.setValue('images', imageUrls);
                    } else {
                      const updatedImages = [...uploadedImages];
                      updatedImages[index] = null;
                      setUploadedImages(updatedImages);
                      setCurrentPhotoCount(updatedImages.filter(img => img).length);
                      
                      // Update form field
                      const imageUrls = updatedImages.map(img => img?.url).filter(Boolean);
                      form.setValue('images', imageUrls);
                    }
                  }}
                  required={false}
                  currentPhotoCount={currentPhotoCount}
                  className="h-48"
                />
              ))}
            </div>
          )}

          {/* Photo count status */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Photos uploaded: {uploadMode === 'bulk' ? (form.watch('images')?.length || 0) : currentPhotoCount}
            </p>
            <p className="text-green-600 text-sm">Photos are optional - add for better visibility</p>
          </div>
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
            disabled={uploading}
            onClick={(e) => {
              const imageCount = uploadMode === 'bulk' ? (form.watch('images')?.length || 0) : currentPhotoCount;
              console.log("Next button clicked, upload mode:", uploadMode);
              console.log("Image count:", imageCount);
              console.log("Button disabled state:", uploading);
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
                    <Coins className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
            className="bg-purple-600 hover:bg-purple-700"
          >
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Step 6: Payment Plan Selection
function PaymentStep({ form, onSubmit, onPrev, isSubmitting }: { 
  form: any; 
  onSubmit: (data: PaymentForm) => void; 
  onPrev: () => void; 
  isSubmitting: boolean;
}) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();
  
  // Fetch marketplace listing products (category 1)
  const { data: basicProducts, isLoading: loadingBasic } = useQuery({
    queryKey: ['/api/products/categories/1/products'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/products/categories/1/products');
      return response.json ? await response.json() : response;
    },
  });

  // Fetch subscription plans (category 2)  
  const { data: subscriptionProducts, isLoading: loadingSubscriptions } = useQuery({
    queryKey: ['/api/products/categories/2/products'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/products/categories/2/products');
      return response.json ? await response.json() : response;
    },
  });

  const handleProductSelect = (product: any) => {
    console.log("Product selected:", product);
    const productData = {
      id: product.id,
      name: product.name,
      price: product.pricing[0]?.price || product.basePrice,
      billingType: product.billingType,
      categoryId: product.categoryId,
      description: product.description,
    };
    setSelectedProduct(productData);
    form.setValue('selectedProduct', productData);
    console.log("Selected product data:", productData);
  };

  const onSubmitForm = (data: PaymentForm) => {
    console.log("PaymentStep onSubmitForm called", data, "selectedProduct:", selectedProduct);
    if (selectedProduct) {
      onSubmit(data);
    } else {
      toast({
        title: "Please select a payment plan",
        description: "You must choose a listing package before proceeding.",
        variant: "destructive",
      });
    }
  };

  if (loadingBasic || loadingSubscriptions) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Add debugging and fallback handling
  console.log("PaymentStep data:", { basicProducts, subscriptionProducts });
  console.log("PaymentStep rendered, currentStep should be 6");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Listing Package</h3>
          <p className="text-gray-600">Select a package that best fits your selling needs</p>
        </div>

        {/* Basic Listing Products */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Car className="h-5 w-5 mr-2 text-purple-600" />
            Basic Listing Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(basicProducts) && basicProducts.map((product: any) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedProduct?.id === product.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{product.name}</h5>
                  <span className="text-lg font-bold text-purple-600">
                    KES {parseFloat(product.pricing[0]?.price || product.basePrice).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <Badge variant={product.billingType === 'per_listing' ? 'default' : 'secondary'}>
                  {product.billingType === 'per_listing' ? 'Pay per listing' : product.billingType}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Coins className="h-5 w-5 mr-2 text-purple-600" />
            Subscription Plans
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(subscriptionProducts) && subscriptionProducts.map((product: any) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedProduct?.id === product.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{product.name}</h5>
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-600">
                      KES {parseFloat(product.pricing[0]?.price || product.basePrice).toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500">/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <Badge variant="outline">Monthly subscription</Badge>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-medium text-green-800 mb-1">Selected Package</h5>
            <p className="text-green-700">{selectedProduct.name} - KES {parseFloat(selectedProduct.price).toLocaleString()}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700"
            disabled={isSubmitting || !selectedProduct}
            onClick={(e) => {
              console.log("Payment submit button clicked", { selectedProduct, isSubmitting });
              if (!selectedProduct) {
                e.preventDefault();
                toast({
                  title: "Payment plan required",
                  description: "Please select a payment plan before creating your listing.",
                  variant: "destructive",
                });
                return;
              }
            }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Initializing Payment...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Proceed to Payment
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}