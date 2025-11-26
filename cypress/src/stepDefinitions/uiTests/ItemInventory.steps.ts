import {Given, Then} from '@badeball/cypress-cucumber-preprocessor';
import {SharedState} from '@support/sharedState';

import type {PricePosition} from '../../../types/pricing';

Given(/^I select the "([^"]*)" priced item on the page$/, function (itemPricing: PricePosition) {
  cy.addItemByPrice(itemPricing);
});

Then(/^I add the selected highest priced item to the cart$/, function () {
  cy.get('[data-test="add-to-cart"]').click();
  cy.get('[data-test="remove"]').should('be.visible');
});

Then(/^The item should be displayed in the cart$/, function () {
  cy.get('[data-test="shopping-cart-link"]').click();
  const itemName = SharedState.get<any>('selectedItemName');
  cy.assertItemInCart(itemName);
});
