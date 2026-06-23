# Hapible Playwright Framework

Test automation framework built using TypeScript, Playwright and APIRequestContext.

The project focuses on building a maintainable and scalable automation framework covering both UI and API testing using reusable components, fixtures, storage state authentication and hybrid UI/API flows.

## Tech Stack

### UI Automation

* TypeScript
* Playwright
* Page Object Model (POM)

### API Automation

* Playwright APIRequestContext
* TypeScript

### Test Architecture

* Custom Fixtures
* Storage State Authentication
* Environment Configuration (.env)
* Dynamic Test Data Generation

### Cross Browser Testing

* Chromium
* Firefox
* WebKit

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

---

## API Automation

### Authentication

* User registration
* User login

### Job Management

* Create job posting

---

## Storage State Authentication

* Login executed once through setup test
* Authentication state stored in `playwright/.auth/employer.json`
* Authenticated session reused by UI tests
* Reduced execution time by avoiding repetitive UI logins

---

# Project Structure

```text
hapible-playwright-framework
│
├── fixtures
│   └── auth.fixture.ts
│
├── pages
│   └── login-page.ts
│
├── services
│   ├── auth.api.ts
│   └── jobs.api.ts
│
├── tests
│   ├── api
│   │   ├── login.api.spec.ts
│   │   ├── register.api.spec.ts
│   │   └── create-job.api.spec.ts
│   │
│   ├── setup
│   │   └── auth.setup.spec.ts
│   │
│   └── ui
│       ├── login.ui.spec.ts
│       ├── create-job.ui.spec.ts
│       └── inactivate-job.ui.spec.ts
│
├── utils
│   └── data-generator.ts
│
├── playwright.config.ts
├── package.json
└── .env.example
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
* Cross Browser Execution
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
