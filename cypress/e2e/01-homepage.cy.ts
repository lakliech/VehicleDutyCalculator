
describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load homepage with all key elements', () => {
    // Check main hero section
    cy.contains('Your Complete Automotive Hub').should('be.visible')
    cy.contains("Kenya's #1 Car Platform").should('be.visible')
    
    // Check featured tools
    cy.get('[data-testid="featured-tools"]').should('be.visible')
    cy.contains('Find Cars').should('be.visible')
    cy.contains('Sell Vehicle').should('be.visible')
    cy.contains('Import Duty').should('be.visible')
    cy.contains('AI Advisor').should('be.visible')
    
    // Check professional tools
    cy.get('[data-testid="professional-tools"]').should('be.visible')
    cy.contains('Import Calculator').should('be.visible')
    cy.contains('Vehicle Valuation').should('be.visible')
    
    // Check stats section
    cy.contains('3,500+').should('be.visible')
    cy.contains('Vehicles Listed').should('be.visible')
  })

  it('should navigate to duty calculator', () => {
    cy.contains('Import Duty').click()
    cy.url().should('include', '/duty-calculator')
    cy.contains('Vehicle Information').should('be.visible')
  })

  it('should perform smart search', () => {
    const searchQuery = 'Toyota Vitz under 1M'
    
    cy.get('input[placeholder*="Toyota Vitz under 1M"]').type(searchQuery)
    cy.get('button').contains('Search').click()
    
    // Should redirect to buy-a-car with filters
    cy.url().should('include', '/buy-a-car')
  })

  it('should display contact information', () => {
    cy.contains('0736 272719').should('be.visible')
    cy.contains('Professional Vehicle Import Services').should('be.visible')
  })
})
