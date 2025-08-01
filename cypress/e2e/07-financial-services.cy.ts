
describe('Financial Services Tests', () => {
  beforeEach(() => {
    cy.visit('/vehicle-loans')
  })

  it('should display loan products', () => {
    cy.contains('Vehicle Financing').should('be.visible')
    cy.get('[data-testid="loan-product"]').should('have.length.greaterThan', 0)
    
    // Check loan product details
    cy.get('[data-testid="loan-product"]').first().within(() => {
      cy.contains('KCB Bank').should('be.visible')
      cy.contains('Interest Rate').should('be.visible')
      cy.contains('Apply Now').should('be.visible')
    })
  })

  it('should calculate loan payments', () => {
    cy.visit('/loan-pre-approval')
    
    cy.get('input[name="vehiclePrice"]').type('2000000')
    cy.get('input[name="downPayment"]').type('400000')
    cy.get('select[name="tenureMonths"]').select('60')
    cy.get('input[name="interestRate"]').type('14.5')
    
    cy.get('button').contains('Calculate').click()
    
    cy.contains('Monthly Payment').should('be.visible')
    cy.get('[data-testid="monthly-payment"]').should('contain', 'KES')
  })

  it('should submit loan application', () => {
    cy.login('testuser@example.com', 'TestPassword123!')
    cy.visit('/loan-application/1/1') // carId=1, productId=1
    
    // Fill application form
    cy.get('input[name="applicantName"]').type('Test Applicant')
    cy.get('input[name="nationalId"]').type('12345678')
    cy.get('input[name="monthlyIncome"]').type('150000')
    cy.get('input[name="requestedAmount"]').type('1500000')
    
    cy.get('button[type="submit"]').click()
    
    cy.contains('Application submitted').should('be.visible')
  })

  it('should evaluate trade-in value', () => {
    cy.visit('/trade-in-calculator')
    
    cy.get('select[name="make"]').select('Toyota')
    cy.get('select[name="model"]').select('Camry')
    cy.get('input[name="year"]').type('2015')
    cy.get('input[name="mileage"]').type('80000')
    cy.get('select[name="condition"]').select('good')
    
    cy.get('button').contains('Get Valuation').click()
    
    cy.contains('Trade-in Value').should('be.visible')
    cy.get('[data-testid="trade-in-value"]').should('contain', 'KES')
  })
})
