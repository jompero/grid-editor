describe('Main page ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  })

  it('displays title', function() {
    cy.contains('Grid Editor');
  });

  it('shows save as unavailable when not logged in', function() {
    cy.get('#save-button').should('be.disabled');
  });
});

export {};
