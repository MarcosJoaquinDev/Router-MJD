# Router-MJD
Custom react router

## Aconsejo crear primero un proyecto con [Vite](https://vitejs.dev/)
## luego instalar el paquete del mjd-router
```
npm install mjd-router
```
## Agregar este script en el package.json para correr la sobrescritura de los archivos que vayas cambiando
```json
"scripts": {
  "watch": "node node_modules/mjd-router/lib/router/watcher.js",
  "write": "node node_modules/mjd-router/lib/router/writer.js",
  "mjd": "npm run write && npm run watch",
...
}
```
```javascript
import {Router} from 'mjd-router';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
```
