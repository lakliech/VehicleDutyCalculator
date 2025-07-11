import { 
  Car, 
  Truck, 
  Bike, 
  Zap,
  Bus,
  Building,
  Heart,
  Wrench,
  Package
} from "lucide-react";

export const vehicleCategoryInfo = {
  under1500cc: { 
    emoji: "🚗",
    label: "Under 1500cc",
    description: "Vehicles with engine capacity below 1500cc",
    icon: Car
  },
  over1500cc: { 
    emoji: "🚙", 
    label: "Over 1500cc", 
    description: "Vehicles with engine capacity 1500cc and above",
    icon: Car
  },
  largeEngine: { 
    emoji: "🚛",
    label: "Large Engine", 
    description: "Petrol >3000cc or Diesel >2500cc",
    icon: Truck
  },
  electric: { 
    emoji: "⚡",
    label: "Electric", 
    description: "Fully electric vehicles (tax incentives apply)",
    icon: Zap
  },
  schoolBus: { 
    emoji: "🚌",
    label: "School Bus", 
    description: "Vehicles designated for student transport",
    icon: Bus
  },
  primeMover: { 
    emoji: "🚚",
    label: "Prime Mover", 
    description: "Heavy duty truck heads",
    icon: Building
  },
  trailer: { 
    emoji: "🚛",
    label: "Trailer", 
    description: "Transport trailers",
    icon: Package
  },
  ambulance: { 
    emoji: "🚑",
    label: "Ambulance", 
    description: "Emergency medical vehicles",
    icon: Heart
  },
  motorcycle: { 
    emoji: "🏍️",
    label: "Motorcycle", 
    description: "Two-wheeled vehicles",
    icon: Bike
  },
  specialPurpose: { 
    emoji: "🚜",
    label: "Special Purpose", 
    description: "Specialized vehicles",
    icon: Wrench
  },
  heavyMachinery: { 
    emoji: "🏗️",
    label: "Heavy Machinery", 
    description: "Construction and industrial equipment",
    icon: Building
  }
};