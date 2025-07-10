import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { ModuleNavigation } from "@/components/module-navigation";

export default function MyCarsWorth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MyCar's Worth
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get accurate market valuation for your vehicle based on current Kenya market conditions, 
            age, mileage, and condition assessment.
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
                <DollarSign className="h-5 w-5 text-purple-600" />
                <span>Market Valuation</span>
              </CardTitle>
              <CardDescription>
                Real-time market value assessment based on current Kenya market data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Current market price analysis</li>
                <li>• Depreciation calculations</li>
                <li>• Regional price variations</li>
                <li>• Condition-based adjustments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Price Trends</span>
              </CardTitle>
              <CardDescription>
                Historical price trends and future value predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 12-month price history</li>
                <li>• Market trend analysis</li>
                <li>• Seasonal variations</li>
                <li>• Future value projections</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Comparative Analysis</span>
              </CardTitle>
              <CardDescription>
                Compare your vehicle value with similar models in the market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Similar vehicle comparisons</li>
                <li>• Market positioning</li>
                <li>• Competitive pricing insights</li>
                <li>• Best selling price recommendations</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Valuation Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Vehicle Characteristics</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Make, model, and year</li>
                  <li>• Engine capacity and fuel type</li>
                  <li>• Transmission type</li>
                  <li>• Body style and features</li>
                  <li>• Mileage and service history</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Market Conditions</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Current supply and demand</li>
                  <li>• Economic factors</li>
                  <li>• Import duty changes</li>
                  <li>• Currency fluctuations</li>
                  <li>• Government policies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Accurate Vehicle Valuation
            </h3>
            <p className="text-purple-100 mb-6">
              Get precise market value estimates for buying, selling, or insurance purposes. 
              Our valuation considers all factors affecting your vehicle's worth in Kenya.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">5000+</div>
                <div className="text-purple-200 text-sm">Vehicles Valued</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-purple-200 text-sm">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-purple-200 text-sm">Online Access</div>
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