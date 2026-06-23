import { test, expect } from '@playwright/test';

test.use({
    storageState: 'playwright/.auth/employer.json'
});

test.describe('Job Status UI', () => {
    test('Inactivate activate job', async ({ page }) => {
        await page.goto(`employer.html`);

        const activeCard = page
            .locator('.card')
            .filter({
                has: page.getByRole('button', { name: 'Inactivate' })
            })
            .first();

        const jobTitle = await activeCard
            .locator('h5')
            .evaluate(el => el.childNodes[0].textContent?.trim());

        const dialogPromise = page.waitForEvent('dialog');
        await activeCard.getByRole('button', { name: 'Inactivate' }).click();

        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Job status updated');
        await dialog.accept();

        const updatedCard = page
            .locator('.card')
            .filter({
                hasText: jobTitle!
            });

        await expect(
            updatedCard.getByRole('button', { name: 'Reactivate' })
        ).toBeVisible();

        await expect(
            updatedCard.getByText('Inactive', { exact: true })
        ).toBeVisible();

    })

})