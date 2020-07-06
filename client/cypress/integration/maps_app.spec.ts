import users from '../../testProps/users.json';

describe('Maps ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/testing/user', { ...users[0] });
    cy.visit('http://localhost:3000');
  })

  it('are loaded', function() {
    cy.visit('http://localhost:3000/maps');
    cy.contains('No maps were found.');
  });

  it('loads maps', function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
  });
});

export {};
