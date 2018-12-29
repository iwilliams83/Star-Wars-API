describe("View character info", () => {
  it("Displays a list of that character's films", () => {
    cy.visit("http://localhost:3000/")
    cy.get(".character-container")
      .should("not.be.empty")
      //get the first character card element
      .get("[data-testid=character-card]")
      .first()
      .click()
      //wait for the data to be loaded onto the state
      .wait(500)
      .get("[data-testid=list-header]")
      //check to see if the list header contains the character's name
      .should("contain", "Luke Skywalker")
      //make sure film info element is not empty
      .get("[data-testid=film-info]")
      .first()
      .should("not.be.empty")
  })
})
