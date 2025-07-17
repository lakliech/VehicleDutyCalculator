import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Users, 
  Receipt, 
  Calendar, 
  DollarSign,
  Plus,
  RefreshCw,
  Settings
} from 'lucide-react';

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [topupAmount, setTopupAmount] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('monthly');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch account summary
  const { data: accountSummary, isLoading: accountLoading } = useQuery({
    queryKey: ['/api/billing/account/summary'],
    queryFn: () => apiRequest('GET', '/api/billing/account/summary').then(res => res.json())
  });

  // Fetch billing history
  const { data: billingHistory, isLoading: historyLoading } = useQuery({
    queryKey: ['/api/billing/history'],
    queryFn: () => apiRequest('GET', '/api/billing/history').then(res => res.json())
  });

  // Fetch subscriptions
  const { data: subscriptions, isLoading: subscriptionsLoading } = useQuery({
    queryKey: ['/api/billing/subscriptions'],
    queryFn: () => apiRequest('GET', '/api/billing/subscriptions').then(res => res.json())
  });

  // Fetch products for subscription
  const { data: products } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => apiRequest('GET', '/api/products').then(res => res.json())
  });

  // Credit top-up mutation
  const topupMutation = useMutation({
    mutationFn: (amount: number) => 
      apiRequest('POST', '/api/billing/topup', { amount }).then(res => res.json()),
    onSuccess: (data) => {
      if (data.success) {
        if (data.paystackUrl) {
          window.location.href = data.paystackUrl;
        } else {
          toast({
            title: "Top-up Successful",
            description: "Your account has been credited successfully.",
          });
          queryClient.invalidateQueries({ queryKey: ['/api/billing/account/summary'] });
          setTopupAmount('');
        }
      } else {
        toast({
          title: "Top-up Failed",
          description: data.error || "Failed to process top-up",
          variant: "destructive",
        });
      }
    }
  });

  // Subscription creation mutation
  const subscriptionMutation = useMutation({
    mutationFn: (data: { productId: number; subscriptionType: string; paymentMethod: string }) => 
      apiRequest('POST', '/api/billing/subscriptions', data).then(res => res.json()),
    onSuccess: (data) => {
      if (data.success) {
        if (data.paystackUrl) {
          window.location.href = data.paystackUrl;
        } else {
          toast({
            title: "Subscription Created",
            description: "Your subscription has been activated successfully.",
          });
          queryClient.invalidateQueries({ queryKey: ['/api/billing/subscriptions'] });
          queryClient.invalidateQueries({ queryKey: ['/api/billing/account/summary'] });
        }
      } else {
        toast({
          title: "Subscription Failed",
          description: data.error || "Failed to create subscription",
          variant: "destructive",
        });
      }
    }
  });

  // Subscription cancellation mutation
  const cancelSubscriptionMutation = useMutation({
    mutationFn: (subscriptionId: number) => 
      apiRequest('DELETE', `/api/billing/subscriptions/${subscriptionId}`).then(res => res.json()),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription has been cancelled successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/billing/subscriptions'] });
        queryClient.invalidateQueries({ queryKey: ['/api/billing/account/summary'] });
      } else {
        toast({
          title: "Cancellation Failed",
          description: data.error || "Failed to cancel subscription",
          variant: "destructive",
        });
      }
    }
  });

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    topupMutation.mutate(amount);
  };

  const handleSubscription = () => {
    if (!selectedProduct) {
      toast({
        title: "Select Product",
        description: "Please select a product to subscribe to.",
        variant: "destructive",
      });
      return;
    }
    subscriptionMutation.mutate({
      productId: parseInt(selectedProduct),
      subscriptionType,
      paymentMethod: 'paystack'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'payment_failed': 'bg-red-100 text-red-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  if (accountLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your account, subscriptions, and billing</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Account Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(accountSummary?.account?.creditBalance || 0)}
                </div>
                <p className="text-xs text-muted-foreground">Available credits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(accountSummary?.account?.totalSpent || 0)}
                </div>
                <p className="text-xs text-muted-foreground">All-time spending</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {accountSummary?.activeSubscriptions || 0}
                </div>
                <p className="text-xs text-muted-foreground">Current subscriptions</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Top-up Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topup-amount">Amount (KES)</Label>
                  <Input
                    id="topup-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleTopup}
                  disabled={topupMutation.isPending}
                  className="w-full"
                >
                  {topupMutation.isPending ? 'Processing...' : 'Top-up Credits'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  New Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-select">Select Product</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product: any) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} - {formatCurrency(product.basePrice)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subscription-type">Billing Period</Label>
                  <Select value={subscriptionType} onValueChange={setSubscriptionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly (10% discount)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleSubscription}
                  disabled={subscriptionMutation.isPending}
                  className="w-full"
                >
                  {subscriptionMutation.isPending ? 'Processing...' : 'Subscribe'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {subscriptionsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
              ) : subscriptions?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No active subscriptions
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions?.map((subscription: any) => (
                    <div key={subscription.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{subscription.productName}</h3>
                          <p className="text-sm text-gray-600 capitalize">
                            {subscription.subscriptionType} subscription
                          </p>
                          <p className="text-sm text-gray-500">
                            Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusBadge(subscription.status)}>
                            {subscription.status}
                          </Badge>
                          {subscription.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancelSubscriptionMutation.mutate(subscription.id)}
                              disabled={cancelSubscriptionMutation.isPending}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory?.map((transaction: any) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-500">
                              {transaction.reference}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell className="capitalize">{transaction.method}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Account Number</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {accountSummary?.account?.accountNumber}
                    </p>
                  </div>
                  <div>
                    <Label>Account Type</Label>
                    <p className="text-sm text-gray-600 mt-1 capitalize">
                      {accountSummary?.account?.accountType}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Billing Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Total Transactions</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {accountSummary?.totalTransactions}
                      </p>
                    </div>
                    <div>
                      <Label>Last Payment</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {accountSummary?.lastPaymentDate 
                          ? new Date(accountSummary.lastPaymentDate).toLocaleDateString()
                          : 'No payments yet'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}