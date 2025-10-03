// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../src/pages/HomePage');
const { SearchResultsPage } = require('../src/pages/SearchResultsPage');

test.describe('Search functionality in lider.cl', () => {
  test('Search for "leche" returns results', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.search('leche');

    const results = new SearchResultsPage(page);
    await results.waitForResults();

    const items = await results.count();
    expect(items).toBeGreaterThan(0);
  });
});
