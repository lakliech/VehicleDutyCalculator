import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { 
  TrendingUp, 
  Car, 
  Calculator, 
  DollarSign, 
  FileText, 
  Star,
  ArrowRight,
  BarChart3,
  Clock,
  Eye,
  MessageSquare,
  ShoppingCart,
  Target,
  Zap,
  Wrench,
  CreditCard,
  Search
} from "lucide-react";

interface UserStats {
  totalDutyCalculations: number;
  totalTransferCalculations: number;
  totalValuations: number;
  totalListings: number;
  activeListings: number;
  totalViews: number;
  totalInquiries: number;
  lastActivityAt: string | null;
}

interface UserActivity {
  id: number;
  activityType: string;
  description: string;
  createdAt: string;
  entityType?: string;
}

interface Recommendation {
  id: string;
  type: 'tool' | 'action' | 'content';
  title: string;
  description: string;
  href: string;
  icon: JSX.Element;
  color: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

interface DashboardData {
  stats: UserStats;
  recentActivities: UserActivity[];
  recommendations: Recommendation[];
  quickActions: Array<{
    title: string;
    href: string;
    icon: JSX.Element;
    color: string;
  }>;
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access your dashboard.",
        variant: "destructive",
      });
      setLocation('/');
      return;
    }
  }, [isAuthenticated, toast, setLocation]);

  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ['/api/dashboard'],
    enabled: isAuthenticated,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'duty_calculation': return <Calculator className="h-4 w-4" />;
      case 'transfer_calculation': return <FileText className="h-4 w-4" />;
      case 'valuation': return <DollarSign className="h-4 w-4" />;
      case 'listing_created': return <ShoppingCart className="h-4 w-4" />;
      case 'login': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-white to-cyan-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats;
  const activities = dashboardData?.recentActivities || [];
  const recommendations = dashboardData?.recommendations || [];
  const quickActions = dashboardData?.quickActions || [];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {user?.firstName || 'User'}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your personalized automotive dashboard
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Calculator className="h-4 w-4 mr-2" />
                Duty Calculations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalDutyCalculations || 0}</div>
              <p className="text-xs text-purple-100">Total calculations made</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Transfer Calculations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalTransferCalculations || 0}</div>
              <p className="text-xs text-cyan-100">Transfer costs calculated</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Vehicle Valuations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalValuations || 0}</div>
              <p className="text-xs text-green-100">Cars valued</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeListings || 0}</div>
              <p className="text-xs text-pink-100">Cars for sale</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personalized Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>
                  Smart suggestions based on your activity and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`${rec.color} text-white rounded-full p-2 flex-shrink-0`}>
                        {rec.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                          <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <p className="text-xs text-gray-500 mb-3">{rec.reason}</p>
                        <Link href={rec.href}>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Get Started
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Keep using our tools to get personalized recommendations!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button variant="outline" className="w-full justify-start hover:bg-purple-50">
                      <div className={`${action.color} text-white rounded p-1 mr-3`}>
                        {action.icon}
                      </div>
                      {action.title}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.length > 0 ? (
                    activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="bg-purple-100 text-purple-600 rounded-full p-1 mt-1">
                          {getActivityIcon(activity.activityType)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(activity.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Tools Explored</span>
                    <span className="text-sm text-gray-500">
                      {Math.min(
                        ((stats?.totalDutyCalculations || 0) > 0 ? 1 : 0) +
                        ((stats?.totalTransferCalculations || 0) > 0 ? 1 : 0) +
                        ((stats?.totalValuations || 0) > 0 ? 1 : 0) +
                        ((stats?.totalListings || 0) > 0 ? 1 : 0), 8
                      )}/8
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(
                      (((stats?.totalDutyCalculations || 0) > 0 ? 1 : 0) +
                      ((stats?.totalTransferCalculations || 0) > 0 ? 1 : 0) +
                      ((stats?.totalValuations || 0) > 0 ? 1 : 0) +
                      ((stats?.totalListings || 0) > 0 ? 1 : 0)) / 8 * 100, 100
                    )} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Activity Level</span>
                    <span className="text-sm text-gray-500">
                      {stats?.totalDutyCalculations && stats.totalDutyCalculations > 10 ? 'High' : 
                       stats?.totalDutyCalculations && stats.totalDutyCalculations > 3 ? 'Medium' : 'Getting Started'}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((stats?.totalDutyCalculations || 0) * 10, 100)} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}