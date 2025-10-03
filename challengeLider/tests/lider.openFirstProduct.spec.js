// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../src/pages/HomePage');
const { SearchResultsPage } = require('../src/pages/SearchResultsPage');

test.describe('Open details of products feature', () => {
  test('Open details of first product', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.search('arroz');

    const results = new SearchResultsPage(page);
    await results.waitForResults();
    await results.openFirstProduct();

    // Ajusta la siguiente aserción cuando tengas un selector estable de título/ficha
    await expect(page).toHaveURL(/producto|pdp|detalle/i);
  });
});
