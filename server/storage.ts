import { 
  vehicles, calculations, depreciationRates, taxRates, processingFees, vehicleCategoryRules, registrationFees, trailers, heavyMachinery,
  userRoles, appUsers, userSessions, userActivities, listingApprovals, userPreferences, userStats, carListings, carInquiries, favoriteListings, passwordResetTokens, priceIndicators,
  userBrowsingHistory, userVehiclePreferences, userVehicleRecommendations, recommendationAnalytics,
  type Vehicle, type Calculation, type InsertVehicle, type InsertCalculation, type DutyCalculation, type DutyResult, 
  type DepreciationRate, type TaxRate, type ProcessingFee, type VehicleCategoryRule, type RegistrationFee, 
  type Trailer, type HeavyMachinery, type UserRole, type AppUser, type InsertAppUser, type InsertUserRole,
  type CarListing, type InsertCarListing, type CarInquiry, type InsertCarInquiry, type FavoriteListing,
  type ListingApproval, type InsertListingApproval,
  type UserActivity, type UserStats, type UserPreferences, type PasswordResetToken, type PriceIndicator,
  type UserBrowsingHistory, type InsertUserBrowsingHistory, type UserVehiclePreferences, type InsertUserVehiclePreferences,
  type UserVehicleRecommendations, type InsertUserVehicleRecommendations, type RecommendationAnalytics
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, or, desc, asc, sql, gt, like, isNull } from "drizzle-orm";

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
  
  // Role management methods
  getAllRoles(): Promise<UserRole[]>;
  createRole(roleData: InsertUserRole): Promise<UserRole>;
  updateRole(id: number, roleData: Partial<InsertUserRole>): Promise<UserRole>;
  deleteRole(id: number): Promise<void>;
  
  // Listing management methods
  getAllListingsForAdmin(): Promise<Array<CarListing & { seller: AppUser; approval?: ListingApproval }>>;
  getListingsByUser(userId: string): Promise<CarListing[]>;
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
  
  // Price indicators methods
  getPriceIndicators(): Promise<PriceIndicator[]>;
  getPriceIndicatorForPercentage(percentage: number): Promise<PriceIndicator | undefined>;
  
  // Marketplace search and filtering methods
  searchListings(filters: any): Promise<CarListing[]>;
  getAvailableMakes(): Promise<string[]>;
  getAvailableModels(make: string): Promise<string[]>;
  getListingWithSeller(id: number): Promise<any>;
  incrementViewCount(id: number): Promise<void>;
  
  // Marketplace interaction methods
  createInquiry(data: any): Promise<any>;
  createOffer(data: any): Promise<any>;
  addFavorite(userId: string, listingId: number): Promise<void>;
  removeFavorite(userId: string, listingId: number): Promise<void>;
  
  // Heatmap and insights methods
  getMarketHeatmapData(filters: { make?: string; location?: string; priceRange?: string }): Promise<any[]>;
  getMarketInsights(filters: { make?: string; location?: string }): Promise<any[]>;
  
  // Vehicle recommendation engine methods
  trackUserBrowsingBehavior(userId: string, behaviorData: InsertUserBrowsingHistory): Promise<void>;
  getUserBrowsingHistory(userId: string, limit?: number): Promise<UserBrowsingHistory[]>;
  getUserVehiclePreferences(userId: string): Promise<UserVehiclePreferences | undefined>;
  updateUserVehiclePreferences(userId: string, preferences: InsertUserVehiclePreferences): Promise<UserVehiclePreferences>;
  generateVehicleRecommendations(userId: string): Promise<UserVehicleRecommendations[]>;
  getUserRecommendations(userId: string, limit?: number): Promise<Array<UserVehicleRecommendations & { listing: CarListing }>>;
  updateRecommendationEngagement(recommendationId: number, engagement: { isViewed?: boolean; isClicked?: boolean; isFavorited?: boolean; isContactedSeller?: boolean }): Promise<void>;
  analyzeUserPreferences(userId: string): Promise<UserVehiclePreferences>;
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
    // Note: In production, hash the password before storing
    const [user] = await db
      .insert(appUsers)
      .values(userDataWithoutPassword)
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
    
    return result[0]?.role;
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
    return await db
      .select()
      .from(carListings)
      .where(eq(carListings.sellerId, userId))
      .orderBy(desc(carListings.createdAt));
  }

  async createListing(listingData: InsertCarListing & { sellerId: string }): Promise<CarListing> {
    const [listing] = await db
      .insert(carListings)
      .values(listingData)
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
    const [listing] = await db
      .update(carListings)
      .set({ ...listingData, updatedAt: new Date() })
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
          eq(passwordResetTokens.usedAt, null)
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
          icon: 'DollarSign',
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

  // Price indicators methods
  async getPriceIndicators(): Promise<PriceIndicator[]> {
    return await db
      .select()
      .from(priceIndicators)
      .where(eq(priceIndicators.isActive, true))
      .orderBy(priceIndicators.minPercentage);
  }

  async getPriceIndicatorForPercentage(percentage: number): Promise<PriceIndicator | undefined> {
    const indicators = await db
      .select()
      .from(priceIndicators)
      .where(eq(priceIndicators.isActive, true))
      .orderBy(priceIndicators.minPercentage);

    for (const indicator of indicators) {
      const minPercentage = parseFloat(indicator.minPercentage);
      const maxPercentage = indicator.maxPercentage ? parseFloat(indicator.maxPercentage) : null;
      
      if (maxPercentage === null) {
        // Open-ended range (e.g., 70%+)
        if (percentage >= minPercentage) {
          return indicator;
        }
      } else {
        // Closed range (e.g., 50-70%)
        if (percentage >= minPercentage && percentage <= maxPercentage) {
          return indicator;
        }
      }
    }
    
    return undefined;
  }

  // ===============================
  // MARKETPLACE METHODS
  // ===============================

  async searchListings(filters: any): Promise<CarListing[]> {
    let query = db.select().from(carListings).where(eq(carListings.status, "active"));

    // Apply filters
    const conditions = [eq(carListings.status, "active")];

    if (filters.make) {
      conditions.push(eq(carListings.make, filters.make));
    }
    if (filters.model) {
      conditions.push(eq(carListings.model, filters.model));
    }
    if (filters.minPrice) {
      conditions.push(gte(carListings.price, filters.minPrice));
    }
    if (filters.maxPrice) {
      conditions.push(lte(carListings.price, filters.maxPrice));
    }
    if (filters.minYear) {
      conditions.push(gte(carListings.year, filters.minYear));
    }
    if (filters.maxYear) {
      conditions.push(lte(carListings.year, filters.maxYear));
    }
    if (filters.fuelType) {
      conditions.push(eq(carListings.fuelType, filters.fuelType));
    }
    if (filters.bodyType) {
      conditions.push(eq(carListings.bodyType, filters.bodyType));
    }
    if (filters.transmission) {
      conditions.push(eq(carListings.transmission, filters.transmission));
    }
    if (filters.location) {
      conditions.push(eq(carListings.location, filters.location));
    }
    if (filters.condition) {
      conditions.push(eq(carListings.condition, filters.condition));
    }
    if (filters.searchQuery) {
      const searchTerm = `%${filters.searchQuery.toLowerCase()}%`;
      conditions.push(
        or(
          like(sql`LOWER(${carListings.make})`, searchTerm),
          like(sql`LOWER(${carListings.model})`, searchTerm),
          like(sql`LOWER(${carListings.title})`, searchTerm)
        )
      );
    }

    const finalQuery = query.where(and(...conditions));

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_low':
        finalQuery.orderBy(asc(carListings.price));
        break;
      case 'price_high':
        finalQuery.orderBy(desc(carListings.price));
        break;
      case 'year_new':
        finalQuery.orderBy(desc(carListings.year));
        break;
      case 'mileage_low':
        finalQuery.orderBy(asc(carListings.mileage));
        break;
      case 'popular':
        finalQuery.orderBy(desc(carListings.viewCount));
        break;
      case 'oldest':
        finalQuery.orderBy(asc(carListings.createdAt));
        break;
      default: // newest
        finalQuery.orderBy(desc(carListings.createdAt));
    }

    return await finalQuery;
  }

  async getAvailableMakes(): Promise<string[]> {
    const results = await db
      .selectDistinct({ make: carListings.make })
      .from(carListings)
      .where(eq(carListings.status, "active"))
      .orderBy(asc(carListings.make));
    
    return results.map(r => r.make);
  }

  async getAvailableModels(make: string): Promise<string[]> {
    const results = await db
      .selectDistinct({ model: carListings.model })
      .from(carListings)
      .where(
        and(
          eq(carListings.status, "active"),
          eq(carListings.make, make)
        )
      )
      .orderBy(asc(carListings.model));
    
    return results.map(r => r.model);
  }

  async getListingWithSeller(id: number): Promise<any> {
    const results = await db
      .select({
        listing: carListings,
        seller: appUsers
      })
      .from(carListings)
      .leftJoin(appUsers, eq(carListings.sellerId, appUsers.id))
      .where(eq(carListings.id, id))
      .limit(1);

    if (results.length === 0) return null;

    const result = results[0];
    return {
      ...result.listing,
      seller: result.seller
    };
  }

  async incrementViewCount(id: number): Promise<void> {
    await db
      .update(carListings)
      .set({ 
        viewCount: sql`${carListings.viewCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(carListings.id, id));
  }

  async createInquiry(data: any): Promise<any> {
    const [inquiry] = await db
      .insert(carInquiries)
      .values(data)
      .returning();
    
    return inquiry;
  }

  async createOffer(data: any): Promise<any> {
    // For now, store offers as inquiries with type "offer"
    const offerInquiry = {
      listingId: data.listingId,
      buyerName: `Buyer ${data.buyerId}`,
      buyerPhone: '',
      buyerEmail: '',
      message: `Offer: KES ${data.offerAmount}. ${data.message}`,
      inquiryType: 'offer',
      preferredContactMethod: 'email'
    };

    const [inquiry] = await db
      .insert(carInquiries)
      .values(offerInquiry)
      .returning();
    
    return inquiry;
  }

  async addFavorite(userId: string, listingId: number): Promise<void> {
    try {
      await db
        .insert(favoriteListings)
        .values({ userId, listingId })
        .onConflictDoNothing();
      
      // Update favorite count
      await db
        .update(carListings)
        .set({ 
          favoriteCount: sql`${carListings.favoriteCount} + 1`,
          updatedAt: new Date()
        })
        .where(eq(carListings.id, listingId));
    } catch (error) {
      // Ignore duplicate errors
      if (!error.message?.includes('duplicate key')) {
        throw error;
      }
    }
  }

  async removeFavorite(userId: string, listingId: number): Promise<void> {
    const result = await db
      .delete(favoriteListings)
      .where(
        and(
          eq(favoriteListings.userId, userId),
          eq(favoriteListings.listingId, listingId)
        )
      );

    // Update favorite count if a row was deleted
    if (result.rowCount && result.rowCount > 0) {
      await db
        .update(carListings)
        .set({ 
          favoriteCount: sql`GREATEST(${carListings.favoriteCount} - 1, 0)`,
          updatedAt: new Date()
        })
        .where(eq(carListings.id, listingId));
    }
  }

  // ===============================
  // HEATMAP AND INSIGHTS METHODS
  // ===============================

  async getMarketHeatmapData(filters: { make?: string; location?: string; priceRange?: string }): Promise<any[]> {
    try {
      // Build query conditions
      const conditions = [eq(carListings.status, "active")];
      
      if (filters.make && filters.make !== "all") {
        conditions.push(eq(carListings.make, filters.make));
      }
      
      if (filters.location && filters.location !== "all") {
        conditions.push(eq(carListings.location, filters.location));
      }
      
      if (filters.priceRange && filters.priceRange !== "all") {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
        if (maxPrice) {
          conditions.push(gte(carListings.price, minPrice));
          conditions.push(lte(carListings.price, maxPrice));
        } else {
          conditions.push(gte(carListings.price, minPrice));
        }
      }

      // Get listings with aggregated data
      const listings = await db
        .select({
          make: carListings.make,
          model: carListings.model,
          engineSize: carListings.engineSize,
          price: carListings.price,
          location: carListings.location,
          viewCount: carListings.viewCount,
          createdAt: carListings.createdAt,
        })
        .from(carListings)
        .where(and(...conditions))
        .orderBy(carListings.createdAt);

      // Group by make/model and calculate heatmap data
      const groupedData = new Map();
      
      for (const listing of listings) {
        const key = `${listing.make}-${listing.model}-${listing.engineSize}`;
        
        if (!groupedData.has(key)) {
          groupedData.set(key, {
            make: listing.make,
            model: listing.model,
            engineSize: listing.engineSize,
            prices: [],
            viewCounts: [],
            listingCount: 0,
            recentListings: 0
          });
        }
        
        const group = groupedData.get(key);
        group.prices.push(listing.price);
        group.viewCounts.push(listing.viewCount || 0);
        group.listingCount++;
        
        // Check if listing is recent (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        if (new Date(listing.createdAt) > thirtyDaysAgo) {
          group.recentListings++;
        }
      }

      // Convert to heatmap format
      const heatmapData = Array.from(groupedData.values()).map(group => {
        const averagePrice = group.prices.reduce((sum: number, price: number) => sum + price, 0) / group.prices.length;
        const averageViews = group.viewCounts.reduce((sum: number, views: number) => sum + views, 0) / group.viewCounts.length;
        
        // Calculate price range
        const minPrice = Math.min(...group.prices);
        const maxPrice = Math.max(...group.prices);
        const priceRange = `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`;
        
        // Determine market activity based on recent listings and views
        let marketActivity: 'high' | 'medium' | 'low' = 'low';
        if (group.recentListings >= 3 && averageViews > 10) {
          marketActivity = 'high';
        } else if (group.recentListings >= 1 || averageViews > 5) {
          marketActivity = 'medium';
        }
        
        // Calculate demand level (0-100)
        const demandLevel = Math.min(100, Math.round((averageViews * 10) + (group.recentListings * 20)));
        
        // Determine price performance based on activity and demand
        let pricePerformance: 'hot' | 'warm' | 'cool' | 'cold' = 'cold';
        if (demandLevel > 70 && marketActivity === 'high') {
          pricePerformance = 'hot';
        } else if (demandLevel > 50 && marketActivity !== 'low') {
          pricePerformance = 'warm';
        } else if (demandLevel > 30) {
          pricePerformance = 'cool';
        }
        
        // Calculate price change (simulated based on market activity)
        const priceChange = marketActivity === 'high' ? 
          Math.random() * 10 - 2 : // -2% to +8%
          marketActivity === 'medium' ?
          Math.random() * 6 - 3 : // -3% to +3%
          Math.random() * 4 - 5; // -5% to -1%
        
        // Determine value rating
        let valueRating: 'excellent' | 'good' | 'fair' | 'poor' = 'fair';
        if (pricePerformance === 'hot' && demandLevel > 80) {
          valueRating = 'poor'; // High demand might mean overpriced
        } else if (pricePerformance === 'cool' && demandLevel < 40) {
          valueRating = 'excellent'; // Low activity might mean good deals
        } else if (pricePerformance === 'warm') {
          valueRating = 'good';
        }

        return {
          make: group.make,
          model: group.model,
          engineSize: group.engineSize,
          priceRange,
          averagePrice: Math.round(averagePrice),
          listingCount: group.listingCount,
          pricePerformance,
          priceChange: Math.round(priceChange * 10) / 10,
          marketActivity,
          demandLevel,
          valueRating
        };
      });

      return heatmapData;
    } catch (error) {
      console.error("Error generating heatmap data:", error);
      return [];
    }
  }

  async getMarketInsights(filters: { make?: string; location?: string }): Promise<any[]> {
    try {
      const heatmapData = await this.getMarketHeatmapData(filters);
      
      if (heatmapData.length === 0) {
        return [];
      }

      const insights = [];
      
      // Market temperature insight
      const hotMarkets = heatmapData.filter(item => item.pricePerformance === 'hot').length;
      const totalMarkets = heatmapData.length;
      const hotPercentage = Math.round((hotMarkets / totalMarkets) * 100);
      
      if (hotPercentage > 30) {
        insights.push({
          category: "Market Temperature",
          insight: `${hotPercentage}% of vehicles are in hot market conditions with high demand and rising prices. Consider selling soon if you own these models.`,
          trend: "positive",
          confidence: 85
        });
      } else if (hotPercentage < 10) {
        insights.push({
          category: "Market Temperature",
          insight: `Only ${hotPercentage}% of vehicles are in hot demand. This is a buyer's market with good negotiation opportunities.`,
          trend: "negative",
          confidence: 80
        });
      }

      // Price trend insight
      const risingPrices = heatmapData.filter(item => item.priceChange > 2).length;
      const risingPercentage = Math.round((risingPrices / totalMarkets) * 100);
      
      if (risingPercentage > 40) {
        insights.push({
          category: "Price Trends",
          insight: `${risingPercentage}% of vehicle models are experiencing price increases. Market inflation is evident across multiple segments.`,
          trend: "positive",
          confidence: 90
        });
      }

      // Activity insight
      const highActivity = heatmapData.filter(item => item.marketActivity === 'high').length;
      const activityPercentage = Math.round((highActivity / totalMarkets) * 100);
      
      if (activityPercentage > 25) {
        insights.push({
          category: "Market Activity",
          insight: `${activityPercentage}% of vehicle models show high market activity with frequent listings and views. Competition is intense.`,
          trend: "positive",
          confidence: 75
        });
      }

      // Value opportunities insight
      const excellentValue = heatmapData.filter(item => item.valueRating === 'excellent').length;
      if (excellentValue > 0) {
        const valuePercentage = Math.round((excellentValue / totalMarkets) * 100);
        insights.push({
          category: "Value Opportunities",
          insight: `${valuePercentage}% of vehicle models offer excellent value with low market activity. These represent potential bargains for buyers.`,
          trend: "neutral",
          confidence: 70
        });
      }

      // Specific make insights (if filtered by make)
      if (filters.make && filters.make !== "all") {
        const makeData = heatmapData.filter(item => item.make === filters.make);
        const avgDemand = makeData.reduce((sum, item) => sum + item.demandLevel, 0) / makeData.length;
        
        if (avgDemand > 60) {
          insights.push({
            category: `${filters.make} Analysis`,
            insight: `${filters.make} vehicles show strong market demand (${Math.round(avgDemand)}% average demand level). Prices are likely to remain stable or increase.`,
            trend: "positive",
            confidence: 85
          });
        }
      }

      return insights;
    } catch (error) {
      console.error("Error generating market insights:", error);
      return [];
    }
  }

  // ===============================
  // VEHICLE RECOMMENDATION ENGINE
  // ===============================

  async trackUserBrowsingBehavior(userId: string, behaviorData: InsertUserBrowsingHistory): Promise<void> {
    try {
      await db.insert(userBrowsingHistory).values({
        ...behaviorData,
        userId,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error tracking user browsing behavior:", error);
    }
  }

  async getUserBrowsingHistory(userId: string, limit: number = 100): Promise<UserBrowsingHistory[]> {
    try {
      return await db
        .select()
        .from(userBrowsingHistory)
        .where(eq(userBrowsingHistory.userId, userId))
        .orderBy(desc(userBrowsingHistory.createdAt))
        .limit(limit);
    } catch (error) {
      console.error("Error getting user browsing history:", error);
      return [];
    }
  }

  async getUserVehiclePreferences(userId: string): Promise<UserVehiclePreferences | undefined> {
    try {
      const [preferences] = await db
        .select()
        .from(userVehiclePreferences)
        .where(eq(userVehiclePreferences.userId, userId));
      return preferences;
    } catch (error) {
      console.error("Error getting user vehicle preferences:", error);
      return undefined;
    }
  }

  async updateUserVehiclePreferences(userId: string, preferences: InsertUserVehiclePreferences): Promise<UserVehiclePreferences> {
    try {
      const [updated] = await db
        .insert(userVehiclePreferences)
        .values({
          ...preferences,
          userId,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: userVehiclePreferences.userId,
          set: {
            ...preferences,
            updatedAt: new Date(),
          },
        })
        .returning();
      return updated;
    } catch (error) {
      console.error("Error updating user vehicle preferences:", error);
      throw error;
    }
  }

  async analyzeUserPreferences(userId: string): Promise<UserVehiclePreferences> {
    try {
      // Get recent browsing history
      const history = await this.getUserBrowsingHistory(userId, 500);
      
      if (history.length === 0) {
        // Return default preferences for new users
        return await this.updateUserVehiclePreferences(userId, {
          makePreferences: JSON.stringify({ "Toyota": 50, "Nissan": 50, "Honda": 50 }),
          priceRangeMin: 500000,
          priceRangeMax: 2000000,
          preferredYearMin: 2010,
          preferredYearMax: 2025,
          engineSizePreferences: JSON.stringify({ "1000-1500": 50, "1500-2000": 50 }),
          fuelTypePreferences: JSON.stringify({ "petrol": 50, "diesel": 50 }),
          bodyTypePreferences: JSON.stringify({ "sedan": 50, "suv": 50 }),
          transmissionPreferences: JSON.stringify({ "automatic": 50, "manual": 50 }),
          locationPreferences: JSON.stringify({ "Nairobi": 50, "Mombasa": 50 }),
          avgViewTime: 30,
          searchFrequency: 5,
          priceFlexibility: 20,
          confidenceScore: 25,
          sampleSize: 0,
          lastAnalyzedAt: new Date(),
        });
      }

      // Analyze browsing patterns
      const makeFrequency: { [key: string]: number } = {};
      const priceRanges: number[] = [];
      const years: number[] = [];
      const engineSizes: number[] = [];
      const fuelTypes: { [key: string]: number } = {};
      const bodyTypes: { [key: string]: number } = {};
      const transmissions: { [key: string]: number } = {};
      const locations: { [key: string]: number } = {};
      const viewTimes: number[] = [];

      // Process browsing history
      history.forEach(item => {
        if (item.vehicleMake) {
          makeFrequency[item.vehicleMake] = (makeFrequency[item.vehicleMake] || 0) + 1;
        }
        if (item.vehiclePrice) {
          priceRanges.push(Number(item.vehiclePrice));
        }
        if (item.vehicleYear) {
          years.push(item.vehicleYear);
        }
        if (item.vehicleEngineSize) {
          engineSizes.push(item.vehicleEngineSize);
        }
        if (item.vehicleFuelType) {
          fuelTypes[item.vehicleFuelType] = (fuelTypes[item.vehicleFuelType] || 0) + 1;
        }
        if (item.vehicleBodyType) {
          bodyTypes[item.vehicleBodyType] = (bodyTypes[item.vehicleBodyType] || 0) + 1;
        }
        if (item.vehicleTransmission) {
          transmissions[item.vehicleTransmission] = (transmissions[item.vehicleTransmission] || 0) + 1;
        }
        if (item.vehicleLocation) {
          locations[item.vehicleLocation] = (locations[item.vehicleLocation] || 0) + 1;
        }
        if (item.timeSpent) {
          viewTimes.push(item.timeSpent);
        }
      });

      // Calculate preference scores (normalized to 0-100)
      const totalViews = history.length;
      const normalizedMakePreferences: { [key: string]: number } = {};
      Object.keys(makeFrequency).forEach(make => {
        normalizedMakePreferences[make] = Math.round((makeFrequency[make] / totalViews) * 100);
      });

      // Calculate engine size preferences
      const engineSizeRanges: { [key: string]: number } = {};
      engineSizes.forEach(size => {
        if (size < 1000) engineSizeRanges["Under 1000"] = (engineSizeRanges["Under 1000"] || 0) + 1;
        else if (size <= 1500) engineSizeRanges["1000-1500"] = (engineSizeRanges["1000-1500"] || 0) + 1;
        else if (size <= 2000) engineSizeRanges["1500-2000"] = (engineSizeRanges["1500-2000"] || 0) + 1;
        else if (size <= 2500) engineSizeRanges["2000-2500"] = (engineSizeRanges["2000-2500"] || 0) + 1;
        else if (size <= 3000) engineSizeRanges["2500-3000"] = (engineSizeRanges["2500-3000"] || 0) + 1;
        else engineSizeRanges["Over 3000"] = (engineSizeRanges["Over 3000"] || 0) + 1;
      });

      // Normalize engine size preferences
      const normalizedEngineSizePreferences: { [key: string]: number } = {};
      Object.keys(engineSizeRanges).forEach(range => {
        normalizedEngineSizePreferences[range] = Math.round((engineSizeRanges[range] / engineSizes.length) * 100);
      });

      // Normalize other preferences
      const normalizedFuelTypes: { [key: string]: number } = {};
      Object.keys(fuelTypes).forEach(fuel => {
        normalizedFuelTypes[fuel] = Math.round((fuelTypes[fuel] / totalViews) * 100);
      });

      const normalizedBodyTypes: { [key: string]: number } = {};
      Object.keys(bodyTypes).forEach(body => {
        normalizedBodyTypes[body] = Math.round((bodyTypes[body] / totalViews) * 100);
      });

      const normalizedTransmissions: { [key: string]: number } = {};
      Object.keys(transmissions).forEach(transmission => {
        normalizedTransmissions[transmission] = Math.round((transmissions[transmission] / totalViews) * 100);
      });

      const normalizedLocations: { [key: string]: number } = {};
      Object.keys(locations).forEach(location => {
        normalizedLocations[location] = Math.round((locations[location] / totalViews) * 100);
      });

      // Calculate statistical values
      const avgViewTime = viewTimes.length > 0 ? Math.round(viewTimes.reduce((sum, time) => sum + time, 0) / viewTimes.length) : 30;
      const minPrice = priceRanges.length > 0 ? Math.min(...priceRanges) : 500000;
      const maxPrice = priceRanges.length > 0 ? Math.max(...priceRanges) : 2000000;
      const minYear = years.length > 0 ? Math.min(...years) : 2010;
      const maxYear = years.length > 0 ? Math.max(...years) : 2025;
      
      // Calculate confidence based on sample size
      const confidenceScore = Math.min(100, Math.round((totalViews / 50) * 100));
      
      // Calculate search frequency (searches per week)
      const searchActions = history.filter(item => item.actionType === 'search').length;
      const daysSpan = history.length > 0 ? Math.max(1, Math.round((Date.now() - new Date(history[history.length - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24))) : 7;
      const searchFrequency = Math.round((searchActions / daysSpan) * 7);

      // Calculate price flexibility (standard deviation of prices viewed)
      const avgPrice = priceRanges.length > 0 ? priceRanges.reduce((sum, price) => sum + price, 0) / priceRanges.length : 1000000;
      const priceVariance = priceRanges.length > 0 ? 
        priceRanges.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / priceRanges.length : 0;
      const priceFlexibility = Math.round((Math.sqrt(priceVariance) / avgPrice) * 100);

      return await this.updateUserVehiclePreferences(userId, {
        makePreferences: JSON.stringify(normalizedMakePreferences),
        priceRangeMin: minPrice,
        priceRangeMax: maxPrice,
        preferredYearMin: minYear,
        preferredYearMax: maxYear,
        engineSizePreferences: JSON.stringify(normalizedEngineSizePreferences),
        fuelTypePreferences: JSON.stringify(normalizedFuelTypes),
        bodyTypePreferences: JSON.stringify(normalizedBodyTypes),
        transmissionPreferences: JSON.stringify(normalizedTransmissions),
        locationPreferences: JSON.stringify(normalizedLocations),
        avgViewTime,
        searchFrequency,
        priceFlexibility,
        confidenceScore,
        sampleSize: totalViews,
        lastAnalyzedAt: new Date(),
      });
    } catch (error) {
      console.error("Error analyzing user preferences:", error);
      throw error;
    }
  }

  async generateVehicleRecommendations(userId: string): Promise<UserVehicleRecommendations[]> {
    try {
      // First, analyze user preferences
      const preferences = await this.analyzeUserPreferences(userId);
      
      // Get recent browsing history
      const history = await this.getUserBrowsingHistory(userId, 100);
      
      // Parse preferences
      const makePreferences = JSON.parse(preferences.makePreferences || "{}");
      const engineSizePreferences = JSON.parse(preferences.engineSizePreferences || "{}");
      const fuelTypePreferences = JSON.parse(preferences.fuelTypePreferences || "{}");
      const bodyTypePreferences = JSON.parse(preferences.bodyTypePreferences || "{}");
      const transmissionPreferences = JSON.parse(preferences.transmissionPreferences || "{}");
      const locationPreferences = JSON.parse(preferences.locationPreferences || "{}");

      // Clear existing recommendations
      await db.delete(userVehicleRecommendations).where(
        and(
          eq(userVehicleRecommendations.userId, userId),
          eq(userVehicleRecommendations.isActive, true)
        )
      );

      const recommendations: InsertUserVehicleRecommendations[] = [];

      // Get available listings
      const listings = await db
        .select()
        .from(carListings)
        .where(eq(carListings.status, 'active'))
        .limit(200);

      // Recently viewed vehicles - get similar vehicles
      const viewedVehicles = history.filter(item => item.actionType === 'view_listing');
      const viewedMakes = [...new Set(viewedVehicles.map(item => item.vehicleMake).filter(Boolean))];
      const viewedModels = [...new Set(viewedVehicles.map(item => item.vehicleModel).filter(Boolean))];

      // Recommendation Type 1: Similar to recently viewed
      if (viewedMakes.length > 0) {
        const similarListings = listings.filter(listing => 
          viewedMakes.includes(listing.make) && 
          listing.price >= (preferences.priceRangeMin || 0) && 
          listing.price <= (preferences.priceRangeMax || 10000000)
        ).slice(0, 5);

        similarListings.forEach(listing => {
          const confidence = Math.min(95, 60 + (makePreferences[listing.make] || 0) * 0.3);
          recommendations.push({
            userId,
            listingId: listing.id,
            recommendationType: 'similar_to_viewed',
            confidenceScore: confidence,
            relevanceScore: confidence,
            reasonCode: 'viewed_similar_make',
            reasonDescription: `You recently viewed ${listing.make} vehicles`,
            sourceBehavior: JSON.stringify({ viewed_makes: viewedMakes }),
            basedOnListings: viewedVehicles.map(item => item.entityId).filter(Boolean),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          });
        });
      }

      // Recommendation Type 2: Price range matches
      const priceMatchListings = listings.filter(listing =>
        listing.price >= (preferences.priceRangeMin || 0) &&
        listing.price <= (preferences.priceRangeMax || 10000000) &&
        !recommendations.some(r => r.listingId === listing.id)
      ).slice(0, 5);

      priceMatchListings.forEach(listing => {
        const confidence = Math.min(85, 50 + (preferences.confidenceScore || 0) * 0.4);
        recommendations.push({
          userId,
          listingId: listing.id,
          recommendationType: 'price_match',
          confidenceScore: confidence,
          relevanceScore: confidence,
          reasonCode: 'price_range_match',
          reasonDescription: `Matches your price range of ${preferences.priceRangeMin?.toLocaleString()} - ${preferences.priceRangeMax?.toLocaleString()} KES`,
          sourceBehavior: JSON.stringify({ price_range: [preferences.priceRangeMin, preferences.priceRangeMax] }),
          basedOnListings: [],
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
      });

      // Recommendation Type 3: Make preference matches
      const preferredMakes = Object.keys(makePreferences).filter(make => makePreferences[make] > 60);
      if (preferredMakes.length > 0) {
        const makeMatchListings = listings.filter(listing =>
          preferredMakes.includes(listing.make) &&
          !recommendations.some(r => r.listingId === listing.id)
        ).slice(0, 5);

        makeMatchListings.forEach(listing => {
          const makeScore = makePreferences[listing.make] || 0;
          const confidence = Math.min(90, 40 + makeScore * 0.5);
          recommendations.push({
            userId,
            listingId: listing.id,
            recommendationType: 'make_preference',
            confidenceScore: confidence,
            relevanceScore: confidence,
            reasonCode: 'preferred_make',
            reasonDescription: `Based on your interest in ${listing.make} vehicles`,
            sourceBehavior: JSON.stringify({ preferred_makes: preferredMakes }),
            basedOnListings: [],
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        });
      }

      // Recommendation Type 4: New listings (last 7 days)
      const newListings = listings.filter(listing => {
        const listingDate = new Date(listing.createdAt);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return listingDate >= sevenDaysAgo &&
               !recommendations.some(r => r.listingId === listing.id);
      }).slice(0, 3);

      newListings.forEach(listing => {
        recommendations.push({
          userId,
          listingId: listing.id,
          recommendationType: 'new_listing',
          confidenceScore: 70,
          relevanceScore: 75,
          reasonCode: 'recently_listed',
          reasonDescription: `New listing - just added to the marketplace`,
          sourceBehavior: JSON.stringify({ new_listing: true }),
          basedOnListings: [],
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        });
      });

      // Insert recommendations
      if (recommendations.length > 0) {
        await db.insert(userVehicleRecommendations).values(recommendations);
      }

      // Return the newly created recommendations
      return await db
        .select()
        .from(userVehicleRecommendations)
        .where(
          and(
            eq(userVehicleRecommendations.userId, userId),
            eq(userVehicleRecommendations.isActive, true)
          )
        )
        .orderBy(desc(userVehicleRecommendations.relevanceScore));
    } catch (error) {
      console.error("Error generating vehicle recommendations:", error);
      return [];
    }
  }

  async getUserRecommendations(userId: string, limit: number = 10): Promise<Array<UserVehicleRecommendations & { listing: CarListing }>> {
    try {
      const recommendations = await db
        .select({
          id: userVehicleRecommendations.id,
          userId: userVehicleRecommendations.userId,
          listingId: userVehicleRecommendations.listingId,
          recommendationType: userVehicleRecommendations.recommendationType,
          confidenceScore: userVehicleRecommendations.confidenceScore,
          relevanceScore: userVehicleRecommendations.relevanceScore,
          reasonCode: userVehicleRecommendations.reasonCode,
          reasonDescription: userVehicleRecommendations.reasonDescription,
          sourceBehavior: userVehicleRecommendations.sourceBehavior,
          basedOnListings: userVehicleRecommendations.basedOnListings,
          isViewed: userVehicleRecommendations.isViewed,
          viewedAt: userVehicleRecommendations.viewedAt,
          isClicked: userVehicleRecommendations.isClicked,
          clickedAt: userVehicleRecommendations.clickedAt,
          isFavorited: userVehicleRecommendations.isFavorited,
          isContactedSeller: userVehicleRecommendations.isContactedSeller,
          isActive: userVehicleRecommendations.isActive,
          expiresAt: userVehicleRecommendations.expiresAt,
          generatedAt: userVehicleRecommendations.generatedAt,
          createdAt: userVehicleRecommendations.createdAt,
          listing: carListings,
        })
        .from(userVehicleRecommendations)
        .innerJoin(carListings, eq(userVehicleRecommendations.listingId, carListings.id))
        .where(
          and(
            eq(userVehicleRecommendations.userId, userId),
            eq(userVehicleRecommendations.isActive, true),
            eq(carListings.status, 'active'),
            or(
              isNull(userVehicleRecommendations.expiresAt),
              gte(userVehicleRecommendations.expiresAt, new Date())
            )
          )
        )
        .orderBy(desc(userVehicleRecommendations.relevanceScore))
        .limit(limit);

      return recommendations;
    } catch (error) {
      console.error("Error getting user recommendations:", error);
      return [];
    }
  }

  async updateRecommendationEngagement(
    recommendationId: number, 
    engagement: { 
      isViewed?: boolean; 
      isClicked?: boolean; 
      isFavorited?: boolean; 
      isContactedSeller?: boolean; 
    }
  ): Promise<void> {
    try {
      const updateData: any = {};
      
      if (engagement.isViewed !== undefined) {
        updateData.isViewed = engagement.isViewed;
        if (engagement.isViewed) updateData.viewedAt = new Date();
      }
      
      if (engagement.isClicked !== undefined) {
        updateData.isClicked = engagement.isClicked;
        if (engagement.isClicked) updateData.clickedAt = new Date();
      }
      
      if (engagement.isFavorited !== undefined) {
        updateData.isFavorited = engagement.isFavorited;
      }
      
      if (engagement.isContactedSeller !== undefined) {
        updateData.isContactedSeller = engagement.isContactedSeller;
      }

      await db
        .update(userVehicleRecommendations)
        .set(updateData)
        .where(eq(userVehicleRecommendations.id, recommendationId));
    } catch (error) {
      console.error("Error updating recommendation engagement:", error);
    }
  }
}

export const storage = new DatabaseStorage();
