# Perfil de Portafolio

Portafolio personal de Josué Javier Mendoza Laínez.

- **Página desplegada (GitHub Pages):** https://josuemen1231.github.io/Perfil-de-Portafolio/
- **Repositorio:** https://github.com/JosueMen1231/Perfil-de-Portafolio

## Tecnologías

- [Vite](https://vite.dev/) como *web bundler* (modo MPA).
- [LESS](https://lesscss.org/) para generar el CSS (`src/less/`).
- [PurgeCSS](https://purgecss.com/) para dejar solo las reglas CSS utilizadas.
- Minificación de JS y CSS en `vite build`.
- `vite-plugin-handlebars` para los componentes `Header` y `Footer` (`src/components/`).
- GitHub Actions publica `dist/` en GitHub Pages en cada push a `main`.

## Estructura

```
index.html
src/
  main.js              # JS (indicador animado del menú)
  assets/img/          # imágenes
  components/          # parciales Handlebars
  less/                # variables, globals y componentes
.github/workflows/     # despliegue a GitHub Pages
```

## Uso

```bash
npm install
npm run dev       # desarrollo
npm run build     # genera dist/ minificado y con CSS purgado
npm run preview   # sirve dist/
```

## Despliegue

En GitHub: *Settings → Pages → Source: GitHub Actions*. El workflow define
`DEPLOY_BASE_URL` automáticamente con el nombre del repositorio.
