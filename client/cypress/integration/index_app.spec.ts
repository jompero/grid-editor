describe('Main page ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays title', () => {
    cy.contains('Grid Editor');
  });

  it('shows save as unavailable when not logged in', () => {
    cy.get('#save-button').should('be.disabled');
  });
});

export {};
