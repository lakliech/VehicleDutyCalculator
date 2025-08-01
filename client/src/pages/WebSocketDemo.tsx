import { useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import RealTimeMessaging from '@/components/RealTimeMessaging';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wifi, 
  WifiOff, 
  MessageSquare, 
  Activity, 
  Clock,
  Users,
  Zap,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function WebSocketDemo() {
  const [wsStats, setWsStats] = useState<any>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const { toast } = useToast();

  // Mock user ID for demo - in real app this comes from auth
  const userId = "user_1752183124979_u85ugjdgo";

  const {
    isConnected,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    sendMessage,
    ping
  } = useWebSocket({
    userId,
    onMessage: (message) => {
      console.log('Demo received WebSocket message:', message);
    },
    onConnect: () => {
      toast({
        title: 'WebSocket Connected',
        description: 'Real-time messaging is now active'
      });
    },
    onDisconnect: () => {
      toast({
        title: 'WebSocket Disconnected',
        description: 'Real-time messaging is offline'
      });
    },
    onError: (error) => {
      toast({
        title: 'WebSocket Error',
        description: 'Connection error occurred',
        variant: 'destructive'
      });
    }
  });

  const loadWebSocketStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch('/api/websocket/stats');
      const data = await response.json();
      setWsStats(data);
    } catch (error) {
      console.error('Failed to load WebSocket stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const testWebSocket = () => {
    sendMessage({
      type: 'ping',
      data: { test: true, timestamp: new Date().toISOString() }
    });
    
    toast({
      title: 'Test Message Sent',
      description: 'Ping sent to WebSocket server'
    });
  };

  useEffect(() => {
    loadWebSocketStats();
    const interval = setInterval(loadWebSocketStats, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">WebSocket Real-Time Messaging Demo</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience true real-time notifications and instant message delivery powered by WebSocket technology
        </p>
      </div>

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">Connection Status</TabsTrigger>
          <TabsTrigger value="messaging">Live Messaging</TabsTrigger>
          <TabsTrigger value="stats">Server Stats</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* Connection Status */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className={`border-2 ${isConnected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {isConnected ? (
                    <Wifi className="w-5 h-5 text-green-600" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-600" />
                  )}
                  Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge 
                    variant="outline" 
                    className={`${
                      isConnected 
                        ? 'border-green-300 text-green-800 bg-green-100' 
                        : isConnecting
                        ? 'border-yellow-300 text-yellow-800 bg-yellow-100'
                        : 'border-red-300 text-red-800 bg-red-100'
                    }`}
                  >
                    {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
                  </Badge>
                  
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      onClick={isConnected ? disconnect : connect}
                      variant={isConnected ? "destructive" : "default"}
                      className="w-full"
                    >
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </Button>
                    
                    {isConnected && (
                      <Button 
                        size="sm" 
                        onClick={testWebSocket}
                        variant="outline"
                        className="w-full"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Test Connection
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">{isConnected ? 'Online' : 'Offline'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {isConnected ? 'Real-time active' : 'Polling fallback'}
                    </span>
                  </div>

                  {connectionError && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">{connectionError}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  User Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">User ID:</span>
                    <div className="text-xs text-muted-foreground break-all">
                      {userId}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm">
                      {isConnected ? 'Authenticated' : 'Not authenticated'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  Messaging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">
                      {isConnected ? 'Real-time ready' : 'REST fallback'}
                    </span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {isConnected 
                      ? 'Messages delivered instantly via WebSocket'
                      : 'Messages sent via HTTP API'
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connection Details */}
          <Card>
            <CardHeader>
              <CardTitle>WebSocket Connection Details</CardTitle>
              <CardDescription>Technical information about the real-time connection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Endpoint</h3>
                  <div className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {window.location.protocol === "https:" ? "wss:" : "ws:"}//{window.location.host}/ws
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Protocol</h3>
                  <div className="text-sm">
                    WebSocket (ws) with automatic reconnection
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="space-y-1 text-sm">
                    <div>✓ Real-time message delivery</div>
                    <div>✓ Automatic reconnection</div>
                    <div>✓ Heartbeat monitoring</div>
                    <div>✓ Room-based messaging</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Messaging */}
        <TabsContent value="messaging">
          <Card>
            <CardHeader>
              <CardTitle>Live Messaging Interface</CardTitle>
              <CardDescription>
                Experience real-time messaging with WebSocket technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RealTimeMessaging 
                userId={userId}
                onConversationChange={(conversationId) => {
                  console.log('Active conversation:', conversationId);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Server Stats */}
        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                WebSocket Server Statistics
                <Button 
                  size="sm" 
                  onClick={loadWebSocketStats}
                  disabled={isLoadingStats}
                >
                  {isLoadingStats ? 'Loading...' : 'Refresh'}
                </Button>
              </CardTitle>
              <CardDescription>Live statistics from the WebSocket server</CardDescription>
            </CardHeader>
            <CardContent>
              {wsStats ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {wsStats.totalConnections || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Connections</div>
                    <div className="text-xs text-gray-500">All WebSocket clients</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {wsStats.authenticatedUsers || 0}
                    </div>
                    <div className="text-sm text-gray-600">Authenticated Users</div>
                    <div className="text-xs text-gray-500">Logged in users</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {wsStats.activeConversations || 0}
                    </div>
                    <div className="text-sm text-gray-600">Active Conversations</div>
                    <div className="text-xs text-gray-500">With live participants</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {wsStats.error ? 'Error' : 'Healthy'}
                    </div>
                    <div className="text-sm text-gray-600">Server Status</div>
                    <div className="text-xs text-gray-500">
                      {wsStats.timestamp ? new Date(wsStats.timestamp).toLocaleTimeString() : 'Unknown'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500">Loading server statistics...</div>
                </div>
              )}
              
              {wsStats?.error && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Info className="w-4 h-4" />
                    <span className="font-medium">Note:</span>
                  </div>
                  <div className="text-sm text-yellow-700 mt-1">
                    {wsStats.error}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Zap className="w-5 h-5" />
                  Real-Time Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Instant message delivery (no polling)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Real-time conversation updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Live typing indicators (ready)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Message read receipts (ready)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Online presence indicators</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Activity className="w-5 h-5" />
                  System Reliability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Automatic reconnection on disconnect</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Heartbeat monitoring (30s intervals)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Graceful fallback to REST API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Connection error handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Room-based message isolation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <MessageSquare className="w-5 h-5" />
                  Messaging Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Join/leave conversation rooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Broadcast to conversation participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Direct user notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Message delivery confirmations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Cross-database integration</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Users className="w-5 h-5" />
                  Integration Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Seamless PostgreSQL data integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>MongoDB conversation storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Vehicle context in conversations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>User authentication verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Analytics and tracking integration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">WebSocket Implementation Summary</CardTitle>
              <CardDescription className="text-blue-700">
                Your Kenya Motor Vehicle Duty Calculator now has true real-time messaging capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Backend</h3>
                    <div className="text-sm space-y-1">
                      <div>✓ WebSocket server on /ws path</div>
                      <div>✓ Room-based messaging</div>
                      <div>✓ MongoDB integration</div>
                      <div>✓ Authentication handling</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">Frontend</h3>
                    <div className="text-sm space-y-1">
                      <div>✓ React WebSocket hook</div>
                      <div>✓ Real-time messaging component</div>
                      <div>✓ Automatic reconnection</div>
                      <div>✓ Error handling</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Integration</h3>
                    <div className="text-sm space-y-1">
                      <div>✓ PostgreSQL user verification</div>
                      <div>✓ Vehicle listing context</div>
                      <div>✓ Message persistence</div>
                      <div>✓ Analytics tracking</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Badge variant="outline" className="border-blue-300 text-blue-800 bg-blue-100">
                    🚀 Real-Time Messaging: Production Ready
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}