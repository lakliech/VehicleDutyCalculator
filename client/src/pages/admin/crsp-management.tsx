import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, TrendingUp, Database, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CrspVehicle {
  id: number;
  make: string;
  model: string;
  engineCapacity: number | null;
  fuelType: string | null;
  bodyType: string | null;
  crsp_2025: number | null;
  crspKes: number | null;
  crsp2020: number | null;
}

interface CrspStats {
  totalVehicles: number;
  crsp2025Coverage: number;
  anyCrspCoverage: number;
  crsp2025Percentage: string;
  coveragePercentage: string;
}

export default function CrspManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  // Fetch CRSP statistics
  const { data: stats, isLoading: statsLoading } = useQuery<CrspStats>({
    queryKey: ['/api/crsp/stats'],
  });

  // Fetch vehicles with CRSP 2025 values
  const { data: vehiclesData, isLoading: vehiclesLoading, refetch } = useQuery({
    queryKey: ['/api/crsp/vehicles-with-2025', { 
      page: currentPage, 
      search: searchTerm,
      make: selectedMake 
    }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedMake !== 'all' && { make: selectedMake })
      });
      
      const response = await apiRequest("GET", `/api/crsp/vehicles-with-2025?${params}`);
      return response.json();
    },
  });

  // Get unique makes for filter
  const { data: makes } = useQuery({
    queryKey: ['/api/vehicle-references/makes'],
  });

  const handleSearch = () => {
    setCurrentPage(1);
    refetch();
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return `KES ${amount.toLocaleString('en-KE')}`;
  };

  const getCrspSource = (vehicle: CrspVehicle) => {
    if (vehicle.crsp_2025) return { source: 'CRSP 2025', value: vehicle.crsp_2025, variant: 'default' as const };
    if (vehicle.crspKes) return { source: 'Current', value: vehicle.crspKes, variant: 'secondary' as const };
    if (vehicle.crsp2020) return { source: 'CRSP 2020', value: vehicle.crsp2020, variant: 'outline' as const };
    return { source: 'None', value: 0, variant: 'destructive' as const };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRSP management</h1>
          <p className="text-gray-600">Manage CRSP 2025 values for vehicle references</p>
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
              {statsLoading ? '...' : stats?.totalVehicles?.toLocaleString() || '0'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CRSP 2025 coverage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.crsp2025Coverage?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {statsLoading ? '...' : `${stats?.crsp2025Percentage || '0'}% coverage`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Any CRSP coverage</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.anyCrspCoverage?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {statsLoading ? '...' : `${stats?.coveragePercentage || '0'}% coverage`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Import progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {statsLoading ? '...' : `${stats?.crsp2025Percentage || '0'}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              CRSP 2025 implementation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search vehicles with CRSP 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by make or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div className="w-48">
              <label className="text-sm font-medium text-gray-700">Make</label>
              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger>
                  <SelectValue placeholder="All makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All makes</SelectItem>
                  {makes?.map((make: string) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicles with CRSP 2025 values</CardTitle>
          <p className="text-sm text-gray-600">
            {vehiclesData?.pagination ? 
              `Showing ${((vehiclesData.pagination.page - 1) * 20) + 1}-${Math.min(vehiclesData.pagination.page * 20, vehiclesData.pagination.total)} of ${vehiclesData.pagination.total} vehicles` 
              : 'Loading...'
            }
          </p>
        </CardHeader>
        <CardContent>
          {vehiclesLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Make</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Engine</TableHead>
                    <TableHead>Fuel type</TableHead>
                    <TableHead>CRSP 2025</TableHead>
                    <TableHead>Current CRSP</TableHead>
                    <TableHead>CRSP 2020</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehiclesData?.vehicles?.map((vehicle: CrspVehicle) => {
                    const crspInfo = getCrspSource(vehicle);
                    return (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.make}</TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>
                          {vehicle.engineCapacity ? `${vehicle.engineCapacity}cc` : 'N/A'}
                        </TableCell>
                        <TableCell>{vehicle.fuelType || 'N/A'}</TableCell>
                        <TableCell>
                          <span className={vehicle.crsp_2025 ? 'text-green-600 font-medium' : 'text-gray-400'}>
                            {formatCurrency(vehicle.crsp_2025)}
                          </span>
                        </TableCell>
                        <TableCell>{formatCurrency(vehicle.crspKes)}</TableCell>
                        <TableCell>{formatCurrency(vehicle.crsp2020)}</TableCell>
                        <TableCell>
                          <Badge variant={crspInfo.variant}>
                            {crspInfo.source}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {vehiclesData?.pagination && vehiclesData.pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Page {currentPage} of {vehiclesData.pagination.pages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(vehiclesData.pagination.pages, prev + 1))}
                    disabled={currentPage === vehiclesData.pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}