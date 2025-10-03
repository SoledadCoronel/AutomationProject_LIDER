class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Ajusta con Codegen: apunta al contenedor/tarjeta de producto
    this.productTiles = page.locator('a:has(img), article a, li a');
  }

  async waitForResults() {
    await this.page.waitForLoadState('domcontentloaded');
    // Dale tiempo a la UI dinámica
    await this.page.waitForTimeout(1000);
  }

  async count() {
    return await this.productTiles.count();
  }

  async openFirstProduct() {
    const first = this.productTiles.first();
    await first.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { SearchResultsPage };
