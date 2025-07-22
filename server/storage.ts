import { 
  vehicles, calculations, depreciationRates, taxRates, processingFees, vehicleCategoryRules, registrationFees, trailers, heavyMachinery,
  userRoles, appUsers, userSessions, userActivities, listingApprovals, userPreferences, userStats, carListings, passwordResetTokens,
  adminCredentials, adminAuditLog, listingFlags, listingAnalytics, adminNotes, userWarnings, adminTemplates,
  favoriteListings, savedSearches, carComparisons,
  autoFlagRules, flagCountTracking, automatedActionsLog, sellerReputationTracking,
  type Vehicle, type Calculation, type InsertVehicle, type InsertCalculation, type DutyCalculation, type DutyResult, 
  type DepreciationRate, type TaxRate, type ProcessingFee, type VehicleCategoryRule, type RegistrationFee, 
  type Trailer, type HeavyMachinery, type UserRole, type AppUser, type InsertAppUser, type InsertUserRole,
  type CarListing, type InsertCarListing, type ListingApproval, type InsertListingApproval,
  type UserActivity, type UserStats, type UserPreferences, type PasswordResetToken,
  type AdminCredential, type InsertAdminCredential, type AdminAuditLog, type InsertAdminAuditLog,
  type ListingFlag, type InsertListingFlag, type ListingAnalytics, type InsertListingAnalytics,
  type AdminNote, type InsertAdminNote, type UserWarning, type InsertUserWarning,
  type AdminTemplate, type InsertAdminTemplate,
  type FavoriteListing, type SavedSearch, type CarComparison,
  type AutoFlagRule, type FlagCountTracking, type AutomatedActionsLog, type SellerReputationTracking
} from "@shared/schema";
import { 
  userAccounts, paymentTransactions, accountCreditTransactions, paymentSchedules, userProductSubscriptions 
} from "@shared/schema-minimal";
import { db } from "./db";
import { eq, and, gte, lte, or, desc, asc, sql, gt, inArray, isNull, ilike } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // Existing duty calculation methods
  calculateDuty(calculation: DutyCalculation): Promise<DutyResult>;
  saveCalculation(vehicleData: InsertVehicle, calculationData: Omit<InsertCalculation, 'vehicleId'>): Promise<{ vehicle: Vehicle; calculation: Calculation }>;
  getCalculationHistory(limit?: number): Promise<Array<Vehicle & { calculation: Calculation }>>;

  // User management methods
  createUser(userData: InsertAppUser & { password: string }): Promise<AppUser>;
  getUserById(id: string): Promise<AppUser | undefined>;
  getUserByEmail(email: string): Promise<AppUser | undefined>;
  updateUser(id: string, userData: Partial<InsertAppUser>): Promise<AppUser>;
  deleteUser(id: string): Promise<void>;
  getUserRole(userId: string): Promise<UserRole | undefined>;
  updateUserRole(userId: string, roleId: number): Promise<void>;
  getUserWithRole(userId: string): Promise<AppUser & { role?: UserRole } | null>;

  // Role management methods
  getAllRoles(): Promise<UserRole[]>;
  createRole(roleData: InsertUserRole): Promise<UserRole>;
  updateRole(id: number, roleData: Partial<InsertUserRole>): Promise<UserRole>;
  deleteRole(id: number): Promise<void>;

  // Listing management methods
  getAllListingsForAdmin(): Promise<Array<CarListing & { seller: AppUser; approval?: ListingApproval }>>;
  getListingsByUser(userId: string): Promise<CarListing[]>;
  getListingById(id: number): Promise<CarListing & { seller: AppUser; approval?: ListingApproval } | null>;
  createListing(listingData: InsertCarListing & { sellerId: string }): Promise<CarListing>;
  updateListing(id: number, listingData: Partial<InsertCarListing>): Promise<CarListing>;
  deleteListing(id: number): Promise<void>;

  // Approval workflow methods
  approveListing(listingId: number, reviewerId: string, notes?: string): Promise<ListingApproval>;
  rejectListing(listingId: number, reviewerId: string, reason: string): Promise<ListingApproval>;
  requestChanges(listingId: number, reviewerId: string, changes: string[], notes?: string): Promise<ListingApproval>;
  getListingApproval(listingId: number): Promise<ListingApproval | undefined>;

  // User activity tracking
  logUserActivity(userId: string, activityType: string, entityType?: string, entityId?: string, description?: string, metadata?: any): Promise<void>;
  getUserActivities(userId: string, limit?: number): Promise<UserActivity[]>;

  // User stats and metrics
  getUserStats(userId: string): Promise<UserStats | undefined>;
  updateUserStats(userId: string, updates: Partial<UserStats>): Promise<UserStats>;

  // User preferences
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences>;

  // Password reset methods
  createPasswordResetToken(email: string): Promise<PasswordResetToken>;
  getValidPasswordResetToken(token: string): Promise<PasswordResetToken | undefined>;
  markPasswordResetTokenAsUsed(token: string): Promise<void>;
  updateUserPassword(email: string, newPassword: string): Promise<void>;

  // Payment and billing methods
  createUserAccount(accountData: any): Promise<any>;
  getUserAccount(userId: string): Promise<any>;
  updateUserAccount(accountId: number, updates: any): Promise<any>;

  createPaymentTransaction(transactionData: any): Promise<any>;
  getPaymentTransactionByReference(reference: string): Promise<any>;
  updatePaymentTransaction(transactionId: number, updates: any): Promise<any>;
  getPaymentTransactions(userId: string, limit?: number, offset?: number): Promise<any[]>;

  createCreditTransaction(creditData: any): Promise<any>;
  getCreditTransactions(userId: string, limit?: number): Promise<any[]>;

  createPaymentSchedule(scheduleData: any): Promise<any>;
  getPaymentSchedule(scheduleId: number): Promise<any>;
  updatePaymentSchedule(scheduleId: number, updates: any): Promise<any>;
  getScheduledPayments(userId: string, filters?: any): Promise<any[]>;

  getUserProductSubscription(userId: string, productId: number): Promise<any>;
  updateUserProductSubscription(subscriptionId: number, updates: any): Promise<any>;
  createUserProductSubscription(subscriptionData: any): Promise<any>;

  getProductPricing(productId: number): Promise<any>;
  activateListing(listingId: string): Promise<void>;

  // Admin authentication methods
  getAdminByUsername(username: string): Promise<AdminCredential | undefined>;
  validateAdminPassword(username: string, password: string): Promise<AdminCredential | null>;
  updateAdminLastLogin(id: number): Promise<void>;
  createAdmin(adminData: InsertAdminCredential & { password: string }): Promise<AdminCredential>;

  // User engagement methods
  addToFavorites(userId: string, listingId: number): Promise<void>;
  removeFromFavorites(userId: string, listingId: number): Promise<void>;
  getUserFavorites(userId: string): Promise<any[]>;
  getUserFavorite(userId: string, listingId: number): Promise<any | undefined>;
  saveSearch(userId: string, searchName: string, filters: any): Promise<void>;
  getUserSavedSearches(userId: string): Promise<any[]>;
  addToComparison(userId: string, listingId: number): Promise<void>;
  removeFromComparison(userId: string, listingId: number): Promise<void>;
  getUserComparison(userId: string): Promise<any[]>;
  updateAdminPassword(id: number, newPassword: string): Promise<void>;

  // Admin management methods for listing moderation
  getListingsWithStats(filters?: { status?: string; make?: string; seller?: string; flagged?: boolean; sortBy?: string; page?: number; limit?: number }): Promise<{ listings: any[]; total: number; }>;
  getAllUsers(filters?: { search?: string; role?: string; page?: number; limit?: number }): Promise<{ users: any[]; total: number; }>;
  getAdminDashboardStats(): Promise<{ totalListings: number; pendingApproval: number; approvedListings: number; rejectedListings: number; flaggedListings: number; }>;
  bulkUpdateListingStatus(listingIds: number[], status: string, adminId: string, reason?: string): Promise<void>;
  getUserHistory(userId: string): Promise<{ listings: CarListing[]; warnings: any[]; activities: UserActivity[]; }>;

  // Enhanced user management methods
  getEnhancedUsersWithStats(filters?: { 
    search?: string; 
    role?: string; 
    status?: string; 
    joinedFrom?: string; 
    joinedTo?: string; 
    page?: number; 
    limit?: number; 
    sort?: string; 
    order?: string; 
  }): Promise<{ 
    users: (AppUser & { role?: UserRole; listingsCount?: number; recentActivity?: string })[]; 
    totalCount: number; 
    pageCount: number; 
  }>;
  updateUserRole(userId: string, roleId: number): Promise<void>;
  bulkUserAction(userIds: string[], action: string, adminId: string, data?: any): Promise<void>;

  // Enhanced listing management methods
  flagListing(listingId: number, adminId: string, reason: string, notes?: string): Promise<void>;
  unflagListing(listingId: number, adminId: string): Promise<void>;
  // Remove this - replaced with getListingById
  addAdminNote(listingId: number, adminId: string, note: string): Promise<void>;
  getListingNotes(listingId: number): Promise<any[]>;
  markListingAsSold(listingId: number, adminId: string): Promise<void>;
  archiveListing(listingId: number, adminId: string): Promise<void>;
  restoreListing(listingId: number, adminId: string): Promise<void>;
  duplicateCheck(listingId: number): Promise<any[]>;
  exportListings(filters?: any): Promise<any[]>;

  // Automated flagging system methods
  processAutomatedFlag(listingId: number, flagType: string, reporterId?: string): Promise<{ actionTriggered: boolean; actionType?: string; actionDescription?: string }>;
  getAutoFlagRule(flagType: string): Promise<AutoFlagRule | undefined>;
  updateFlagCount(listingId: number, flagType: string): Promise<FlagCountTracking>;
  executeAutomatedAction(listingId: number, flagRule: AutoFlagRule, flagCount: number): Promise<void>;
  logAutomatedAction(listingId: number, flagType: string, actionType: string, triggerCount: number, actionDescription: string, success: boolean, errorMessage?: string): Promise<void>;
  updateSellerReputation(sellerId: string, flagType: string, severity: string): Promise<void>;
  getSellerReputationScore(sellerId: string): Promise<number>;
  rollbackAutomatedAction(actionId: number): Promise<void>;

  // Dashboard recommendations method
  generateUserRecommendations(userId: string): Promise<Array<{
    id: string;
    type: 'tool' | 'action' | 'content';
    title: string;
    description: string;
    href: string;
    icon: string;
    color: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }>>;

  // Messaging system methods
  // Conversation management
  createConversation(data: {
    type: string;
    title: string;
    context?: any;
    participants: Array<{ userId: string; role: string }>;
  }): Promise<any>;
  getConversation(id: number): Promise<any>;
  getUserConversations(userId: string, limit?: number): Promise<any[]>;
  updateConversationStatus(id: number, status: string): Promise<void>;
  archiveConversation(id: number): Promise<void>;
  addParticipant(conversationId: number, userId: string, role: string): Promise<void>;
  removeParticipant(conversationId: number, userId: string): Promise<void>;

  // Message management
  sendMessage(data: {
    conversationId: number;
    senderId: string;
    content: string;
    messageType?: string;
    metadata?: any;
    replyToMessageId?: number;
  }): Promise<any>;
  getMessages(conversationId: number, limit?: number, offset?: number): Promise<any[]>;
  getMessage(id: number): Promise<any>;
  editMessage(id: number, content: string): Promise<void>;
  deleteMessage(id: number): Promise<void>;
  markMessageAsRead(messageId: number, userId: string): Promise<void>;
  markConversationAsRead(conversationId: number, userId: string): Promise<void>;

  // Message templates
  getMessageTemplates(userId?: string, category?: string): Promise<any[]>;
  createMessageTemplate(data: {
    title: string;
    content: string;
    category: string;
    isAdminOnly?: boolean;
    tags?: string[];
    createdBy: string;
  }): Promise<any>;
  updateMessageTemplate(id: number, data: Partial<{
    title: string;
    content: string;
    category: string;
    tags: string[];
  }>): Promise<void>;
  deleteMessageTemplate(id: number): Promise<void>;

  // User blocking and spam prevention
  blockUser(blockerId: string, blockedId: string, reason?: string, blockType?: string): Promise<void>;
  unblockUser(blockerId: string, blockedId: string): Promise<void>;
  getBlockedUsers(userId: string): Promise<any[]>;
  isUserBlocked(userId1: string, userId2: string): Promise<boolean>;

  // Notification preferences
  getNotificationSettings(userId: string): Promise<any[]>;
  updateNotificationSettings(userId: string, conversationType: string, settings: any): Promise<void>;

  // Analytics and insights
  getConversationAnalytics(conversationId: number): Promise<any>;
  updateConversationAnalytics(conversationId: number, data: any): Promise<void>;
  getMessagingStats(userId: string): Promise<{
    totalConversations: number;
    activeConversations: number;
    totalMessages: number;
    unreadCount: number;
    avgResponseTime: number;
  }>;

  // Smart Pricing Intelligence methods
  getPriceAlerts(listingId: number, userId: string): Promise<any[]>;
  createPriceAlert(alert: any): Promise<any>;
  getSmartRecommendations(listingId: number): Promise<any[]>;
  createSmartRecommendation(recommendation: any): Promise<any>;
  getCarListingById(id: number): Promise<CarListing | null>;

  // =============================
  // PAYMENT METHODS  
  // =============================
  createUserRoles(): Promise<void>;
  getUserFeatureSummary(userId: string): Promise<{
    plan: any;
    features: any;
  }>;
  createUserAccount(data: any): Promise<any>;
  getUserAccount(userId: string): Promise<any>;
  updateUserAccount(accountId: number, updates: any): Promise<any>;
  createPaymentTransaction(data: any): Promise<any>;
  getPaymentTransaction(id: number): Promise<any>;
  updatePaymentTransaction(id: number, data: any): Promise<any>;
  createAccountCreditTransaction(data: any): Promise<any>;
  getAccountCreditTransactions(accountId: number, limit?: number): Promise<any[]>;
  getCreditTransactions(accountId: number, limit?: number): Promise<any[]>;
  createPaymentSchedule(data: any): Promise<any>;
  getPaymentSchedules(userId: string): Promise<any[]>;
  updatePaymentSchedule(id: number, data: any): Promise<any>;
  createUserProductSubscription(data: any): Promise<any>;
  getUserProductSubscriptions(userId: string): Promise<any[]>;
  updateUserProductSubscription(id: number, data: any): Promise<any>;
}

