import { test, expect } from '@playwright/test';
import { JobsApi } from '../../services/jobs.api';
import { DataGenerator } from '../../utils/data-generator';

test.use({
    storageState: 'playwright/.auth/employer.json'
});

test.describe('Hybrid Flows', () => {
    test('@regression Create Job through API and verify it in UI', async ({ request, page }) => {

        const jobsApi = new JobsApi(request);
        const job = {
            title: DataGenerator.jobTitle(),
            description: DataGenerator.jobDesription(),
            employer_id: 2,
            expires_at: '2027-06-30'
        };

        // Create Job through API
        const response = await jobsApi.createJob(job);
        expect(response.status()).toBe(200);
        const responseJson = await response.json();
        expect(responseJson.success).toBe('Job created');

        // Open UI
        await page.goto('employer.html');

        // Verify job title is displayed
        await expect(
            page.getByRole('heading', {
                name: new RegExp(job.title)
            })
        ).toBeVisible();

        // Verify description is displayed
        await expect(
            page.getByText(job.description)
        ).toBeVisible();
    })
})