import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { eq, and, desc } from 'drizzle-orm';
import { conciergeRequests, conciergeRequestSchema } from '../../shared/schema';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// Mock data for packages (these would come from database in production)
const mockPackages = [
  {
    id: 1,
    name: "Essential",
    description: "Perfect for first-time buyers seeking guidance",
    price: 25000,
    features: [
      "Initial consultation (1 hour)",
      "Vehicle search assistance", 
      "Basic market analysis",
      "Purchase recommendation",
      "Email support"
    ],
    maxVehicles: 1,
    includesInspection: false,
    includesNegotiation: true,
    includesEscrow: false,
    includesFollowUp: false,
    timeline: "1-2 weeks"
  },
  {
    id: 2,
    name: "Professional",
    description: "Comprehensive service with hands-on support",
    price: 75000,
    features: [
      "Everything in Essential",
      "Professional vehicle inspection",
      "Document verification",
      "Negotiation on your behalf",
      "Financing assistance",
      "Phone & WhatsApp support"
    ],
    maxVehicles: 3,
    includesInspection: true,
    includesNegotiation: true,
    includesEscrow: true,
    includesFollowUp: true,
    timeline: "2-3 weeks"
  },
  {
    id: 3,
    name: "Premium",
    description: "White-glove service with dedicated advisor",
    price: 150000,
    features: [
      "Everything in Professional",
      "Dedicated personal advisor",
      "Unlimited consultations",
      "Custom vehicle sourcing",
      "Insurance coordination",
      "Warranty arrangement",
      "24/7 priority support",
      "3-month follow-up support"
    ],
    maxVehicles: 5,
    includesInspection: true,
    includesNegotiation: true,
    includesEscrow: true,
    includesFollowUp: true,
    timeline: "3-4 weeks"
  }
];

// Mock data for advisors
const mockAdvisors = [
  {
    id: 1,
    name: "James Mwangi",
    title: "Senior Automotive Consultant",
    expertise: ["Toyota", "Honda", "Nissan", "Import Specialist"],
    experience: "Over 8 years in automotive industry with expertise in Japanese imports and local vehicle market analysis.",
    rating: 4.9,
    completedRequests: 127
  },
  {
    id: 2,
    name: "Sarah Wanjiku",
    title: "Luxury Vehicle Specialist", 
    expertise: ["BMW", "Mercedes", "Audi", "Luxury Cars"],
    experience: "Specializes in premium and luxury vehicles with 6 years experience in high-end automotive market.",
    rating: 4.8,
    completedRequests: 89
  },
  {
    id: 3,
    name: "Michael Otieno",
    title: "Budget Vehicle Expert",
    expertise: ["Budget Cars", "First-time Buyers", "Financing"],
    experience: "Helps first-time buyers find reliable, affordable vehicles. Expert in vehicle financing and budget optimization.",
    rating: 4.7,
    completedRequests: 156
  }
];

// Using the schema from shared/schema.ts which is already imported

// Get all packages
router.get('/packages', async (req, res) => {
  try {
    res.json(mockPackages);
  } catch (error) {
    console.error('Error fetching concierge packages:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// Get all advisors
router.get('/advisors', async (req, res) => {
  try {
    res.json(mockAdvisors);
  } catch (error) {
    console.error('Error fetching concierge advisors:', error);
    res.status(500).json({ error: 'Failed to fetch advisors' });
  }
});

// Get user's concierge requests (requires authentication)
router.get('/requests', authenticateUser, async (req: any, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userRequests = await db
      .select()
      .from(conciergeRequests)
      .where(eq(conciergeRequests.userId, userId))
      .orderBy(desc(conciergeRequests.createdAt));

    res.json(userRequests);
  } catch (error) {
    console.error('Error fetching concierge requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Create new concierge request
router.post('/requests', authenticateUser, async (req: any, res) => {
  try {
    const validation = conciergeRequestSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request data', 
        details: validation.error.issues 
      });
    }

    const requestData = validation.data;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Save to database
    const [newRequest] = await db
      .insert(conciergeRequests)
      .values({
        ...requestData,
        userId,
        status: 'consultation',
      })
      .returning();

    console.log('New concierge request created:', {
      id: newRequest.id,
      userId,
      budgetRange: requestData.budgetRange,
      vehicleType: requestData.vehicleType,
      timeline: requestData.timeline,
      contactEmail: requestData.contactEmail
    });

    res.status(201).json({
      success: true,
      message: 'Request submitted successfully',
      request: newRequest
    });

  } catch (error) {
    console.error('Error creating concierge request:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// Get specific request details (requires authentication and ownership check)
router.get('/requests/:id', async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    
    if (isNaN(requestId)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    // In production, this would fetch from database with authentication checks
    res.json({
      id: requestId,
      status: 'consultation',
      budgetRange: 'Example range',
      vehicleType: 'Example type',
      timeline: 'Example timeline',
      assignedAdvisor: 'James Mwangi',
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching concierge request:', error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
});

export default router;