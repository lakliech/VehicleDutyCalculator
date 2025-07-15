import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Calendar,
  DollarSign,
  Car,
  Building,
  Phone,
  Mail
} from 'lucide-react';

interface LoanApplication {
  id: number;
  applicationNumber: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'withdrawn';
  submittedAt: string;
  reviewedAt?: string;
  preApprovalAmount?: string;
  approvedInterestRate?: string;
  approvedTenureMonths?: number;
  remarks?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehiclePrice?: string;
  requestedAmount: string;
  downPaymentAmount: string;
  preferredTenureMonths: number;
  productName: string;
  bankName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
}

export default function LoanApplicationsPage() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Check authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery({
    queryKey: ['/api/auth/status'],
    refetchOnWindowFocus: true,
  });

  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['/api/loan-applications'],
    enabled: !!authStatus?.authenticated,
    retry: 2
  });

  // Redirect if not authenticated
  if (!authLoading && !authStatus?.authenticated) {
    setLocation('/');
    return null;
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'under_review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'withdrawn':
        return 'Withdrawn';
      default:
        return status;
    }
  };

  const filteredApplications = applications?.filter((app: LoanApplication) => {
    const matchesSearch = app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (app.vehicleMake && app.vehicleMake.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your loan applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load loan applications. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                My Loan Applications
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track and manage your vehicle loan applications
              </p>
            </div>
            <Button 
              onClick={() => setLocation('/buy-a-car')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Car className="h-4 w-4 mr-2" />
              Browse Vehicles
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by application number, product, bank, or vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {applications?.length === 0 ? 'No loan applications yet' : 'No applications match your filters'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {applications?.length === 0 
                  ? 'Start by browsing our vehicle listings and apply for financing'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              {applications?.length === 0 && (
                <Button 
                  onClick={() => setLocation('/buy-a-car')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Browse Vehicles
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((application: LoanApplication) => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center text-lg">
                        <FileText className="h-5 w-5 mr-2 text-purple-600" />
                        Application #{application.applicationNumber}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Submitted {new Date(application.submittedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`flex items-center gap-1 ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {getStatusText(application.status)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Vehicle Information */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <Car className="h-4 w-4 mr-1" />
                        Vehicle Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        {application.vehicleMake && application.vehicleModel ? (
                          <>
                            <p><span className="text-gray-600 dark:text-gray-400">Vehicle:</span> {application.vehicleMake} {application.vehicleModel}</p>
                            <p><span className="text-gray-600 dark:text-gray-400">Year:</span> {application.vehicleYear}</p>
                            <p><span className="text-gray-600 dark:text-gray-400">Price:</span> KES {parseFloat(application.vehiclePrice || '0').toLocaleString()}</p>
                          </>
                        ) : (
                          <p className="text-gray-500">General loan application</p>
                        )}
                      </div>
                    </div>

                    {/* Loan Information */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Loan Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600 dark:text-gray-400">Requested:</span> KES {parseFloat(application.requestedAmount).toLocaleString()}</p>
                        <p><span className="text-gray-600 dark:text-gray-400">Down Payment:</span> KES {parseFloat(application.downPaymentAmount).toLocaleString()}</p>
                        <p><span className="text-gray-600 dark:text-gray-400">Tenure:</span> {application.preferredTenureMonths} months</p>
                        {application.preApprovalAmount && (
                          <p><span className="text-gray-600 dark:text-gray-400">Pre-approved:</span> KES {parseFloat(application.preApprovalAmount).toLocaleString()}</p>
                        )}
                      </div>
                    </div>

                    {/* Bank Information */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        Lender Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600 dark:text-gray-400">Bank:</span> {application.bankName}</p>
                        <p><span className="text-gray-600 dark:text-gray-400">Product:</span> {application.productName}</p>
                        {application.approvedInterestRate && (
                          <p><span className="text-gray-600 dark:text-gray-400">Interest Rate:</span> {application.approvedInterestRate}%</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status-specific information */}
                  {application.status === 'approved' && application.preApprovalAmount && (
                    <>
                      <Separator className="my-4" />
                      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          <strong>Congratulations!</strong> Your loan has been approved for KES {parseFloat(application.preApprovalAmount).toLocaleString()}
                          {application.approvedInterestRate && ` at ${application.approvedInterestRate}% interest rate`}
                          {application.approvedTenureMonths && ` for ${application.approvedTenureMonths} months`}.
                          Please contact the bank to proceed with the next steps.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  {application.status === 'rejected' && application.remarks && (
                    <>
                      <Separator className="my-4" />
                      <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800 dark:text-red-200">
                          <strong>Application Status:</strong> {application.remarks}
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  {application.status === 'under_review' && (
                    <>
                      <Separator className="my-4" />
                      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800 dark:text-blue-200">
                          Your application is currently under review. We'll contact you within 2-3 business days with an update.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  {/* Contact Information */}
                  <Separator className="my-4" />
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {application.applicantEmail}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {application.applicantPhone}
                    </div>
                    {application.reviewedAt && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Reviewed {new Date(application.reviewedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Statistics */}
        {applications && applications.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Application Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {applications.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {applications.filter((app: LoanApplication) => app.status === 'pending' || app.status === 'under_review').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Under Review</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {applications.filter((app: LoanApplication) => app.status === 'approved').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {applications.filter((app: LoanApplication) => app.status === 'rejected').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}