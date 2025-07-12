import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  User, 
  Calendar, 
  Car, 
  Phone, 
  Eye,
  Mail,
  Clock,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";

interface Conversation {
  id: number;
  listingId: number;
  sellerId: string;
  buyerId: string;
  lastMessageAt: string;
  isActive: boolean;
  listingTitle: string;
  listingMake: string;
  listingModel: string;
  listingPrice: string;
  lastMessage: string;
  lastMessageType: string;
  lastMessageRead: boolean;
}

interface Message {
  id: number;
  listingId: number;
  sellerId: string;
  buyerId: string;
  message: string;
  messageType: string;
  sentAt: string;
  isRead: boolean;
}

export default function MyMessages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
  // Fetch user conversations
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery({
    queryKey: ['/api/user/messages'],
    queryFn: async () => {
      const response = await fetch('/api/user/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      return response.json();
    },
  });

  // Fetch messages for selected conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/conversation', selectedConversation?.id, 'messages'],
    queryFn: async () => {
      if (!selectedConversation) return [];
      const response = await fetch(`/api/conversation/${selectedConversation.id}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return response.json();
    },
    enabled: !!selectedConversation,
  });

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  if (conversationsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Messages</h1>
          <p className="text-gray-600">Manage your conversations with buyers and sellers</p>
        </div>

        {conversations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
              <p className="text-gray-600 mb-4">
                Start messaging buyers and sellers to see your conversations here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Conversations ({conversations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2 p-4">
                    {conversations.map((conversation: Conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedConversation?.id === conversation.id
                            ? 'bg-purple-50 border-purple-200'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {conversation.listingTitle}
                            </p>
                            <p className="text-xs text-gray-600">
                              {conversation.listingMake} {conversation.listingModel}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageAt)}
                          </span>
                        </div>
                        
                        {conversation.lastMessage && (
                          <p className="text-sm text-gray-600 truncate mb-2">
                            {conversation.lastMessage}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-purple-600">
                            {formatCurrency(conversation.listingPrice)}
                          </span>
                          {!conversation.lastMessageRead && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages Display */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedConversation.listingTitle}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {selectedConversation.listingMake} {selectedConversation.listingModel} • {formatCurrency(selectedConversation.listingPrice)}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {selectedConversation.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <Separator />
                  
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    {messagesLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p>No messages yet</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message: Message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.messageType === 'sent' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.messageType === 'sent'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <p className={`text-xs mt-1 ${
                                message.messageType === 'sent' ? 'text-purple-200' : 'text-gray-500'
                              }`}>
                                {formatTime(message.sentAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  
                  <Separator />
                  
                  <div className="p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Send
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Select a conversation to view messages</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}