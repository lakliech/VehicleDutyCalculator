import { Router } from 'express';
import { paystackService } from '../services/paystack-service';
import { UnifiedBillingService } from '../services/unified-billing-service';

const router = Router();

// Middleware to check authentication
const authenticateUser = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

/**
 * POST /api/payment/subscribe
 * Initialize subscription payment - follows same pattern as /api/payments/initialize
 */
router.post('/subscribe', authenticateUser, async (req, res) => {
  try {
    const { planId, billingType = 'monthly' } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;

    if (!planId || !userEmail) {
      return res.status(400).json({ error: 'Plan ID and email are required' });
    }

    // Use UnifiedBillingService which internally uses paystack-service
    const paymentResult = await UnifiedBillingService.initializeSubscriptionPayment(
      userId, 
      userEmail, 
      planId, 
      billingType
    );

    res.json(paymentResult);
  } catch (error: any) {
    console.error('Error initializing subscription payment:', error);
    res.status(500).json({ error: error.message || 'Failed to initialize payment' });
  }
});

/**
 * GET /api/payment/verify/:reference
 * Verify payment and complete subscription - follows same pattern as /api/payments/verify
 */
router.get('/verify/:reference', authenticateUser, async (req, res) => {
  try {
    const { reference } = req.params;
    const userId = req.user.id;

    if (!reference) {
      return res.status(400).json({ error: 'Payment reference is required' });
    }

    // Use same paystack service as other payment routes
    const verification = await paystackService.verifyPayment(reference);
    
    if (!verification.success) {
      return res.status(400).json({ 
        error: 'Payment verification failed',
        details: verification.message 
      });
    }

    // Extract subscription metadata
    const metadata = verification.data.metadata;
    const planId = parseInt(metadata.plan_id);
    const billingType = metadata.billing_type;

    // Complete subscription using UnifiedBillingService
    const subscription = await UnifiedBillingService.completeSubscription(
      userId, 
      planId, 
      billingType, 
      reference
    );

    res.json({
      success: true,
      subscription,
      message: 'Subscription activated successfully'
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message || 'Failed to verify payment' });
  }
});

/**
 * GET /api/payment/success
 * Handle successful payment redirect from Paystack - follows same pattern as basic listing flow
 */
router.get('/success', async (req, res) => {
  try {
    const { reference, trxref } = req.query;
    const paymentRef = reference || trxref;

    if (!paymentRef) {
      return res.redirect('/billing?error=missing_reference');
    }

    // Verify payment using same service as other routes
    const verification = await paystackService.verifyPayment(paymentRef as string);
    
    if (!verification.success) {
      return res.redirect('/billing?error=payment_failed');
    }

    // Extract user information from payment metadata
    const metadata = verification.data.metadata;
    const userId = metadata.user_id || verification.data.customer?.customer_code;

    // Handle subscription payments
    if (userId && metadata.plan_id && metadata.billing_type) {
      try {
        // Complete subscription using same service as above
        await UnifiedBillingService.completeSubscription(
          userId,
          parseInt(metadata.plan_id),
          metadata.billing_type,
          paymentRef as string
        );

        // Redirect to subscription success page with verification flag
        return res.redirect(`/subscription-success?reference=${paymentRef}&status=success&verified=true`);
      } catch (error) {
        console.error('Error completing subscription after payment:', error);
        return res.redirect(`/billing?error=subscription_completion_failed&reference=${paymentRef}`);
      }
    }

    // For other payment types (like basic listings), redirect to general success
    return res.redirect(`/payment-success?reference=${paymentRef}&status=success`);
  } catch (error: any) {
    console.error('Error handling payment success:', error);
    return res.redirect('/billing?error=processing_failed');
  }
});

export default router;