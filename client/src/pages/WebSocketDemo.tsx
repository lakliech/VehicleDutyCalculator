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
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">WebSocket Demo</h1>
        <p className="text-muted-foreground">
          Test and demonstrate real-time WebSocket messaging capabilities
        </p>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="stats">Server Stats</TabsTrigger>
          <TabsTrigger value="messaging">Messaging Test</TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                Connection Status
              </CardTitle>
              <CardDescription>
                WebSocket connection status and controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant={isConnected ? 'default' : 'destructive'}>
                  {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
                </Badge>
                {connectionError && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Error: {connectionError}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={connect} 
                  disabled={isConnected || isConnecting}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Connect
                </Button>
                <Button 
                  onClick={disconnect} 
                  disabled={!isConnected}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <WifiOff className="h-4 w-4" />
                  Disconnect
                </Button>
                <Button 
                  onClick={testWebSocket} 
                  disabled={!isConnected}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Test Ping
                </Button>
              </div>

              {isConnected && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">WebSocket Active</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                    Real-time messaging is enabled and ready for use.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Server Statistics
              </CardTitle>
              <CardDescription>
                Real-time WebSocket server metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={loadWebSocketStats} 
                disabled={isLoadingStats}
                className="mb-4"
              >
                {isLoadingStats ? 'Loading...' : 'Refresh Stats'}
              </Button>

              {wsStats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">Total Connections:</span>
                      <Badge>{wsStats.totalConnections}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-medium">Authenticated Users:</span>
                      <Badge>{wsStats.authenticatedUsers}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="font-medium">Active Conversations:</span>
                      <Badge>{wsStats.activeConversations}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Last Updated:</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(wsStats.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Info className="h-8 w-8 mx-auto mb-2" />
                  <p>No statistics available. Click "Refresh Stats" to load.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Real-Time Messaging Test
              </CardTitle>
              <CardDescription>
                Test the real-time messaging component
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isConnected ? (
                <RealTimeMessaging userId={userId} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <WifiOff className="h-8 w-8 mx-auto mb-2" />
                  <p>Connect to WebSocket to test messaging</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}