import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Use intersection observer for lazy loading unless priority is true
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    skip: priority,
  });

  // Determine if we should load the image
  const shouldLoad = priority || inView;

  useEffect(() => {
    if (shouldLoad && !imageUrl) {
      // Check if browser supports WebP
      const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      };

      // Build optimized image URL
      const format = supportsWebP() ? 'webp' : 'jpeg';
      const optimizedUrl = buildOptimizedUrl(src, { format, width, height });
      setImageUrl(optimizedUrl);
    }
  }, [shouldLoad, src, width, height, imageUrl]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original image
    if (imgRef.current && imageUrl !== src) {
      setImageUrl(src);
      setHasError(false);
    } else {
      onError?.();
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string, format: 'webp' | 'jpeg') => {
    const sizes = [320, 640, 1024, 1920];
    return sizes
      .map(size => `${buildOptimizedUrl(baseSrc, { format, width: size })} ${size}w`)
      .join(', ');
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gray-100',
        className
      )}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}

      {/* Main image */}
      {shouldLoad && imageUrl && (
        <img
          ref={imgRef}
          src={imageUrl}
          srcSet={generateSrcSet(src, imageUrl.includes('webp') ? 'webp' : 'jpeg')}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'object-cover w-full h-full'
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Image not available</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {shouldLoad && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Progressive image component for hero images
export function ProgressiveImage({
  src,
  alt,
  className,
  lowQualitySrc,
  ...props
}: OptimizedImageProps & { lowQualitySrc?: string }) {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const [showLowQuality, setShowLowQuality] = useState(!!lowQualitySrc);

  useEffect(() => {
    if (lowQualitySrc) {
      // Preload low quality image
      const img = new Image();
      img.onload = () => setShowLowQuality(true);
      img.src = lowQualitySrc;
    }
  }, [lowQualitySrc]);

  const handleHighQualityLoad = () => {
    setIsHighQualityLoaded(true);
    setShowLowQuality(false);
    props.onLoad?.();
  };

  return (
    <div className={cn('relative', className)}>
      {/* Low quality placeholder */}
      {showLowQuality && !isHighQualityLoaded && lowQualitySrc && (
        <img
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105"
        />
      )}

      {/* High quality image */}
      <OptimizedImage
        {...props}
        src={src}
        alt={alt}
        className="relative z-10"
        onLoad={handleHighQualityLoad}
      />
    </div>
  );
}

// Utility function to build optimized image URLs
function buildOptimizedUrl(
  originalUrl: string,
  options: {
    format?: 'webp' | 'jpeg';
    width?: number;
    height?: number;
    quality?: number;
  } = {}
): string {
  const { format = 'webp', width, height, quality = 85 } = options;

  // If it's already an external URL, return as-is
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }

  // Build API URL for optimized image
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('f', format);

  // Remove leading slash and build proper path
  const cleanUrl = originalUrl.replace(/^\//, '');
  const queryString = params.toString();
  return `/api/images/optimize/${cleanUrl}${queryString ? `?${queryString}` : ''}`;
}

// Image optimization hook for client-side optimization decisions
export function useImageOptimization() {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast');

  useEffect(() => {
    // Check WebP support
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    setSupportsWebP(webpSupported);

    // Detect connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slow = connection.effectiveType === 'slow-2g' || 
                   connection.effectiveType === '2g' ||
                   connection.saveData;
      setConnectionSpeed(slow ? 'slow' : 'fast');

      const handleConnectionChange = () => {
        const slow = connection.effectiveType === 'slow-2g' || 
                     connection.effectiveType === '2g' ||
                     connection.saveData;
        setConnectionSpeed(slow ? 'slow' : 'fast');
      };

      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
  }, []);

  const getOptimalImageSettings = (isAboveFold: boolean = false) => ({
    format: supportsWebP ? 'webp' : 'jpeg',
    quality: connectionSpeed === 'slow' ? 70 : 85,
    priority: isAboveFold,
    placeholder: connectionSpeed === 'slow' ? 'blur' : 'empty',
  });

  return {
    supportsWebP,
    connectionSpeed,
    getOptimalImageSettings,
  };
}