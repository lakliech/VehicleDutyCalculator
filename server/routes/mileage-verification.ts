import type { Express } from "express";
import fetch from 'node-fetch';

interface VerificationResponse {
  status: 'verified' | 'not_found' | 'invalid' | 'error';
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: string;
    engine?: string;
    mileage?: string;
    registrationDate?: string;
    lastInspection?: string;
    certificateNumber?: string;
  };
  message?: string;
}

export function registerMileageVerificationRoutes(app: Express) {
  // Mileage verification endpoint
  app.post('/api/verify-mileage', async (req, res) => {
    try {
      const { chassisNumber } = req.body;

      if (!chassisNumber || typeof chassisNumber !== 'string') {
        return res.status(400).json({
          status: 'invalid',
          message: 'Valid chassis number is required'
        });
      }

      // Clean and validate chassis number
      const cleanChassisNumber = chassisNumber.trim().toUpperCase();
      
      if (cleanChassisNumber.length < 5 || cleanChassisNumber.length > 17) {
        return res.status(400).json({
          status: 'invalid',
          message: 'Chassis number must be between 5 and 17 characters'
        });
      }

      console.log(`Verifying chassis number: ${cleanChassisNumber}`);

      // Make request to external verification service
      const externalResponse = await fetch('http://www.qisj.co.uk/processVerifyCertificate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Gariyangu-VerificationService/1.0'
        },
        body: `searchCertificate=${encodeURIComponent(cleanChassisNumber)}`,
        timeout: 10000 // 10 second timeout
      });

      if (!externalResponse.ok) {
        console.error(`External API error: ${externalResponse.status} ${externalResponse.statusText}`);
        return res.status(500).json({
          status: 'error',
          message: 'External verification service unavailable'
        });
      }

      const responseText = await externalResponse.text();
      console.log('External API response:', responseText);

      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse external API response:', parseError);
        return res.status(500).json({
          status: 'error',
          message: 'Invalid response from verification service'
        });
      }

      // Process the response based on expected data structure
      const verificationResult: VerificationResponse = processVerificationData(parsedData, cleanChassisNumber);

      res.json(verificationResult);
    } catch (error: any) {
      console.error('Mileage verification error:', error);
      
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        return res.status(503).json({
          status: 'error',
          message: 'Verification service temporarily unavailable'
        });
      }

      if (error.name === 'TimeoutError') {
        return res.status(504).json({
          status: 'error',
          message: 'Verification request timed out'
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Internal verification error'
      });
    }
  });

  // Health check endpoint for verification service
  app.get('/api/verify-mileage/health', async (req, res) => {
    try {
      const testResponse = await fetch('http://www.qisj.co.uk/processVerifyCertificate.php', {
        method: 'HEAD',
        timeout: 5000
      });
      
      res.json({
        status: 'healthy',
        externalService: testResponse.ok ? 'available' : 'unavailable',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(503).json({
        status: 'unhealthy',
        externalService: 'unavailable',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  });
}

function processVerificationData(data: any, chassisNumber: string): VerificationResponse {
  // Handle different response formats from external API
  if (!data) {
    return {
      status: 'not_found',
      message: 'No verification data returned'
    };
  }

  // Check if the response indicates an error
  if (data.error || data.status === 'error') {
    return {
      status: 'error',
      message: data.message || data.error || 'Verification service error'
    };
  }

  // Check if no records found
  if (data.status === 'not_found' || data.found === false || !data.vehicle) {
    return {
      status: 'not_found',
      message: 'No verification records found for this chassis number'
    };
  }

  // Check if chassis number is invalid
  if (data.status === 'invalid' || data.valid === false) {
    return {
      status: 'invalid',
      message: 'Invalid chassis number format'
    };
  }

  // Process successful verification response
  if (data.status === 'verified' || data.found === true || data.vehicle) {
    const vehicleData = data.vehicle || data.details || data;
    
    return {
      status: 'verified',
      vehicleDetails: {
        make: vehicleData.make || vehicleData.manufacturer || undefined,
        model: vehicleData.model || undefined,
        year: vehicleData.year || vehicleData.manufactureYear || undefined,
        engine: vehicleData.engine || vehicleData.engineSize || undefined,
        mileage: vehicleData.mileage || vehicleData.odometer || vehicleData.kilometers || undefined,
        registrationDate: vehicleData.registrationDate || vehicleData.regDate || undefined,
        lastInspection: vehicleData.lastInspection || vehicleData.inspectionDate || undefined,
        certificateNumber: vehicleData.certificateNumber || vehicleData.certNumber || undefined
      }
    };
  }

  // Default case - assume verification was successful but with limited data
  return {
    status: 'verified',
    vehicleDetails: {
      make: data.make || undefined,
      model: data.model || undefined,
      year: data.year || undefined,
      engine: data.engine || undefined,
      mileage: data.mileage || undefined,
      registrationDate: data.registrationDate || undefined,
      lastInspection: data.lastInspection || undefined,
      certificateNumber: data.certificateNumber || undefined
    }
  };
}