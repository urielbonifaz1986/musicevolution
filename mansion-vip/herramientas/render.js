// node herramientas/render.js  → imagenes/elenco.png e imagenes/personajes/*.png
const path = require('path'), fs = require('fs');
const { chromium } = require('playwright');
const { dibujar } = require('../personajes.js');
const { ELENCO, ESPECIALES } = require('../elenco.js');
const out = path.join(__dirname, '..', 'imagenes');
fs.mkdirSync(path.join(out, 'personajes'), { recursive: true });
const tarjeta = p => `<div class="t"><div class="f">${dibujar(p)}</div><b>${p.nombre}</b></div>`;
const pagina = (titulo, lista, cols) => `<html><body style="margin:0;background:#120a24;font-family:DejaVu Sans;color:#fff">
<h1 style="margin:24px 0 8px;text-align:center;font-size:34px;letter-spacing:1px">${titulo}</h1>
<div style="display:grid;grid-template-columns:repeat(${cols},220px);gap:14px;justify-content:center;padding:16px 24px 28px">${lista.map(tarjeta).join('')}</div>
<style>.t{background:linear-gradient(#2a1b54,#3c1d5e);border:3px solid #f5c542;border-radius:14px;text-align:center;padding:6px 4px 10px}.f svg{width:200px;height:400px}b{display:block;background:#6a2bb0;border-radius:8px;margin:2px 8px 0;padding:5px;font-size:15px}</style></body></html>`;
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ deviceScaleFactor: 1, viewport: { width: 1300, height: 900 } });
  const todos = [...ELENCO, ...ESPECIALES];
  await pg.setContent(pagina('LA MANSIÓN VIP 2 · PERSONAJES', todos, 5));
  await pg.screenshot({ path: path.join(out, 'elenco.png'), fullPage: true });
  for (const p of todos) {
    await pg.setContent(`<html><body style="margin:0;background:transparent">${dibujar(p)}</body><style>svg{width:480px;height:960px;display:block}</style></html>`);
    await pg.setViewportSize({ width: 480, height: 960 });
    await pg.screenshot({ path: path.join(out, 'personajes', p.id + '.png'), omitBackground: true });
  }
  await b.close();
})();
