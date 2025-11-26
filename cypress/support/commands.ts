/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// cypress/support/commands.ts

import {SharedState} from '@support/sharedState';

import type {PricePosition} from '../types/pricing';

Cypress.Commands.add('loginAs', (userType: string) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(userType, {delay: 0});
  // const password = "secret_sauce";
  const password = Cypress.env('SAUCE_PASSWORD');
  cy.get('[data-test="password"]').type(password, {delay: 0, log: false});
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('addItemByPrice', (position: PricePosition = 'highest') => {
  // eslint-disable-next-line no-undef
  cy.get('[data-test="inventory-item"]').then(($items: JQuery<HTMLElement>) => {
    const sorted: HTMLElement[] = [...$items].sort((a, b) => {
      const getPrice = (el: HTMLElement): number => {
        const priceText = Cypress.$(el).find('[data-test="inventory-item-price"]').text();
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
      };
      return getPrice(a) - getPrice(b);
    });

    let index: number;
    if (typeof position === 'number') {
      index = position > 0 ? position - 1 : sorted.length + position;
    } else {
      const positionMap: Record<string, number> = {
        lowest: 0,
        'second-lowest': 1,
        'second-highest': sorted.length - 2,
        highest: sorted.length - 1,
      };
      index = positionMap[position.toLowerCase()];
    }

    if (index < 0 || index >= sorted.length) {
      throw new Error(`Position ${position} is out of bounds. Only ${sorted.length} items available.`);
    }

    // Build lowercase, hyphenated locator dynamically
    cy.wrap(sorted[index]).within(() => {
      cy.get('[data-test="inventory-item-name"]')
        .invoke('text')
        .then((itemName: string) => {
          const cleanName = itemName.trim();
          SharedState.set('selectedItemName', cleanName);
          cy.log('clean name is', cleanName);
          // const formattedName = cleanName
          //   .toLowerCase()
          //   .replace(/\s+/g, '-')        // replace spaces with hyphens
          //   .replace(/[^a-z0-9-]/g, ''); // remove special characters
          //
          // const locator = `[data-test="add-to-cart-${formattedName}"]`;
          // cy.get(locator).click();
        });
      cy.get('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]').click();
    });
  });
});

Cypress.Commands.add('assertItemInCart', (itemName: string) => {
  cy.contains('[data-test="inventory-item-name"]', itemName, {
    timeout: 60000,
  })
    .should('be.visible')
    .then(() => {
      Cypress.log({name: 'assertItemInCart', message: `Found: ${itemName}`});
    });
});
