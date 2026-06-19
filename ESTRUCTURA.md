# Estructura del Proyecto — Router-MJD

Router personalizado para React con ruteo basado en sistema de archivos (file-convention routing, similar a Next.js pero para vanilla React).

---

## Raíz del proyecto

### `package.json`
Paquete npm `mjd-router` v1.0.5. Define:
- **Entry point**: `lib/router/index.js`
- **Scripts**:
  - `watch` — inicia el watcher que regenera rutas automáticamente
  - `write` — escanea `src/pages/` y genera `pages.json`
  - `mjd` — ejecuta write + watch en secuencia
  - `vite` — levanta el dev server de Vite
  - `dev` — corre mjd y vite en paralelo
  - `prepare` — compila `src/router/*` → `lib/router/*` via SWC
  - `build` — typecheck + Vite build
- **Deps**: `chokidar` (file watching), `path-to-regexp` (matcheo de rutas)
- **Peer deps**: `react`, `react-dom`

### `tsconfig.json` / `tsconfig.node.json`
Configuración de TypeScript: target ESNext, JSX react-jsx, modo estricto, `noEmit: true` (solo type-checking, la compilación la hace SWC).

### `vite.config.ts`
Configura Vite con el plugin `@vitejs/plugin-react`. Mínimo, estándar para proyectos Vite + React.

### `.swcrc`
Configuración de SWC: syntax ECMAScript con JSX, target es2020, JSX runtime automático, minificación activada. Usado por `npm run prepare`.

### `index.html`
HTML entry point de Vite. Carga `globals.css`, renderiza `<div id="root">` e importa `src/main.jsx`. Favicon: `signpost.png`. Title: "MJD-Router".

### `globals.css`
Estilos globales mínimos: fondo negro, texto beige, fuente monospace `Courier New`.

### `.gitignore` / `.npmignore`
- `.gitignore`: excluye `node_modules`, `dist`, `lib`, `*.local`, `.DS_Store`
- `.npmignore`: al publicar, excluye `src/`, `public/`, etc. Solo se publica `lib/`, `package.json`, `README.md`

### `README.md`
Instrucciones de uso para consumidores del paquete: instalación, scripts, y cómo integrar `<Router />`.

---

## `src/` — Código fuente

### `src/main.jsx`
Entry point de la aplicación. Importa `Router` desde `./router/index` y lo renderiza dentro de `React.StrictMode`. Es el archivo que carga Vite desde `index.html`.

### `src/vite-env.d.ts`
Declaración de tipos de Vite para TypeScript (`/// <reference types="vite/client" />`).

---

## `src/router/` — Librería core (se compila a `lib/router/`)

### `src/router/constants.js`
Recurso compartido entre `watcher.js` y `writer.js`:
- **`PAGES_DIR`** — ruta absoluta a `src/pages/` (resuelta con `process.cwd()`)
- **`PAGES_JSON_PATH`** — ruta absoluta a `pages.json` (resuelta con `import.meta.url`, queda al lado del script)
- **`isPageFile()`** — helper que verifica si un archivo es `.jsx` o `.tsx`

### `src/router/index.jsx`
**Barrel file** del paquete. Re-exporta los tres componentes públicos:
- `Router` desde `Router.jsx`
- `navigate` desde `navigate.js`
- `Link` desde `Link.jsx`

### `src/router/Router.jsx`
**Componente principal de ruteo.** Usa `useState` + `useEffect` para escuchar cambios en `window.location.pathname`. Escucha eventos `pushstate` (custom) y `popstate` (nativo). Obtiene las rutas desde `useRoutes()`, las matchea contra la URL actual usando `path-to-regexp`, y renderiza el componente de página correspondiente pasándole `routeParams` como prop. Si no hay match, muestra un fallback 404.

### `src/router/useRoutes.jsx`
**Hook personalizado.** Fetch de `pages.json` desde la ruta del paquete npm (`/node_modules/mjd-router/lib/router/pages.json`). Procesa el JSON e importa dinámicamente cada componente de página con `import()` de Vite. Retorna un array `[{ path, component }]`.

### `src/router/navigate.js`
**Navegación programática.** Hace `window.history.pushState({}, '', href)` y dispara un evento custom `pushstate` para que el Router detecte el cambio sin recargar la página.

### `src/router/Link.jsx`
**Componente de enlace SPA.** Renderiza un `<a>` normal. Intercepta el click (botón primario, sin teclas modificadoras, target `_self`) y delega en `navigate(to)` para evitar la recarga completa. El resto de props se propagan al `<a>`.

### `src/router/writer.js`
**Generador del manifiesto de rutas.** Escanea `src/pages/` recursivamente con `fs/promises`. Para cada archivo `.jsx`/`.tsx`:
- Calcula la ruta URL: quita el prefijo de `PAGES_DIR`, convierte `[param]` → `:param`, maneja `index.*` como ruta base del directorio
- Genera `pages.json` con `{ pages: [{ path, module }] }`

### `src/router/watcher.js`
**Observador de archivos.** Usa `chokidar` para monitorear `src/pages/`. Al agregar o eliminar un `.jsx`/`.tsx`, ejecuta `npm run write` (con debounce de 200ms para agrupar cambios rápidos como renames). Así el `pages.json` se mantiene siempre actualizado durante desarrollo.

### `src/router/pages.json`
**Manifiesto auto-generado.** Contiene el array de rutas. Ejemplo:
```json
{"pages":[
  {"path":"/About","module":"/About.jsx"},
  {"path":"/Contact","module":"/Contact.jsx"},
  {"path":"/","module":"/index.jsx"},
  {"path":"/product/:productId","module":"/product/[productId].jsx"}
]}
```
Generado por `writer.js`, consumido por `useRoutes.jsx`.

---

## `src/pages/` — Páginas de ejemplo

### `src/pages/index.jsx`
Página principal (`/`). Renderiza un título de bienvenida y un `<Link>` a `/about`.

### `src/pages/About.jsx`
Página About (`/about`). Renderiza un título y un botón que navega programáticamente a `/product/123` usando `navigate()`.

### `src/pages/Contact.jsx`
Página de contacto (`/contact`). Renderiza un título simple.

### `src/pages/product/[productId].jsx`
Ruta dinámica (`/product/:productId`). Recibe `routeParams` como prop y muestra el ID del producto. Demuestra el soporte de parámetros dinámicos en la URL.

---

## `public/`

### `public/signpost.png`
Favicon / logo del proyecto (ícono de cartel indicador).

---

## `lib/` — Código compilado (generado por SWC)

Contiene los mismos archivos que `src/router/` pero compilados y minificados por `npm run prepare`. Es lo que se publica a npm. El flujo es:

```
src/router/*.jsx  ──[SWC]──>  lib/router/*.js
```

El `pages.json` no se compila (no es JS), pero el writer lo escribe en el mismo directorio que el script (ya sea `src/router/` en dev o `lib/router/` en producción).

---

## Diagrama de flujo

```
index.html
  └── importa ──> src/main.jsx
                    └── importa ──> src/router/index.jsx
                                      ├── Router.jsx ──> usa path-to-regexp
                                      │     └── useRoutes.jsx ──> fetch(pages.json)
                                      │                               └── import() dinámico
                                      ├── navigate.js ──> pushState + evento custom
                                      └── Link.jsx ──> intercepta click → navigate()

src/router/writer.js ──escanea──> src/pages/ ──escribe──> pages.json
src/router/watcher.js ──observa──> src/pages/ ──ejecuta──> npm run write
```
