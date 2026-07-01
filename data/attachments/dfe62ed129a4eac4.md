# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/login.ui.spec.ts >> Login UI >> @regression Login with invalid credentials
- Location: tests/ui/login.ui.spec.ts:21:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForEvent: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for event "dialog"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e3]:
    - link "Hapible (Seeking talents)" [ref=e5] [cursor=pointer]:
      - /url: "#"
  - generic [ref=e7]:
    - heading "Login" [level=2] [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e11]: Username
        - textbox [ref=e12]: WrongCredentials
      - generic [ref=e13]:
        - generic [ref=e14]: Password
        - textbox [ref=e15]: WrongCredentials
      - button "Login" [active] [ref=e16] [cursor=pointer]
      - generic [ref=e18]:
        - text: Don't have an account?
        - link "Register here" [ref=e19] [cursor=pointer]:
          - /url: register.html
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { ENV } from '../../playwright.config';
  3  | import { LoginPage } from '../../pages/login-page';
  4  | import * as allure from 'allure-js-commons';
  5  | 
  6  | test.describe('Login UI', () => {
  7  |     test('@smoke @regression Login with valid credentials', async ({ page }) => {
  8  | 
  9  |         await allure.feature('Authentication');
  10 |         await allure.story('Login');
  11 | 
  12 |         const loginPage = new LoginPage(page);
  13 |         await loginPage.goto();
  14 |         await loginPage.login(
  15 |             ENV.usernameEmployer,
  16 |             ENV.passwordEmployer);
  17 |         await expect(page).toHaveURL(/dashboard\.html$/);
  18 | 
  19 |     })
  20 | 
  21 |     test('@regression Login with invalid credentials', async ({ page }) => {
  22 | 
  23 |         await allure.feature('Authentication');
  24 |         await allure.story('Login');
  25 | 
> 26 |         const dialoguePromise = page.waitForEvent('dialog');
     |                                      ^ Error: page.waitForEvent: Test timeout of 30000ms exceeded.
  27 |         const loginPage = new LoginPage(page);
  28 |         await loginPage.goto();
  29 |         await loginPage.login("WrongCredentials", "WrongCredentials");
  30 |         const dialog = dialoguePromise;
  31 |         expect((await dialog).message()).toBe('Login failed!');
  32 | 
  33 |     })
  34 | })
  35 | 
  36 | 
  37 | 
```