import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Crown, 
  BarChart3, 
  Code, 
  Headphones,
  Package,
  Calendar,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Settings
} from 'lucide-react';
import { Link } from 'wouter';

interface Product {
  id: number;
  name: string;
  description: string;
  productType: string;
  features: string[];
  limits: Record<string, number>;
  accessType?: string;
  usageCount?: number;
  usageLimit?: number;
}

interface SubscriptionWithProducts {
  subscription: {
    id: number;
    status: string;
    subscriptionType: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    nextBillingDate: string;
    cancelAtPeriodEnd: boolean;
  };
  plan: {
    id: number;
    name: string;
    description: string;
    monthlyPrice: string;
    yearlyPrice: string;
    features: string[];
  };
  products: Product[];
}

export function UserSubscriptionProducts() {
  const { data: userAccess, isLoading, error } = useQuery({
    queryKey: ['/api/subscription-products/user-access'],
    queryFn: () => apiRequest('GET', '/api/subscription-products/user-access').then(res => res.json())
  });

  const getProductIcon = (productType: string) => {
    switch (productType) {
      case 'listing_package': return <Package className="h-5 w-5" />;
      case 'analytics_package': return <BarChart3 className="h-5 w-5" />;
      case 'api_access': return <Code className="h-5 w-5" />;
      case 'premium_support': return <Headphones className="h-5 w-5" />;
      default: return <Crown className="h-5 w-5" />;
    }
  };

  const getProductTypeLabel = (productType: string) => {
    switch (productType) {
      case 'listing_package': return 'Listing Package';
      case 'analytics_package': return 'Analytics';
      case 'api_access': return 'API Access';
      case 'premium_support': return 'Support';
      default: return 'Feature';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateUsagePercentage = (used: number, limit: number) => {
    if (!limit) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
        </CardContent>
      </Card>
    );
  }

  if (error || !userAccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            No Active Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You don't have an active subscription. Subscribe to unlock premium features and products.
          </p>
          <Button asChild>
            <Link href="/billing">
              View Subscription Plans
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { subscription: subscriptionData, products } = userAccess;

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      {subscriptionData && (
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
                <h3 className="font-semibold text-lg text-purple-600 mb-2">
                  {subscriptionData.plan?.name || 'Active Plan'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {subscriptionData.plan?.description || 'Subscription active'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={subscriptionData.subscription.status === 'active' ? 'default' : 'secondary'}>
                    {subscriptionData.subscription.status}
                  </Badge>
                  <Badge variant="outline">
                    {subscriptionData.subscription.subscriptionType}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Period:</span>
                  <span>{formatDate(subscriptionData.subscription.currentPeriodStart)} - {formatDate(subscriptionData.subscription.currentPeriodEnd)}</span>
                </div>
                {subscriptionData.subscription.nextBillingDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Billing:</span>
                    <span>{formatDate(subscriptionData.subscription.nextBillingDate)}</span>
                  </div>
                )}
                {subscriptionData.subscription.cancelAtPeriodEnd && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Subscription will cancel at period end</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-600" />
            Your Products & Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products && products.length > 0 ? (
            <div className="grid gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        {getProductIcon(product.productType)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {getProductTypeLabel(product.productType)}
                      </Badge>
                      {product.accessType && (
                        <Badge variant="secondary">
                          {product.accessType}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Usage Information */}
                  {product.limits && Object.keys(product.limits).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Usage:</h4>
                      <div className="space-y-2">
                        {Object.entries(product.limits).map(([limitType, limitValue]) => {
                          const usageCount = product.usageCount || 0;
                          const usagePercentage = calculateUsagePercentage(usageCount, limitValue);
                          
                          return (
                            <div key={limitType}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{limitType.replace('_', ' ')}:</span>
                                <span>
                                  {limitType === 'monthly_listings' && product.usageCount !== undefined
                                    ? `${product.usageCount} / ${limitValue}`
                                    : `${limitValue} included`
                                  }
                                </span>
                              </div>
                              {product.usageCount !== undefined && (
                                <Progress 
                                  value={usagePercentage} 
                                  className="h-2"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products available</p>
              <p className="text-sm text-gray-500">Subscribe to a plan to access premium products and features</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Manage Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default">
              <Link href="/billing">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/subscription-management">
                <Settings className="h-4 w-4 mr-2" />
                Manage Subscription
              </Link>
            </Button>
            {!subscriptionData && (
              <Button asChild>
                <Link href="/billing">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}