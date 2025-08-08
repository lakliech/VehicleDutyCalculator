import { getMongoCollections } from '../db/mongodb';
import { ObjectId } from 'mongodb';
import { 
  Conversation,
  ConversationInsert,
  Message,
  MessageInsert,
  NotificationTemplate 
} from '../../shared/mongodb-schemas';
import { IStorage } from '../storage';

export class MessagingService {
  private collections = getMongoCollections();

  constructor(private storage: IStorage) {
    if (!this.collections) {
      console.log('MongoDB not available, messaging will use fallback storage');
    }
  }

  // Create a new conversation
  async createConversation(listingId: number, buyerId: string, sellerId: string): Promise<string | null> {
    try {
      // Verify listing exists in PostgreSQL
      const listing = await this.storage.getListingById(listingId);
      if (!listing) {
        throw new Error('Listing not found');
      }

      // Check if conversation already exists
      if (this.collections) {
        const existingConversation = await this.collections.conversations.findOne({
          listingId,
          buyerId,
          sellerId,
          status: { $ne: 'closed' }
        });

        if (existingConversation) {
          return existingConversation._id.toString();
        }
      }

      const conversationData: ConversationInsert = {
        listingId,
        buyerId,
        sellerId,
        status: 'active',
        metadata: {
          vehicleMake: listing.make,
          vehicleModel: listing.model,
          listingPrice: Number(listing.price),
          dealerName: listing.sellerName || 'Unknown Seller'
        }
      };

      if (this.collections) {
        const result = await this.collections.conversations.insertOne({
          ...conversationData,
          lastMessageAt: new Date(),
          messageCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        return result.insertedId.toString();
      } else {
        // Fallback: log the conversation creation
        console.log('💬 Conversation Created:', JSON.stringify(conversationData, null, 2));
        return `fallback_${Date.now()}`;
      }
    } catch (error) {
      console.error('Failed to create conversation:', error);
      return null;
    }
  }

  // Send a message
  async sendMessage(
    conversationId: string, 
    senderId: string, 
    receiverId: string,
    content: string, 
    type: Message['type'] = 'text',
    metadata?: Message['metadata']
  ): Promise<string | null> {
    try {
      const messageData: MessageInsert = {
        conversationId,
        senderId,
        receiverId,
        content,
        type,
        status: 'sent' as const,
        metadata
      };

      if (this.collections) {
        // Insert message
        const messageResult = await this.collections.messages.insertOne({
          ...messageData,
          timestamp: new Date(),
          status: 'sent' as const
        });

        // Update conversation
        await this.collections.conversations.updateOne(
          { _id: new ObjectId(conversationId) },
          {
            $set: {
              lastMessageAt: new Date(),
              updatedAt: new Date()
            },
            $inc: { messageCount: 1 }
          }
        );

        // Trigger real-time WebSocket notification
        const wsService = (global as any).webSocketService;
        if (wsService) {
          await wsService.notifyNewMessage(
            conversationId,
            messageResult.insertedId.toString(),
            senderId,
            receiverId,
            content,
            type,
            metadata
          );
        }

        return messageResult.insertedId.toString();
      } else {
        // Fallback: log the message
        console.log('📨 Message Sent:', JSON.stringify(messageData, null, 2));
        return `fallback_msg_${Date.now()}`;
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      return null;
    }
  }

  // Get conversation messages
  async getConversationMessages(
    conversationId: string, 
    limit: number = 50, 
    offset: number = 0
  ): Promise<Message[]> {
    if (!this.collections) {
      return [];
    }

    try {
      const messages = await this.collections.messages
        .find({ conversationId })
        .sort({ timestamp: -1 })
        .skip(offset)
        .limit(limit)
        .toArray();

      return messages.map(msg => {
        const { _id, ...messageWithoutId } = msg;
        return messageWithoutId;
      }) as Message[];
    } catch (error) {
      console.error('Failed to get conversation messages:', error);
      return [];
    }
  }

  // Get user conversations
  async getUserConversations(userId: string, status?: Conversation['status']): Promise<any[]> {
    if (!this.collections) {
      return [];
    }

    try {
      const query: any = {
        $or: [
          { buyerId: userId },
          { sellerId: userId }
        ]
      };

      if (status) {
        query.status = status;
      }

      const conversations = await this.collections.conversations
        .find(query)
        .sort({ lastMessageAt: -1 })
        .toArray();

      // Enrich with listing data from PostgreSQL
      const enrichedConversations = await Promise.all(
        conversations.map(async (conv) => {
          try {
            const listing = await this.storage.getListingById(conv.listingId);
            return {
              ...conv,
              listing: listing ? {
                id: listing.id,
                title: listing.title,
                price: listing.price,
                imageUrl: (listing as any).imageUrl || listing.images?.[0] || null,
                location: listing.location
              } : null
            };
          } catch (error) {
            console.error(`Failed to get listing ${conv.listingId}:`, error);
            return conv;
          }
        })
      );

      return enrichedConversations;
    } catch (error) {
      console.error('Failed to get user conversations:', error);
      return [];
    }
  }

  // Mark messages as read
  async markMessagesAsRead(conversationId: string, userId: string): Promise<boolean> {
    if (!this.collections) {
      return false;
    }

    try {
      await this.collections.messages.updateMany(
        {
          conversationId,
          receiverId: userId,
          status: { $ne: 'read' }
        },
        {
          $set: { status: 'read' }
        }
      );

      return true;
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
      return false;
    }
  }

  // Get unread message count
  async getUnreadMessageCount(userId: string): Promise<number> {
    if (!this.collections) {
      return 0;
    }

    try {
      const count = await this.collections.messages.countDocuments({
        receiverId: userId,
        status: { $ne: 'read' }
      });

      return count;
    } catch (error) {
      console.error('Failed to get unread message count:', error);
      return 0;
    }
  }

  // Archive conversation
  async archiveConversation(conversationId: string, userId: string): Promise<boolean> {
    if (!this.collections) {
      return false;
    }

    try {
      // Verify user is part of the conversation
      const conversation = await this.collections.conversations.findOne({
        _id: new ObjectId(conversationId),
        $or: [
          { buyerId: userId },
          { sellerId: userId }
        ]
      });

      if (!conversation) {
        return false;
      }

      await this.collections.conversations.updateOne(
        { _id: new ObjectId(conversationId) },
        {
          $set: {
            status: 'archived',
            updatedAt: new Date()
          }
        }
      );

      return true;
    } catch (error) {
      console.error('Failed to archive conversation:', error);
      return false;
    }
  }

  // Create message template
  async createMessageTemplate(template: Omit<NotificationTemplate, 'createdAt' | 'updatedAt'>): Promise<string | null> {
    if (!this.collections) {
      console.log('📄 Template Created:', JSON.stringify(template, null, 2));
      return `fallback_template_${Date.now()}`;
    }

    try {
      const result = await this.collections.notificationTemplates.insertOne({
        ...template,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return result.insertedId.toString();
    } catch (error) {
      console.error('Failed to create message template:', error);
      return null;
    }
  }

  // Get message templates
  async getMessageTemplates(type?: NotificationTemplate['type'], category?: NotificationTemplate['category']): Promise<NotificationTemplate[]> {
    if (!this.collections) {
      return [];
    }

    try {
      const query: any = { isActive: true };
      if (type) query.type = type;
      if (category) query.category = category;

      const templates = await this.collections.notificationTemplates
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      return templates.map(template => {
        const { _id, ...templateWithoutId } = template;
        return templateWithoutId;
      }) as NotificationTemplate[];
    } catch (error) {
      console.error('Failed to get message templates:', error);
      return [];
    }
  }

  // Send templated message
  async sendTemplatedMessage(
    conversationId: string,
    senderId: string,
    receiverId: string,
    templateId: string,
    variables: Record<string, string>
  ): Promise<string | null> {
    if (!this.collections) {
      return null;
    }

    try {
      // Get template
      const template = await this.collections.notificationTemplates.findOne({
        _id: new ObjectId(templateId),
        isActive: true
      });

      if (!template) {
        throw new Error('Template not found');
      }

      // Replace variables in template
      let content = template.template;
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }

      // Send message
      const messageId = await this.sendMessage(
        conversationId,
        senderId,
        receiverId,
        content,
        'template',
        { templateId }
      );

      // Update template usage
      await this.collections.notificationTemplates.updateOne(
        { _id: new ObjectId(templateId) },
        {
          $inc: { 'usage.timesUsed': 1 },
          $set: { 'usage.lastUsed': new Date() }
        }
      );

      return messageId;
    } catch (error) {
      console.error('Failed to send templated message:', error);
      return null;
    }
  }

  // Notification helper (placeholder for real-time notifications)
  private async notifyParticipants(conversationId: string, messageId: string): Promise<void> {
    // TODO: Implement real-time notifications (WebSocket, Push, etc.)
    console.log(`📢 Notification: New message ${messageId} in conversation ${conversationId}`);
  }

  // Health check for messaging service
  async healthCheck(): Promise<{ status: string; details?: any }> {
    if (!this.collections) {
      return { status: 'unavailable', details: 'MongoDB not connected' };
    }

    try {
      // Test basic operations
      const testConv = await this.collections.conversations.findOne({}, { projection: { _id: 1 } });
      
      return { 
        status: 'healthy',
        details: {
          hasConversations: !!testConv,
          collections: ['conversations', 'messages', 'notificationTemplates']
        }
      };
    } catch (error) {
      return { 
        status: 'error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Create instance with storage injection
export function createMessagingService(storage: IStorage): MessagingService {
  return new MessagingService(storage);
}