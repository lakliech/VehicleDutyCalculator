import { db } from './db.js';
import { loanProducts } from '../shared/schema.js';

async function addLoanProducts() {
  console.log('Adding loan products...');

  try {
    const loanProductsData = [
      // KCB Products
      {
        bankId: 1,
        productName: 'KCB Auto Loan',
        productType: 'new_vehicle',
        minLoanAmount: '300000',
        maxLoanAmount: '15000000',
        minInterestRate: '12.5',
        maxInterestRate: '18.0',
        minTenureMonths: 12,
        maxTenureMonths: 84,
        maxFinancingPercentage: '0.85',
        minDownPaymentPercentage: '0.15',
        processingFeeRate: '0.015',
        insuranceRequired: true,
        guarantorRequired: false,
        minMonthlyIncome: '50000',
        maxAge: 65,
        eligibilityCriteria: [
          'Kenyan citizen or resident',
          'Minimum age 21 years',
          'Stable employment for at least 6 months',
          'Clean credit history',
          'Verifiable income source'
        ],
        requiredDocuments: [
          'National ID or passport',
          'Latest 3 payslips',
          'Bank statements (6 months)',
          'Employment letter',
          'KRA PIN certificate'
        ],
        features: [
          'Up to 85% financing',
          'Flexible repayment terms',
          'Competitive interest rates',
          'Quick processing',
          'No hidden charges'
        ],
        isActive: true,
      },
      {
        bankId: 1,
        productName: 'KCB Used Car Finance',
        productType: 'used_vehicle',
        minLoanAmount: '200000',
        maxLoanAmount: '8000000',
        minInterestRate: '14.0',
        maxInterestRate: '20.0',
        minTenureMonths: 12,
        maxTenureMonths: 60,
        maxFinancingPercentage: '0.80',
        minDownPaymentPercentage: '0.20',
        processingFeeRate: '0.02',
        insuranceRequired: true,
        guarantorRequired: true,
        minMonthlyIncome: '40000',
        maxAge: 60,
        eligibilityCriteria: [
          'KCB customer for 3 months',
          'Vehicle not older than 8 years',
          'Clean CRB report'
        ],
        requiredDocuments: [
          'Vehicle valuation report',
          'Vehicle inspection report',
          'Logbook transfer documents'
        ],
        features: [
          'Vehicle age up to 8 years',
          'Quick approval process',
          'Flexible terms'
        ],
        isActive: true,
      },
      // Equity Bank Products
      {
        bankId: 2,
        productName: 'Equity Auto Loan',
        productType: 'new_vehicle',
        minLoanAmount: '250000',
        maxLoanAmount: '12000000',
        minInterestRate: '13.0',
        maxInterestRate: '17.5',
        minTenureMonths: 12,
        maxTenureMonths: 72,
        maxFinancingPercentage: '0.80',
        minDownPaymentPercentage: '0.20',
        processingFeeRate: '0.0175',
        insuranceRequired: true,
        guarantorRequired: false,
        minMonthlyIncome: '45000',
        maxAge: 65,
        eligibilityCriteria: [
          'Equity customer',
          'Regular income',
          'Good credit standing'
        ],
        requiredDocuments: [
          'Income documents',
          'ID documents',
          'Banking history'
        ],
        features: [
          'Digital application',
          'Fast approval',
          'Competitive rates'
        ],
        isActive: true,
      }
    ];

    const insertedProducts = await db.insert(loanProducts).values(loanProductsData).returning();
    console.log(`Inserted ${insertedProducts.length} loan products`);

    console.log('Loan products added successfully!');
  } catch (error) {
    console.error('Error adding loan products:', error);
    throw error;
  }
}

addLoanProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