export class MemStorage implements IStorage {
  // Create user roles
  async createUserRoles(): Promise<void> {
    const roles = [
      {
        name: 'Super Admin',
        description: 'Full system access and control',
        permissions: [
          'system_config', 'user_management', 'role_management', 'database_management',
          'revenue_oversight', 'backup_management', 'security_management', 'audit_access'
        ]
      },
      {
        name: 'Platform Admin',
        description: 'General platform management',
        permissions: [
          'user_account_management', 'content_moderation', 'listing_management',
          'basic_reporting', 'system_monitoring', 'flag_resolution'
        ]
      },
      {
        name: 'Marketplace Manager',
        description: 'Vehicle listing and marketplace oversight',
        permissions: [
          'listing_approval', 'dealer_verification', 'marketplace_analytics',
          'listing_quality_control', 'market_pricing_oversight', 'seller_management'
        ]
      },
      {
        name: 'Financial Manager',
        description: 'Billing and payment management',
        permissions: [
          'billing_management', 'payment_oversight', 'subscription_management',
          'revenue_analytics', 'financial_reporting', 'transaction_monitoring',
          'loan_product_management'
        ]
      },
      {
        name: 'Content Moderator',
        description: 'Content quality and community management',
        permissions: [
          'flag_review', 'user_warnings', 'content_enforcement',
          'community_guidelines', 'spam_detection', 'listing_moderation'
        ]
      },
      {
        name: 'Customer Support Manager',
        description: 'Customer inquiry and support management',
        permissions: [
          'message_oversight', 'customer_inquiries', 'support_tickets',
          'user_assistance', 'onboarding_support', 'dispute_resolution'
        ]
      },
      {
        name: 'Marketing Manager',
        description: 'Marketing and promotional content management',
        permissions: [
          'advertisement_management', 'campaign_management', 'seo_content',
          'promotional_oversight', 'market_research', 'brand_management'
        ]
      },
      {
        name: 'Dealer Relations Manager',
        description: 'Dealer onboarding and relationship management',
        permissions: [
          'dealer_onboarding', 'dealer_verification', 'partnership_management',
          'dealer_analytics', 'dealer_support', 'business_development'
        ]
      },
      {
        name: 'Product Manager',
        description: 'Feature development and product oversight',
        permissions: [
          'feature_management', 'product_catalog', 'user_experience',
          'ab_testing', 'product_roadmap', 'analytics_access'
        ]
      },
      {
        name: 'System Administrator',
        description: 'Technical system management',
        permissions: [
          'server_management', 'performance_monitoring', 'security_management',
          'backup_recovery', 'technical_maintenance', 'system_optimization'
        ]
      },
      {
        name: 'Data Analyst',
        description: 'Analytics and business intelligence',
        permissions: [
          'advanced_analytics', 'reporting_access', 'market_intelligence',
          'performance_metrics', 'data_quality', 'business_intelligence'
        ]
      },
      {
        name: 'Concierge Service Manager',
        description: 'Premium concierge service oversight',
        permissions: [
          'concierge_oversight', 'service_quality', 'expert_coordination',
          'premium_service_delivery', 'customer_satisfaction'
        ]
      },
      {
        name: 'Financial Services Coordinator',
        description: 'Loan and financial product management',
        permissions: [
          'loan_processing', 'trade_in_management', 'bank_partnerships',
          'financial_products', 'credit_assessment'
        ]
      },
      {
        name: 'User',
        description: 'Standard user with basic platform access',
        permissions: [
          'listing_creation', 'messaging', 'search', 'profile_management',
          'basic_calculators'
        ]
      }
    ];

    for (const role of roles) {
      try {
        await db.insert(userRoles).values(role).onConflictDoNothing();
      } catch (error) {
        console.error(`Error creating role ${role.name}:`, error);
      }
    }
  }

