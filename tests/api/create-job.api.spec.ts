import { test, expect } from '@playwright/test';
import { JobsApi } from '../../services/jobs.api';
import { DataGenerator } from '../../utils/data-generator';
import * as allure from 'allure-js-commons';


test.describe('Jobs API', () => {

    test('@smoke @regression Create a new job', async ({ request }) => {

        await allure.feature('Job API');
        await allure.story('Create Job');

        const jobsApi = new JobsApi(request);
        const job = {
            title: DataGenerator.jobTitle(),
            description: DataGenerator.jobDescription(),
            employer_id: 2,
            expires_at: '2027-06-30'
        };

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
        } finally {
            const jobId = await jobsApi.getJobIdByTitle(job.title);
            if (jobId) {
                await jobsApi.deleteJob(jobId);
            }
        }

    });

})