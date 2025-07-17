import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { 
  CheckCircle, 
  XCircle, 
  Crown, 
  Zap, 
  Users, 
  CreditCard, 
  TrendingUp,
  BarChart3,
  Shield,
  Headphones
} from 'lucide-react';

interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  priceKes: string;
  billingCycle: string;
  features: string[];
  limits: {
    maxListings?: number;
    calculationsPerMonth?: number;
    valuationsPerMonth?: number;
    apiCallsPerMonth?: number;
    storageGb?: number;
  };
  sortOrder: number;
}

interface UserSubscription {
  id: number;
  planId: number;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export default function SubscriptionManagement() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  // Fetch subscription plans
  const { data: plans = [], isLoading: plansLoading } = useQuery({
    queryKey: ['/api/monetization/subscription-plans'],
    queryFn: () => fetch('/api/monetization/subscription-plans').then(r => r.json())
  });

  // Fetch user's current subscription
  const { data: currentSubscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ['/api/monetization/my-subscription'],
    queryFn: () => fetch('/api/monetization/my-subscription', {
      credentials: 'include'
    }).then(r => r.json())
  });

  // Subscribe mutation
  const subscribeMutation = useMutation({
    mutationFn: (planId: number) => 
      fetch('/api/monetization/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId })
      }).then(r => r.json()),
    onSuccess: () => {
      toast({
        title: "Subscription Created",
        description: "Your subscription has been created successfully!"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/monetization/my-subscription'] });
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Cancel subscription mutation
  const cancelMutation = useMutation({
    mutationFn: (immediately: boolean) =>
      fetch('/api/monetization/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ immediately })
      }).then(r => r.json()),
    onSuccess: () => {
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled."
      });
      queryClient.invalidateQueries({ queryKey: ['/api/monetization/my-subscription'] });
    }
  });

  const handleSubscribe = (planId: number) => {
    subscribeMutation.mutate(planId);
  };

  const handleCancel = (immediately = false) => {
    cancelMutation.mutate(immediately);
  };

  const formatPrice = (price: string) => {
    return `KES ${parseFloat(price).toLocaleString()}`;
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic': return <Users className="h-6 w-6" />;
      case 'professional': return <Zap className="h-6 w-6" />;
      case 'enterprise': return <Crown className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('Analytics')) return <BarChart3 className="h-4 w-4" />;
    if (feature.includes('Support')) return <Headphones className="h-4 w-4" />;
    if (feature.includes('API')) return <Zap className="h-4 w-4" />;
    if (feature.includes('Smart')) return <TrendingUp className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (plansLoading || subscriptionLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Scale your automotive business with powerful tools and insights. 
          All plans include 14-day free trial.
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {plans.find(p => p.id === currentSubscription.planId)?.name} Plan
                </p>
                <p className="text-sm text-gray-600">
                  Status: <Badge variant={currentSubscription.status === 'active' ? 'default' : 'secondary'}>
                    {currentSubscription.status}
                  </Badge>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Next billing: {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancel(false)}
                  disabled={cancelMutation.isPending}
                >
                  Cancel at Period End
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancel(true)}
                  disabled={cancelMutation.isPending}
                >
                  Cancel Immediately
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan: SubscriptionPlan) => {
          const isCurrentPlan = currentSubscription?.planId === plan.id;
          const isProfessional = plan.name.toLowerCase() === 'professional';
          
          return (
            <Card 
              key={plan.id} 
              className={`relative ${isProfessional ? 'border-purple-500 shadow-lg scale-105' : ''} ${isCurrentPlan ? 'bg-green-50 border-green-500' : ''}`}
            >
              {isProfessional && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${isProfessional ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    {getPlanIcon(plan.name)}
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-[3rem]">{plan.description}</CardDescription>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold">{formatPrice(plan.priceKes)}</div>
                  <div className="text-gray-600">per {plan.billingCycle === 'monthly' ? 'month' : 'year'}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide">Features</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {getFeatureIcon(feature)}
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Limits */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide">Limits</h4>
                  {plan.limits.maxListings && (
                    <div className="flex justify-between text-sm">
                      <span>Max Listings</span>
                      <span className="font-semibold">
                        {plan.limits.maxListings === 999999 ? 'Unlimited' : plan.limits.maxListings}
                      </span>
                    </div>
                  )}
                  {plan.limits.calculationsPerMonth && (
                    <div className="flex justify-between text-sm">
                      <span>Calculations/Month</span>
                      <span className="font-semibold">{plan.limits.calculationsPerMonth.toLocaleString()}</span>
                    </div>
                  )}
                  {plan.limits.valuationsPerMonth && (
                    <div className="flex justify-between text-sm">
                      <span>Valuations/Month</span>
                      <span className="font-semibold">{plan.limits.valuationsPerMonth.toLocaleString()}</span>
                    </div>
                  )}
                  {plan.limits.apiCallsPerMonth && (
                    <div className="flex justify-between text-sm">
                      <span>API Calls/Month</span>
                      <span className="font-semibold">{plan.limits.apiCallsPerMonth.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                {isCurrentPlan ? (
                  <Button className="w-full" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${isProfessional ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={subscribeMutation.isPending}
                  >
                    {subscribeMutation.isPending ? 'Processing...' : `Upgrade to ${plan.name}`}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Enterprise Contact */}
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-cyan-50">
        <CardContent className="text-center p-8">
          <Crown className="h-12 w-12 mx-auto mb-4 text-purple-600" />
          <h3 className="text-xl font-bold mb-2">Need Something Custom?</h3>
          <p className="text-gray-600 mb-4">
            Contact us for enterprise solutions, white-label options, and custom integrations.
          </p>
          <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
            Contact Sales
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}