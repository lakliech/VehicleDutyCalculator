import type { Express, Request, Response } from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { db } from "../db";
import { carListings, appUsers } from "@shared/schema-minimal";
import { importListingSchema, ImportListing } from "@shared/schema-minimal";
import { eq } from "drizzle-orm";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/excel/',
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.xlsx', '.xls'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed'));
    }
  }
});

interface ExcelColumn {
  name: string;
  index: number;
  sampleValues: string[];
  dataType: 'text' | 'number' | 'date' | 'url';
}

interface ExcelData {
  fileName: string;
  sheets: string[];
  selectedSheet: string;
  columns: ExcelColumn[];
  rows: any[][];
  totalRows: number;
}

// Default seller for imports
const DEFAULT_SELLER = {
  id: "jans-motors-import",
  email: "imports@jansmotors.co.ke",
  name: "JANS Motors Import",
  phone: "0700123456"
};

function detectDataType(values: any[]): 'text' | 'number' | 'date' | 'url' {
  const nonEmptyValues = values.filter(v => v != null && v !== '');
  if (nonEmptyValues.length === 0) return 'text';

  // Check for URLs
  const urlPattern = /^https?:\/\/.+/i;
  if (nonEmptyValues.some(v => typeof v === 'string' && urlPattern.test(v))) {
    return 'url';
  }

  // Check for dates
  const datePattern = /^\d{4}[\/\-]\d{1,2}/;
  if (nonEmptyValues.some(v => typeof v === 'string' && datePattern.test(v))) {
    return 'date';
  }

  // Check for numbers
  const numericCount = nonEmptyValues.filter(v => !isNaN(Number(v))).length;
  if (numericCount > nonEmptyValues.length * 0.7) {
    return 'number';
  }

  return 'text';
}

function parseExcelFile(filePath: string, sheetName?: string): ExcelData {
  const workbook = XLSX.readFile(filePath);
  const sheets = workbook.SheetNames;
  const targetSheet = sheetName || sheets[0];
  
  if (!sheets.includes(targetSheet)) {
    throw new Error(`Sheet "${targetSheet}" not found`);
  }

  const worksheet = workbook.Sheets[targetSheet];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

  if (jsonData.length === 0) {
    throw new Error('Sheet is empty');
  }

  const headers = jsonData[0] as string[];
  const rows = jsonData.slice(1) as any[][];

  // Analyze columns
  const columns: ExcelColumn[] = headers.map((header, index) => {
    const columnValues = rows.slice(0, 100).map(row => row[index]); // Sample first 100 rows
    const sampleValues = columnValues
      .filter(v => v != null && v !== '')
      .slice(0, 3)
      .map(v => String(v));
    
    return {
      name: header || `Column ${index + 1}`,
      index,
      sampleValues,
      dataType: detectDataType(columnValues)
    };
  });

  return {
    fileName: path.basename(filePath),
    sheets,
    selectedSheet: targetSheet,
    columns,
    rows,
    totalRows: jsonData.length
  };
}

