import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Circle, 
  CheckCircle2, 
  Clock,
  User,
  Car,
  Wifi,
  WifiOff,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  messageType: string;
  metadata?: any;
}

interface Conversation {
  id: string;
  listingId: number;
  buyerId: string;
  sellerId: string;
  metadata?: {
    vehicleMake?: string;
    vehicleModel?: string;
    listingPrice?: number;
    dealerName?: string;
  };
}

interface RealTimeMessagingProps {
  userId: string;
  conversationId?: string;
  onConversationChange?: (conversationId: string) => void;
}

export default function RealTimeMessaging({ 
  userId, 
  conversationId: initialConversationId,
  onConversationChange 
}: RealTimeMessagingProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle WebSocket messages
  const handleWebSocketMessage = (wsMessage: any) => {
    console.log('Received WebSocket message:', wsMessage);

    switch (wsMessage.type) {
      case 'authenticated':
        toast({
          title: 'Connected',
          description: 'Real-time messaging is now active'
        });
        break;

      case 'new_message':
        const newMessage: Message = {
          messageId: wsMessage.data.messageId,
          senderId: wsMessage.data.senderId,
          receiverId: wsMessage.data.receiverId,
          content: wsMessage.data.content,
          timestamp: wsMessage.data.timestamp,
          messageType: wsMessage.data.messageType,
          metadata: wsMessage.data.metadata
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Show notification if message is from someone else
        if (newMessage.senderId !== userId) {
          toast({
            title: 'New Message',
            description: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? '...' : '')
          });
        }
        break;

      case 'message_sent':
        // Message was successfully sent
        toast({
          title: 'Message Sent',
          description: 'Your message was delivered'
        });
        break;

      case 'message_notification':
        // Notification for messages in other conversations
        toast({
          title: 'New Message',
          description: `From ${wsMessage.data.senderId}: ${wsMessage.data.content}`
        });
        break;

      case 'conversation_updated':
        // Conversation metadata updated
        loadConversations();
        break;

      case 'error':
        toast({
          title: 'Error',
          description: wsMessage.error,
          variant: 'destructive'
        });
        break;
    }
  };

  // Initialize WebSocket
  const {
    isConnected,
    isConnecting,
    connectionError,
    joinConversation,
    leaveConversation,
    sendChatMessage
  } = useWebSocket({
    userId,
    onMessage: handleWebSocketMessage,
    onConnect: () => {
      console.log('WebSocket connected successfully');
    },
    onDisconnect: () => {
      console.log('WebSocket disconnected');
    },
    onError: (error) => {
      console.error('WebSocket error:', error);
      toast({
        title: 'Connection Error',
        description: 'Real-time messaging unavailable',
        variant: 'destructive'
      });
    }
  });

  // Load conversations
  const loadConversations = async () => {
    try {
      const response = await fetch('/api/messaging/conversations');
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingConversations(false);
    }
  };

  // Load messages for a conversation
  const loadMessages = async (conversationId: string) => {
    setIsLoadingMessages(true);
    try {
      const response = await fetch(`/api/messaging/conversations/${conversationId}/messages`);
      const data = await response.json();
      
      const formattedMessages: Message[] = data.map((msg: any) => ({
        messageId: msg.id?.toString(),
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        content: msg.content,
        timestamp: msg.createdAt,
        messageType: msg.messageType || 'text',
        metadata: msg.metadata
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Switch conversation
  const switchConversation = async (conversation: Conversation) => {
    if (currentConversation) {
      leaveConversation(currentConversation.id);
    }

    setCurrentConversation(conversation);
    onConversationChange?.(conversation.id);
    
    // Join WebSocket room for real-time updates
    joinConversation(conversation.id);
    
    // Load messages
    await loadMessages(conversation.id);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentConversation || !isConnected) {
      return;
    }

    const receiverId = currentConversation.buyerId === userId ? 
      currentConversation.sellerId : currentConversation.buyerId;

    // Send via WebSocket for real-time delivery
    const sent = sendChatMessage(
      currentConversation.id,
      receiverId,
      messageInput.trim()
    );

    if (sent) {
      // Optimistically add message to UI
      const optimisticMessage: Message = {
        messageId: `temp_${Date.now()}`,
        senderId: userId,
        receiverId,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
        messageType: 'text'
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
      setMessageInput('');
    } else {
      // Fallback to REST API if WebSocket is not available
      try {
        const response = await fetch(`/api/messaging/conversations/${currentConversation.id}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: messageInput.trim()
          })
        });

        if (response.ok) {
          setMessageInput('');
          await loadMessages(currentConversation.id);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to send message',
          variant: 'destructive'
        });
      }
    }
  };

  // Initialize
  useEffect(() => {
    loadConversations();
  }, []);

  // Handle initial conversation
  useEffect(() => {
    if (initialConversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === initialConversationId);
      if (conversation) {
        switchConversation(conversation);
      }
    }
  }, [initialConversationId, conversations]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="w-5 h-5" />
            Conversations
          </CardTitle>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Wifi className="w-3 h-3 mr-1" />
                Live
              </Badge>
            ) : isConnecting ? (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Clock className="w-3 h-3 mr-1" />
                Connecting...
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[480px]">
            {isLoadingConversations ? (
              <div className="p-4 text-center text-muted-foreground">
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No conversations yet
              </div>
            ) : (
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      currentConversation?.id === conversation.id
                        ? 'border-l-blue-500 bg-blue-50'
                        : 'border-l-transparent'
                    }`}
                    onClick={() => switchConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Car className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {conversation.metadata?.vehicleMake} {conversation.metadata?.vehicleModel}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {conversation.metadata?.dealerName || 'Vehicle Inquiry'}
                        </div>
                        {conversation.metadata?.listingPrice && (
                          <div className="text-xs text-green-600 font-medium">
                            KES {conversation.metadata.listingPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Messages Area */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentConversation ? (
                <>
                  <Car className="w-5 h-5" />
                  <span className="text-lg">
                    {currentConversation.metadata?.vehicleMake} {currentConversation.metadata?.vehicleModel}
                  </span>
                </>
              ) : (
                <span className="text-lg">Select a conversation</span>
              )}
            </div>
            {isConnected && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Circle className="w-2 h-2 mr-1 fill-current" />
                Live
              </Badge>
            )}
          </CardTitle>
          {currentConversation?.metadata?.listingPrice && (
            <CardDescription>
              Listed at KES {currentConversation.metadata.listingPrice.toLocaleString()}
            </CardDescription>
          )}
        </CardHeader>
        
        {currentConversation ? (
          <>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] p-4">
                {isLoadingMessages ? (
                  <div className="text-center text-muted-foreground">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.messageId}
                        className={`flex gap-2 ${
                          message.senderId === userId ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.senderId !== userId && (
                          <div className="bg-gray-100 p-2 rounded-full">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === userId
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="text-sm">{message.content}</div>
                          <div
                            className={`text-xs mt-2 flex items-center gap-1 ${
                              message.senderId === userId
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {message.senderId === userId && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                        {message.senderId === userId && (
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            
            <Separator />
            
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={!isConnected && connectionError !== null}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() || (!isConnected && connectionError !== null)}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {connectionError && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Connection error - messages will be sent via fallback</span>
                </div>
              )}
              
              {!isConnected && !connectionError && (
                <div className="flex items-center gap-2 mt-2 text-sm text-yellow-600">
                  <Clock className="w-4 h-4" />
                  <span>Connecting to real-time messaging...</span>
                </div>
              )}
            </CardContent>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a conversation to start messaging</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}