describe("View character info", () => {
  it("Displays a list of that character's films", () => {
    cy.visit('http://localhost:3000/')
    cy.get('.character-container')
      .should('not.be.empty')
      .get('[data-testid=character-card]')
      .first()
      .click()
      .get('.film-list')
  })
})
