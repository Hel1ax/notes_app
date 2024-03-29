describe('Redirect', () => {

    it('should redirect to home page after successful login', () => {
        cy.visit('/sign-in');
        cy.fixture('data.json').then((data) => {

            // Enter login details
            cy.get('input[name=email]').type(data.email);
            cy.get('input[name=password]').type(data.password);
            cy.get('button[type=submit]').click();
    
            // Check that a redirect to the main page has occurred
            cy.location('pathname').should('eq', '/')

            // Return to login page
            cy.contains('Sign In').click();

            // Check that a redirect to the main page has occurred
            cy.location('pathname').should('eq', '/')
        });
    });

    it('should stay on sign-in page after unsuccessful login', () => {
        cy.visit('/sign-in');

        cy.fixture('data.json').then((data) => {
          // Enter incorrect login information
            cy.get('input[name=email]').type(data.incorrectEmail);
            cy.get('input[name=password]').type(data.incorrectPassword);
            cy.get('button[type=submit]').click();
        
            // Make sure remain on the login page
            cy.location('pathname').should('eq', '/sign-in')

            // Go to the main page
            cy.contains('Home').click();

            // Make sure remain on the login page
            cy.location('pathname').should('eq', '/sign-in')

        });
    });
  
});
  