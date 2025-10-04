class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // icono al carrito y el badge con cantidad
    this.cartButton = page.getByRole('button', { name: /carrito|mi carrito|ver carrito/i })
      .or(page.getByRole('link', { name: /carrito|mi carrito|ver carrito/i }))
      .or(page.locator('[data-testid*="cart" i], [aria-label*="carrito" i]'));
    this.cartBadge =
      page.locator('[data-testid*="cart-badge" i], [class*="badge"][class*="cart"], [aria-label*="items" i]');
    // locator para el listado de productos en el carrito
    this.cartItems = page.locator('[data-testid*="cart-item" i], [class*="cart"] li, [role="listitem"]');
  }

    // metodo para agregar un producto al carrito 
    async addToCart() {
    if (await this.addButton.isVisible().catch(() => false)) {
      await this.addButton.click();
    } else if (await this.addIcon.isVisible().catch(() => false)) {
      await this.addIcon.click();
    } else {
      // cliquea el primer boton que encuentre dentro de los detalles del producto
      await this.root.locator('button').first().click();
    }
    // pequeña espera para que se actualice la cantidad del carrito
    await this.page.waitForTimeout(800);
  }

  async openCart() {

    if (await this.cartButton.isVisible().catch(() => false)) {
      await this.cartButton.click();
    } else {
      // va directo a la URL del carrito
      await this.page.goto('https://www.lider.cl/cart');
    }
    await this.page.waitForTimeout(1000);
  }

  async expectItems(test) {
    const { expect } = test;
    // Si existe "badge", valida que sea > 0; si no, valida que hay items listados
    if (await this.cartBadge.count()) {
      const badgeText = (await this.cartBadge.first().innerText().catch(() => '0')).trim();
      const num = parseInt(badgeText.replace(/\D+/g, '') || '0', 10);
      await expect(num, 'El badge del carrito debe ser > 0').toBeGreaterThan(0);
    } else {
      await expect(this.cartItems.first()).toBeVisible();
    }
  }
  }

  module.exports = { CartPage };
