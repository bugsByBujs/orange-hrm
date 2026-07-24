import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  workers: 4,

  retries: 1,

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

    actionTimeout: 75000,

    navigationTimeout: 75000,

    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'auth',
      testDir: './tests/auth',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      }
    },

    // {
    //   name: 'firefox',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: '.auth/user.json',
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
