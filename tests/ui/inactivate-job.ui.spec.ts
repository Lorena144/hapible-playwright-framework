import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { JobsApi } from '../../services/jobs.api';
import { DataGenerator } from '../../utils/data-generator';
import { EmployerPage } from '../../pages/employer-page';

test.use({
    storageState: 'playwright/.auth/employer.json'
});

test.describe('Job Status UI', () => {
    test('@regression Inactivate activate job', async ({ page, request }) => {

        await allure.feature('Job Management');
        await allure.story('Inactivate Job');

        const jobsApi = new JobsApi(request);

        const job = {
            title: DataGenerator.jobTitle(),
            description: DataGenerator.jobDescription(),
            employer_id: 2,
            expires_at: '2027-06-30'
        };

        let jobId: string | undefined;

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

                    return jobs.some((j: any) => j.title === job.title);
                }).toBe(true);
            });

            await allure.step('Open employer page', async () => {
                await employerPage.goto();
            });

            await allure.step('Verify created job is displayed', async () => {

                const createdCard = employerPage.getJobCard(job.title);

                await expect(createdCard).toBeVisible();

                const inactiveButton = createdCard.getByRole('button', {
                    name: 'Inactivate'
                });

                const onclick = await inactiveButton.getAttribute('onclick');
                jobId = onclick?.match(/\d+/)?.[0];

                expect(jobId).toBeTruthy();
            });

            await allure.step('Inactivate job through UI', async () => {

                const createdCard = employerPage.getJobCard(job.title);

                const dialogPromise = page.waitForEvent('dialog');

                await createdCard
                    .getByRole('button', { name: 'Inactivate' })
                    .click();

                const dialog = await dialogPromise;
                expect(dialog.message()).toContain('Job status updated');

                await dialog.accept();
            });

            await allure.step('Verify job status in backend', async () => {
                await expect.poll(async () => {
                    const response = await jobsApi.getJobs();
                    const jobs = await response.json();

                    const updatedJob = jobs.find((j: any) => j.id === jobId);

                    return updatedJob?.status;
                }).toBe('inactive');
            });

            await allure.step('Verify updated status in UI', async () => {

                const updatedCard = employerPage.getJobCard(job.title);

                await expect(
                    updatedCard.getByRole('button', { name: 'Reactivate' })
                ).toBeVisible();

                await expect(
                    updatedCard.getByText('Inactive', { exact: true })
                ).toBeVisible();

            });
        } finally {
            const id = await jobsApi.getJobIdByTitle(job.title);

            if (id) {
                await jobsApi.deleteJob(id);
            }

        }
    });

})