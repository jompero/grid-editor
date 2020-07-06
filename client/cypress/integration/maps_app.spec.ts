import users from '../../testProps/users.json';
import maps from '../../testProps/maps.json';

describe('Maps ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/testing/user', users[0]);
    cy.visit('http://localhost:3000');
  })

  it('displays message when maps are not found', function() {
    cy.visit('http://localhost:3000/maps');
    cy.contains('No maps were found.');
  });

  it('loads maps correctly', function() {
    cy.request('POST', 'http://localhost:3001/api/testing/maps', maps[0]);
    cy.request('POST', 'http://localhost:3001/api/testing/maps', maps[1]);
    cy.visit('http://localhost:3000/maps');
    cy.contains(maps[0].name);
    cy.contains(maps[1].name);
  });
});

export {};
