import { APIRequestContext, expect } from "@playwright/test";
import { ENV } from "../playwright.config";

export class JobsApi {
    constructor(private request: APIRequestContext) { }

    async createJob(jobData: {
        title: string;
        description: string;
        employer_id: number;
        expires_at?: string;
    }) {
        return await this.request.post(`${ENV.apiBaseUrl}/jobs`,
            {
                form: {
                    action: 'create',
                    title: jobData.title,
                    description: jobData.description,
                    employer_id: jobData.employer_id,
                    expires_at: jobData.expires_at ?? ''
                }

            }
        );
    };

    async getJobs() {
        const response = await this.request.get(`${ENV.apiBaseUrl}/jobs`);
        expect(response.status()).toBe(200);
        return response;
    };

    async getJobIdByTitle(title: string) {
        const response = await this.getJobs();
        const jobs = await response.json();
        const job = jobs.find((j: any) => j.title === title);
        return job?.id
    };

    async deleteJob(id: string) {
        const response = await this.request.delete(`${ENV.apiBaseUrl}/jobs`,
            {
                form: {
                    id
                }
            });

        expect(response.status()).toBe(200);
        const responseJson = await response.json();
        expect(responseJson.success).toBe('Job deleted');
    }
}