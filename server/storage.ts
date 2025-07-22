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

  // =============================
  // CORE USER MANAGEMENT METHODS
  // =============================

  async calculateDuty(calculation: DutyCalculation): Promise<DutyResult> {
    // Implement duty calculation logic
    throw new Error("Not implemented");
  }

  async saveCalculation(vehicleData: InsertVehicle, calculationData: Omit<InsertCalculation, 'vehicleId'>): Promise<{ vehicle: Vehicle; calculation: Calculation }> {
    // Implement calculation saving logic
    throw new Error("Not implemented");
  }

  async getCalculationHistory(limit?: number): Promise<Array<Vehicle & { calculation: Calculation }>> {
    // Implement calculation history retrieval
    return [];
  }

  async createUser(userData: InsertAppUser & { password: string }): Promise<AppUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const { password, ...userDataWithoutPassword } = userData;
    
    const [user] = await db.insert(appUsers).values({
      ...userDataWithoutPassword,
      passwordHash: hashedPassword
    }).returning();
    
    return user;
  }

  async getUserById(id: string): Promise<AppUser | undefined> {
    const [user] = await db.select().from(appUsers).where(eq(appUsers.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<AppUser | undefined> {
    const [user] = await db.select().from(appUsers).where(eq(appUsers.email, email));
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertAppUser>): Promise<AppUser> {
    const [user] = await db.update(appUsers).set(userData).where(eq(appUsers.id, id)).returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(appUsers).where(eq(appUsers.id, id));
  }

  async getUserRole(userId: string): Promise<UserRole | undefined> {
    const [user] = await db.select({
      role: userRoles
    }).from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .where(eq(appUsers.id, userId));
    return user?.role;
  }

  async updateUserRole(userId: string, roleId: number): Promise<void> {
    await db.update(appUsers).set({ roleId }).where(eq(appUsers.id, userId));
  }

  async getUserWithRole(userId: string): Promise<AppUser & { role?: UserRole } | null> {
    const [result] = await db.select({
      user: appUsers,
      role: userRoles
    }).from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .where(eq(appUsers.id, userId));
      
    if (!result) return null;
    
    return {
      ...result.user,
      role: result.role || undefined
    };
  }

  // =============================
  // ROLE MANAGEMENT METHODS
  // =============================

  async getAllRoles(): Promise<UserRole[]> {
    return await db.select().from(userRoles);
  }

  async createRole(roleData: InsertUserRole): Promise<UserRole> {
    const [role] = await db.insert(userRoles).values(roleData).returning();
    return role;
  }

  async updateRole(id: number, roleData: Partial<InsertUserRole>): Promise<UserRole> {
    const [role] = await db.update(userRoles).set(roleData).where(eq(userRoles.id, id)).returning();
    return role;
  }

  async deleteRole(id: number): Promise<void> {
    await db.delete(userRoles).where(eq(userRoles.id, id));
  }

  // =============================
  // LISTING MANAGEMENT METHODS
  // =============================

  async getAllListingsForAdmin(): Promise<Array<CarListing & { seller: AppUser; approval?: ListingApproval }>> {
    // Implement listing retrieval with seller and approval info
    return [];
  }

  async getListingsByUser(userId: string): Promise<CarListing[]> {
    return await db.select().from(carListings).where(eq(carListings.sellerId, userId));
  }

  async getListingById(id: number): Promise<CarListing & { seller: AppUser; approval?: ListingApproval } | null> {
    // Implement listing retrieval with seller and approval info
    return null;
  }

  async createListing(listingData: InsertCarListing & { sellerId: string }): Promise<CarListing> {
    const [listing] = await db.insert(carListings).values(listingData).returning();
    return listing;
  }

  async updateListing(id: number, listingData: Partial<InsertCarListing>): Promise<CarListing> {
    const [listing] = await db.update(carListings).set(listingData).where(eq(carListings.id, id)).returning();
    return listing;
  }

  async deleteListing(id: number): Promise<void> {
    await db.delete(carListings).where(eq(carListings.id, id));
  }

  // =============================
  // STUB IMPLEMENTATIONS FOR REMAINING INTERFACE METHODS
  // =============================

  async approveListing(listingId: number, reviewerId: string, notes?: string): Promise<ListingApproval> {
    throw new Error("Not implemented");
  }

  async rejectListing(listingId: number, reviewerId: string, reason: string): Promise<ListingApproval> {
    throw new Error("Not implemented");
  }

  async requestChanges(listingId: number, reviewerId: string, changes: string[], notes?: string): Promise<ListingApproval> {
    throw new Error("Not implemented");
  }

  async getListingApproval(listingId: number): Promise<ListingApproval | undefined> {
    return undefined;
  }

  async logUserActivity(userId: string, activityType: string, entityType?: string, entityId?: string, description?: string, metadata?: any): Promise<void> {
    // Implement user activity logging
  }

  async getUserActivities(userId: string, limit?: number): Promise<UserActivity[]> {
    return [];
  }

  async getUserStats(userId: string): Promise<UserStats | undefined> {
    return undefined;
  }

  async updateUserStats(userId: string, updates: Partial<UserStats>): Promise<UserStats> {
    throw new Error("Not implemented");
  }

  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    return undefined;
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    throw new Error("Not implemented");
  }

  async createPasswordResetToken(email: string): Promise<PasswordResetToken> {
    throw new Error("Not implemented");
  }

  async verifyPasswordResetToken(token: string): Promise<PasswordResetToken | null> {
    return null;
  }

  async deletePasswordResetToken(token: string): Promise<void> {
    // Implement token deletion
  }

  async validateUserLogin(email: string, password: string): Promise<AppUser | null> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.passwordHash) return null;
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  }

  async getUserSession(userId: string): Promise<any> {
    return null;
  }

  async createUserSession(userId: string, sessionData: any): Promise<any> {
    return null;
  }

  async updateUserSession(userId: string, sessionData: any): Promise<any> {
    return null;
  }

  async deleteUserSession(userId: string): Promise<void> {
    // Implement session deletion
  }

  async getAllUsers(): Promise<AppUser[]> {
    return await db.select().from(appUsers);
  }

  async getUsersWithRoles(): Promise<Array<AppUser & { role?: UserRole }>> {
    const results = await db.select({
      user: appUsers,
      role: userRoles
    }).from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id));

    return results.map(r => ({
      ...r.user,
      role: r.role || undefined
    }));
  }

  // Add stub implementations for all other interface methods
  async createAdminCredential(data: InsertAdminCredential): Promise<AdminCredential> { throw new Error("Not implemented"); }
  async getAdminByEmail(email: string): Promise<AdminCredential | undefined> { return undefined; }
  async updateAdminCredential(id: number, updates: Partial<InsertAdminCredential>): Promise<AdminCredential> { throw new Error("Not implemented"); }
  async deleteAdminCredential(id: number): Promise<void> {}
  async validateAdminLogin(email: string, password: string): Promise<AdminCredential | null> { return null; }
  async getAllAdmins(): Promise<AdminCredential[]> { return []; }
  async logAdminActivity(adminId: number, action: string, description?: string, metadata?: any): Promise<void> {}
  async getAdminActivities(adminId?: number, limit?: number): Promise<AdminAuditLog[]> { return []; }
  async flagListing(listingId: number, flaggerId: string, reason: string, description?: string, metadata?: any): Promise<ListingFlag> { throw new Error("Not implemented"); }
  async getFlagsByListing(listingId: number): Promise<ListingFlag[]> { return []; }
  async getFlagsByUser(userId: string): Promise<ListingFlag[]> { return []; }
  async updateFlagStatus(id: number, status: string, resolvedBy?: string, resolution?: string): Promise<ListingFlag> { throw new Error("Not implemented"); }
  async deleteFlagsByListing(listingId: number): Promise<void> {}
  async updateListingAnalytics(listingId: number, updates: Partial<InsertListingAnalytics>): Promise<ListingAnalytics> { throw new Error("Not implemented"); }
  async getListingAnalytics(listingId: number): Promise<ListingAnalytics | undefined> { return undefined; }
  async incrementListingViews(listingId: number): Promise<void> {}
  async incrementListingContacts(listingId: number): Promise<void> {}
  async addAdminNote(listingId: number, adminId: number, note: string, type?: string, visibility?: string): Promise<AdminNote> { throw new Error("Not implemented"); }
  async getAdminNotes(listingId: number): Promise<AdminNote[]> { return []; }
  async updateAdminNote(id: number, updates: Partial<InsertAdminNote>): Promise<AdminNote> { throw new Error("Not implemented"); }
  async deleteAdminNote(id: number): Promise<void> {}
  async warnUser(userId: string, issuedBy: string, reason: string, description?: string, severity?: string): Promise<UserWarning> { throw new Error("Not implemented"); }
  async getUserWarnings(userId: string): Promise<UserWarning[]> { return []; }
  async acknowledgeWarning(id: number): Promise<UserWarning> { throw new Error("Not implemented"); }
  async createAdminTemplate(data: InsertAdminTemplate): Promise<AdminTemplate> { throw new Error("Not implemented"); }
  async getAdminTemplates(category?: string): Promise<AdminTemplate[]> { return []; }
  async updateAdminTemplate(id: number, updates: Partial<InsertAdminTemplate>): Promise<AdminTemplate> { throw new Error("Not implemented"); }
  async deleteAdminTemplate(id: number): Promise<void> {}
  async addToFavorites(userId: string, listingId: number): Promise<FavoriteListing> { throw new Error("Not implemented"); }
  async removeFromFavorites(userId: string, listingId: number): Promise<void> {}
  async getFavoriteListings(userId: string): Promise<FavoriteListing[]> { return []; }
  async saveSearch(userId: string, searchCriteria: any, name?: string): Promise<SavedSearch> { throw new Error("Not implemented"); }
  async getSavedSearches(userId: string): Promise<SavedSearch[]> { return []; }
  async deleteSavedSearch(id: number): Promise<void> {}
  async addToComparison(userId: string, listingId: number): Promise<CarComparison> { throw new Error("Not implemented"); }
  async removeFromComparison(userId: string, listingId: number): Promise<void> {}
  async getComparisons(userId: string): Promise<CarComparison[]> { return []; }
  async clearComparisons(userId: string): Promise<void> {}
  async createAutoFlagRule(data: AutoFlagRule): Promise<AutoFlagRule> { throw new Error("Not implemented"); }
  async getAutoFlagRules(): Promise<AutoFlagRule[]> { return []; }
  async updateAutoFlagRule(id: number, updates: Partial<AutoFlagRule>): Promise<AutoFlagRule> { throw new Error("Not implemented"); }
  async deleteAutoFlagRule(id: number): Promise<void> {}
  async incrementFlagCount(userId: string, flagType: string): Promise<void> {}
  async getFlagCount(userId: string): Promise<FlagCountTracking[]> { return []; }
  async logAutomatedAction(ruleId: number, targetId: string, targetType: string, action: string, result: string, metadata?: any): Promise<void> {}
  async getAutomatedActionLogs(limit?: number): Promise<AutomatedActionsLog[]> { return []; }
  async updateSellerReputation(userId: string, updates: Partial<SellerReputationTracking>): Promise<SellerReputationTracking> { throw new Error("Not implemented"); }
  async getSellerReputation(userId: string): Promise<SellerReputationTracking | undefined> { return undefined; }
  async createConversation(data: any): Promise<any> { throw new Error("Not implemented"); }
  async getConversation(id: number): Promise<any> { return null; }
  async getUserConversations(userId: string): Promise<any[]> { return []; }
  async updateConversation(id: number, data: any): Promise<any> { throw new Error("Not implemented"); }
  async deleteConversation(id: number): Promise<void> {}
  async sendMessage(data: any): Promise<any> { throw new Error("Not implemented"); }
  async getMessages(conversationId: number, limit?: number, offset?: number): Promise<any[]> { return []; }
  async updateMessage(id: number, data: any): Promise<any> { throw new Error("Not implemented"); }
  async deleteMessage(id: number): Promise<void> {}
  async markMessageAsRead(id: number): Promise<void> {}
  async getUnreadCount(userId: string): Promise<number> { return 0; }
  async searchConversations(userId: string, query: string): Promise<any[]> { return []; }
  async archiveConversation(id: number): Promise<void> {}
  async unarchiveConversation(id: number): Promise<void> {}
  async getArchivedConversations(userId: string): Promise<any[]> { return []; }
  async muteConversation(id: number, userId: string): Promise<void> {}
  async unmuteConversation(id: number, userId: string): Promise<void> {}
  async getMutedConversations(userId: string): Promise<any[]> { return []; }
  async createMessageTemplate(data: any): Promise<any> { throw new Error("Not implemented"); }
  async getMessageTemplates(category?: string): Promise<any[]> { return []; }
  async updateMessageTemplate(id: number, data: any): Promise<void> {}
  async deleteMessageTemplate(id: number): Promise<void> {}
  async blockUser(blockerId: string, blockedId: string, reason?: string, blockType?: string): Promise<void> {}
  async unblockUser(blockerId: string, blockedId: string): Promise<void> {}
  async getBlockedUsers(userId: string): Promise<any[]> { return []; }
  async isUserBlocked(userId1: string, userId2: string): Promise<boolean> { return false; }
  async getNotificationSettings(userId: string): Promise<any[]> { return []; }
  async updateNotificationSettings(userId: string, conversationType: string, settings: any): Promise<void> {}
  async getConversationAnalytics(conversationId: number): Promise<any> { return null; }
  async updateConversationAnalytics(conversationId: number, data: any): Promise<void> {}
  async getMessagingStats(userId: string): Promise<{ totalConversations: number; activeConversations: number; totalMessages: number; unreadCount: number; avgResponseTime: number; }> {
    return { totalConversations: 0, activeConversations: 0, totalMessages: 0, unreadCount: 0, avgResponseTime: 0 };
  }
  async getPriceAlerts(listingId: number, userId: string): Promise<any[]> { return []; }
  async createPriceAlert(alert: any): Promise<any> { throw new Error("Not implemented"); }
  async getSmartRecommendations(listingId: number): Promise<any[]> { return []; }
  async createSmartRecommendation(recommendation: any): Promise<any> { throw new Error("Not implemented"); }
  async getCarListingById(id: number): Promise<CarListing | null> {
    const [listing] = await db.select().from(carListings).where(eq(carListings.id, id));
    return listing || null;
  }
}

export const storage = new MemStorage();