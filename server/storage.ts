import { 
  vehicles, calculations, depreciationRates, taxRates, processingFees, vehicleCategoryRules, registrationFees, trailers, heavyMachinery,
  userRoles, appUsers, userSessions, userActivities, listingApprovals, userPreferences, userStats, carListings, passwordResetTokens,
  adminCredentials, adminAuditLog, listingFlags, listingAnalytics, adminNotes, userWarnings, adminTemplates,
  favoriteListings, savedSearches, carComparisons,
  type Vehicle, type Calculation, type InsertVehicle, type InsertCalculation, type DutyCalculation, type DutyResult, 
  type DepreciationRate, type TaxRate, type ProcessingFee, type VehicleCategoryRule, type RegistrationFee, 
  type Trailer, type HeavyMachinery, type UserRole, type AppUser, type InsertAppUser, type InsertUserRole,
  type CarListing, type InsertCarListing, type ListingApproval, type InsertListingApproval,
  type UserActivity, type UserStats, type UserPreferences, type PasswordResetToken,
  type AdminCredential, type InsertAdminCredential, type AdminAuditLog, type InsertAdminAuditLog,
  type ListingFlag, type InsertListingFlag, type ListingAnalytics, type InsertListingAnalytics,
  type AdminNote, type InsertAdminNote, type UserWarning, type InsertUserWarning,
  type AdminTemplate, type InsertAdminTemplate,
  type FavoriteListing, type SavedSearch, type CarComparison
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, or, desc, sql, gt, inArray, isNull } from "drizzle-orm";
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
    const [listings, warnings, activities] = await Promise.all([
      db.select().from(carListings).where(eq(carListings.sellerId, userId)).orderBy(desc(carListings.createdAt)),
      db.select().from(userWarnings).where(eq(userWarnings.userId, userId)).orderBy(desc(userWarnings.createdAt)),
      db.select().from(userActivities).where(eq(userActivities.userId, userId)).orderBy(desc(userActivities.createdAt)).limit(50)
    ]);

    return { listings, warnings, activities };
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
}

export const storage = new DatabaseStorage();
