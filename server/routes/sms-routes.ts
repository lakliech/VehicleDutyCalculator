import express from 'express';
import { authenticateUser, requireRole } from '../middleware/auth';
import { smsService } from '../services/sms-service';
import { smsTemplateSchema, smsLogSchema } from '@shared/schema';
import { z } from 'zod';

const router = express.Router();

// Send single SMS
const singleSMSSchema = z.object({
  recipient: z.object({
    phoneNumber: z.string().min(10),
    userId: z.string().optional()
  }),
  message: z.string().min(1),
  templateId: z.number().optional(),
  provider: z.string().optional(),
});

router.post('/send', authenticateUser, async (req, res) => {
  try {
    const { recipient, message, templateId, provider } = singleSMSSchema.parse(req.body);
    const userId = (req as any).user?.id;
    
    const result = await smsService.sendSMS(recipient.phoneNumber, message, {
      templateId,
      provider,
      context: { userId: recipient.userId || userId }
    });
    
    res.json({ 
      success: result.success, 
      messageId: result.messageId,
      provider: result.provider,
      error: result.error 
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Send bulk SMS
const bulkSMSSchema = z.object({
  recipients: z.array(z.object({
    phoneNumber: z.string().min(10),
    userId: z.string().optional(),
  })),
  message: z.string().min(1),
  templateId: z.number().optional(),
  provider: z.string().optional(),
});

router.post('/send-bulk', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const { recipients, message, templateId, provider } = bulkSMSSchema.parse(req.body);
    
    const result = await smsService.sendBulkSMS(recipients, message, {
      templateId,
      provider,
      checkUserPreferences: true
    });
    
    res.json({ 
      success: result.success,
      totalSent: result.totalSent,
      totalFailed: result.totalFailed,
      provider: result.provider,
      results: result.results
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// SMS Templates CRUD
router.get('/templates', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const templates = await smsService.getTemplates();
    res.json(templates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/templates', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const templateData = smsTemplateSchema.parse(req.body);
    // Convert null to undefined for compatibility
    const cleanedData = {
      ...templateData,
      description: templateData.description || undefined,
      variables: templateData.variables ? JSON.parse(templateData.variables) : undefined
    };
    const template = await smsService.createTemplate(cleanedData);
    res.json(template);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/templates/:id', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const templateData = smsTemplateSchema.parse(req.body);
    // Convert null to undefined for compatibility
    const cleanedData = {
      ...templateData,
      description: templateData.description || undefined,
      variables: templateData.variables ? JSON.parse(templateData.variables) : undefined
    };
    const template = await smsService.updateTemplate(id, cleanedData);
    res.json(template);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/templates/:id', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await smsService.deleteTemplate(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// SMS Analytics and Logs
router.get('/stats', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;
    
    const stats = await smsService.getSMSStats(
      userId as string,
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined
    );
    
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/logs', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const { page = '1', limit = '50', userId, provider } = req.query;
    
    const logs = await smsService.getSMSLogs({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      userId: userId as string,
      provider: provider as string,
    });
    
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// User's own SMS logs
router.get('/my-logs', authenticateUser, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const { page = '1', limit = '20' } = req.query;
    
    const logs = await smsService.getSMSLogs({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      userId,
    });
    
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Provider configuration endpoints (admin only)
router.post('/configure-provider', authenticateUser, requireRole(['super_admin']), async (req, res) => {
  try {
    const { provider, config } = req.body;
    
    // In a real implementation, you'd store provider configs in database
    // For now, just validate the provider exists
    const validProviders = ['africas_talking', 'twilio', 'infobip', 'clickatell'];
    if (!validProviders.includes(provider)) {
      return res.status(400).json({ error: 'Invalid SMS provider' });
    }
    
    res.json({ 
      success: true, 
      message: `${provider} configuration updated` 
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { router as smsRoutes };