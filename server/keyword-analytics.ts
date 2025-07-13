/**
 * Keyword Analytics System
 * 
 * Tracks search terms that lead to listing views and conversions,
 * providing sellers with insights into how buyers find their listings.
 */

import { db } from './db';
import { searchKeywords, searchImpressions, listingViews, carListings } from '../shared/schema';
import { eq, and, sql, desc } from 'drizzle-orm';

interface KeywordTrackingData {
  listingId: number;
  keyword: string;
  searchQuery: string;
  searchFilters?: any;
  position?: number;
  wasClicked: boolean;
  viewerId?: string;
  deviceType?: string;
  location?: string;
  sessionId?: string;
}

interface ConversionTrackingData {
  listingId: number;
  keyword: string;
  conversionType: 'inquiry' | 'phone_click' | 'favorite' | 'share';
  viewerId?: string;
}

export class KeywordAnalytics {
  
  /**
   * Track search impression - when a listing appears in search results
   */
  static async trackSearchImpression(data: KeywordTrackingData): Promise<void> {
    try {
      // Record search impression
      await db.insert(searchImpressions).values({
        listingId: data.listingId,
        searchQuery: data.searchQuery,
        searchFilters: data.searchFilters ? JSON.stringify(data.searchFilters) : null,
        position: data.position || 1,
        wasClicked: data.wasClicked,
        viewerId: data.viewerId,
        deviceType: data.deviceType,
        location: data.location,
        createdAt: new Date()
      });

      // Extract and track individual keywords
      const keywords = this.extractKeywords(data.searchQuery);
      
      for (const keyword of keywords) {
        await this.updateKeywordTracking(data.listingId, keyword, 'search');
      }
    } catch (error) {
      console.error('Error tracking search impression:', error);
    }
  }

  /**
   * Track when user clicks on listing from search results
   */
  static async trackSearchClick(data: KeywordTrackingData): Promise<void> {
    try {
      // Update search impression to mark as clicked
      await db
        .update(searchImpressions)
        .set({ wasClicked: true })
        .where(
          and(
            eq(searchImpressions.listingId, data.listingId),
            eq(searchImpressions.searchQuery, data.searchQuery),
            eq(searchImpressions.viewerId, data.viewerId || '')
          )
        );

      // Track listing view with search context
      await db.insert(listingViews).values({
        listingId: data.listingId,
        viewerId: data.viewerId,
        sessionId: data.sessionId,
        deviceType: data.deviceType,
        location: data.location,
        searchQuery: data.searchQuery,
        referrer: 'search_results',
        viewedAt: new Date(),
        isUniqueVisitor: true
      });

      // Update keyword click counts
      const keywords = this.extractKeywords(data.searchQuery);
      
      for (const keyword of keywords) {
        await this.updateKeywordTracking(data.listingId, keyword, 'click');
      }
    } catch (error) {
      console.error('Error tracking search click:', error);
    }
  }

  /**
   * Track keyword-driven conversions (inquiries, phone clicks, etc.)
   */
  static async trackKeywordConversion(data: ConversionTrackingData): Promise<void> {
    try {
      // Find the most recent search query for this viewer and listing
      const recentView = await db
        .select({ searchQuery: listingViews.searchQuery })
        .from(listingViews)
        .where(
          and(
            eq(listingViews.listingId, data.listingId),
            eq(listingViews.viewerId, data.viewerId || '')
          )
        )
        .orderBy(desc(listingViews.viewedAt))
        .limit(1);

      if (recentView.length > 0 && recentView[0].searchQuery) {
        const keywords = this.extractKeywords(recentView[0].searchQuery);
        
        for (const keyword of keywords) {
          await this.updateKeywordTracking(data.listingId, keyword, 'conversion');
        }
      } else if (data.keyword) {
        // Direct keyword provided
        await this.updateKeywordTracking(data.listingId, data.keyword, 'conversion');
      }
    } catch (error) {
      console.error('Error tracking keyword conversion:', error);
    }
  }

  /**
   * Update keyword tracking counts in database
   */
  private static async updateKeywordTracking(
    listingId: number, 
    keyword: string, 
    action: 'search' | 'click' | 'conversion'
  ): Promise<void> {
    try {
      const updateData: any = { lastSearched: new Date() };
      
      switch (action) {
        case 'search':
          updateData.searchCount = sql`COALESCE(search_count, 0) + 1`;
          break;
        case 'click':
          updateData.clickCount = sql`COALESCE(click_count, 0) + 1`;
          break;
        case 'conversion':
          updateData.conversionCount = sql`COALESCE(conversion_count, 0) + 1`;
          break;
      }

      await db
        .insert(searchKeywords)
        .values({
          listingId,
          keyword: keyword.toLowerCase().trim(),
          searchCount: action === 'search' ? 1 : 0,
          clickCount: action === 'click' ? 1 : 0,
          conversionCount: action === 'conversion' ? 1 : 0,
          lastSearched: new Date()
        })
        .onConflictDoUpdate({
          target: [searchKeywords.listingId, searchKeywords.keyword],
          set: updateData
        });
    } catch (error) {
      console.error('Error updating keyword tracking:', error);
    }
  }

