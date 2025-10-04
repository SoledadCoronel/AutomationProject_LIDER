// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html' }]
  ],
  use: {
    baseURL: 'https://www.lider.cl/inicio',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    headless: false, // mejor visible para evitar bloqueos antibot
        launchOptions: {
      slowMo: 3000 // establece pausas entre acciones
    },
    viewport: { width: 1366, height: 768 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    //{ name: 'firefox',  use: { ...devices['Desktop Firefox'] } }
    //{ name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ],
});