  // Get user's feature summary for display
  async getUserFeatureSummary(userId: string): Promise<{
    plan: string;
    features: {
      name: string;
      limit: string;
      description: string;
    }[];
  }> {
    // Implement logic to determine user's feature summary
    return {
      plan: "Basic",
      features: [
        {
          name: "Listings",
          limit: "5",
          description: "Number of active listings"
        },
        {
          name: "Messages",
          limit: "100",
          description: "Number of messages per month"
        }
      ]
    };
  }

  async createUserAccount(data: any): Promise<any> {
    const [account] = await db.insert(userAccounts).values(data).returning();
    return account;
  }

  async getUserAccount(userId: string): Promise<any> {
    const [account] = await db.select().from(userAccounts).where(eq(userAccounts.userId, userId));
    return account;
  }

  async updateUserAccount(accountId: number, updates: any): Promise<any> {
    const [account] = await db.update(userAccounts).set(updates).where(eq(userAccounts.id, accountId)).returning();
    return account;
  }

  async createPaymentTransaction(data: any): Promise<any> {
    const [transaction] = await db.insert(paymentTransactions).values(data).returning();
    return transaction;
  }

  async getPaymentTransaction(id: number): Promise<any> {
    const [transaction] = await db.select().from(paymentTransactions).where(eq(paymentTransactions.id, id));
    return transaction;
  }

