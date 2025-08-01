
describe('Admin Functions Tests', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    cy.visit('/admin')
  })

  it('should display admin dashboard', () => {
    cy.contains('Admin Dashboard').should('be.visible')
    cy.contains('Total Users').should('be.visible')
    cy.contains('Total Listings').should('be.visible')
    cy.contains('Pending Approvals').should('be.visible')
  })

  it('should manage vehicle listings', () => {
    cy.visit('/admin/listings')
    
    // View listings
    cy.get('[data-testid="admin-listing"]').should('have.length.greaterThan', 0)
    
    // Approve a listing
    cy.get('[data-testid="approve-listing"]').first().click()
    cy.get('textarea[name="notes"]').type('Listing approved - meets all requirements')
    cy.get('button').contains('Approve').click()
    
    cy.contains('Listing approved successfully').should('be.visible')
  })

  it('should manage users', () => {
    cy.visit('/admin/users')
    
    // View users
    cy.get('[data-testid="user-row"]').should('have.length.greaterThan', 0)
    
    // Edit user role
    cy.get('[data-testid="edit-user"]').first().click()
    cy.get('select[name="roleId"]').select('2') // Editor role
    cy.get('button').contains('Update Role').click()
    
    cy.contains('User role updated').should('be.visible')
  })

  it('should view analytics', () => {
    cy.visit('/admin/analytics')
    
    cy.contains('Platform Analytics').should('be.visible')
    cy.get('[data-testid="analytics-chart"]').should('be.visible')
    cy.contains('User Growth').should('be.visible')
    cy.contains('Listing Performance').should('be.visible')
  })

  it('should manage advertisements', () => {
    cy.visit('/admin/advertisements')
    
    // Create new advertisement
    cy.contains('Create Ad').click()
    cy.get('input[name="advertiserName"]').type('Test Advertiser')
    cy.get('input[name="adTitle"]').type('Test Advertisement')
    cy.get('input[name="adTargetUrl"]').type('https://example.com')
    cy.get('input[name="totalBudget"]').type('50000')
    
    cy.get('button[type="submit"]').click()
    
    cy.contains('Advertisement created').should('be.visible')
  })
})
