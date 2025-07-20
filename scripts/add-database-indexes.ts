import { db } from '../server/db';
import { sql } from 'drizzle-orm';

async function addPerformanceIndexes() {
  console.log('Adding performance indexes to database...');

  try {
    // Critical indexes for car listings
    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_car_listings_seller_id ON car_listings(seller_id)`);
    console.log('✓ Added index on car_listings.seller_id');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_car_listings_status ON car_listings(status)`);
    console.log('✓ Added index on car_listings.status');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_car_listings_make_model ON car_listings(make, model)`);
    console.log('✓ Added index on car_listings.make, model');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_car_listings_price ON car_listings(price)`);
    console.log('✓ Added index on car_listings.price');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_car_listings_year ON car_listings(year)`);
    console.log('✓ Added index on car_listings.year');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_car_listings_location ON car_listings(location)`);
    console.log('✓ Added index on car_listings.location');

    // User status index
    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_app_users_status ON app_users(status)`);
    console.log('✓ Added index on app_users.status');

    // Conversation indexes
    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_conversations_listing_id ON conversations(listing_id)`);
    console.log('✓ Added index on conversations.listing_id');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_conversations_participant1_id ON conversations(participant1_id)`);
    console.log('✓ Added index on conversations.participant1_id');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_conversations_participant2_id ON conversations(participant2_id)`);
    console.log('✓ Added index on conversations.participant2_id');

    // Message indexes
    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id)`);
    console.log('✓ Added index on messages.conversation_id');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_messages_conversation_id_is_read ON messages(conversation_id, is_read)`);
    console.log('✓ Added index on messages.conversation_id, is_read');

    // Analytics indexes
    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_listing_views_listing_id ON listing_views(listing_id)`);
    console.log('✓ Added index on listing_views.listing_id');

    await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_daily_listing_analytics_listing_id ON daily_listing_analytics(listing_id)`);
    console.log('✓ Added index on daily_listing_analytics.listing_id');

    console.log('\n✅ All performance indexes added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding indexes:', error);
    process.exit(1);
  }
}

addPerformanceIndexes();