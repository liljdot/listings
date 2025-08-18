describe('Home Page', () => {
  beforeEach(() => {
    cy.session("user", () => {
      cy.login("jehu@demo.io", "password")
    })

    cy.visit("http://localhost:5173/") // visit the homepage
  }) // login and save session before  each test

  it('renders homepage with expected elements', () => {
    cy.get('[data-testid="homepage"]').should("exist")
    cy.get('[data-testid="listing-filters"]').should("exist")
    cy.get('[data-testid="listing-list"]').should("exist")
  })

  it("displays the correct number of listings", () => {
    const expectedListingsCount = 12
    cy.get('[data-testid="listing-list"] > *').should("have.length", expectedListingsCount)
  })
});