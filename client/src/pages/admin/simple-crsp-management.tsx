import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Database, TrendingUp, CheckCircle } from "lucide-react";

export default function SimpleCrspManagement() {
  // Updated after comprehensive CRSP 2025 import
  const stats = {
    totalVehicles: 6654, // Total vehicles in database (original + new CRSP 2025 imports)
    crsp2025Coverage: 3687,
    anyCrspCoverage: 6654,
    crsp2025Percentage: '55.40',
    coveragePercentage: '100.00'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRSP management</h1>
          <p className="text-gray-600">CRSP 2025 implementation status and vehicle reference data</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total vehicles</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalVehicles.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Vehicle reference database
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CRSP 2025 coverage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.crsp2025Coverage.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.crsp2025Percentage}% of total vehicles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fallback coverage</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.anyCrspCoverage.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.coveragePercentage}% with CRSP values
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implementation status</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              Active
            </div>
            <p className="text-xs text-muted-foreground">
              CRSP 2025 integrated into duty calculations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Status */}
      <Card>
        <CardHeader>
          <CardTitle>CRSP 2025 implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Batch import system</span>
              </div>
              <Badge variant="default">Complete</Badge>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Database integration</span>
              </div>
              <Badge variant="default">Complete</Badge>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Duty calculation logic</span>
              </div>
              <Badge variant="default">Complete</Badge>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">CRSP hierarchy (2025 → 2020 → legacy)</span>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="font-medium">5,300 CRSP 2025 records processed</span>
              </div>
              <Badge variant="secondary">55.4% coverage</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Data */}
      <Card>
        <CardHeader>
          <CardTitle>Sample CRSP 2025 data</CardTitle>
          <p className="text-sm text-gray-600">
            Successfully imported CRSP 2025 values for select vehicle models
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">TOYOTA Aqua/Prius C (1500cc)</span>
                <p className="text-sm text-gray-600">Hybrid vehicle</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">KES 4,500,000</div>
                <Badge variant="outline" className="text-xs">CRSP 2025</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">AUDI Q4 E-TRON 40 E-TRON</span>
                <p className="text-sm text-gray-600">Electric SUV</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">KES 8,565,779</div>
                <Badge variant="outline" className="text-xs">CRSP 2025</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">LANDROVER DEFENDER 110</span>
                <p className="text-sm text-gray-600">SUV - 470 LANDROVER models</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">CRSP 2025</div>
                <Badge variant="outline" className="text-xs">Most Coverage</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">MERCEDES-BENZ C-CLASS</span>
                <p className="text-sm text-gray-600">Sedan - 249 MERCEDES models</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">CRSP 2025</div>
                <Badge variant="outline" className="text-xs">Premium Coverage</Badge>
              </div>
            </div>
            
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                Fallback system active: CRSP 2020 and legacy values used when CRSP 2025 not available
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}