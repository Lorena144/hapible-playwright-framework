import { test, expect } from '@playwright/test';
import { ENV } from '../../playwright.config';
import { LoginPage } from '../../pages/login-page';
import * as allure from 'allure-js-commons';

test.describe('Login UI', () => {
    test('@smoke @regression Login with valid credentials', async ({ page }) => {

        await allure.feature('Authentication');
        await allure.story('Login');

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            ENV.usernameEmployer,
            ENV.passwordEmployer);
        await expect(page).toHaveURL(/dashboard\.html$/);

    })

    test('@regression Login with invalid credentials', async ({ page }) => {

        await allure.feature('Authentication');
        await allure.story('Login');

        const dialoguePromise = page.waitForEvent('dialog');
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("WrongCredentials", "WrongCredentials");
        const dialog = dialoguePromise;
        expect((await dialog).message()).toBe('Login failed!');

    })
})


