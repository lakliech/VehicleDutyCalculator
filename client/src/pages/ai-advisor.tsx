import { useState } from "react";
import { ModuleNavigation } from "@/components/module-navigation";
import { VehicleChatbot } from "@/components/vehicle-chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, MessageCircle, TrendingUp } from "lucide-react";

export default function AIAdvisor() {
  const [selectedVehicle, setSelectedVehicle] = useState<{make: string, model: string} | null>(null);

  const handleVehicleSelect = (make: string, model: string) => {
    setSelectedVehicle({ make, model });
    // You could redirect to duty calculator or another page with this selection
    console.log(`Selected vehicle: ${make} ${model}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="h-8 w-8" />
            <h1 className="text-3xl font-bold">AI Vehicle Advisor</h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by AI
            </Badge>
          </div>
          <p className="text-purple-100 text-lg max-w-2xl">
            Get personalized vehicle recommendations based on your budget, needs, and preferences. 
            Our AI advisor uses real market data to suggest the perfect vehicle for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chatbot Area */}
          <div className="lg:col-span-2">
            <VehicleChatbot onVehicleSelect={handleVehicleSelect} />
          </div>

          {/* Sidebar with Features and Tips */}
          <div className="space-y-6">
            {/* Selected Vehicle */}
            {selectedVehicle && (
              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
                    <MessageCircle className="h-5 w-5" />
                    Selected Vehicle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900">
                      {selectedVehicle.make} {selectedVehicle.model}
                    </h3>
                    <p className="text-sm text-purple-700 mt-1">
                      Ready to calculate import duties or transfer costs
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
                  <Sparkles className="h-5 w-5" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Real Market Data</h4>
                    <p className="text-sm text-gray-600">
                      Recommendations based on current CRSP values and market trends
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Smart Matching</h4>
                    <p className="text-sm text-gray-600">
                      AI considers your budget, family size, and intended use
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Conversational</h4>
                    <p className="text-sm text-gray-600">
                      Natural chat interface with context awareness
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-800">Tips for Better Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">📝 Be specific about your needs:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 ml-4">
                    <li>Your budget range</li>
                    <li>Family size and seating needs</li>
                    <li>Primary use (city, highway, off-road)</li>
                    <li>Fuel preference</li>
                  </ul>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">💡 Ask about:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 ml-4">
                    <li>Maintenance costs</li>
                    <li>Resale value</li>
                    <li>Import duties and taxes</li>
                    <li>Alternative options</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Module Navigation */}
            <ModuleNavigation currentModule="AI Vehicle Advisor" />
          </div>
        </div>
      </div>
    </div>
  );
}