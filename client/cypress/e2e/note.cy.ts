describe('Note taking app', () => {

  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('should login successfully and perform note actions', () => {
    cy.fixture('data.json').then((data) => {
      // Login
      cy.get('input[name=email]').type(data.email);
      cy.get('input[name=password]').type(data.password);
      cy.get('button[type=submit]').click();

      // Check if logged in
      cy.location('pathname').should('eq', '/');

      // Create note
      cy.get('textarea').type(data.content);
      cy.get('input[type=text]').type(data.title);
      cy.contains('Create Note').click();

      // Check if note is created
      cy.contains(data.title).should('exist');

      // Edit note
      cy.contains(data.title).click();
      cy.get('[data-testid=note-details-textarea]').clear().type(data.updatedContent);
      cy.get('[data-testid=note-details-input]').clear().type(data.updatedTitle);
      cy.contains('Save').click();

      // Check if note is updated
      cy.contains(data.updatedTitle).should('exist');

      // Delete note
      cy.contains(data.updatedTitle).click();
      cy.contains('Delete').click();

      // Check if note is deleted
      cy.contains(data.updatedTitle).should('not.exist');
    });
  });
  
});
