describe('createPinTest', () => {
  it('user can create a pin successfully', () => {
    cy.visit('http://localhost:3000/')
    //Check that the login button exists
    cy.get(".button.login").should("exist");
    // Click on the login button
    cy.get(".button.login").click();
    //fill the form
    cy.get('input[type="text"]').type("TestUser");
    cy.get('input[type="password"]').type("password123"); 
    // Submit the form
    cy.get(".login_btn").click();
    // Make sure that the login success toast message appears
    cy.contains('Login Successfully!').should('exist');
    //Make sure that the logout button appears
    cy.get(".button.logout").should("exist");

    cy.get('.mapboxgl-map').dblclick(40.4168, 3.7038); // Double-click on the map
    cy.get('input[placeholder="Enter a title..."]').type('New place'); // Enter pin title
    cy.get('textarea[placeholder="Say something about this place..."]').type('Amazing place'); // Enter pin description
    cy.get('select').select('5'); // Select pin rating
    cy.get('.submitButton').click(); // Click submit button
    cy.contains('Added pin!').should('exist'); // Ensure pin add success message
  })
})