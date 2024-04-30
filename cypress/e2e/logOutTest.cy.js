describe("template spec", () => {
  it("check that the user can successfully log out", () => {
    cy.visit("http://localhost:3000/");
    //Check that the login button exists because the user must log in before logout
    cy.get(".button.login").should("exist");
    // Click on the login button
    cy.get(".button.login").click();
    //fill the form
    cy.get('input[type="text"]').type("TestUser");
    cy.get('input[type="password"]').type("password123");
    // Submit the form
    cy.get(".login_btn").click();

    // Make sure that the login success toast message appears
    cy.contains("Login Successfully!").should("exist");
    //Make sure that the logout button appears
    cy.get(".button.logout").should("exist");
    cy.get(".button.logout").click();
    cy.contains("Logout from TestUser").should("exist");
  });
});
