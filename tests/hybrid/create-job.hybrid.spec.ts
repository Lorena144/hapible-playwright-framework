import { test, expect } from '@playwright/test';
import { JobsApi } from '../../services/jobs.api';
import { DataGenerator } from '../../utils/data-generator';
import * as allure from 'allure-js-commons';
import { EmployerPage } from '../../pages/employer-page';

test.use({
    storageState: 'playwright/.auth/employer.json'
});

test.describe('Hybrid Flows', () => {
    test('@regression Create Job through API and verify it in UI', async ({ request, page }) => {

        await allure.feature('Hybrid Testing');
        await allure.story('Create Job API to UI');

        const jobsApi = new JobsApi(request);
        const job = {
            title: DataGenerator.jobTitle(),
            description: DataGenerator.jobDescription(),
            employer_id: 2,
            expires_at: '2027-06-30'
        };

        const employerPage = new EmployerPage(page);

        try {
            await allure.step('Create job through API', async () => {
                await allure.attachment(
                    'Job payload',
                    JSON.stringify(job, null, 2),
                    'application/json'
                );

                const response = await jobsApi.createJob(job);
                expect(response.status()).toBe(200);

                const responseJson = await response.json();
                expect(responseJson.success).toBe('Job created');
                await allure.attachment(
                    'Create Job response',
                    JSON.stringify(responseJson, null, 2),
                    'application/json'
                );

            });

            await allure.step('Wait until job is available in backend', async () => {
                await expect.poll(async () => {
                    const response = await jobsApi.getJobs();
                    const jobs = await response.json();
                    return jobs.some((j: any) => j.title === job.title)
                }).toBe(true);
            });

            await allure.step('Open employer page', async () => {
                await employerPage.goto();
            });


            await allure.step('Verify job is displayed in UI', async () => {
                const createdCard = employerPage.getJobCard(job.title);

                await expect(createdCard).toBeVisible();
                await expect(createdCard).toContainText(job.description);

            });
        } finally {
            const jobId = await jobsApi.getJobIdByTitle(job.title);
            if (jobId) {
                await jobsApi.deleteJob(jobId);
            }
        }

    });
})