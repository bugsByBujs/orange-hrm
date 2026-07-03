import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  workers: 4,

  retries: 2,

  reporter: 'html',

  // GLOBAL TEST TIMEOUT
  timeout: 60000,

  // EXPECT TIMEOUT
  expect: {
    timeout: 10000,
  },

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    trace: 'on-first-retry',

    headless: false,

    screenshot: 'only-on-failure',

    actionTimeout: 60000,

    navigationTimeout: 60000,

    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
