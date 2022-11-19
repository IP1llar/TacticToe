"use strict";
describe('Register and log in', () => {
    beforeEach(() => {
        //REGISTER
        // cy.visit('http://localhost:4200/register');
        // cy.get('#register-email').type('test@gmail.com');
        // cy.get('#register-firstName').type('testName');
        // cy.get('#register-lastName').type('testLastName');
        // cy.get('#register-password').type('test1234');
        // cy.get('#register-button').click();
        //LOGIN
        cy.visit('http://localhost:4200/login');
        cy.get('#login-email').type('test@gmail.com');
        cy.get('#login-password').type('test1234');
        cy.get('#login-button').click();
    });
    it('Create AI name test1 and train it', () => {
        //CREATE
        cy.get('#name').type('test1').should('have.value', 'test1');
        cy.get('#color').should('have.value', '0: red');
        cy.get('#color').select('1: orange').should('have.value', '1: orange');
        cy.get('#win').should('have.value', '3');
        cy.get('#win').clear().type('2').should('have.value', '2');
        cy.get('#draw').should('have.value', '1');
        cy.get('#draw').clear().type('0').should('have.value', '0');
        cy.get('#lose').should('have.value', '-1');
        cy.get('#lose').clear().type('-2').should('have.value', '-2');
        cy.get('#create-form').submit();
        //TRAIN
        cy.get('#train-button').click();
        cy.location('pathname').should('eq', '/train/1');
        //TODO NEED OPTION TO DELETE AIs
    });
    // it('Create AI name test2', () => {
    //     cy.get('#name').type('test2').should('have.value', 'test2');
    //     cy.get('#color').should('have.value', '0: red');
    //     cy.get('#color').select('2: gold').should('have.value', '2: gold')
    //     cy.get('#win').should('have.value', '3');
    //     cy.get('#win').clear().type('2').should('have.value', '2');
    //     cy.get('#draw').should('have.value', '1');
    //     cy.get('#draw').clear().type('0').should('have.value', '0');
    //     cy.get('#lose').should('have.value', '-1');
    //     cy.get('#lose').clear().type('-2').should('have.value', '-2');
    //     cy.get('#create-form').submit();
    //     //TODO NEED OPTION TO DELETE AIs
    // })
});
