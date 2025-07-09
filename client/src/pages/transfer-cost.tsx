import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Users, CreditCard } from "lucide-react";

export default function TransferCost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Transfer Cost Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate all costs involved in transferring vehicle ownership in Kenya, 
            including government fees, documentation, and processing charges.
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
                <FileText className="h-5 w-5 text-purple-600" />
                <span>Government Fees</span>
              </CardTitle>
              <CardDescription>
                Official KRA and NTSA charges for vehicle ownership transfer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Transfer tax (2% of market value)</li>
                <li>• Registration transfer fee</li>
                <li>• Number plate retention/change</li>
                <li>• Inspection certificate</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Legal & Documentation</span>
              </CardTitle>
              <CardDescription>
                Legal documentation and processing costs for ownership transfer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Sale agreement drafting</li>
                <li>• Advocate fees</li>
                <li>• Notarization costs</li>
                <li>• Document processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                <span>Additional Costs</span>
              </CardTitle>
              <CardDescription>
                Other associated costs that may apply during transfer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Insurance transfer/new policy</li>
                <li>• Outstanding fines clearance</li>
                <li>• Hire purchase clearance</li>
                <li>• Vehicle valuation fees</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Transfer Process Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Required Documents</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Original logbook (V3)</li>
                  <li>• Sale agreement</li>
                  <li>• ID copies (buyer & seller)</li>
                  <li>• Insurance certificate</li>
                  <li>• Inspection certificate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Transfer Timeline</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Document preparation: 1-2 days</li>
                  <li>• KRA tax clearance: 1 day</li>
                  <li>• NTSA processing: 2-3 days</li>
                  <li>• New logbook issuance: 3-5 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Seamless Ownership Transfer
              </h3>
              <p className="text-purple-100">
                Navigate the vehicle transfer process with confidence using our comprehensive cost calculator and step-by-step guidance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">2%</div>
                <div className="text-purple-200 text-sm">Transfer Tax Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">7-10</div>
                <div className="text-purple-200 text-sm">Days Processing Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-purple-200 text-sm">Legal Compliance</div>
              </div>
            </div>
            <div className="text-center mt-6 text-purple-200 text-sm">
              Expected Launch: Q2 2025 • Contact: 0736 272719
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}