import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Share, Facebook, Twitter, MessageCircle, Linkedin, Copy, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface VehicleListing {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  images?: string[];
  description?: string;
}

interface SocialShareProps {
  listing: VehicleListing;
  trigger?: React.ReactNode;
}

export function SocialShare({ listing, trigger }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Generate listing URL
  const listingUrl = `${window.location.origin}/buy-a-car/${listing.id}`;
  
  // Generate share content
  const shareTitle = `${listing.year} ${listing.make} ${listing.model} - KES ${listing.price.toLocaleString()}`;
  const shareDescription = `Check out this ${listing.year} ${listing.make} ${listing.model} for sale in ${listing.location}. Price: KES ${listing.price.toLocaleString()}. ${listing.description ? listing.description.substring(0, 100) + '...' : 'Great vehicle opportunity!'}`;
  const shareHashtags = "KenyaCars,CarSale,Gariyangu,UsedCars";

  // Social media sharing URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(listingUrl)}&quote=${encodeURIComponent(shareTitle + ' - ' + shareDescription)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(listingUrl)}&hashtags=${shareHashtags}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + '\n\n' + shareDescription + '\n\nView details: ' + listingUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(listingUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareDescription + '\n\nView full details: ' + listingUrl)}`
  };

  const handleShare = (platform: string) => {
    const url = shareUrls[platform as keyof typeof shareUrls];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast({
        title: "Shared Successfully",
        description: `Opening ${platform} to share your listing.`,
      });
    }
  };

  const copyToClipboard = async () => {
    const shareText = `${shareTitle}\n\n${shareDescription}\n\nView details: ${listingUrl}`;
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Listing details copied. You can now paste it anywhere.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(listingUrl);
      toast({
        title: "URL Copied",
        description: "Listing URL copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy URL.",
        variant: "destructive",
      });
    }
  };

  // Default trigger if none provided
  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Share className="h-4 w-4 mr-2" />
      Share
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Vehicle Listing</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-cyan-50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-900">{shareTitle}</h4>
                <p className="text-sm text-purple-700">{shareDescription}</p>
                <p className="text-xs text-purple-600">📍 {listing.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Buttons */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900">Share on social media</h5>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleShare('facebook')}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-2 hover:bg-sky-50 hover:border-sky-300"
              >
                <Twitter className="h-4 w-4 text-sky-500" />
                <span>Twitter</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleShare('whatsapp')}
                className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-300"
              >
                <SiWhatsapp className="h-4 w-4 text-green-600" />
                <span>WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span>LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Other Options */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900">Other sharing options</h5>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => handleShare('email')}
                className="flex items-center space-x-2 hover:bg-gray-50"
              >
                <Mail className="h-4 w-4 text-gray-600" />
                <span>Send via Email</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="flex items-center space-x-2 hover:bg-gray-50"
              >
                <Copy className="h-4 w-4 text-gray-600" />
                <span>Copy Listing Details</span>
              </Button>

              <Button
                variant="outline"
                onClick={copyUrl}
                className="flex items-center space-x-2 hover:bg-gray-50"
              >
                <Copy className="h-4 w-4 text-gray-600" />
                <span>Copy Listing URL</span>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>📊 Share this listing to reach more potential buyers</p>
            <p>🔗 Each share includes your listing URL for easy access</p>
            <p>📱 Mobile-friendly sharing across all platforms</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}