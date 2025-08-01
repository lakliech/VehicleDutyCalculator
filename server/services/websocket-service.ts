import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { MessagingService } from './messaging-service';
import { IStorage } from '../storage';
// import jwt from 'jsonwebtoken'; // Not needed for current implementation

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  isAlive?: boolean;
}

interface WebSocketMessage {
  type: 'join_conversation' | 'leave_conversation' | 'send_message' | 'ping' | 'pong';
  data?: any;
  conversationId?: string;
  messageId?: string;
  error?: string;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private connections: Map<string, Set<AuthenticatedWebSocket>> = new Map();
  private conversationRooms: Map<string, Set<AuthenticatedWebSocket>> = new Map();
  private messagingService: MessagingService;

  constructor(server: Server, storage: IStorage) {
    // Create WebSocket server on /ws path to avoid conflicts with Vite HMR
    this.wss = new WebSocketServer({ 
      server, 
      path: '/ws',
      verifyClient: (info) => {
        // Allow all connections - we'll authenticate on message
        return true;
      }
    });

    this.messagingService = new MessagingService(storage);
    this.setupWebSocketServer();
    this.startHeartbeat();

    console.log('WebSocket service initialized on /ws path');
  }

  private setupWebSocketServer() {
    this.wss.on('connection', (ws: AuthenticatedWebSocket, request) => {
      console.log('New WebSocket connection from:', request.socket.remoteAddress);
      
      ws.isAlive = true;
      
      // Handle pong response for heartbeat
      ws.on('pong', () => {
        ws.isAlive = true;
      });

      ws.on('message', async (data: Buffer) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          await this.handleMessage(ws, message);
        } catch (error) {
          console.error('WebSocket message error:', error);
          this.sendError(ws, 'Invalid message format');
        }
      });

      ws.on('close', () => {
        this.handleDisconnection(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.handleDisconnection(ws);
      });

      // Send welcome message
      this.sendMessage(ws, {
        type: 'connection',
        data: { status: 'connected', timestamp: new Date().toISOString() }
      });
    });
  }

  private async handleMessage(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    switch (message.type) {
      case 'authenticate':
        await this.handleAuthentication(ws, message.data);
        break;
      
      case 'join_conversation':
        await this.handleJoinConversation(ws, message.conversationId!);
        break;
      
      case 'leave_conversation':
        await this.handleLeaveConversation(ws, message.conversationId!);
        break;
      
      case 'send_message':
        await this.handleSendMessage(ws, message);
        break;
      
      case 'ping':
        this.sendMessage(ws, { type: 'pong' });
        break;
      
      default:
        this.sendError(ws, `Unknown message type: ${message.type}`);
    }
  }

  private async handleAuthentication(ws: AuthenticatedWebSocket, authData: any) {
    try {
      // Extract token from authorization header or message data
      const token = authData?.token || authData?.authorization?.replace('Bearer ', '');
      
      if (!token) {
        this.sendError(ws, 'Authentication token required');
        return;
      }

      // For now, we'll use a simple approach - in production you'd verify JWT
      // This assumes the token is the user ID (from your session system)
      const userId = token;
      
      if (!userId) {
        this.sendError(ws, 'Invalid authentication token');
        return;
      }

      ws.userId = userId;
      
      // Add to user connections
      if (!this.connections.has(userId)) {
        this.connections.set(userId, new Set());
      }
      this.connections.get(userId)!.add(ws);

      this.sendMessage(ws, {
        type: 'authenticated',
        data: { userId, timestamp: new Date().toISOString() }
      });

      console.log(`User ${userId} authenticated via WebSocket`);
    } catch (error) {
      console.error('Authentication error:', error);
      this.sendError(ws, 'Authentication failed');
    }
  }

  private async handleJoinConversation(ws: AuthenticatedWebSocket, conversationId: string) {
    if (!ws.userId) {
      this.sendError(ws, 'Must authenticate first');
      return;
    }

    try {
      // Verify user is part of this conversation
      const conversations = await this.messagingService.getUserConversations(ws.userId);
      const conversation = conversations.find(c => c.id === conversationId);
      
      if (!conversation) {
        this.sendError(ws, 'Access denied to conversation');
        return;
      }

      // Add to conversation room
      if (!this.conversationRooms.has(conversationId)) {
        this.conversationRooms.set(conversationId, new Set());
      }
      this.conversationRooms.get(conversationId)!.add(ws);

      this.sendMessage(ws, {
        type: 'joined_conversation',
        data: { conversationId, timestamp: new Date().toISOString() }
      });

      console.log(`User ${ws.userId} joined conversation ${conversationId}`);
    } catch (error) {
      console.error('Join conversation error:', error);
      this.sendError(ws, 'Failed to join conversation');
    }
  }

  private async handleLeaveConversation(ws: AuthenticatedWebSocket, conversationId: string) {
    const room = this.conversationRooms.get(conversationId);
    if (room) {
      room.delete(ws);
      if (room.size === 0) {
        this.conversationRooms.delete(conversationId);
      }
    }

    this.sendMessage(ws, {
      type: 'left_conversation',
      data: { conversationId, timestamp: new Date().toISOString() }
    });

    console.log(`User ${ws.userId} left conversation ${conversationId}`);
  }

  private async handleSendMessage(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    if (!ws.userId) {
      this.sendError(ws, 'Must authenticate first');
      return;
    }

    try {
      const { conversationId, content, receiverId, messageType = 'text' } = message.data;

      if (!conversationId || !content || !receiverId) {
        this.sendError(ws, 'Missing required message data');
        return;
      }

      // Send message via messaging service
      const messageId = await this.messagingService.sendMessage(
        conversationId,
        ws.userId,
        receiverId,
        content,
        messageType,
        message.data.metadata
      );

      if (!messageId) {
        this.sendError(ws, 'Failed to send message');
        return;
      }

      // Broadcast to conversation room
      await this.broadcastToConversation(conversationId, {
        type: 'new_message',
        data: {
          messageId,
          conversationId,
          senderId: ws.userId,
          receiverId,
          content,
          messageType,
          timestamp: new Date().toISOString(),
          metadata: message.data.metadata
        }
      });

      // Send confirmation to sender
      this.sendMessage(ws, {
        type: 'message_sent',
        data: {
          messageId,
          conversationId,
          timestamp: new Date().toISOString()
        }
      });

      console.log(`Message sent: ${messageId} in conversation ${conversationId}`);
    } catch (error) {
      console.error('Send message error:', error);
      this.sendError(ws, 'Failed to send message');
    }
  }

  private handleDisconnection(ws: AuthenticatedWebSocket) {
    if (ws.userId) {
      // Remove from user connections
      const userConnections = this.connections.get(ws.userId);
      if (userConnections) {
        userConnections.delete(ws);
        if (userConnections.size === 0) {
          this.connections.delete(ws.userId);
        }
      }

      // Remove from all conversation rooms
      for (const [conversationId, room] of this.conversationRooms.entries()) {
        room.delete(ws);
        if (room.size === 0) {
          this.conversationRooms.delete(conversationId);
        }
      }

      console.log(`User ${ws.userId} disconnected from WebSocket`);
    }
  }

  // Public methods for external use

  public async notifyNewMessage(
    conversationId: string,
    messageId: string,
    senderId: string,
    receiverId: string,
    content: string,
    messageType: string = 'text',
    metadata?: any
  ) {
    await this.broadcastToConversation(conversationId, {
      type: 'new_message',
      data: {
        messageId,
        conversationId,
        senderId,
        receiverId,
        content,
        messageType,
        timestamp: new Date().toISOString(),
        metadata
      }
    });

    // Also notify specific user if they're connected but not in the conversation room
    await this.notifyUser(receiverId, {
      type: 'message_notification',
      data: {
        messageId,
        conversationId,
        senderId,
        content: content.substring(0, 100), // Truncated for notification
        timestamp: new Date().toISOString()
      }
    });
  }

  public async notifyConversationUpdate(conversationId: string, updateData: any) {
    await this.broadcastToConversation(conversationId, {
      type: 'conversation_updated',
      data: {
        conversationId,
        ...updateData,
        timestamp: new Date().toISOString()
      }
    });
  }

  public async notifyUser(userId: string, message: WebSocketMessage) {
    const userConnections = this.connections.get(userId);
    if (userConnections) {
      const messageStr = JSON.stringify(message);
      userConnections.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(messageStr);
        }
      });
    }
  }

  private async broadcastToConversation(conversationId: string, message: WebSocketMessage) {
    const room = this.conversationRooms.get(conversationId);
    if (room) {
      const messageStr = JSON.stringify(message);
      room.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(messageStr);
        }
      });
    }
  }

  private sendMessage(ws: WebSocket, message: WebSocketMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private sendError(ws: WebSocket, error: string) {
    this.sendMessage(ws, {
      type: 'error',
      error
    });
  }

  private startHeartbeat() {
    const interval = setInterval(() => {
      this.wss.clients.forEach((ws: AuthenticatedWebSocket) => {
        if (ws.isAlive === false) {
          console.log('Terminating dead WebSocket connection');
          return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
      });
    }, 30000); // 30 second heartbeat

    this.wss.on('close', () => {
      clearInterval(interval);
    });
  }

  public getStats() {
    return {
      totalConnections: this.wss.clients.size,
      authenticatedUsers: this.connections.size,
      activeConversations: this.conversationRooms.size,
      timestamp: new Date().toISOString()
    };
  }

  public close() {
    this.wss.close();
  }
}