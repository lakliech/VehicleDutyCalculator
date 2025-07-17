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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  Users, 
  Receipt, 
  CreditCard, 
  DollarSign,
  RefreshCw,
  Settings,
  Plus,
  Minus,
  BarChart3,
  Calendar,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminBillingDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [dateRange, setDateRange] = useState('30');
  const [balanceDialog, setBalanceDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceType, setBalanceType] = useState('credit');
  const [balanceDescription, setBalanceDescription] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch revenue analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/billing/admin/analytics', dateRange],
    queryFn: () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));
      
      return apiRequest('GET', `/api/billing/admin/analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
        .then(res => res.json());
    }
  });

  // Fetch all accounts
  const { data: accounts, isLoading: accountsLoading } = useQuery({
    queryKey: ['/api/billing/admin/accounts'],
    queryFn: () => apiRequest('GET', '/api/billing/admin/accounts').then(res => res.json())
  });

  // Fetch all subscriptions
  const { data: adminSubscriptions, isLoading: subscriptionsLoading } = useQuery({
    queryKey: ['/api/billing/admin/subscriptions'],
    queryFn: () => apiRequest('GET', '/api/billing/admin/subscriptions').then(res => res.json())
  });

  // Update account balance mutation
  const updateBalanceMutation = useMutation({
    mutationFn: (data: { accountId: number; amount: number; type: string; description: string }) => 
      apiRequest('POST', `/api/billing/admin/accounts/${data.accountId}/balance`, {
        amount: data.amount,
        type: data.type,
        description: data.description
      }).then(res => res.json()),
    onSuccess: () => {
      toast({
        title: "Balance Updated",
        description: "Account balance has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/billing/admin/accounts'] });
      setBalanceDialog(false);
      setSelectedAccount(null);
      setBalanceAmount('');
      setBalanceDescription('');
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update account balance",
        variant: "destructive",
      });
    }
  });

  // Process recurring billing mutation
  const recurringBillingMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/billing/admin/recurring-billing').then(res => res.json()),
    onSuccess: (data) => {
      toast({
        title: "Recurring Billing Processed",
        description: `Processed: ${data.processed}, Successful: ${data.successful}, Failed: ${data.failed}`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/billing/admin/analytics'] });
      queryClient.invalidateQueries({ queryKey: ['/api/billing/admin/subscriptions'] });
    }
  });

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

  const handleUpdateBalance = () => {
    const amount = parseFloat(balanceAmount);
    if (!amount || amount <= 0 || !selectedAccount || !balanceDescription) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    updateBalanceMutation.mutate({
      accountId: selectedAccount.id,
      amount,
      type: balanceType,
      description: balanceDescription
    });
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  if (analyticsLoading) {
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
        <h1 className="text-3xl font-bold text-gray-900">Admin Billing Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage system billing, subscriptions, and revenue</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Date Range Selector */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Revenue Analytics</h2>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(analytics?.totalRevenue || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics?.totalTransactions || 0} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics?.averageTransactionValue || 0)}
                </div>
                <p className="text-xs text-muted-foreground">Per transaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics?.subscriptionMetrics?.activeSubscriptions || 0}
                </div>
                <p className="text-xs text-muted-foreground">Current subscribers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Recurring</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(analytics?.subscriptionMetrics?.monthlyRecurringRevenue || 0)}
                </div>
                <p className="text-xs text-muted-foreground">MRR</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics?.dailyRevenue || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics?.revenueByMethod || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ method, revenue }) => `${method}: ${formatCurrency(revenue)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {analytics?.revenueByMethod?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue by Product */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Product</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Avg per Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.revenueByProduct?.map((product: any) => (
                    <TableRow key={product.productName}>
                      <TableCell className="font-medium">{product.productName}</TableCell>
                      <TableCell>{formatCurrency(product.revenue)}</TableCell>
                      <TableCell>{product.count}</TableCell>
                      <TableCell>{formatCurrency(product.revenue / product.count)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">User Accounts</h2>
            <Dialog open={balanceDialog} onOpenChange={setBalanceDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Update Balance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Account Balance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account</Label>
                    <Select 
                      value={selectedAccount?.id?.toString() || ""} 
                      onValueChange={(value) => {
                        const account = accounts?.find((a: any) => a.id.toString() === value);
                        setSelectedAccount(account);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts?.map((account: any) => (
                          <SelectItem key={account.id} value={account.id.toString()}>
                            {account.userName} - {account.accountNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction Type</Label>
                    <Select value={balanceType} onValueChange={setBalanceType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit (Add funds)</SelectItem>
                        <SelectItem value="debit">Debit (Remove funds)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (KES)</Label>
                    <Input
                      type="number"
                      value={balanceAmount}
                      onChange={(e) => setBalanceAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={balanceDescription}
                      onChange={(e) => setBalanceDescription(e.target.value)}
                      placeholder="Enter description"
                    />
                  </div>
                  <Button 
                    onClick={handleUpdateBalance}
                    disabled={updateBalanceMutation.isPending}
                    className="w-full"
                  >
                    {updateBalanceMutation.isPending ? 'Processing...' : 'Update Balance'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              {accountsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Credit Balance</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Total Earned</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts?.map((account: any) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{account.userName}</div>
                            <div className="text-sm text-gray-500">{account.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {account.accountNumber}
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(account.creditBalance)}
                        </TableCell>
                        <TableCell>{formatCurrency(account.totalSpent)}</TableCell>
                        <TableCell>{formatCurrency(account.totalEarned)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(account.status)}>
                            {account.status}
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

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subscription Management</h2>
            <Button 
              onClick={() => recurringBillingMutation.mutate()}
              disabled={recurringBillingMutation.isPending}
            >
              <Activity className="h-4 w-4 mr-2" />
              {recurringBillingMutation.isPending ? 'Processing...' : 'Process Recurring Billing'}
            </Button>
          </div>

          <Card>
            <CardContent>
              {subscriptionsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Current Period</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminSubscriptions?.map((subscription: any) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{subscription.userName}</div>
                            <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{subscription.productName}</TableCell>
                        <TableCell className="capitalize">{subscription.subscriptionType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(subscription.status)}>
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {subscription.currentPeriodStart && subscription.currentPeriodEnd ? (
                              <>
                                {new Date(subscription.currentPeriodStart).toLocaleDateString()} - 
                                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                              </>
                            ) : (
                              'N/A'
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {subscription.nextBillingDate 
                            ? new Date(subscription.nextBillingDate).toLocaleDateString()
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>{formatCurrency(subscription.productPrice)}</TableCell>
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
              <CardTitle>Billing System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>System Status</Label>
                    <p className="text-sm text-green-600 mt-1">Active</p>
                  </div>
                  <div>
                    <Label>Default Currency</Label>
                    <p className="text-sm text-gray-600 mt-1">KES (Kenyan Shilling)</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Billing Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Payment Provider</Label>
                      <p className="text-sm text-gray-600 mt-1">Paystack</p>
                    </div>
                    <div>
                      <Label>Billing Frequency</Label>
                      <p className="text-sm text-gray-600 mt-1">Daily recurring billing check</p>
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