import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  uiBaseUrl: process.env.UI_BASE_URL!,
  apiBaseUrl: process.env.API_BASE_URL!,
  usernameEmployer: process.env.USERNAME_EMPLOYER!,
  passwordEmployer: process.env.PASSWORD_EMPLOYER!,
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',

  use: {
    baseURL: ENV.uiBaseUrl,
    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Webkit'],
      },
    }

  ],

});
