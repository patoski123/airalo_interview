# 🧪 Interview - Cypress BDD Test Suite

![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-green.svg)
![ESLint](https://img.shields.io/badge/ESLint-configured-blue.svg)
![Prettier](https://img.shields.io/badge/Prettier-configured-blueviolet.svg)
![Husky](https://img.shields.io/badge/Husky-v9+-success.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-configured-informational.svg)

An automated test suite built using **Cypress**, **TypeScript**, and **Cucumber BDD** to validate key endpoints of the [Airalo Partner API](https://sandbox-partners-api.airalo.com/).

---

## ⚙️ Pre-requisites

Before you start, ensure you have the following installed:

- ✅ **Node.js v20 or higher**

  Check your version:
  ```bash
  node -v

Features Covered
🔐 OAuth2 Authentication with client credentials

📦 Placing orders for eSIMs using the /orders endpoint

🌐 Placing orders for eSIMs via the UI flow

📄 Retrieving eSIMs using the /sims endpoint with filtering

🔁 Token caching using cy.task() to avoid unnecessary token regeneration

📅 Dynamic date filtering using Day.js


🛠 Tech Stack
Cypress for end-to-end testing

Cucumber Preprocessor for BDD-style specs

TypeScript

Day.js for time manipulation

cy.task() for Node.js token caching

node-fetch to call the API from Cypress config

✅ Husky & Lint-Staged for pre-commit hooks

✅ ESLint + Prettier for code consistency and formatting

📦 Installation & Setup
1. Clone the repository
   bash
   Copy
   Edit
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies
   npm install
3. Setup Git Hooks (Important ✅)
   npm run setup:hooks
4. Run Cypress tests
   npx cypress open
   Then:

   - Click E2E Testing
   - Select your browser
   - Click Start E2E testing
   - Select the feature file you want to run

🧹 Code Quality & Automation
Lint & Format Code
Check linting, formatting, and type safety manually:
- npm run check:all

Auto-fix issues:
- npm run format


