import { test, expect } from '@playwright/test';
import { AuthApi } from '../../services/auth.api';
import { DataGenerator } from '../../utils/data-generator';


test.describe('Register API', () => {
    test('@regression Register a new jobseeker user', async ({ request }) => {

        const authApi = new AuthApi(request);
        const user = {
            name: 'test jobseeker',
            username: DataGenerator.username(),
            email: DataGenerator.email(),
            password: DataGenerator.password(),
            role: 'jobseeker',
            company_name: ''
        }

        const response = await authApi.register(user);
        expect(response.status()).toBe(201);
        const responseJson = await response.json();
        expect(responseJson.success).toEqual('User registered');

    })

})