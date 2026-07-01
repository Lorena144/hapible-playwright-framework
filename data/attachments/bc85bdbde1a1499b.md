# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/login.api.spec.ts >> Login API >> @smoke @regression Login with valid credentials
- Location: tests/api/login.api.spec.ts:7:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 415
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { AuthApi } from '../../services/auth.api';
  3  | import { ENV } from "../../playwright.config";
  4  | import * as allure from 'allure-js-commons';
  5  | 
  6  | test.describe('Login API', () => {
  7  |     test('@smoke @regression Login with valid credentials', async ({ request }) => {
  8  | 
  9  |         await allure.feature('Authentication');
  10 |         await allure.story('Login');
  11 | 
  12 |         const authApi = new AuthApi(request);
  13 |         const response = await authApi.login(
  14 |             ENV.usernameEmployer,
  15 |             ENV.passwordEmployer
  16 |         );
  17 | 
> 18 |         expect(response.status()).toBe(200);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  19 |         const responseJson = await response.json();
  20 |         expect(responseJson).toHaveProperty('token');
  21 |         expect(responseJson.message).toBe("Successful login.")
  22 |     });
  23 | 
  24 |     test('@regression Login with invalid credentials', async ({ request }) => {
  25 |         
  26 |         await allure.feature('Authentication');
  27 |         await allure.story('Login');
  28 | 
  29 |         const authApi = new AuthApi(request);
  30 |         const response = await authApi.login(
  31 |             "WrongCredentials",
  32 |             "WrongCredentials"
  33 |         );
  34 | 
  35 |         expect(response.status()).toBe(401);
  36 |         const responseJson = await response.json();
  37 |         expect(responseJson.error).toBe('Invalid credentials');
  38 |     });
  39 | })
```