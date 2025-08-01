
describe('Vehicle Marketplace Tests', () => {
  beforeEach(() => {
    cy.visit('/buy-a-car')
  })

  it('should load and display vehicle listings', () => {
    cy.contains('Find Your Perfect Car').should('be.visible')
    
    // Wait for listings to load
    cy.get('[data-testid="vehicle-listing"]').should('have.length.greaterThan', 0)
    
    // Check listing components
    cy.get('[data-testid="vehicle-listing"]').first().within(() => {
      cy.get('img').should('be.visible')
      cy.contains('KES').should('be.visible')
      cy.get('[data-testid="vehicle-make"]').should('be.visible')
      cy.get('[data-testid="vehicle-model"]').should('be.visible')
    })
  })

  it('should filter vehicles by make', () => {
    // Open make filter
    cy.get('[data-testid="filter-make"]').click()
    cy.contains('Toyota').click()
    
    // Verify filter applied
    cy.url().should('include', 'make=Toyota')
    
    // All displayed vehicles should be Toyota
    cy.get('[data-testid="vehicle-make"]').each(($el) => {
      cy.wrap($el).should('contain', 'Toyota')
    })
  })

  it('should filter by price range', () => {
    cy.get('[data-testid="filter-price-min"]').type('500000')
    cy.get('[data-testid="filter-price-max"]').type('2000000')
    cy.get('[data-testid="apply-filters"]').click()
    
    // Verify price filter in URL
    cy.url().should('include', 'minPrice=500000')
    cy.url().should('include', 'maxPrice=2000000')
  })

  it('should view vehicle details', () => {
    cy.get('[data-testid="vehicle-listing"]').first().click()
    
    // Should navigate to vehicle details page
    cy.url().should('include', '/car/')
    cy.contains('Vehicle Details').should('be.visible')
    cy.contains('Contact Seller').should('be.visible')
  })

  it('should contact seller', () => {
    // Navigate to vehicle details
    cy.get('[data-testid="vehicle-listing"]').first().click()
    
    // Click contact seller
    cy.contains('Contact Seller').click()
    
    // Fill inquiry form
    cy.get('input[name="buyerName"]').type('Test Buyer')
    cy.get('input[name="buyerPhone"]').type('0712345678')
    cy.get('input[name="buyerEmail"]').type('test@example.com')
    cy.get('textarea[name="message"]').type('Interested in this vehicle')
    
    cy.get('button[type="submit"]').click()
    
    cy.contains('Inquiry sent successfully').should('be.visible')
  })

  it('should save vehicle to favorites', () => {
    // Need to be logged in first
    cy.visit('/') // Go back to login
    // Login process would go here
    
    cy.visit('/buy-a-car')
    cy.get('[data-testid="favorite-button"]').first().click()
    
    cy.contains('Added to favorites').should('be.visible')
  })
})
