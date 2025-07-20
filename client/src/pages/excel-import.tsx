import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Eye, Check, X, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

interface ColumnMapping {
  [field: string]: number | null;
}

interface ImportProgress {
  total: number;
  processed: number;
  successful: number;
  failed: number;
  currentItem: string;
  status: 'idle' | 'parsing' | 'downloading' | 'importing' | 'completed';
  errors: string[];
}

const REQUIRED_FIELDS = {
  make: 'Vehicle Make',
  model: 'Vehicle Model', 
  year: 'Year',
  price: 'Price (USD)'
};

const OPTIONAL_FIELDS = {
  mileage: 'Mileage',
  fuelType: 'Fuel Type',
  transmission: 'Transmission',
  exteriorColor: 'Color',
  engineSize: 'Engine CC',
  stockNumber: 'Stock Number',
  grade: 'Grade',
  auctionGrade: 'Auction Grade',
  chassisType: 'Chassis Type',
  doors: 'Doors',
  seats: 'Seats',
  drive: 'Drive Type',
  extraFeatures: 'Extra Features',
  imageUrl: 'Image URL'
};

export default function ExcelImport() {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [downloadImages, setDownloadImages] = useState(true);
  const [importProgress, setImportProgress] = useState<ImportProgress>({
    total: 0,
    processed: 0,
    successful: 0,
    failed: 0,
    currentItem: '',
    status: 'idle',
    errors: []
  });
  const [defaultSeller, setDefaultSeller] = useState({
    name: 'JANS Motors',
    phone: '0700123456',
    email: 'sales@jansmotors.co.ke'
  });

  const { toast } = useToast();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Invalid File",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return;
    }

    setImportProgress(prev => ({ ...prev, status: 'parsing', currentItem: 'Parsing Excel file...' }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-excel', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.success) {
        setExcelData(data.data);
        setImportProgress(prev => ({ ...prev, status: 'idle', total: data.data.totalRows }));
        toast({
          title: "Excel File Loaded",
          description: `Found ${data.data.totalRows} rows across ${data.data.sheets.length} sheet(s)`
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error('Excel parsing error:', error);
      setImportProgress(prev => ({ ...prev, status: 'idle' }));
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to parse Excel file",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleSheetChange = async (sheetName: string) => {
    if (!excelData) return;

    setImportProgress(prev => ({ ...prev, status: 'parsing', currentItem: `Loading sheet: ${sheetName}` }));

    try {
      const response = await apiRequest('POST', '/api/parse-excel-sheet', {
        fileName: excelData.fileName,
        sheetName
      });
      const data = await response.json();

      if (data.success) {
        setExcelData(prev => prev ? { ...prev, ...data.data, selectedSheet: sheetName } : null);
        setColumnMapping({});
        setImportProgress(prev => ({ ...prev, status: 'idle', total: data.data.totalRows }));
      }
    } catch (error: any) {
      setImportProgress(prev => ({ ...prev, status: 'idle' }));
      toast({
        title: "Sheet Loading Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const detectColumnMappings = () => {
    if (!excelData) return;

    const newMapping: ColumnMapping = {};
    
    // Auto-detect common column patterns
    excelData.columns.forEach((column, index) => {
      const lowerName = column.name.toLowerCase();
      
      if (lowerName.includes('make') || lowerName.includes('manufacturer')) {
        newMapping.make = index;
      } else if (lowerName.includes('model') && !lowerName.includes('year')) {
        newMapping.model = index;
      } else if (lowerName.includes('year') || lowerName.includes('firstregistration')) {
        newMapping.year = index;
      } else if (lowerName.includes('price') || lowerName.includes('cost')) {
        newMapping.price = index;
      } else if (lowerName.includes('mileage') || lowerName.includes('km')) {
        newMapping.mileage = index;
      } else if (lowerName.includes('fuel') || lowerName.includes('gasoline')) {
        newMapping.fuelType = index;
      } else if (lowerName.includes('transmission')) {
        newMapping.transmission = index;
      } else if (lowerName.includes('color') && !lowerName.includes('interior')) {
        newMapping.exteriorColor = index;
      } else if (lowerName.includes('engine') || lowerName.includes('cc')) {
        newMapping.engineSize = index;
      } else if (lowerName.includes('stock')) {
        newMapping.stockNumber = index;
      } else if (lowerName.includes('grade') && !lowerName.includes('auction')) {
        newMapping.grade = index;
      } else if (lowerName.includes('auction')) {
        newMapping.auctionGrade = index;
      } else if (lowerName.includes('chassis')) {
        newMapping.chassisType = index;
      } else if (lowerName.includes('door')) {
        newMapping.doors = index;
      } else if (lowerName.includes('seat')) {
        newMapping.seats = index;
      } else if (lowerName.includes('drive') || lowerName.includes('4wd') || lowerName.includes('awd')) {
        newMapping.drive = index;
      } else if (lowerName.includes('feature') || lowerName.includes('extra')) {
        newMapping.extraFeatures = index;
      } else if (lowerName.includes('image') || lowerName.includes('photo') || lowerName.includes('url')) {
        newMapping.imageUrl = index;
      }
    });

    setColumnMapping(newMapping);
    toast({
      title: "Auto-Detection Complete",
      description: `Mapped ${Object.keys(newMapping).length} columns automatically`
    });
  };

  const validateMappings = () => {
    const missing = [];
    for (const [field, label] of Object.entries(REQUIRED_FIELDS)) {
      if (!columnMapping[field]) {
        missing.push(label);
      }
    }
    return missing;
  };

  const startImport = async () => {
    if (!excelData) return;

    const missingFields = validateMappings();
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please map: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setImportProgress({
      total: excelData.totalRows - 1, // Exclude header
      processed: 0,
      successful: 0,
      failed: 0,
      currentItem: 'Starting import...',
      status: 'importing',
      errors: []
    });

    try {
      const response = await apiRequest('POST', '/api/import-excel-listings', {
        fileName: excelData.fileName,
        sheetName: excelData.selectedSheet,
        columnMapping,
        downloadImages,
        defaultSeller,
        skipRows: 1 // Skip header row
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const update = JSON.parse(line);
              setImportProgress(prev => ({
                ...prev,
                ...update
              }));
            } catch (e) {
              // Ignore invalid JSON lines
            }
          }
        }
      }

      toast({
        title: "Import Completed",
        description: `Successfully imported ${importProgress.successful} listings`
      });

    } catch (error: any) {
      console.error('Import error:', error);
      setImportProgress(prev => ({ 
        ...prev, 
        status: 'idle',
        errors: [...prev.errors, error.message]
      }));
      toast({
        title: "Import Failed", 
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getColumnOptions = (currentField: string) => {
    if (!excelData) return [];
    
    return excelData.columns.map((col, index) => (
      <SelectItem key={index} value={index.toString()}>
        {col.name} ({col.dataType}) - Sample: {col.sampleValues[0] || 'N/A'}
      </SelectItem>
    ));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Excel Car Listings Importer
          </CardTitle>
          <CardDescription>
            Upload an Excel file containing car inventory data and import listings with automatic image downloads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* File Upload Section */}
          <div className="space-y-4">
            <Label htmlFor="file-upload">Select Excel File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={importProgress.status !== 'idle'}
            />
            
            {importProgress.status === 'parsing' && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{importProgress.currentItem}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Sheet Selection */}
          {excelData && (
            <div className="space-y-4">
              <Label>Select Sheet</Label>
              <Select value={excelData.selectedSheet} onValueChange={handleSheetChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a sheet" />
                </SelectTrigger>
                <SelectContent>
                  {excelData.sheets.map(sheet => (
                    <SelectItem key={sheet} value={sheet}>{sheet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground">
                Found {excelData.totalRows} rows with {excelData.columns.length} columns
              </div>
            </div>
          )}

          {/* Column Preview */}
          {excelData && excelData.columns.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Preview</CardTitle>
                <Button onClick={detectColumnMappings} variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Auto-Detect Columns
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {excelData.columns.map((col, index) => (
                        <TableHead key={index}>
                          <div className="space-y-1">
                            <div className="font-medium">{col.name}</div>
                            <Badge variant="secondary" className="text-xs">
                              {col.dataType}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {excelData.rows.slice(0, 3).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex} className="max-w-32 truncate">
                            {String(cell || '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Column Mapping */}
          {excelData && (
            <Card>
              <CardHeader>
                <CardTitle>Column Mapping</CardTitle>
                <CardDescription>
                  Map Excel columns to car listing fields. Required fields are marked with *
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Required Fields */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(REQUIRED_FIELDS).map(([field, label]) => (
                    <div key={field} className="space-y-2">
                      <Label className="text-red-600">{label} *</Label>
                      <Select
                        value={columnMapping[field]?.toString() || ''}
                        onValueChange={(value) => setColumnMapping(prev => ({
                          ...prev,
                          [field]: value ? parseInt(value) : null
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">-- None --</SelectItem>
                          {getColumnOptions(field)}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                {/* Optional Fields */}
                <div className="space-y-2">
                  <Label className="font-medium">Optional Fields</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(OPTIONAL_FIELDS).map(([field, label]) => (
                      <div key={field} className="space-y-2">
                        <Label className="text-sm">{label}</Label>
                        <Select
                          value={columnMapping[field]?.toString() || ''}
                          onValueChange={(value) => setColumnMapping(prev => ({
                            ...prev,
                            [field]: value ? parseInt(value) : null
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">-- None --</SelectItem>
                            {getColumnOptions(field)}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Import Options */}
          {excelData && (
            <Card>
              <CardHeader>
                <CardTitle>Import Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="download-images"
                    checked={downloadImages}
                    onCheckedChange={(checked) => setDownloadImages(checked === true)}
                  />
                  <Label htmlFor="download-images">
                    Download images from URLs (if Image URL column is mapped)
                  </Label>
                </div>

                <div className="space-y-4">
                  <Label>Default Seller Information</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Seller Name</Label>
                      <Input
                        value={defaultSeller.name}
                        onChange={(e) => setDefaultSeller(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Phone</Label>
                      <Input
                        value={defaultSeller.phone}
                        onChange={(e) => setDefaultSeller(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Email</Label>
                      <Input
                        value={defaultSeller.email}
                        onChange={(e) => setDefaultSeller(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Import Progress */}
          {importProgress.status !== 'idle' && (
            <Card>
              <CardHeader>
                <CardTitle>Import Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{importProgress.processed} / {importProgress.total}</span>
                  </div>
                  <Progress value={(importProgress.processed / importProgress.total) * 100} />
                </div>

                <div className="text-sm">
                  Status: {importProgress.currentItem}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Successful: {importProgress.successful}
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    Failed: {importProgress.failed}
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-blue-600" />
                    Processing: {importProgress.processed}
                  </div>
                </div>

                {importProgress.errors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {importProgress.errors.slice(-3).map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Import Button */}
          {excelData && (
            <Button
              onClick={startImport}
              className="w-full"
              disabled={importProgress.status !== 'idle' || validateMappings().length > 0}
            >
              <Upload className="h-4 w-4 mr-2" />
              {importProgress.status !== 'idle' ? 'Importing...' : `Import ${excelData.totalRows - 1} Listings`}
            </Button>
          )}

        </CardContent>
      </Card>
    </div>
  );
}