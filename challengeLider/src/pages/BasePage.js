class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async acceptCookiesIfPresent() {
    const candidates = [
      'button:has-text("Aceptar")',
      'button:has-text("Aceptar todo")',
      'button:has-text("Aceptar todas")',
      'button:has-text("Entendido")',
      '[aria-label*="Aceptar" i]',
      '[data-testid*="accept" i]',
      '[id*="accept" i]'
    ];
    for (const sel of candidates) {
      const loc = this.page.locator(sel).first();
      try {
        if (await loc.count() && await loc.isVisible()) {
          await loc.click({ timeout: 2000 });
          break;
        }
      } catch (_) {}
    }
  }

  async closeLocationPopupsIfPresent() {
    const candidates = [
      'button:has-text("Cerrar")',
      'button:has-text("No gracias")',
      'button:has-text("Más tarde")',
      '[aria-label*="cerrar" i]'
    ];
    for (const sel of candidates) {
      const loc = this.page.locator(sel).first();
      try {
        if (await loc.count() && await loc.isVisible()) {
          await loc.click({ timeout: 2000 });
        }
      } catch (_) {}
    }
  }
}

module.exports = { BasePage };
