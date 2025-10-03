const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Ajusta estos selectores con Codegen si es necesario
    this.searchInput = page.locator('input[type="search"], input[placeholder]');
    this.searchButton = page.getByRole('button', { name: /buscar/i });
  }

  async open() {
    await this.goto('/');
    await this.acceptCookiesIfPresent();
    await this.closeLocationPopupsIfPresent();
  }

  async search(term) {
    const input = this.searchInput.first();
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.fill(term);
    // Muchas páginas inician búsqueda con Enter
    await input.press('Enter');
  }
}

module.exports = { HomePage };
