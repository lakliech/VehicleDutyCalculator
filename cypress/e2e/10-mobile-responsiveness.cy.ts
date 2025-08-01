
describe('Mobile Responsiveness Tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should display mobile navigation correctly', () => {
    cy.visit('/')
    
    // Mobile menu should be visible
    cy.get('[data-testid="mobile-menu-trigger"]').should('be.visible')
    cy.get('[data-testid="mobile-menu-trigger"]').click()
    
    // Navigation items should be visible in mobile menu
    cy.contains('Buy Cars').should('be.visible')
    cy.contains('Sell Car').should('be.visible')
    cy.contains('Calculators').should('be.visible')
  })

  it('should work on tablet viewport', () => {
    cy.viewport('ipad-2')
    cy.visit('/buy-a-car')
    
    // Listings should be responsive
    cy.get('[data-testid="vehicle-listing"]').should('be.visible')
    
    // Filters should be accessible
    cy.get('[data-testid="filter-panel"]').should('be.visible')
  })

  it('should handle touch interactions', () => {
    cy.visit('/buy-a-car')
    
    // Swipe through vehicle images
    cy.get('[data-testid="vehicle-image"]').first()
      .trigger('touchstart', { touches: [{ clientX: 100, clientY: 100 }] })
      .trigger('touchmove', { touches: [{ clientX: 50, clientY: 100 }] })
      .trigger('touchend')
  })

  it('should optimize forms for mobile', () => {
    cy.visit('/duty-calculator')
    
    // Form inputs should be appropriately sized
    cy.get('input[name="vehicleValue"]').should('have.css', 'min-height')
    
    // Submit button should be easily tappable
    cy.get('button[type="submit"]').should('have.css', 'min-height')
  })
})
