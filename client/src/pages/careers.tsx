import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Heart, 
  Coffee, 
  MapPin, 
  Clock,
  DollarSign,
  Zap
} from "lucide-react";

const jobOpenings = [
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "KES 80,000 - 150,000",
    description: "Build and maintain our React/Node.js platform with PostgreSQL. Experience with TypeScript, Drizzle ORM, and modern web technologies required.",
    requirements: [
      "3+ years React/Node.js experience",
      "TypeScript proficiency",
      "Database design experience",
      "REST API development",
      "Git version control"
    ]
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "Nairobi, Kenya / Remote",
    type: "Full-time",
    salary: "KES 70,000 - 120,000",
    description: "Drive growth and user acquisition for Kenya's automotive marketplace. Lead marketing campaigns, partnerships, and brand development.",
    requirements: [
      "3+ years marketing experience",
      "Digital marketing expertise",
      "Automotive industry knowledge preferred",
      "Content creation skills",
      "Analytics and data-driven mindset"
    ]
  },
  {
    title: "Customer Success Representative",
    department: "Customer Support",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "KES 45,000 - 70,000",
    description: "Help customers navigate our platform, resolve issues, and ensure excellent user experience. Automotive knowledge is a plus.",
    requirements: [
      "2+ years customer service experience",
      "Excellent communication skills",
      "Problem-solving abilities",
      "Basic technical troubleshooting",
      "Swahili and English fluency"
    ]
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "KES 60,000 - 100,000",
    description: "Analyze market trends, user behavior, and platform performance. Create insights that drive business decisions.",
    requirements: [
      "Statistics or Data Science background",
      "SQL and Python/R proficiency",
      "Data visualization tools (Tableau, PowerBI)",
      "Experience with automotive data preferred",
      "Business intelligence mindset"
    ]
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive medical coverage for you and your family"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear advancement paths and professional development opportunities"
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    description: "Hybrid work model with flexible hours and remote options"
  },
  {
    icon: DollarSign,
    title: "Competitive Salary",
    description: "Market-leading compensation with performance bonuses"
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work with passionate professionals in a collaborative environment"
  },
  {
    icon: Zap,
    title: "Latest Tech",
    description: "Work with cutting-edge technology and modern development tools"
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Help us revolutionize Kenya's automotive industry. Build the future of car buying, selling, and importing with cutting-edge technology.
          </p>
          <Badge variant="secondary" className="text-purple-700 bg-purple-100">
            Now Hiring
          </Badge>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Work at Gariyangu?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a fast-growing startup that's transforming how Kenyans interact with the automotive market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Code className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cutting-Edge Tech</h3>
            <p className="text-gray-600">
              Work with modern technologies including React, TypeScript, PostgreSQL, and AI integration.
            </p>
          </div>
          
          <div className="text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">High Impact</h3>
            <p className="text-gray-600">
              Your work directly impacts thousands of Kenyans making important automotive decisions.
            </p>
          </div>
          
          <div className="text-center">
            <Briefcase className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Growth Opportunity</h3>
            <p className="text-gray-600">
              Join a startup at the ground floor with excellent opportunities for career advancement.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Benefits & Perks</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader className="text-center pb-4">
                <benefit.icon className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next career opportunity with us.
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <Badge variant="outline">{job.department}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-purple-600 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <Button 
                        className="w-full mb-3"
                        onClick={() => window.open(`mailto:careers@gariyangu.com?subject=Application for ${job.title}&body=Hello, I'm interested in applying for the ${job.title} position.`, '_blank')}
                      >
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(`https://wa.me/254736272719?text=Hi, I'm interested in the ${job.title} position. Can we discuss?`, '_blank')}
                      >
                        WhatsApp Us
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Hiring Process</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-purple-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Apply</h3>
            <p className="text-sm text-gray-600">Submit your application via email or WhatsApp</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">Phone Screen</h3>
            <p className="text-sm text-gray-600">Initial conversation about your background and interests</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Interview</h3>
            <p className="text-sm text-gray-600">In-depth discussion about skills and cultural fit</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-purple-600">4</span>
            </div>
            <h3 className="font-semibold mb-2">Welcome</h3>
            <p className="text-sm text-gray-600">Join the team and start making an impact</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Don't see a perfect fit? We're always looking for talented people to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => window.open('mailto:careers@gariyangu.com?subject=General Interest&body=Hello, I\'m interested in opportunities at Gariyangu.', '_blank')}
            >
              Send Us Your CV
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => window.open('https://wa.me/254736272719?text=Hi, I\'d like to learn about career opportunities at Gariyangu', '_blank')}
            >
              Chat with Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}