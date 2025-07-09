import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, Percent, CheckCircle } from "lucide-react";

export default function VehicleLoans() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Loan Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive vehicle financing options from leading banks and financial institutions in Kenya.
          </p>
          <Badge variant="secondary" className="mt-4 bg-orange-100 text-orange-800">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                <span>Bank Loans</span>
              </CardTitle>
              <CardDescription>
                Compare vehicle loan products from major Kenyan banks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• KCB Bank vehicle loans</li>
                <li>• Equity Bank auto financing</li>
                <li>• Cooperative Bank car loans</li>
                <li>• NCBA Bank vehicle finance</li>
                <li>• Standard Chartered auto loans</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Percent className="h-5 w-5 text-purple-600" />
                <span>Interest Rates</span>
              </CardTitle>
              <CardDescription>
                Current interest rates and loan terms comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time rate updates</li>
                <li>• Flexible repayment periods</li>
                <li>• Down payment options</li>
                <li>• Processing fee structures</li>
                <li>• Early repayment benefits</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span>Loan Calculator</span>
              </CardTitle>
              <CardDescription>
                Calculate monthly payments and total loan costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Monthly payment calculator</li>
                <li>• Total interest calculation</li>
                <li>• Loan eligibility checker</li>
                <li>• Amortization schedules</li>
                <li>• Affordability assessment</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
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
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-purple-200 text-sm">Partner Banks</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8.5%</div>
                <div className="text-purple-200 text-sm">Starting Interest Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">7 Years</div>
                <div className="text-purple-200 text-sm">Maximum Loan Term</div>
              </div>
            </div>
            <div className="text-center mt-6 text-purple-200 text-sm">Expected Launch: Q2 2025 • Place your financial products here; Contact: 0736 272719</div>
          </div>
        </div>
      </div>
    </div>
  );
}