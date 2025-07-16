import { db } from './server/db';
import { loanApplications } from './shared/schema-minimal';

async function createTestLoanApplication() {
  try {
    // Create a test loan application for listing ID 7
    const testApplication = {
      applicationNumber: `LA${Date.now().toString().slice(-8)}TEST`,
      userId: 'user_1752183124979_u85ugjdgo', // Jared's user ID
      loanProductId: 1, // Assuming product ID 1 exists
      vehicleListingId: 7, // Listing 7
      applicantName: 'John Kamau',
      applicantEmail: 'john.kamau@example.com',
      applicantPhone: '0722123456',
      nationalId: '12345678',
      dateOfBirth: new Date('1985-05-15'),
      maritalStatus: 'married',
      employmentStatus: 'employed',
      employerName: 'Tech Solutions Ltd',
      jobTitle: 'Software Engineer',
      monthlyIncome: '150000',
      monthlyExpenses: '50000',
      requestedAmount: '600000',
      downPaymentAmount: '200000',
      preferredTenureMonths: 48,
      purposeOfLoan: 'Vehicle purchase',
      vehicleMake: 'Honda',
      vehicleModel: 'Fit',
      vehicleYear: 2019,
      vehiclePrice: '800000',
      additionalNotes: 'Looking to finance this vehicle',
      status: 'pending',
      submittedAt: new Date(),
    };

    const [result] = await db.insert(loanApplications).values(testApplication).returning();
    console.log('Test loan application created:', result);
  } catch (error) {
    console.error('Error creating test loan application:', error);
  } finally {
    process.exit();
  }
}

createTestLoanApplication();
