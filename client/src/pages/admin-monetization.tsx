import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Target,
  ArrowUpDown,
  Filter,
  Calendar,
  CreditCard,
  PieChart,
  Activity,
  Download
} from 'lucide-react';

interface RevenueAnalytics {
  totalRevenue: number;
  revenueGrowth: number;
  totalTransactions: number;
  transactionGrowth: number;
  topProducts: Array<{
    productName: string;
    revenue: number;
    transactionCount: number;
  }>;
  revenueByCategory: Array<{
    categoryName: string;
    revenue: number;
    percentage: number;
  }>;
  transactionsByStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
}

interface ProductRevenue {
  productId: number;
  productName: string;
  categoryName: string;
  totalRevenue: number;
  transactionCount: number;
  avgTransactionAmount: number;
}

interface Transaction {
  id: number;
  userId: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  type: string;
  description: string;
  productName?: string;
  categoryName?: string;
  createdAt: Date;
  paidAt?: Date;
}

export default function AdminMonetization() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [transactionFilters, setTransactionFilters] = useState({
    status: '',
    method: '',
    type: '',
    startDate: '',
    endDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch dashboard analytics
  const { data: dashboardAnalytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/monetization/dashboard-analytics', selectedPeriod],
    queryFn: () => fetch(`/api/monetization/dashboard-analytics?period=${selectedPeriod}`, { credentials: 'include' }).then(r => r.json()),
    enabled: true
  });

  // Fetch revenue per product
  const { data: revenuePerProduct, isLoading: revenueLoading } = useQuery({
    queryKey: ['/api/monetization/revenue-per-product'],
    queryFn: () => fetch('/api/monetization/revenue-per-product', { credentials: 'include' }).then(r => r.json()),
    enabled: true
  });

  // Fetch filtered transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/monetization/transactions', transactionFilters, currentPage],
    queryFn: () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '25',
        ...Object.fromEntries(Object.entries(transactionFilters).filter(([_, value]) => value))
      });
      return fetch(`/api/monetization/transactions?${params}`, { credentials: 'include' }).then(r => r.json());
    },
    enabled: true
  });

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date | string) => {
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'completed': 'default',
      'processing': 'secondary',
      'pending': 'outline',
      'failed': 'destructive',
      'cancelled': 'destructive',
      'refunded': 'secondary'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{growth.toFixed(1)}%</span>
        </div>
      );
    } else if (growth < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
          <span>{growth.toFixed(1)}%</span>
        </div>
      );
    }
    return <span className="text-gray-500">0%</span>;
  };

  const handleFilterChange = (field: string, value: string) => {
    setTransactionFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics & Transaction Management</h1>
          <p className="text-muted-foreground">
            Monitor actual revenue per product and manage incoming transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardAnalytics?.totalRevenue || 0)}
            </div>
            <div className="text-xs text-muted-foreground">
              {getGrowthIndicator(dashboardAnalytics?.revenueGrowth || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardAnalytics?.totalTransactions || 0}
            </div>
            <div className="text-xs text-muted-foreground">
              {getGrowthIndicator(dashboardAnalytics?.transactionGrowth || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Product Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardAnalytics?.topProducts?.[0]?.revenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardAnalytics?.topProducts?.[0]?.productName || 'No data'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardAnalytics?.transactionsByStatus?.find(s => s.status === 'completed')?.percentage.toFixed(1) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Completed transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="product-revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="product-revenue">Product Revenue</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Product Revenue Tab */}
        <TabsContent value="product-revenue" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Revenue by Product</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Product Table */}
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Revenue breakdown by individual products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenuePerProduct?.productRevenue?.map((product: ProductRevenue) => (
                    <div key={product.productId} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{product.productName}</p>
                        <p className="text-sm text-muted-foreground">{product.categoryName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(product.totalRevenue)}</p>
                        <p className="text-sm text-muted-foreground">{product.transactionCount} transactions</p>
                      </div>
                    </div>
                  ))}
                  
                  {(!revenuePerProduct || revenuePerProduct.productRevenue?.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No product revenue data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Revenue distribution by product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardAnalytics?.revenueByCategory?.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.categoryName}</span>
                        <span className="text-sm text-muted-foreground">{category.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="text-sm font-medium">{formatCurrency(category.revenue)}</div>
                    </div>
                  ))}
                  
                  {(!dashboardAnalytics || dashboardAnalytics.revenueByCategory?.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No category revenue data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Transaction Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Transaction Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Transactions</CardTitle>
              <CardDescription>Filter transactions by status, method, type, and date range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={transactionFilters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="method">Method</Label>
                  <Select value={transactionFilters.method} onValueChange={(value) => handleFilterChange('method', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All methods</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                      <SelectItem value="mpesa">M-Pesa</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="airtel_money">Airtel Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={transactionFilters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="credit_purchase">Credit Purchase</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={transactionFilters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={transactionFilters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Showing {transactions?.transactions?.length || 0} of {transactions?.totalCount || 0} transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="text-center py-8">Loading transactions...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions?.transactions?.map((transaction: Transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                          <TableCell>{transaction.userId}</TableCell>
                          <TableCell>
                            {transaction.productName ? (
                              <div>
                                <p className="font-medium">{transaction.productName}</p>
                                <p className="text-xs text-muted-foreground">{transaction.categoryName}</p>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.method}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{transaction.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{formatDate(transaction.createdAt)}</p>
                              {transaction.paidAt && (
                                <p className="text-xs text-muted-foreground">
                                  Paid: {formatDate(transaction.paidAt)}
                                </p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {(!transactions || transactions.transactions?.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions found
                    </div>
                  )}
                </div>
              )}
              
              {/* Pagination */}
              {transactions && transactions.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {transactions.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(transactions.totalPages, currentPage + 1))}
                    disabled={currentPage === transactions.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Revenue Analytics</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Highest revenue generating products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardAnalytics?.topProducts?.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{product.productName}</p>
                        <p className="text-sm text-muted-foreground">{product.transactionCount} transactions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(product.revenue)}</p>
                      </div>
                    </div>
                  ))}
                  
                  {(!dashboardAnalytics || dashboardAnalytics.topProducts?.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No top products data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Transaction Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Status Distribution</CardTitle>
                <CardDescription>Breakdown of transaction statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardAnalytics?.transactionsByStatus?.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(status.status)}
                        <span className="text-sm">{status.count} transactions</span>
                      </div>
                      <span className="font-medium">{status.percentage.toFixed(1)}%</span>
                    </div>
                  ))}
                  
                  {(!dashboardAnalytics || dashboardAnalytics.transactionsByStatus?.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No transaction status data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}