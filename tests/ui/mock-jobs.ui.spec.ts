import { test, expect } from '@playwright/test';

test.describe('Mock UI Jobs', () => {

    test('@regression Display mocked jobs list', async ({ page }) => {

        const mockedJobs = [
            {
                title: 'Mock QA Engineer',
                description: 'Mock description'
            }
        ];

        await page.route('**/jobs', async route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedJobs)
            })
        });

        await page.goto('dashboard.html');

        await expect(page.getByText('Mock QA Engineer')).toBeVisible();
    });

    test('@regression Display error message when jobs API returns 500', async ({ page }) => {

        await page.route('**/jobs**', async route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify('Internal Server Error')
            })
        });

        await page.goto('dashboard.html');

        await expect(
            page.getByRole('heading', { name: 'Job Listing' })
        ).toBeVisible();

        await expect(
            page.locator('.card-body')
        ).toHaveCount(0);
    });

    test('@regression Display empty page when jobs request is aborted', async ({ page }) => {

        await page.route('**/jobs**', async route => {
            await route.abort();
        });

        await page.goto('dashboard.html');

        await expect(
            page.getByRole('heading', { name: 'Job Listings' })
        ).toBeVisible();

        await expect(
            page.locator('.card')
        ).toHaveCount(0);
    });

})

