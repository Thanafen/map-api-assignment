describe('Click Marker', () => {
  it('Click on a marker on the map', () => {
    // Visit the application
    cy.visit('http://localhost:3000/');

    // Ensure that the map loads
    cy.get('.mapboxgl-map').should('exist');

    // Wait for the markers to load
    cy.get('.icon').should('exist').then(($markers) => {
      // Click on the first marker using force option
      cy.wrap($markers[0]).click({ force: true });

      // Check if the popup appears
      cy.get(".card").within(() => {
        // Assert that the title, review, rating, and information are displayed
        cy.contains("Place").should("exist");
        cy.contains("Review").should("exist");
        cy.contains("Rating").should("exist");
        cy.contains("Information").should("exist");
      });
    });
  });
});
