import { Given, } from '@badeball/cypress-cucumber-preprocessor';

Given(/^I navigate to airalo website$/, function () {
    cy.visit('/')
    cy.get('button[id="onetrust-accept-btn-handler"]').click()
    cy.get('button[id="wzrk-cancel"]').click()
    cy.get('button[id="wzrk-cancel"]').should('not.exist')
})
