"use strict";
/// <reference types="cypress" />
describe('Register and log in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('#login-email').type('test@gmail.com');
        cy.get('#login-password').type('test1234');
        cy.get('#login-button').click();
    });
    it('Create AI', () => {
        //CREATE Test1 and delete it
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
        //DELETE Ai
        cy.get('#ai-list').children().should('have.length', 1);
        cy.get('#delAI').click();
    });
    it('Create AI and train', () => {
        //CREATE Test2 and train it
        cy.get('#name').type('test2').should('have.value', 'test2');
        cy.get('#color').should('have.value', '0: red');
        cy.get('#color').select('2: gold').should('have.value', '2: gold');
        cy.get('#win').should('have.value', '3');
        cy.get('#win').clear().type('2').should('have.value', '2');
        cy.get('#draw').should('have.value', '1');
        cy.get('#draw').clear().type('0').should('have.value', '0');
        cy.get('#lose').should('have.value', '-1');
        cy.get('#lose').clear().type('-2').should('have.value', '-2');
        cy.get('#create-form').submit();
        // TRAIN
        cy.get('#train-button').click();
        cy.get('#smartIaTrain').click();
        cy.wait(500);
        cy.get('#total-games-played').contains('1');
        cy.visit('http://localhost:4200/yourai');
        cy.get('#ai-list').children().should('have.length', 1);
        cy.get('#delAI').click();
    });
});
