import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calculator, 
  Banknote, 
  Import, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info,
  Infinity,
  Clock,
  Activity
} from 'lucide-react';
import { Link } from 'wouter';

interface UsageLimits {
  allowed: boolean;
  currentUsage: number;
  limit: number | null;
  remaining?: number | null;
  plan: string;
}

// Feature mapping from system features to dashboard features
const featureMapping: { [key: string]: { key: string; name: string; description: string; icon: any } } = {
  'Duty estimator': {
    key: 'duty_calculation',
    name: 'Duty Calculations',
    description: 'Import duty and tax calculations',
    icon: Calculator
  },
  'Basic valuation': {
    key: 'valuation',
    name: 'Vehicle Valuations',
    description: 'Market value assessments',
    icon: Banknote
  },
  'Import cost calculator': {
    key: 'import_estimate',
    name: 'Import Estimates',
    description: 'Complete import cost calculations',
    icon: Import
  },
  'Unlimited calculations': {
    key: 'api_call',
    name: 'API Calls',
    description: 'Programmatic access to services',
    icon: Zap
  },
  'Unlimited listings': {
    key: 'listing',
    name: 'Vehicle Listings',
    description: 'Active marketplace listings',
    icon: TrendingUp
  },
  'Active Listings': {
    key: 'listing',
    name: 'Vehicle Listings',
    description: 'Active marketplace listings',
    icon: TrendingUp
  },
  '"Verified" badge': {
    key: 'verification',
    name: 'Verified Badge',
    description: 'Premium verification status',
    icon: CheckCircle
  },
  'AI pricing insights': {
    key: 'ai_insights',
    name: 'AI Pricing Insights',
    description: 'AI-powered market insights',
    icon: Zap
  },
  'Lead management tools': {
    key: 'lead_management',
    name: 'Lead Management',
    description: 'Customer lead tracking',
    icon: TrendingUp
  },
  'Competitor benchmarking': {
    key: 'competitor_analysis',
    name: 'Competitor Analysis',
    description: 'Market competitor insights',
    icon: TrendingUp
  },
  'Standard support': {
    key: 'support',
    name: 'Standard Support',
    description: 'Customer support access',
    icon: Info
  },
  'Basic analytics': {
    key: 'analytics',
    name: 'Basic Analytics',
    description: 'Usage and performance metrics',
    icon: TrendingUp
  }
};

// Default feature types for free users or fallback
const defaultFeatureTypes = [
  {
    key: 'duty_calculation',
    name: 'Duty Calculations',
    description: 'Import duty and tax calculations',
    icon: Calculator
  },
  {
    key: 'valuation',
    name: 'Vehicle Valuations',
    description: 'Market value assessments',
    icon: Banknote
  },
  {
    key: 'import_estimate',
    name: 'Import Estimates',
    description: 'Complete import cost calculations',
    icon: Import
  },
  {
    key: 'api_call',
    name: 'API Calls',
    description: 'Programmatic access to services',
    icon: Zap
  },
  {
    key: 'listing',
    name: 'Vehicle Listings',
    description: 'Active marketplace listings',
    icon: TrendingUp
  }
];

