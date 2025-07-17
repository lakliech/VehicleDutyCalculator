import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Camera, CheckCircle, AlertTriangle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ImageUploadProps {
  label: string;
  description: string;
  value?: string;
  onChange: (base64: string | undefined) => void;
  className?: string;
  required?: boolean;
  currentPhotoCount?: number;
}

export function ImageUpload({ 
  label, 
  description, 
  value, 
  onChange, 
  className,
  required = false,
  currentPhotoCount = 0
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photoLimit, setPhotoLimit] = useState<{
    allowed: boolean;
    limit: number;
    message?: string;
  }>({ allowed: true, limit: 5 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Check photo upload limit when component mounts or photo count changes
  useEffect(() => {
    const checkPhotoLimit = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await apiRequest('POST', '/api/features/check/photo-upload', {
          currentPhotoCount
        });
        
        if (response.ok) {
          const result = await response.json();
          setPhotoLimit(result);
        } else {
          console.error('Failed to check photo limit');
        }
      } catch (error) {
        console.error('Error checking photo limit:', error);
      }
    };

    checkPhotoLimit();
  }, [isAuthenticated, currentPhotoCount]);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Check photo upload limit
    if (!photoLimit.allowed) {
      toast({
        title: "Photo limit reached",
        description: photoLimit.message || "You have reached your photo upload limit. Please upgrade your plan.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        onChange(base64);
        setIsUploading(false);
        
        // Show success message with limit info
        toast({
          title: "Photo uploaded successfully",
          description: photoLimit.limit === -1 ? "Unlimited uploads remaining" : 
                      `${photoLimit.limit - currentPhotoCount - 1} more photos can be uploaded`,
          variant: "default"
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      toast({
        title: "Upload failed",
        description: "Error reading file. Please try again.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center gap-2">
              {/* Photo count indicator */}
              {isAuthenticated && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{currentPhotoCount}</span>
                  <span>/</span>
                  <span>{photoLimit.limit === -1 ? '∞' : photoLimit.limit}</span>
                  {photoLimit.limit > 5 && (
                    <Crown className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              )}
              {value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          
          {!value ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                isDragging && photoLimit.allowed ? "border-purple-500 bg-purple-50" : 
                !photoLimit.allowed ? "border-red-300 bg-red-50" :
                "border-gray-300 hover:border-gray-400",
                (isUploading || !photoLimit.allowed) && "opacity-50 cursor-not-allowed",
                photoLimit.allowed && !isUploading && "cursor-pointer"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                if (photoLimit.allowed) setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={photoLimit.allowed ? handleDrop : undefined}
              onClick={() => !isUploading && photoLimit.allowed && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={isUploading || !photoLimit.allowed}
              />
              
              <div className="flex flex-col items-center gap-2">
                {isUploading ? (
                  <>
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </>
                ) : !photoLimit.allowed ? (
                  <>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <p className="text-sm text-red-600">
                      Photo limit reached ({currentPhotoCount}/{photoLimit.limit})
                    </p>
                    <p className="text-xs text-red-500">
                      Upgrade your plan to upload more photos
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={value}
                alt={label}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}