  async updatePaymentTransaction(id: number, data: any): Promise<any> {
    const [transaction] = await db.update(paymentTransactions).set(data).where(eq(paymentTransactions.id, id)).returning();
    return transaction;
  }

  async createAccountCreditTransaction(data: any): Promise<any> {
    const [transaction] = await db.insert(accountCreditTransactions).values(data).returning();
    return transaction;
  }

  async getAccountCreditTransactions(accountId: number): Promise<any[]> {
    return await db.select().from(accountCreditTransactions).where(eq(accountCreditTransactions.accountId, accountId));
  }

  async createPaymentSchedule(data: any): Promise<any> {
    const [schedule] = await db.insert(paymentSchedules).values(data).returning();
    return schedule;
  }

  async getPaymentSchedule(id: number): Promise<any> {
    const [schedule] = await db.select().from(paymentSchedules).where(eq(paymentSchedules.id, id));
    return schedule;
  }

  async updatePaymentSchedule(id: number, data: any): Promise<any> {
    const [schedule] = await db.update(paymentSchedules).set(data).where(eq(paymentSchedules.id, id)).returning();
    return schedule;
  }

  async createUserProductSubscription(data: any): Promise<any> {
    const [subscription] = await db.insert(userProductSubscriptions).values(data).returning();
    return subscription;
  }

