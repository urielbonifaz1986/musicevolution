// Mansión VIP 2 — generador de personajes caricatura (SVG).
// Cada personaje es una ficha de rasgos; dibujar(p) devuelve el <svg> completo.
// Lienzo: 240 × 480, centro x = 120, pies en y ≈ 462.

const PIEL = {
  clara: '#f3d2b8', claraRosa: '#f0c8b0', media: '#dfae88', morena: '#c48d64',
  morenaOscura: '#9a6643', oscura: '#5e3a24'
};

const CUERPO = {           // medias anchuras: hombro, cintura, cadera, pierna
  delgado:  { h: 36, c: 27, k: 29, p: 12 },
  atletico: { h: 45, c: 31, k: 31, p: 14 },
  curvy:    { h: 38, c: 25, k: 45, p: 17 },
  grueso:   { h: 50, c: 46, k: 48, p: 18 },
  musculoso:{ h: 52, c: 33, k: 33, p: 16 }
};

function oscurecer(hex, f = 0.75) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ---------- capas ----------
function pelloAtras(p) {
  const c = p.pelo.color, o = oscurecer(c, 0.8), e = p.pelo.estilo;
  if (e === 'largoLiso') return `<path d="M76 62 Q74 20 120 18 Q166 20 164 62 L170 205 Q120 220 70 205 Z" fill="${c}"/><path d="M100 60 L96 200 M140 60 L144 200" stroke="${o}" stroke-width="2" opacity=".5"/>`;
  if (e === 'largoOndulado') return `<path d="M76 62 Q72 18 120 16 Q168 18 164 62 Q178 100 166 130 Q182 160 166 190 Q176 210 150 214 Q120 222 90 214 Q64 210 74 190 Q58 160 74 130 Q62 100 76 62Z" fill="${c}"/><path d="M84 90 Q74 130 86 170 M156 90 Q166 130 154 170" stroke="${o}" stroke-width="3" fill="none" opacity=".5"/>`;
  if (e === 'rizado') {
    let s = '';
    const pts = [[80,40],[96,24],[120,18],[144,24],[160,40],[168,62],[170,86],[166,110],[160,132],[150,146],[90,146],[80,132],[74,110],[70,86],[72,62]];
    for (const [x, y] of pts) s += `<circle cx="${x}" cy="${y}" r="17" fill="${c}"/>`;
    return s + `<rect x="78" y="40" width="84" height="100" fill="${c}"/>`;
  }
  if (e === 'melena') return `<path d="M78 60 Q76 20 120 18 Q164 20 162 60 Q170 98 164 122 Q150 132 136 124 L120 110 L104 124 Q90 132 76 122 Q70 98 78 60Z" fill="${c}"/>`;
  if (e === 'rastas') { let s=''; for (let i=0;i<9;i++){const x=86+i*8.5; s+=`<path d="M${x} 50 L${x+(i<4?-6:6)} 118" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;} return s; }
  return '';
}

function peloFrente(p) {
  const c = p.pelo.color, o = oscurecer(c, 0.8), e = p.pelo.estilo;
  if (e === 'largoLiso' || e === 'largoOndulado' || e === 'melena')
    return `<path d="M83 70 Q80 22 120 20 Q160 22 157 70 Q154 50 142 44 Q130 52 112 52 Q96 54 88 62 Q85 66 83 70Z" fill="${c}"/><path d="M120 22 Q110 36 96 50 M126 24 Q132 38 146 46" stroke="${o}" stroke-width="2" fill="none"/>`;
  if (e === 'rizado') { let s=''; for (const [x,y] of [[92,40],[106,30],[122,28],[138,32],[150,44]]) s+=`<circle cx="${x}" cy="${y}" r="12" fill="${c}"/>`; return s; }
  if (e === 'corto') return `<path d="M86 64 Q82 22 122 22 Q160 24 156 62 Q150 44 136 40 Q118 34 100 42 Q90 48 86 64Z" fill="${c}"/>`;
  if (e === 'esponjado') return `<path d="M84 66 Q74 30 96 20 Q110 8 128 14 Q152 10 160 34 Q166 50 156 64 Q148 42 130 40 Q112 46 96 44 Q88 52 84 66Z" fill="${c}"/><path d="M98 24 Q108 34 104 44 M124 16 Q130 28 124 40 M146 24 Q148 36 142 44" stroke="${o}" stroke-width="2.5" fill="none"/>`;
  if (e === 'parado') return `<path d="M86 62 Q84 28 100 20 L106 8 L116 18 L124 4 L132 18 L144 8 L146 24 Q158 32 156 62 Q148 42 120 40 Q96 42 86 62Z" fill="${c}"/>`;
  if (e === 'rapado') return `<path d="M86 62 Q84 26 120 24 Q156 26 154 62 Q140 40 120 38 Q100 40 86 62Z" fill="${c}" opacity=".85"/>`;
  return '';
}

function gorro(p) {
  const g = p.gorro; if (!g) return '';
  if (g.tipo === 'gorra') return `<path d="M84 56 Q84 20 120 20 Q156 20 156 56 Z" fill="${g.color}"/><path d="M84 56 Q120 50 168 58 Q170 66 150 64 Q120 60 84 62Z" fill="${oscurecer(g.color,.7)}"/>${g.texto?`<text x="120" y="44" font-size="9" font-weight="700" text-anchor="middle" fill="${g.textoColor||'#fff'}" font-family="DejaVu Sans">${g.texto}</text>`:''}`;
  if (g.tipo === 'gorraAtras') return `<path d="M84 56 Q84 20 120 20 Q156 20 156 56 Z" fill="${g.color}"/><path d="M80 52 Q64 50 66 58 Q76 62 88 58Z" fill="${oscurecer(g.color,.7)}"/>`;
  if (g.tipo === 'durag') return `<path d="M83 64 Q80 18 120 18 Q160 18 157 64 Q140 50 120 50 Q100 50 83 64Z" fill="${g.color}"/><path d="M90 52 Q120 44 150 52" stroke="${oscurecer(g.color,.6)}" stroke-width="3" fill="none"/><path d="M150 52 Q170 70 160 96" stroke="${g.color}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (g.tipo === 'paliacate') return `<path d="M82 62 Q80 20 120 20 Q160 20 158 62 Q140 48 120 48 Q100 48 82 62Z" fill="${g.color}"/><g fill="${g.color2||'#333'}" opacity=".8"><circle cx="100" cy="34" r="3"/><circle cx="118" cy="28" r="3"/><circle cx="136" cy="36" r="3"/><circle cx="110" cy="44" r="2.5"/><circle cx="146" cy="48" r="2.5"/></g><path d="M156 56 L172 70 L160 74Z" fill="${g.color}"/>`;
  return '';
}

function cara(p) {
  const piel = p.piel, sombra = oscurecer(piel, .88), mujer = p.genero === 'f';
  const ancho = p.caraAncha ? 36 : 32;
  let s = `<ellipse cx="${120-ancho}" cy="74" rx="6" ry="9" fill="${sombra}"/><ellipse cx="${120+ancho}" cy="74" rx="6" ry="9" fill="${sombra}"/>`;
  s += `<path d="M${120-ancho} 56 Q${120-ancho} 20 120 22 Q${120+ancho} 20 ${120+ancho} 56 Q${120+ancho} 96 ${p.edad==='mayor'?136:132} 106 Q120 ${p.caraAncha?116:112} ${p.edad==='mayor'?104:108} 106 Q${120-ancho} 96 ${120-ancho} 56Z" fill="${piel}"/>`;
  if (p.aretes) s += `<circle cx="${120-ancho}" cy="86" r="${p.aretes==='aro'?6:3}" fill="none" stroke="${p.aretesColor||'#e3b341'}" stroke-width="2"/><circle cx="${120+ancho}" cy="86" r="${p.aretes==='aro'?6:3}" fill="none" stroke="${p.aretesColor||'#e3b341'}" stroke-width="2"/>`;
  // cejas
  const ce = p.pelo.cejas || oscurecer(p.pelo.color === '#f2e2b0' || p.pelo.color === '#e9d39b' ? '#a07a4a' : p.pelo.color, .9);
  s += `<path d="M100 60 Q107 ${mujer?55:57} 114 60" stroke="${ce}" stroke-width="${mujer?2.6:3.6}" fill="none" stroke-linecap="round"/><path d="M126 60 Q133 ${mujer?55:57} 140 60" stroke="${ce}" stroke-width="${mujer?2.6:3.6}" fill="none" stroke-linecap="round"/>`;
  // ojos
  for (const x of [107, 133]) {
    s += `<ellipse cx="${x}" cy="70" rx="6" ry="${mujer?4.6:4}" fill="#fff"/><circle cx="${x}" cy="70.5" r="3.2" fill="${p.ojos||'#4a2f1d'}"/><circle cx="${x+1}" cy="69.5" r="1" fill="#fff"/>`;
    if (mujer) s += `<path d="M${x-7} 68 Q${x} 63 ${x+7} 67 L${x+9} 64" stroke="#1d1d1d" stroke-width="2" fill="none"/>`;
  }
  if (p.edad === 'mayor') s += `<path d="M98 76 Q101 78 104 76 M136 76 Q139 78 142 76" stroke="${oscurecer(piel,.8)}" stroke-width="1.2" fill="none"/>`;
  // nariz
  s += `<path d="M120 72 Q117 82 115 86 Q120 89 125 86" stroke="${oscurecer(piel,.72)}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  // mejillas
  if (mujer) s += `<ellipse cx="100" cy="84" rx="6" ry="3.5" fill="#e88a8a" opacity=".35"/><ellipse cx="140" cy="84" rx="6" ry="3.5" fill="#e88a8a" opacity=".35"/>`;
  // boca
  const labio = p.labios || (mujer ? '#c4505a' : oscurecer(piel, .6));
  if (p.boca === 'sonrisa') s += `<path d="M106 94 Q120 106 134 94 Q120 100 106 94Z" fill="#fff" stroke="${labio}" stroke-width="2.5"/>`;
  else if (p.boca === 'seria') s += `<path d="M110 96 Q120 98 130 96" stroke="${labio}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  else s += `<path d="M108 94 Q120 101 132 94" stroke="${labio}" stroke-width="${mujer?4:3}" fill="none" stroke-linecap="round"/>`;
  // tatuajes de cara
  if (p.tatuajeCara) s += `<g stroke="#2a3a4a" stroke-width="1.4" fill="none" opacity=".8"><path d="M144 54 l4 -4 l4 4 l-4 4z"/><path d="M96 80 q-4 6 0 10"/><path d="M142 92 l6 2 M142 96 l6 2"/><text x="112" y="50" font-size="6" fill="#2a3a4a" stroke="none" font-family="DejaVu Sans">✦ ✦</text></g>`;
  // barba
  if (p.barba === 'completa') s += `<path d="M${120-ancho} 64 Q${120-ancho+2} 104 120 ${p.caraAncha?122:118} Q${120+ancho-2} 104 ${120+ancho} 64 Q${120+ancho-6} 90 136 92 Q120 86 104 92 Q${120-ancho+6} 90 ${120-ancho} 64Z" fill="${p.pelo.barbaColor||p.pelo.color}"/><path d="M106 92 Q120 86 134 92 Q120 96 106 92Z" fill="${p.pelo.barbaColor||p.pelo.color}"/><path d="M110 98 Q120 102 130 98" stroke="#8a3f3f" stroke-width="2.5" fill="none"/>`;
  if (p.barba === 'candado') s += `<path d="M106 92 Q120 86 134 92 L132 96 Q120 92 108 96Z M110 102 Q120 112 130 102 L128 108 Q120 116 112 108Z" fill="${p.pelo.color}"/>`;
  if (p.barba === 'sombra') s += `<path d="M${122-ancho} 76 Q${122-ancho} 104 120 112 Q${118+ancho} 104 ${118+ancho} 76 Q${118+ancho} 98 120 100 Q${122-ancho} 98 ${122-ancho} 76Z" fill="${p.pelo.color}" opacity=".35"/>`;
  // lentes
  if (p.lentes === 'sol') s += `<g><rect x="96" y="62" width="21" height="15" rx="5" fill="#141414"/><rect x="123" y="62" width="21" height="15" rx="5" fill="#141414"/><path d="M117 67 L123 67 M96 66 L${120-ancho} 64 M144 66 L${120+ancho} 64" stroke="#141414" stroke-width="2.5"/><path d="M100 65 L106 65" stroke="#fff" stroke-width="1.5" opacity=".5"/></g>`;
  if (p.lentes === 'graduados') s += `<g fill="none" stroke="${p.lentesColor||'#1a1a1a'}" stroke-width="2.5"><rect x="96" y="62" width="21" height="16" rx="4"/><rect x="123" y="62" width="21" height="16" rx="4"/><path d="M117 68 L123 68 M96 67 L${120-ancho} 65 M144 67 L${120+ancho} 65"/></g>`;
  return s;
}

function piernas(p, b) {
  const piel = p.piel, ab = p.abajo;
  const izq = 120 - b.k / 2 - 2, der = 120 + b.k / 2 + 2;
  let s = '';
  // piernas de piel (visibles si falda/short/vestido)
  s += `<path d="M${izq-b.p} 250 L${izq-b.p+4} 440 L${izq+b.p-4} 440 L${izq+b.p} 250Z M${der-b.p} 250 L${der-b.p+4} 440 L${der+b.p-4} 440 L${der+b.p} 250Z" fill="${piel}"/>`;
  if (ab.tipo === 'pantalon' || ab.tipo === 'ancho' || ab.tipo === 'cargo') {
    const extra = ab.tipo === 'ancho' ? 10 : ab.tipo === 'cargo' ? 6 : 1;
    s += `<path d="M${120-b.k} 236 L${izq-b.p-extra} 446 L${izq+b.p+extra-2} 446 L120 278 L${der-b.p-extra+2} 446 L${der+b.p+extra} 446 L${120+b.k} 236Z" fill="${ab.color}"/>`;
    s += `<path d="M120 278 L120 250" stroke="${oscurecer(ab.color,.7)}" stroke-width="2"/>`;
    if (ab.tipo === 'cargo' && ab.camuflaje) {
      s += `<g fill="${ab.camuflaje}" opacity=".85"><ellipse cx="${izq}" cy="300" rx="9" ry="5"/><ellipse cx="${izq+6}" cy="360" rx="8" ry="6"/><ellipse cx="${der}" cy="320" rx="9" ry="5"/><ellipse cx="${der-4}" cy="400" rx="7" ry="5"/><ellipse cx="${izq-4}" cy="420" rx="7" ry="4"/></g><rect x="${izq-b.p-4}" y="320" width="14" height="18" rx="2" fill="${oscurecer(ab.color,.8)}"/><rect x="${der+b.p-10}" y="320" width="14" height="18" rx="2" fill="${oscurecer(ab.color,.8)}"/>`;
    }
    if (ab.raya) s += `<path d="M${izq-b.p-extra+2} 446 L${120-b.k+2} 240" stroke="${ab.raya}" stroke-width="3"/>`;
  } else if (ab.tipo === 'falda') {
    s += `<path d="M${120-b.k} 236 L${120-b.k-10} ${ab.largo||300} L${120+b.k+10} ${ab.largo||300} L${120+b.k} 236Z" fill="${ab.color}"/><path d="M${120-b.k+6} 250 L${120-b.k} ${ab.largo||300} M120 240 L120 ${ab.largo||300} M${120+b.k-6} 250 L${120+b.k} ${ab.largo||300}" stroke="${oscurecer(ab.color,.8)}" stroke-width="1.5"/>`;
  } else if (ab.tipo === 'short') {
    s += `<path d="M${120-b.k} 236 L${izq-b.p-3} 300 L${izq+b.p} 300 L120 268 L${der-b.p} 300 L${der+b.p+3} 300 L${120+b.k} 236Z" fill="${ab.color}"/>`;
  }
  // zapatos
  const z = p.zapatos;
  for (const x of [izq, der]) {
    if (z.tipo === 'tenis') s += `<path d="M${x-15} 448 Q${x-16} 436 ${x-8} 436 L${x+10} 436 Q${x+20} 440 ${x+20} 452 L${x-15} 452Z" fill="${z.color}"/><rect x="${x-16}" y="450" width="37" height="6" rx="3" fill="${z.suela||'#fff'}"/>`;
    else if (z.tipo === 'botas') s += `<path d="M${x-13} ${z.alto||370} L${x+12} ${z.alto||370} L${x+12} 440 Q${x+22} 444 ${x+20} 456 L${x-14} 456Z" fill="${z.color}"/>${z.calcetin?`<rect x="${x-14}" y="${(z.alto||370)-8}" width="27" height="10" fill="${z.calcetin}"/>`:''}`;
    else if (z.tipo === 'tacon') s += `<path d="M${x-10} 440 Q${x+2} 436 ${x+16} 448 L${x+16} 454 L${x-10} 450Z" fill="${z.color}"/><rect x="${x-10}" y="446" width="3" height="12" fill="${z.color}"/>`;
    else if (z.tipo === 'trabajo') s += `<path d="M${x-16} 434 L${x+10} 434 Q${x+22} 438 ${x+22} 454 L${x-16} 454Z" fill="${z.color}"/><rect x="${x-17}" y="452" width="40" height="6" rx="2" fill="${oscurecer(z.color,.6)}"/>`;
    else if (z.tipo === 'descalzo') s += `<ellipse cx="${x+2}" cy="448" rx="13" ry="6" fill="${piel}"/>`;
  }
  return s;
}

function torso(p, b) {
  const a = p.arriba, piel = p.piel;
  let s = '';
  // cuello
  s += `<rect x="110" y="98" width="20" height="22" fill="${oscurecer(piel,.92)}"/>`;
  const forma = (top, bajo) => `M${120-14} 112 Q${120-b.h} 112 ${120-b.h} ${top} L${120-b.c} 214 Q${120-b.k} 236 ${120-b.k} ${bajo} L${120+b.k} ${bajo} Q${120+b.k} 236 ${120+b.c} 214 L${120+b.h} ${top} Q${120+b.h} 112 ${120+14} 112Z`;
  if (a.tipo === 'vestido') {
    s += `<path d="${forma(126, 250)}" fill="${a.color}"/><path d="M${120-b.k} 248 L${120-b.k-8} ${a.largo||310} L${120+b.k+8} ${a.largo||310} L${120+b.k} 248Z" fill="${a.color}"/>`;
    if (a.brillo) s += `<g fill="${a.brillo}" opacity=".7">${Array.from({length:40},(_,i)=>`<circle cx="${120-b.k+((i*37)%(2*b.k))}" cy="${120+((i*53)%(a.largo||310)-120)}" r="1.6"/>`).join('')}</g>`;
    if (a.tirantes) s += `<rect x="${120-b.h}" y="100" width="${2*b.h}" height="26" fill="${piel}"/><path d="M${120-b.h+12} 126 L${120-b.h+14} 104 M${120+b.h-12} 126 L${120+b.h-14} 104" stroke="${a.color}" stroke-width="3"/><path d="M${120-b.h+4} 128 Q120 140 ${120+b.h-4} 128" fill="${a.color}"/>`;
  } else {
    s += `<path d="${forma(126, a.corto ? 222 : 246)}" fill="${a.color}"/>`;
    if (a.corto) s += `<path d="M${120-b.c} 222 L${120-b.k} 238 L${120+b.k} 238 L${120+b.c} 222Z" fill="${piel}"/>`;
    if (a.tipo === 'malla') s += `<g fill="${a.puntos||'#c9c9d6'}">${Array.from({length:70},(_,i)=>`<circle cx="${120-b.h+6+((i*29)%(2*b.h-12))}" cy="${120+((i*41)%120)}" r="1.4"/>`).join('')}</g>`;
    if (a.tipo === 'sudadera') s += `<path d="M120 112 L120 246" stroke="${oscurecer(a.color,.6)}" stroke-width="2.5"/><path d="M104 112 Q120 126 136 112" stroke="${oscurecer(a.color,.6)}" stroke-width="3" fill="none"/><path d="M112 118 L110 150 M128 118 L130 150" stroke="#ccc" stroke-width="1.5"/>`;
    if (a.tipo === 'chaleco') s += `<path d="M120 114 L120 246" stroke="#000" stroke-width="2"/><path d="M106 112 L120 160 L134 112" fill="${piel}"/>`;
    if (a.tipo === 'blazer') s += `<path d="M${120-b.h} 126 L${120-b.c} 246 L108 246 L106 120 Z M${120+b.h} 126 L${120+b.c} 246 L132 246 L134 120Z" fill="${a.saco}"/><path d="M106 120 L114 150 L106 156 Z M134 120 L126 150 L134 156Z" fill="${oscurecer(a.saco,.85)}"/>`;
    if (a.tipo === 'escote') s += `<path d="M106 112 Q120 140 134 112" fill="${piel}"/>`;
    if (a.tipo === 'polo') s += `<path d="M104 110 L120 122 L136 110 L134 118 L120 128 L106 118Z" fill="${a.cuello||'#fff'}"/>`;
    if (a.tipo === 'tirantes') s += `<rect x="${120-b.h}" y="104" width="${2*b.h}" height="22" fill="${piel}"/><path d="M${120-b.h+10} 126 L${120-b.h+14} 104 M${120+b.h-10} 126 L${120+b.h-14} 104" stroke="${a.color}" stroke-width="4"/>`;
    if (a.estampado) s += `<g opacity=".9">${a.estampado.map((c,i)=>`<rect x="${120-b.h+8+(i%4)*((2*b.h-16)/4)}" y="${130+Math.floor(i/4)*28}" width="${(2*b.h-16)/4}" height="28" fill="${c}"/>`).join('')}</g>`;
    if (a.texto) s += `<text x="120" y="170" font-size="11" font-weight="700" text-anchor="middle" fill="${a.textoColor||'#fff'}" font-family="DejaVu Sans">${a.texto}</text>`;
  }
  if (p.cinturon) s += `<rect x="${120-b.k+1}" y="232" width="${2*b.k-2}" height="9" fill="${p.cinturon}"/>`;
  if (p.cadena) s += `<path d="M106 112 Q120 ${p.cadena==='larga'?160:136} 134 112" stroke="${p.cadenaColor||'#d4af37'}" stroke-width="3" fill="none" stroke-dasharray="3 2"/>`;
  if (p.collar) s += `<path d="M108 112 Q120 124 132 112" stroke="${p.collar}" stroke-width="2" fill="none"/>`;
  return s;
}

function brazos(p, b, lado) {
  const a = p.arriba, piel = p.piel, sx = lado < 0 ? 120 - b.h + 6 : 120 + b.h - 6;
  const pose = p.pose || 'cruzados';
  if (pose === 'cruzados') return ''; // se dibujan delante
  const mx = sx + lado * 8, hx = sx + lado * (pose === 'cadera' ? 4 : 10), hy = pose === 'cadera' ? 228 : 300;
  const ex = sx + lado * (pose === 'cadera' ? 28 : 12), ey = pose === 'cadera' ? 176 : 205;
  const grosor = b.h > 48 ? 22 : 18;
  const manga = a.manga === 'larga' ? 1 : a.manga === 'corta' ? 0.35 : a.manga === 'media' ? 0.6 : 0;
  let s = `<path d="M${sx} 124 Q${ex} ${ey-20} ${ex} ${ey} Q${ex} ${ey+20} ${hx} ${hy}" stroke="${piel}" stroke-width="${grosor}" fill="none" stroke-linecap="round"/>`;
  if (p.tatuajes && p.tatuajes.includes(lado < 0 ? 'izq' : 'der')) s += `<path d="M${sx} 140 Q${ex} ${ey-10} ${ex} ${ey} Q${ex} ${ey+16} ${hx} ${hy-12}" stroke="#2c3440" stroke-width="${grosor-6}" fill="none" stroke-dasharray="5 3 2 4" opacity=".55"/>`;
  if (manga > 0) {
    const fin = manga >= 1 ? `Q${ex} ${ey+20} ${hx} ${hy-8}` : manga > .5 ? `` : '';
    s += `<path d="M${sx} 124 Q${ex} ${ey-20} ${manga<.5? (sx+ex)/2 : ex} ${manga<.5? (124+ey)/2 : ey} ${fin}" stroke="${a.mangaColor||(a.tipo==='blazer'?a.saco:a.color)}" stroke-width="${grosor+3}" fill="none" stroke-linecap="round"/>`;
  }
  const mano = p.guantes || piel;
  s += `<circle cx="${hx}" cy="${hy}" r="${grosor/2+1}" fill="${mano}"/>`;
  return s;
}

function brazosCruzados(p, b) {
  const a = p.arriba, piel = p.piel, grosor = b.h > 48 ? 24 : 19;
  const manga = a.manga === 'larga' ? (a.mangaColor || (a.tipo==='blazer'?a.saco:a.color)) : null;
  let s = '';
  for (const lado of [-1, 1]) {
    const sx = 120 + lado * (b.h - 6);
    s += `<path d="M${sx} 124 Q${sx + lado*10} 160 ${sx} 186" stroke="${a.manga && a.manga!=='ninguna' ? (a.mangaColor||(a.tipo==='blazer'?a.saco:a.color)) : piel}" stroke-width="${grosor+2}" fill="none" stroke-linecap="round"/>`;
    if (p.tatuajes && p.tatuajes.includes(lado < 0 ? 'izq' : 'der') && (!a.manga || a.manga === 'ninguna' || a.manga==='corta')) s += `<path d="M${sx} 146 Q${sx + lado*10} 166 ${sx} 184" stroke="#2c3440" stroke-width="${grosor-8}" fill="none" stroke-dasharray="5 3 2 4" opacity=".55"/>`;
  }
  const antebrazo = manga || piel;
  s += `<path d="M${120-b.h+4} 186 L${120+b.h-14} 172" stroke="${antebrazo}" stroke-width="${grosor}" stroke-linecap="round"/><path d="M${120+b.h-4} 186 L${120-b.h+14} 174" stroke="${oscurecer(antebrazo,.93)}" stroke-width="${grosor}" stroke-linecap="round"/>`;
  if (p.tatuajes && !manga) s += `<path d="M${120-b.h+10} 184 L${120+b.h-20} 173" stroke="#2c3440" stroke-width="${grosor-8}" stroke-dasharray="5 3 2 4" opacity=".5"/>`;
  const mano = p.guantes || piel;
  s += `<circle cx="${120+b.h-12}" cy="172" r="${grosor/2}" fill="${mano}"/><circle cx="${120-b.h+12}" cy="174" r="${grosor/2}" fill="${mano}"/>`;
  return s;
}

function extras(p, b) {
  let s = '';
  if (p.bolsa) s += `<path d="M${120+b.h+4} 200 Q${120+b.h+14} 170 ${120+b.h+24} 200" stroke="${p.bolsa}" stroke-width="3" fill="none"/><rect x="${120+b.h}" y="198" width="30" height="24" rx="4" fill="${p.bolsa}"/>`;
  if (p.microfono) s += `<rect x="${120+b.h+2}" y="270" width="6" height="26" rx="2" fill="#222"/><circle cx="${120+b.h+5}" cy="266" r="7" fill="#555"/>`;
  if (p.chamarraAtada) s += `<path d="M${120-b.k-4} 236 Q120 252 ${120+b.k+4} 236 L${120+b.k+8} 290 Q${120+b.k} 300 ${120+b.k-6} 260 L${120-b.k+6} 260 Q${120-b.k} 300 ${120-b.k-8} 290Z" fill="${p.chamarraAtada}"/>`;
  return s;
}

// ---------- guardia ----------
function guardia(opts = {}) {
  const negro = '#141418', rojo = '#d8202a';
  const vibora = (x, y, flip) => {
    let s = ''; const d = flip ? -1 : 1;
    for (let i = 0; i < 9; i++) {
      const cx = x + Math.sin(i * 0.9) * 6 * d, cy = y + i * 7, col = [rojo, '#f5f5f5', '#111', '#f5f5f5'][i % 4];
      s += `<circle cx="${cx}" cy="${cy}" r="4.2" fill="${col}"/>`;
    }
    return s + `<ellipse cx="${x}" cy="${y-5}" rx="4" ry="5" fill="${rojo}"/>`;
  };
  let s = '';
  // piernas y botas
  s += `<path d="M86 236 L80 446 L114 446 L120 280 L126 446 L160 446 L154 236Z" fill="${negro}"/>`;
  s += vibora(96, 300, false) + vibora(146, 320, true);
  s += `<path d="M76 440 L116 440 L118 458 L72 458Z M124 440 L164 440 L168 458 L122 458Z" fill="#0a0a0a"/>`;
  // torso con capucha
  s += `<path d="M106 112 Q72 112 72 130 L82 214 Q84 240 86 246 L154 246 Q156 240 158 214 L168 130 Q168 112 134 112Z" fill="${negro}"/>`;
  s += `<path d="M120 116 L120 240" stroke="#2a2a30" stroke-width="2"/>`;
  // cinturón + cangurera roja + cadena
  s += `<rect x="84" y="226" width="72" height="10" fill="${rojo}"/><rect x="108" y="222" width="24" height="17" rx="4" fill="${rojo}" stroke="#7a0d12"/>`;
  s += `<path d="M150 236 Q160 270 176 286" stroke="#9aa0a6" stroke-width="3" fill="none" stroke-dasharray="4 2"/>`;
  // brazos
  s += `<path d="M76 126 Q62 190 72 296" stroke="${negro}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M164 126 Q178 190 170 290" stroke="${negro}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  s += vibora(70, 150, false) + vibora(172, 150, true);
  s += `<circle cx="72" cy="300" r="12" fill="#0b0b0b"/><circle cx="170" cy="294" r="12" fill="#0b0b0b"/>`;
  if (opts.maletin) s += `<rect x="150" y="300" width="50" height="38" rx="4" fill="#111" stroke="#333" stroke-width="2"/><rect x="166" y="292" width="18" height="10" rx="3" fill="none" stroke="#333" stroke-width="3"/>`;
  // capucha
  s += `<path d="M78 120 Q70 40 120 18 Q170 40 162 120 Q140 108 120 108 Q100 108 78 120Z" fill="#0e0e12"/>`;
  // casco con orejas
  s += `<path d="M90 44 L84 2 L104 30Z" fill="${negro}" stroke="${rojo}" stroke-width="2.5"/><path d="M150 44 L156 2 L136 30Z" fill="${negro}" stroke="${rojo}" stroke-width="2.5"/>`;
  s += `<path d="M88 56 Q88 24 120 22 Q152 24 152 56 L150 92 Q138 108 120 110 Q102 108 90 92Z" fill="#1c1c22" stroke="#33333c" stroke-width="2"/>`;
  s += `<path d="M120 26 L120 62" stroke="${rojo}" stroke-width="3"/><path d="M98 34 L110 50 M142 34 L130 50" stroke="${rojo}" stroke-width="2.5"/>`;
  // visor rojo que brilla
  s += `<path d="M94 64 L120 84 L146 64 L142 74 L120 94 L98 74Z" fill="#ff2b2b"/><path d="M94 64 L120 84 L146 64 L142 74 L120 94 L98 74Z" fill="#ff5a3c" opacity=".6" filter="url(#brillo)"/>`;
  s += `<path d="M104 96 L136 96 L130 104 L110 104Z" fill="#2a2a30"/>`;
  return s;
}

// ---------- ensamblado ----------
function dibujar(p, conFondo = false) {
  const defs = `<defs><filter id="brillo" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter></defs>`;
  const fondo = conFondo ? `<rect width="240" height="480" fill="${conFondo}"/>` : '';
  const sombraPiso = `<ellipse cx="120" cy="460" rx="70" ry="9" fill="#000" opacity=".18"/>`;
  if (p.guardia) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 480">${defs}${fondo}${sombraPiso}${guardia(p)}</svg>`;
  const b = CUERPO[p.cuerpo];
  let s = sombraPiso;
  s += pelloAtras(p);
  s += brazos(p, b, -1) + brazos(p, b, 1);
  s += piernas(p, b);
  s += torso(p, b);
  if (p.pose === 'cruzados' || !p.pose) s += brazosCruzados(p, b);
  s += extras(p, b);
  s += cara(p);
  s += p.gorro ? '' : peloFrente(p);
  s += gorro(p);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 480">${defs}${fondo}${s}</svg>`;
}

if (typeof module !== 'undefined') module.exports = { dibujar, PIEL };
