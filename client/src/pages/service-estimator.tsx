import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, Settings, Banknote } from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";

export default function ServiceEstimator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Service Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get accurate estimates for vehicle maintenance and service costs based on 
            make, model, and local market rates in Kenya.
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
                <Wrench className="h-5 w-5 text-purple-600" />
                <span>Routine Maintenance</span>
              </CardTitle>
              <CardDescription>
                Estimate costs for regular service intervals and maintenance schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Oil change services</li>
                <li>• Brake pad replacement</li>
                <li>• Tire rotation & alignment</li>
                <li>• Filter replacements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-600" />
                <span>Major Repairs</span>
              </CardTitle>
              <CardDescription>
                Calculate costs for major component repairs and replacements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Engine overhaul</li>
                <li>• Transmission service</li>
                <li>• Suspension repairs</li>
                <li>• Electrical diagnostics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Banknote className="h-5 w-5 text-purple-600" />
                <span>Parts & Labor</span>
              </CardTitle>
              <CardDescription>
                Get detailed breakdown of parts costs and labor rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• OEM vs aftermarket parts</li>
                <li>• Local garage rates</li>
                <li>• Authorized dealer pricing</li>
                <li>• DIY cost savings</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Service Planning Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Maintenance Scheduling</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Mileage-based service intervals</li>
                  <li>• Time-based maintenance reminders</li>
                  <li>• Seasonal service recommendations</li>
                  <li>• Warranty requirement tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cost Optimization</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Compare service provider rates</li>
                  <li>• Bulk service discounts</li>
                  <li>• Parts sourcing options</li>
                  <li>• Budget planning tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">
              Smart Service Management
            </h3>
            <p className="text-purple-100 mb-4">
              Take control of your vehicle maintenance costs with data-driven estimates 
              and smart scheduling recommendations.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-purple-200">
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