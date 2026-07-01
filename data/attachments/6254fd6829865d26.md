# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/create-job.api.spec.ts >> Jobs API >> @smoke @regression Create a new job
- Location: tests/api/create-job.api.spec.ts:9:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 415
```

# Test source

```ts
  1  | import { APIRequestContext, expect } from "@playwright/test";
  2  | import { ENV } from "../playwright.config";
  3  | 
  4  | export class JobsApi {
  5  |     constructor(private request: APIRequestContext) { }
  6  | 
  7  |     async createJob(jobData: {
  8  |         title: string;
  9  |         description: string;
  10 |         employer_id: number;
  11 |         expires_at?: string;
  12 |     }) {
  13 |         return await this.request.post(`${ENV.apiBaseUrl}/jobs`,
  14 |             {
  15 |                 form: {
  16 |                     action: 'create',
  17 |                     title: jobData.title,
  18 |                     description: jobData.description,
  19 |                     employer_id: jobData.employer_id,
  20 |                     expires_at: jobData.expires_at ?? ''
  21 |                 }
  22 | 
  23 |             }
  24 |         );
  25 |     };
  26 | 
  27 |     async getJobs() {
  28 |         const response = await this.request.get(`${ENV.apiBaseUrl}/jobs`);
> 29 |         expect(response.status()).toBe(200);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  30 |         return response;
  31 |     };
  32 | 
  33 |     async getJobIdByTitle(title: string) {
  34 |         const response = await this.getJobs();
  35 |         const jobs = await response.json();
  36 |         const job = jobs.find((j: any) => j.title === title);
  37 |         return job?.id
  38 |     };
  39 | 
  40 |     async deleteJob(id: string) {
  41 |         const response = await this.request.delete(`${ENV.apiBaseUrl}/jobs`,
  42 |             {
  43 |                 form: {
  44 |                     id
  45 |                 }
  46 |             });
  47 | 
  48 |         expect(response.status()).toBe(200);
  49 |         const responseJson = await response.json();
  50 |         expect(responseJson.success).toBe('Job deleted');
  51 |     }
  52 | }
```