// Fichas de rasgos de cada personaje. "fuente" dice de dónde salió cada rasgo
// para poder corregirlo cuando Uriel mande más fotos.
const { PIEL } = typeof module !== 'undefined' ? require('./personajes.js') : window;

const NEGRO_GUANTE = '#111';
const ELENCO = [
  { id: 'karely', nombre: 'Karely Ruiz', genero: 'f', piel: PIEL.media, cuerpo: 'curvy', pose: 'cadera',
    pelo: { estilo: 'largoOndulado', color: '#1a1414' }, labios: '#b8323e', aretes: 'aro',
    arriba: { tipo: 'escote', color: '#c0172a', manga: 'larga' }, abajo: { tipo: 'falda', color: '#1b1b1b', largo: 300 },
    zapatos: { tipo: 'tacon', color: '#111' }, fuente: 'foto del elenco (pelo negro largo, rojo)' },

  { id: 'bellakath', nombre: 'Bellakath', genero: 'f', piel: PIEL.claraRosa, cuerpo: 'delgado', pose: 'cadera',
    pelo: { estilo: 'largoLiso', color: '#f2e2b0', cejas: '#7a5a3a' }, labios: '#a8243a', lentes: 'sol',
    arriba: { tipo: 'escote', color: '#6d0f1e', manga: 'ninguna' }, abajo: { tipo: 'falda', color: '#111', largo: 290 },
    zapatos: { tipo: 'botas', color: '#111', alto: 360 }, microfono: true, fuente: 'cartel "Confirmados" (rubia platinada, rojo vino)' },

  { id: 'paolita', nombre: 'Paolita Suárez', genero: 'f', piel: PIEL.morena, cuerpo: 'curvy', pose: 'cruzados',
    pelo: { estilo: 'rizado', color: '#1d1512' }, lentes: 'graduados', aretes: 'aro', labios: '#8f3a3a',
    arriba: { tipo: 'tirantes', color: '#c8641e', manga: 'ninguna', corto: true }, abajo: { tipo: 'short', color: '#c8641e' },
    chamarraAtada: '#6e8fc9', zapatos: { tipo: 'descalzo' }, guantes: null, fuente: 'captura del reto (naranja, chamarra de mezclilla en la cintura) (?)' },

  { id: 'alegria', nombre: 'Doña Alegría', genero: 'f', edad: 'mayor', piel: PIEL.claraRosa, cuerpo: 'grueso', pose: 'cadera', boca: 'sonrisa',
    pelo: { estilo: 'melena', color: '#e9d39b', cejas: '#8a6a42' }, labios: '#c2455a', aretes: 'chico', caraAncha: true,
    arriba: { tipo: 'blazer', color: '#d4a52a', saco: '#f4f1ea', manga: 'larga' }, abajo: { tipo: 'pantalon', color: '#b9a582' },
    zapatos: { tipo: 'tenis', color: '#f2f2f2' }, guantes: NEGRO_GUANTE, fuente: 'video del reto (saco blanco, blusa mostaza, pantalón caqui) + foto' },

  { id: 'itati', nombre: 'Itatí López', genero: 'f', piel: PIEL.media, cuerpo: 'delgado', pose: 'cadera',
    pelo: { estilo: 'largoLiso', color: '#2a1d17' }, labios: '#b5525a',
    arriba: { tipo: 'escote', color: '#f3eee8', manga: 'larga' }, abajo: { tipo: 'pantalon', color: '#2f3b52' },
    zapatos: { tipo: 'tenis', color: '#fff' }, fuente: 'fotos del elenco (pelo oscuro lacio, blusa blanca)' },

  { id: 'tony', nombre: 'Tony Aguirre', genero: 'm', piel: PIEL.media, cuerpo: 'grueso', pose: 'cruzados', caraAncha: true,
    pelo: { estilo: 'parado', color: '#151110' }, barba: 'completa', lentes: 'sol',
    arriba: { tipo: 'polo', color: '#e9e0cc', manga: 'larga', cuello: '#e9e0cc' }, abajo: { tipo: 'pantalon', color: '#2b2b2b' },
    zapatos: { tipo: 'tenis', color: '#111' }, cadena: 'corta', fuente: 'fotos del elenco (barba negra, lentes oscuros, camisa beige)' },

  { id: 'joao', nombre: 'João Ferreira', genero: 'm', piel: PIEL.clara, cuerpo: 'delgado', pose: 'normal', boca: 'sonrisa',
    pelo: { estilo: 'esponjado', color: '#6b4a2e' },
    arriba: { tipo: 'playera', color: '#111', manga: 'corta', texto: '✓', textoColor: '#fff' }, abajo: { tipo: 'pantalon', color: '#d9d9d9' },
    zapatos: { tipo: 'tenis', color: '#fff' }, fuente: 'fotos del elenco (pelo castaño, playera negra deportiva)' },

  { id: 'edwin', nombre: 'Edwin Mendoza', genero: 'm', piel: PIEL.clara, cuerpo: 'delgado', pose: 'normal',
    pelo: { estilo: 'esponjado', color: '#1c1512' }, barba: 'sombra',
    arriba: { tipo: 'playera', color: '#1b1b1b', manga: 'corta' }, abajo: { tipo: 'pantalon', color: '#3c3c3c' },
    zapatos: { tipo: 'tenis', color: '#fff' }, fuente: 'fotos del elenco (pelo oscuro ondulado)' },

  { id: 'cintia', nombre: 'Cintia Cossio', genero: 'f', piel: PIEL.morena, cuerpo: 'curvy', pose: 'cadera',
    pelo: { estilo: 'largoLiso', color: '#1e1512' }, tatuajes: ['izq'], labios: '#9c3c46',
    arriba: { tipo: 'escote', color: '#efe3e6', manga: 'ninguna', corto: true }, abajo: { tipo: 'pantalon', color: '#1b1b1b' },
    zapatos: { tipo: 'tenis', color: '#fff' }, fuente: 'fotos del elenco (pelo largo oscuro, tatuaje en brazo)' },

  { id: 'rod', nombre: 'Rod Contreras', genero: 'm', piel: PIEL.media, cuerpo: 'atletico', pose: 'normal',
    pelo: { estilo: 'corto', color: '#2a1e17' }, barba: 'sombra', lentes: 'sol', tatuajes: ['izq', 'der'],
    arriba: { tipo: 'tirantes', color: '#f4f4f4', manga: 'ninguna' }, abajo: { tipo: 'pantalon', color: '#1d1d1d' },
    zapatos: { tipo: 'tenis', color: '#111' }, cadena: 'larga', cadenaColor: '#c9c9c9', fuente: 'fotos del elenco (camiseta blanca de tirantes, cadena, tatuajes)' },

  { id: 'cukis', nombre: 'Cukis', genero: 'f', piel: PIEL.clara, cuerpo: 'delgado', pose: 'normal',
    pelo: { estilo: 'largoLiso', color: '#1a1412' }, labios: '#a3404a',
    arriba: { tipo: 'vestido', color: '#141414', manga: 'larga', largo: 300 }, abajo: { tipo: 'ninguno' },
    zapatos: { tipo: 'tacon', color: '#111' }, bolsa: '#a3122a', fuente: 'foto del elenco (negro, bolsa roja)' },

  { id: 'jorjais', nombre: 'Jorjais', genero: 'm', piel: PIEL.clara, cuerpo: 'atletico', pose: 'normal',
    pelo: { estilo: 'corto', color: '#1a1412' }, barba: 'sombra',
    arriba: { tipo: 'playera', color: '#f3f3f3', manga: 'corta' }, abajo: { tipo: 'pantalon', color: '#2b2b2b' },
    zapatos: { tipo: 'tenis', color: '#fff' }, fuente: 'foto del elenco (pelo oscuro, barba ligera, camisa blanca)' },

  { id: 'jlexis', nombre: 'Jlexis', genero: 'm', piel: PIEL.clara, cuerpo: 'atletico', pose: 'normal',
    pelo: { estilo: 'corto', color: '#3a2a1e' }, tatuajes: ['izq', 'der'], cadena: 'corta', cadenaColor: '#c9c9c9',
    arriba: { tipo: 'tirantes', color: '#f4f4f4', manga: 'ninguna' }, abajo: { tipo: 'pantalon', color: '#2f2f2f' },
    zapatos: { tipo: 'tenis', color: '#fff' }, fuente: 'foto del elenco (camiseta blanca de tirantes, tatuajes, micrófono de solapa)' },

  { id: 'odette', nombre: 'Odette Orlena', genero: 'f', piel: PIEL.clara, cuerpo: 'delgado', pose: 'normal',
    pelo: { estilo: 'largoLiso', color: '#3b2418' }, labios: '#b4505a',
    arriba: { tipo: 'escote', color: '#1a1a1a', manga: 'larga' }, abajo: { tipo: 'pantalon', color: '#1a1a1a' },
    zapatos: { tipo: 'botas', color: '#111', alto: 400 }, fuente: 'foto del elenco (pelo castaño oscuro largo, ropa oscura)' },

  { id: 'dani', nombre: 'Dani Flow', genero: 'm', piel: PIEL.morena, cuerpo: 'grueso', pose: 'normal', caraAncha: true, tatuajeCara: true,
    pelo: { estilo: 'rapado', color: '#1a1412' }, gorro: { tipo: 'durag', color: '#1f3fa0' }, barba: 'candado',
    arriba: { tipo: 'playera', color: '#f4f4f4', manga: 'corta' }, abajo: { tipo: 'pantalon', color: '#1f3fa0' },
    zapatos: { tipo: 'tenis', color: '#fff' }, cadena: 'larga', fuente: 'foto del elenco (tatuajes en la cara, gorro azul) — ya salió' },

  { id: 'abel', nombre: 'Abel Robles', genero: 'm', piel: PIEL.media, cuerpo: 'atletico', pose: 'normal',
    pelo: { estilo: 'corto', color: '#1a1412' }, gorro: { tipo: 'gorra', color: '#f2f2f2', texto: 'NY', textoColor: '#111' }, lentes: 'sol', barba: 'sombra',
    arriba: { tipo: 'sudadera', color: '#f0f0f0', manga: 'larga', estampado: ['#111', '#f0f0f0', '#111', '#f0f0f0'] }, abajo: { tipo: 'pantalon', color: '#1d1d1d' },
    zapatos: { tipo: 'tenis', color: '#111' }, fuente: 'foto del elenco (gorra blanca, lentes) — primer eliminado' },

  // ----- de la captura del reto, falta confirmar quién es cada uno -----
  { id: 'reto1', nombre: '¿Deiby Ruiz?', genero: 'm', piel: PIEL.oscura, cuerpo: 'musculoso', pose: 'cruzados',
    pelo: { estilo: 'rastas', color: '#151010' }, gorro: { tipo: 'gorra', color: '#7a5a3c' }, barba: 'sombra',
    arriba: { tipo: 'playera', color: '#141414', manga: 'corta' }, abajo: { tipo: 'pantalon', color: '#4a3324' }, cinturon: '#111',
    zapatos: { tipo: 'tenis', color: '#2b2b2b' }, guantes: null, fuente: 'captura del reto, 1º de izquierda — confirmar nombre' },

  { id: 'reto2', nombre: '¿? (paliacate)', genero: 'f', piel: PIEL.clara, cuerpo: 'delgado', pose: 'cruzados',
    pelo: { estilo: 'largoLiso', color: '#d9b77a', cejas: '#8a6a42' }, gorro: { tipo: 'paliacate', color: '#e8e2d4', color2: '#3a3a3a' },
    arriba: { tipo: 'playera', color: '#eceaf0', manga: 'larga', mangaColor: '#a9c4e6', corto: true }, abajo: { tipo: 'falda', color: '#6b6b6b', largo: 296 },
    zapatos: { tipo: 'tacon', color: '#e9d9c4' }, guantes: NEGRO_GUANTE, fuente: 'captura del reto, 2º de izquierda — confirmar nombre' },

  { id: 'reto3', nombre: '¿? (sudadera negra)', genero: 'm', piel: PIEL.media, cuerpo: 'atletico', pose: 'normal',
    pelo: { estilo: 'rapado', color: '#111' }, gorro: { tipo: 'durag', color: '#141414' }, barba: 'sombra',
    arriba: { tipo: 'sudadera', color: '#151515', manga: 'larga' }, abajo: { tipo: 'cargo', color: '#6b6a4e', camuflaje: '#3d3a2a' },
    zapatos: { tipo: 'trabajo', color: '#c88a3a' }, guantes: NEGRO_GUANTE, fuente: 'video del reto (sudadera negra, pantalón camuflaje, botas amarillas) — confirmar nombre' },

  { id: 'reto4', nombre: '¿? (pantalón rosa)', genero: 'm', piel: PIEL.media, cuerpo: 'delgado', pose: 'normal',
    pelo: { estilo: 'rapado', color: '#111' }, gorro: { tipo: 'durag', color: '#111' }, collar: '#eee',
    arriba: { tipo: 'malla', color: '#f2f0f2', manga: 'media', puntos: '#b9b4c9' }, abajo: { tipo: 'ancho', color: '#f2a6c4' }, cinturon: '#111',
    zapatos: { tipo: 'tenis', color: '#eee' }, guantes: NEGRO_GUANTE, fuente: 'captura y video del reto (malla blanca, pantalón rosa ancho) — confirmar nombre' },

  { id: 'reto5', nombre: '¿? (vestido de mezclilla)', genero: 'f', piel: PIEL.clara, cuerpo: 'curvy', pose: 'normal',
    pelo: { estilo: 'largoLiso', color: '#0f0f12' }, lentes: 'graduados', tatuajes: ['izq', 'der'],
    arriba: { tipo: 'vestido', color: '#5d6878', manga: 'corta', largo: 300 }, abajo: { tipo: 'ninguno' },
    zapatos: { tipo: 'botas', color: '#111', alto: 380, calcetin: '#f2f2f2' }, guantes: NEGRO_GUANTE, fuente: 'captura del reto, 5º (lentes, tatuajes, botas negras) — confirmar nombre' },

  { id: 'reto6', nombre: '¿? (chaleco negro)', genero: 'm', piel: PIEL.clara, cuerpo: 'atletico', pose: 'normal',
    pelo: { estilo: 'esponjado', color: '#1a1412' }, tatuajes: ['izq'], collar: '#222',
    arriba: { tipo: 'chaleco', color: '#151515', manga: 'ninguna' }, abajo: { tipo: 'ancho', color: '#151515' },
    zapatos: { tipo: 'tenis', color: '#f2f2f2' }, fuente: 'captura del reto, 6º (chaleco negro, tatuaje) — confirmar nombre' },

  { id: 'reto7', nombre: '¿? (vestido morado)', genero: 'f', piel: PIEL.clara, cuerpo: 'curvy', pose: 'normal',
    pelo: { estilo: 'largoOndulado', color: '#3a2216' }, collar: '#222',
    arriba: { tipo: 'vestido', color: '#8c2a6a', manga: 'ninguna', tirantes: true, largo: 312, brillo: '#ff9fd6' }, abajo: { tipo: 'ninguno' },
    zapatos: { tipo: 'descalzo' }, fuente: 'captura del reto, último (vestido morado de lentejuelas) — confirmar nombre' },
];

const ESPECIALES = [
  { id: 'guardia', nombre: 'Guardia', guardia: true, fuente: 'videos y fotos que mandó Uriel (casco con orejas, visor rojo, víboras)' },
  { id: 'guardia-maletin', nombre: 'Guardia con maletín', guardia: true, maletin: true, fuente: 'foto del guardia con maletín' },
];

if (typeof module !== 'undefined') module.exports = { ELENCO, ESPECIALES };
