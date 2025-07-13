import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  vehicleRecommendations?: VehicleRecommendation[];
}

interface VehicleRecommendation {
  make: string;
  model: string;
  engineCapacity: number;
  estimatedPrice: number;
  reason: string;
  suitability: string;
}

interface VehicleChatbotProps {
  onVehicleSelect?: (make: string, model: string) => void;
}

export function VehicleChatbot({ onVehicleSelect }: VehicleChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI vehicle advisor. I can help you find the perfect car based on your budget, needs, and preferences. What kind of vehicle are you looking for?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/chatbot/recommend', {
        message: input.trim(),
        conversationHistory: messages.slice(-5) // Send last 5 messages for context
      });

      const responseData = await response.json();
      console.log('Chatbot response:', responseData);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseData.message || responseData.content || "No response received",
        timestamp: new Date(),
        vehicleRecommendations: responseData.recommendations || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get chatbot response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Bot className="h-5 w-5" />
          AI Vehicle Advisor
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get personalized vehicle recommendations based on your needs and budget
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-purple-100">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-purple-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content || "Message content unavailable"}
                  </p>
                  
                  {message.vehicleRecommendations && message.vehicleRecommendations.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.vehicleRecommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-3 border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-purple-800">
                                {rec.make} {rec.model}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {rec.engineCapacity}cc
                              </p>
                            </div>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                              {formatCurrency(rec.estimatedPrice)}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-700 mb-2">{rec.reason}</p>
                          <p className="text-xs text-green-700 font-medium">{rec.suitability}</p>
                          {onVehicleSelect && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2 text-xs"
                              onClick={() => onVehicleSelect(rec.make, rec.model)}
                            >
                              Select This Vehicle
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </p>
                </div>
                
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 bg-blue-100">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-purple-100">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-purple-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about vehicles, budgets, or specific requirements..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Powered by AI • Press Enter to send
          </p>
        </div>
      </CardContent>
    </Card>
  );
}