async function downloadImage(url: string, stockNumber: string): Promise<string | null> {
  try {
    console.log(`Downloading image: ${url}`);
    
    const response = await fetch(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) {
      throw new Error('Not an image');
    }

    const buffer = await response.buffer();
    
    // Generate filename
    const fileName = `${stockNumber}-${Date.now()}.webp`;
    const uploadDir = 'uploads/images/imports';
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    // Process and save image using sharp
    await sharp(buffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(filePath);

    console.log(`✓ Image downloaded: ${fileName}`);
    return `/uploads/images/imports/${fileName}`;

  } catch (error: any) {
    console.error(`✗ Failed to download image ${url}:`, error.message);
    return null;
  }
}

function mapRowToListing(row: any[], columnMapping: any, defaultSeller: any): ImportListing {
  const getValue = (field: string) => {
    const index = columnMapping[field];
    return index !== null && index !== undefined ? row[index] : null;
  };

  // Extract required fields
  const make = String(getValue('make') || '').trim();
  const model = String(getValue('model') || '').trim();
  const yearValue = getValue('year');
  const priceValue = getValue('price');

  if (!make || !model) {
    throw new Error('Missing required make or model');
  }

  // Parse year (handle various formats)
  let year = new Date().getFullYear();
  if (yearValue) {
    const yearStr = String(yearValue);
    // Handle formats like "2019/01" or "2019"
    const yearMatch = yearStr.match(/(\d{4})/);
    if (yearMatch) {
      year = parseInt(yearMatch[1]);
    }
  }

  // Parse price
  let price = 0;
  if (priceValue) {
    const priceNum = parseFloat(String(priceValue).replace(/[^0-9.]/g, ''));
    if (!isNaN(priceNum)) {
      price = priceNum;
    }
  }

  // Map fuel type
  const fuelValue = String(getValue('fuelType') || '').toLowerCase();
  let fuelType = 'petrol';
  if (fuelValue.includes('gasoline') || fuelValue.includes('petrol')) {
    fuelType = 'petrol';
  } else if (fuelValue.includes('diesel')) {
    fuelType = 'diesel';
  } else if (fuelValue.includes('electric')) {
    fuelType = 'electric';
  } else if (fuelValue.includes('hybrid')) {
    fuelType = 'hybrid';
  }

  // Map transmission
  const transValue = String(getValue('transmission') || '').toLowerCase();
  const transmission = transValue.includes('at') || transValue.includes('auto') ? 'automatic' : 'manual';

  // Parse mileage
  const mileageValue = getValue('mileage');
  let mileage = 0;
  if (mileageValue) {
    const mileageNum = parseInt(String(mileageValue).replace(/[^0-9]/g, ''));
    if (!isNaN(mileageNum)) {
      mileage = mileageNum;
    }
  }

  // Parse engine size
  const engineValue = getValue('engineSize');
  let engineSize = undefined;
  if (engineValue) {
    const engineNum = parseInt(String(engineValue));
    if (!isNaN(engineNum)) {
      engineSize = engineNum;
    }
  }

  // Build listing object
  const listing: ImportListing = {
    title: `${year} ${make} ${model}`,
    make: make.toUpperCase(),
    model: model.toUpperCase(),
    year,
    price,
    mileage,
    fuelType,
    transmission,
    engineSize,
    exteriorColor: String(getValue('exteriorColor') || 'silver').toLowerCase(),
    condition: 'used',
    location: 'Nairobi',
    county: 'Nairobi',
    area: 'Westlands',
    description: `${year} ${make} ${model} imported from Japan in excellent condition. Contact for viewing and test drive.`,
    features: ['Air Conditioning', 'Power Steering', 'Electric Windows'],
    sellerName: defaultSeller.name,
    sellerPhone: defaultSeller.phone,
    sellerEmail: defaultSeller.email,
    stockNumber: String(getValue('stockNumber') || ''),
    chassisType: String(getValue('chassisType') || ''),
    grade: String(getValue('grade') || ''),
    doors: parseInt(String(getValue('doors') || '4')),
    seats: parseInt(String(getValue('seats') || '5')),
    auctionGrade: String(getValue('auctionGrade') || ''),
    extraFeatures: String(getValue('extraFeatures') || ''),
    status: 'pending' as const
  };

  return listing;
}

export function registerExcelParserRoutes(app: Express) {
  // Parse Excel file endpoint
  app.post("/api/parse-excel", upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded"
        });
      }

      console.log(`Parsing Excel file: ${req.file.originalname}`);
      
      const excelData = parseExcelFile(req.file.path);
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      res.json({
        success: true,
        data: excelData
      });

    } catch (error: any) {
      console.error('Excel parsing error:', error);
      
      // Clean up file if it exists
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: error.message || "Failed to parse Excel file"
      });
    }
  });

  // Parse specific sheet endpoint
  app.post("/api/parse-excel-sheet", async (req: Request, res: Response) => {
    try {
      const { fileName, sheetName } = req.body;
      
      if (!fileName || !sheetName) {
        return res.status(400).json({
          success: false,
          error: "Missing fileName or sheetName"
        });
      }

      // This would require storing the file temporarily - for now return error
      res.status(400).json({
        success: false,
        error: "Sheet switching not implemented - please re-upload file"
      });

    } catch (error: any) {
      console.error('Sheet parsing error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Import Excel listings with streaming progress
  app.post("/api/import-excel-listings", upload.single('file'), async (req: Request, res: Response) => {
    try {
      let { fileName, sheetName, columnMapping, downloadImages, defaultSeller, skipRows } = req.body;
      
      // If file is provided, parse it; otherwise expect data in body
      let excelData: ExcelData;
      
      if (req.file) {
        excelData = parseExcelFile(req.file.path, sheetName);
      } else if (fileName) {
        // File should be stored temporarily, but for now we'll return an error
        return res.status(400).json({
          success: false,
          error: "File re-upload required for import"
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "No file provided"
        });
      }

      // Set up streaming response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Transfer-Encoding', 'chunked');

      const sendProgress = (update: any) => {
        res.write(JSON.stringify(update) + '\n');
      };

      // Find or create seller
      let seller = await db
        .select()
        .from(appUsers)
        .where(eq(appUsers.email, defaultSeller?.email || DEFAULT_SELLER.email))
        .limit(1);

      let sellerId: string;
      
      if (seller.length === 0) {
        const newSeller = await db
          .insert(appUsers)
          .values({
            id: DEFAULT_SELLER.id,
            email: defaultSeller?.email || DEFAULT_SELLER.email,
            firstName: defaultSeller?.name?.split(' ')[0] || "JANS",
            lastName: defaultSeller?.name?.split(' ').slice(1).join(' ') || "Motors",
            phoneNumber: defaultSeller?.phone || DEFAULT_SELLER.phone,
            isActive: true,
            status: "active",
            emailVerified: true,
            roleId: "user"
          })
          .returning();
        
        sellerId = newSeller[0].id;
      } else {
        sellerId = seller[0].id;
      }

      const dataRows = excelData.rows.slice(skipRows || 1);
      let processed = 0;
      let successful = 0;
      let failed = 0;
      const errors: string[] = [];

      sendProgress({
        total: dataRows.length,
        processed: 0,
        successful: 0,
        failed: 0,
        currentItem: 'Starting import...',
        status: 'importing'
      });

      // Process each row
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        processed++;

        try {
          // Map row to listing
          const listingData = mapRowToListing(row, columnMapping, defaultSeller);
          
          sendProgress({
            processed,
            currentItem: `Processing: ${listingData.title}`,
            status: downloadImages && columnMapping.imageUrl ? 'downloading' : 'importing'
          });

          // Download image if URL is provided and option is enabled
          let imageUrl = null;
          if (downloadImages && columnMapping.imageUrl && row[columnMapping.imageUrl]) {
            const imageUrlFromRow = String(row[columnMapping.imageUrl]);
            if (imageUrlFromRow.startsWith('http')) {
              imageUrl = await downloadImage(imageUrlFromRow, listingData.stockNumber || `item-${i}`);
            }
          }

          // Create car listing
          const carListingData = {
            sellerId,
            title: listingData.title,
            make: listingData.make,
            model: listingData.model,
            year: listingData.year,
            price: listingData.price.toString(),
            mileage: listingData.mileage,
            fuelType: listingData.fuelType,
            transmission: listingData.transmission,
            bodyType: 'sedan', // Default
            driveConfiguration: '2wd', // Default
            engineSize: listingData.engineSize,
            exteriorColor: listingData.exteriorColor,
            interiorColor: 'black', // Default
            condition: listingData.condition,
            location: listingData.location || 'Nairobi, Kenya',
            locationType: "locally_available" as const,
            description: listingData.description,
            features: listingData.features || [],
            phoneNumber: listingData.sellerPhone,
            status: listingData.status as "pending" | "active" | "inactive",
            images: imageUrl ? [imageUrl] : [],
            videos: [],
            documents: null,
            negotiable: true,
            isVerified: false,
            featured: false,
            isFlagged: false,
            listingSource: "JANS_EXCEL_IMPORT"
          };

          const result = await db
            .insert(carListings)
            .values(carListingData)
            .returning();

          successful++;
          
          sendProgress({
            processed,
            successful,
            failed,
            currentItem: `✓ Imported: ${listingData.title}`,
            status: 'importing'
          });

        } catch (error: any) {
          failed++;
          const errorMsg = `Row ${i + 1}: ${error.message}`;
          errors.push(errorMsg);
          
          sendProgress({
            processed,
            successful,
            failed,
            currentItem: `✗ Failed: ${errorMsg}`,
            status: 'importing',
            errors: errors.slice(-5) // Show last 5 errors
          });
        }
      }

      // Final progress update
      sendProgress({
        processed,
        successful,
        failed,
        currentItem: `Import completed: ${successful} successful, ${failed} failed`,
        status: 'completed',
        errors
      });

      // Clean up uploaded file
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.end();

    } catch (error: any) {
      console.error('Import error:', error);
      
      // Clean up file
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    }
  });
}