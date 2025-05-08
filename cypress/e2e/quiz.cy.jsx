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

    it('should end the end the quiz and show score after all questions are answered', () => {
        cy.findByRole('button', { name: 'Start Quiz' }).click();

        //Answer all 10 questions
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').should('have.length', 4);
            cy.get('.btn-primary').first().click();
        }

        //Verify score is shown
        cy.contains(/score/i).should('exist');
    });

    it('should allow restarting the quiz after it is over', () => {
        cy.findByRole('button', { name: /start quiz/i }).click();

        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
        }

        cy.contains(/score/i).should('exist');

        cy.findByRole('button', { name: /quiz/i }).click();
        cy.get('.card h2').should('exist');
    });
});
