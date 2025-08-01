import { z } from 'zod';

// User Analytics Schema
export const UserAnalyticsSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  timestamp: z.date(),
  action: z.enum(['view', 'search', 'contact', 'calculate', 'login', 'register', 'favorite', 'share']),
  metadata: z.object({
    vehicleId: z.string().optional(),
    listingId: z.number().optional(),
    searchQuery: z.string().optional(),
    filters: z.record(z.any()).optional(),
    pageUrl: z.string(),
    userAgent: z.string(),
    location: z.object({
      county: z.string(),
      area: z.string().optional()
    }).optional(),
    duration: z.number().optional(), // Time spent on page in seconds
    referrer: z.string().optional()
  })
});

export type UserAnalytics = z.infer<typeof UserAnalyticsSchema>;

// Search Analytics Schema
export const SearchAnalyticsSchema = z.object({
  query: z.string(),
  resultsCount: z.number(),
  clickThroughRate: z.number().default(0),
  conversionRate: z.number().default(0),
  timestamp: z.date(),
  userId: z.string().optional(),
  sessionId: z.string(),
  filters: z.record(z.any()),
  executionTime: z.number(), // Query execution time in milliseconds
  source: z.enum(['user_search', 'ai_search', 'filter_update', 'auto_suggest'])
});

export type SearchAnalytics = z.infer<typeof SearchAnalyticsSchema>;

// Page Views Schema
export const PageViewSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string(),
  pageUrl: z.string(),
  pageTitle: z.string(),
  timestamp: z.date(),
  duration: z.number().optional(),
  userAgent: z.string(),
  ipAddress: z.string().optional(),
  referrer: z.string().optional(),
  exitPage: z.boolean().default(false)
});

export type PageView = z.infer<typeof PageViewSchema>;

// Conversation Schema
export const ConversationSchema = z.object({
  listingId: z.number(),
  buyerId: z.string(),
  sellerId: z.string(),
  status: z.enum(['active', 'archived', 'closed']),
  lastMessageAt: z.date(),
  messageCount: z.number().default(0),
  metadata: z.object({
    vehicleMake: z.string().optional(),
    vehicleModel: z.string().optional(),
    listingPrice: z.number().optional(),
    dealerName: z.string().optional()
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Conversation = z.infer<typeof ConversationSchema>;

// Message Schema
export const MessageSchema = z.object({
  conversationId: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  timestamp: z.date(),
  type: z.enum(['text', 'template', 'image', 'location', 'contact_info']),
  status: z.enum(['sent', 'delivered', 'read']).default('sent'),
  metadata: z.object({
    templateId: z.string().optional(),
    imageUrl: z.string().optional(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
      address: z.string().optional()
    }).optional(),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional()
    }).optional()
  }).optional()
});

export type Message = z.infer<typeof MessageSchema>;

// Notification Template Schema
export const NotificationTemplateSchema = z.object({
  type: z.enum(['sms', 'email', 'push']),
  category: z.enum(['marketing', 'transactional', 'system']),
  name: z.string(),
  template: z.string(),
  variables: z.array(z.string()),
  language: z.enum(['en', 'sw']).default('en'),
  isActive: z.boolean().default(true),
  usage: z.object({
    timesUsed: z.number().default(0),
    lastUsed: z.date().optional(),
    successRate: z.number().default(0)
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type NotificationTemplate = z.infer<typeof NotificationTemplateSchema>;

// SMS Log Schema
export const SmsLogSchema = z.object({
  userId: z.string(),
  phoneNumber: z.string(),
  message: z.string(),
  templateId: z.string().optional(),
  provider: z.enum(['africas_talking', 'twilio', 'infobip', 'clickatell']),
  status: z.enum(['pending', 'sent', 'delivered', 'failed']),
  cost: z.number().optional(),
  messageId: z.string().optional(), // Provider's message ID
  errorMessage: z.string().optional(),
  deliveredAt: z.date().optional(),
  timestamp: z.date()
});

export type SmsLog = z.infer<typeof SmsLogSchema>;

// Cached Search Results Schema
export const CachedSearchResultsSchema = z.object({
  key: z.string(), // Hash of search parameters
  results: z.array(z.any()),
  filters: z.record(z.any()),
  totalCount: z.number(),
  executionTime: z.number(),
  source: z.enum(['postgresql', 'hybrid']),
  tags: z.array(z.string()), // For cache invalidation
  expiresAt: z.date(),
  createdAt: z.date()
});

export type CachedSearchResults = z.infer<typeof CachedSearchResultsSchema>;

// Performance Metrics Schema
export const PerformanceMetricsSchema = z.object({
  timestamp: z.date(),
  type: z.enum(['database', 'api', 'search', 'calculation']),
  operation: z.string(),
  duration: z.number(), // in milliseconds
  success: z.boolean(),
  errorMessage: z.string().optional(),
  metadata: z.object({
    userId: z.string().optional(),
    endpoint: z.string().optional(),
    queryType: z.string().optional(),
    recordCount: z.number().optional()
  }).optional()
});

export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>;

// Daily Analytics Summary Schema
export const DailyAnalyticsSchema = z.object({
  date: z.string(), // YYYY-MM-DD format
  metrics: z.object({
    totalUsers: z.number(),
    uniqueUsers: z.number(),
    totalPageViews: z.number(),
    totalSearches: z.number(),
    totalCalculations: z.number(),
    totalConversations: z.number(),
    popularMakes: z.array(z.object({
      make: z.string(),
      count: z.number()
    })),
    popularSearchTerms: z.array(z.object({
      term: z.string(),
      count: z.number()
    })),
    avgSessionDuration: z.number(),
    conversionRate: z.number(),
    bounceRate: z.number()
  }),
  performance: z.object({
    avgPageLoadTime: z.number(),
    avgSearchTime: z.number(),
    avgCalculationTime: z.number(),
    cacheHitRate: z.number()
  }),
  processedAt: z.date(),
  createdAt: z.date()
});

export type DailyAnalytics = z.infer<typeof DailyAnalyticsSchema>;

// Insert schemas for validation
export const UserAnalyticsInsertSchema = UserAnalyticsSchema.omit({ timestamp: true }).extend({
  timestamp: z.date().optional()
});

export const SearchAnalyticsInsertSchema = SearchAnalyticsSchema.omit({ timestamp: true }).extend({
  timestamp: z.date().optional()
});

export const ConversationInsertSchema = ConversationSchema.omit({ 
  createdAt: true, 
  updatedAt: true,
  lastMessageAt: true,
  messageCount: true
}).extend({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  lastMessageAt: z.date().optional(),
  messageCount: z.number().optional()
});

export const MessageInsertSchema = MessageSchema.omit({ timestamp: true }).extend({
  timestamp: z.date().optional()
});

// Type exports for insert operations
export type UserAnalyticsInsert = z.infer<typeof UserAnalyticsInsertSchema>;
export type SearchAnalyticsInsert = z.infer<typeof SearchAnalyticsInsertSchema>;
export type ConversationInsert = z.infer<typeof ConversationInsertSchema>;
export type MessageInsert = z.infer<typeof MessageInsertSchema>;