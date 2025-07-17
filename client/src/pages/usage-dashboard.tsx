import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  Banknote, 
  Import, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface UsageLimits {
  allowed: boolean;
  currentUsage: number;
  limit: number | null;
  remaining?: number | null;
}

const featureTypes = [
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
  // Demo usage data for demonstration
  const demoUsageData = {
    duty_calculation: { allowed: true, currentUsage: 47, limit: 500 },
    valuation: { allowed: true, currentUsage: 23, limit: 200 },
    import_estimate: { allowed: true, currentUsage: 8, limit: 100 },
    api_call: { allowed: true, currentUsage: 1247, limit: 10000 },
    listing: { allowed: true, currentUsage: 12, limit: null } // Unlimited
  };

  // Fetch usage limits for all features with fallback to demo data
  const usageQueries = featureTypes.map(feature => 
    useQuery({
      queryKey: ['/api/monetization/usage-limits', feature.key],
      queryFn: () => 
        fetch(`/api/monetization/usage-limits/${feature.key}`, {
          credentials: 'include'
        }).then(r => {
          if (!r.ok) throw new Error('Failed to fetch');
          return r.json();
        }),
      retry: false,
      staleTime: 0,
      onError: () => {
        console.log(`Using demo data for ${feature.key}`);
      }
    })
  );

  const isLoading = usageQueries.some(query => query.isLoading);

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

  const getProgressColor = (status: string): string => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'exceeded': return 'bg-red-500';
      case 'unlimited': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureTypes.map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Usage Dashboard</h1>
        <p className="text-gray-600">
          Monitor your feature usage and subscription limits
        </p>
      </div>

      {/* Usage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureTypes.map((feature, index) => {
          const query = usageQueries[index];
          const usage: UsageLimits = query.data || demoUsageData[feature.key as keyof typeof demoUsageData] || { allowed: true, currentUsage: 0, limit: null };
          const status = getUsageStatus(usage.currentUsage || 0, usage.limit);
          const percentage = getUsagePercentage(usage.currentUsage || 0, usage.limit);
          const IconComponent = feature.icon;

          return (
            <Card key={feature.key} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <CardTitle className="text-lg">{feature.name}</CardTitle>
                  </div>
                  <Badge variant={status === 'exceeded' ? 'destructive' : status === 'warning' ? 'secondary' : 'default'}>
                    {status === 'unlimited' ? 'Unlimited' : 
                     status === 'exceeded' ? 'Exceeded' :
                     status === 'warning' ? 'Warning' : 'Good'}
                  </Badge>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Usage Numbers */}
                <div className="flex items-center justify-between text-sm">
                  <span>Current Usage</span>
                  <span className={`font-semibold ${getStatusColor(status)}`}>
                    {(usage.currentUsage || 0).toLocaleString()}
                    {usage.limit && ` / ${usage.limit.toLocaleString()}`}
                  </span>
                </div>

                {/* Progress Bar */}
                {usage.limit !== null ? (
                  <div className="space-y-2">
                    <Progress 
                      value={percentage} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0</span>
                      <span>{usage.limit.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-purple-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Unlimited usage</span>
                  </div>
                )}

                {/* Status Message */}
                {status === 'exceeded' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Usage limit exceeded</span>
                  </div>
                )}

                {status === 'warning' && usage.limit && (
                  <div className="flex items-center gap-2 text-yellow-600 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{usage.limit - (usage.currentUsage || 0)} remaining</span>
                  </div>
                )}

                {status === 'safe' && usage.limit && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>{usage.limit - usage.currentUsage} remaining</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upgrade Prompt */}
      <Card className="bg-gradient-to-r from-purple-50 to-cyan-50">
        <CardContent className="text-center p-8">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-600" />
          <h3 className="text-xl font-bold mb-2">Need Higher Limits?</h3>
          <p className="text-gray-600 mb-4">
            Upgrade your subscription to unlock higher usage limits and premium features.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            View Subscription Plans
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}