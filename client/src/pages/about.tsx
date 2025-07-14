import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Shield, TrendingUp, Globe, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Gariyangu
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kenya's leading automotive marketplace platform, revolutionizing how people buy, sell, and manage vehicles with cutting-edge technology and official government integration.
          </p>
          <Badge variant="secondary" className="text-purple-700 bg-purple-100">
            Established 2025
          </Badge>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <TrendingUp className="mr-3 h-6 w-6 text-purple-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To simplify and modernize Kenya's automotive industry through innovative digital solutions, 
                providing transparent pricing, official government calculations, and seamless marketplace experiences 
                that empower both buyers and sellers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Globe className="mr-3 h-6 w-6 text-purple-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To become East Africa's premier automotive technology platform, setting the standard for 
                vehicle transactions, import calculations, and market intelligence while fostering trust 
                and transparency in every interaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine official government data with modern technology to provide accurate, reliable automotive services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Official KRA Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Real-time import duty calculations using official Kenya Revenue Authority rates and formulas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Car className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Comprehensive Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Extensive vehicle database with accurate CRSP values, specifications, and market pricing data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>AI-Powered Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Smart recommendations and personalized vehicle advice powered by advanced AI technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Serving Kenya's automotive community with trusted, accurate, and innovative solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">3,500+</div>
              <div className="text-purple-100">Vehicle Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-purple-100">KRA Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Platform Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-purple-100">Import Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <Award className="mx-auto h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">
              Clear pricing, honest communication, and open processes in everything we do.
            </p>
          </div>
          
          <div className="text-center">
            <Shield className="mx-auto h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reliability</h3>
            <p className="text-gray-600">
              Consistent, accurate results you can depend on for important financial decisions.
            </p>
          </div>
          
          <div className="text-center">
            <TrendingUp className="mx-auto h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Continuous improvement and cutting-edge technology to serve you better.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who trust Gariyangu for their automotive needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore Our Tools
            </a>
            <a
              href="https://wa.me/254736272719?text=Hi, I'd like to learn more about Gariyangu's services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}