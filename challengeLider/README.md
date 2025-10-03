# Playwright + Page Object Model (JavaScript) — lider.cl

Este es un **proyecto base** de automatización E2E con [Playwright Test] usando **JavaScript** y **Page Object Model (POM)**, listo para abrir en **Visual Studio Code** y adaptar a `https://www.lider.cl/`.

> ⚠️ Los selectores son **genéricos** y están pensados como punto de partida. En sitios de retail los modales de cookies/ubicación cambian a menudo. Abre el modo **Codegen** para capturar selectores robustos y reemplázalos en las Page Objects.

## Requisitos
- Node.js 18+ y npm instalados (`node -v`, `npm -v`).
- VS Code + extensión **Playwright Test for VSCode** (opcional pero recomendado).

## Instalación
```bash
npm install
npx playwright install --with-deps
```

## Scripts útiles
```bash
npm test           # Ejecuta todo en modo headless
npm run test:headed# Ejecuta con navegador visible
npm run test:ui    # Modo UI de Playwright
npm run report     # Abre el último reporte HTML
npm run codegen    # Abre Codegen sobre https://www.lider.cl/
```

## Estructura
```
playwright-lider-js-pom/
├─ src/
│  └─ pages/
│     ├─ BasePage.js
│     ├─ HomePage.js
│     └─ SearchResultsPage.js
├─ tests/
│  └─ lider.search.spec.js
├─ .vscode/
│  └─ launch.json
├─ playwright.config.js
├─ package.json
└─ README.md
```

## Consejos para estabilizar pruebas en sitios dinámicos
- **Acepta cookies y cierres de ubicación** con utilidades comunes (ya incluidas en `BasePage`).
- Usa **`getByRole`**, `getByLabel`, `getByPlaceholder` antes que selectores CSS frágiles.
- Cuando sea posible, negocia con el equipo de frontend agregar **`data-testid="..."`**.
- Habilita **`trace: 'on-first-retry'`** (ya configurado) y revisa los traces fallidos: `npx playwright show-trace`.

## ¿Por dónde seguir?
1. Ejecuta `npm run codegen` y navega el flujo que quieras automatizar (búsqueda, filtros, ficha).
2. Copia los selectores que Codegen arroje y reemplaza los genéricos en `HomePage` y `SearchResultsPage`.
3. Añade más Page Objects (e.g., `ProductPage`, `CartPage`) si tu flujo lo requiere.
4. Integra en CI (GitHub Actions, Azure DevOps) usando `npx playwright install --with-deps` en el job.

¡Éxitos!
