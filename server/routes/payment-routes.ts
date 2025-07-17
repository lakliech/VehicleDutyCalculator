import { Router } from 'express';
import { paystackService } from '../services/paystack-service';
// Authentication middleware will be imported from main routes file
import { 
  createPaymentIntentSchema,
  topUpAccountSchema,
  processPaymentSchema,
  schedulePaymentSchema
} from '../../shared/payment-billing-schema';
import { storage } from '../storage';

const router = Router();

// Authentication middleware
const authenticateUser = (req: any, res: any, next: any) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

/**
 * Initialize payment (for subscription products and credit top-ups)
 */
router.post('/initialize', authenticateUser, async (req, res) => {
  try {
    const data = createPaymentIntentSchema.parse(req.body);
    
    if (!req.user?.email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    const result = await paystackService.initializePayment({
      userId: req.user.id,
      amount: data.amount,
      currency: data.currency,
      email: req.user.email,
      productId: data.productId,
      entityType: data.entityType,
      entityId: data.entityId,
      transactionType: data.productId ? 'subscription' : 'purchase',
      description: `Payment for ${data.entityType || 'service'}`,
      metadata: data.metadata
    });

    res.json(result);
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

/**
 * Top up account credits
 */
router.post('/topup', authenticateUser, async (req, res) => {
  try {
    const data = topUpAccountSchema.parse(req.body);
    
    if (!req.user?.email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    const result = await paystackService.initializePayment({
      userId: req.user.id,
      amount: data.amount,
      currency: 'KES',
      email: req.user.email,
      transactionType: 'credit_purchase',
      description: `Account top-up of KES ${data.amount}`,
      channels: data.paymentMethod ? [data.paymentMethod] : undefined
    });

    res.json(result);
  } catch (error) {
    console.error('Account top-up error:', error);
    res.status(500).json({ error: 'Account top-up failed' });
  }
});

/**
 * Verify payment
 */
router.post('/verify', authenticateUser, async (req, res) => {
  try {
    const data = processPaymentSchema.parse(req.body);
    
    const result = await paystackService.verifyPayment(data.paystackReference);
    
    res.json(result);
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

/**
 * Schedule payment (for pay-on-delivery products)
 */
router.post('/schedule', authenticateUser, async (req, res) => {
  try {
    const data = schedulePaymentSchema.parse(req.body);
    
    const schedule = await paystackService.schedulePayment({
      userId: req.user.id,
      productId: data.productId,
      amount: data.amount,
      dueDate: new Date(data.dueDate),
      paymentTrigger: data.paymentTrigger,
      entityType: data.entityType,
      entityId: data.entityId,
      description: data.description
    });

    res.json(schedule);
  } catch (error) {
    console.error('Payment scheduling error:', error);
    res.status(500).json({ error: 'Payment scheduling failed' });
  }
});

/**
 * Process scheduled payment
 */
router.post('/process-scheduled/:scheduleId', authenticateUser, async (req, res) => {
  try {
    const scheduleId = parseInt(req.params.scheduleId);
    
    if (!req.user?.email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    const result = await paystackService.processScheduledPayment(scheduleId, req.user.email);
    
    res.json(result);
  } catch (error) {
    console.error('Scheduled payment processing error:', error);
    res.status(500).json({ error: 'Scheduled payment processing failed' });
  }
});

/**
 * Use account credits
 */
router.post('/use-credits', authenticateUser, async (req, res) => {
  try {
    const { amount, entityType, entityId, description, metadata } = req.body;
    
    if (!amount || !entityType || !entityId || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await paystackService.useAccountCredits({
      userId: req.user.id,
      amount: parseFloat(amount),
      entityType,
      entityId,
      description,
      metadata
    });

    res.json(result);
  } catch (error) {
    console.error('Credit usage error:', error);
    res.status(500).json({ error: error.message || 'Credit usage failed' });
  }
});

/**
 * Get payment history
 */
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const history = await paystackService.getPaymentHistory(req.user.id, limit, offset);
    
    res.json(history);
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: 'Failed to get payment history' });
  }
});

/**
 * Get account balance
 */
router.get('/balance', authenticateUser, async (req, res) => {
  try {
    const balance = await paystackService.getAccountBalance(req.user.id);
    
    res.json(balance);
  } catch (error) {
    console.error('Account balance error:', error);
    res.status(500).json({ error: 'Failed to get account balance' });
  }
});

/**
 * Get scheduled payments
 */
router.get('/scheduled', authenticateUser, async (req, res) => {
  try {
    const status = req.query.status as string;
    
    const scheduled = await paystackService.getScheduledPayments(req.user.id, status);
    
    res.json(scheduled);
  } catch (error) {
    console.error('Scheduled payments error:', error);
    res.status(500).json({ error: 'Failed to get scheduled payments' });
  }
});

/**
 * Get payment statistics
 */
router.get('/stats', authenticateUser, async (req, res) => {
  try {
    const balance = await paystackService.getAccountBalance(req.user.id);
    const recentTransactions = await paystackService.getPaymentHistory(req.user.id, 5);
    const scheduledPayments = await paystackService.getScheduledPayments(req.user.id, 'pending');
    
    res.json({
      balance,
      recentTransactions,
      scheduledPayments: scheduledPayments.length,
      totalTransactions: recentTransactions.length
    });
  } catch (error) {
    console.error('Payment stats error:', error);
    res.status(500).json({ error: 'Failed to get payment statistics' });
  }
});

/**
 * Webhook for Paystack events
 */
router.post('/webhook', async (req, res) => {
  try {
    const hash = req.headers['x-paystack-signature'] as string;
    const secret = process.env.PAYSTACK_SECRET_KEY!;
    
    // Verify webhook signature
    const crypto = require('crypto');
    const expectedSignature = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    
    if (hash !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    
    if (event.event === 'charge.success') {
      // Process successful charge
      await paystackService.verifyPayment(event.data.reference);
    }
    
    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;