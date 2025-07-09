import { Link } from "wouter";
import { Car, DollarSign, Calculator, FileText, Wrench, Search, ShoppingCart, CreditCard, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Popular Tools",
      links: [
        { href: "/duty-calculator", label: "Duty Calculator", icon: <Calculator className="h-4 w-4" /> },
        { href: "/importation-estimator", label: "Import Calculator", icon: <Car className="h-4 w-4" /> },
        { href: "/mycars-worth", label: "MyCar's Worth", icon: <DollarSign className="h-4 w-4" /> },
        { href: "/transfer-cost", label: "Transfer Cost", icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      title: "Marketplace",
      links: [
        { href: "/buy-a-car", label: "Buy a Car", icon: <Search className="h-4 w-4" /> },
        { href: "/sell-my-car", label: "Sell My Car", icon: <ShoppingCart className="h-4 w-4" /> },
        { href: "/vehicle-loans", label: "Vehicle Loans", icon: <CreditCard className="h-4 w-4" /> },
        { href: "/service-estimator", label: "Service Estimates", icon: <Wrench className="h-4 w-4" /> }
      ]
    },
    {
      title: "Contact",
      links: [
        { 
          href: "https://wa.me/254736272719?text=Hi%2C%20I%27m%20interested%20in%20importing%20a%20car.%20Can%20you%20help%20me%3F", 
          label: "WhatsApp: 0736 272719", 
          icon: <Phone className="h-4 w-4" />,
          external: true
        },
        { 
          href: "mailto:info@gariyangu.co.ke", 
          label: "info@gariyangu.co.ke", 
          icon: <Mail className="h-4 w-4" />,
          external: true
        },
        { 
          href: "#", 
          label: "Nairobi, Kenya", 
          icon: <MapPin className="h-4 w-4" /> 
        }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Kenya's Car Marketplace</h3>
            <p className="text-purple-200 mb-4">
              Your trusted partner for all automotive needs in Kenya. From import duties to vehicle valuations.
            </p>
            <p className="text-sm text-purple-300">
              All About Cars
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-cyan-200">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors duration-200"
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors duration-200 cursor-pointer">
                          {link.icon}
                          <span>{link.label}</span>
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-purple-300 text-sm">
              © 2025 Gariyangu. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy">
                <span className="text-purple-300 hover:text-white cursor-pointer">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="text-purple-300 hover:text-white cursor-pointer">Terms of Service</span>
              </Link>
              <Link href="/contact">
                <span className="text-purple-300 hover:text-white cursor-pointer">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}