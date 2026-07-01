# Hapible Playwright Framework

![Playwright CI](https://github.com/Lorena144/hapible-playwright-framework/actions/workflows/playwright.yml/badge.svg)

A scalable test automation framework built with TypeScript and Playwright, covering UI, API, and Hybrid UI/API testing.

The framework follows modern automation practices including Page Object Model, Service Layer, Custom Fixtures, Storage State Authentication, Network Mocking, Allure Reporting, CI/CD pipelines and Cross-Browser Testing.

## Tech Stack

### UI Automation

* TypeScript
* Playwright
* Page Object Model (POM)

### API Automation

* Playwright APIRequestContext
* Service Layer
* TypeScript

### Test Architecture

* Page Object Model
* Service Layer
* Custom Fixtures
* Storage State Authentication
* Environment Configuration (.env)
* Dynamic Test Data Generation
* GitHub Actions
* Jenkins

### Cross Browser Testing

* Chromium
* Firefox
* WebKit

## CI/CD

- GitHub Actions
- Jenkins

## Reporting

- Allure Report
- GitHub Pages

---

# Current Automated Flows

## UI Automation

### Authentication

* Successful login
* Invalid login validation

### Job Management

* Create job posting
* Inactivate job posting
* Validate Active → Inactive status transition
* Validate Inactivate → Reactivate button transition

### Network Mocking & Interception

* Display mocked jobs list using route.fulfill()
* Simulate API 500 response
* Simulate aborted network request using route.abort()

---

## API Automation

### Authentication

* User registration
* User login

### Job Management

* Create job posting
* Automatic cleanup using API

--- 

## Hybrid UI/API Flows

* Create job through API and verify it in UI

---

# Project Structure

```text
hapible-playwright-framework
│
├── .github
│   ├── actions
│   │   ├── setup-playwright
│   │   ├── upload-allure
│   │   └── upload-playwright-report
│   │
│   └── workflows
│       └── playwright.yml
│
├── fixtures
│   └── auth.fixture.ts
│
├── pages
│
├── playwright
│   └── .auth
│
├── services
│
├── tests
│   ├── api
│   ├── hybrid
│   ├── setup
│   └── ui
│
├── utils
│
├── playwright.config.ts
├── package.json
├── .env.example
├── Jenkinsfile
└── README.md
```

---

# Implemented Design Principles

* Separation of Concerns
* Page Object Model
* Service Layer for API requests
* Reusable Fixtures
* Storage State Authentication
* Environment-based Configuration
* Dynamic Test Data Generation
* Network Mocking and Interception
* Hybrid UI/API Testing
* Cross Browser Execution
* Allure Report
* CI/CD Integration
* Maintainable Framework Architecture

---

# Test Execution

Run all tests:

```bash
npm test
```

Run UI tests only:

```bash
npm run test:ui
```

Run API tests only:

```bash
npm run test:api
```

Run Hybrid tests only:

```bash
npm run test:hybrid
```

Generate Allure Report

```bash
npm run allure:serve
```

---

# Environment Variables

Create a `.env` file based on `.env.example`.

Required variables:

```env
UI_BASE_URL=
API_BASE_URL=
USERNAME_EMPLOYER=
PASSWORD_EMPLOYER=
```
