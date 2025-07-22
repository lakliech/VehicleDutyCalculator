
import { pgTable, serial, varchar, integer, text, timestamp, boolean, jsonb, decimal, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Live Streaming Schema
export const liveStreams = pgTable('live_streams', {
  id: serial('id').primaryKey(),
  streamId: varchar('stream_id', { length: 100 }).unique().notNull(),
  sellerId: varchar('seller_id', { length: 50 }).notNull(),
  dealerId: integer('dealer_id'),
  listingId: integer('listing_id'),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  scheduledAt: timestamp('scheduled_at'),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
  status: varchar('status', { length: 20 }).default('scheduled'), // scheduled, live, ended, cancelled
  streamUrl: varchar('stream_url', { length: 500 }),
  recordingUrl: varchar('recording_url', { length: 500 }),
  viewerCount: integer('viewer_count').default(0),
  peakViewers: integer('peak_viewers').default(0),
  chatEnabled: boolean('chat_enabled').default(true),
  metadata: jsonb('metadata').$type<{
    vehicleHighlights?: string[];
    featuredSpecs?: Record<string, string>;
    streamSettings?: Record<string, any>;
  }>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const streamViewers = pgTable('stream_viewers', {
  id: serial('id').primaryKey(),
  streamId: integer('stream_id').references(() => liveStreams.id),
  userId: varchar('user_id', { length: 50 }),
  joinedAt: timestamp('joined_at').defaultNow(),
  leftAt: timestamp('left_at'),
  watchDuration: integer('watch_duration'), // in seconds
  interactionCount: integer('interaction_count').default(0)
});

export const streamChat = pgTable('stream_chat', {
  id: serial('id').primaryKey(),
  streamId: integer('stream_id').references(() => liveStreams.id),
  userId: varchar('user_id', { length: 50 }),
  username: varchar('username', { length: 100 }),
  message: text('message').notNull(),
  messageType: varchar('message_type', { length: 20 }).default('chat'), // chat, question, interest
  isHighlighted: boolean('is_highlighted').default(false),
  timestamp: timestamp('timestamp').defaultNow()
});

// Group Buying Schema
export const groupBuys = pgTable('group_buys', {
  id: serial('id').primaryKey(),
  groupBuyId: varchar('group_buy_id', { length: 100 }).unique().notNull(),
  organizerId: varchar('organizer_id', { length: 50 }).notNull(),
  dealerId: integer('dealer_id'),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  vehicleSpecs: jsonb('vehicle_specs').$type<{
    make: string;
    model: string;
    year: number;
    engineSize?: string;
    fuelType?: string;
    transmission?: string;
    features?: string[];
  }>(),
  targetQuantity: integer('target_quantity').notNull(),
  minQuantity: integer('min_quantity').notNull(),
  currentQuantity: integer('current_quantity').default(0),
  pricePerUnit: decimal('price_per_unit', { precision: 12, scale: 2 }).notNull(),
  totalValue: decimal('total_value', { precision: 15, scale: 2 }),
  discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  deliveryEstimate: varchar('delivery_estimate', { length: 100 }),
  status: varchar('status', { length: 20 }).default('active'), // active, successful, failed, cancelled
  paymentDeadline: timestamp('payment_deadline'),
  importDetails: jsonb('import_details').$type<{
    sourceCountry: string;
    port: string;
    estimatedShippingCost: number;
    estimatedDutyTaxes: number;
    totalLandedCost: number;
  }>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const groupBuyParticipants = pgTable('group_buy_participants', {
  id: serial('id').primaryKey(),
  groupBuyId: integer('group_buy_id').references(() => groupBuys.id),
  userId: varchar('user_id', { length: 50 }).notNull(),
  quantity: integer('quantity').notNull(),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 20 }).default('pending'), // pending, paid, refunded
  paymentReference: varchar('payment_reference', { length: 100 }),
  joinedAt: timestamp('joined_at').defaultNow(),
  paidAt: timestamp('paid_at'),
  customizations: jsonb('customizations').$type<{
    color?: string;
    additionalFeatures?: string[];
    specialRequests?: string;
  }>()
});

// Influencer Partnership Schema
export const influencers = pgTable('influencers', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 50 }).unique(),
  influencerCode: varchar('influencer_code', { length: 50 }).unique().notNull(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  bio: text('bio'),
  profileImageUrl: varchar('profile_image_url', { length: 500 }),
  specialties: jsonb('specialties').$type<string[]>(),
  platforms: jsonb('platforms').$type<{
    youtube?: { channelId: string; subscribers: number; };
    instagram?: { handle: string; followers: number; };
    tiktok?: { handle: string; followers: number; };
    twitter?: { handle: string; followers: number; };
  }>(),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).default('5.00'),
  totalEarnings: decimal('total_earnings', { precision: 12, scale: 2 }).default('0.00'),
  status: varchar('status', { length: 20 }).default('active'), // active, suspended, inactive
  verificationStatus: varchar('verification_status', { length: 20 }).default('pending'), // pending, verified, rejected
  joinedAt: timestamp('joined_at').defaultNow()
});

export const influencerReviews = pgTable('influencer_reviews', {
  id: serial('id').primaryKey(),
  reviewId: varchar('review_id', { length: 100 }).unique().notNull(),
  influencerId: integer('influencer_id').references(() => influencers.id),
  listingId: integer('listing_id'),
  dealerId: integer('dealer_id'),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  rating: integer('rating').notNull(), // 1-5 stars
  videoUrl: varchar('video_url', { length: 500 }),
  images: jsonb('images').$type<string[]>(),
  tags: jsonb('tags').$type<string[]>(),
  viewCount: integer('view_count').default(0),
  likeCount: integer('like_count').default(0),
  shareCount: integer('share_count').default(0),
  commissionEarned: decimal('commission_earned', { precision: 10, scale: 2 }),
  publishedAt: timestamp('published_at').defaultNow(),
  status: varchar('status', { length: 20 }).default('published') // draft, published, archived
});

export const influencerReferrals = pgTable('influencer_referrals', {
  id: serial('id').primaryKey(),
  influencerId: integer('influencer_id').references(() => influencers.id),
  userId: varchar('user_id', { length: 50 }).notNull(),
  listingId: integer('listing_id'),
  reviewId: integer('review_id').references(() => influencerReviews.id),
  referralSource: varchar('referral_source', { length: 50 }), // youtube, instagram, tiktok, etc.
  actionType: varchar('action_type', { length: 50 }), // view, inquiry, purchase, test_drive
  commissionAmount: decimal('commission_amount', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 20 }).default('pending'), // pending, confirmed, paid
  referredAt: timestamp('referred_at').defaultNow(),
  confirmedAt: timestamp('confirmed_at')
});

// Relations
export const liveStreamRelations = relations(liveStreams, ({ many, one }) => ({
  viewers: many(streamViewers),
  chatMessages: many(streamChat)
}));

export const groupBuyRelations = relations(groupBuys, ({ many }) => ({
  participants: many(groupBuyParticipants)
}));

export const influencerRelations = relations(influencers, ({ many }) => ({
  reviews: many(influencerReviews),
  referrals: many(influencerReferrals)
}));
