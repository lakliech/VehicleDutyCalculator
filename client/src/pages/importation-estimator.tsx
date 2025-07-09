import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, Wrench } from "lucide-react";

export default function ImportationEstimator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Importation Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive cost estimates for importing your vehicle to Kenya, 
            including shipping, clearing, and documentation fees.
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
                <Car className="h-5 w-5 text-purple-600" />
                <span>Shipping Costs</span>
              </CardTitle>
              <CardDescription>
                Calculate shipping costs from various origins including Japan, UK, UAE, and South Africa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Ocean freight rates</li>
                <li>• Port handling charges</li>
                <li>• Container fees</li>
                <li>• Insurance costs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-purple-600" />
                <span>Clearing & Documentation</span>
              </CardTitle>
              <CardDescription>
                Estimate clearing agent fees and required documentation costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Clearing agent fees</li>
                <li>• KEBS inspection</li>
                <li>• PVOC certificate</li>
                <li>• Port storage fees</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-purple-600" />
                <span>Local Registration</span>
              </CardTitle>
              <CardDescription>
                Calculate costs for registering your imported vehicle in Kenya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Number plate fees</li>
                <li>• Logbook charges</li>
                <li>• Motor vehicle inspection</li>
                <li>• Third party insurance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Comprehensive Import Planning
            </h3>
            <p className="text-gray-600 mb-6">
              This tool will provide end-to-end cost estimation for vehicle importation, 
              helping you budget accurately for your import project.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>Expected Launch: Q2 2025</span>
              <span>•</span>
              <span>Contact: 0736 272719</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}