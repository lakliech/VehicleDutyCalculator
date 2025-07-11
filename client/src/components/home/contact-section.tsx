import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function ContactSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-8 rounded-lg shadow-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Need Help Importing a Car?</h2>
        <p className="text-lg mb-6 opacity-90">
          We import cars from Japan, UK, South Africa, Dubai, Australia, Singapore, and Thailand.
          Contact us for professional assistance with your car importation needs.
        </p>
        <a 
          href="https://wa.me/254736272719?text=Hi,%20I%20need%20help%20importing%20a%20car."
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" variant="secondary" className="group">
            <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            WhatsApp: 0736 272719
          </Button>
        </a>
      </div>
    </div>
  );
}