  /**
   * Extract meaningful keywords from search query
   */
  private static extractKeywords(searchQuery: string): string[] {
    if (!searchQuery) return [];
    
    // Common stop words to filter out
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'car', 'vehicle', 'auto', 'automobile' // Generic vehicle terms
    ]);

    // Extract meaningful keywords
    const keywords = searchQuery
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove special characters
      .split(/\s+/) // Split by whitespace
      .filter(word => 
        word.length > 2 && // At least 3 characters
        !stopWords.has(word) && // Not a stop word
        !/^\d+$/.test(word) // Not just numbers
      )
      .slice(0, 10); // Limit to 10 keywords

    // Also include the full search query as a phrase if it's meaningful
    const cleanQuery = searchQuery.toLowerCase().trim();
    if (cleanQuery.length > 3 && cleanQuery.length < 50) {
      keywords.unshift(cleanQuery);
    }

    return [...new Set(keywords)]; // Remove duplicates
  }

  /**
   * Get top keywords for a listing
   */
  static async getListingKeywords(listingId: number, limit: number = 20): Promise<any[]> {
    try {
      const keywords = await db
        .select()
        .from(searchKeywords)
        .where(eq(searchKeywords.listingId, listingId))
        .orderBy(desc(searchKeywords.searchCount))
        .limit(limit);

      return keywords.map(keyword => ({
        keyword: keyword.keyword,
        search_count: keyword.searchCount,
        click_count: keyword.clickCount,
        conversion_count: keyword.conversionCount,
        click_through_rate: keyword.searchCount > 0 
          ? ((keyword.clickCount || 0) / keyword.searchCount * 100).toFixed(1)
          : '0.0',
        conversion_rate: keyword.clickCount > 0
          ? ((keyword.conversionCount || 0) / keyword.clickCount * 100).toFixed(1)
          : '0.0',
        last_searched: keyword.lastSearched
      }));
    } catch (error) {
      console.error('Error getting listing keywords:', error);
      return [];
    }
  }

  /**
   * Get keyword performance across all listings for seller
   */
  static async getSellerKeywordAnalytics(sellerId: string): Promise<any[]> {
    try {
      const results = await db.execute(sql`
        SELECT 
          sk.keyword,
          COUNT(DISTINCT sk.listing_id) as listings_count,
          SUM(sk.search_count) as total_searches,
          SUM(sk.click_count) as total_clicks,
          SUM(sk.conversion_count) as total_conversions,
          ROUND(
            CASE 
              WHEN SUM(sk.search_count) > 0 
              THEN (SUM(sk.click_count)::decimal / SUM(sk.search_count) * 100)
              ELSE 0 
            END, 1
          ) as avg_ctr,
          ROUND(
            CASE 
              WHEN SUM(sk.click_count) > 0 
              THEN (SUM(sk.conversion_count)::decimal / SUM(sk.click_count) * 100)
              ELSE 0 
            END, 1
          ) as avg_conversion_rate
        FROM search_keywords sk
        JOIN car_listings cl ON sk.listing_id = cl.id
        WHERE cl.seller_id = ${sellerId}
        GROUP BY sk.keyword
        HAVING SUM(sk.search_count) >= 3
        ORDER BY SUM(sk.search_count) DESC
        LIMIT 50
      `);

      return results.rows;
    } catch (error) {
      console.error('Error getting seller keyword analytics:', error);
      return [];
    }
  }

  /**
   * Get trending keywords across platform
   */
  static async getTrendingKeywords(limit: number = 20): Promise<any[]> {
    try {
      const results = await db.execute(sql`
        SELECT 
          sk.keyword,
          COUNT(DISTINCT sk.listing_id) as listings_affected,
          SUM(sk.search_count) as total_searches,
          SUM(sk.click_count) as total_clicks,
          ROUND(
            CASE 
              WHEN SUM(sk.search_count) > 0 
              THEN (SUM(sk.click_count)::decimal / SUM(sk.search_count) * 100)
              ELSE 0 
            END, 1
          ) as ctr_percentage
        FROM search_keywords sk
        WHERE sk.last_searched >= NOW() - INTERVAL '30 days'
        GROUP BY sk.keyword
        HAVING SUM(sk.search_count) >= 10
        ORDER BY SUM(sk.search_count) DESC
        LIMIT ${limit}
      `);

      return results.rows;
    } catch (error) {
      console.error('Error getting trending keywords:', error);
      return [];
    }
  }

  /**
   * Generate keyword recommendations for listing optimization
   */
  static async generateKeywordRecommendations(listingId: number): Promise<string[]> {
    try {
      // Get listing details
      const listing = await db
        .select()
        .from(carListings)
        .where(eq(carListings.id, listingId))
        .limit(1);

      if (!listing.length) return [];

      const listingData = listing[0];
      
      // Get high-performing keywords for similar vehicles
      const similarKeywords = await db.execute(sql`
        SELECT sk.keyword, AVG(sk.click_count::decimal / sk.search_count) as performance
        FROM search_keywords sk
        JOIN car_listings cl ON sk.listing_id = cl.id
        WHERE cl.make = ${listingData.make}
          AND cl.model = ${listingData.model}
          AND sk.search_count >= 5
          AND sk.listing_id != ${listingId}
        GROUP BY sk.keyword
        HAVING AVG(sk.click_count::decimal / sk.search_count) > 0.05
        ORDER BY performance DESC
        LIMIT 10
      `);

      const recommendations = similarKeywords.rows.map(row => row.keyword);
      
      // Add vehicle-specific recommendations
      const vehicleKeywords = [
        `${listingData.make} ${listingData.model}`,
        `${listingData.year} ${listingData.make}`,
        `${listingData.fuelType} ${listingData.bodyType}`,
        `${listingData.transmission} transmission`,
        `low mileage ${listingData.make}`,
        `${listingData.bodyType} for sale`
      ].filter(Boolean);

      return [...new Set([...recommendations, ...vehicleKeywords])];
    } catch (error) {
      console.error('Error generating keyword recommendations:', error);
      return [];
    }
  }
}

export default KeywordAnalytics;