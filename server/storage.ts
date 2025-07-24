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
  type AutoFlagRule, type FlagCountTracking, type AutomatedActionsLog, type SellerReputationTracking,
  serviceCategories, serviceSubcategories, serviceProviders, providerServices, providerReviews, ecosystemSearches, providerContacts,
  type ServiceCategory, type ServiceSubcategory, type ServiceProvider, type InsertServiceProvider,
  type ProviderService, type InsertProviderService, type ProviderReview, type InsertProviderReview,
  type EcosystemSearch, type ProviderContact
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

  // Automotive Ecosystem methods
  getAllServiceCategories(): Promise<ServiceCategory[]>;
  getActiveServiceCategories(): Promise<ServiceCategory[]>;
  createServiceCategory(categoryData: Omit<ServiceCategory, 'id' | 'createdAt'>): Promise<ServiceCategory>;
  
  getSubcategoriesByCategory(categoryId: number): Promise<ServiceSubcategory[]>;
  getAllSubcategories(): Promise<ServiceSubcategory[]>;
  createServiceSubcategory(subcategoryData: Omit<ServiceSubcategory, 'id' | 'createdAt'>): Promise<ServiceSubcategory>;
  
  // Service provider methods
  createServiceProvider(providerData: InsertServiceProvider & { userId?: string }): Promise<ServiceProvider>;
  getServiceProvider(id: number): Promise<ServiceProvider | null>;
  getServiceProviders(filters?: {
    categoryId?: number;
    subcategoryId?: number;
    county?: string;
    area?: string;
    searchTerm?: string;
    isVerified?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ providers: ServiceProvider[]; total: number }>;
  updateServiceProvider(id: number, updates: Partial<ServiceProvider>): Promise<ServiceProvider>;
  deleteServiceProvider(id: number): Promise<void>;
  
  // Provider services methods
  addProviderService(serviceData: InsertProviderService): Promise<ProviderService>;
  addProviderSubcategoryService(data: { providerId: number; subcategoryId: number }): Promise<void>;
  getProviderServices(providerId: number): Promise<(ProviderService & { subcategory: ServiceSubcategory })[]>;
  removeProviderService(id: number): Promise<void>;
  
  // Provider reviews methods
  createProviderReview(reviewData: InsertProviderReview & { userId?: string }): Promise<ProviderReview>;
  getProviderReviews(providerId: number, limit?: number): Promise<ProviderReview[]>;
  approveProviderReview(reviewId: number): Promise<void>;
  rejectProviderReview(reviewId: number): Promise<void>;
  
  // Search and analytics methods
  logEcosystemSearch(searchData: Omit<EcosystemSearch, 'id' | 'searchedAt'>): Promise<void>;
  getPopularSearches(limit?: number): Promise<{ searchTerm: string; count: number }[]>;
  logProviderContact(contactData: Omit<ProviderContact, 'id' | 'contactedAt'>): Promise<void>;
  incrementProviderViews(providerId: number): Promise<void>;
  incrementProviderContacts(providerId: number): Promise<void>;
  
  getEcosystemStats(): Promise<{
    totalProviders: number;
    verifiedProviders: number;
    totalCategories: number;
    totalReviews: number;
    averageRating: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Depreciation rates and tax rates are now stored in the database
  }

  // Get depreciation rate based on vehicle type and age from database
  private async getRegistrationFee(engineCapacity: number): Promise<number> {
    // Query registration fees table for the appropriate fee based on engine capacity
    const feeResult = await db
      .select()
      .from(registrationFees)
      .where(
        sql`${engineCapacity} >= ${registrationFees.minEngineCapacity} AND ${engineCapacity} <= ${registrationFees.maxEngineCapacity}`
      )
      .limit(1);

    if (feeResult.length > 0) {
      return feeResult[0].fee;
    }

    // Fallback to highest fee if no range matches (should not happen with proper data)
    console.warn(`No registration fee found for engine capacity ${engineCapacity}cc, using highest fee`);
    return 21215; // Highest fee for 3000cc+
  }

  private async getDepreciationRate(vehicleType: 'direct' | 'previouslyRegistered', ageYears: number): Promise<number> {
    const rates = await db
      .select()
      .from(depreciationRates)
      .where(
        and(
          eq(depreciationRates.importType, vehicleType),
          sql`CAST(${depreciationRates.minYears} AS DECIMAL) <= ${ageYears}`,
          sql`CAST(${depreciationRates.maxYears} AS DECIMAL) >= ${ageYears}`
        )
      )
      .limit(1);

    if (rates.length > 0) {
      return Number(rates[0].rate);
    }

    // Fallback for edge cases
    if (vehicleType === 'direct' && ageYears > 8) {
      return 0.65;
    } else if (vehicleType === 'previouslyRegistered' && ageYears > 15) {
      return 0.95;
    }
    
    return 0;
  }

  async calculateDuty(calculation: DutyCalculation): Promise<DutyResult> {
    const { vehicleCategory, vehicleValue, vehicleAge, isDirectImport, engineSize } = calculation;

    // Apply depreciation
    const depreciationRate = await this.getDepreciationRate(
      isDirectImport ? 'direct' : 'previouslyRegistered',
      vehicleAge
    );
    const depreciatedPrice = vehicleValue * (1 - depreciationRate);

    // Get tax rates for the vehicle category
    const taxRateData = await db
      .select()
      .from(taxRates)
      .where(eq(taxRates.vehicleCategory, vehicleCategory))
      .limit(1);

    if (taxRateData.length === 0) {
      throw new Error(`Tax rates not found for vehicle category: ${vehicleCategory}`);
    }

    const taxRate = taxRateData[0];

    // Initialize result object
    const result: DutyResult = {
      currentRetailPrice: vehicleValue,
      depreciationRate: depreciationRate,
      depreciatedPrice: depreciatedPrice,
      customsValue: 0,
      importDuty: 0,
      exciseValue: 0,
      exciseDuty: 0,
      vatValue: 0,
      vat: 0,
      rdl: 0,
      idfFees: 0,
      totalTaxes: 0,
      registrationFees: 0,
      totalPayable: 0,
      breakdown: []
    };

    // Calculate using database tax rates
    // Determine customs value based on category
    const customsValueRate = vehicleCategory === 'largeEngine' ? 0.4244 : 
                           vehicleCategory === 'primeMover' || vehicleCategory === 'trailer' ? 0.62696 : 
                           0.45977;
    
    result.customsValue = depreciatedPrice * customsValueRate;
    
    // Apply import duty from database
    result.importDuty = result.customsValue * Number(taxRate.importDutyRate);
    
    // Calculate excise value and duty
    if (vehicleCategory === 'primeMover' || vehicleCategory === 'trailer') {
      result.exciseValue = 0;
      result.exciseDuty = 0;
      result.vatValue = result.customsValue + result.importDuty;
    } else {
      result.exciseValue = result.customsValue + result.importDuty;
      
      // Apply excise duty (either percentage or fixed amount for motorcycles)
      if (vehicleCategory === 'motorcycle' && taxRate.exciseDutyFixed) {
        result.exciseDuty = taxRate.exciseDutyFixed;
      } else {
        result.exciseDuty = result.exciseValue * Number(taxRate.exciseDutyRate);
      }
      
      result.vatValue = result.exciseValue + result.exciseDuty;
    }
    
    // Apply VAT
    result.vat = result.vatValue * Number(taxRate.vatRate);
    
    // Apply processing fees (RDL and IDF) based on import type
    const processingFeeData = await db
      .select()
      .from(processingFees)
      .where(
        and(
          eq(processingFees.isActive, true),
          or(
            eq(processingFees.applicableToImportType, isDirectImport ? 'direct' : 'previouslyRegistered'),
            eq(processingFees.applicableToImportType, 'both')
          )
        )
      );

    result.rdl = 0;
    result.idfFees = 0;

    for (const fee of processingFeeData) {
      const feeAmount = result.customsValue * Number(fee.rate);
      
      if (fee.feeType === 'rdl') {
        result.rdl = feeAmount;
      } else if (fee.feeType === 'idf') {
        result.idfFees = feeAmount;
      }
    }

    // Calculate registration fees based on detailed engine capacity ranges
    result.registrationFees = await this.getRegistrationFee(engineSize);

    // Calculate total taxes
    if (isDirectImport) {
      result.totalTaxes = result.importDuty + result.exciseDuty + result.vat + result.rdl + result.idfFees;
    } else {
      result.totalTaxes = result.importDuty + result.exciseDuty + result.vat;
    }

    // Calculate total payable including registration fees
    result.totalPayable = result.totalTaxes + result.registrationFees;

    // Build breakdown
    result.breakdown = [];
    
    if (depreciationRate > 0) {
      result.breakdown.push({
        label: `Depreciation (${(depreciationRate * 100).toFixed(0)}%)`,
        amount: -(vehicleValue - depreciatedPrice),
        description: `${isDirectImport ? 'Direct import' : 'Previously registered'} vehicle ${vehicleAge} years old`
      });
    }

    if (result.importDuty > 0) {
      result.breakdown.push({
        label: "Import Duty",
        amount: result.importDuty,
        description: "Customs duty on imported vehicles"
      });
    }

    if (result.exciseDuty > 0) {
      result.breakdown.push({
        label: "Excise Duty",
        amount: result.exciseDuty,
        description: vehicleCategory === 'motorcycle' ? "Fixed excise duty for motorcycles" : "Excise tax based on vehicle type"
      });
    }

    if (result.vat > 0) {
      result.breakdown.push({
        label: "VAT (16%)",
        amount: result.vat,
        description: "Value Added Tax"
      });
    }

    if (isDirectImport) {
      if (result.rdl > 0) {
        result.breakdown.push({
          label: "Railway Development Levy (2%)",
          amount: result.rdl,
          description: "RDL for infrastructure development - 2% of customs value"
        });
      }

      if (result.idfFees > 0) {
        result.breakdown.push({
          label: "Import Declaration Fee (2.5%)",
          amount: result.idfFees,
          description: "IDF processing fee - 2.5% of customs value"
        });
      }
    }

    // Add registration fees to breakdown
    if (result.registrationFees > 0) {
      result.breakdown.push({
        label: "Registration Fees (Estimate)",
        amount: result.registrationFees,
        description: `Estimated registration fees for ${engineSize < 2000 ? 'vehicles below 2000cc' : 'vehicles 2000cc and above'}`
      });
    }

    // Round all values to 2 decimal places
    for (const key in result) {
      if (typeof result[key as keyof DutyResult] === 'number') {
        (result as any)[key] = Math.round((result as any)[key] * 100) / 100;
      }
    }

    // Round breakdown amounts
    result.breakdown = result.breakdown.map(item => ({
      ...item,
      amount: Math.round(item.amount * 100) / 100
    }));

    // Check if we need to use CRSP 2020 based on vehicle value source
    result.usedCrsp2020 = false; // Will be updated by frontend if 2020 CRSP was used

    return result;
  }

  async saveCalculation(vehicleData: InsertVehicle, calculationData: Omit<InsertCalculation, 'vehicleId'>): Promise<{ vehicle: Vehicle; calculation: Calculation }> {
    try {
      // Insert vehicle first
      const [vehicle] = await db
        .insert(vehicles)
        .values(vehicleData)
        .returning();

      // Insert calculation with vehicle ID
      const [calculation] = await db
        .insert(calculations)
        .values({
          ...calculationData,
          vehicleId: vehicle.id,
        })
        .returning();

      return { vehicle, calculation };
    } catch (error) {
      console.error("Failed to save calculation:", error);
      throw new Error("Failed to save calculation to database");
    }
  }

  async getCalculationHistory(limit: number = 10): Promise<Array<Vehicle & { calculation: Calculation }>> {
    try {
      const results = await db
        .select()
        .from(vehicles)
        .leftJoin(calculations, eq(vehicles.id, calculations.vehicleId))
        .orderBy(vehicles.createdAt)
        .limit(limit);

      return results
        .filter(result => result.calculations) // Only return vehicles that have calculations
        .map(result => ({
          ...result.vehicles,
          calculation: result.calculations!,
        }));
    } catch (error) {
      console.error("Failed to fetch calculation history:", error);
      throw new Error("Failed to fetch calculation history");
    }
  }

  // User management methods implementation
  async createUser(userData: InsertAppUser & { password: string }): Promise<AppUser> {
    const { password, ...userDataWithoutPassword } = userData;
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db
      .insert(appUsers)
      .values({ 
        ...userDataWithoutPassword, 
        passwordHash: hashedPassword,
        id: crypto.randomUUID()
      })
      .returning();
    
    // Create default user preferences
    await db
      .insert(userPreferences)
      .values({ userId: user.id })
      .execute();
    
    // Create default user stats
    await db
      .insert(userStats)
      .values({ userId: user.id })
      .execute();
    
    return user;
  }

  async getUserById(id: string): Promise<AppUser | undefined> {
    const [user] = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<AppUser | undefined> {
    const [user] = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.email, email));
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertAppUser>): Promise<AppUser> {
    const [user] = await db
      .update(appUsers)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(appUsers.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(appUsers).where(eq(appUsers.id, id));
  }

  async getUserRole(userId: string): Promise<UserRole | undefined> {
    const result = await db
      .select({ role: userRoles })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .where(eq(appUsers.id, userId));
    
    return result[0]?.role || undefined;
  }

  async getUserWithRole(userId: string): Promise<AppUser & { role?: UserRole } | null> {
    const result = await db
      .select({ 
        user: appUsers,
        role: userRoles 
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .where(eq(appUsers.id, userId));
    
    if (result.length === 0) return null;
    
    const { user, role } = result[0];
    return { ...user, role: role || undefined };
  }

  async updateUserRole(userId: string, roleId: number): Promise<void> {
    await db
      .update(appUsers)
      .set({ roleId, updatedAt: new Date() })
      .where(eq(appUsers.id, userId));
  }

  // Role management methods
  async getAllRoles(): Promise<UserRole[]> {
    return await db.select().from(userRoles);
  }

  async createRole(roleData: InsertUserRole): Promise<UserRole> {
    const [role] = await db
      .insert(userRoles)
      .values(roleData)
      .returning();
    return role;
  }

  async updateRole(id: number, roleData: Partial<InsertUserRole>): Promise<UserRole> {
    const [role] = await db
      .update(userRoles)
      .set(roleData)
      .where(eq(userRoles.id, id))
      .returning();
    return role;
  }

  async deleteRole(id: number): Promise<void> {
    await db.delete(userRoles).where(eq(userRoles.id, id));
  }

  // Listing management methods
  async getAllListingsForAdmin(): Promise<Array<CarListing & { seller: AppUser; approval?: ListingApproval }>> {
    const results = await db
      .select({
        listing: carListings,
        seller: appUsers,
        approval: listingApprovals
      })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id))
      .leftJoin(listingApprovals, eq(carListings.id, listingApprovals.listingId))
      .orderBy(desc(carListings.createdAt));

    return results.map(r => ({
      ...r.listing,
      seller: r.seller!,
      approval: r.approval || undefined
    }));
  }

  async getListingsByUser(userId: string): Promise<CarListing[]> {
    // Optimized query with selective fields and limit
    return await db
      .select({
        id: carListings.id,
        title: carListings.title,
        make: carListings.make,
        model: carListings.model,
        year: carListings.year,
        price: carListings.price,
        location: carListings.location,
        mileage: carListings.mileage,
        fuelType: carListings.fuelType,
        transmission: carListings.transmission,
        bodyType: carListings.bodyType,
        exteriorColor: carListings.exteriorColor,
        status: carListings.status,
        viewCount: carListings.viewCount,
        favoriteCount: carListings.favoriteCount,
        createdAt: carListings.createdAt,
        updatedAt: carListings.updatedAt,
        images: carListings.images,
        sellerId: carListings.sellerId
      })
      .from(carListings)
      .where(eq(carListings.sellerId, userId))
      .orderBy(desc(carListings.createdAt))
      .limit(100); // Limit to 100 most recent listings
  }

  async createListing(listingData: InsertCarListing & { sellerId: string }): Promise<CarListing> {
    const [listing] = await db
      .insert(carListings)
      .values({
        ...listingData,
        price: listingData.price.toString()
      })
      .returning();

    // Create approval record
    await db
      .insert(listingApprovals)
      .values({ listingId: listing.id })
      .execute();

    // Log activity
    await this.logUserActivity(
      listingData.sellerId,
      'listing_created',
      'listing',
      listing.id.toString(),
      `Created listing: ${listingData.title}`
    );

    return listing;
  }

  async updateListing(id: number, listingData: Partial<InsertCarListing>): Promise<CarListing> {
    const updateData: any = { ...listingData, updatedAt: new Date() };
    // Convert price to string if it exists
    if (updateData.price !== undefined) {
      updateData.price = updateData.price.toString();
    }
    const [listing] = await db
      .update(carListings)
      .set(updateData)
      .where(eq(carListings.id, id))
      .returning();
    return listing;
  }

  async deleteListing(id: number): Promise<void> {
    await db.delete(carListings).where(eq(carListings.id, id));
  }

  // Approval workflow methods
  async approveListing(listingId: number, reviewerId: string, notes?: string): Promise<ListingApproval> {
    // Update listing status
    await db
      .update(carListings)
      .set({ status: 'active', isVerified: true })
      .where(eq(carListings.id, listingId));

    // Update approval record
    const [approval] = await db
      .update(listingApprovals)
      .set({
        status: 'approved',
        reviewerId,
        reviewNotes: notes,
        reviewedAt: new Date()
      })
      .where(eq(listingApprovals.listingId, listingId))
      .returning();

    return approval;
  }

  async rejectListing(listingId: number, reviewerId: string, reason: string): Promise<ListingApproval> {
    // Update listing status
    await db
      .update(carListings)
      .set({ status: 'suspended' })
      .where(eq(carListings.id, listingId));

    // Update approval record
    const [approval] = await db
      .update(listingApprovals)
      .set({
        status: 'rejected',
        reviewerId,
        rejectionReason: reason,
        reviewedAt: new Date()
      })
      .where(eq(listingApprovals.listingId, listingId))
      .returning();

    return approval;
  }

  async requestChanges(listingId: number, reviewerId: string, changes: string[], notes?: string): Promise<ListingApproval> {
    // Update approval record
    const [approval] = await db
      .update(listingApprovals)
      .set({
        status: 'changes_requested',
        reviewerId,
        requestedChanges: changes,
        reviewNotes: notes,
        reviewedAt: new Date()
      })
      .where(eq(listingApprovals.listingId, listingId))
      .returning();

    return approval;
  }

  async getListingApproval(listingId: number): Promise<ListingApproval | undefined> {
    const [approval] = await db
      .select()
      .from(listingApprovals)
      .where(eq(listingApprovals.listingId, listingId));
    return approval;
  }

  // User activity tracking
  async logUserActivity(userId: string, activityType: string, entityType?: string, entityId?: string, description?: string, metadata?: any): Promise<void> {
    await db
      .insert(userActivities)
      .values({
        userId,
        activityType,
        entityType,
        entityId,
        description,
        metadata: metadata ? JSON.stringify(metadata) : undefined
      })
      .execute();
  }

  async getUserActivities(userId: string, limit: number = 50): Promise<UserActivity[]> {
    return await db
      .select()
      .from(userActivities)
      .where(eq(userActivities.userId, userId))
      .orderBy(desc(userActivities.createdAt))
      .limit(limit);
  }

  // User stats and metrics
  async getUserStats(userId: string): Promise<UserStats | undefined> {
    const [stats] = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId));
    return stats;
  }

  async updateUserStats(userId: string, updates: Partial<UserStats>): Promise<UserStats> {
    const [stats] = await db
      .update(userStats)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userStats.userId, userId))
      .returning();
    return stats;
  }

  // User preferences
  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    return preferences;
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const [updated] = await db
      .update(userPreferences)
      .set({ ...preferences, updatedAt: new Date() })
      .where(eq(userPreferences.userId, userId))
      .returning();
    return updated;
  }

  // Password reset token methods
  async createPasswordResetToken(email: string): Promise<PasswordResetToken> {
    const token = require('crypto').randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    
    const [resetToken] = await db
      .insert(passwordResetTokens)
      .values({
        email,
        token,
        expiresAt,
      })
      .returning();
    
    return resetToken;
  }

  async getValidPasswordResetToken(token: string): Promise<PasswordResetToken | undefined> {
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, token),
          gt(passwordResetTokens.expiresAt, new Date()),
          isNull(passwordResetTokens.usedAt)
        )
      );
    
    return resetToken;
  }

  async markPasswordResetTokenAsUsed(token: string): Promise<void> {
    await db
      .update(passwordResetTokens)
      .set({ usedAt: new Date() })
      .where(eq(passwordResetTokens.token, token));
  }

  async updateUserPassword(email: string, newPassword: string): Promise<void> {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db
      .update(appUsers)
      .set({ 
        passwordHash: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(appUsers.email, email));
  }

  async generateUserRecommendations(userId: string): Promise<Array<{
    id: string;
    type: 'tool' | 'action' | 'content';
    title: string;
    description: string;
    href: string;
    icon: string;
    color: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }>> {
    try {
      const recommendations = [];
      
      // Get user stats and recent activities
      const [stats, activities] = await Promise.all([
        this.getUserStats(userId),
        this.getUserActivities(userId, 50)
      ]);

      // Track what tools user has used
      const usedTools = new Set();
      activities.forEach(activity => {
        if (activity.activityType.includes('calculation')) usedTools.add('calculator');
        if (activity.activityType.includes('valuation')) usedTools.add('valuation');
        if (activity.activityType.includes('transfer')) usedTools.add('transfer');
        if (activity.activityType.includes('listing')) usedTools.add('marketplace');
      });

      // Recommendation 1: First-time user guidance
      if (activities.length === 0 || activities.length < 3) {
        recommendations.push({
          id: 'getting-started',
          type: 'action' as const,
          title: 'Start with Duty Calculator',
          description: 'Calculate Kenya import duties and taxes with official KRA rates',
          href: '/duty-calculator',
          icon: 'Calculator',
          color: 'bg-purple-500',
          priority: 'high' as const,
          reason: 'Perfect for first-time users to understand vehicle import costs'
        });
      }

      // Recommendation 2: Transfer calculator for duty users
      if ((stats?.totalDutyCalculations || 0) > 0 && (stats?.totalTransferCalculations || 0) === 0) {
        recommendations.push({
          id: 'transfer-next',
          type: 'tool' as const,
          title: 'Calculate Transfer Costs',
          description: 'Get precise ownership transfer fees for your imported vehicle',
          href: '/transfer-cost',
          icon: 'FileText',
          color: 'bg-cyan-500',
          priority: 'high' as const,
          reason: 'Complete your vehicle ownership process after import'
        });
      }

      // Recommendation 3: Valuation for active users
      if ((stats?.totalDutyCalculations || 0) > 2 && (stats?.totalValuations || 0) === 0) {
        recommendations.push({
          id: 'valuation-suggestion',
          type: 'tool' as const,
          title: 'Get Vehicle Valuation',
          description: 'Check current market value of any vehicle in Kenya',
          href: '/mycars-worth',
          icon: 'Banknote',
          color: 'bg-green-500',
          priority: 'medium' as const,
          reason: 'Great for understanding vehicle depreciation and market trends'
        });
      }

      // Recommendation 4: Marketplace for calculation users
      if ((stats?.totalDutyCalculations || 0) > 1 && (stats?.totalListings || 0) === 0) {
        recommendations.push({
          id: 'marketplace-suggestion',
          type: 'action' as const,
          title: 'List Your Vehicle',
          description: 'Sell your car on Kenya\'s trusted marketplace',
          href: '/sell-my-car',
          icon: 'ShoppingCart',
          color: 'bg-pink-500',
          priority: 'medium' as const,
          reason: 'Turn your vehicle knowledge into profit'
        });
      }

      // Recommendation 5: Import estimator for heavy users
      if ((stats?.totalDutyCalculations || 0) > 5) {
        recommendations.push({
          id: 'import-estimator',
          type: 'tool' as const,
          title: 'Import Cost Estimator',
          description: 'Estimate total vehicle importation costs including shipping',
          href: '/importation-estimator',
          icon: 'Car',
          color: 'bg-blue-500',
          priority: 'low' as const,
          reason: 'Perfect for experienced importers planning multiple purchases'
        });
      }

      // Recommendation 6: Service estimator for active marketplace users
      if ((stats?.totalListings || 0) > 0 || (stats?.totalValuations || 0) > 2) {
        recommendations.push({
          id: 'service-estimator',
          type: 'tool' as const,
          title: 'Service Cost Estimates',
          description: 'Plan maintenance costs for optimal vehicle condition',
          href: '/service-estimator',
          icon: 'Wrench',
          color: 'bg-orange-500',
          priority: 'low' as const,
          reason: 'Maintain your vehicle\'s value with proper service planning'
        });
      }

      // Recommendation 7: Vehicle loans for high-value calculations
      const recentCalculations = activities.filter(a => a.activityType === 'duty_calculation').slice(0, 5);
      if (recentCalculations.length > 0) {
        recommendations.push({
          id: 'vehicle-loans',
          type: 'content' as const,
          title: 'Explore Vehicle Financing',
          description: 'Discover loan products for your next vehicle purchase',
          href: '/vehicle-loans',
          icon: 'CreditCard',
          color: 'bg-emerald-500',
          priority: 'low' as const,
          reason: 'Finance your next vehicle purchase with competitive rates'
        });
      }

      // Sort by priority and limit to top 4 recommendations
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return recommendations
        .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        .slice(0, 4);

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  // Admin authentication methods
  async getAdminByUsername(username: string): Promise<AdminCredential | undefined> {
    const [admin] = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.username, username))
      .limit(1);
    return admin;
  }

  async validateAdminPassword(username: string, password: string): Promise<AdminCredential | null> {
    const admin = await this.getAdminByUsername(username);
    if (!admin || !admin.isActive) {
      return null;
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    return isValid ? admin : null;
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db
      .update(adminCredentials)
      .set({ 
        lastLoginAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(adminCredentials.id, id));
  }

  async createAdmin(adminData: InsertAdminCredential & { password: string }): Promise<AdminCredential> {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    
    const [admin] = await db
      .insert(adminCredentials)
      .values({
        username: adminData.username,
        passwordHash: hashedPassword,
        permissions: adminData.permissions || ['all'],
        isActive: adminData.isActive ?? true
      })
      .returning();
    
    return admin;
  }

  async updateAdminPassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db
      .update(adminCredentials)
      .set({ 
        passwordHash: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(adminCredentials.id, id));
  }

  // Admin management methods implementation
  async getListingsWithStats(filters?: { 
    status?: string; 
    make?: string; 
    seller?: string; 
    flagged?: boolean; 
    sortBy?: string; 
    page?: number; 
    limit?: number; 
  }): Promise<{ listings: any[]; total: number; }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    let whereConditions = [];
    
    if (filters?.status) {
      whereConditions.push(eq(carListings.status, filters.status));
    }
    
    if (filters?.make) {
      whereConditions.push(eq(carListings.make, filters.make));
    }
    
    if (filters?.seller) {
      whereConditions.push(
        or(
          sql`${appUsers.firstName} ILIKE ${`%${filters.seller}%`}`,
          sql`${appUsers.lastName} ILIKE ${`%${filters.seller}%`}`,
          sql`${appUsers.email} ILIKE ${`%${filters.seller}%`}`,
          sql`${carListings.phoneNumber} ILIKE ${`%${filters.seller}%`}`
        )
      );
    }

    // Get listings with seller info and approval status
    const listingsQuery = db
      .select({
        listing: carListings,
        seller: {
          id: appUsers.id,
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          email: appUsers.email,
        },
        approval: listingApprovals,
        flagCount: sql<number>`(SELECT COUNT(*) FROM ${listingFlags} WHERE ${listingFlags.listingId} = ${carListings.id} AND ${listingFlags.status} = 'pending')`,
        viewCount: sql<number>`COALESCE((SELECT ${listingAnalytics.viewCount} FROM ${listingAnalytics} WHERE ${listingAnalytics.listingId} = ${carListings.id}), 0)`,
        inquiryCount: sql<number>`COALESCE((SELECT ${listingAnalytics.inquiryCount} FROM ${listingAnalytics} WHERE ${listingAnalytics.listingId} = ${carListings.id}), 0)`,
      })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id))
      .leftJoin(listingApprovals, eq(listingApprovals.listingId, carListings.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .limit(limit)
      .offset(offset);

    // Add sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price':
          listingsQuery.orderBy(desc(carListings.price));
          break;
        case 'views':
          listingsQuery.orderBy(desc(sql`COALESCE((SELECT ${listingAnalytics.viewCount} FROM ${listingAnalytics} WHERE ${listingAnalytics.listingId} = ${carListings.id}), 0)`));
          break;
        case 'date':
          listingsQuery.orderBy(desc(carListings.createdAt));
          break;
        default:
          listingsQuery.orderBy(desc(carListings.createdAt));
      }
    } else {
      listingsQuery.orderBy(desc(carListings.createdAt));
    }

    const listings = await listingsQuery;

    // Get total count
    const totalQuery = db
      .select({ count: sql<number>`COUNT(*)` })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const [{ count: total }] = await totalQuery;

    return { listings, total };
  }

  async getAllUsers(filters?: { 
    search?: string; 
    role?: string; 
    page?: number; 
    limit?: number; 
  }): Promise<{ users: any[]; total: number; }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    let whereConditions = [];
    
    if (filters?.search) {
      whereConditions.push(
        or(
          sql`${appUsers.firstName} ILIKE ${`%${filters.search}%`}`,
          sql`${appUsers.lastName} ILIKE ${`%${filters.search}%`}`,
          sql`${appUsers.email} ILIKE ${`%${filters.search}%`}`
        )
      );
    }
    
    if (filters?.role) {
      whereConditions.push(eq(userRoles.name, filters.role));
    }

    const usersQuery = db
      .select({
        user: appUsers,
        role: userRoles,
        stats: userStats,
        warningCount: sql<number>`(SELECT COUNT(*) FROM ${userWarnings} WHERE ${userWarnings.userId} = ${appUsers.id} AND ${userWarnings.acknowledged} = false)`,
        listingCount: sql<number>`(SELECT COUNT(*) FROM ${carListings} WHERE ${carListings.sellerId} = ${appUsers.id})`,
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .leftJoin(userStats, eq(userStats.userId, appUsers.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(appUsers.createdAt))
      .limit(limit)
      .offset(offset);

    const users = await usersQuery;

    // Get total count
    const totalQuery = db
      .select({ count: sql<number>`COUNT(*)` })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const [{ count: total }] = await totalQuery;

    return { users, total };
  }

  async getAdminDashboardStats(): Promise<{ 
    totalListings: number; 
    pendingApproval: number; 
    approvedListings: number; 
    rejectedListings: number; 
    flaggedListings: number; 
  }> {
    const [
      totalListings,
      pendingApproval,
      approvedListings,
      rejectedListings,
      flaggedListings
    ] = await Promise.all([
      db.select({ count: sql<number>`COUNT(*)` }).from(carListings),
      db.select({ count: sql<number>`COUNT(*)` }).from(carListings).where(eq(carListings.status, 'pending')),
      db.select({ count: sql<number>`COUNT(*)` }).from(carListings).where(eq(carListings.status, 'approved')),
      db.select({ count: sql<number>`COUNT(*)` }).from(carListings).where(eq(carListings.status, 'rejected')),
      db.select({ count: sql<number>`COUNT(DISTINCT ${listingFlags.listingId})` }).from(listingFlags).where(eq(listingFlags.status, 'pending'))
    ]);

    return {
      totalListings: totalListings[0].count,
      pendingApproval: pendingApproval[0].count,
      approvedListings: approvedListings[0].count,
      rejectedListings: rejectedListings[0].count,
      flaggedListings: flaggedListings[0].count,
    };
  }

  async bulkUpdateListingStatus(
    listingIds: number[], 
    status: string, 
    adminId: string, 
    reason?: string
  ): Promise<void> {
    await db.transaction(async (tx) => {
      // Update listings
      await tx
        .update(carListings)
        .set({ status })
        .where(inArray(carListings.id, listingIds));

      // Log admin actions
      for (const listingId of listingIds) {
        await tx.insert(adminAuditLog).values({
          adminId,
          adminUsername: 'admin', // TODO: Get actual admin username
          action: `bulk_${status}_listing`,
          entityType: 'listing',
          entityId: listingId.toString(),
          details: JSON.stringify({ reason, bulkOperation: true }),
        });
      }

      // Update approvals if needed
      if (status === 'approved' || status === 'rejected') {
        for (const listingId of listingIds) {
          await tx
            .insert(listingApprovals)
            .values({
              listingId,
              reviewerId: adminId,
              status,
              reviewNotes: reason,
              reviewedAt: new Date(),
            })
            .onConflictDoUpdate({
              target: [listingApprovals.listingId],
              set: {
                status,
                reviewNotes: reason,
                reviewedAt: new Date(),
              }
            });
        }
      }
    });
  }

  async getUserHistory(userId: string): Promise<{ 
    listings: CarListing[]; 
    warnings: any[]; 
    activities: UserActivity[]; 
  }> {
    try {
      const [listings, warnings, activities] = await Promise.all([
        db.select().from(carListings).where(eq(carListings.sellerId, userId)).orderBy(desc(carListings.createdAt)),
        // Use raw SQL for user_warnings to match actual table structure
        db.execute(sql`
          SELECT id, user_id, warning_type, description, issued_by, severity, acknowledged, created_at
          FROM user_warnings 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `),
        // Use raw SQL for user_activities to match actual table structure  
        db.execute(sql`
          SELECT id, user_id, activity_type, entity_type, entity_id, description, metadata, ip_address, user_agent, created_at
          FROM user_activities 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC 
          LIMIT 50
        `)
      ]);

      return { 
        listings, 
        warnings: warnings.rows || [], 
        activities: activities.rows || [] 
      };
    } catch (error) {
      console.error('Error in getUserHistory:', error);
      return { listings: [], warnings: [], activities: [] };
    }
  }

  // User engagement methods implementation
  async addToFavorites(userId: string, listingId: number): Promise<void> {
    await db.insert(favoriteListings).values({
      userId,
      listingId,
      createdAt: new Date()
    });
  }

  async removeFromFavorites(userId: string, listingId: number): Promise<void> {
    await db.delete(favoriteListings).where(
      and(
        eq(favoriteListings.userId, userId),
        eq(favoriteListings.listingId, listingId)
      )
    );
  }

  async getUserFavorites(userId: string): Promise<any[]> {
    return await db
      .select()
      .from(favoriteListings)
      .innerJoin(carListings, eq(favoriteListings.listingId, carListings.id))
      .where(eq(favoriteListings.userId, userId))
      .orderBy(desc(favoriteListings.createdAt));
  }

  async getUserFavorite(userId: string, listingId: number): Promise<any | undefined> {
    const [result] = await db
      .select()
      .from(favoriteListings)
      .where(
        and(
          eq(favoriteListings.userId, userId),
          eq(favoriteListings.listingId, listingId)
        )
      )
      .limit(1);
    return result;
  }

  async saveSearch(userId: string, searchName: string, filters: any): Promise<void> {
    await db.insert(savedSearches).values({
      userId,
      searchName,
      filters: typeof filters === 'string' ? filters : JSON.stringify(filters),
      createdAt: new Date()
    });
  }

  async getUserSavedSearches(userId: string): Promise<any[]> {
    const searches = await db
      .select()
      .from(savedSearches)
      .where(eq(savedSearches.userId, userId))
      .orderBy(desc(savedSearches.createdAt));
    
    // Transform the data to match frontend expectations
    return searches.map(search => {
      let parsedFilters = {};
      try {
        parsedFilters = typeof search.filters === 'string' ? JSON.parse(search.filters) : search.filters;
      } catch (e) {
        console.error('Error parsing filters for search:', search.id, e);
        parsedFilters = {};
      }
      
      return {
        id: search.id,
        userId: search.userId,
        name: search.searchName, // Map searchName to name
        filters: parsedFilters,
        alertEnabled: search.alertEnabled,
        createdAt: search.createdAt.toISOString(),
        updatedAt: search.createdAt.toISOString() // Use createdAt as fallback for updatedAt
      };
    });
  }

  async addToComparison(userId: string, listingId: number): Promise<void> {
    // Check if user already has a comparison
    const [existingComparison] = await db
      .select()
      .from(carComparisons)
      .where(eq(carComparisons.userId, userId))
      .limit(1);

    if (existingComparison) {
      // Update existing comparison to include the new listing
      const currentListings = existingComparison.listingIds || [];
      const listingIdStr = listingId.toString();
      
      if (!currentListings.includes(listingIdStr)) {
        const updatedListings = [...currentListings, listingIdStr];
        await db
          .update(carComparisons)
          .set({ listingIds: updatedListings })
          .where(eq(carComparisons.id, existingComparison.id));
      }
    } else {
      // Create new comparison
      await db.insert(carComparisons).values({
        userId,
        listingIds: [listingId.toString()],
        comparisonName: `My Comparison`,
        createdAt: new Date()
      });
    }
  }

  async removeFromComparison(userId: string, listingId: number): Promise<void> {
    const [existingComparison] = await db
      .select()
      .from(carComparisons)
      .where(eq(carComparisons.userId, userId))
      .limit(1);

    if (existingComparison) {
      const currentListings = existingComparison.listingIds || [];
      const listingIdStr = listingId.toString();
      const updatedListings = currentListings.filter(id => id !== listingIdStr);
      
      if (updatedListings.length > 0) {
        await db
          .update(carComparisons)
          .set({ listingIds: updatedListings })
          .where(eq(carComparisons.id, existingComparison.id));
      } else {
        // Remove comparison if no listings left
        await db
          .delete(carComparisons)
          .where(eq(carComparisons.id, existingComparison.id));
      }
    }
  }

  async getUserComparison(userId: string): Promise<any[]> {
    const [comparison] = await db
      .select()
      .from(carComparisons)
      .where(eq(carComparisons.userId, userId))
      .limit(1);

    if (!comparison || !comparison.listingIds || comparison.listingIds.length === 0) {
      return [];
    }

    // Convert string IDs to numbers for query
    const listingIds = comparison.listingIds.map(id => parseInt(id));
    
    return await db
      .select()
      .from(carListings)
      .where(sql`${carListings.id} IN (${sql.join(listingIds.map(id => sql`${id}`), sql`, `)})`)
      .orderBy(desc(carListings.createdAt));
  }

  // Enhanced listing management methods implementation
  async flagListing(listingId: number, adminId: string, reason: string, notes?: string): Promise<void> {
    const flagData: any = { 
      isFlagged: true, 
      flagReason: reason, 
      flaggedAt: new Date(),
      flaggedBy: adminId 
    };
    
    // If notes are provided, append them to the reason
    if (notes && notes.trim()) {
      flagData.flagReason = `${reason} - Additional notes: ${notes.trim()}`;
    }
    
    await db.update(carListings)
      .set(flagData)
      .where(eq(carListings.id, listingId));
    
    await this.logUserActivity(adminId, 'flag_listing', 'listing', listingId.toString(), `Flagged listing: ${flagData.flagReason}`);
    
    // Process automated flagging system
    try {
      await this.processAutomatedFlag(listingId, reason, adminId);
    } catch (error) {
      console.error('Error processing automated flag:', error);
      // Don't fail the main flagging operation if automated system fails
    }
  }

  async unflagListing(listingId: number, adminId: string): Promise<void> {
    await db.update(carListings)
      .set({ 
        isFlagged: false, 
        flagReason: null, 
        flaggedAt: null,
        flaggedBy: null 
      })
      .where(eq(carListings.id, listingId));
    
    await this.logUserActivity(adminId, 'unflag_listing', 'listing', listingId.toString(), 'Removed flag from listing');
  }

  async getListingById(id: number): Promise<CarListing & { seller: AppUser; approval?: ListingApproval } | null> {
    const [result] = await db
      .select({
        // Listing fields
        listing: carListings,
        // Seller information
        seller: {
          id: appUsers.id,
          firstName: appUsers.firstName,
          lastName: appUsers.lastName,
          email: appUsers.email,
          phoneNumber: appUsers.phoneNumber,
          createdAt: appUsers.createdAt,
          updatedAt: appUsers.updatedAt,
          roleId: appUsers.roleId,
          isActive: appUsers.isActive,
          lastLoginAt: appUsers.lastLoginAt,
          isEmailVerified: appUsers.isEmailVerified
        },
        // Approval information
        approval: {
          id: listingApprovals.id,
          listingId: listingApprovals.listingId,
          status: listingApprovals.status,
          reviewerId: listingApprovals.reviewerId,
          reviewNotes: listingApprovals.reviewNotes,
          reviewedAt: listingApprovals.reviewedAt,
          createdAt: listingApprovals.createdAt
        }
      })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id))
      .leftJoin(listingApprovals, eq(carListings.id, listingApprovals.listingId))
      .where(eq(carListings.id, id));
    
    if (!result) {
      return null;
    }
    
    // Transform the result to match the expected interface
    return {
      ...result.listing,
      seller: result.seller,
      approval: result.approval?.id ? result.approval : undefined
    } as CarListing & { seller: AppUser; approval?: ListingApproval };
  }

  async addAdminNote(listingId: number, adminId: string, note: string): Promise<void> {
    // For now, store in user activity - can be extended to dedicated table
    await this.logUserActivity(adminId, 'admin_note', 'listing', listingId.toString(), note);
  }

  async getListingNotes(listingId: number): Promise<any[]> {
    const notes = await db
      .select({
        id: userActivities.id,
        note: userActivities.description,
        adminId: userActivities.userId,
        createdAt: userActivities.createdAt,
        admin: {
          firstName: appUsers.firstName,
          lastName: appUsers.lastName
        }
      })
      .from(userActivities)
      .leftJoin(appUsers, eq(userActivities.userId, appUsers.id))
      .where(and(
        eq(userActivities.entityType, 'listing'),
        eq(userActivities.entityId, listingId.toString()),
        eq(userActivities.activityType, 'admin_note')
      ))
      .orderBy(desc(userActivities.createdAt));
    
    return notes;
  }

  async markListingAsSold(listingId: number, adminId: string): Promise<void> {
    await db.update(carListings)
      .set({ 
        status: 'sold',
        soldAt: new Date(),
        soldBy: adminId
      })
      .where(eq(carListings.id, listingId));
    
    await this.logUserActivity(adminId, 'mark_sold', 'listing', listingId.toString(), 'Marked listing as sold');
  }

  async archiveListing(listingId: number, adminId: string): Promise<void> {
    await db.update(carListings)
      .set({ 
        status: 'archived',
        archivedAt: new Date(),
        archivedBy: adminId
      })
      .where(eq(carListings.id, listingId));
    
    await this.logUserActivity(adminId, 'archive_listing', 'listing', listingId.toString(), 'Archived listing');
  }

  async restoreListing(listingId: number, adminId: string): Promise<void> {
    await db.update(carListings)
      .set({ 
        status: 'active',
        archivedAt: null,
        archivedBy: null
      })
      .where(eq(carListings.id, listingId));
    
    await this.logUserActivity(adminId, 'restore_listing', 'listing', listingId.toString(), 'Restored listing from archive');
  }

  async duplicateCheck(listingId: number): Promise<any[]> {
    const [listing] = await db
      .select()
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) return [];
    
    // Check for potential duplicates based on make, model, year, and similar price
    const duplicates = await db
      .select()
      .from(carListings)
      .where(and(
        eq(carListings.make, listing.make),
        eq(carListings.model, listing.model),
        eq(carListings.year, listing.year),
        sql`ABS(CAST(${carListings.price} AS DECIMAL) - CAST(${listing.price} AS DECIMAL)) < CAST(${listing.price} AS DECIMAL) * 0.1`, // Within 10% price range
        sql`${carListings.id} != ${listingId}` // Exclude the listing being checked
      ));
    
    return duplicates;
  }

  async exportListings(filters?: any): Promise<any[]> {
    let whereConditions = [];
    
    // Apply filters if provided
    if (filters?.status && filters.status !== 'all') {
      whereConditions.push(eq(carListings.status, filters.status));
    }
    
    if (filters?.make && filters.make !== 'all') {
      whereConditions.push(eq(carListings.make, filters.make));
    }
    
    if (filters?.flagged) {
      whereConditions.push(eq(carListings.isFlagged, true));
    }
    
    const baseQuery = db
      .select({
        id: carListings.id,
        title: carListings.title,
        make: carListings.make,
        model: carListings.model,
        year: carListings.year,
        price: carListings.price,
        mileage: carListings.mileage,
        status: carListings.status,
        createdAt: carListings.createdAt,
        sellerEmail: appUsers.email,
        sellerName: sql`${appUsers.firstName} || ' ' || ${appUsers.lastName}`,
        location: carListings.location,
        isFlagged: carListings.isFlagged,
        flagReason: carListings.flagReason
      })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id));
    
    const query = whereConditions.length > 0 
      ? baseQuery.where(and(...whereConditions))
      : baseQuery;
    
    return await query.orderBy(desc(carListings.createdAt));
  }

  // Media management methods
  async addListingImages(listingId: number, newImages: string[]): Promise<void> {
    const [listing] = await db
      .select({ images: carListings.images })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentImages = listing.images || [];
    const updatedImages = [...currentImages, ...newImages];
    
    await db
      .update(carListings)
      .set({ 
        images: updatedImages,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  async deleteListingImage(listingId: number, imageIndex: number): Promise<void> {
    const [listing] = await db
      .select({ images: carListings.images })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentImages = listing.images || [];
    if (imageIndex < 0 || imageIndex >= currentImages.length) {
      throw new Error('Invalid image index');
    }
    
    const updatedImages = currentImages.filter((_, index) => index !== imageIndex);
    
    await db
      .update(carListings)
      .set({ 
        images: updatedImages,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  async reorderListingImages(listingId: number, newOrder: number[]): Promise<void> {
    const [listing] = await db
      .select({ images: carListings.images })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentImages = listing.images || [];
    if (newOrder.length !== currentImages.length) {
      throw new Error('New order must contain all image indices');
    }
    
    // Validate that all indices are valid
    const validIndices = newOrder.every(index => index >= 0 && index < currentImages.length);
    if (!validIndices) {
      throw new Error('Invalid image indices in new order');
    }
    
    const reorderedImages = newOrder.map(index => currentImages[index]);
    
    await db
      .update(carListings)
      .set({ 
        images: reorderedImages,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  async setFeaturedImage(listingId: number, featuredIndex: number): Promise<void> {
    const [listing] = await db
      .select({ images: carListings.images })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentImages = listing.images || [];
    if (featuredIndex < 0 || featuredIndex >= currentImages.length) {
      throw new Error('Invalid featured image index');
    }
    
    // Move the featured image to the first position
    const featuredImage = currentImages[featuredIndex];
    const otherImages = currentImages.filter((_, index) => index !== featuredIndex);
    const reorderedImages = [featuredImage, ...otherImages];
    
    await db
      .update(carListings)
      .set({ 
        images: reorderedImages,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  // Video management methods
  async addListingVideos(listingId: number, newVideos: string[]): Promise<void> {
    const [listing] = await db
      .select({ videos: carListings.videos })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentVideos = listing.videos || [];
    const updatedVideos = [...currentVideos, ...newVideos];
    
    await db
      .update(carListings)
      .set({ 
        videos: updatedVideos,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  async deleteListingVideo(listingId: number, videoIndex: number): Promise<void> {
    const [listing] = await db
      .select({ videos: carListings.videos })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentVideos = listing.videos || [];
    if (videoIndex < 0 || videoIndex >= currentVideos.length) {
      throw new Error('Invalid video index');
    }
    
    const updatedVideos = currentVideos.filter((_, index) => index !== videoIndex);
    
    await db
      .update(carListings)
      .set({ 
        videos: updatedVideos,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  // Document management methods
  async addListingDocuments(listingId: number, newDocuments: Array<{url: string; name: string; type: 'logbook' | 'inspection' | 'ownership' | 'other'}>): Promise<void> {
    const [listing] = await db
      .select({ documents: carListings.documents })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentDocuments = listing.documents || [];
    const updatedDocuments = [...currentDocuments, ...newDocuments];
    
    await db
      .update(carListings)
      .set({ 
        documents: updatedDocuments,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  async deleteListingDocument(listingId: number, documentIndex: number): Promise<void> {
    const [listing] = await db
      .select({ documents: carListings.documents })
      .from(carListings)
      .where(eq(carListings.id, listingId));
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    const currentDocuments = listing.documents || [];
    if (documentIndex < 0 || documentIndex >= currentDocuments.length) {
      throw new Error('Invalid document index');
    }
    
    const updatedDocuments = currentDocuments.filter((_, index) => index !== documentIndex);
    
    await db
      .update(carListings)
      .set({ 
        documents: updatedDocuments,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, listingId));
  }

  // Admin meta fields management
  async updateListingMeta(listingId: number, metaData: any, adminId: string): Promise<any> {
    const updateData: any = {
      updatedAt: new Date()
    };

    // Map meta fields
    if (metaData.status !== undefined) updateData.status = metaData.status;
    if (metaData.featured !== undefined) updateData.featured = metaData.featured;
    if (metaData.isVerified !== undefined) updateData.isVerified = metaData.isVerified;
    if (metaData.expirationDate !== undefined) {
      updateData.expirationDate = metaData.expirationDate ? new Date(metaData.expirationDate) : null;
    }
    if (metaData.listingSource !== undefined) updateData.listingSource = metaData.listingSource;
    if (metaData.sellerId !== undefined) updateData.sellerId = metaData.sellerId;
    if (metaData.adminNotes !== undefined) updateData.adminNotes = metaData.adminNotes || null;

    // Handle status-specific fields
    if (metaData.status === 'archived') {
      updateData.archivedAt = new Date();
      updateData.archivedBy = adminId;
    } else if (updateData.archivedAt) {
      updateData.archivedAt = null;
      updateData.archivedBy = null;
    }

    const [updatedListing] = await db
      .update(carListings)
      .set(updateData)
      .where(eq(carListings.id, listingId))
      .returning();

    return this.getListingById(listingId);
  }

  async getAvailableUsers(): Promise<any[]> {
    return await db
      .select({
        id: appUsers.id,
        firstName: appUsers.firstName,
        lastName: appUsers.lastName,
        email: appUsers.email,
        roleId: appUsers.roleId
      })
      .from(appUsers)
      .where(eq(appUsers.isActive, true))
      .orderBy(appUsers.firstName);
  }

  // =========================
  // AUTOMATED FLAGGING SYSTEM
  // =========================

  async processAutomatedFlag(listingId: number, flagType: string, reporterId?: string): Promise<{ actionTriggered: boolean; actionType?: string; actionDescription?: string }> {
    try {
      // Get the auto flag rule for this flag type
      const flagRule = await this.getAutoFlagRule(flagType);
      if (!flagRule || !flagRule.isActive) {
        return { actionTriggered: false };
      }

      // Update flag count tracking
      const flagCount = await this.updateFlagCount(listingId, flagType);

      // Check if we've reached the trigger count
      if (flagCount.flagCount >= flagRule.triggerCount && !flagCount.actionTriggered) {
        // Execute the automated action
        await this.executeAutomatedAction(listingId, flagRule, flagCount.flagCount);

        // Mark action as triggered
        await db.update(flagCountTracking)
          .set({ 
            actionTriggered: true, 
            actionTriggeredAt: new Date().toISOString(),
            actionType: flagRule.actionType 
          })
          .where(and(
            eq(flagCountTracking.listingId, listingId),
            eq(flagCountTracking.flagType, flagType)
          ));

        // Log the automated action
        await this.logAutomatedAction(
          listingId, 
          flagType, 
          flagRule.actionType, 
          flagCount.flagCount, 
          flagRule.actionDescription, 
          true
        );

        // Update seller reputation
        const listing = await this.getListingById(listingId);
        if (listing) {
          await this.updateSellerReputation(listing.sellerId, flagType, flagRule.severity);
        }

        return { 
          actionTriggered: true, 
          actionType: flagRule.actionType, 
          actionDescription: flagRule.actionDescription 
        };
      }

      return { actionTriggered: false };
    } catch (error) {
      console.error('Error processing automated flag:', error);
      
      // Log failed automated action
      await this.logAutomatedAction(
        listingId, 
        flagType, 
        'error', 
        0, 
        'Failed to process automated flag', 
        false, 
        error instanceof Error ? error.message : 'Unknown error'
      );
      
      throw error;
    }
  }

  async getAutoFlagRule(flagType: string): Promise<AutoFlagRule | undefined> {
    const results = await db.select()
      .from(autoFlagRules)
      .where(eq(autoFlagRules.flagType, flagType))
      .limit(1);
    
    return results[0];
  }

  async updateFlagCount(listingId: number, flagType: string): Promise<FlagCountTracking> {
    // Check if flag count tracking already exists
    const existing = await db.select()
      .from(flagCountTracking)
      .where(and(
        eq(flagCountTracking.listingId, listingId),
        eq(flagCountTracking.flagType, flagType)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Increment existing count
      const updated = await db.update(flagCountTracking)
        .set({ 
          flagCount: existing[0].flagCount + 1,
          lastFlaggedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .where(and(
          eq(flagCountTracking.listingId, listingId),
          eq(flagCountTracking.flagType, flagType)
        ))
        .returning();
      
      return updated[0];
    } else {
      // Create new flag count tracking
      const created = await db.insert(flagCountTracking)
        .values({
          listingId,
          flagType,
          flagCount: 1,
          lastFlaggedAt: new Date().toISOString(),
          actionTriggered: false
        })
        .returning();
      
      return created[0];
    }
  }

  async executeAutomatedAction(listingId: number, flagRule: AutoFlagRule, flagCount: number): Promise<void> {
    try {
      // Get listing details to access seller information
      const listing = await this.getListingById(listingId);
      if (!listing) {
        throw new Error(`Listing ${listingId} not found`);
      }

      switch (flagRule.actionType) {
        case 'hide_images_admin_review':
          await this.hideListingImages(listingId);
          await this.sendToAdminReview(listingId, flagRule.flagType);
          break;

        case 'suspend_listing':
          await this.suspendListing(listingId, `Automated action: ${flagRule.actionDescription}`);
          break;

        case 'remove_from_search':
          await this.removeFromSearchResults(listingId);
          break;

        case 'mark_under_review':
          await this.updateListingStatus(listingId, 'pending');
          break;

        case 'immediate_suspension':
          await this.suspendListing(listingId, 'Immediate suspension for manual moderation');
          break;

        // User account suspension actions
        case 'auto_unlist_lock_account':
          await this.suspendListing(listingId, `Automated action: ${flagRule.actionDescription}`);
          await this.suspendUserAccount(listing.sellerId, `Automated suspension: ${flagRule.flagType}`, 'critical');
          break;

        case 'disable_listing_request_verification':
          await this.suspendListing(listingId, `Automated action: ${flagRule.actionDescription}`);
          await this.suspendUserAccount(listing.sellerId, `Automated suspension: ${flagRule.flagType}`, 'high');
          break;

        case 'remove_mark_high_risk':
          await this.suspendListing(listingId, `Automated action: ${flagRule.actionDescription}`);
          await this.markUserHighRisk(listing.sellerId, flagRule.flagType);
          break;

        case 'immediate_takedown_notify_legal':
          await this.suspendListing(listingId, 'Immediate takedown - legal review required');
          await this.suspendUserAccount(listing.sellerId, `Critical violation: ${flagRule.flagType}`, 'critical');
          await this.notifyLegalTeam(listingId, listing.sellerId, flagRule.flagType);
          break;

        case 'auto_flag_fraud_review':
          await this.suspendListing(listingId, 'Suspended pending fraud review');
          await this.suspendUserAccount(listing.sellerId, `Fraud review: ${flagRule.flagType}`, 'critical');
          break;

        case 'auto_hide_lock_listing':
          await this.hideListingImages(listingId);
          await this.suspendListing(listingId, 'Locked pending admin verification');
          await this.suspendUserAccount(listing.sellerId, `Copyright violation: ${flagRule.flagType}`, 'critical');
          break;

        default:
          console.warn(`Action type ${flagRule.actionType} not yet implemented`);
          // For now, just suspend the listing as a safe default
          await this.suspendListing(listingId, `Automated action: ${flagRule.actionDescription}`);
          break;
      }
    } catch (error) {
      console.error(`Error executing automated action ${flagRule.actionType}:`, error);
      throw error;
    }
  }

  async logAutomatedAction(
    listingId: number, 
    flagType: string, 
    actionType: string, 
    triggerCount: number, 
    actionDescription: string, 
    success: boolean, 
    errorMessage?: string
  ): Promise<void> {
    await db.insert(automatedActionsLog).values({
      listingId,
      flagType,
      actionType,
      triggerCount,
      actionDescription,
      success,
      errorMessage,
      executedBy: 'system'
    });
  }

  async updateSellerReputation(sellerId: string, flagType: string, severity: string): Promise<void> {
    // Get or create seller reputation tracking
    const existing = await db.select()
      .from(sellerReputationTracking)
      .where(eq(sellerReputationTracking.sellerId, sellerId))
      .limit(1);

    const severityScores = { low: 1, medium: 5, high: 10, critical: 20 };
    const severityScore = severityScores[severity as keyof typeof severityScores] || 5;

    if (existing.length > 0) {
      const current = existing[0];
      const newScore = Math.max(0, current.reputationScore - severityScore);
      const isHighRisk = newScore < 50 || current.criticalFlags > 0;
      
      await db.update(sellerReputationTracking)
        .set({
          reputationScore: newScore,
          totalFlags: current.totalFlags + 1,
          highSeverityFlags: severity === 'high' ? current.highSeverityFlags + 1 : current.highSeverityFlags,
          criticalFlags: severity === 'critical' ? current.criticalFlags + 1 : current.criticalFlags,
          isHighRisk,
          lastFlaggedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .where(eq(sellerReputationTracking.sellerId, sellerId));
    } else {
      const initialScore = Math.max(0, 100 - severityScore);
      await db.insert(sellerReputationTracking).values({
        sellerId,
        reputationScore: initialScore,
        totalFlags: 1,
        highSeverityFlags: severity === 'high' ? 1 : 0,
        criticalFlags: severity === 'critical' ? 1 : 0,
        isHighRisk: severity === 'critical',
        lastFlaggedAt: new Date().toISOString()
      });
    }
  }

  async getSellerReputationScore(sellerId: string): Promise<number> {
    const result = await db.select()
      .from(sellerReputationTracking)
      .where(eq(sellerReputationTracking.sellerId, sellerId))
      .limit(1);
    
    return result.length > 0 ? result[0].reputationScore : 100;
  }

  async rollbackAutomatedAction(actionId: number): Promise<void> {
    console.log(`Rollback requested for action ID: ${actionId}`);
  }

  // Helper methods for specific automated actions
  private async hideListingImages(listingId: number): Promise<void> {
    await db.update(carListings)
      .set({ images: null })
      .where(eq(carListings.id, listingId));
  }

  private async sendToAdminReview(listingId: number, flagType: string): Promise<void> {
    await this.addAdminNote(listingId, 'system', `Automated flag triggered: ${flagType} - Images hidden, requires admin review`);
  }

  private async updateListingStatus(listingId: number, status: string): Promise<void> {
    await db.update(carListings)
      .set({ status })
      .where(eq(carListings.id, listingId));
  }

  private async suspendListing(listingId: number, reason: string): Promise<void> {
    await db.update(carListings)
      .set({ 
        status: 'inactive',
        adminNotes: reason
      })
      .where(eq(carListings.id, listingId));
  }

  private async removeFromSearchResults(listingId: number): Promise<void> {
    await db.update(carListings)
      .set({ status: 'inactive' })
      .where(eq(carListings.id, listingId));
  }

  // User account suspension methods
  private async suspendUserAccount(sellerId: string, reason: string, severity: 'low' | 'medium' | 'high' | 'critical'): Promise<void> {
    const now = new Date();
    
    // Suspend the user account
    await db.update(appUsers)
      .set({ 
        status: 'suspended',
        updatedAt: now
      })
      .where(eq(appUsers.id, sellerId));

    // Log the automated suspension
    console.log(`Automated user suspension: ${sellerId} - ${reason} (${severity})`);
  }

  private async markUserHighRisk(sellerId: string, flagType: string): Promise<void> {
    // Update seller reputation with high risk marker
    await this.updateSellerReputation(sellerId, flagType, 'high');
    
    // Log the high risk marking
    console.log(`User marked as high risk: ${sellerId} - ${flagType}`);
  }

  private async notifyLegalTeam(listingId: number, sellerId: string, flagType: string): Promise<void> {
    // Log legal notification requirement
    console.log(`LEGAL NOTIFICATION REQUIRED: Listing ${listingId}, User ${sellerId}, Flag: ${flagType}`);
    
    // Add admin note for legal review
    await this.addAdminNote(listingId, 'system', `LEGAL REVIEW REQUIRED: ${flagType} - Automated detection triggered legal notification protocol`);
  }

  // Enhanced user management implementations
  async getEnhancedUsersWithStats(filters: { 
    search?: string; 
    role?: string; 
    status?: string; 
    joinedFrom?: string; 
    joinedTo?: string; 
    page?: number; 
    limit?: number; 
    sort?: string; 
    order?: string; 
  } = {}): Promise<{ 
    users: (AppUser & { role?: UserRole; listingsCount?: number; recentActivity?: string })[]; 
    totalCount: number; 
    pageCount: number; 
  }> {
    const { 
      search, 
      role, 
      status, 
      joinedFrom, 
      joinedTo, 
      page = 1, 
      limit = 20, 
      sort = 'createdAt', 
      order = 'desc' 
    } = filters;
    
    // Build where conditions
    const whereConditions = [];
    
    if (search) {
      whereConditions.push(or(
        ilike(appUsers.firstName, `%${search}%`),
        ilike(appUsers.lastName, `%${search}%`),
        ilike(appUsers.email, `%${search}%`),
        ilike(appUsers.phoneNumber, `%${search}%`)
      ));
    }
    
    if (role) {
      whereConditions.push(eq(userRoles.name, role));
    }
    
    if (status) {
      whereConditions.push(eq(appUsers.status, status));
    }
    
    if (joinedFrom) {
      whereConditions.push(gte(appUsers.createdAt, joinedFrom));
    }
    
    if (joinedTo) {
      whereConditions.push(lte(appUsers.createdAt, joinedTo));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;
    
    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .where(whereClause);
    
    const totalCount = countResult[0]?.count || 0;
    const pageCount = Math.ceil(totalCount / limit);
    
    // Build order by clause
    const orderByField = sort === 'firstName' ? appUsers.firstName :
                        sort === 'email' ? appUsers.email :
                        sort === 'createdAt' ? appUsers.createdAt :
                        appUsers.createdAt;
    
    const orderByClause = order === 'asc' ? asc(orderByField) : desc(orderByField);
    
    // Get users with role information and listing counts
    const usersResult = await db
      .select({
        user: appUsers,
        role: userRoles,
        listingsCount: sql<number>`count(${carListings.id})`
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .leftJoin(carListings, eq(appUsers.id, carListings.sellerId))
      .where(whereClause)
      .groupBy(appUsers.id, userRoles.id)
      .orderBy(orderByClause)
      .limit(limit)
      .offset((page - 1) * limit);
    
    // Get recent activity for each user
    const userIds = usersResult.map(u => u.user.id);
    const recentActivities = await db
      .select({
        userId: carListings.sellerId,
        lastActivity: sql<string>`max(${carListings.createdAt})`
      })
      .from(carListings)
      .where(inArray(carListings.sellerId, userIds))
      .groupBy(carListings.sellerId);
    
    const activityMap = new Map(recentActivities.map(a => [a.userId, a.lastActivity]));
    
    // Format the response
    const enhancedUsers = usersResult.map(result => ({
      ...result.user,
      role: result.role,
      listingsCount: result.listingsCount || 0,
      recentActivity: activityMap.get(result.user.id) ? 
        `Last listing: ${new Date(activityMap.get(result.user.id)!).toLocaleDateString()}` : 
        'No activity'
    }));
    
    return {
      users: enhancedUsers,
      totalCount,
      pageCount
    };
  }

  async updateUserRole(userId: string, roleId: number): Promise<void> {
    await db.update(appUsers)
      .set({ 
        roleId, 
        updatedAt: new Date() 
      })
      .where(eq(appUsers.id, userId));
  }

  async bulkUserAction(userIds: string[], action: string, adminId: string, data?: any): Promise<void> {
    const now = new Date();
    
    switch (action) {
      case 'suspend':
        await db.update(appUsers)
          .set({ 
            status: 'suspended',
            updatedAt: now
          })
          .where(inArray(appUsers.id, userIds));
        break;
        
      case 'activate':
        await db.update(appUsers)
          .set({ 
            status: 'active',
            updatedAt: now
          })
          .where(inArray(appUsers.id, userIds));
        break;
        
      case 'changeRole':
        if (data?.roleId) {
          await db.update(appUsers)
            .set({ 
              roleId: data.roleId,
              updatedAt: now
            })
            .where(inArray(appUsers.id, userIds));
        }
        break;
        
      default:
        throw new Error(`Unknown bulk action: ${action}`);
    }
    
    // Log the bulk action for audit purposes
    console.log(`Bulk action ${action} performed by ${adminId} on ${userIds.length} users`);
  }

  // ========================================
  // MESSAGING SYSTEM IMPLEMENTATION
  // ========================================

  async createConversation(data: {
    type: string;
    title: string;
    context?: any;
    participants: Array<{ userId: string; role: string }>;
  }): Promise<any> {
    const now = new Date();
    
    // Create conversation using raw SQL
    const conversationResult = await db.execute(sql`
      INSERT INTO conversations (type, title, context, participant_count, created_at, updated_at, last_activity_at)
      VALUES (${data.type}, ${data.title}, ${data.context ? JSON.stringify(data.context) : null}, 
              ${data.participants.length}, ${now.toISOString()}, ${now.toISOString()}, ${now.toISOString()})
      RETURNING *
    `);
    
    const conversation = conversationResult.rows[0];

    // Add participants
    for (const participant of data.participants) {
      await db.execute(sql`
        INSERT INTO conversation_participants (conversation_id, user_id, role, joined_at, created_at)
        VALUES (${conversation.id}, ${participant.userId}, ${participant.role}, 
                ${now.toISOString()}, ${now.toISOString()})
      `);
    }

    return conversation;
  }

  async getConversation(id: number): Promise<any> {
    // Get conversation with participants
    const conversation = await db.execute(sql`
      SELECT c.*, 
             array_agg(
               json_build_object(
                 'id', cp.id,
                 'userId', cp.user_id,
                 'role', cp.role,
                 'joinedAt', cp.joined_at,
                 'isActive', cp.is_active,
                 'user', json_build_object(
                   'id', u.id,
                   'firstName', u.first_name,
                   'lastName', u.last_name,
                   'email', u.email,
                   'profileImageUrl', u.profile_image_url
                 )
               )
             ) as participants
      FROM conversations c
      LEFT JOIN conversation_participants cp ON c.id = cp.conversation_id
      LEFT JOIN app_users u ON cp.user_id = u.id
      WHERE c.id = ${id}
      GROUP BY c.id
    `);

    return conversation.rows[0] || null;
  }

  async getUserConversations(userId: string, limit: number = 20): Promise<any[]> {
    const conversations = await db.execute(sql`
      SELECT c.*,
             (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id) as message_count,
             (SELECT COUNT(*) FROM messages m 
              WHERE m.conversation_id = c.id 
              AND m.read_count = 0 AND m.sender_id != ${userId}) as unread_count,
             (SELECT json_agg(
               json_build_object(
                 'id', u.id,
                 'firstName', u.first_name,
                 'lastName', u.last_name,
                 'email', u.email,
                 'profileImageUrl', u.profile_image_url,
                 'role', cp2.role
               )
             ) FROM conversation_participants cp2
             JOIN app_users u ON cp2.user_id = u.id
             WHERE cp2.conversation_id = c.id 
               AND cp2.user_id != ${userId} 
               AND cp2.is_active = true
             ) as participants,
             (SELECT json_build_object(
               'id', last_msg.id,
               'content', last_msg.content,
               'createdAt', last_msg.created_at,
               'senderId', last_msg.sender_id,
               'senderName', CONCAT(sender.first_name, ' ', sender.last_name)
             ) FROM messages last_msg
             JOIN app_users sender ON last_msg.sender_id = sender.id
             WHERE last_msg.conversation_id = c.id
             ORDER BY last_msg.created_at DESC
             LIMIT 1
             ) as last_message
      FROM conversations c
      JOIN conversation_participants cp ON c.id = cp.conversation_id
      WHERE cp.user_id = ${userId} AND cp.is_active = true
      ORDER BY c.last_activity_at DESC
      LIMIT ${limit}
    `);

    return conversations.rows;
  }

  async updateConversationStatus(id: number, status: string): Promise<void> {
    await db.execute(sql`
      UPDATE conversations 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
    `);
  }

  async archiveConversation(id: number): Promise<void> {
    await this.updateConversationStatus(id, 'archived');
  }

  async addParticipant(conversationId: number, userId: string, role: string): Promise<void> {
    const now = new Date();
    
    await db.execute(sql`
      INSERT INTO conversation_participants (conversation_id, user_id, role, joined_at, created_at)
      VALUES (${conversationId}, ${userId}, ${role}, ${now.toISOString()}, ${now.toISOString()})
    `);

    // Update participant count
    await db.execute(sql`
      UPDATE conversations 
      SET participant_count = (
        SELECT COUNT(*) FROM conversation_participants 
        WHERE conversation_id = ${conversationId} AND is_active = true
      ),
      updated_at = NOW()
      WHERE id = ${conversationId}
    `);
  }

  async removeParticipant(conversationId: number, userId: string): Promise<void> {
    await db.execute(sql`
      UPDATE conversation_participants 
      SET is_active = false, left_at = NOW()
      WHERE conversation_id = ${conversationId} AND user_id = ${userId}
    `);

    // Update participant count
    await db.execute(sql`
      UPDATE conversations 
      SET participant_count = (
        SELECT COUNT(*) FROM conversation_participants 
        WHERE conversation_id = ${conversationId} AND is_active = true
      ),
      updated_at = NOW()
      WHERE id = ${conversationId}
    `);
  }

  async sendMessage(data: {
    conversationId: number;
    senderId: string;
    content: string;
    messageType?: string;
    metadata?: any;
    replyToMessageId?: number;
  }): Promise<any> {
    const now = new Date();
    
    const messageResult = await db.execute(sql`
      INSERT INTO messages (
        conversation_id, sender_id, content, message_type, metadata, 
        reply_to_message_id, created_at, updated_at
      )
      VALUES (
        ${data.conversationId}, ${data.senderId}, ${data.content}, 
        ${data.messageType || 'text'}, ${data.metadata ? JSON.stringify(data.metadata) : null},
        ${data.replyToMessageId || null}, ${now.toISOString()}, ${now.toISOString()}
      )
      RETURNING *
    `);

    // Update conversation last message time
    await db.execute(sql`
      UPDATE conversations 
      SET last_message_at = ${now.toISOString()}, 
          last_activity_at = ${now.toISOString()},
          updated_at = ${now.toISOString()}
      WHERE id = ${data.conversationId}
    `);

    return messageResult.rows[0];
  }

  async getMessages(conversationId: number, limit: number = 50, offset: number = 0): Promise<any[]> {
    const messages = await db.execute(sql`
      SELECT m.*,
             json_build_object(
               'id', u.id,
               'firstName', u.first_name,
               'lastName', u.last_name,
               'email', u.email,
               'profileImageUrl', u.profile_image_url
             ) as sender,
             (SELECT COUNT(*) FROM message_read_receipts mr WHERE mr.message_id = m.id) as read_count
      FROM messages m
      JOIN app_users u ON m.sender_id = u.id
      WHERE m.conversation_id = ${conversationId} 
        AND m.is_deleted = false
      ORDER BY m.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);

    // Parse the sender JSON field from string to object
    const parsedMessages = messages.rows.map(row => ({
      ...row,
      sender: typeof row.sender === 'string' ? JSON.parse(row.sender) : row.sender
    }));

    return parsedMessages.reverse(); // Return in chronological order
  }

  async getMessage(id: number): Promise<any> {
    const message = await db.execute(sql`
      SELECT m.*,
             json_build_object(
               'id', u.id,
               'firstName', u.first_name,
               'lastName', u.last_name,
               'email', u.email,
               'profileImageUrl', u.profile_image_url
             ) as sender
      FROM messages m
      JOIN app_users u ON m.sender_id = u.id
      WHERE m.id = ${id} AND m.is_deleted = false
    `);

    return message.rows[0] || null;
  }

  async editMessage(id: number, content: string): Promise<void> {
    await db.execute(sql`
      UPDATE messages 
      SET content = ${content}, 
          is_edited = true, 
          edited_at = NOW(),
          updated_at = NOW()
      WHERE id = ${id}
    `);
  }

  async deleteMessage(id: number): Promise<void> {
    await db.execute(sql`
      UPDATE messages 
      SET is_deleted = true, 
          deleted_at = NOW(),
          updated_at = NOW()
      WHERE id = ${id}
    `);
  }

  async markMessageAsRead(messageId: number, userId: string): Promise<void> {
    // Insert read receipt if not already exists
    await db.execute(sql`
      INSERT INTO message_read_receipts (message_id, user_id, read_at)
      VALUES (${messageId}, ${userId}, NOW())
      ON CONFLICT (message_id, user_id) DO NOTHING
    `);
  }

  async markConversationAsRead(conversationId: number, userId: string): Promise<void> {
    // Get the latest message ID in the conversation
    const latestMessage = await db.execute(sql`
      SELECT id FROM messages 
      WHERE conversation_id = ${conversationId} 
      ORDER BY created_at DESC 
      LIMIT 1
    `);

    if (latestMessage.rows.length > 0) {
      const latestMessageId = latestMessage.rows[0].id;
      
      // Update participant's last read message
      await db.execute(sql`
        UPDATE conversation_participants 
        SET last_read_message_id = ${latestMessageId}
        WHERE conversation_id = ${conversationId} AND user_id = ${userId}
      `);
    }
  }

  async getMessageTemplates(userId?: string, category?: string): Promise<any[]> {
    let query = sql`
      SELECT mt.*,
             json_build_object(
               'id', u.id,
               'firstName', u.first_name,
               'lastName', u.last_name
             ) as creator
      FROM message_templates mt
      JOIN app_users u ON mt.created_by = u.id
      WHERE mt.is_active = true
    `;

    if (category) {
      query = sql`${query} AND mt.category = ${category}`;
    }

    if (userId) {
      // Show user's templates and public templates
      query = sql`${query} AND (mt.created_by = ${userId} OR mt.is_admin_only = false)`;
    }

    query = sql`${query} ORDER BY mt.usage_count DESC, mt.created_at DESC`;

    const templates = await db.execute(query);
    return templates.rows;
  }

  async createMessageTemplate(data: {
    title: string;
    content: string;
    category: string;
    isAdminOnly?: boolean;
    tags?: string[];
    createdBy: string;
  }): Promise<any> {
    const now = new Date();
    
    const [template] = await db.execute(sql`
      INSERT INTO message_templates (
        title, content, category, is_admin_only, tags, created_by, created_at, updated_at
      )
      VALUES (
        ${data.title}, ${data.content}, ${data.category}, 
        ${data.isAdminOnly || false}, ${data.tags || []}, 
        ${data.createdBy}, ${now.toISOString()}, ${now.toISOString()}
      )
      RETURNING *
    `);

    return template.rows[0];
  }

  async updateMessageTemplate(id: number, data: Partial<{
    title: string;
    content: string;
    category: string;
    tags: string[];
  }>): Promise<void> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = $${values.length + 1}`);
        values.push(value);
      }
    });

    if (updates.length > 0) {
      updates.push(`updated_at = NOW()`);
      
      await db.execute(sql`
        UPDATE message_templates 
        SET ${sql.raw(updates.join(', '))}
        WHERE id = ${id}
      `);
    }
  }

  async deleteMessageTemplate(id: number): Promise<void> {
    await db.execute(sql`
      UPDATE message_templates 
      SET is_active = false, updated_at = NOW()
      WHERE id = ${id}
    `);
  }

  async blockUser(blockerId: string, blockedId: string, reason?: string, blockType?: string): Promise<void> {
    const now = new Date();
    
    await db.execute(sql`
      INSERT INTO blocked_users (blocker_id, blocked_id, reason, block_type, created_at)
      VALUES (${blockerId}, ${blockedId}, ${reason || null}, ${blockType || 'messaging'}, ${now.toISOString()})
      ON CONFLICT (blocker_id, blocked_id) 
      DO UPDATE SET is_active = true, reason = ${reason || null}, block_type = ${blockType || 'messaging'}
    `);
  }

  async unblockUser(blockerId: string, blockedId: string): Promise<void> {
    await db.execute(sql`
      UPDATE blocked_users 
      SET is_active = false
      WHERE blocker_id = ${blockerId} AND blocked_id = ${blockedId}
    `);
  }

  async getBlockedUsers(userId: string): Promise<any[]> {
    const blocked = await db.execute(sql`
      SELECT bu.*,
             json_build_object(
               'id', u.id,
               'firstName', u.first_name,
               'lastName', u.last_name,
               'email', u.email,
               'profileImageUrl', u.profile_image_url
             ) as blocked_user
      FROM blocked_users bu
      JOIN app_users u ON bu.blocked_id = u.id
      WHERE bu.blocker_id = ${userId} AND bu.is_active = true
      ORDER BY bu.created_at DESC
    `);

    return blocked.rows;
  }

  async isUserBlocked(userId1: string, userId2: string): Promise<boolean> {
    const result = await db.execute(sql`
      SELECT 1 FROM blocked_users 
      WHERE ((blocker_id = ${userId1} AND blocked_id = ${userId2}) 
             OR (blocker_id = ${userId2} AND blocked_id = ${userId1}))
        AND is_active = true
      LIMIT 1
    `);

    return result.rows.length > 0;
  }

  async getNotificationSettings(userId: string): Promise<any[]> {
    const settings = await db.execute(sql`
      SELECT * FROM message_notification_settings 
      WHERE user_id = ${userId}
      ORDER BY conversation_type
    `);

    return settings.rows;
  }

  async updateNotificationSettings(userId: string, conversationType: string, settings: any): Promise<void> {
    const now = new Date();
    
    await db.execute(sql`
      INSERT INTO message_notification_settings (
        user_id, conversation_type, email_enabled, sms_enabled, push_enabled,
        digest_frequency, quiet_hours_start, quiet_hours_end, weekends_enabled,
        created_at, updated_at
      )
      VALUES (
        ${userId}, ${conversationType}, ${settings.emailEnabled || true}, 
        ${settings.smsEnabled || false}, ${settings.pushEnabled || true},
        ${settings.digestFrequency || 'immediate'}, ${settings.quietHoursStart || null},
        ${settings.quietHoursEnd || null}, ${settings.weekendsEnabled || true},
        ${now.toISOString()}, ${now.toISOString()}
      )
      ON CONFLICT (user_id, conversation_type)
      DO UPDATE SET
        email_enabled = ${settings.emailEnabled || true},
        sms_enabled = ${settings.smsEnabled || false},
        push_enabled = ${settings.pushEnabled || true},
        digest_frequency = ${settings.digestFrequency || 'immediate'},
        quiet_hours_start = ${settings.quietHoursStart || null},
        quiet_hours_end = ${settings.quietHoursEnd || null},
        weekends_enabled = ${settings.weekendsEnabled || true},
        updated_at = ${now.toISOString()}
    `);
  }

  async getConversationAnalytics(conversationId: number): Promise<any> {
    const analytics = await db.execute(sql`
      SELECT * FROM conversation_analytics 
      WHERE conversation_id = ${conversationId}
    `);

    return analytics.rows[0] || null;
  }

  async updateConversationAnalytics(conversationId: number, data: any): Promise<void> {
    const now = new Date();
    
    await db.execute(sql`
      INSERT INTO conversation_analytics (
        conversation_id, message_count, participant_count, avg_response_time,
        first_response_time, resolution_time, satisfaction_rating, outcome,
        lead_quality, created_at, updated_at
      )
      VALUES (
        ${conversationId}, ${data.messageCount || 0}, ${data.participantCount || 0},
        ${data.avgResponseTime || null}, ${data.firstResponseTime || null},
        ${data.resolutionTime || null}, ${data.satisfactionRating || null},
        ${data.outcome || null}, ${data.leadQuality || null},
        ${now.toISOString()}, ${now.toISOString()}
      )
      ON CONFLICT (conversation_id)
      DO UPDATE SET
        message_count = ${data.messageCount || 0},
        participant_count = ${data.participantCount || 0},
        avg_response_time = ${data.avgResponseTime || null},
        first_response_time = ${data.firstResponseTime || null},
        resolution_time = ${data.resolutionTime || null},
        satisfaction_rating = ${data.satisfactionRating || null},
        outcome = ${data.outcome || null},
        lead_quality = ${data.leadQuality || null},
        updated_at = ${now.toISOString()}
    `);
  }

  async getMessagingStats(userId: string): Promise<{
    totalConversations: number;
    activeConversations: number;
    totalMessages: number;
    unreadCount: number;
    avgResponseTime: number;
  }> {
    const stats = await db.execute(sql`
      SELECT 
        COUNT(DISTINCT c.id) as total_conversations,
        COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_conversations,
        COUNT(m.id) as total_messages,
        COUNT(CASE WHEN m.read_count = 0 AND m.sender_id != ${userId} THEN 1 END) as unread_count,
        AVG(EXTRACT(EPOCH FROM (
          SELECT MIN(m2.created_at) 
          FROM messages m2 
          WHERE m2.conversation_id = m.conversation_id 
            AND m2.sender_id = ${userId}
            AND m2.created_at > m.created_at
        )) / 60) as avg_response_time_minutes
      FROM conversations c
      JOIN conversation_participants cp ON c.id = cp.conversation_id
      LEFT JOIN messages m ON c.id = m.conversation_id
      WHERE cp.user_id = ${userId} AND cp.is_active = true
    `);

    const result = stats.rows[0];
    return {
      totalConversations: parseInt(result.total_conversations) || 0,
      activeConversations: parseInt(result.active_conversations) || 0,
      totalMessages: parseInt(result.total_messages) || 0,
      unreadCount: parseInt(result.unread_count) || 0,
      avgResponseTime: parseFloat(result.avg_response_time_minutes) || 0
    };
  }

  // Smart Pricing Intelligence implementations
  async getPriceAlerts(listingId: number, userId: string): Promise<any[]> {
    const alerts = await db.execute(sql`
      SELECT id, user_id, listing_id, alert_type, alert_message, priority, 
             current_price, target_price, price_deviation, is_active, created_at
      FROM price_alerts 
      WHERE listing_id = ${listingId} AND user_id = ${userId}
      ORDER BY created_at DESC
    `);
    return alerts.rows || [];
  }

  async createPriceAlert(alert: any): Promise<any> {
    const result = await db.execute(sql`
      INSERT INTO price_alerts (listing_id, user_id, alert_type, threshold, is_active, message)
      VALUES (${alert.listingId}, ${alert.userId}, ${alert.alertType}, ${alert.threshold}, ${alert.isActive}, ${alert.message})
      RETURNING *
    `);
    return result.rows[0];
  }

  async getSmartRecommendations(listingId: number): Promise<any[]> {
    const recommendations = await db.execute(sql`
      SELECT * FROM smart_recommendations 
      WHERE listing_id = ${listingId}
      ORDER BY priority DESC, created_at DESC
    `);
    return recommendations.rows || [];
  }

  async createSmartRecommendation(recommendation: any): Promise<any> {
    const result = await db.execute(sql`
      INSERT INTO smart_recommendations (
        listing_id, type, title, description, priority, estimated_impact, action_required
      )
      VALUES (
        ${recommendation.listingId}, ${recommendation.type}, ${recommendation.title}, 
        ${recommendation.description}, ${recommendation.priority}, 
        ${recommendation.estimatedImpact}, ${recommendation.actionRequired}
      )
      RETURNING *
    `);
    return result.rows[0];
  }

  async getCarListingById(id: number): Promise<CarListing | null> {
    const [listing] = await db
      .select()
      .from(carListings)
      .where(eq(carListings.id, id))
      .limit(1);
    
    return listing || null;
  }

  // =============================
  // PAYMENT METHODS
  // =============================
  
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

  async getPaymentTransactionByPaystackReference(paystackReference: string): Promise<any> {
    const [transaction] = await db.select().from(paymentTransactions).where(eq(paymentTransactions.paystackReference, paystackReference));
    return transaction;
  }

  async getPaymentTransactions(userId: string, limit?: number): Promise<any[]> {
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

  // Automotive Ecosystem methods implementation
  async getAllServiceCategories(): Promise<ServiceCategory[]> {
    return await db.select().from(serviceCategories).orderBy(serviceCategories.sortOrder);
  }

  async getActiveServiceCategories(): Promise<ServiceCategory[]> {
    return await db.select().from(serviceCategories)
      .where(eq(serviceCategories.isActive, true))
      .orderBy(serviceCategories.sortOrder);
  }

  async createServiceCategory(categoryData: Omit<ServiceCategory, 'id' | 'createdAt'>): Promise<ServiceCategory> {
    const [category] = await db.insert(serviceCategories)
      .values({
        ...categoryData,
        createdAt: new Date()
      })
      .returning();
    return category;
  }

  async getSubcategoriesByCategory(categoryId: number): Promise<ServiceSubcategory[]> {
    return await db.select().from(serviceSubcategories)
      .where(eq(serviceSubcategories.categoryId, categoryId))
      .orderBy(serviceSubcategories.sortOrder);
  }

  async createServiceSubcategory(subcategoryData: Omit<ServiceSubcategory, 'id' | 'createdAt'>): Promise<ServiceSubcategory> {
    const [subcategory] = await db.insert(serviceSubcategories)
      .values({
        ...subcategoryData,
        createdAt: new Date()
      })
      .returning();
    return subcategory;
  }

  async getAllSubcategories(): Promise<ServiceSubcategory[]> {
    return await db.select().from(serviceSubcategories)
      .orderBy(serviceSubcategories.categoryId, serviceSubcategories.sortOrder);
  }

  // Service provider methods
  async createServiceProvider(providerData: InsertServiceProvider & { userId?: string }): Promise<ServiceProvider> {
    const [provider] = await db.insert(serviceProviders)
      .values(providerData)
      .returning();
    return provider;
  }

  async getServiceProvider(id: number): Promise<ServiceProvider | null> {
    const [provider] = await db.select().from(serviceProviders)
      .where(eq(serviceProviders.id, id));
    return provider || null;
  }

  async getServiceProviders(filters?: {
    categoryId?: number;
    subcategoryId?: number;
    county?: string;
    area?: string;
    searchTerm?: string;
    isVerified?: boolean;
    sortBy?: 'relevance' | 'rating' | 'views' | 'newest';
    page?: number;
    limit?: number;
  }): Promise<{ providers: ServiceProvider[]; total: number }> {
    let query = db.select({
      id: serviceProviders.id,
      userId: serviceProviders.userId,
      businessName: serviceProviders.businessName,
      contactPersonName: serviceProviders.contactPersonName,
      businessType: serviceProviders.businessType,
      phoneNumbers: serviceProviders.phoneNumbers,
      email: serviceProviders.email,
      website: serviceProviders.website,
      whatsappNumber: serviceProviders.whatsappNumber,
      county: serviceProviders.county,
      area: serviceProviders.area,
      specificLocation: serviceProviders.specificLocation,
      latitude: serviceProviders.latitude,
      longitude: serviceProviders.longitude,
      description: serviceProviders.description,
      businessHours: serviceProviders.businessHours,
      yearsInBusiness: serviceProviders.yearsInBusiness,
      licenseNumber: serviceProviders.licenseNumber,
      logoUrl: serviceProviders.logoUrl,
      bannerImageUrl: serviceProviders.bannerImageUrl,
      galleryImages: serviceProviders.galleryImages,
      isVerified: serviceProviders.isVerified,
      verificationDate: serviceProviders.verificationDate,
      verificationNotes: serviceProviders.verificationNotes,
      isActive: serviceProviders.isActive,
      isApproved: serviceProviders.isApproved,
      viewCount: serviceProviders.viewCount,
      contactCount: serviceProviders.contactCount,
      rating: serviceProviders.rating,
      reviewCount: serviceProviders.reviewCount,
      createdAt: serviceProviders.createdAt,
      updatedAt: serviceProviders.updatedAt,
    }).from(serviceProviders);
    
    let countQuery = db.select({ count: sql<number>`count(distinct ${serviceProviders.id})` }).from(serviceProviders);

    // Handle category/subcategory filtering through joins
    if (filters?.categoryId || filters?.subcategoryId) {
      query = query
        .leftJoin(providerServices, eq(serviceProviders.id, providerServices.providerId))
        .leftJoin(serviceSubcategories, eq(providerServices.subcategoryId, serviceSubcategories.id));
      
      countQuery = countQuery
        .leftJoin(providerServices, eq(serviceProviders.id, providerServices.providerId))
        .leftJoin(serviceSubcategories, eq(providerServices.subcategoryId, serviceSubcategories.id));
    }

    const conditions = [];

    if (filters?.categoryId) {
      conditions.push(eq(serviceSubcategories.categoryId, filters.categoryId));
    }
    if (filters?.subcategoryId) {
      conditions.push(eq(providerServices.subcategoryId, filters.subcategoryId));
    }
    if (filters?.county) {
      conditions.push(eq(serviceProviders.county, filters.county));
    }
    if (filters?.area) {
      conditions.push(eq(serviceProviders.area, filters.area));
    }
    if (filters?.isVerified !== undefined) {
      conditions.push(eq(serviceProviders.isVerified, filters.isVerified));
    }
    if (filters?.searchTerm) {
      conditions.push(
        or(
          ilike(serviceProviders.businessName, `%${filters.searchTerm}%`),
          ilike(serviceProviders.description, `%${filters.searchTerm}%`)
        )
      );
    }

    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }

    // Get total count
    const [{ count }] = await countQuery;

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    // Determine sort order based on sortBy parameter
    const getSortOrder = (sortBy?: string) => {
      switch (sortBy) {
        case 'rating':
          return [desc(serviceProviders.rating), desc(serviceProviders.reviewCount), desc(serviceProviders.isVerified)];
        case 'views':
          return [desc(serviceProviders.viewCount), desc(serviceProviders.isVerified)];
        case 'newest':
          return [desc(serviceProviders.createdAt)];
        case 'relevance':
        default:
          return [desc(serviceProviders.isVerified), desc(serviceProviders.rating), desc(serviceProviders.viewCount)];
      }
    };

    const sortOrder = getSortOrder(filters?.sortBy);
    
    // When using joins, we need to handle the query differently
    if (filters?.categoryId || filters?.subcategoryId) {
      // With joins, we need to group by provider to avoid duplicates
      const groupedQuery = db.select({
        id: serviceProviders.id,
        userId: serviceProviders.userId,
        businessName: serviceProviders.businessName,
        contactPersonName: serviceProviders.contactPersonName,
        businessType: serviceProviders.businessType,
        phoneNumbers: serviceProviders.phoneNumbers,
        email: serviceProviders.email,
        website: serviceProviders.website,
        whatsappNumber: serviceProviders.whatsappNumber,
        county: serviceProviders.county,
        area: serviceProviders.area,
        specificLocation: serviceProviders.specificLocation,
        latitude: serviceProviders.latitude,
        longitude: serviceProviders.longitude,
        description: serviceProviders.description,
        businessHours: serviceProviders.businessHours,
        yearsInBusiness: serviceProviders.yearsInBusiness,
        licenseNumber: serviceProviders.licenseNumber,
        logoUrl: serviceProviders.logoUrl,
        bannerImageUrl: serviceProviders.bannerImageUrl,
        galleryImages: serviceProviders.galleryImages,
        isVerified: serviceProviders.isVerified,
        verificationDate: serviceProviders.verificationDate,
        verificationNotes: serviceProviders.verificationNotes,
        isActive: serviceProviders.isActive,
        isApproved: serviceProviders.isApproved,
        viewCount: serviceProviders.viewCount,
        contactCount: serviceProviders.contactCount,
        rating: serviceProviders.rating,
        reviewCount: serviceProviders.reviewCount,
        createdAt: serviceProviders.createdAt,
        updatedAt: serviceProviders.updatedAt,
      })
      .from(serviceProviders)
      .leftJoin(providerServices, eq(serviceProviders.id, providerServices.providerId))
      .leftJoin(serviceSubcategories, eq(providerServices.subcategoryId, serviceSubcategories.id));
      
      if (conditions.length > 0) {
        groupedQuery.where(and(...conditions));
      }
      
      const providers = await groupedQuery
        .orderBy(...sortOrder)
        .limit(limit)
        .offset(offset);
      
      return { providers, total: count };
    } else {
      // Without joins, use the simple query with proper ordering and pagination
      const providers = await query
        .orderBy(...sortOrder)
        .limit(limit)
        .offset(offset);
      
      return { providers, total: count };
    }
  }

  async updateServiceProvider(id: number, updates: Partial<ServiceProvider>): Promise<ServiceProvider> {
    const [provider] = await db.update(serviceProviders)
      .set(updates)
      .where(eq(serviceProviders.id, id))
      .returning();
    return provider;
  }

  async deleteServiceProvider(id: number): Promise<void> {
    await db.delete(serviceProviders).where(eq(serviceProviders.id, id));
  }

  // Provider services methods
  async addProviderService(serviceData: InsertProviderService): Promise<ProviderService> {
    const [service] = await db.insert(providerServices)
      .values(serviceData)
      .returning();
    return service;
  }

  async addProviderSubcategoryService(data: { providerId: number; subcategoryId: number }): Promise<void> {
    await db.insert(providerServices)
      .values({
        providerId: data.providerId,
        subcategoryId: data.subcategoryId,
        isActive: true
      });
  }

  async getProviderServices(providerId: number): Promise<(ProviderService & { subcategory: ServiceSubcategory })[]> {
    return await db.select({
      id: providerServices.id,
      providerId: providerServices.providerId,
      subcategoryId: providerServices.subcategoryId,
      customServiceName: providerServices.customServiceName,
      price: providerServices.price,
      description: providerServices.description,
      isActive: providerServices.isActive,
      subcategory: serviceSubcategories
    })
    .from(providerServices)
    .leftJoin(serviceSubcategories, eq(providerServices.subcategoryId, serviceSubcategories.id))
    .where(eq(providerServices.providerId, providerId));
  }

  async removeProviderService(id: number): Promise<void> {
    await db.delete(providerServices).where(eq(providerServices.id, id));
  }

  // Provider reviews methods
  async createProviderReview(reviewData: InsertProviderReview & { userId?: string }): Promise<ProviderReview> {
    const [review] = await db.insert(providerReviews)
      .values({
        ...reviewData,
        reviewedAt: new Date()
      })
      .returning();
    return review;
  }

  async getProviderReviews(providerId: number, limit?: number): Promise<ProviderReview[]> {
    let query = db.select().from(providerReviews)
      .where(eq(providerReviews.providerId, providerId))
      .orderBy(desc(providerReviews.reviewedAt));
    
    if (limit) {
      query = query.limit(limit);
    }
    return await query;
  }

  async approveProviderReview(reviewId: number): Promise<void> {
    await db.update(providerReviews)
      .set({ isApproved: true })
      .where(eq(providerReviews.id, reviewId));
  }

  async rejectProviderReview(reviewId: number): Promise<void> {
    await db.update(providerReviews)
      .set({ isApproved: false })
      .where(eq(providerReviews.id, reviewId));
  }

  // Search and analytics methods
  async logEcosystemSearch(searchData: Omit<EcosystemSearch, 'id' | 'searchedAt'>): Promise<void> {
    await db.insert(ecosystemSearches).values({
      ...searchData,
      searchedAt: new Date()
    });
  }

  async getPopularSearches(limit: number = 10): Promise<{ searchTerm: string; count: number }[]> {
    const results = await db.select({
      searchTerm: ecosystemSearches.searchTerm,
      count: sql<number>`count(*)`
    })
    .from(ecosystemSearches)
    .groupBy(ecosystemSearches.searchTerm)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);

    return results;
  }

  async logProviderContact(contactData: Omit<ProviderContact, 'id' | 'contactedAt'>): Promise<void> {
    await db.insert(providerContacts).values({
      ...contactData,
      contactedAt: new Date()
    });
  }

  async incrementProviderViews(providerId: number): Promise<void> {
    await db.update(serviceProviders)
      .set({ 
        totalViews: sql`${serviceProviders.totalViews} + 1` 
      })
      .where(eq(serviceProviders.id, providerId));
  }

  async incrementProviderContacts(providerId: number): Promise<void> {
    await db.update(serviceProviders)
      .set({ 
        totalContacts: sql`${serviceProviders.totalContacts} + 1` 
      })
      .where(eq(serviceProviders.id, providerId));
  }

  async getEcosystemStats(): Promise<{
    totalProviders: number;
    verifiedProviders: number;
    totalCategories: number;
    totalReviews: number;
    averageRating: number;
  }> {
    const [totalProviders] = await db.select({ count: sql<number>`count(*)` }).from(serviceProviders);
    const [verifiedProviders] = await db.select({ count: sql<number>`count(*)` })
      .from(serviceProviders)
      .where(eq(serviceProviders.isVerified, true));
    const [totalCategories] = await db.select({ count: sql<number>`count(*)` }).from(serviceCategories);
    const [totalReviews] = await db.select({ count: sql<number>`count(*)` }).from(providerReviews);
    const [avgRating] = await db.select({ avg: sql<number>`avg(${providerReviews.rating})` }).from(providerReviews);

    return {
      totalProviders: totalProviders.count,
      verifiedProviders: verifiedProviders.count,
      totalCategories: totalCategories.count,
      totalReviews: totalReviews.count,
      averageRating: Number(avgRating.avg) || 0
    };
  }
}

export const storage = new DatabaseStorage();
