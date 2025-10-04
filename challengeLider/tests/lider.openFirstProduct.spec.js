const { test, expect } = require('@playwright/test');
const { HomePage } = require('../src/pages/HomePage');
const { SearchResultsPage } = require('../src/pages/SearchResultsPage');

test.describe('Open details of products feature', () => {
  // Test para verificar un componente de detalle de producto
  test('Open details of first product', async ({ page }) => {
    // abre la pagina principal y busca "arroz"
    const home = new HomePage(page);
    await home.open();
    await home.search('arroz');

    // espera resultados y abre el primero
    const results = new SearchResultsPage(page);
    await results.waitForResults();
    await results.openFirstProduct();

    // assertea que el titulo del producto contenga "arroz"
    await expect(page.locator('h1')).toContainText(/arroz/i);
  });
});
