import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Clock, Percent, CheckCircle, Phone, Globe, Building2, Star, ArrowRight } from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface BankPartner {
  id: number;
  bankName: string;
  bankCode: string;
  logoUrl: string | null;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string | null;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoanProduct {
  id: number;
  bankId: number;
  productName: string;
  productType: string;
  minInterestRate: string;
  maxInterestRate: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  minTenureMonths: number;
  maxTenureMonths: number;
  maxFinancingPercentage: string | null;
  processingFeePercentage: string | null;
  requiresDownPayment: boolean;
  minDownPaymentPercentage: string | null;
  eligibilityRequirements: string[] | null;
  requiredDocuments: string[] | null;
  features: string[] | null;
  isActive: boolean;
  bankName: string;
  bankCode: string;
  bankLogoUrl: string | null;
  bankWebsiteUrl: string | null;
  bankContactPhone: string;
}

const formatCurrency = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toLocaleString();
};

const getProductTypeBadge = (type: string) => {
  switch (type) {
    case 'auto_loan':
      return <Badge variant="default" className="bg-blue-100 text-blue-800">Auto Loan</Badge>;
    case 'asset_finance':
      return <Badge variant="default" className="bg-green-100 text-green-800">Asset Finance</Badge>;
    case 'personal_loan':
      return <Badge variant="default" className="bg-orange-100 text-orange-800">Personal Loan</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
};

export default function VehicleLoans() {
  const [selectedBank, setSelectedBank] = useState<number | null>(null);

  const { data: banks = [], isLoading: banksLoading } = useQuery<BankPartner[]>({
    queryKey: ["/api/bank-partners"],
    queryFn: async () => {
      const response = await fetch("/api/bank-partners");
      if (!response.ok) throw new Error("Failed to fetch bank partners");
      return response.json();
    },
  });

  const { data: loanProducts = [], isLoading: productsLoading } = useQuery<LoanProduct[]>({
    queryKey: ["/api/loan-products"],
    queryFn: async () => {
      const response = await fetch("/api/loan-products");
      if (!response.ok) throw new Error("Failed to fetch loan products");
      return response.json();
    },
  });

  const filteredProducts = selectedBank 
    ? loanProducts.filter(product => product.bankId === selectedBank)
    : loanProducts;

  const isLoading = banksLoading || productsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Loan Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive vehicle financing options from leading banks and financial institutions in Kenya.
          </p>
          {banks.length > 0 && (
            <Badge variant="default" className="mt-4 bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              {banks.length} Partner Banks • {loanProducts.length} Loan Products Available
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : banks.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Bank Partners Available</h3>
            <p className="text-gray-500">Please check back later for vehicle loan products.</p>
          </div>
        ) : (
          <>
            {/* Bank Filter Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partner Banks</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedBank === null ? "default" : "outline"}
                  onClick={() => setSelectedBank(null)}
                  className="mb-2"
                >
                  All Banks ({loanProducts.length} products)
                </Button>
                {banks.map((bank) => {
                  const bankProductCount = loanProducts.filter(p => p.bankId === bank.id).length;
                  return (
                    <Button
                      key={bank.id}
                      variant={selectedBank === bank.id ? "default" : "outline"}
                      onClick={() => setSelectedBank(bank.id)}
                      className="mb-2"
                    >
                      {bank.bankName} ({bankProductCount})
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Loan Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg font-semibold">{product.productName}</CardTitle>
                      {getProductTypeBadge(product.productType)}
                    </div>
                    <CardDescription className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-1" />
                      {product.bankName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {product.description && (
                      <p className="text-sm text-gray-600">{product.description}</p>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interest Rate:</span>
                        <span className="text-sm">
                          {product.minInterestRate === product.maxInterestRate 
                            ? `${product.minInterestRate}%`
                            : `${product.minInterestRate}% - ${product.maxInterestRate}%`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Loan Amount:</span>
                        <span className="text-sm">
                          KES {formatCurrency(product.minLoanAmount)} - {formatCurrency(product.maxLoanAmount)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tenure:</span>
                        <span className="text-sm">
                          {product.minTenureMonths === product.maxTenureMonths 
                            ? `${product.maxTenureMonths} months`
                            : `${product.minTenureMonths} - ${product.maxTenureMonths} months`}
                        </span>
                      </div>

                      {product.processingFeePercentage && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Processing Fee:</span>
                          <span className="text-sm">{product.processingFeePercentage}%</span>
                        </div>
                      )}

                      {product.minDownPaymentPercentage && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Down Payment:</span>
                          <span className="text-sm">Min {product.minDownPaymentPercentage}%</span>
                        </div>
                      )}
                    </div>

                    {product.features && product.features.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              {feature}
                            </li>
                          ))}
                          {product.features.length > 3 && (
                            <li className="text-gray-500">+{product.features.length - 3} more features</li>
                          )}
                        </ul>
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between">
                      {product.bankContactPhone && (
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      )}
                      {product.bankWebsiteUrl && (
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          Website
                        </Button>
                      )}
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Apply Now
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && selectedBank && (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Available</h3>
                <p className="text-gray-500">
                  The selected bank currently has no active loan products.
                </p>
              </div>
            )}
          </>
        )}

        {/* Application Process */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Loan Application Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Pre-Qualification</h4>
                <p className="text-sm text-gray-600">Check eligibility and get pre-approved amount</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Documentation</h4>
                <p className="text-sm text-gray-600">Submit required documents and application</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Approval</h4>
                <p className="text-sm text-gray-600">Get loan approval and terms confirmation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Disbursement</h4>
                <p className="text-sm text-gray-600">Receive funds and complete vehicle purchase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Smart Vehicle Financing
              </h3>
              <p className="text-purple-100">
                Find the best vehicle loan deals with our comprehensive comparison tool and expert guidance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{banks.length}+</div>
                <div className="text-purple-200 text-sm">Partner Banks</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {loanProducts.length > 0 
                    ? `${Math.min(...loanProducts.map(p => parseFloat(p.minInterestRate)))}%`
                    : "8.5%"}
                </div>
                <div className="text-purple-200 text-sm">Starting Interest Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {loanProducts.length > 0 
                    ? `${Math.max(...loanProducts.map(p => p.maxTenureMonths)) / 12} Years`
                    : "7 Years"}
                </div>
                <div className="text-purple-200 text-sm">Maximum Loan Term</div>
              </div>
            </div>
            <div className="text-center mt-6 text-purple-200 text-sm">
              Live Data from Partner Banks • Contact: 0736 272719
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}