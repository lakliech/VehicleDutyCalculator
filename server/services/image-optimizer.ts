import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import { createHash } from 'crypto';

export interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
  progressive?: boolean;
}

export interface OptimizedImage {
  originalPath: string;
  optimizedPath: string;
  webpPath: string;
  originalSize: number;
  optimizedSize: number;
  webpSize: number;
  compressionRatio: number;
  hash: string;
}

export class ImageOptimizer {
  private static readonly UPLOAD_DIR = 'uploads';
  private static readonly OPTIMIZED_DIR = 'uploads/optimized';
  private static readonly WEBP_DIR = 'uploads/webp';
  
  static async initialize() {
    // Create directories if they don't exist
    await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
    await fs.mkdir(this.OPTIMIZED_DIR, { recursive: true });
    await fs.mkdir(this.WEBP_DIR, { recursive: true });
  }

  /**
   * Optimize a single image with multiple formats and sizes
   */
  static async optimizeImage(
    inputPath: string, 
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImage> {
    const {
      quality = 85,
      width,
      height,
      format = 'jpeg',
      progressive = true
    } = options;

    const inputBuffer = await fs.readFile(inputPath);
    const originalSize = inputBuffer.length;
    
    // Generate hash for caching
    const hash = createHash('md5').update(inputBuffer).digest('hex');
    const fileName = path.basename(inputPath, path.extname(inputPath));
    
    // Define output paths
    const optimizedPath = path.join(this.OPTIMIZED_DIR, `${fileName}_${hash}.${format}`);
    const webpPath = path.join(this.WEBP_DIR, `${fileName}_${hash}.webp`);

    // Check if optimized versions already exist
    const optimizedExists = await this.fileExists(optimizedPath);
    const webpExists = await this.fileExists(webpPath);

    let optimizedSize = originalSize;
    let webpSize = originalSize;

    if (!optimizedExists || !webpExists) {
      const image = sharp(inputBuffer);
      
      // Get image metadata
      const metadata = await image.metadata();
      
      // Apply transformations
      let pipeline = image;
      
      if (width || height) {
        pipeline = pipeline.resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Generate optimized version
      if (!optimizedExists) {
        const optimizedBuffer = await pipeline
          .clone()
          [format]({ 
            quality, 
            progressive: format === 'jpeg' ? progressive : undefined 
          })
          .toBuffer();
        
        await fs.writeFile(optimizedPath, optimizedBuffer);
        optimizedSize = optimizedBuffer.length;
      } else {
        const stats = await fs.stat(optimizedPath);
        optimizedSize = stats.size;
      }

      // Generate WebP version
      if (!webpExists) {
        const webpBuffer = await pipeline
          .clone()
          .webp({ quality: quality + 5 }) // Slightly higher quality for WebP
          .toBuffer();
        
        await fs.writeFile(webpPath, webpBuffer);
        webpSize = webpBuffer.length;
      } else {
        const stats = await fs.stat(webpPath);
        webpSize = stats.size;
      }
    } else {
      // Files exist, get their sizes
      const optimizedStats = await fs.stat(optimizedPath);
      const webpStats = await fs.stat(webpPath);
      optimizedSize = optimizedStats.size;
      webpSize = webpStats.size;
    }

    const compressionRatio = ((originalSize - Math.min(optimizedSize, webpSize)) / originalSize) * 100;

    return {
      originalPath: inputPath,
      optimizedPath,
      webpPath,
      originalSize,
      optimizedSize,
      webpSize,
      compressionRatio,
      hash
    };
  }

  /**
   * Optimize multiple images concurrently
   */
  static async optimizeImages(
    inputPaths: string[], 
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImage[]> {
    const promises = inputPaths.map(path => this.optimizeImage(path, options));
    return Promise.all(promises);
  }

  /**
   * Generate responsive image sizes
   */
  static async generateResponsiveImages(
    inputPath: string, 
    sizes: number[] = [320, 640, 1024, 1920]
  ): Promise<{ [size: number]: OptimizedImage }> {
    const responsiveImages: { [size: number]: OptimizedImage } = {};
    
    for (const size of sizes) {
      const optimized = await this.optimizeImage(inputPath, {
        width: size,
        quality: size <= 640 ? 75 : 85, // Lower quality for smaller sizes
        format: 'jpeg',
        progressive: true
      });
      responsiveImages[size] = optimized;
    }

    return responsiveImages;
  }

  /**
   * Clean up old optimized images
   */
  static async cleanupOldImages(olderThanDays: number = 30): Promise<void> {
    const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
    
    const directories = [this.OPTIMIZED_DIR, this.WEBP_DIR];
    
    for (const dir of directories) {
      try {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          
          if (stats.mtime.getTime() < cutoffTime) {
            await fs.unlink(filePath);
          }
        }
      } catch (error) {
        console.error(`Error cleaning up directory ${dir}:`, error);
      }
    }
  }

  /**
   * Get optimized image URL for client
   */
  static getOptimizedImageUrl(originalUrl: string, options: {
    format?: 'webp' | 'jpeg';
    size?: number;
  } = {}): string {
    const { format = 'webp', size } = options;
    
    // Extract filename from original URL
    const fileName = path.basename(originalUrl, path.extname(originalUrl));
    
    // Build optimized URL
    const baseUrl = format === 'webp' ? '/api/images/webp' : '/api/images/optimized';
    const sizeParam = size ? `?size=${size}` : '';
    
    return `${baseUrl}/${fileName}${sizeParam}`;
  }

  private static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// Image processing utilities
export const imageUtils = {
  /**
   * Validate image file type
   */
  isValidImageType(filename: string): boolean {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ext = path.extname(filename).toLowerCase();
    return validExtensions.includes(ext);
  },

  /**
   * Generate image srcset for responsive images
   */
  generateSrcSet(baseUrl: string, sizes: number[]): string {
    return sizes
      .map(size => `${baseUrl}?size=${size} ${size}w`)
      .join(', ');
  },

  /**
   * Get optimal image format based on browser support
   */
  getOptimalFormat(userAgent: string): 'webp' | 'jpeg' {
    // Check for WebP support
    if (userAgent.includes('Chrome') || 
        userAgent.includes('Firefox') || 
        userAgent.includes('Edge')) {
      return 'webp';
    }
    return 'jpeg';
  }
};