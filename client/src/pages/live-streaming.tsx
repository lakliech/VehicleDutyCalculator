
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Video, Calendar, Users, MessageCircle, Send, 
  Eye, Heart, Share2, Clock, Car, Play, Pause,
  Mic, MicOff, VideoOff, Settings
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { format } from "date-fns";

interface LiveStream {
  id: number;
  streamId: string;
  title: string;
  description?: string;
  sellerId: string;
  status: string;
  viewerCount: number;
  scheduledAt: string;
  startedAt?: string;
  chatEnabled: boolean;
  streamUrl?: string;
}

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  messageType: string;
  timestamp: string;
  isHighlighted: boolean;
}

export default function LiveStreaming() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [activeStream, setActiveStream] = useState<LiveStream | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamSettings, setStreamSettings] = useState({
    micEnabled: true,
    cameraEnabled: true,
    chatEnabled: true
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch active streams
  const { data: streams = [], isLoading } = useQuery<LiveStream[]>({
    queryKey: ['/api/social-commerce/streams/active'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Fetch chat messages for active stream
  const { data: chatMessages = [] } = useQuery<ChatMessage[]>({
    queryKey: [`/api/social-commerce/streams/${activeStream?.streamId}/chat`],
    enabled: !!activeStream,
    refetchInterval: 2000 // Refresh every 2 seconds
  });

  // Join stream mutation
  const joinStreamMutation = useMutation({
    mutationFn: async (streamId: string) => {
      const response = await fetch(`/api/social-commerce/streams/${streamId}/join`, {
        method: 'POST',
        credentials: 'include'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-commerce/streams/active'] });
    }
  });

  // Send chat message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ streamId, message, messageType = 'chat' }: { 
      streamId: string; 
      message: string; 
      messageType?: string;
    }) => {
      const response = await fetch(`/api/social-commerce/streams/${streamId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message, messageType })
      });
      return response.json();
    },
    onSuccess: () => {
      setChatMessage("");
      queryClient.invalidateQueries({ 
        queryKey: [`/api/social-commerce/streams/${activeStream?.streamId}/chat`] 
      });
    }
  });

  const handleJoinStream = (stream: LiveStream) => {
    if (isAuthenticated) {
      setActiveStream(stream);
      joinStreamMutation.mutate(stream.streamId);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() && activeStream) {
      const messageType = chatMessage.startsWith('?') ? 'question' : 
                         chatMessage.toLowerCase().includes('interested') ? 'interest' : 
                         'chat';
      
      sendMessageMutation.mutate({
        streamId: activeStream.streamId,
        message: chatMessage,
        messageType
      });
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Vehicle Demos</h1>
        <p className="text-gray-600">
          Watch live demonstrations of vehicles from verified dealers and sellers
        </p>
      </div>

      {activeStream ? (
        // Active Stream View
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Stream Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-t-lg relative">
                  {activeStream.streamUrl ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      src={activeStream.streamUrl}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="text-center">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Stream will begin shortly...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Stream Status Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                      {activeStream.status === 'live' ? '🔴 LIVE' : '⏳ SCHEDULED'}
                    </Badge>
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      {activeStream.viewerCount} viewing
                    </Badge>
                  </div>

                  {/* Stream Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stream Info */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{activeStream.title}</h2>
                  {activeStream.description && (
                    <p className="text-gray-600 mb-4">{activeStream.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Started {format(new Date(activeStream.startedAt || activeStream.scheduledAt), 'HH:mm')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {activeStream.viewerCount} viewers
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      Vehicle Demo
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="w-5 h-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              
              <Separator />
              
              {/* Chat Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`${
                          message.messageType === 'question' ? 'bg-blue-50 p-2 rounded' :
                          message.messageType === 'interest' ? 'bg-green-50 p-2 rounded' :
                          ''
                        } ${message.isHighlighted ? 'bg-yellow-50 border border-yellow-200 p-2 rounded' : ''}`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {message.username}
                            </p>
                            <p className="text-sm text-gray-700 break-words">
                              {message.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(message.timestamp), 'HH:mm')}
                            </p>
                          </div>
                          {message.messageType === 'question' && (
                            <Badge variant="outline" className="text-xs">?</Badge>
                          )}
                          {message.messageType === 'interest' && (
                            <Badge variant="outline" className="text-xs bg-green-100">💚</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Chat Input */}
              {isAuthenticated && activeStream.chatEnabled && (
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleSendMessage}
                      disabled={!chatMessage.trim() || sendMessageMutation.isPending}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    💡 Start with "?" for questions, mention "interested" to show interest
                  </div>
                </div>
              )}
              
              {!isAuthenticated && (
                <div className="p-4 border-t text-center">
                  <p className="text-sm text-gray-500 mb-2">Sign in to join the chat</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      ) : (
        // Stream Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Live Streams</h3>
              <p className="text-gray-600">Check back later for live vehicle demonstrations</p>
            </div>
          ) : (
            streams.map((stream) => (
              <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  {/* Thumbnail placeholder */}
                  <div className="flex items-center justify-center h-full">
                    <Car className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant={stream.status === 'live' ? 'destructive' : 'secondary'}>
                      {stream.status === 'live' ? (
                        <>🔴 LIVE</>
                      ) : (
                        <>⏰ {format(new Date(stream.scheduledAt), 'HH:mm')}</>
                      )}
                    </Badge>
                  </div>

                  {/* Viewer Count */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      {stream.viewerCount}
                    </Badge>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16"
                      onClick={() => handleJoinStream(stream)}
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{stream.title}</h3>
                  {stream.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{stream.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {stream.status === 'live' ? 'Live now' : 
                       `Scheduled for ${format(new Date(stream.scheduledAt), 'MMM dd, HH:mm')}`}
                    </div>
                    {stream.chatEnabled && (
                      <Badge variant="outline">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Back to Streams Button */}
      {activeStream && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setActiveStream(null)}>
            ← Back to All Streams
          </Button>
        </div>
      )}
    </div>
  );
}
