# La Mansión VIP 2 — parodia caricatura (Uriel Bonifaz)

Personajes y escenarios dibujados en código (SVG) para hacer videos de comedia, memes y "¿qué pasaría si…?".

- `personajes.js` — el dibujante: arma cada personaje con sus rasgos (pelo, piel, complexión, ropa, tatuajes, lentes…).
- `elenco.js` — la ficha de cada integrante. Para corregir a alguien se cambia su ficha.
- `escenas.js` — escenarios de la casa (por ahora: foro de retos con la pantalla LED del piso).
- `herramientas/render*.js` — sacan las imágenes a `imagenes/`.

Generar imágenes: `node herramientas/render.js && node herramientas/render-escenas.js`

Pendiente: video del recorrido de la casa (sala, baños, recámaras, cuarto de castigo, gradas con pasto sintético) y fotos de cuerpo completo de cada integrante.
