import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, Building, MapPin, Phone, Mail, Star, CheckCircle, 
  XCircle, Clock, AlertTriangle, Search, Filter, Eye, Edit,
  Users, TrendingUp, Calendar, Award
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { DealerProfile } from "@shared/schema";

interface DealerData extends DealerProfile {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string | null;
  };
}

export default function AdminDealers() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDealer, setSelectedDealer] = useState<DealerData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch dealer profiles
  const { data: dealers = [], isLoading } = useQuery<DealerData[]>({
    queryKey: ["/api/dealers/admin/profiles", { status: selectedTab === "all" ? "" : selectedTab }],
  });

  // Update dealer status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ profileId, status, verificationBadge, listingLimit, packageType, adminNotes }: {
      profileId: number;
      status: string;
      verificationBadge?: string;
      listingLimit?: number;
      packageType?: string;
      adminNotes?: string;
    }) => {
      return apiRequest("PATCH", `/api/dealers/admin/profiles/${profileId}/status`, {
        status,
        verificationBadge,
        listingLimit,
        packageType,
        adminNotes
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dealers/admin/profiles"] });
      toast({
        title: "Success",
        description: "Dealer status updated successfully",
      });
      setIsDetailsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update dealer status",
        variant: "destructive",
      });
    },
  });

  const filteredDealers = dealers.filter(dealer => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      dealer.dealerName.toLowerCase().includes(searchLower) ||
      dealer.businessLocation.toLowerCase().includes(searchLower) ||
      dealer.user.email.toLowerCase().includes(searchLower) ||
      `${dealer.user.firstName} ${dealer.user.lastName}`.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case "suspended":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200"><AlertTriangle className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (dealer: DealerData) => {
    updateStatusMutation.mutate({
      profileId: dealer.id,
      status: "approved",
      verificationBadge: "verified-dealer",
      listingLimit: 50,
      packageType: "premium"
    });
  };

  const handleReject = (dealer: DealerData) => {
    updateStatusMutation.mutate({
      profileId: dealer.id,
      status: "rejected",
      adminNotes: "Application does not meet requirements"
    });
  };

  const DealerDetailsDialog = ({ dealer }: { dealer: DealerData }) => (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dealer Profile Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={dealer.logoUrl || dealer.user.profileImageUrl || ""} />
                    <AvatarFallback>{dealer.dealerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{dealer.dealerName}</h3>
                    <p className="text-gray-600">{dealer.user.firstName} {dealer.user.lastName}</p>
                    <p className="text-sm text-gray-500">{dealer.user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{dealer.businessLocation}</span>
                  </div>
                  
                  {dealer.phoneNumbers && dealer.phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{phone}</span>
                    </div>
                  ))}
                  
                  {dealer.emailAddress && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{dealer.emailAddress}</span>
                    </div>
                  )}
                  
                  {dealer.yearsInBusiness && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{dealer.yearsInBusiness} years in business</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={dealer.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {dealer.isVerified && (
                  <div>
                    <Label htmlFor="badge">Verification Badge</Label>
                    <Select defaultValue={dealer.verificationBadge || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select badge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verified-dealer">Verified Dealer</SelectItem>
                        <SelectItem value="premium-dealer">Premium Dealer</SelectItem>
                        <SelectItem value="gold-dealer">Gold Dealer</SelectItem>
                        <SelectItem value="certified-dealer">Certified Dealer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="listingLimit">Listing Limit</Label>
                  <Input 
                    type="number" 
                    defaultValue={dealer.listingLimit || 5}
                    placeholder="Number of allowed listings"
                  />
                </div>

                <div>
                  <Label htmlFor="package">Package Type</Label>
                  <Select defaultValue={dealer.packageType || "basic"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Details */}
          {dealer.dealerBio && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{dealer.dealerBio}</p>
              </CardContent>
            </Card>
          )}

          {/* Specialties & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealer.specialties && dealer.specialties.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dealer.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {dealer.servicesOffered && dealer.servicesOffered.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {dealer.servicesOffered.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Add admin notes about this dealer..."
                defaultValue={dealer.adminNotes || ""}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              className="flex-1" 
              onClick={() => handleApprove(dealer)}
              disabled={dealer.status === "approved"}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Dealer
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => handleReject(dealer)}
              disabled={dealer.status === "rejected"}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dealer Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const stats = {
    total: dealers.length,
    pending: dealers.filter(d => d.status === "pending").length,
    approved: dealers.filter(d => d.status === "approved").length,
    rejected: dealers.filter(d => d.status === "rejected").length,
    suspended: dealers.filter(d => d.status === "suspended").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dealer Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search dealers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Dealers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{stats.suspended}</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          <TabsTrigger value="suspended">Suspended ({stats.suspended})</TabsTrigger>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {filteredDealers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Dealers Found</h3>
                <p className="text-gray-600">
                  {searchTerm ? "No dealers match your search criteria." : `No dealers with ${selectedTab} status.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDealers.map((dealer) => (
                <Card key={dealer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={dealer.logoUrl || dealer.user?.profileImageUrl || ""} />
                        <AvatarFallback>{dealer.dealerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg truncate">{dealer.dealerName}</h3>
                        <p className="text-sm text-gray-600">{dealer.user?.firstName} {dealer.user?.lastName}</p>
                        <p className="text-xs text-gray-500 truncate">{dealer.user?.email || 'No email available'}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm truncate">{dealer.businessLocation}</span>
                      </div>
                      
                      {dealer.yearsInBusiness && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{dealer.yearsInBusiness} years</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      {getStatusBadge(dealer.status)}
                      {dealer.isVerified && (
                        <Badge variant="outline" className="border-green-200 text-green-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedDealer(dealer);
                          setIsDetailsOpen(true);
                        }}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      
                      {dealer.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(dealer)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(dealer)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dealer Details Dialog */}
      {selectedDealer && <DealerDetailsDialog dealer={selectedDealer} />}
    </div>
  );
}