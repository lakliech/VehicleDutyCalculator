import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolCard } from "@/components/home/tool-card";
import { ContactSection } from "@/components/home/contact-section";
import { StatsSection } from "@/components/home/stats-section";
import { toolsData } from "@/components/home/tools-data";
import { useOAuthHandler } from "@/components/home/oauth-handler";
import { useAuth } from "@/components/auth-provider";

export default function Home() {
  const { user } = useAuth();
  
  // Handle OAuth success/error messages
  useOAuthHandler();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">
            Kenya's Car Marketplace
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your complete automotive solution hub - from import calculations to marketplace services
          </p>
        </div>

        {/* Contact Section */}
        <div className="mb-12">
          <ContactSection />
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Tools Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Automotive Tools & Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsData.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Accurate Calculations</CardTitle>
              <CardDescription>
                Using official KRA rates and CRSP values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our calculators use the latest Kenya Revenue Authority rates and 
                official CRSP vehicle valuations to give you accurate import duty 
                and tax calculations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trusted Marketplace</CardTitle>
              <CardDescription>
                Buy and sell with confidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our verified marketplace connects genuine buyers and sellers. 
                All listings are reviewed for quality and authenticity before 
                being published.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expert Support</CardTitle>
              <CardDescription>
                Professional assistance available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get help from automotive experts for imports, valuations, and 
                transactions. We're here to make your car journey smooth and 
                hassle-free.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}