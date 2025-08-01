
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      loginAsAdmin(): Chainable<void>
      fillListingForm(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      email,
      password
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.success).to.be.true
  })
})

Cypress.Commands.add('loginAsAdmin', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      email: 'admin@gariyangu.co.ke',
      password: 'AdminPassword123!'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.success).to.be.true
  })
})

Cypress.Commands.add('fillListingForm', () => {
  cy.get('input[name="title"]').type('2019 Toyota Vitz - Excellent Condition')
  cy.get('select[name="make"]').select('Toyota')
  cy.get('select[name="model"]').select('Vitz')
  cy.get('input[name="year"]').type('2019')
  cy.get('input[name="price"]').type('1200000')
  cy.get('input[name="mileage"]').type('45000')
  cy.get('select[name="fuelType"]').select('petrol')
  cy.get('select[name="transmission"]').select('automatic')
  cy.get('textarea[name="description"]').type('Well maintained vehicle')
  cy.get('input[name="phoneNumber"]').type('0712345678')
  cy.get('input[name="location"]').type('Nairobi')
})

export {}
