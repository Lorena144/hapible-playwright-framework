import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButon: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButon = page.getByRole('button', { name: "Login" });
    }
    async goto() {
        await this.page.goto(`login.html`);
    }

    async login(username: string, password: string) {

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButon.click();
    }
}

