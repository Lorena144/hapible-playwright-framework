import { test, expect } from '../../fixtures/auth.fixture';
import { DataGenerator } from '../../utils/data-generator';
import * as allure from 'allure-js-commons';
import { EmployerPage } from '../../pages/employer-page';

test.describe('Job UI', () => {
    test('@smoke @regression Create Job', async ({ page, loggedInPage }) => {

        await allure.feature('Job Management');
        await allure.story('Create Job');

        const job = {
            title: DataGenerator.jobTitle(),
            description: DataGenerator.jobDescription(),
            expires_at: '2027-06-25'
        };

        const employerPage = new EmployerPage(page);

        await allure.step('Create job through UI', async () => {

            await employerPage.goto();

            await employerPage.fillJobForm(job);
            const message = await employerPage.clickSubmitJob();

            expect(message).toBe('Job posted!');


            const createdJob = employerPage.getJobCard(job.title);

            await expect(createdJob).toBeVisible();
        });

    });
})
