import { Router } from 'express';
import { mongoConnection } from '../db/mongodb';

const router = Router();

// Test MongoDB connection endpoint
router.get('/test-mongodb', async (req, res) => {
  try {
    const healthCheck = await mongoConnection.healthCheck();
    const isConnected = mongoConnection.isConnected();
    
    res.json({
      success: true,
      connected: isConnected,
      health: healthCheck,
      message: isConnected ? 'MongoDB is connected and healthy' : 'MongoDB is not connected - using fallback storage',
      fallbackMode: !isConnected
    });
  } catch (error) {
    res.json({
      success: false,
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'MongoDB connection test failed',
      fallbackMode: true
    });
  }
});

// Force reconnection attempt
router.post('/reconnect-mongodb', async (req, res) => {
  try {
    await mongoConnection.disconnect();
    await mongoConnection.connect();
    
    const isConnected = mongoConnection.isConnected();
    
    res.json({
      success: true,
      connected: isConnected,
      message: isConnected ? 'MongoDB reconnected successfully' : 'Reconnection failed - using fallback storage'
    });
  } catch (error) {
    res.json({
      success: false,
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'MongoDB reconnection failed'
    });
  }
});

export { router as mongodbTestRoutes };