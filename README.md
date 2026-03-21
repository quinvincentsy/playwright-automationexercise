# Playwright Automation Exercise

A Playwright automation framework using TypeScript, built with the Page Object Model pattern.

## Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Git](https://git-scm.com/)
- A code editor ([VS Code](https://code.visualstudio.com/) recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/quinvincentsy/playwright-automationexercise.git
cd playwright-automationexercise
```

### 2. Install Dependencies

Install Node packages (includes Playwright, Faker, and other dependencies):

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

| Command | Description |
|---|---|
| `npm run test:ui` | Run tests in UI mode |
| `npx playwright test` | Run all tests in headless mode |
| `npx playwright test --headed` | Run all tests in headed mode |
| `npx playwright show-report` | Open the last HTML test report |

## Project Structure

```
├── fixtures/
│   └── users.json          # Test data for login tests
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── SignupPage.ts
├── tests/
│   ├── login.spec.ts
│   └── signup.spec.ts
└── playwright.config.ts
```

## Key Dependencies

- [`@playwright/test`](https://playwright.dev/) — Test runner and browser automation
- [`@faker-js/faker`](https://fakerjs.dev/) — Random test data generation for signup tests
