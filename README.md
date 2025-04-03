# 🧪 Airalo Partner API - Cypress BDD Test Suite

This is an automated test suite built using **Cypress**, **TypeScript**, and **Cucumber BDD** to validate key endpoints of the [Airalo Partner API](https://sandbox-partners-api.airalo.com/).

---

## ✅ Features Covered

- 🔐 **OAuth2 Authentication** with client credentials
- 📦 **Placing orders** for eSIMs using the `/orders` endpoint
- 📦 **Placing orders** for eSIMs using the ui
- 📄 **Retrieving eSIMs** using the `/sims` endpoint with filtering
- 🔁 **Token caching** using `cy.task()` to avoid unnecessary token generation
- 📅 **Dynamic date filtering** using Day.js

---

## 🛠 Tech Stack

- [Cypress](https://www.cypress.io/) for end-to-end testing
- [Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) for BDD-style specs
- [TypeScript](https://www.typescriptlang.org/)
- [Day.js](https://day.js.org/) for time manipulation
- `cy.task()` for Node-side token caching
- `node-fetch` to call the API from Cypress config

---

## 📦 Installation & Setup

1. **Clone this repo:**
2. Install nodejs version 20 >
3. **Install dependencies:**
 npm install
4. **Run Cypress tests:**
 npx run cypress
 click on E2E Testing
 select browser of choice
 click start E2E testing
 click the feature file you want to run
5. or If you want to run headless then use `npx run cypress open` 
