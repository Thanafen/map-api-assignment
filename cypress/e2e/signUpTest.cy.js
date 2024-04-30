describe("account actions", () => {
  it("user can register, login and logout successfully", () => {
    //access the page
    cy.visit("http://localhost:3000/");
    // Check if the register button exists
    cy.get(".button.register").should("exist");

    // Click on the register button
    cy.get(".button.register").click();
    //fill the form
    cy.get('input[type="text"]').type("TestUser");
    cy.get('input[type="email"]').type("test@example.com"); 
    cy.get('input[type="password"]').type("password123"); 
    // Submit the form
    cy.get(".register_btn").click();
    // Make sure that the register success toast message appears
    cy.contains('Registered Successfully!').should('exist');
  });
});
