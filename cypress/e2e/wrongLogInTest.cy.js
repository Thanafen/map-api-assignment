describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    //Check that the login button exists
    cy.get(".button.login").should("exist");
    // Click on the login button
    cy.get(".button.login").click();
    //fill the form
    cy.get('input[type="text"]').type("NotRealUser");
    cy.get('input[type="password"]').type("badPassword"); 
    // Submit the form
    cy.get(".login_btn").click();
    // Make sure that the login failed toast message appears
    cy.contains('Login Failed!').should('exist');
    //Make sure that the logout option isn't available in order to see
    //that the user os not signed in
    cy.get(".button.logout").should('not.exist');

  })
})