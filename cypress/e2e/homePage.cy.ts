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

  it("filters listings correctly", () => {
    cy.get('[data-testid="listing-filters"] input[name="search"]').type("Paris")
    cy.get('[data-testid="listing-filters-submit"]').click()

    const expectedListingsCount = 6
    cy.get('[data-testid="listing-list"] > *').should("have.length", expectedListingsCount)

    // increment the guest filter to 16
    for (let i = 0; i < 16; i++) {
      cy.get('[data-testid="stepper-increment"]').click()
    }
    cy.get('[data-testid="listing-filters-submit"]').click()

    cy.get('[data-testid="listing-list"] > *').should("have.length", 1)
  })

  it("handles no listings scenario", () => {
    cy.get('[data-testid="listing-filters"] input[name="search"]').type("Parininos")
    cy.get('[data-testid="listing-filters-submit"]').click()

    cy.get('[data-testid="listing-list"] > *').should("have.length", 0)
    cy.contains("No listings found").should("be.visible")
  })
});