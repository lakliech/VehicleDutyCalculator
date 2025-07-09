import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Clock, Camera, Users, MessageSquare, Shield } from "lucide-react";

export default function SellMyCar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sell My Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            List your vehicle on Kenya's most trusted car marketplace. Get maximum exposure 
            to genuine buyers and sell your car quickly at the best price.
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
                <Camera className="h-5 w-5 text-purple-600" />
                <span>Professional Listing</span>
              </CardTitle>
              <CardDescription>
                Create attractive listings with professional photos and detailed descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• High-quality photo uploads</li>
                <li>• Detailed specification forms</li>
                <li>• Condition assessment guide</li>
                <li>• Price recommendation tool</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Wide Reach</span>
              </CardTitle>
              <CardDescription>
                Access thousands of potential buyers across Kenya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Nationwide buyer network</li>
                <li>• Social media promotion</li>
                <li>• Featured listing options</li>
                <li>• Search engine optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <span>Easy Communication</span>
              </CardTitle>
              <CardDescription>
                Seamless communication tools for buyer-seller interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Integrated messaging system</li>
                <li>• WhatsApp integration</li>
                <li>• Inquiry management</li>
                <li>• Appointment scheduling</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              How to Sell Your Car
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Create Listing</h4>
                <p className="text-sm text-gray-600">Upload photos and fill in vehicle details</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Set Price</h4>
                <p className="text-sm text-gray-600">Use our valuation tool for competitive pricing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Manage Inquiries</h4>
                <p className="text-sm text-gray-600">Respond to interested buyers and schedule viewings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Complete Sale</h4>
                <p className="text-sm text-gray-600">Finalize the deal with secure transaction support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Trusted Car Selling Platform
              </h3>
              <p className="text-purple-100">
                Join thousands of successful sellers who have found buyers through our platform. 
                Safe, secure, and hassle-free car selling experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-purple-200 text-sm">Cars Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-purple-200 text-sm">Active Buyers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">14 Days</div>
                <div className="text-purple-200 text-sm">Average Sale Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-purple-200 text-sm">Seller Satisfaction</div>
              </div>
            </div>
            <div className="text-center mt-6 text-purple-200 text-sm">
              Expected Launch: Q2 2025 • Contact: 0736 272719
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-800">Safe & Secure Transactions</h3>
              </div>
              <p className="text-green-700 text-center mb-4">
                We prioritize your safety with verified buyers, secure payment options, and transaction protection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-600">
                <div className="text-center">
                  <strong>Verified Buyers</strong><br />
                  All buyers go through identity verification
                </div>
                <div className="text-center">
                  <strong>Secure Payments</strong><br />
                  Multiple secure payment methods available
                </div>
                <div className="text-center">
                  <strong>Transaction Support</strong><br />
                  Expert help throughout the selling process
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}