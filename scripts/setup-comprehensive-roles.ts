import { db } from '../server/db';
import { userRoles } from '../shared/schema';
import { eq } from 'drizzle-orm';

const comprehensiveRoles = [
  // Core Administrative Roles
  {
    name: "super_admin",
    description: "Full system access and control with complete administrative privileges",
    permissions: [
      "full_system_access",
      "user_role_management", 
      "system_configuration",
      "database_management",
      "revenue_oversight",
      "backup_management",
      "security_management",
      "all_permissions"
    ]
  },
  {
    name: "platform_admin", 
    description: "General platform management with broad administrative access",
    permissions: [
      "user_account_management",
      "suspend_activate_users",
      "content_moderation",
      "flagging_resolution", 
      "basic_reporting",
      "system_monitoring",
      "manage_users",
      "manage_listings"
    ]
  },

  // Specialized Management Roles
  {
    name: "marketplace_manager",
    description: "Vehicle listing and marketplace operations management",
    permissions: [
      "approve_listings",
      "reject_listings", 
      "dealer_verification",
      "marketplace_analytics",
      "listing_quality_control",
      "market_pricing_oversight",
      "view_all_listings",
      "manage_marketplace"
    ]
  },
  {
    name: "financial_manager",
    description: "Billing, payments, and financial operations management", 
    permissions: [
      "billing_management",
      "payment_oversight",
      "subscription_management",
      "revenue_analytics",
      "financial_products",
      "transaction_monitoring",
      "loan_management",
      "insurance_management"
    ]
  },
  {
    name: "content_moderator",
    description: "Content quality and community guideline enforcement",
    permissions: [
      "flag_review_resolution",
      "user_warning_system",
      "content_quality_enforcement",
      "guideline_enforcement", 
      "spam_fraud_detection",
      "moderate_content",
      "manage_flags"
    ]
  },
  {
    name: "customer_support_manager",
    description: "Customer service and user assistance management",
    permissions: [
      "messaging_oversight",
      "customer_inquiry_management",
      "support_ticket_resolution",
      "user_assistance",
      "platform_onboarding",
      "view_conversations",
      "support_users"
    ]
  },

  // Business Operation Roles
  {
    name: "marketing_manager", 
    description: "Marketing campaigns and promotional content management",
    permissions: [
      "advertisement_management",
      "seo_optimization",
      "promotional_content",
      "market_research",
      "brand_management",
      "manage_advertisements",
      "campaign_analytics"
    ]
  },
  {
    name: "dealer_relations_manager",
    description: "Dealer partnerships and business development",
    permissions: [
      "dealer_onboarding",
      "dealer_verification",
      "dealer_support_training",
      "partnership_management", 
      "dealer_analytics",
      "business_development",
      "manage_dealers"
    ]
  },
  {
    name: "product_manager",
    description: "Product development and user experience optimization",
    permissions: [
      "feature_development",
      "product_catalog_management",
      "ux_optimization",
      "ab_testing",
      "product_roadmap",
      "manage_products",
      "system_configuration"
    ]
  },

  // Technical Roles  
  {
    name: "system_administrator",
    description: "Server management and technical infrastructure",
    permissions: [
      "server_management",
      "performance_optimization",
      "security_management",
      "backup_recovery",
      "technical_maintenance",
      "system_monitoring",
      "database_management"
    ]
  },
  {
    name: "data_analyst",
    description: "Advanced analytics and business intelligence",
    permissions: [
      "advanced_analytics",
      "market_intelligence",
      "performance_metrics",
      "business_intelligence",
      "data_quality_management",
      "view_all_analytics",
      "generate_reports"
    ]
  },

  // Service-Specific Roles
  {
    name: "concierge_service_manager",
    description: "Concierge service quality and delivery management", 
    permissions: [
      "concierge_oversight",
      "service_quality_management",
      "advisor_coordination",
      "premium_service_delivery",
      "customer_satisfaction",
      "manage_concierge",
      "view_concierge_requests"
    ]
  },
  {
    name: "financial_services_coordinator",
    description: "Financial services and loan application processing",
    permissions: [
      "loan_processing",
      "trade_in_evaluation",
      "bank_coordination",
      "financial_oversight",
      "credit_assessment",
      "manage_financial_services",
      "process_applications"
    ]
  },

  // Existing basic roles (keeping for backward compatibility)
  {
    name: "user",
    description: "Standard user with basic platform access",
    permissions: [
      "create_listing",
      "view_own_listings", 
      "edit_own_listings",
      "message_users",
      "search_marketplace"
    ]
  },
  {
    name: "editor",
    description: "Content editor with listing management privileges",
    permissions: [
      "create_listing",
      "view_own_listings",
      "edit_own_listings", 
      "review_listings",
      "moderate_content"
    ]
  },
  {
    name: "admin", 
    description: "Administrator with full listing and user management permissions",
    permissions: [
      "create_listing",
      "view_own_listings",
      "edit_own_listings",
      "review_listings", 
      "approve_listings",
      "reject_listings",
      "manage_users",
      "manage_listings",
      "view_all_listings"
    ]
  }
];

export async function setupComprehensiveRoles() {
  try {
    console.log('🔧 Setting up comprehensive role system...');
    
    for (const role of comprehensiveRoles) {
      // Check if role already exists
      const existingRole = await db
        .select()
        .from(userRoles)
        .where(eq(userRoles.name, role.name))
        .limit(1);

      if (existingRole.length > 0) {
        // Update existing role with new permissions
        await db
          .update(userRoles)
          .set({
            description: role.description,
            permissions: role.permissions
          })
          .where(eq(userRoles.name, role.name));
        
        console.log(`✅ Updated role: ${role.name}`);
      } else {
        // Create new role
        await db
          .insert(userRoles)
          .values(role);
        
        console.log(`✅ Created role: ${role.name}`);
      }
    }

    console.log('🎉 Comprehensive role system setup completed!');
    console.log(`📊 Total roles: ${comprehensiveRoles.length}`);
    
    // Display role summary
    console.log('\n📋 Role Categories:');
    console.log('🔐 Core Administrative: super_admin, platform_admin');
    console.log('🏪 Specialized Management: marketplace_manager, financial_manager, content_moderator, customer_support_manager');
    console.log('💼 Business Operations: marketing_manager, dealer_relations_manager, product_manager');
    console.log('⚙️ Technical: system_administrator, data_analyst');
    console.log('🎯 Service-Specific: concierge_service_manager, financial_services_coordinator');
    console.log('👥 Basic: user, editor, admin');

  } catch (error) {
    console.error('❌ Error setting up roles:', error);
    throw error;
  }
}

// Run the setup function
setupComprehensiveRoles()
  .then(() => {
    console.log('✅ Role setup completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Role setup failed:', error);
    process.exit(1);
  });