export default function UsageDashboard() {
  // Fetch real usage data from unified billing system
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ['/api/unified-billing/usage-overview'],
    queryFn: async () => {
      const response = await fetch('/api/unified-billing/usage-overview', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch usage data');
      }
      return response.json();
    },
    retry: 2,
    staleTime: 60000, // Cache for 1 minute
  });

  // Fetch account summary to get subscription info
  const { data: accountSummary } = useQuery({
    queryKey: ['/api/unified-billing/account-summary'],
    queryFn: async () => {
      const response = await fetch('/api/unified-billing/account-summary', {
        credentials: 'include'
      });
      if (!response.ok) return null;
      return response.json();
    },
    retry: 1,
  });

  // Generate feature types based on subscription plan
  const getFeatureTypesForPlan = () => {
    if (!usageData?.subscriptionInfo?.features) {
      return defaultFeatureTypes;
    }

    const planFeatures: any[] = [];
    const usedKeys = new Set();

    // Map system features to dashboard features
    usageData.subscriptionInfo.features.forEach((feature: any) => {
      const mappedFeature = featureMapping[feature.name];
      if (mappedFeature && !usedKeys.has(mappedFeature.key)) {
        planFeatures.push(mappedFeature);
        usedKeys.add(mappedFeature.key);
      }
    });

    // If no mapped features found, return default
    return planFeatures.length > 0 ? planFeatures : defaultFeatureTypes;
  };

  const getUsagePercentage = (current: number, limit: number | null): number => {
    if (limit === null) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageStatus = (current: number, limit: number | null): 'safe' | 'warning' | 'exceeded' | 'unlimited' => {
    if (limit === null) return 'unlimited';
    const percentage = getUsagePercentage(current, limit);
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'safe';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'safe': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'exceeded': return 'text-red-600';
      case 'unlimited': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultFeatureTypes.map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load usage data. Please try refreshing the page or contact support if the issue persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const currentPlan = accountSummary?.subscription?.plan?.name || 'Free';
  const isSubscribed = accountSummary?.subscription?.subscription?.status === 'active';

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Usage Dashboard</h1>
            <p className="text-gray-600">
              Monitor your feature usage and subscription limits
            </p>
          </div>
          <Badge variant={isSubscribed ? "default" : "secondary"} className="text-sm px-3 py-1">
            {currentPlan} Plan
          </Badge>
        </div>

        {!isSubscribed && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              You're currently on the Free plan with limited usage. <Link href="/billing" className="underline font-medium">Upgrade your subscription</Link> for unlimited access.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Usage Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Features</p>
                <p className="text-2xl font-bold">{getFeatureTypesForPlan().length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plan Status</p>
                <p className="text-2xl font-bold">{isSubscribed ? 'Active' : 'Free'}</p>
              </div>
              <CheckCircle className={`h-8 w-8 ${isSubscribed ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usage This Month</p>
                <p className="text-2xl font-bold">
                  {Object.values(usageData || {}).reduce((total: number, feature: any) => {
                    return total + (feature?.currentUsage || 0);
                  }, 0)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Usage Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Feature Usage Details
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your feature usage and limits for {currentPlan} Plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFeatureTypesForPlan().map((feature) => {
                const usage: UsageLimits = usageData?.[feature.key] || { 
                  allowed: false, 
                  currentUsage: 0, 
                  limit: 0, 
                  plan: 'Unknown' 
                };
                
                const status = getUsageStatus(usage.currentUsage || 0, usage.limit);
                const percentage = getUsagePercentage(usage.currentUsage || 0, usage.limit);
                const IconComponent = feature.icon;

                return (
                  <TableRow key={feature.key}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-sm text-gray-500">{feature.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono font-medium">
                        {(usage.currentUsage || 0).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {usage.limit !== null ? (
                        <span className="font-mono">{usage.limit.toLocaleString()}</span>
                      ) : (
                        <div className="flex items-center gap-1 text-purple-600">
                          <Infinity className="h-4 w-4" />
                          <span className="font-medium">Unlimited</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          status === 'exceeded' ? 'destructive' : 
                          status === 'warning' ? 'secondary' : 
                          status === 'unlimited' ? 'default' : 'outline'
                        }
                        className={status === 'unlimited' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                      >
                        {status === 'unlimited' ? 'Unlimited' : 
                         status === 'exceeded' ? 'Exceeded' :
                         status === 'warning' ? 'Warning' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-32">
                      {usage.limit !== null ? (
                        <div className="space-y-1">
                          <Progress value={percentage} className="h-2" />
                          <div className="text-xs text-gray-500">
                            {Math.max(0, usage.limit - (usage.currentUsage || 0))} remaining
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-purple-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">No limits</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upgrade Prompt for Free Users */}
      {!isSubscribed && (
        <Card className="bg-gradient-to-r from-purple-50 to-cyan-50">
          <CardContent className="text-center p-8">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-bold mb-2">Need Higher Limits?</h3>
            <p className="text-gray-600 mb-4">
              Upgrade your subscription to unlock unlimited usage for all features and premium capabilities.
            </p>
            <Link href="/billing">
              <Button className="bg-purple-600 hover:bg-purple-700">
                View Subscription Plans
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Plan Benefits for Subscribers */}
      {isSubscribed && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">You're All Set!</h3>
            <p className="text-gray-600 mb-4">
              Your {currentPlan} subscription gives you unlimited access to all features. Keep exploring!
            </p>
            <Link href="/billing">
              <Button variant="outline">
                Manage Subscription
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}