import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Edit, 
  Upload, 
  Percent, 
  Calculator, 
  Filter, 
  TrendingDown, 
  RefreshCw 
} from "lucide-react";
import type { 
  VehicleReference, 
  TaxRate, 
  ProcessingFee,
  VehicleCategoryRule, 
  DepreciationRate
} from "@shared/schema";

// Vehicles Management Tab Component
export function VehiclesManagementTab({ 
  vehicleReferences,
  isLoading,
  formatCurrency,
  getAuthHeaders 
}: {
  vehicleReferences: VehicleReference[];
  isLoading: boolean;
  formatCurrency: (amount: string | number) => string;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading vehicles...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle Database Management
          </CardTitle>
          <CardDescription>
            Manage vehicle references and CRSP values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            Total Vehicles: {vehicleReferences.length}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Engine</TableHead>
                  <TableHead>Fuel</TableHead>
                  <TableHead>CRSP (KES)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleReferences.slice(0, 50).map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.make} {vehicle.model}
                    </TableCell>
                    <TableCell>{vehicle.engineCapacity}cc</TableCell>
                    <TableCell>{vehicle.fuelType}</TableCell>
                    <TableCell>
                      {vehicle.crspKes ? formatCurrency(vehicle.crspKes) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// CSV Upload Tab Component
export function CSVUploadTab({ getAuthHeaders }: { getAuthHeaders: () => Record<string, string> }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV Data Import
          </CardTitle>
          <CardDescription>
            Upload CSV files to bulk import vehicle references, tax rates, or other data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center text-gray-500">
            CSV upload functionality will be restored soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tax Rates Tab Component
export function TaxRatesTab({ 
  taxRates, 
  isLoading,
  getAuthHeaders 
}: {
  taxRates: TaxRate[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading tax rates...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax Rate Configuration
          </CardTitle>
          <CardDescription>
            Manage import duty, excise duty, and VAT rates for different vehicle categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Category</TableHead>
                  <TableHead>Import Duty</TableHead>
                  <TableHead>Excise Duty</TableHead>
                  <TableHead>VAT</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.vehicleCategory}</TableCell>
                    <TableCell>{rate.importDutyRate}%</TableCell>
                    <TableCell>{rate.exciseDutyRate}%</TableCell>
                    <TableCell>{rate.vatRate}%</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Processing Fees Tab Component
export function ProcessingFeesTab({ 
  processingFees, 
  isLoading,
  getAuthHeaders 
}: {
  processingFees: ProcessingFee[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading processing fees...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Processing Fees Configuration
          </CardTitle>
          <CardDescription>
            Manage additional processing fees and charges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Fee Name</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Applicable To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processingFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.feeType}</TableCell>
                    <TableCell>{fee.feeName}</TableCell>
                    <TableCell>{fee.rate}%</TableCell>
                    <TableCell>{fee.applicableToImportType}</TableCell>
                    <TableCell>
                      <Badge variant={fee.isActive ? "default" : "secondary"}>
                        {fee.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Category Rules Tab Component
export function CategoryRulesTab({ 
  categoryRules, 
  isLoading,
  getAuthHeaders 
}: {
  categoryRules: VehicleCategoryRule[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading category rules...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Vehicle Category Rules
          </CardTitle>
          <CardDescription>
            Configure automatic vehicle categorization rules based on specifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Min Engine Size</TableHead>
                  <TableHead>Max Engine Size</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Body Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.category}</TableCell>
                    <TableCell>{rule.minEngineSize || "N/A"}</TableCell>
                    <TableCell>{rule.maxEngineSize || "N/A"}</TableCell>
                    <TableCell>{rule.fuelType || "Any"}</TableCell>
                    <TableCell>{rule.bodyType || "Any"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Depreciation Rates Tab Component
export function DepreciationRatesTab({ 
  depreciationRates, 
  isLoading,
  getAuthHeaders 
}: {
  depreciationRates: DepreciationRate[];
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
}) {
  if (isLoading) {
    return <div className="p-4">Loading depreciation rates...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Depreciation Rates Configuration
          </CardTitle>
          <CardDescription>
            Manage age-based depreciation rates for different import types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Import Type</TableHead>
                  <TableHead>Age Range</TableHead>
                  <TableHead>Depreciation Rate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depreciationRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.importType}</TableCell>
                    <TableCell>
                      {rate.minAge} - {rate.maxAge} years
                    </TableCell>
                    <TableCell>{rate.depreciationRate}%</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}