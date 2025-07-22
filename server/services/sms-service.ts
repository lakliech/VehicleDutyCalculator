import { db } from "../db";
import { smsTemplates, smsLogs, messageNotificationSettings } from "@shared/schema";
import { eq, and, inArray, desc, count } from "drizzle-orm";

// SMS Provider interfaces
export interface SMSProvider {
  name: string;
  sendSMS(to: string, message: string, options?: any): Promise<SMSResult>;
  sendBulkSMS(recipients: BulkSMSRecipient[], message: string, options?: any): Promise<BulkSMSResult>;
}

export interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
  cost?: number;
  provider: string;
}

export interface BulkSMSResult {
  success: boolean;
  totalSent: number;
  totalFailed: number;
  results: Array<{
    recipient: string;
    success: boolean;
    messageId?: string;
    error?: string;
  }>;
  totalCost?: number;
  provider: string;
}

export interface BulkSMSRecipient {
  phoneNumber: string;
  userId?: string;
  customData?: Record<string, any>;
}

// Africa's Talking Provider
export class AfricasTalkingProvider implements SMSProvider {
  name = "africas_talking";
  private apiKey: string;
  private username: string;

  constructor(apiKey: string, username: string) {
    this.apiKey = apiKey;
    this.username = username;
  }

  async sendSMS(to: string, message: string, options?: any): Promise<SMSResult> {
    try {
      const response = await fetch('https://api.africastalking.com/version1/messaging', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey,
        },
        body: new URLSearchParams({
          username: this.username,
          to: to,
          message: message,
          from: options?.from || undefined,
        }),
      });

      const data = await response.json();
      
      if (data.SMSMessageData?.Recipients?.[0]?.status === 'Success') {
        return {
          success: true,
          messageId: data.SMSMessageData.Recipients[0].messageId,
          cost: data.SMSMessageData.Recipients[0].cost,
          provider: this.name,
        };
      } else {
        return {
          success: false,
          error: data.SMSMessageData?.Recipients?.[0]?.status || 'Unknown error',
          provider: this.name,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        provider: this.name,
      };
    }
  }

  async sendBulkSMS(recipients: BulkSMSRecipient[], message: string, options?: any): Promise<BulkSMSResult> {
    const phoneNumbers = recipients.map(r => r.phoneNumber).join(',');
    
    try {
      const response = await fetch('https://api.africastalking.com/version1/messaging', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey,
        },
        body: new URLSearchParams({
          username: this.username,
          to: phoneNumbers,
          message: message,
          from: options?.from || undefined,
        }),
      });

      const data = await response.json();
      const results = data.SMSMessageData?.Recipients || [];
      
      return {
        success: true,
        totalSent: results.filter((r: any) => r.status === 'Success').length,
        totalFailed: results.filter((r: any) => r.status !== 'Success').length,
        results: results.map((r: any) => ({
          recipient: r.number,
          success: r.status === 'Success',
          messageId: r.messageId,
          error: r.status !== 'Success' ? r.status : undefined,
        })),
        totalCost: results.reduce((sum: number, r: any) => sum + (parseFloat(r.cost) || 0), 0),
        provider: this.name,
      };
    } catch (error) {
      return {
        success: false,
        totalSent: 0,
        totalFailed: recipients.length,
        results: recipients.map(r => ({
          recipient: r.phoneNumber,
          success: false,
          error: error instanceof Error ? error.message : 'Network error',
        })),
        provider: this.name,
      };
    }
  }
}

// Twilio Provider
export class TwilioProvider implements SMSProvider {
  name = "twilio";
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor(accountSid: string, authToken: string, fromNumber: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumber = fromNumber;
  }

  async sendSMS(to: string, message: string, options?: any): Promise<SMSResult> {
    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: options?.from || this.fromNumber,
          To: to,
          Body: message,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          messageId: data.sid,
          provider: this.name,
        };
      } else {
        return {
          success: false,
          error: data.message || 'Unknown error',
          provider: this.name,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        provider: this.name,
      };
    }
  }

  async sendBulkSMS(recipients: BulkSMSRecipient[], message: string, options?: any): Promise<BulkSMSResult> {
    const results = [];
    let totalSent = 0;
    let totalFailed = 0;

    // Twilio doesn't have native bulk SMS, so we send individually
    for (const recipient of recipients) {
      const result = await this.sendSMS(recipient.phoneNumber, message, options);
      results.push({
        recipient: recipient.phoneNumber,
        success: result.success,
        messageId: result.messageId,
        error: result.error,
      });
      
      if (result.success) {
        totalSent++;
      } else {
        totalFailed++;
      }
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return {
      success: totalSent > 0,
      totalSent,
      totalFailed,
      results,
      provider: this.name,
    };
  }
}

