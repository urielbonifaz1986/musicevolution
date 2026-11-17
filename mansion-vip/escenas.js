// Escenas de la casa. Cada función devuelve un <svg> 1600×900.
const { dibujar } = typeof module !== 'undefined' ? require('./personajes.js') : window;

function colocar(p, x, piesY, alto) {
  const ancho = alto / 2;
  return dibujar(p).replace('<svg ', `<svg x="${x - ancho / 2}" y="${piesY - alto * 0.96}" width="${ancho}" height="${alto}" `);
}

function pasto(x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#pasto)"/>`;
  return s;
}

// ---------- Foro de retos con la pantalla LED del piso ----------
function foroRetos(personajes = [], opciones = {}) {
  const led = opciones.led || 'despensa';
  let s = `<defs>
    <pattern id="pasto" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#3f8f2c"/><path d="M1 8 L2 3 M4 8 L5 2 M7 8 L6 4" stroke="#5bb33b" stroke-width="1.2"/><path d="M3 8 L3 5" stroke="#2f7020" stroke-width="1"/></pattern>
    <linearGradient id="ledRojo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a2a6e"/><stop offset=".35" stop-color="#d42a5c"/><stop offset=".6" stop-color="#7a2a64"/><stop offset="1" stop-color="#e2346a"/></linearGradient>
    <linearGradient id="ledAzul" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b2a7a"/><stop offset=".5" stop-color="#1e6ae0"/><stop offset="1" stop-color="#0b2a7a"/></linearGradient>
    <linearGradient id="oro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#f2b33d"/><stop offset="1" stop-color="#b8701c"/></linearGradient>
    <radialGradient id="destello" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7aa8" stop-opacity=".7"/><stop offset="1" stop-color="#ff7aa8" stop-opacity="0"/></radialGradient>
    <filter id="suave"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>`;
  // pared de paneles geométricos
  s += `<rect width="1600" height="420" fill="#e94e2c"/>`;
  const paneles = [
    ['#e8452c', '0,0 260,0 200,420 0,420'], ['#2fa3d6', '0,180 230,420 0,420'], ['#f6b51e', '260,0 760,0 700,300 300,330'],
    ['#2fa3d6', '300,330 700,300 640,420 330,420'], ['#e94e2c', '700,300 760,0 900,0 880,420 640,420'], ['#f8c62a', '330,420 460,250 640,420'],
    ['#6ec8ef', '900,0 1010,0 1000,420 880,420'], ['#e94e2c', '1010,0 1180,0 1170,420 1000,420'], ['#2fa3d6', '1180,0 1240,0 1240,420 1170,420'],
    ['#c8202a', '1240,0 1480,0 1480,420 1240,420'], ['#6ec8ef', '1480,0 1600,0 1600,420 1480,420'], ['#f6b51e', '760,0 900,0 830,140']
  ];
  for (const [c, pts] of paneles) s += `<polygon points="${pts}" fill="${c}"/>`;
  s += `<path d="M260 0 L200 420 M760 0 L700 300 M900 0 L880 420" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  // puerta azul clara
  s += `<rect x="1028" y="120" width="130" height="300" fill="#8fd3f0" stroke="#5fb4dc" stroke-width="4"/><rect x="1140" y="260" width="6" height="40" fill="#3a7fa8"/>`;
  // logos
  s += `<text x="560" y="150" font-family="DejaVu Sans" font-weight="700" font-size="54" fill="#fff" text-anchor="middle" font-style="italic">Ruleti<tspan fill="#fff" font-size="64">X</tspan></text>`;
  s += `<text x="1360" y="120" font-family="DejaVu Serif" font-weight="700" font-size="46" fill="#fff" text-anchor="middle">BARULLO</text><path d="M1350 54 l10 -14 l10 14z" fill="#fff"/>`;
  // barra de Barullo a la izquierda
  s += `<rect x="0" y="250" width="300" height="170" fill="#c8302a"/><rect x="0" y="236" width="310" height="18" fill="#f2f2f2"/><rect x="20" y="150" width="250" height="80" fill="#1d2a3a" opacity=".55"/>`;
  s += `<text x="150" y="140" font-family="DejaVu Serif" font-weight="700" font-size="38" fill="url(#oro)" text-anchor="middle">BARULLO</text>`;
  for (const x of [280, 640, 1210]) s += `<rect x="${x-14}" y="380" width="28" height="40" fill="#6b4a32"/><g fill="#3e8a3a"><ellipse cx="${x}" cy="360" rx="34" ry="26"/><ellipse cx="${x-18}" cy="340" rx="18" ry="30" transform="rotate(-25 ${x-18} 340)"/><ellipse cx="${x+18}" cy="340" rx="18" ry="30" transform="rotate(25 ${x+18} 340)"/></g>`;
  // repisa blanca de cubos
  s += `<g fill="#f4f4f4" stroke="#d6d6d6" stroke-width="3"><rect x="690" y="300" width="80" height="60"/><rect x="690" y="360" width="80" height="60"/></g>`;
  // piso: pasto sintético alrededor
  s += pasto(0, 420, 1600, 480);
  s += `<rect x="0" y="420" width="1600" height="8" fill="#000" opacity=".15"/>`;
  // pantalla LED en el piso (en perspectiva)
  const ledPts = '560,470 1600,470 1600,860 60,860';
  if (led === 'despensa') {
    s += `<polygon points="${ledPts}" fill="url(#ledRojo)"/>`;
    s += `<ellipse cx="760" cy="700" rx="380" ry="90" fill="url(#destello)" filter="url(#suave)"/><ellipse cx="1250" cy="560" rx="260" ry="60" fill="url(#destello)" filter="url(#suave)"/>`;
    s += `<g transform="translate(0 0)"><text x="1270" y="690" font-family="DejaVu Sans" font-weight="700" font-style="italic" font-size="210" fill="url(#oro)" text-anchor="middle" transform="skewX(-12) translate(140 0)" stroke="#7a3a10" stroke-width="3">VS</text>`;
    s += `<text x="1270" y="770" font-family="DejaVu Sans" font-weight="700" font-style="italic" font-size="70" fill="url(#oro)" text-anchor="middle" stroke="#5a2a0a" stroke-width="2">RETO POR</text>`;
    s += `<text x="1270" y="840" font-family="DejaVu Sans" font-weight="700" font-style="italic" font-size="78" fill="url(#oro)" text-anchor="middle" stroke="#5a2a0a" stroke-width="2">DESPENSA</text>`;
    s += `<path d="M900 770 L1060 770 M940 790 L1060 790" stroke="#ffcf6a" stroke-width="6" stroke-linecap="round"/></g>`;
    s += `<text x="820" y="560" font-family="DejaVu Serif" font-weight="700" font-size="40" fill="#fff" opacity=".9" transform="skewX(-10)">BARULLO</text>`;
    // canasta de despensa
    s += `<g transform="translate(1360 500)"><rect x="0" y="20" width="150" height="70" rx="6" fill="none" stroke="#c9ccd2" stroke-width="5"/><path d="M0 40 H150 M0 60 H150 M30 20 V90 M60 20 V90 M90 20 V90 M120 20 V90" stroke="#c9ccd2" stroke-width="2"/><circle cx="30" cy="16" r="18" fill="#e9a23b"/><ellipse cx="70" cy="12" rx="24" ry="14" fill="#5aa83a"/><rect x="100" y="-14" width="26" height="34" rx="4" fill="#f2f2f2"/><circle cx="130" cy="18" r="14" fill="#e2452b"/></g>`;
  } else {
    // versión azul y oro de la otra transmisión
    s += `<polygon points="${ledPts}" fill="url(#ledAzul)"/>`;
    s += `<path d="M560 470 L760 860 M900 470 L1000 860 M1250 470 L1300 860 M300 860 L700 600 L1600 640" stroke="#f2b33d" stroke-width="10" opacity=".8" fill="none"/><path d="M200 760 L1600 560" stroke="#7fd0ff" stroke-width="5" opacity=".7"/>`;
  }
  s += `<polygon points="${ledPts}" fill="none" stroke="#111" stroke-width="4" opacity=".4"/>`;
  // coche tapado con lona mostaza
  s += `<path d="M20 520 Q30 450 120 440 L300 440 Q380 450 390 520 L400 600 L10 600Z" fill="#d9a23c"/><path d="M60 470 Q80 520 70 600 M200 446 Q210 520 200 600 M330 460 Q350 530 340 600" stroke="#b98326" stroke-width="5" fill="none"/><ellipse cx="205" cy="604" rx="200" ry="14" fill="#000" opacity=".18"/>`;
  // personajes en fila al fondo (pies sobre la línea del pasto)
  const n = personajes.length;
  personajes.forEach((p, i) => {
    const x = 800 + (i - (n - 1) / 2) * Math.min(80, 1100 / Math.max(n, 1)) + 150;
    s += colocar(p, x, 452, 240);
  });
  // podio azul con tapa blanca (al frente)
  s += `<g transform="translate(-330 10)"><polygon points="980,560 1130,560 1130,720 980,720" fill="#1d3fa8"/><polygon points="1130,560 1170,540 1170,700 1130,720" fill="#142e80"/><polygon points="980,560 1020,540 1170,540 1130,560" fill="#f4f4f4"/><rect x="1010" y="590" width="40" height="100" fill="#14318a"/><rect x="1068" y="520" width="6" height="30" fill="#bfc5cc"/></g>`;
  // marca de la página
  s += `<text x="40" y="880" font-family="DejaVu Sans" font-weight="700" font-size="22" fill="#fff" opacity=".85">Uriel Bonifaz · parodia</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">${s}</svg>`;
}

if (typeof module !== 'undefined') module.exports = { foroRetos };
