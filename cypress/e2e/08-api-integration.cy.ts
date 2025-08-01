
describe('API Integration Tests', () => {
  const apiBaseUrl = Cypress.env('API_BASE_URL')

  it('should authenticate user via API', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/auth/login`,
      body: {
        email: 'testuser@example.com',
        password: 'TestPassword123!'
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.success).to.be.true
      expect(response.body.user).to.have.property('email')
    })
  })

  it('should fetch vehicle listings via API', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/car-listings`,
      qs: {
        page: 1,
        limit: 20
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('cars')
      expect(response.body.cars).to.be.an('array')
    })
  })

  it('should calculate duty via API', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/calculate-duty`,
      body: {
        vehicleCategory: 'under1500cc',
        vehicleValue: 800000,
        engineSize: 1300,
        vehicleAge: 5,
        isDirectImport: true,
        fuelType: 'petrol'
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('totalTaxes')
      expect(response.body).to.have.property('customsValue')
    })
  })

  it('should create vehicle listing via API', () => {
    // Login first to get session
    cy.login('testuser@example.com', 'TestPassword123!')

    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/listings`,
      body: {
        title: 'API Test Vehicle',
        make: 'Toyota',
        model: 'Vitz',
        year: 2019,
        price: 1200000,
        description: 'Test vehicle created via API',
        phoneNumber: '0712345678',
        location: 'Nairobi'
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id')
    })
  })

  it('should handle API errors gracefully', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/calculate-duty`,
      body: {
        // Invalid data
        vehicleCategory: 'invalid',
        vehicleValue: -1000
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.have.property('error')
    })
  })
})
