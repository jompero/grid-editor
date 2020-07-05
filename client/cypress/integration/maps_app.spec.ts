describe('Maps ', function() {
  beforeEach(function() {
    const user = {
      name: 'testingUser1',
      email: 'test@email.com',
      profileId: 'profileId1234',
      username: 'asdasd'
    }

    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/testing/user', { ...user });
    cy.visit('http://localhost:3000');
  })

  it('are loaded', function() {
    cy.visit('http://localhost:3000/maps');
    cy.contains('No maps were found.');
  })
})

export {};
