import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { ENV } from '../../playwright.config';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        ENV.usernameEmployer,
        ENV.passwordEmployer
    );

    await page.waitForURL(/dashboard\.html$/);

    await page.context().storageState({
        path: 'playwright/.auth/employer.json'
    });
})