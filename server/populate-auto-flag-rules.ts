/**
 * Populate automated flag rules table with the specified flag types, trigger counts, and actions
 */

import { db } from './db.js';
import { autoFlagRules } from '../shared/schema.js';

const flagRulesData = [
  {
    flagType: 'inappropriate_offensive_images',
    displayName: 'Inappropriate or offensive images',
    emoji: '📷',
    category: 'content',
    triggerCount: 1,
    actionType: 'hide_images_admin_review',
    actionDescription: 'Immediately hide listing images + send for admin review',
    severity: 'high'
  },
  {
    flagType: 'blurry_low_quality_photos',
    displayName: 'Blurry or low-quality photos',
    emoji: '📷',
    category: 'content',
    triggerCount: 3,
    actionType: 'flag_quality_check',
    actionDescription: 'Flag for quality check; send alert to seller; optionally remove from featured pool',
    severity: 'medium'
  },
  {
    flagType: 'stolen_copyrighted_images',
    displayName: 'Stolen or copyrighted images',
    emoji: '📷',
    category: 'content',
    triggerCount: 1,
    actionType: 'auto_hide_lock_listing',
    actionDescription: 'Auto-hide images + lock listing pending admin verification',
    severity: 'critical'
  },
  {
    flagType: 'misleading_unrelated_photos',
    displayName: 'Misleading or unrelated vehicle photos',
    emoji: '📷',
    category: 'content',
    triggerCount: 2,
    actionType: 'remove_from_search',
    actionDescription: 'Remove listing from search + admin notification',
    severity: 'high'
  },
  {
    flagType: 'incorrect_make_model_year',
    displayName: 'Incorrect make, model, or year',
    emoji: '🔤',
    category: 'misleading',
    triggerCount: 3,
    actionType: 'mark_under_review',
    actionDescription: 'Mark listing "Under Review" + notify seller',
    severity: 'medium'
  },
  {
    flagType: 'fake_mileage_tampered_odometer',
    displayName: 'Fake mileage / tampered odometer',
    emoji: '🔤',
    category: 'misleading',
    triggerCount: 1,
    actionType: 'auto_flag_fraud_review',
    actionDescription: 'Auto-flag for fraud review; suspend listing temporarily',
    severity: 'critical'
  },
  {
    flagType: 'wrong_price',
    displayName: 'Wrong price (e.g., KES 1 car)',
    emoji: '🔤',
    category: 'misleading',
    triggerCount: 1,
    actionType: 'hide_request_correction',
    actionDescription: 'Hide from results + request correction from seller',
    severity: 'medium'
  },
  {
    flagType: 'misrepresentation_condition',
    displayName: 'Misrepresentation of condition',
    emoji: '🔤',
    category: 'misleading',
    triggerCount: 2,
    actionType: 'suspend_visibility',
    actionDescription: 'Suspend listing visibility; send to review queue',
    severity: 'high'
  },
  {
    flagType: 'fake_nonexistent_vehicle',
    displayName: 'Fake or non-existent vehicle',
    emoji: '🔎',
    category: 'suspicious',
    triggerCount: 1,
    actionType: 'immediate_suspension',
    actionDescription: 'Immediate suspension + flag for manual moderation',
    severity: 'critical'
  },
  {
    flagType: 'scam_phishing_attempt',
    displayName: 'Scam/phishing attempt',
    emoji: '🔎',
    category: 'suspicious',
    triggerCount: 1,
    actionType: 'auto_unlist_lock_account',
    actionDescription: 'Auto-unlist + lock seller account (pending admin review)',
    severity: 'critical'
  },
  {
    flagType: 'request_deposit_off_platform',
    displayName: 'Request for deposit / off-platform contact',
    emoji: '🔎',
    category: 'suspicious',
    triggerCount: 1,
    actionType: 'remove_mark_high_risk',
    actionDescription: 'Remove listing + mark seller as "High Risk"',
    severity: 'high'
  },
  {
    flagType: 'duplicate_listing',
    displayName: 'Duplicate listing',
    emoji: '🔎',
    category: 'suspicious',
    triggerCount: 2,
    actionType: 'auto_archive_duplicates',
    actionDescription: 'Auto-archive older duplicates + notify seller',
    severity: 'medium'
  },
  {
    flagType: 'suspected_stolen_vehicle',
    displayName: 'Suspected stolen vehicle',
    emoji: '🔎',
    category: 'suspicious',
    triggerCount: 1,
    actionType: 'immediate_takedown_notify_legal',
    actionDescription: 'Immediate take-down + notify moderation team and legal desk (if available)',
    severity: 'critical'
  },
  {
    flagType: 'seller_unresponsive',
    displayName: 'Seller unresponsive / unreachable',
    emoji: '🧍',
    category: 'behavior',
    triggerCount: 3,
    actionType: 'mark_low_reputation',
    actionDescription: 'Mark seller as low reputation + prompt for verification',
    severity: 'low'
  },
  {
    flagType: 'abusive_rude_seller',
    displayName: 'Abusive or rude seller behavior',
    emoji: '🧍',
    category: 'behavior',
    triggerCount: 2,
    actionType: 'send_warning_restrict_messaging',
    actionDescription: 'Send warning to seller; restrict comment/messaging privileges',
    severity: 'medium'
  },
  {
    flagType: 'impersonation_fake_profile',
    displayName: 'Impersonation or fake profile',
    emoji: '🧍',
    category: 'behavior',
    triggerCount: 1,
    actionType: 'disable_listing_request_verification',
    actionDescription: 'Disable listing + request identity verification',
    severity: 'high'
  },
  {
    flagType: 'banned_item_category',
    displayName: 'Banned item or vehicle category',
    emoji: '⚙️',
    category: 'platform',
    triggerCount: 1,
    actionType: 'remove_immediately_log_violation',
    actionDescription: 'Remove listing immediately + log violation',
    severity: 'high'
  },
  {
    flagType: 'prohibited_keywords',
    displayName: 'Prohibited keywords in title/description',
    emoji: '⚙️',
    category: 'platform',
    triggerCount: 2,
    actionType: 'strip_text_notify_seller',
    actionDescription: 'Strip text + notify seller + auto-replace with default placeholder if needed',
    severity: 'medium'
  },
  {
    flagType: 'external_website_links',
    displayName: 'Link to external websites',
    emoji: '⚙️',
    category: 'platform',
    triggerCount: 1,
    actionType: 'remove_link_flag_manual_approval',
    actionDescription: 'Remove link + auto-flag content for manual approval',
    severity: 'medium'
  },
  {
    flagType: 'listing_spam_minimal_changes',
    displayName: 'Listing spam / minimal changes reposts',
    emoji: '⚙️',
    category: 'platform',
    triggerCount: 3,
    actionType: 'limit_posts_hide_similar',
    actionDescription: 'Limit further posts + hide similar listings',
    severity: 'medium'
  },
  {
    flagType: 'expired_outdated_listing',
    displayName: 'Expired or outdated listing',
    emoji: '📂',
    category: 'platform',
    triggerCount: 2,
    actionType: 'auto_mark_expired',
    actionDescription: 'Auto-mark as expired + suggest renewal',
    severity: 'low'
  },
  {
    flagType: 'vehicle_already_sold',
    displayName: 'Vehicle already sold',
    emoji: '📂',
    category: 'platform',
    triggerCount: 1,
    actionType: 'mark_sold_notify_seller',
    actionDescription: 'Mark as sold + notify seller',
    severity: 'low'
  },
  {
    flagType: 'wrong_category',
    displayName: 'Wrong category',
    emoji: '📂',
    category: 'platform',
    triggerCount: 2,
    actionType: 'auto_suggest_correct_category',
    actionDescription: 'Auto-suggest correct category or auto-move (if enabled)',
    severity: 'low'
  },
  {
    flagType: 'other_custom',
    displayName: 'Other (free text input)',
    emoji: '📂',
    category: 'platform',
    triggerCount: 2,
    actionType: 'send_manual_admin_review',
    actionDescription: 'Send for manual admin review',
    severity: 'medium'
  }
];

async function populateAutoFlagRules() {
  console.log('Starting automated flag rules population...');
  
  try {
    // Insert flag rules
    for (const rule of flagRulesData) {
      await db.insert(autoFlagRules).values(rule).onConflictDoUpdate({
        target: autoFlagRules.flagType,
        set: {
          displayName: rule.displayName,
          emoji: rule.emoji,
          category: rule.category,
          triggerCount: rule.triggerCount,
          actionType: rule.actionType,
          actionDescription: rule.actionDescription,
          severity: rule.severity,
          updatedAt: new Date().toISOString(),
        }
      });
    }
    
    console.log(`✅ Successfully populated ${flagRulesData.length} automated flag rules`);
  } catch (error) {
    console.error('❌ Error populating automated flag rules:', error);
    throw error;
  }
}

// Run the population if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateAutoFlagRules()
    .then(() => {
      console.log('Auto flag rules population completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Auto flag rules population failed:', error);
      process.exit(1);
    });
}

export { populateAutoFlagRules };