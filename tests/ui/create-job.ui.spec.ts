import { test, expect } from '../../fixtures/auth.fixture';
import { DataGenerator } from '../../utils/data-generator';

test.describe('Job UI', () => {
    test('@smoke @regression Create Job', async ({ page, loggedInPage }) => {

        await page.goto(`employer.html`);

        await page.locator('#jobTitle').fill(DataGenerator.jobTitle());
        await page.locator('#jobDescription').fill(DataGenerator.jobDesription());
        await page.locator('#expires_at').fill('2027-06-25');

        const dialoguePromise = page.waitForEvent('dialog');
        await page.getByRole('button', { name: 'Post Job' }).click();

        const dialog = await dialoguePromise;
        expect( dialog.message()).toBe('Job posted!');


    })
})
