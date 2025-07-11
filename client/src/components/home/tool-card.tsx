import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
}

export function ToolCard({ href, title, description, icon, color, featured }: ToolCardProps) {
  return (
    <Link href={href}>
      <Card className={`hover:shadow-xl transition-all cursor-pointer group ${
        featured ? 'ring-2 ring-purple-500' : ''
      }`}>
        <CardHeader className="pb-4">
          <div className={`${color} text-white p-3 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}