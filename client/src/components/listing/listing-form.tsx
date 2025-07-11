import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { VehicleSelector } from "@/components/vehicle-selector";
import type { VehicleReference } from "@shared/schema";

// Car listing form schema
export const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1990).max(2025),
  engineSize: z.number().min(500, "Engine size must be at least 500cc").max(10000),
  mileage: z.coerce.number().min(0).max(999999),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  bodyType: z.enum(["sedan", "hatchback", "suv", "estate", "coupe", "convertible", "pickup", "van"]),
  transmission: z.enum(["manual", "automatic"]),
  driveConfiguration: z.enum(["2wd", "4wd", "awd"]).optional(),
  exteriorColor: z.string().min(1, "Exterior color is required"),
  interiorColor: z.string().min(1, "Interior color is required"),
  condition: z.enum(["new", "locally_used", "foreign_used"]),
  price: z.coerce.number().min(50000, "Price must be at least KES 50,000"),
  negotiable: z.boolean(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  images: z.array(z.string()).max(8, "Maximum 8 photos allowed").optional(),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  whatsappNumber: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;

interface ListingFormProps {
  onSubmit: (data: ListingFormData & { images: string[] }) => void;
  isSubmitting?: boolean;
  uploadedImages: string[];
  mainImageIndex: number;
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  onImageUpload: (images: string[]) => void;
  onMainImageSelect: (index: number) => void;
  onImageDelete: (index: number) => void;
  priceIndicator?: any;
  indicatorLoading?: boolean;
}

// Constants
const kenyanCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
  "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
  "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

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

const featureOptions = [
  "Air Conditioning", "Power Steering", "ABS", "Airbags", "Alloy Wheels",
  "Sunroof", "Leather Seats", "Navigation System", "Reverse Camera",
  "Bluetooth", "USB/AUX", "Cruise Control", "Parking Sensors",
  "Electric Windows", "Central Locking", "4WD/AWD"
];

export function ListingForm({
  onSubmit,
  isSubmitting = false,
  uploadedImages,
  mainImageIndex,
  selectedFeatures,
  onFeatureToggle,
  onImageUpload,
  onMainImageSelect,
  onImageDelete,
  priceIndicator,
  indicatorLoading,
}: ListingFormProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleReference | null>(null);

  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      engineSize: 0,
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

  const handleVehicleSelect = (vehicle: VehicleReference | null) => {
    setSelectedVehicle(vehicle);
    if (vehicle) {
      form.setValue("make", vehicle.make, { shouldValidate: true });
      form.setValue("model", vehicle.model, { shouldValidate: true });
      form.setValue("engineSize", vehicle.engineCapacity, { shouldValidate: true });
      
      const fuelType = vehicle.fuelType?.toLowerCase() || "petrol";
      const validFuelTypes = ["petrol", "diesel", "electric", "hybrid"];
      if (validFuelTypes.includes(fuelType)) {
        form.setValue("fuelType", fuelType as any, { shouldValidate: true });
      }
      
      if (vehicle.bodyType) {
        const bodyTypeMapping: Record<string, string> = {
          "wagon": "estate",
          "suv/4x4": "suv",
          "4x4": "suv",
          "truck": "pickup",
          "lorry": "van"
        };
        const mappedBodyType = bodyTypeMapping[vehicle.bodyType.toLowerCase()] || vehicle.bodyType.toLowerCase();
        
        const validBodyTypes = ["sedan", "hatchback", "suv", "estate", "coupe", "convertible", "pickup", "van"];
        if (validBodyTypes.includes(mappedBodyType)) {
          form.setValue("bodyType", mappedBodyType as any, { shouldValidate: true });
        }
      }
      
      form.trigger(["make", "model", "engineSize"]);
    } else {
      form.setValue("make", "", { shouldValidate: true });
      form.setValue("model", "", { shouldValidate: true });
      form.setValue("engineSize", 0, { shouldValidate: true });
    }
  };

  const handleFormSubmit = (data: ListingFormData) => {
    const reorderedImages = uploadedImages.length > 0 ? [
      uploadedImages[mainImageIndex],
      ...uploadedImages.filter((_, index) => index !== mainImageIndex)
    ] : [];

    onSubmit({
      ...data,
      features: selectedFeatures,
      images: reorderedImages,
    });
  };

  const [watchedPrice] = form.watch(["price"]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Listing Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Title *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 2020 Toyota Land Cruiser V8 - Low Mileage" 
                  value={field.value || ""} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vehicle Selection</h3>
          <VehicleSelector 
            onVehicleSelect={handleVehicleSelect}
            showManualEntry={false}
          />
        </div>

        {/* Vehicle Details Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Manufacture *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1990" 
                      max={new Date().getFullYear() + 1}
                      value={field.value || ""} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                  <FormLabel>Mileage (km) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 50000" 
                      value={field.value || ""} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
              control={form.control}
              name="driveConfiguration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drive Configuration</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select drive configuration" />
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
            <FormField
              control={form.control}
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
                      {exteriorColors.map(color => (
                        <SelectItem key={color} value={color.toLowerCase()}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                      {interiorColors.map(color => (
                        <SelectItem key={color} value={color.toLowerCase()}>{color}</SelectItem>
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
                  <FormLabel>Condition *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">Brand New</SelectItem>
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pricing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (KES) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 3500000" 
                      value={field.value || ""} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="negotiable"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 mt-8">
                  <FormControl>
                    <input 
                      type="checkbox" 
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">Price is negotiable</FormLabel>
                </FormItem>
              )}
            />
          </div>
          {priceIndicator && selectedVehicle && watchedPrice > 0 && (
            <div className={`p-4 rounded-lg ${priceIndicator.bgClass}`}>
              <p className={`font-semibold ${priceIndicator.textClass}`}>
                {priceIndicator.label}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Your price is {priceIndicator.percentageLabel} of the CRSP value
              </p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features & Equipment</h3>
          <div className="flex flex-wrap gap-2">
            {featureOptions.map((feature) => (
              <Badge
                key={feature}
                variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFeatureToggle(feature)}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your vehicle in detail. Include service history, any modifications, reasons for selling, etc." 
                  className="min-h-[120px]"
                  value={field.value || ""} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location & Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location & Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kenyanCounties.map(county => (
                        <SelectItem key={county} value={county}>{county}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Input placeholder="0712345678" value={field.value || ""} onChange={field.onChange} />
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Listing..." : "Create Listing"}
        </Button>
      </form>
    </Form>
  );
}