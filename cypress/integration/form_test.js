describe('Cypress testing for the form inputs', function(){
    beforeEach(() => {
        cy.visit('localhost:3000');
    })
    it('Adds text to the input fields and then submits the form', function(){
        cy.get('[data-cy="name"]').type("Nico").should("have.value", "Nico");
        cy.get('[data-cy="email"]').type("chiku524@icloud.com").should("have.value", "chiku524@icloud.com");
        cy.get('[data-cy="password"]').type("qwerty123456").should("have.value", "qwerty123456");
        cy.get('[data-cy="terms_of_service"]').check().should("be.checked");
        cy.get('[data-cy="role"]').select('iPhone Developer')
        cy.get('[data-cy="submit"').should("be.enabled");
        cy.get('[data-cy="name"]').invoke('val').should("not.be.empty");
        cy.get('[data-cy="password"]').invoke('val').should("have.length.greaterThan", 7);
        cy.get('[data-cy="submit"').click();
    })
})