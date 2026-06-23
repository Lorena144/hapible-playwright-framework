import { APIRequestContext } from "@playwright/test";
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
    }
}