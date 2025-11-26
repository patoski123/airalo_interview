import type {PricePosition} from '../types/pricing';

// Augment Cypress with your custom command
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * The below are stored in the support/commands.ts file
       * Selects an item on the page based on price position.
       * @param position - 'lowest' | 'second-lowest' | 'second-highest' | 'highest' | number
       */
      addItemByPrice(position?: PricePosition): Chainable<void>;
      assertItemInCart(itemName: string): Chainable<void>;
      loginAs(userType: string): Chainable<void>;
    }
  }
}

// Required so this file is treated as a module
export {};
