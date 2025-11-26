type SharedData = Record<string, any>;

class SharedState {
  private static KEY = '__shared_state__';

  private static getState(): SharedData {
    return (Cypress.env(this.KEY) as SharedData) ?? {};
  }

  private static setState(state: SharedData): void {
    Cypress.env(this.KEY, state);
  }

  // Set a key-value pair
  static set(key: string, value: any): void {
    const current = this.getState();
    current[key] = value;
    this.setState(current);
  }

  // Get a value by key
  static get<T>(key: string): T {
    const current = this.getState();
    return current[key] as T;
  }

  // Clear all shared data
  static clear(): void {
    cy.log('Clearing shared state');
    this.setState({});
  }
}

export {SharedState};