  async getUserProductSubscription(userId: string, productId: number): Promise<any> {
    const [subscription] = await db.select().from(userProductSubscriptions)
      .where(and(eq(userProductSubscriptions.userId, userId), eq(userProductSubscriptions.productId, productId)));
    return subscription;
  }

  async updateUserProductSubscription(id: number, data: any): Promise<any> {
    const [subscription] = await db.update(userProductSubscriptions).set(data).where(eq(userProductSubscriptions.id, id)).returning();
    return subscription;
  }

  async getUserPaymentTransactions(userId: string): Promise<any[]> {
    return await db.select().from(paymentTransactions).where(eq(paymentTransactions.userId, userId));
  }

  async getUserPaymentSchedules(userId: string): Promise<any[]> {
    return await db.select().from(paymentSchedules).where(eq(paymentSchedules.userId, userId));
  }

  async getUserSubscriptions(userId: string): Promise<any[]> {
    return await db.select().from(userProductSubscriptions).where(eq(userProductSubscriptions.userId, userId));
  }

  async updateAccountBalance(accountId: number, amount: number): Promise<any> {
    const [account] = await db.update(userAccounts)
      .set({ creditBalance: amount.toString() })
      .where(eq(userAccounts.id, accountId))
      .returning();
    return account;
  }

