# 🧪 Cypress BDD Test Automation Framework

<div align="center">

![Cypress](https://img.shields.io/badge/Cypress-v15.7.0-04C38E?style=for-the-badge&logo=cypress) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

**Enterprise-ready E2E test framework built with Cypress, TypeScript, and Cucumber BDD**

</div>

---

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🔧 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Installation](#️-installation)
- [🧪 Running Tests](#-running-tests)
- [📊 BDD HTML Reporting](#-bdd-html-reporting)
- [🔐 Custom Commands & Shared State](#-custom-commands--shared-state)
- [🧹 Code Quality](#-code-quality)
- [🪝 Git Hooks](#-git-hooks)
- [🎯 CI/CD Integration](#-cicd-integration)
- [💡 Best Practices](#-best-practices)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Create environment file
echo "SAUCE_PASSWORD=secret_sauce" > .env

# Run all tests
npm run test

# Generate HTML report
npm run report:bdd
```

---

## 🔧 Tech Stack

| Technology                                  | Version | Purpose                                  |
| ------------------------------------------- | ------- | ---------------------------------------- |
| **Cypress**                                 | 15.x    | E2E test runner with excellent debugging |
| **TypeScript**                              | 5.x     | Type safety and better IDE support       |
| **@badeball/cypress-cucumber-preprocessor** | Latest  | Gherkin BDD syntax support               |
| **esbuild**                                 | Latest  | Lightning-fast TypeScript bundling       |
| **multiple-cucumber-html-reporter**         | Latest  | Rich HTML BDD reports                    |
| **Husky**                                   | 9.x     | Git hooks for quality gates              |
| **ESLint**                                  | Latest  | Code linting                             |
| **Prettier**                                | Latest  | Code formatting                          |
| **dotenv**                                  | Latest  | Environment variable management          |

---

## 📁 Project Structure

```
📦 cypress-bdd-framework/
├── 📂 cypress/
│   ├── 📂 support/
│   │   ├── 📄 e2e.ts                 # Cypress support entry
│   │   ├── 📄 commands.ts            # Custom Cypress commands
│   │   ├── 📄 sharedState.ts         # In-memory shared state
│   │   └── 📄 types.d.ts             # TypeScript declarations
│   ├── 📂 src/
│   │   ├── 📂 stepDefinitions/       # Step definition files (.ts)
│   │   ├── 📂 pageObjects/           # Page Object Model classes
│   │   └── 📂 utilities/             # Helper utilities
│   └── 📂 test_features/
│       └── 📄 *.feature               # Gherkin feature files
├── 📂 .run/
│   └── 📂 reports/
│       ├── 📂 json/                   # Cucumber JSON output
│       ├── 📂 html/                   # Generated HTML reports
│       ├── 📂 videos/                 # Test execution videos
│       ├── 📂 screenshots/            # Failure screenshots
│       └── 📂 downloads/              # Test downloads
├── 📄 cypress.config.ts               # Cypress configuration
├── 📄 package.json                    # NPM dependencies & scripts
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 .eslintrc.json                  # ESLint rules
├── 📄 .prettierrc                    # Prettier rules
└── 📄 .env                            # Environment variables (gitignored)
```

---

## ⚙️ Installation

### Prerequisites

Ensure you have the following installed:

```bash
# Check Node.js version (requires v20+)
node -v

# Check npm version
npm -v
```

### Setup Steps

#### 1️⃣ Install Dependencies

```bash
npm install
```

#### 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
# Test Credentials
SAUCE_PASSWORD=secret_sauce

# Optional: Test Environment URLs
BASE_URL=https://www.saucedemo.com
API_URL=https://api.example.com

# Optional: Test Configuration
TIMEOUT=30000
RETRY_TIMES=2
```

#### 3️⃣ Verify Installation

```bash
# Run a specific feature file
 npm run test:specificFeature
# Open Cypress Test Runner
npm run cypress:open
```

---

## 🧪 Running Tests

### NPM Scripts (Recommended)

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "prepare": "husky",
    "lint": "npm exec -- eslint . --format stylish",
    "lint:fix": "npm exec -- eslint . --fix --format stylish",
    "prettier:fix": "prettier --write \"**/*.{js,json,md,ts,html,scss,feature}\"",
    "check:all": "npm run lint && prettier --check \"**/*.{js,json,md,ts,html,scss,feature}\" && tsc --noEmit",
    "format": "npm run lint:fix && npm run prettier:fix",
    "remove:node_module-packageLockFile": "rm -rf node_modules package-lock.json",
    "test:specificFeature": "npx cypress run --spec cypress/test_features/ui_tests/login.feature",
    "report:bdd": "node scripts/generate-cucumber-report.mjs",
    "report:all": "npm run report:bdd"
  }
}
```

### Command Line Examples

#### Run All Tests (Headless)

```bash

# directly with Cypress
npx cypress run
```

#### Run Specific Feature File

```bash
npx cypress run --spec "cypress/test_features/login.feature"
```

#### Run Tests with Specific Tags

```bash
# Run only @smoke tagged scenarios
npx cypress run --env TAGS="@smoke"

# Run @regression but not @flaky
npx cypress run --env TAGS="@regression and not @flaky"
```

#### Run Tests in Different Browsers

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Electron (default)
npm run test
```

#### Interactive Mode (for Debugging)

```bash
npm run cypress:open
```

---

## 📊 BDD HTML Reporting

### Generate Beautiful HTML Reports

#### 1️⃣ Run Tests to Generate JSON

```bash
npm run test
```

#### 2️⃣ Generate HTML Report

```bash
npm run report:bdd
```

#### 3️⃣ View Report

```bash
# macOS/Linux
open .run/reports/html/index.html

# Windows
start .run/reports/html/index.html

# Or use any web browser to open the file
```

### Report Configuration

Create `cypress/support/generateReport.ts`:

```typescript
import * as reporter from 'multiple-cucumber-html-reporter';

reporter.generate({
  jsonDir: '.run/reports/json',
  reportPath: '.run/reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '120',
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  customData: {
    title: 'Cypress BDD Test Report',
    data: [
      {label: 'Project', value: 'Sauce Demo Tests'},
      {label: 'Environment', value: process.env.NODE_ENV || 'development'},
      {label: 'Execution Time', value: new Date().toISOString()},
    ],
  },
  displayDuration: true,
  displayReportTime: true,
  durationInMS: true,
  openReportInBrowser: true,
});
```

---

## 🔐 Custom Commands & Shared State

### Custom Login Command

`cypress/support/commands.ts`:

```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      loginAs(username: string): Chainable<void>;
      selectItemByPrice(priceStrategy: 'lowest' | 'highest'): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginAs', (username: string) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username, {delay: 0});

  const password = Cypress.env('SAUCE_PASSWORD');
  cy.get('[data-test="password"]').type(password, {delay: 0, log: false});

  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('selectItemByPrice', (priceStrategy: 'lowest' | 'highest') => {
  // Implementation here
});
```

### Shared State Management

`cypress/support/sharedState.ts`:

```typescript
export class SharedState {
  private static instance: SharedState;
  private state: Map<string, any> = new Map();

  static getInstance(): SharedState {
    if (!SharedState.instance) {
      SharedState.instance = new SharedState();
    }
    return SharedState.instance;
  }

  set(key: string, value: any): void {
    this.state.set(key, value);
  }

  get(key: string): any {
    return this.state.get(key);
  }

  clear(): void {
    this.state.clear();
  }
}
```

### Usage in Step Definitions

```typescript
import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import {SharedState} from '../support/sharedState';

const sharedState = SharedState.getInstance();

Given('I login as a {string} user', (userType: string) => {
  cy.loginAs(userType);
});

When('I select the item with the {string} price', (priceStrategy: string) => {
  cy.selectItemByPrice(priceStrategy as 'lowest' | 'highest');
  // Store selected item name for later assertion
  cy.get('.selected-item-name')
    .invoke('text')
    .then((itemName) => {
      sharedState.set('selectedItem', itemName);
    });
});

Then('the selected item should be in the cart', () => {
  const expectedItem = sharedState.get('selectedItem');
  cy.get('.cart-item-name').should('contain', expectedItem);
});
```

---

## 🧹 Code Quality

### Linting & Formatting Commands

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Format all code
npm run format

# Check formatting without changing files
npm run prettier:check

# TypeScript type checking
npm run type:check

# Run all checks (pre-push validation)
npm run check:all
```

### ESLint Configuration

`.eslintrc.json`:

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:cypress/recommended", "prettier"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "cypress"],
  "env": {
    "cypress/globals": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn"
  }
}
```

### Prettier Configuration

`.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

---

## 🪝 Git Hooks

### Husky Configuration

Git hooks are automatically installed via:

```bash
npm install  # Runs 'prepare' script which sets up Husky
```

### Hook Configurations

#### Pre-commit Hook

`.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### Pre-push Hook

`.husky/pre-push`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run check:all
```

#### Lint-staged Configuration

`package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

---

## 🎯 CI/CD Integration

### GitHub Actions Example

`.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox, electron]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run E2E tests
        run: npm run test:${{ matrix.browser }}
        env:
          SAUCE_PASSWORD: ${{ secrets.SAUCE_PASSWORD }}

      - name: Generate HTML Report
        if: always()
        run: npm run report:bdd

      - name: Upload Test Artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results-${{ matrix.browser }}
          path: |
            .run/reports/html
            cypress/screenshots
            cypress/videos
```

---

## 💡 Best Practices

### 1. Page Object Model

```typescript
// cypress/src/pageObjects/LoginPage.ts
export class LoginPage {
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  visit(): void {
    cy.visit('/');
  }

  enterUsername(username: string): void {
    cy.get(this.usernameInput).type(username);
  }

  enterPassword(password: string): void {
    cy.get(this.passwordInput).type(password, {log: false});
  }

  clickLogin(): void {
    cy.get(this.loginButton).click();
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.errorMessage);
  }
}
```

### 2. Feature File Organization

```gherkin
# cypress/test_features/login.feature
@smoke
@regression
Feature: User Authentication
  As a user
  I want to login to the application
  So that I can access protected features

  Background:
    Given I am on the login page

  @happy-path
  Scenario: Successful login with valid credentials
    When I login as a "standard_user" user
    Then I should be redirected to the inventory page
    And I should see the product catalog
```

### 3. Environment-Specific Configuration

```typescript
// cypress.config.ts
import {defineConfig} from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    env: {
      ...process.env,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: parseInt(process.env.TIMEOUT || '10000'),
    requestTimeout: 15000,
    responseTimeout: 15000,
  },
});
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Ensure all tests pass (`npm run test`)
5. Ensure code quality checks pass (`npm run check:all`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

For issues, questions, or suggestions, please:

1. Check the [FAQ](docs/FAQ.md)
2. Search [existing issues](https://github.com/your-repo/issues)
3. Create a [new issue](https://github.com/your-repo/issues/new)

---

<div align="center">
<b>Happy Testing! 🚀</b>
</div>
