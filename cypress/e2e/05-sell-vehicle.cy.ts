
describe('Sell Vehicle Tests', () => {
  beforeEach(() => {
    cy.login('testuser@example.com', 'TestPassword123!')
    cy.visit('/sell-my-car')
  })

  it('should create new vehicle listing', () => {
    cy.contains('List Your Vehicle').should('be.visible')
    
    // Basic details
    cy.get('input[name="title"]').type('2019 Toyota Vitz - Excellent Condition')
    cy.get('select[name="make"]').select('Toyota')
    cy.get('select[name="model"]').select('Vitz')
    cy.get('input[name="year"]').type('2019')
    cy.get('input[name="price"]').type('1200000')
    
    // Vehicle details
    cy.get('input[name="mileage"]').type('45000')
    cy.get('select[name="fuelType"]').select('petrol')
    cy.get('select[name="transmission"]').select('automatic')
    cy.get('select[name="bodyType"]').select('hatchback')
    cy.get('select[name="condition"]').select('excellent')
    
    // Description
    cy.get('textarea[name="description"]').type('Well maintained vehicle with full service history. Single owner, non-smoking car.')
    
    // Contact details
    cy.get('input[name="phoneNumber"]').type('0712345678')
    cy.get('input[name="location"]').type('Nairobi')
    
    // Submit listing
    cy.get('button[type="submit"]').click()
    
    cy.contains('Listing created successfully').should('be.visible')
    cy.url().should('include', '/my-listings')
  })

  it('should upload vehicle images', () => {
    // Start creating listing
    cy.get('input[name="title"]').type('Test Vehicle Listing')
    
    // Upload images
    cy.get('input[type="file"]').selectFile([
      'cypress/fixtures/car-front.jpg',
      'cypress/fixtures/car-side.jpg'
    ], { force: true })
    
    // Verify images uploaded
    cy.get('[data-testid="uploaded-image"]').should('have.length', 2)
  })

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click()
    
    cy.contains('Title is required').should('be.visible')
    cy.contains('Make is required').should('be.visible')
    cy.contains('Price is required').should('be.visible')
  })

  it('should preview listing before submission', () => {
    // Fill basic details
    cy.fillListingForm()
    
    cy.contains('Preview Listing').click()
    
    cy.get('[data-testid="listing-preview"]').should('be.visible')
    cy.contains('2019 Toyota Vitz').should('be.visible')
    cy.contains('KES 1,200,000').should('be.visible')
  })
})
