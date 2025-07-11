import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  uploadedImages: string[];
  mainImageIndex: number;
  onImageUpload: (images: string[]) => void;
  onMainImageSelect: (index: number) => void;
  onImageDelete: (index: number) => void;
  maxImages?: number;
}

export function ImageUpload({
  uploadedImages,
  mainImageIndex,
  onImageUpload,
  onMainImageSelect,
  onImageDelete,
  maxImages = 8,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      if (uploadedImages.length + newImages.length >= maxImages) {
        toast({
          title: "Maximum Photos Reached",
          description: `You can upload a maximum of ${maxImages} photos.`,
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 5MB. Please choose a smaller file.`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target?.result as string);
        processedCount++;

        if (processedCount === files.length) {
          onImageUpload([...uploadedImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Photos *</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative group">
            <img 
              src={image} 
              alt={`Vehicle ${index + 1}`} 
              className="w-full h-32 object-cover rounded-lg"
            />
            {index === mainImageIndex && (
              <Badge className="absolute top-2 left-2 bg-purple-600">
                <Star className="h-3 w-3 mr-1" />
                Main
              </Badge>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              {index !== mainImageIndex && (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => onMainImageSelect(index)}
                >
                  Set Main
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => onImageDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {uploadedImages.length < maxImages && (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-purple-600 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <ImagePlus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm text-gray-500">Add Photo</span>
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <p className="text-sm text-gray-500">
        Upload up to {maxImages} photos. First photo will be the main image. Maximum file size: 5MB each.
      </p>
    </div>
  );
}