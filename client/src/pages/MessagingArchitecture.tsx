import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Database, 
  Users, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Zap,
  Clock,
  Bell,
  GitBranch,
  Server,
  Monitor,
  Smartphone,
  Send
} from 'lucide-react';

export default function MessagingArchitecture() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Messaging Architecture</h1>
        <p className="text-muted-foreground">
          Overview of the real-time messaging system implementation
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flow">Data Flow</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                System Architecture
              </CardTitle>
              <CardDescription>
                High-level view of the messaging system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Monitor className="h-5 w-5 text-blue-600" />
                      Frontend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">React Components</Badge>
                    <Badge variant="outline">WebSocket Hooks</Badge>
                    <Badge variant="outline">Real-time UI</Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Server className="h-5 w-5 text-green-600" />
                      Backend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">WebSocket Server</Badge>
                    <Badge variant="outline">Express Routes</Badge>
                    <Badge variant="outline">Message Services</Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Database className="h-5 w-5 text-purple-600" />
                      Storage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">MongoDB</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">Hybrid Strategy</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-4">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Real-time Communication</span>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Message Flow
              </CardTitle>
              <CardDescription>
                How messages flow through the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                    1
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    <span className="font-medium">User sends message</span>
                  </div>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                    2
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    <span className="font-medium">WebSocket receives message</span>
                  </div>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm font-bold">
                    3
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <span className="font-medium">Message stored in MongoDB</span>
                  </div>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full text-sm font-bold">
                    4
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Real-time notification sent</span>
                  </div>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-cyan-600 text-white rounded-full text-sm font-bold">
                    5
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Recipients receive instantly</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Frontend Components
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>RealTimeMessaging</span>
                  <Badge variant="outline">React Component</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>useWebSocket</span>
                  <Badge variant="outline">Custom Hook</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>WebSocketDemo</span>
                  <Badge variant="outline">Demo Page</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Message UI</span>
                  <Badge variant="outline">Interface</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Backend Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>WebSocketService</span>
                  <Badge variant="outline">Core Service</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>MessagingService</span>
                  <Badge variant="outline">Business Logic</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>MongoDB Driver</span>
                  <Badge variant="outline">Database</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>REST API</span>
                  <Badge variant="outline">HTTP Interface</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Real-time Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Instant message delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Connection status indicators</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Automatic reconnection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Message persistence</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Performance Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Heartbeat monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Connection pooling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Message queuing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Error handling</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}