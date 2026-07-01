import { test, expect } from '@playwright/test';
import { AuthApi } from '../../services/auth.api';
import { ENV } from "../../playwright.config";
import * as allure from 'allure-js-commons';

test.describe('Login API', () => {
    test('@smoke @regression Login with valid credentials', async ({ request }) => {

        await allure.feature('Authentication');
        await allure.story('Login');

        const authApi = new AuthApi(request);
        const response = await authApi.login(
            ENV.usernameEmployer,
            ENV.passwordEmployer
        );

        expect(response.status()).toBe(200);
        const responseJson = await response.json();
        expect(responseJson).toHaveProperty('token');
        expect(responseJson.message).toBe("Successful login.")
    });

    test('@regression Login with invalid credentials', async ({ request }) => {
        
        await allure.feature('Authentication');
        await allure.story('Login');

        const authApi = new AuthApi(request);
        const response = await authApi.login(
            "WrongCredentials",
            "WrongCredentials"
        );

        expect(response.status()).toBe(401);
        const responseJson = await response.json();
        expect(responseJson.error).toBe('Invalid credentials');
    });
})