import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Navigation } from '@/components/navigation';

import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

import { 
  Eye, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
  Smartphone, 
  Monitor, 
  Tablet,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Target,
  Award,
  Lightbulb
} from 'lucide-react';

interface AnalyticsData {
  listingInfo: {
    id: number;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    status: string;
    daysOnMarket: number;
    createdAt: string;
  };
  performanceMetrics: {
    totalViews: number;
    uniqueVisitors: number;
    dailyTrend: Array<{
      date: string;
      views: number;
      uniqueVisitors: number;
    }>;
    impressions: number;
    clickThroughRate: number;
  };
  engagementMetrics: {
    inquiries: number;
    favorites: number;
    phoneClicks: number;
    shares: number;
    averageTimeSpent: number;
  };
  audienceInsights: {
    locationBreakdown: Record<string, number>;
    deviceBreakdown: {
      mobile: number;
      desktop: number;
      tablet: number;
    };
    activeHours: Record<string, number>;
  };
  marketBenchmark: {
    averagePrice: number;
    pricePosition: 'above' | 'below';
    similarListings: number;
    averageDaysOnMarket: number;
    competitiveAnalysis: {
      priceRange: {
        min: number;
        max: number;
      };
    };
  };
  qualityIndicators: {
    overall_score: number;
    photo_score: number;
    description_score: number;
    completeness_score: number;
    competitiveness_score: number;
    suggested_improvements: string[];
  };
  topKeywords: Array<{
    keyword: string;
    search_count: number;
    click_count: number;
  }>;
  recommendations: Array<{
    type: string;
    priority: string;
    title: string;
    description: string;
  }>;
}

export default function ListingAnalytics() {
  const [location, navigate] = useLocation();
  const listingId = location.split('listing/')[1]?.split('/analytics')[0];

  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['/api/listing', listingId, 'analytics'],
    enabled: !!listingId,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const deviceColors = ['#8884d8', '#82ca9d', '#ffc658'];
  const locationColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Unavailable</h2>
            <p className="text-gray-600 mb-4">
              Unable to load analytics data for this listing.
            </p>
            <Button onClick={() => navigate('/my-listings')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/my-listings')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Listings
              </Button>
              <Badge variant={analytics.listingInfo.status === 'active' ? 'default' : 'secondary'}>
                {analytics.listingInfo.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {analytics.listingInfo.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {analytics.listingInfo.daysOnMarket} days on market
              </span>
              <span>{formatCurrency(analytics.listingInfo.price)}</span>
            </div>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">{analytics.performanceMetrics.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unique Visitors</p>
                  <p className="text-2xl font-bold">{analytics.performanceMetrics.uniqueVisitors.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold">{analytics.engagementMetrics.inquiries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold">{analytics.engagementMetrics.favorites}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Views Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Views Trend (Last 30 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.performanceMetrics.dailyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                        name="Views"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="uniqueVisitors" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        fillOpacity={0.3}
                        name="Unique Visitors"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Engagement Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Engagement Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Click-Through Rate</span>
                    <span className="font-semibold">{analytics.performanceMetrics.clickThroughRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Phone Clicks</span>
                    <span className="font-semibold">{analytics.engagementMetrics.phoneClicks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shares</span>
                    <span className="font-semibold">{analytics.engagementMetrics.shares}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Time Spent</span>
                    <span className="font-semibold">{formatTime(analytics.engagementMetrics.averageTimeSpent)}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Conversion Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(analytics.engagementMetrics.inquiries / analytics.performanceMetrics.totalViews) * 100} 
                        className="flex-1" 
                      />
                      <span className="text-sm text-gray-600">
                        {((analytics.engagementMetrics.inquiries / analytics.performanceMetrics.totalViews) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Device Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={Object.entries(analytics.audienceInsights.deviceBreakdown).map(([key, value]) => ({
                          name: key.charAt(0).toUpperCase() + key.slice(1),
                          value,
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {Object.entries(analytics.audienceInsights.deviceBreakdown).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={deviceColors[index % deviceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Location Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Top Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(analytics.audienceInsights.locationBreakdown)
                    .sort(([,a], [,b]) => b - a)
                    .map(([location, count], index) => (
                      <div key={location} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{location}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(count / Math.max(...Object.values(analytics.audienceInsights.locationBreakdown))) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-8">{count}%</span>
                        </div>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>

              {/* Active Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Peak Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={Object.entries(analytics.audienceInsights.activeHours).map(([hour, value]) => ({
                      hour,
                      value,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Price Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Price</span>
                    <span className="font-semibold">{formatCurrency(analytics.listingInfo.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Market Average</span>
                    <span className="font-semibold">{formatCurrency(analytics.marketBenchmark.averagePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price Position</span>
                    <Badge 
                      variant={analytics.marketBenchmark.pricePosition === 'above' ? 'destructive' : 'default'}
                      className="capitalize"
                    >
                      {analytics.marketBenchmark.pricePosition} Market
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Market Range</p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Min: {formatCurrency(analytics.marketBenchmark.competitiveAnalysis.priceRange.min)}</span>
                      <span>Max: {formatCurrency(analytics.marketBenchmark.competitiveAnalysis.priceRange.max)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Market Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Similar Listings</span>
                    <span className="font-semibold">{analytics.marketBenchmark.similarListings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Days on Market</span>
                    <span className="font-semibold">{analytics.marketBenchmark.averageDaysOnMarket} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Days Listed</span>
                    <span className={`font-semibold ${analytics.listingInfo.daysOnMarket > analytics.marketBenchmark.averageDaysOnMarket ? 'text-red-600' : 'text-green-600'}`}>
                      {analytics.listingInfo.daysOnMarket} days
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quality Scores */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Quality Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Overall Score', score: analytics.qualityIndicators.overall_score },
                    { label: 'Photo Quality', score: analytics.qualityIndicators.photo_score },
                    { label: 'Description', score: analytics.qualityIndicators.description_score },
                    { label: 'Completeness', score: analytics.qualityIndicators.completeness_score },
                    { label: 'Competitiveness', score: analytics.qualityIndicators.competitiveness_score },
                  ].map(({ label, score }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className={`font-semibold ${getScoreColor(score)}`}>{score}/100</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Improvement Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analytics.qualityIndicators.suggested_improvements.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Top Search Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.topKeywords.map((keyword, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{keyword.keyword}</p>
                        <p className="text-sm text-gray-600">{keyword.search_count} searches</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{keyword.click_count} clicks</p>
                        <p className="text-xs text-gray-500">
                          {((keyword.click_count / keyword.search_count) * 100).toFixed(1)}% CTR
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}