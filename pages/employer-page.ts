import { type Locator, type Page } from '@playwright/test';

export class EmployerPage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly expiresAtInput: Locator;
    readonly submitJobButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.locator('#jobTitle');
        this.descriptionInput = page.locator('#jobDescription');
        this.expiresAtInput = page.locator('#expires_at');
        this.submitJobButton = page.getByRole('button', { name: 'Post Job' });
    }

    async goto() {
        await this.page.goto(`employer.html`);
    }

    async fillJobForm(job: {
        title: string;
        description: string;
        expires_at: string;
    }) {
        await this.titleInput.fill(job.title);
        await this.descriptionInput.fill(job.description);
        await this.expiresAtInput.fill(job.expires_at);
    }

    async clickSubmitJob() {
        const dialogPromise = this.page.waitForEvent('dialog');

        await this.submitJobButton.click();

        const dialog = await dialogPromise;
        await dialog.accept();

        return dialog.message();
    }

    getJobCard(title: string) {
        return this.page
            .locator('.card')
            .filter({
                hasText: title
            });
    }

}