  async getPaymentTransactionByReference(reference: string): Promise<any> {
    const [transaction] = await db.select().from(paymentTransactions).where(eq(paymentTransactions.reference, reference));
    return transaction;
  }

  async getPaymentTransactions(userId: string, limit?: number, offset?: number): Promise<any[]> {
    const query = db.select().from(paymentTransactions).where(eq(paymentTransactions.userId, userId));
    if (limit) {
      return await query.limit(limit);
    }
    return await query;
  }

  async createCreditTransaction(data: any): Promise<any> {
    const [transaction] = await db.insert(accountCreditTransactions).values(data).returning();
    return transaction;
  }

  async getCreditTransactions(accountId: number, limit?: number): Promise<any[]> {
    const query = db.select().from(accountCreditTransactions).where(eq(accountCreditTransactions.accountId, accountId));
    if (limit) {
      return await query.limit(limit);
    }
    return await query;
  }

  async getScheduledPayments(userId: string, status?: string): Promise<any[]> {
    let query = db.select().from(paymentSchedules).where(eq(paymentSchedules.userId, userId));
    if (status) {
      query = query.where(eq(paymentSchedules.status, status));
    }
    return await query;
  }

  async updatePaymentStatus(transactionId: number, status: string): Promise<any> {
    const [transaction] = await db.update(paymentTransactions)
      .set({ status: status as any })
      .where(eq(paymentTransactions.id, transactionId))
      .returning();
    return transaction;
  }
}

export const storage = new MemStorage();