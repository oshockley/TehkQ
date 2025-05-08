describe ("quiz componet test", () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3001/');
    });

    it('should start the quiz when clicking the start button', () => {
        cy.findByRole('button', { name: 'Start Quiz' }).click();
        cy.get('.card h2').should('exist');
    });

    it('should proceed to the next question after an answer is clicked', () => {
        cy.findByRole('button', { name: 'Start Quiz' }).click();
        cy.get('.btn-primary').first().click();
        cy.get('.card h2').should('exist');
    });

    it('should finish the quiz and show the final score', () => {
        cy.findByRole('button', { name: 'Start Quiz' }).click();
        cy.completeQuiz();

        cy.get('h2').should('have.text', 'Quiz Completed');
        cy.get('[data-cy="score"]').should('exist');
    });

    it('should show the option to start new quiz after completing the current one', () => {
        cy.findByRole('button', { name: 'Start Quiz' }).click();
        cy.completeQuiz();
        cy.findByRole('button', { name: /take a new quiz/i }).should('exist');
    });
});
