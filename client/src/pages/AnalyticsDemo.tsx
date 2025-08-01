import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Search, MessageSquare, TrendingUp, Database, RefreshCw, Zap, Users, Eye, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  popularSearches: Array<{ query: string; count: number }>;
  userActivity: any;
  dailyAnalytics: any;
  cacheStats: any;
  systemHealth: any;
}

export default function AnalyticsDemo() {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch popular searches
  const { data: popularSearches, isLoading: searchLoading } = useQuery({
    queryKey: ['/api/analytics/popular-searches', timeframe],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/popular-searches?timeframe=${timeframe}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch popular searches');
      return response.json();
    }
  });

  // Fetch daily analytics (admin only)
  const { data: dailyAnalytics, isLoading: dailyLoading } = useQuery({
    queryKey: ['/api/analytics/daily'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/daily');
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Admin access required');
        }
        throw new Error('Failed to fetch daily analytics');
      }
      return response.json();
    },
    retry: false
  });

  // Fetch cache statistics
  const { data: cacheStats, isLoading: cacheLoading } = useQuery({
    queryKey: ['/api/analytics/cache-stats'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/cache-stats');
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Admin access required');
        }
        throw new Error('Failed to fetch cache stats');
      }
      return response.json();
    },
    retry: false
  });

  // Fetch system health
  const { data: systemHealth, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/analytics/health'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/health');
      if (!response.ok) throw new Error('Failed to fetch system health');
      return response.json();
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Fetch user activity (if user ID is provided)
  const { data: userActivity, isLoading: userLoading } = useQuery({
    queryKey: ['/api/analytics/user', selectedUserId, 'activity'],
    queryFn: async () => {
      if (!selectedUserId) return null;
      const response = await fetch(`/api/analytics/user/${selectedUserId}/activity?days=30`);
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied');
        }
        throw new Error('Failed to fetch user activity');
      }
      return response.json();
    },
    enabled: !!selectedUserId
  });

  // Clear cache mutation
  const clearCacheMutation = useMutation({
    mutationFn: async (tags?: string[]) => {
      const response = await fetch('/api/analytics/cache/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags })
      });
      if (!response.ok) throw new Error('Failed to clear cache');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Cache cleared successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics/cache-stats'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to clear cache',
        variant: 'destructive'
      });
    }
  });

  // Track demo events
  const trackEvent = async (eventType: string, data: any) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventType,
          data
        })
      });
      toast({ title: 'Event Tracked', description: `${eventType} event recorded` });
    } catch (error) {
      toast({ 
        title: 'Tracking Failed', 
        description: 'Could not track event',
        variant: 'destructive'
      });
    }
  };

  // Sample data for demonstration when real data isn't available
  const sampleSearchData = [
    { query: 'Toyota Corolla', count: 45 },
    { query: 'Honda Civic', count: 32 },
    { query: 'Nissan X-Trail', count: 28 },
    { query: 'Mazda Demio', count: 24 },
    { query: 'Mercedes C-Class', count: 19 }
  ];

  const healthColors = {
    healthy: '#22c55e',
    degraded: '#f59e0b',
    error: '#ef4444'
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics powered by hybrid PostgreSQL + MongoDB system
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => trackEvent('page_view', {
              pageUrl: '/analytics-demo',
              pageTitle: 'Analytics Dashboard Demo',
              referrer: document.referrer
            })}
            variant="outline"
            size="sm"
          >
            <Activity className="w-4 h-4 mr-2" />
            Track Page View
          </Button>
          <Button
            onClick={() => trackEvent('user_action', {
              action: 'demo_button_click',
              pageUrl: '/analytics-demo',
              metadata: { buttonType: 'demo' }
            })}
            variant="outline"
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Track Action
          </Button>
        </div>
      </div>

      <Tabs defaultValue="searches" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="searches">Popular Searches</TabsTrigger>
          <TabsTrigger value="user">User Activity</TabsTrigger>
          <TabsTrigger value="daily">Daily Analytics</TabsTrigger>
          <TabsTrigger value="cache">Cache Performance</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        {/* Popular Searches Tab */}
        <TabsContent value="searches" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => trackEvent('search', {
                query: 'Toyota Camry Nairobi',
                resultsCount: 12,
                filters: { make: 'Toyota', location: 'Nairobi' },
                executionTime: 245
              })}
              variant="outline"
              size="sm"
            >
              <Search className="w-4 h-4 mr-2" />
              Simulate Search
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Popular Search Terms ({timeframe})
              </CardTitle>
              <CardDescription>
                Most searched vehicle queries from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searchLoading ? (
                <div className="flex items-center justify-center h-64">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={popularSearches?.data || sampleSearchData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="query" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {popularSearches?.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularSearches.data.slice(0, 6).map((search: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{search.query}</span>
                      <Badge variant="secondary">{search.count}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* User Activity Tab */}
        <TabsContent value="user" className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter User ID (e.g., user_123456)"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="px-3 py-2 border rounded-md w-64"
            />
            <Button
              onClick={() => setSelectedUserId('user_1752183124979_u85ugjdgo')}
              variant="outline"
              size="sm"
            >
              Use Current User
            </Button>
          </div>

          {selectedUserId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Activity Summary
                </CardTitle>
                <CardDescription>
                  Activity for user: {selectedUserId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                ) : userActivity?.data ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {userActivity.data.totalPageViews || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Page Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {userActivity.data.totalSearches || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Searches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {userActivity.data.totalActions || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Actions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round(userActivity.data.avgSessionDuration || 0)}s
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Session</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No activity data available for this user
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Daily Analytics Tab */}
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Daily Analytics Overview
              </CardTitle>
              <CardDescription>
                Comprehensive daily metrics (Admin access required)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailyLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              ) : dailyAnalytics?.data ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {dailyAnalytics.data.totalPageViews || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Page Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {dailyAnalytics.data.totalSearches || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Searches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {dailyAnalytics.data.totalCalculations || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Duty Calculations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {dailyAnalytics.data.totalConversations || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Conversations</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Admin access required to view daily analytics
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cache Performance Tab */}
        <TabsContent value="cache" className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => clearCacheMutation.mutate()}
              disabled={clearCacheMutation.isPending}
              variant="outline"
            >
              {clearCacheMutation.isPending ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Database className="w-4 h-4 mr-2" />
              )}
              Clear All Cache
            </Button>
            <Button
              onClick={() => clearCacheMutation.mutate(['search_results'])}
              disabled={clearCacheMutation.isPending}
              variant="outline"
            >
              Clear Search Cache
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Cache Performance
              </CardTitle>
              <CardDescription>
                Hybrid memory + MongoDB cache statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cacheLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              ) : cacheStats?.data ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {cacheStats.data.memoryEntries || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Memory Cache</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {cacheStats.data.mongoEntries || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">MongoDB Cache</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(cacheStats.data.hitRate * 100) || 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Hit Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {cacheStats.data.totalHits + cacheStats.data.totalMisses || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Requests</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Admin access required to view cache statistics
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Health Status
              </CardTitle>
              <CardDescription>
                Real-time health monitoring of all services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {healthLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              ) : systemHealth ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: healthColors[systemHealth.status as keyof typeof healthColors] || '#6b7280' }}
                    />
                    <span className="font-medium">
                      Overall Status: {systemHealth.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </div>

                  {systemHealth.services && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(systemHealth.services).map(([service, status]: [string, any]) => (
                        <div key={service} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium capitalize">{service.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ 
                                backgroundColor: healthColors[
                                  (typeof status === 'object' ? status.status : status) as keyof typeof healthColors
                                ] || '#6b7280' 
                              }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {typeof status === 'object' ? status.status : status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(systemHealth.timestamp || Date.now()).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Unable to fetch system health status
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Demo Instructions Card */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Analytics Demo Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline">1</Badge>
            <div>
              <strong>Track Events:</strong> Click the "Track Page View" and "Track Action" buttons to see how events are recorded in MongoDB
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">2</Badge>
            <div>
              <strong>Search Analytics:</strong> Use the "Simulate Search" button to create search analytics data, then change timeframes to see results
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">3</Badge>
            <div>
              <strong>User Activity:</strong> Enter a user ID or click "Use Current User" to view individual user analytics
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">4</Badge>
            <div>
              <strong>Cache Management:</strong> Test the hybrid caching system by clearing cache and monitoring performance
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">5</Badge>
            <div>
              <strong>System Health:</strong> Monitor the real-time health of PostgreSQL, MongoDB, and all analytics services
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}