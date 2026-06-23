import { test, expect } from '@playwright/test';
import { JobsApi } from '../../services/jobs.api';
import { DataGenerator } from '../../utils/data-generator';

test.describe('Jobs API', () => {

    test('Create a new job', async ({ request }) => {
        const jobsApi = new JobsApi(request);
        const job = {
            title: DataGenerator.jobTitle(),
            description: DataGenerator.jobDesription(),
            employer_id: 2,
            expires_at: '2027-06-30'
        };

        const response = await jobsApi.createJob(job);
        expect(response.status()).toBe(200);
        const responseJson = await response.json();
        expect(responseJson.success).toBe('Job created');
    });

})