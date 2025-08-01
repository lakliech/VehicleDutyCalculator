
describe('User Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should register new user', () => {
    cy.get('[data-testid="auth-button"]').click()
    cy.contains('Register').click()
    
    // Fill registration form
    cy.get('input[name="firstName"]').type('Test')
    cy.get('input[name="lastName"]').type('User')
    cy.get('input[name="email"]').type('testuser@example.com')
    cy.get('input[name="phoneNumber"]').type('0712345678')
    cy.get('input[name="password"]').type('TestPassword123!')
    cy.get('input[name="confirmPassword"]').type('TestPassword123!')
    
    cy.get('button[type="submit"]').click()
    
    cy.contains('Registration successful').should('be.visible')
  })

  it('should login existing user', () => {
    cy.get('[data-testid="auth-button"]').click()
    cy.contains('Login').click()
    
    cy.get('input[name="email"]').type('testuser@example.com')
    cy.get('input[name="password"]').type('TestPassword123!')
    
    cy.get('button[type="submit"]').click()
    
    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome back').should('be.visible')
  })

  it('should handle Google OAuth login', () => {
    cy.get('[data-testid="auth-button"]').click()
    cy.contains('Continue with Google').click()
    
    // This would redirect to Google OAuth
    cy.url().should('include', 'google')
  })

  it('should handle password reset', () => {
    cy.get('[data-testid="auth-button"]').click()
    cy.contains('Forgot Password').click()
    
    cy.get('input[name="email"]').type('testuser@example.com')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Password reset instructions sent').should('be.visible')
  })

  it('should logout user', () => {
    // Login first
    cy.login('testuser@example.com', 'TestPassword123!')
    
    cy.get('[data-testid="user-menu"]').click()
    cy.contains('Logout').click()
    
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('[data-testid="auth-button"]').should('be.visible')
  })
})
