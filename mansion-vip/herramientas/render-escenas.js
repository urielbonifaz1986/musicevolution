const path = require('path');
const { chromium } = require('playwright');
const { foroRetos } = require('../escenas.js');
const { ELENCO, ESPECIALES } = require('../elenco.js');
const out = path.join(__dirname, '..', 'imagenes');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1600, height: 900 } });
  const g = ESPECIALES[0], fila = [g, ...ELENCO.filter(p => !['dani','abel'].includes(p.id)).slice(0, 12), g];
  for (const [nombre, svg] of [['foro-retos.png', foroRetos(fila)], ['foro-retos-vacio.png', foroRetos([])]]) {
    await pg.setContent(`<html><body style="margin:0">${svg}</body><style>svg{width:1600px;height:900px;display:block}</style></html>`);
    await pg.screenshot({ path: path.join(out, nombre) });
  }
  await b.close();
})();
