import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  data?: any;
  conversationId?: string;
  messageId?: string;
  error?: string;
}

interface UseWebSocketOptions {
  url?: string;
  userId?: string;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket({
  url,
  userId,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
  reconnectInterval = 3000,
  maxReconnectAttempts = 10
}: UseWebSocketOptions) {
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Determine WebSocket URL
  const wsUrl = url || (() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}/ws`;
  })();

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN || isConnecting) {
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);

    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setIsConnecting(false);
        setConnectionError(null);
        reconnectAttempts.current = 0;

        // Authenticate if userId is provided
        if (userId) {
          sendMessage({
            type: 'authenticate',
            data: { token: userId }
          });
        }

        onConnect?.();
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log('WebSocket message received:', message);
          onMessage?.(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        setIsConnecting(false);
        ws.current = null;
        onDisconnect?.();

        // Attempt to reconnect if not intentionally closed
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
          
          reconnectTimeoutId.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setConnectionError('Max reconnection attempts reached');
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('WebSocket connection error');
        setIsConnecting(false);
        onError?.(error);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setIsConnecting(false);
      setConnectionError('Failed to create WebSocket connection');
    }
  }, [wsUrl, userId, onConnect, onMessage, onDisconnect, onError, reconnectInterval, maxReconnectAttempts, isConnecting]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }

    if (ws.current) {
      ws.current.close(1000, 'Intentional disconnect');
      ws.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    reconnectAttempts.current = 0;
  }, []);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      return true;
    } else {
      console.warn('WebSocket not connected, message not sent:', message);
      return false;
    }
  }, []);

  // WebSocket-specific messaging methods
  const joinConversation = useCallback((conversationId: string) => {
    return sendMessage({
      type: 'join_conversation',
      conversationId
    });
  }, [sendMessage]);

  const leaveConversation = useCallback((conversationId: string) => {
    return sendMessage({
      type: 'leave_conversation',
      conversationId
    });
  }, [sendMessage]);

  const sendChatMessage = useCallback((
    conversationId: string,
    receiverId: string,
    content: string,
    messageType: string = 'text',
    metadata?: any
  ) => {
    return sendMessage({
      type: 'send_message',
      data: {
        conversationId,
        receiverId,
        content,
        messageType,
        metadata
      }
    });
  }, [sendMessage]);

  const ping = useCallback(() => {
    return sendMessage({ type: 'ping' });
  }, [sendMessage]);

  // Auto-connect and cleanup
  useEffect(() => {
    if (userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);

  // Heartbeat to keep connection alive
  useEffect(() => {
    if (!isConnected) return;

    const heartbeatInterval = setInterval(() => {
      ping();
    }, 25000); // 25 seconds

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [isConnected, ping]);

  return {
    isConnected,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    sendMessage,
    joinConversation,
    leaveConversation,
    sendChatMessage,
    ping
  };
}