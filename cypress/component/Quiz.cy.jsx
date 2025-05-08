import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../src/components/Quiz';

describe('Quiz Component', () => {
    beforeEach(() => {
        mount(<Quiz />);
    });

    it ('renders the quiz question', () => {
        cy.get('h2').should('exist');
    });

    it('renders multiple choice buttons', () => {
        cy.get('button').should('have.length.at.least', 2);
    });

    it('advances to next question on answer click', () => {
        cy.get('.btn-primary').first().click();
        cy.get('h2').should('exist');
    });

    it('shows score after finishing the quiz', () => {
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
        }
        cy.get('h2').should('have.text', 'Quiz Completed');
        cy.get('[data-cy="score"]').should('exist');
    });

    it('shows restart button when quiz ends', () => {
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
        }
        cy.findByRole('button', { name: /take a new quiz/i }).should('exist');
    });
});