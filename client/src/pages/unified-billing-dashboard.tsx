import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Package, 
  Crown, 
  TrendingUp, 
  Wallet, 
  Receipt,
  Settings,
  Plus,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function UnifiedBillingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [topupAmount, setTopupAmount] = useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch account summary
  const { data: accountSummary, isLoading: accountLoading } = useQuery({
    queryKey: ['/api/unified-billing/account-summary'],
    queryFn: () => apiRequest('GET', '/api/unified-billing/account-summary').then(res => res.json())
  });

  // Fetch subscription plans
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['/api/unified-billing/plans'],
    queryFn: () => apiRequest('GET', '/api/unified-billing/plans').then(res => res.json())
  });

  // Fetch user product access
  const { data: productAccess, isLoading: accessLoading } = useQuery({
    queryKey: ['/api/unified-billing/product-access'],
    queryFn: () => apiRequest('GET', '/api/unified-billing/product-access').then(res => res.json())
  });

  // Fetch billing history
  const { data: billingHistory, isLoading: historyLoading } = useQuery({
    queryKey: ['/api/unified-billing/billing-history'],
    queryFn: () => apiRequest('GET', '/api/unified-billing/billing-history').then(res => res.json())
  });

  // Top-up credits mutation
  const topupMutation = useMutation({
    mutationFn: (amount: number) => 
      apiRequest('POST', '/api/unified-billing/topup-credits', { amount }).then(res => res.json()),
    onSuccess: (data) => {
      // Redirect to payment page or handle payment
      window.open(data.authorization_url, '_blank');
      toast({
        title: "Payment Initiated",
        description: "Please complete the payment to add credits to your account."
      });
    },
    onError: () => {
      toast({
        title: "Top-up Failed",
        description: "Failed to initiate credit top-up. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Subscribe mutation
  const subscribeMutation = useMutation({
    mutationFn: ({ planId, billingType }: { planId: number, billingType: string }) =>
      apiRequest('POST', '/api/unified-billing/subscribe', { planId, billingType }).then(res => res.json()),
    onSuccess: (data) => {
      window.open(data.authorization_url, '_blank');
      toast({
        title: "Subscription Payment Initiated",
        description: "Please complete the payment to activate your subscription."
      });
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Failed to initiate subscription. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive"
      });
      return;
    }
    topupMutation.mutate(amount);
  };

  const handleSubscribe = (planId: number, billingType: string) => {
    subscribeMutation.mutate({ planId, billingType });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(num);
  };

  const getProductIcon = (productType: string) => {
    switch (productType) {
      case 'listing_package': return <Package className="h-5 w-5" />;
      case 'analytics_package': return <BarChart3 className="h-5 w-5" />;
      case 'api_access': return <Settings className="h-5 w-5" />;
      default: return <Crown className="h-5 w-5" />;
    }
  };

  if (accountLoading || plansLoading || accessLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscriptions</h1>
          <p className="text-gray-600">Manage your account, subscriptions, and billing in one place</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Products
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Billing History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Account Balance */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatAmount(accountSummary?.account?.balance || 0)}
                  </div>
                  <p className="text-xs text-gray-600">Available credits</p>
                </CardContent>
              </Card>

              {/* Subscription Status */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                  <Crown className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {accountSummary?.subscription?.plan?.name || 'No Plan'}
                  </div>
                  <p className="text-xs text-gray-600">
                    {accountSummary?.subscription ? 'Active subscription' : 'No active subscription'}
                  </p>
                </CardContent>
              </Card>

              {/* Products Count */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {productAccess?.products?.length || 0}
                  </div>
                  <p className="text-xs text-gray-600">Products available</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Credit Top-up */}
                  <div className="space-y-3">
                    <Label htmlFor="topup-amount">Top-up Credits</Label>
                    <div className="flex gap-2">
                      <Input
                        id="topup-amount"
                        type="number"
                        placeholder="Enter amount (KES)"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                      />
                      <Button 
                        onClick={handleTopup}
                        disabled={topupMutation.isPending}
                      >
                        {topupMutation.isPending ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Quick Subscription */}
                  <div className="space-y-3">
                    <Label>Upgrade Subscription</Label>
                    {!accountSummary?.subscription ? (
                      <Button 
                        onClick={() => setActiveTab('subscription')}
                        className="w-full"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Choose Plan
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => setActiveTab('subscription')}
                        className="w-full"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Subscription
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            {/* Current Subscription */}
            {accountSummary?.subscription && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-purple-600" />
                    Current Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{accountSummary.subscription.plan.name}</h3>
                      <p className="text-gray-600 mb-2">{accountSummary.subscription.plan.description}</p>
                      <Badge variant="default">
                        {accountSummary.subscription.subscription.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Billing Type:</span>
                        <span className="capitalize">{accountSummary.subscription.subscription.subscriptionType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Next Billing:</span>
                        <span>{formatDate(accountSummary.subscription.subscription.nextBillingDate)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Plans */}
            <div className="grid md:grid-cols-3 gap-6">
              {plans?.map((plan: any) => (
                <Card key={plan.id} className="relative">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{plan.name}</span>
                      {plan.name === 'Professional' && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                    </CardTitle>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatAmount(plan.monthlyPrice)}/month
                      </div>
                      <div className="text-sm text-gray-600">
                        or {formatAmount(plan.yearlyPrice)}/year
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Features:</h4>
                      <ul className="space-y-1">
                        {plan.features?.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Subscribe Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => handleSubscribe(plan.id, 'monthly')}
                        disabled={subscribeMutation.isPending}
                      >
                        Subscribe Monthly
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSubscribe(plan.id, 'yearly')}
                        disabled={subscribeMutation.isPending}
                      >
                        Subscribe Yearly (Save 17%)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {productAccess?.products && productAccess.products.length > 0 ? (
              <div className="grid gap-4">
                {productAccess.products.map((product: any) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            {getProductIcon(product.productType)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {product.accessType || 'subscription'}
                        </Badge>
                      </div>

                      {/* Usage Information */}
                      {product.limits && Object.keys(product.limits).length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium">Usage Limits:</h4>
                          {Object.entries(product.limits).map(([limitType, limitValue]: [string, any]) => (
                            <div key={limitType}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{limitType.replace('_', ' ')}:</span>
                                <span>{limitValue} included</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Available</h3>
                  <p className="text-gray-600 mb-4">Subscribe to a plan to access premium products and features</p>
                  <Button onClick={() => setActiveTab('subscription')}>
                    <Crown className="h-4 w-4 mr-2" />
                    View Subscription Plans
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                {billingHistory && billingHistory.length > 0 ? (
                  <div className="space-y-3">
                    {billingHistory.map((transaction: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Receipt className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description || 'Payment'}</p>
                            <p className="text-sm text-gray-600">
                              {formatDate(transaction.createdAt)} • {transaction.method}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatAmount(transaction.amount)}</p>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No billing history available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}