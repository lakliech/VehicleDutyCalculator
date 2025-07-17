import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Camera, CheckCircle, AlertTriangle, Images } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface UploadedImage {
  id: string;
  file: File;
  base64: string;
  progress: number;
  error?: string;
}

interface BulkImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  className?: string;
}

export function BulkImageUpload({ 
  value = [], 
  onChange, 
  maxFiles = 50,
  maxFileSize = 5,
  className 
}: BulkImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const processFiles = useCallback(async (files: File[]) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        return false;
      }
      
      if (file.size > maxFileSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxFileSize}MB limit`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    if (uploadedImages.length + validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} images allowed. You can upload ${maxFiles - uploadedImages.length} more.`,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    const newImages: UploadedImage[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      base64: '',
      progress: 0
    }));

    setUploadedImages(prev => [...prev, ...newImages]);

    // Process files in parallel
    const processPromises = newImages.map((image, index) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setUploadedImages(prev => 
              prev.map(img => 
                img.id === image.id 
                  ? { ...img, progress }
                  : img
              )
            );
          }
        };

        reader.onload = () => {
          const base64 = reader.result as string;
          setUploadedImages(prev => 
            prev.map(img => 
              img.id === image.id 
                ? { ...img, base64, progress: 100 }
                : img
            )
          );
          resolve();
        };

        reader.onerror = () => {
          setUploadedImages(prev => 
            prev.map(img => 
              img.id === image.id 
                ? { ...img, error: 'Failed to read file', progress: 0 }
                : img
            )
          );
          resolve();
        };

        reader.readAsDataURL(image.file);
      });
    });

    await Promise.all(processPromises);

    // Update parent component with successful uploads
    setTimeout(() => {
      setUploadedImages(prev => {
        const successfulImages = prev.filter(img => img.base64 && !img.error);
        const base64Array = successfulImages.map(img => img.base64);
        onChange([...value, ...base64Array]);
        return prev;
      });
      
      setIsUploading(false);
      
      toast({
        title: "Upload complete",
        description: `${validFiles.length} photos uploaded successfully`,
        variant: "default"
      });
    }, 500);

  }, [uploadedImages.length, maxFiles, maxFileSize, onChange, value, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }, [processFiles]);

  const removeImage = useCallback((index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
    
    // Also remove from uploadedImages if it exists
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Photo removed",
      description: "Photo was removed from your listing",
    });
  }, [value, onChange, toast]);

  const clearAll = useCallback(() => {
    onChange([]);
    setUploadedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast({
      title: "All photos cleared",
      description: "All photos have been removed",
    });
  }, [onChange, toast]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Images className="w-5 h-5 text-purple-600" />
          Vehicle Photos
          <span className="text-sm font-normal text-gray-500">
            ({value.length}/{maxFiles})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload high-quality photos of your vehicle. Drag and drop multiple files or click to browse.
        </p>

        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400",
            isUploading && "opacity-50 cursor-not-allowed",
            !isUploading && "cursor-pointer"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            if (!isUploading) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-medium">
                {isDragging ? "Drop photos here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, JPEG up to {maxFileSize}MB each
              </p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              disabled={isUploading}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Upload Progress */}
        {isUploading && uploadedImages.some(img => img.progress < 100) && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploading...</h4>
            {uploadedImages.map((image) => (
              <div key={image.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="truncate">{image.file.name}</span>
                  <span>{Math.round(image.progress)}%</span>
                </div>
                <Progress value={image.progress} className="h-2" />
              </div>
            ))}
          </div>
        )}

        {/* Uploaded Images Grid */}
        {value.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Uploaded Photos ({value.length})</h4>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={clearAll}
              >
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {value.map((base64, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={base64} 
                      alt={`Vehicle photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h5 className="text-sm font-medium text-blue-800 mb-1">Photo Tips</h5>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Include exterior shots from all angles (front, back, sides)</li>
            <li>• Add interior photos showing dashboard, seats, and features</li>
            <li>• Take photos in good lighting for best results</li>
            <li>• Show any damage or wear honestly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}