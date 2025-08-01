
describe('Duty Calculator Tests', () => {
  beforeEach(() => {
    cy.visit('/duty-calculator')
  })

  it('should calculate duty for under 1500cc vehicle', () => {
    // Select vehicle category
    cy.get('[data-testid="vehicle-category-under1500cc"]').click()
    
    // Enter vehicle value
    cy.get('input[name="vehicleValue"]').type('800000')
    
    // Enter engine size
    cy.get('input[name="engineSize"]').type('1300')
    
    // Enter vehicle age
    cy.get('input[name="vehicleAge"]').type('5')
    
    // Select direct import
    cy.get('input[name="isDirectImport"][value="true"]').check()
    
    // Select fuel type
    cy.get('select[name="fuelType"]').select('petrol')
    
    // Submit calculation
    cy.get('button[type="submit"]').click()
    
    // Verify results appear
    cy.contains('Calculation Results').should('be.visible')
    cy.contains('Total Taxes Payable').should('be.visible')
    cy.get('[data-testid="total-taxes"]').should('contain', 'KES')
  })

  it('should calculate duty for electric vehicle', () => {
    cy.get('[data-testid="vehicle-category-electric"]').click()
    cy.get('input[name="vehicleValue"]').type('2000000')
    cy.get('input[name="engineSize"]').type('0')
    cy.get('input[name="vehicleAge"]').type('2')
    cy.get('input[name="isDirectImport"][value="true"]').check()
    cy.get('select[name="fuelType"]').select('electric')
    
    cy.get('button[type="submit"]').click()
    
    cy.contains('Electric Vehicle Tax Incentive').should('be.visible')
    cy.get('[data-testid="total-taxes"]').should('be.visible')
  })

  it('should show vehicle selection for reference pricing', () => {
    cy.get('[data-testid="vehicle-category-under1500cc"]').click()
    
    // Should show vehicle selector
    cy.get('[data-testid="vehicle-selector"]').should('be.visible')
    
    // Search for a vehicle
    cy.get('input[placeholder*="Search"]').type('Toyota')
    cy.contains('Toyota').should('be.visible')
  })

  it('should validate form inputs', () => {
    // Try to submit without required fields
    cy.get('button[type="submit"]').click()
    
    // Should show validation errors
    cy.contains('Vehicle category is required').should('be.visible')
  })

  it('should export calculation as PDF', () => {
    // Complete a calculation first
    cy.get('[data-testid="vehicle-category-under1500cc"]').click()
    cy.get('input[name="vehicleValue"]').type('1000000')
    cy.get('input[name="engineSize"]').type('1500')
    cy.get('input[name="vehicleAge"]').type('3')
    cy.get('input[name="isDirectImport"][value="true"]').check()
    cy.get('button[type="submit"]').click()
    
    // Export PDF
    cy.contains('Export PDF').click()
    
    // Verify download initiated
    cy.readFile('cypress/downloads').should('exist')
  })
})
