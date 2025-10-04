
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../src/pages/HomePage');
const { SearchResultsPage } = require('../src/pages/SearchResultsPage');
const { CartPage } = require('../src/pages/CartPage');

test.describe('Add a product to cart feature', () => {
    // Test para verificar que se puede agregar un producto al carrito
test('agrega el primer resultado de "leche" al carrito', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    // abre la pagina principal y busca "leche"
    await home.goto();
    await home.search('leche');

    // espera resultados y abre el primero
    const results = new SearchResultsPage(page);
    await results.waitForResults();
    await results.openFirstProduct();

    // agrega al carrito
    await cart.addToCart();
    // abre el carrito y verifica que hay items
    await cart.openCart();
    await cart.expectItems({ expect });
  });
});