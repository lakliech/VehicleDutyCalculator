
describe('Performance Tests', () => {
  it('should load homepage within acceptable time', () => {
    const start = Date.now()
    
    cy.visit('/')
    cy.contains('Your Complete Automotive Hub').should('be.visible')
    
    const loadTime = Date.now() - start
    expect(loadTime).to.be.lessThan(5000) // 5 seconds max
  })

  it('should load vehicle listings efficiently', () => {
    cy.visit('/buy-a-car')
    
    // Measure time to load listings
    cy.intercept('GET', '/api/car-listings*').as('getListings')
    cy.reload()
    
    cy.wait('@getListings').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200)
      // Response should be under 2 seconds
      expect(interception.response?.duration).to.be.lessThan(2000)
    })
  })

  it('should handle concurrent duty calculations', () => {
    const calculations = Array.from({ length: 5 }, (_, i) => {
      return cy.request({
        method: 'POST',
        url: '/api/calculate-duty',
        body: {
          vehicleCategory: 'under1500cc',
          vehicleValue: 800000 + (i * 100000),
          engineSize: 1300,
          vehicleAge: 5,
          isDirectImport: true,
          fuelType: 'petrol'
        }
      })
    })

    // All calculations should complete successfully
    Promise.all(calculations).then((responses) => {
      responses.forEach((response) => {
        expect(response.status).to.equal(200)
      })
    })
  })

  it('should maintain performance with large datasets', () => {
    // Test with many filters applied
    cy.visit('/buy-a-car')
    
    cy.get('[data-testid="filter-make"]').click()
    cy.contains('Toyota').click()
    
    cy.get('[data-testid="filter-year-min"]').type('2015')
    cy.get('[data-testid="filter-year-max"]').type('2020')
    
    cy.get('[data-testid="filter-price-min"]').type('500000')
    cy.get('[data-testid="filter-price-max"]').type('2000000')
    
    cy.get('[data-testid="apply-filters"]').click()
    
    // Results should load within reasonable time
    cy.get('[data-testid="vehicle-listing"]', { timeout: 3000 }).should('be.visible')
  })
})
