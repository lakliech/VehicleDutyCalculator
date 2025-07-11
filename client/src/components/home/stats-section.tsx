import { Card, CardContent } from "@/components/ui/card";
import { Users, Car, Shield, Star } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "50,000+",
    label: "Active Users",
    color: "text-purple-600"
  },
  {
    icon: <Car className="h-8 w-8" />,
    value: "10,000+",
    label: "Vehicles Listed",
    color: "text-cyan-600"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    value: "100%",
    label: "Secure Transactions",
    color: "text-green-600"
  },
  {
    icon: <Star className="h-8 w-8" />,
    value: "4.8/5",
    label: "User Rating",
    color: "text-yellow-600"
  }
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center">
          <CardContent className="pt-6">
            <div className={`${stat.color} mb-3 flex justify-center`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}