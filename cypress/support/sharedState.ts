type SharedData = Record<string, any>;

class SharedState {
    private static state: SharedData = {};

    // Set a key-value pair
    static set(key: string, value: any): void {
        this.state[key] = value;
    }

    // Get a value by key
    static get<T>(key: string): T {
        return this.state[key] as T;
    }

    // Clear all shared data
    static clear(): void {
        cy.log("Clearing shared state")
        this.state = {};
    }
}

export { SharedState };
