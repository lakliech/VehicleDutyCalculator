import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleNavigation } from "@/components/module-navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Calculator, FileText, DollarSign, Car, ShoppingCart, TrendingUp, Activity } from "lucide-react";

interface DashboardData {
  stats: {
    totalDutyCalculations: number;
    totalTransferCalculations: number;
    totalValuations: number;
    totalListings: number;
    activeListings: number;
    totalViews: number;
    totalInquiries: number;
    lastActivityAt: string | null;
  };
  recentActivities: Array<{
    id: string;
    activityType: string;
    description: string;
    createdAt: string;
    entityType?: string;
    entityId?: string;
    metadata?: any;
  }>;
  recommendations: Array<{
    id: string;
    type: 'tool' | 'action' | 'content';
    title: string;
    description: string;
    href: string;
    icon: string;
    color: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }>;
  quickActions: Array<{
    title: string;
    href: string;
    icon: string;
    color: string;
  }>;
}

const iconMap: { [key: string]: any } = {
  Calculator,
  FileText,
  DollarSign,
  Car,
  ShoppingCart,
  TrendingUp,
  Activity,
  CalendarDays
};

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['/api/dashboard'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <ModuleNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <ModuleNavigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Dashboard Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Unable to load your dashboard data. Please try logging in again.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { stats, recentActivities, recommendations, quickActions } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <ModuleNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your automotive calculations and marketplace activity
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calculator className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Duty Calculations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDutyCalculations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-cyan-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Transfer Calculations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTransferCalculations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Vehicle Valuations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalValuations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-pink-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                  <p className="text-xs text-gray-500">of {stats.totalListings} total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump to your most-used tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = iconMap[action.icon] || Calculator;
                  return (
                    <a
                      key={index}
                      href={action.href}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-gray-900">{action.title}</span>
                    </a>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Personalized Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>
                  Based on your usage patterns and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map((rec) => {
                      const IconComponent = iconMap[rec.icon] || Calculator;
                      const priorityColor = rec.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-gray-100 text-gray-800';
                      
                      return (
                        <a
                          key={rec.id}
                          href={rec.href}
                          className="block p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className={`p-2 rounded-lg ${rec.color} text-white`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <Badge variant="secondary" className={priorityColor}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          <p className="text-xs text-gray-500 italic">{rec.reason}</p>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No recommendations yet. Start using our tools to get personalized suggestions!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.slice(0, 10).map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Activity className="h-5 w-5 text-gray-400 mt-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.activityType.replace('_', ' ')}
                      </Badge>
                    </div>
                    {index < recentActivities.slice(0, 10).length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recent activity. Start by using our automotive tools!</p>
                <div className="mt-4">
                  <a
                    href="/duty-calculator"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Start with Duty Calculator
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Insights */}
        {stats.totalDutyCalculations > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Activity Overview</CardTitle>
              <CardDescription>
                How you're using Gariyangu's tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Duty Calculations</span>
                    <span>{stats.totalDutyCalculations} completed</span>
                  </div>
                  <Progress 
                    value={Math.min((stats.totalDutyCalculations / 10) * 100, 100)} 
                    className="mt-2" 
                  />
                </div>
                
                {stats.totalTransferCalculations > 0 && (
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Transfer Calculations</span>
                      <span>{stats.totalTransferCalculations} completed</span>
                    </div>
                    <Progress 
                      value={Math.min((stats.totalTransferCalculations / 5) * 100, 100)} 
                      className="mt-2" 
                    />
                  </div>
                )}
                
                {stats.totalValuations > 0 && (
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Vehicle Valuations</span>
                      <span>{stats.totalValuations} completed</span>
                    </div>
                    <Progress 
                      value={Math.min((stats.totalValuations / 5) * 100, 100)} 
                      className="mt-2" 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}