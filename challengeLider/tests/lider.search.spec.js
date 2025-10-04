// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../src/pages/HomePage');
const { SearchResultsPage } = require('../src/pages/SearchResultsPage');

test.describe('Search functionality in lider.cl', () => {
  // Test para verificar que una búsqueda retorna resultados
  test('Search for "leche" returns results', async ({ page }) => {
    // abre la pagina principal y busca "leche"
    const home = new HomePage(page);
    await home.open();
    await home.search('leche');
    // espera resultados
    const results = new SearchResultsPage(page);
    await results.waitForResults();
    // assertea que hay resultados
    const items = await results.count();
    expect(items).toBeGreaterThan(0);
  });
});
