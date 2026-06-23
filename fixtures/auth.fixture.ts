import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ENV } from '../playwright.config';

type AuthFixture = {
    loggedInPage: void;

}

export const test = base.extend<AuthFixture>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            ENV.usernameEmployer,
            ENV.passwordEmployer);

        await expect(page).toHaveURL(`${ENV.uiBaseUrl}dashboard.\html`);

        await use();

    }
})

export { expect } from '@playwright/test';