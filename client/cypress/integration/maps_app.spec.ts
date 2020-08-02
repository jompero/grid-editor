import users from '../../testProps/users.json'; // eslint-disable-line import/extensions
import maps from '../../testProps/maps.json'; // eslint-disable-line import/extensions

describe('when maps page is loaded', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/testing/user', users[0]);
    cy.request('POST', 'http://localhost:3001/api/testing/user', users[1]);
    cy.visit('http://localhost:3000');
  });
  
  describe('and no maps are found', () => {
    it('a message is displayed', () => {
      cy.visit('http://localhost:3000/maps');
      cy.contains('No maps were found.');
    });
  });
  
  describe('and maps are found', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3001/api/testing/maps', maps[0]);
      cy.request('POST', 'http://localhost:3001/api/testing/maps', maps[1]);
      cy.visit('http://localhost:3000/maps');
    });
  
    it('all maps are loaded', () => {
      cy.contains(maps[0].name);
      cy.contains(maps[1].name);
    });
  
    it('filter contains an option for each user', () => {
      cy.contains('Filter by user').parent().click();
  
      cy.get('.MuiList-root').children().should('have.length', 2);
      
      cy.contains(maps[0].user.name);
      cy.contains(maps[1].user.name);
    });
  })
})
