import {Given} from '@badeball/cypress-cucumber-preprocessor';

Given(/^I login as a "([^"]*)" user$/, function (userType: string) {
  cy.loginAs(userType);
});
