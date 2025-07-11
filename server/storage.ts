import { 
  vehicles, calculations, depreciationRates, taxRates, processingFees, vehicleCategoryRules, registrationFees, trailers, heavyMachinery,
  userRoles, appUsers, userSessions, userActivities, listingApprovals, userPreferences, userStats, carListings, passwordResetTokens,
  type Vehicle, type Calculation, type InsertVehicle, type InsertCalculation, type DutyCalculation, type DutyResult, 
  type DepreciationRate, type TaxRate, type ProcessingFee, type VehicleCategoryRule, type RegistrationFee, 
  type Trailer, type HeavyMachinery, type UserRole, type AppUser, type InsertAppUser, type InsertUserRole,
  type CarListing, type InsertCarListing, type ListingApproval, type InsertListingApproval,
  type UserActivity, type UserStats, type UserPreferences, type PasswordResetToken
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, or, desc, sql, gt } from "drizzle-orm";
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
      .values({ ...userDataWithoutPassword, password: hashedPassword })
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
}

export const storage = new DatabaseStorage();
