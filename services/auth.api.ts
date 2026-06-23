import { APIRequestContext } from "@playwright/test";
import { ENV } from '../playwright.config'

export class AuthApi {

    constructor(private request: APIRequestContext) { }

    async register(userData: {
        name: string;
        username: string;
        email: string;
        password: string;
        role: string;
        company_name?: string
    }) {
        return await this.request.post(`${ENV.apiBaseUrl}/register`,
            {
                form: userData
            });
    }

    async login(username: string, password: string) {
        return await this.request.post(`${ENV.apiBaseUrl}/auth`,
            {
                form: {
                    username,
                    password
                }
            }
        )
    }
}