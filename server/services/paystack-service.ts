import Paystack from 'paystack';
import { randomUUID } from 'crypto';
import { storage } from '../storage';
import type { 
  PaymentTransaction, 
  InsertPaymentTransaction, 
  InsertCreditTransaction,
  UserAccount,
  PaymentSchedule
} from '../../shared/payment-billing-schema';

export class PaystackService {
  private paystack: any;

  constructor() {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new Error('PAYSTACK_SECRET_KEY is required');
    }
    this.paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);
  }

  /**
   * Initialize payment transaction
   */
  async initializePayment(params: {
    userId: string;
    amount: number;
    currency?: string;
    email: string;
    productId?: number;
    entityType?: string;
    entityId?: string;
    transactionType: 'purchase' | 'subscription' | 'credit_purchase';
    description?: string;
    callbackUrl?: string;
    redirectUrl?: string;
    metadata?: Record<string, any>;
    channels?: string[];
  }) {
    const reference = `pay_${randomUUID()}`;
    
    try {
      // Initialize payment with Paystack
      const paystackData: any = {
        reference,
        amount: params.amount * 100, // Convert to kobo
        email: params.email,
        currency: params.currency || 'KES',
        channels: params.channels || ['card', 'mobile_money', 'ussd', 'bank_transfer'],
        metadata: {
          ...params.metadata,
          user_id: params.userId,
          product_id: params.productId,
          entity_type: params.entityType,
          entity_id: params.entityId,
          transaction_type: params.transactionType
        }
      };

      // Add callback URL if provided (for webhook notifications)
      if (params.callbackUrl) {
        paystackData.callback_url = params.callbackUrl;
      }

      // Add redirect URL if provided (where user gets redirected after payment)
      if (params.redirectUrl) {
        paystackData.redirect_url = params.redirectUrl;
      }

      const response = await this.paystack.transaction.initialize(paystackData);

      if (!response.status) {
        throw new Error(response.message || 'Payment initialization failed');
      }

      // Create payment transaction record
      const transactionData: InsertPaymentTransaction = {
        userId: params.userId,
        reference: reference,
        amount: params.amount.toString(),
        currency: params.currency || 'KES',
        status: 'pending',
        type: params.transactionType,
        description: params.description || `Payment for ${params.entityType || 'service'}`,
        productId: params.productId,
        paystackReference: response.data.reference,
        metadata: params.metadata
      };

      const paymentTransaction = await storage.createPaymentTransaction(transactionData);

      return {
        transaction: paymentTransaction,
        paymentUrl: response.data.authorization_url,
        reference: response.data.reference,
        accessCode: response.data.access_code
      };
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw error;
    }
  }

  /**
   * Verify payment transaction
   */
  async verifyPayment(reference: string) {
    try {
      const response = await this.paystack.transaction.verify(reference);
      
      if (!response.status) {
        throw new Error(response.message || 'Payment verification failed');
      }

      const paymentData = response.data;
      
      // Update payment transaction
      const transaction = await storage.getPaymentTransactionByReference(reference);
      if (!transaction) {
        throw new Error('Payment transaction not found');
      }

      const updatedTransaction = await storage.updatePaymentTransaction(transaction.id, {
        status: paymentData.status === 'success' ? 'completed' : 'failed',
        method: this.mapPaystackChannelToMethod(paymentData.channel),
        provider: paymentData.authorization?.brand || paymentData.authorization?.bank || paymentData.channel,
        paystackFeePaid: paymentData.fees ? (paymentData.fees / 100).toString() : null,
        paidAt: paymentData.paid_at ? new Date(paymentData.paid_at) : null,
        processedAt: new Date()
      });

      // Process successful payment
      if (paymentData.status === 'success') {
        await this.processSuccessfulPayment(updatedTransaction);
      }

      return {
        transaction: updatedTransaction,
        paymentData,
        success: paymentData.status === 'success'
      };
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  }

  /**
   * Process successful payment
   */
  private async processSuccessfulPayment(transaction: PaymentTransaction) {
    try {
      switch (transaction.type) {
        case 'credit_purchase':
          await this.processCreditPurchase(transaction);
          break;
        case 'subscription':
          await this.processSubscriptionPayment(transaction);
          break;
        case 'purchase':
          await this.processPurchasePayment(transaction);
          break;
      }
    } catch (error) {
      console.error('Error processing successful payment:', error);
      throw error;
    }
  }

  /**
   * Process credit purchase
   */
  private async processCreditPurchase(transaction: PaymentTransaction) {
    const amount = parseFloat(transaction.amount);
    
    // Get or create user account
    let userAccount = await storage.getUserAccount(transaction.userId);
    if (!userAccount) {
      userAccount = await storage.createUserAccount({
        userId: transaction.userId,
        creditBalance: '0.00',
        reservedBalance: '0.00',
        totalSpent: '0.00',
        totalEarned: '0.00'
      });
    }

    // Update account balance
    const newBalance = parseFloat(userAccount.creditBalance) + amount;
    await storage.updateUserAccount(userAccount.id, {
      creditBalance: newBalance.toString(),
      totalEarned: (parseFloat(userAccount.totalEarned) + amount).toString(),
      lastTopUp: new Date()
    });

    // Create credit transaction record
    const creditTransaction: InsertCreditTransaction = {
      userId: transaction.userId,
      accountId: userAccount.id,
      amount: amount.toString(),
      balanceAfter: newBalance.toString(),
      transactionType: 'credit_purchase',
      description: `Account top-up via ${transaction.paymentMethod}`,
      paymentTransactionId: transaction.id
    };

    await storage.createCreditTransaction(creditTransaction);
  }

  /**
   * Process subscription payment
   */
  private async processSubscriptionPayment(transaction: PaymentTransaction) {
    if (!transaction.productId) {
      throw new Error('Product ID required for subscription payment');
    }

    // Activate or extend subscription
    const subscription = await storage.getUserProductSubscription(transaction.userId, transaction.productId);
    if (subscription) {
      // Extend existing subscription
      const endDate = new Date(subscription.endDate || subscription.createdAt);
      const billing = await storage.getProductPricing(transaction.productId);
      const newEndDate = new Date(endDate.getTime() + (billing?.billingCycle || 30) * 24 * 60 * 60 * 1000);
      
      await storage.updateUserProductSubscription(subscription.id, {
        endDate: newEndDate,
        isActive: true,
        autoRenew: true
      });
    } else {
      // Create new subscription
      const billing = await storage.getProductPricing(transaction.productId);
      const endDate = new Date(Date.now() + (billing?.billingCycle || 30) * 24 * 60 * 60 * 1000);
      
      await storage.createUserProductSubscription({
        userId: transaction.userId,
        productId: transaction.productId,
        pricingId: billing?.id,
        endDate,
        isActive: true,
        autoRenew: true
      });
    }
  }

  /**
   * Process purchase payment
   */
  private async processPurchasePayment(transaction: PaymentTransaction) {
    // Handle one-time purchase
    if (transaction.entityType === 'listing' && transaction.entityId) {
      // Activate listing
      await storage.activateListing(transaction.entityId);
    }
    
    // Mark any scheduled payments as completed
    const scheduledPayments = await storage.getScheduledPayments(transaction.userId, {
      entityType: transaction.entityType,
      entityId: transaction.entityId
    });
    
    for (const scheduled of scheduledPayments) {
      await storage.updatePaymentSchedule(scheduled.id, {
        status: 'completed',
        paymentTransactionId: transaction.id
      });
    }
  }

  /**
   * Create payment schedule for pay-on-delivery
   */
  async schedulePayment(params: {
    userId: string;
    productId: number;
    amount: number;
    dueDate: Date;
    paymentTrigger: string;
    entityType: string;
    entityId: string;
    description?: string;
    metadata?: Record<string, any>;
  }) {
    const scheduleData = {
      userId: params.userId,
      productId: params.productId,
      amount: params.amount.toString(),
      dueDate: params.dueDate,
      paymentTrigger: params.paymentTrigger,
      entityType: params.entityType,
      entityId: params.entityId,
      description: params.description,
      metadata: params.metadata,
      status: 'pending' as const
    };

    return await storage.createPaymentSchedule(scheduleData);
  }

  /**
   * Process scheduled payment
   */
  async processScheduledPayment(scheduleId: number, userEmail: string) {
    const schedule = await storage.getPaymentSchedule(scheduleId);
    if (!schedule) {
      throw new Error('Payment schedule not found');
    }

    if (schedule.status !== 'pending') {
      throw new Error('Payment schedule is not pending');
    }

    // Initialize payment for scheduled amount
    return await this.initializePayment({
      userId: schedule.userId,
      amount: parseFloat(schedule.amount),
      email: userEmail,
      productId: schedule.productId,
      entityType: schedule.entityType,
      entityId: schedule.entityId,
      transactionType: 'purchase',
      description: schedule.description || 'Scheduled payment',
      metadata: schedule.metadata as Record<string, any>
    });
  }

  /**
   * Use account credits for payment
   */
  async useAccountCredits(params: {
    userId: string;
    amount: number;
    entityType: string;
    entityId: string;
    description: string;
    metadata?: Record<string, any>;
  }) {
    const userAccount = await storage.getUserAccount(params.userId);
    if (!userAccount) {
      throw new Error('User account not found');
    }

    const currentBalance = parseFloat(userAccount.creditBalance);
    if (currentBalance < params.amount) {
      throw new Error('Insufficient credits');
    }

    // Reserve credits
    const newBalance = currentBalance - params.amount;
    const newReserved = parseFloat(userAccount.reservedBalance) + params.amount;
    
    await storage.updateUserAccount(userAccount.id, {
      creditBalance: newBalance.toString(),
      reservedBalance: newReserved.toString(),
      totalSpent: (parseFloat(userAccount.totalSpent) + params.amount).toString()
    });

    // Create credit transaction
    const creditTransaction: InsertCreditTransaction = {
      userId: params.userId,
      accountId: userAccount.id,
      amount: (-params.amount).toString(),
      balanceAfter: newBalance.toString(),
      transactionType: 'credit_deduction',
      description: params.description,
      entityType: params.entityType,
      entityId: params.entityId,
      metadata: params.metadata
    };

    await storage.createCreditTransaction(creditTransaction);

    // Create payment transaction record
    const paymentTransaction: InsertPaymentTransaction = {
      userId: params.userId,
      transactionRef: `credit_${randomUUID()}`,
      amount: params.amount.toString(),
      currency: 'KES',
      status: 'completed',
      transactionType: 'credit_deduction',
      description: params.description,
      entityType: params.entityType,
      entityId: params.entityId,
      paymentMethod: 'credit',
      metadata: params.metadata
    };

    return await storage.createPaymentTransaction(paymentTransaction);
  }

  /**
   * Map Paystack channel to payment method
   */
  private mapPaystackChannelToMethod(channel: string): 'card' | 'mobile_money' | 'bank_transfer' | 'ussd' | 'bank' {
    switch (channel) {
      case 'card':
        return 'card';
      case 'mobile_money':
      case 'mobile':
        return 'mobile_money';
      case 'ussd':
        return 'ussd';
      case 'bank':
      case 'bank_transfer':
        return 'bank_transfer';
      default:
        return 'card';
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(userId: string, limit: number = 20, offset: number = 0) {
    return await storage.getPaymentTransactions(userId, limit, offset);
  }

  /**
   * Get account balance
   */
  async getAccountBalance(userId: string) {
    const account = await storage.getUserAccount(userId);
    if (!account) {
      return {
        creditBalance: 0,
        reservedBalance: 0,
        totalSpent: 0,
        totalEarned: 0
      };
    }

    return {
      creditBalance: parseFloat(account.creditBalance),
      reservedBalance: parseFloat(account.reservedBalance),
      totalSpent: parseFloat(account.totalSpent),
      totalEarned: parseFloat(account.totalEarned)
    };
  }

  /**
   * Get scheduled payments
   */
  async getScheduledPayments(userId: string, status?: string) {
    return await storage.getScheduledPayments(userId, { status });
  }
}

export const paystackService = new PaystackService();