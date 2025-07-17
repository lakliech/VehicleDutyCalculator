import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, 
  TrendingUp, 
  Settings, 
  Users, 
  BarChart3, 
  Target,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Zap,
  Crown,
  Shield
} from 'lucide-react';

interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  priceKes: number;
  billingCycle: string;
  features: Record<string, any>;
  isActive: boolean;
  sortOrder: number;
}

interface MonetizationStrategy {
  id: number;
  strategyName: string;
  targetRevenue: number;
  timeframe: string;
  status: string;
  description: string;
  tactics: string[];
}

interface PricingRule {
  id: number;
  feature: string;
  basePrice: number;
  tierMultiplier: number;
  usageBased: boolean;
  overage: number;
}

export default function AdminMonetization() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<MonetizationStrategy | null>(null);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [isEditingStrategy, setIsEditingStrategy] = useState(false);

  // Demo data for subscription plans
  const demoPlans: SubscriptionPlan[] = [
    {
      id: 1,
      name: "Basic",
      description: "Essential tools for individual users",
      priceKes: 2500,
      billingCycle: "monthly",
      features: {
        dutyCalculations: 50,
        valuations: 20,
        importEstimates: 10,
        listings: 10,
        basicSupport: true
      },
      isActive: true,
      sortOrder: 1
    },
    {
      id: 2,
      name: "Professional",
      description: "Advanced features for serious sellers",
      priceKes: 8000,
      billingCycle: "monthly",
      features: {
        dutyCalculations: 500,
        valuations: 200,
        importEstimates: 100,
        unlimitedListings: true,
        prioritySupport: true,
        marketInsights: true
      },
      isActive: true,
      sortOrder: 2
    },
    {
      id: 3,
      name: "Enterprise",
      description: "Complete solution for businesses",
      priceKes: 20000,
      billingCycle: "monthly",
      features: {
        unlimitedCalculations: true,
        unlimitedValuations: true,
        unlimitedImportEstimates: true,
        unlimitedListings: true,
        whiteLabel: true,
        apiAccess: true,
        dedicatedSupport: true
      },
      isActive: true,
      sortOrder: 3
    }
  ];

  // Demo monetization strategies
  const demoStrategies: MonetizationStrategy[] = [
    {
      id: 1,
      strategyName: "Market Penetration 2025",
      targetRevenue: 15000000,
      timeframe: "12 months",
      status: "active",
      description: "Aggressive growth strategy targeting 15M KES in Year 1",
      tactics: ["Freemium conversion", "Enterprise partnerships", "Premium features", "API monetization"]
    },
    {
      id: 2,
      strategyName: "Premium Services Expansion",
      targetRevenue: 25000000,
      timeframe: "18 months",
      status: "planning",
      description: "Expand high-value services for professional dealers",
      tactics: ["White-label solutions", "Advanced analytics", "Lead generation", "Consultation services"]
    },
    {
      id: 3,
      strategyName: "B2B Enterprise Focus",
      targetRevenue: 40000000,
      timeframe: "24 months",
      status: "draft",
      description: "Target large automotive businesses and institutions",
      tactics: ["Custom integrations", "Volume discounts", "SLA guarantees", "Dedicated support"]
    }
  ];

  // Demo pricing rules
  const demoPricingRules: PricingRule[] = [
    { id: 1, feature: "Duty Calculations", basePrice: 50, tierMultiplier: 2.0, usageBased: true, overage: 5 },
    { id: 2, feature: "Vehicle Valuations", basePrice: 100, tierMultiplier: 1.8, usageBased: true, overage: 10 },
    { id: 3, feature: "Import Estimates", basePrice: 150, tierMultiplier: 2.2, usageBased: true, overage: 15 },
    { id: 4, feature: "API Access", basePrice: 500, tierMultiplier: 3.0, usageBased: false, overage: 0 },
    { id: 5, feature: "Premium Listings", basePrice: 200, tierMultiplier: 1.5, usageBased: true, overage: 20 }
  ];

  // Fetch subscription plans
  const { data: plans = demoPlans } = useQuery({
    queryKey: ['/api/admin/monetization/plans'],
    queryFn: () => fetch('/api/admin/monetization/plans', { credentials: 'include' }).then(r => r.json()),
    onError: () => console.log('Using demo subscription plans')
  });

  // Fetch monetization strategies
  const { data: strategies = demoStrategies } = useQuery({
    queryKey: ['/api/admin/monetization/strategies'],
    queryFn: () => fetch('/api/admin/monetization/strategies', { credentials: 'include' }).then(r => r.json()),
    onError: () => console.log('Using demo monetization strategies')
  });

  // Fetch pricing rules
  const { data: pricingRules = demoPricingRules } = useQuery({
    queryKey: ['/api/admin/monetization/pricing-rules'],
    queryFn: () => fetch('/api/admin/monetization/pricing-rules', { credentials: 'include' }).then(r => r.json()),
    onError: () => console.log('Using demo pricing rules')
  });

  // Revenue analytics
  const { data: revenueAnalytics } = useQuery({
    queryKey: ['/api/admin/monetization/analytics'],
    queryFn: () => fetch('/api/admin/monetization/analytics', { credentials: 'include' }).then(r => r.json()),
    onError: () => console.log('Using demo analytics')
  });

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic': return <Users className="h-5 w-5" />;
      case 'professional': return <Zap className="h-5 w-5" />;
      case 'enterprise': return <Crown className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'planning': 'secondary',
      'draft': 'outline',
      'paused': 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monetization Management</h1>
          <p className="text-muted-foreground">
            Configure subscription plans, pricing strategies, and revenue optimization
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Strategy
          </Button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 847,500</div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +8.7% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56.7%</div>
            <p className="text-xs text-muted-foreground">
              KES 8.5M of KES 15M target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="strategies">Revenue Strategies</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Subscription Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Subscription Plans</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPlanIcon(plan.name)}
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                    </div>
                    <Badge variant={plan.isActive ? "default" : "secondary"}>
                      {plan.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-purple-600">
                    {formatCurrency(plan.priceKes)}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.billingCycle}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {Object.entries(plan.features).slice(0, 4).map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                          <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                          <span>{typeof value === 'boolean' ? (value ? '✓' : '✗') : value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Revenue Strategies Tab */}
        <TabsContent value="strategies" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Revenue Strategies</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Strategy
            </Button>
          </div>

          <div className="space-y-4">
            {strategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{strategy.strategyName}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(strategy.status)}
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Target Revenue</Label>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(strategy.targetRevenue)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Timeframe</Label>
                      <p className="text-lg">{strategy.timeframe}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Key Tactics</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {strategy.tactics.slice(0, 3).map((tactic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tactic}
                          </Badge>
                        ))}
                        {strategy.tactics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{strategy.tactics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pricing Rules Tab */}
        <TabsContent value="pricing" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pricing Rules</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Pricing Configuration</CardTitle>
              <CardDescription>
                Configure base pricing and tier multipliers for each feature
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{rule.feature}</h4>
                      <p className="text-sm text-muted-foreground">
                        Base: {formatCurrency(rule.basePrice)} | Multiplier: {rule.tierMultiplier}x
                        {rule.usageBased && ` | Overage: ${formatCurrency(rule.overage)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={rule.usageBased ? "default" : "secondary"}>
                        {rule.usageBased ? "Usage-based" : "Fixed"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Monthly revenue by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Subscription Revenue</span>
                    <span className="font-semibold">KES 654,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Usage Overages</span>
                    <span className="font-semibold">KES 127,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Premium Features</span>
                    <span className="font-semibold">KES 65,500</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>KES 847,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
                <CardDescription>Active subscribers by plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Basic Plan</span>
                    <span className="font-semibold">789 users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Professional Plan</span>
                    <span className="font-semibold">367 users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Enterprise Plan</span>
                    <span className="font-semibold">91 users</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-bold">
                    <span>Total Subscribers</span>
                    <span>1,247 users</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}