// SMS Service Class
export class SMSService {
  private providers: Map<string, SMSProvider> = new Map();
  private defaultProvider: string | null = null;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize Africa's Talking if credentials are available
    if (process.env.AFRICAS_TALKING_API_KEY && process.env.AFRICAS_TALKING_USERNAME) {
      const provider = new AfricasTalkingProvider(
        process.env.AFRICAS_TALKING_API_KEY,
        process.env.AFRICAS_TALKING_USERNAME
      );
      this.providers.set('africas_talking', provider);
      if (!this.defaultProvider) this.defaultProvider = 'africas_talking';
    }

    // Initialize Twilio if credentials are available
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      const provider = new TwilioProvider(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
        process.env.TWILIO_PHONE_NUMBER
      );
      this.providers.set('twilio', provider);
      if (!this.defaultProvider) this.defaultProvider = 'twilio';
    }
  }

  addProvider(name: string, provider: SMSProvider) {
    this.providers.set(name, provider);
    if (!this.defaultProvider) this.defaultProvider = name;
  }

  setDefaultProvider(name: string) {
    if (this.providers.has(name)) {
      this.defaultProvider = name;
    } else {
      throw new Error(`Provider ${name} not found`);
    }
  }

  private getProvider(providerName?: string): SMSProvider {
    const name = providerName || this.defaultProvider;
    if (!name) {
      throw new Error('No SMS provider configured');
    }
    
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`SMS provider ${name} not found`);
    }
    
    return provider;
  }

  async sendSMS(to: string, message: string, options?: {
    provider?: string;
    templateId?: number;
    userId?: string;
    context?: Record<string, any>;
  }): Promise<SMSResult> {
    try {
      // Normalize phone number
      const normalizedPhone = this.normalizePhoneNumber(to);
      
      // Get message content (either direct message or from template)
      let finalMessage = message;
      if (options?.templateId) {
        finalMessage = await this.renderTemplate(options.templateId, options.context || {});
      }

      // Send SMS
      const provider = this.getProvider(options?.provider);
      const result = await provider.sendSMS(normalizedPhone, finalMessage);

      // Log the SMS
      await this.logSMS({
        userId: options?.userId,
        phoneNumber: normalizedPhone,
        message: finalMessage,
        templateId: options?.templateId,
        provider: result.provider,
        success: result.success,
        messageId: result.messageId,
        error: result.error,
        cost: result.cost,
      });

      return result;
    } catch (error) {
      console.error('Error sending SMS:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: options?.provider || this.defaultProvider || 'unknown',
      };
    }
  }

  async sendBulkSMS(recipients: BulkSMSRecipient[], message: string, options?: {
    provider?: string;
    templateId?: number;
    context?: Record<string, any>;
    checkUserPreferences?: boolean;
  }): Promise<BulkSMSResult> {
    try {
      // Filter recipients based on preferences if requested
      let filteredRecipients = recipients;
      if (options?.checkUserPreferences) {
        filteredRecipients = await this.filterRecipientsByPreferences(recipients);
      }

      // Normalize phone numbers
      filteredRecipients = filteredRecipients.map(r => ({
        ...r,
        phoneNumber: this.normalizePhoneNumber(r.phoneNumber)
      }));

      // Get message content
      let finalMessage = message;
      if (options?.templateId) {
        finalMessage = await this.renderTemplate(options.templateId, options.context || {});
      }

      // Send bulk SMS
      const provider = this.getProvider(options?.provider);
      const result = await provider.sendBulkSMS(filteredRecipients, finalMessage);

      // Log all SMS results
      await Promise.all(result.results.map(r => 
        this.logSMS({
          userId: filteredRecipients.find(fr => fr.phoneNumber === r.recipient)?.userId,
          phoneNumber: r.recipient,
          message: finalMessage,
          templateId: options?.templateId,
          provider: result.provider,
          success: r.success,
          messageId: r.messageId,
          error: r.error,
          isBulk: true,
        })
      ));

      return result;
    } catch (error) {
      console.error('Error sending bulk SMS:', error);
      return {
        success: false,
        totalSent: 0,
        totalFailed: recipients.length,
        results: recipients.map(r => ({
          recipient: r.phoneNumber,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })),
        provider: options?.provider || this.defaultProvider || 'unknown',
      };
    }
  }

  private async filterRecipientsByPreferences(recipients: BulkSMSRecipient[]): Promise<BulkSMSRecipient[]> {
    const userIds = recipients.map(r => r.userId).filter(Boolean) as string[];
    if (userIds.length === 0) return recipients;

    const preferences = await db
      .select()
      .from(messageNotificationSettings)
      .where(inArray(messageNotificationSettings.userId, userIds));

    const allowedUserIds = new Set(
      preferences
        .filter(p => p.smsEnabled)
        .map(p => p.userId)
    );

    return recipients.filter(r => !r.userId || allowedUserIds.has(r.userId));
  }

  private normalizePhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let normalized = phone.replace(/\D/g, '');
    
    // Handle Kenyan phone numbers
    if (normalized.startsWith('0') && normalized.length === 10) {
      normalized = '254' + normalized.substring(1);
    } else if (normalized.startsWith('254') && normalized.length === 12) {
      // Already in correct format
    } else if (normalized.length === 9) {
      normalized = '254' + normalized;
    }
    
    // Add + prefix for international format
    if (!normalized.startsWith('+')) {
      normalized = '+' + normalized;
    }
    
    return normalized;
  }

  private async renderTemplate(templateId: number, context: Record<string, any>): Promise<string> {
    const [template] = await db
      .select()
      .from(smsTemplates)
      .where(eq(smsTemplates.id, templateId));

    if (!template) {
      throw new Error(`SMS template ${templateId} not found`);
    }

    let message = template.content;
    
    // Simple template variable replacement
    Object.entries(context).forEach(([key, value]) => {
      message = message.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value));
    });

    return message;
  }

  private async logSMS(data: {
    userId?: string;
    phoneNumber: string;
    message: string;
    templateId?: number;
    provider: string;
    success: boolean;
    messageId?: string;
    error?: string;
    cost?: number;
    isBulk?: boolean;
  }) {
    try {
      await db.insert(smsLogs).values({
        userId: data.userId || null,
        phoneNumber: data.phoneNumber,
        message: data.message,
        templateId: data.templateId || null,
        provider: data.provider,
        success: data.success,
        messageId: data.messageId || null,
        error: data.error || null,
        cost: data.cost ? data.cost.toString() : null,
        isBulk: data.isBulk || false,
        sentAt: new Date(),
      });
    } catch (error) {
      console.error('Error logging SMS:', error);
    }
  }

  // Template management methods
  async createTemplate(data: {
    name: string;
    content: string;
    category: string;
    description?: string;
    variables?: string[];
  }) {
    const [template] = await db
      .insert(smsTemplates)
      .values({
        name: data.name,
        content: data.content,
        category: data.category,
        description: data.description,
        variables: data.variables ? JSON.stringify(data.variables) : null,
      })
      .returning();

    return template;
  }

  async getTemplates(category?: string) {
    const query = db.select().from(smsTemplates);
    
    if (category) {
      query.where(eq(smsTemplates.category, category));
    }

    return await query;
  }

  async updateTemplate(id: number, data: Partial<{
    name: string;
    content: string;
    category: string;
    description: string;
    variables: string[];
  }>) {
    const updateData: any = { ...data };
    if (data.variables) {
      updateData.variables = JSON.stringify(data.variables);
    }

    const [template] = await db
      .update(smsTemplates)
      .set(updateData)
      .where(eq(smsTemplates.id, id))
      .returning();

    return template;
  }

  async deleteTemplate(id: number) {
    await db.delete(smsTemplates).where(eq(smsTemplates.id, id));
  }

  // Analytics methods
  async getSMSStats(userId?: string, startDate?: Date, endDate?: Date) {
    const conditions = [];
    if (userId) conditions.push(eq(smsLogs.userId, userId));
    // Note: Add proper date range queries using gte/lte when needed
    
    const logs = await db
      .select()
      .from(smsLogs)
      .where(conditions.length > 0 ? and(...conditions) : undefined);
    
    return {
      total: logs.length,
      successful: logs.filter(l => l.success).length,
      failed: logs.filter(l => !l.success).length,
      totalCost: logs.reduce((sum, l) => sum + (parseFloat(l.cost || '0') || 0), 0),
      byProvider: logs.reduce((acc, l) => {
        acc[l.provider] = (acc[l.provider] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  async getSMSLogs(filters: {
    page?: number;
    limit?: number;
    userId?: string;
    provider?: string;
    success?: boolean;
    startDate?: Date;
    endDate?: Date;
  } = {}) {
    const { page = 1, limit = 50, userId, provider, success, startDate, endDate } = filters;
    
    const conditions = [];
    if (userId) conditions.push(eq(smsLogs.userId, userId));
    if (provider) conditions.push(eq(smsLogs.provider, provider));
    if (success !== undefined) conditions.push(eq(smsLogs.success, success));
    // Add date range conditions when needed
    
    const offset = (page - 1) * limit;
    
    const logs = await db
      .select()
      .from(smsLogs)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(smsLogs.sentAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const [{ count }] = await db
      .select({ count: count() })
      .from(smsLogs)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return {
      logs,
      pagination: {
        page,
        limit,
        total: Number(count),
        totalPages: Math.ceil(Number(count) / limit)
      }
    };
  }
}

// Export singleton instance
export const smsService = new SMSService();