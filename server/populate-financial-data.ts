import { db } from './db';
import { bankPartners, loanProducts } from '@shared/schema';

async function populateFinancialData() {
  console.log('Populating financial services data...');

  try {
    // Insert bank partners
    const bankData = [
      {
        bankName: 'Kenya Commercial Bank (KCB)',
        bankCode: 'KCB001',
        logoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop&crop=center',
        contactPhone: '+254-711-087-000',
        contactEmail: 'info@kcbgroup.com',
        websiteUrl: 'https://kcbgroup.com',
        isActive: true,
      },
      {
        bankName: 'Equity Bank',
        bankCode: 'EQB002',
        logoUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop&crop=center',
        contactPhone: '+254-763-063-000',
        contactEmail: 'info@equitybank.co.ke',
        websiteUrl: 'https://equitybank.co.ke',
        isActive: true,
      },
      {
        bankName: 'Co-operative Bank',
        bankCode: 'COOP003',
        logoUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100&h=100&fit=crop&crop=center',
        contactPhone: '+254-732-888-000',
        contactEmail: 'info@coopbank.co.ke',
        websiteUrl: 'https://coopbank.co.ke',
        isActive: true,
      },
      {
        bankName: 'Standard Chartered Kenya',
        bankCode: 'SCB004',
        logoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
        contactPhone: '+254-329-3900',
        contactEmail: 'info@standardchartered.co.ke',
        websiteUrl: 'https://standardchartered.co.ke',
        isActive: true,
      },
      {
        bankName: 'NCBA Bank Kenya',
        bankCode: 'NCBA005',
        logoUrl: 'https://images.unsplash.com/photo-1592495981488-073814773fd4?w=100&h=100&fit=crop&crop=center',
        contactPhone: '+254-711-056-000',
        contactEmail: 'info@ncbagroup.com',
        websiteUrl: 'https://ncbagroup.com',
        isActive: true,
      }
    ];

    const insertedBanks = await db.insert(bankPartners).values(bankData).returning();
    console.log(`Inserted ${insertedBanks.length} bank partners`);

    // Insert loan products for each bank
    const loanProductsData = [];

    // KCB Products
    loanProductsData.push(
      {
        bankId: insertedBanks[0].id,
        productName: 'KCB Auto Loan',
        productType: 'vehicle_loan',
        minLoanAmount: '200000',
        maxLoanAmount: '20000000',
        minInterestRate: '12.5',
        maxInterestRate: '18.5',
        minTenureMonths: 12,
        maxTenureMonths: 84,
        maxFinancingPercentage: '0.90',
        minDownPaymentPercentage: '0.10',
        processingFeeRate: '0.02',
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
          'National ID copy',
          'KRA PIN certificate',
          'Salary certificate/payslips (3 months)',
          'Bank statements (6 months)',
          'Vehicle proforma invoice'
        ],
        features: [
          'Up to 90% financing',
          'Flexible repayment terms',
          'Competitive interest rates',
          'Quick approval process'
        ],
        isActive: true,
      },
      {
        bankId: insertedBanks[0].id,
        productName: 'KCB Quick Auto',
        productType: 'vehicle_loan',
        minLoanAmount: '100000',
        maxLoanAmount: '5000000',
        minInterestRate: '14.0',
        maxInterestRate: '20.0',
        minTenureMonths: 6,
        maxTenureMonths: 60,
        maxFinancingPercentage: '0.85',
        minDownPaymentPercentage: '0.15',
        processingFeeRate: '0.015',
        insuranceRequired: true,
        guarantorRequired: true,
        minMonthlyIncome: '30000',
        maxAge: 60,
        eligibilityCriteria: [
          'Quick approval in 48 hours',
          'Existing KCB customer preferred',
          'Regular income for 3 months'
        ],
        requiredDocuments: [
          'National ID',
          'Payslips (2 months)',
          'Bank statements (3 months)'
        ],
        features: [
          'Fast approval',
          'Minimal documentation',
          'SMS updates'
        ],
        isActive: true,
      }
    );

    // Equity Bank Products
    loanProductsData.push(
      {
        bankId: insertedBanks[1].id,
        productName: 'Equity Auto Loan',
        productType: 'vehicle_loan',
        minLoanAmount: '300000',
        maxLoanAmount: '15000000',
        minInterestRate: '13.0',
        maxInterestRate: '17.5',
        minTenureMonths: 24,
        maxTenureMonths: 72,
        maxFinancingPercentage: '0.85',
        minDownPaymentPercentage: '0.15',
        processingFeeRate: '0.02',
        insuranceRequired: true,
        guarantorRequired: false,
        minMonthlyIncome: '60000',
        maxAge: 65,
        eligibilityCriteria: [
          'Minimum 2 years employment',
          'Clean CRB report',
          'Equity Bank account holder'
        ],
        requiredDocuments: [
          'ID and KRA PIN',
          'Employment letter',
          'Payslips (6 months)',
          'Bank statements'
        ],
        features: [
          'No guarantor required',
          'Insurance premium financing',
          'Grace period options'
        ],
        isActive: true,
      }
    );

    // Co-operative Bank Products
    loanProductsData.push(
      {
        bankId: insertedBanks[2].id,
        productName: 'Coop Auto Advance',
        productType: 'vehicle_loan',
        minLoanAmount: '250000',
        maxLoanAmount: '25000000',
        minInterestRate: '11.5',
        maxInterestRate: '16.5',
        minTenureMonths: 12,
        maxTenureMonths: 84,
        maxFinancingPercentage: '0.90',
        minDownPaymentPercentage: '0.10',
        processingFeeRate: '0.015',
        insuranceRequired: true,
        guarantorRequired: false,
        minMonthlyIncome: '40000',
        maxAge: 65,
        eligibilityCriteria: [
          'Sacco member or Coop customer',
          'Stable income for 6 months',
          'Good credit score'
        ],
        requiredDocuments: [
          'Membership documents',
          'Income proof',
          'Vehicle quotation'
        ],
        features: [
          'Member discounts',
          'Flexible terms',
          'Low processing fees'
        ],
        isActive: true,
      }
    );

    // Standard Chartered Products
    loanProductsData.push(
      {
        bankId: insertedBanks[3].id,
        productName: 'Standard Auto Finance',
        productType: 'vehicle_loan',
        minLoanAmount: '500000',
        maxLoanAmount: '30000000',
        minInterestRate: '12.0',
        maxInterestRate: '18.0',
        minTenureMonths: 24,
        maxTenureMonths: 84,
        maxFinancingPercentage: '0.85',
        minDownPaymentPercentage: '0.15',
        processingFeeRate: '0.025',
        insuranceRequired: true,
        guarantorRequired: false,
        minMonthlyIncome: '80000',
        maxAge: 65,
        eligibilityCriteria: [
          'Premium banking customer',
          'Minimum net income KES 80,000',
          'Clean credit history'
        ],
        requiredDocuments: [
          'Enhanced due diligence documents',
          'Comprehensive income proof',
          'Asset verification'
        ],
        features: [
          'Premium service',
          'Relationship manager',
          'Exclusive rates'
        ],
        isActive: true,
      }
    );

    // NCBA Bank Products
    loanProductsData.push(
      {
        bankId: insertedBanks[4].id,
        productName: 'NCBA Vehicle Finance',
        productType: 'vehicle_loan',
        minLoanAmount: '200000',
        maxLoanAmount: '10000000',
        minInterestRate: '13.5',
        maxInterestRate: '19.0',
        minTenureMonths: 12,
        maxTenureMonths: 60,
        maxFinancingPercentage: '0.80',
        minDownPaymentPercentage: '0.20',
        processingFeeRate: '0.02',
        insuranceRequired: true,
        guarantorRequired: true,
        minMonthlyIncome: '45000',
        maxAge: 60,
        eligibilityCriteria: [
          'NCBA customer for 6 months',
          'Regular salary deposits',
          'Satisfactory credit history'
        ],
        requiredDocuments: [
          'Customer documents',
          'Employment verification',
          'Guarantor documents'
        ],
        features: [
          'Customer loyalty benefits',
          'Flexible repayment',
          'Holiday options'
        ],
        isActive: true,
      }
    );

    const insertedProducts = await db.insert(loanProducts).values(loanProductsData).returning();
    console.log(`Inserted ${insertedProducts.length} loan products`);

    console.log('Financial services data populated successfully!');
  } catch (error) {
    console.error('Error populating financial data:', error);
    throw error;
  }
}

// Run the population script
populateFinancialData()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

export default populateFinancialData;