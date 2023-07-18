# Router-MJD

## Custom react router

![mjd-image-route](https://github.com/MarcosJoaquinDev/Router-MJD/assets/95374803/11c9c187-952a-4177-a17e-95bc8490873f)

### I advise to create a project with [Vite](https://vitejs.dev/) first

### then install the mjd-router package

```
npm install mjd-router
```

### Add this script in the package.json to run the overwrite of the files that change

```json
"scripts": {
  "watch": "node node_modules/mjd-router/lib/router/watcher.js",
  "write": "node node_modules/mjd-router/lib/router/writer.js",
  "mjd": "npm run write && npm run watch",
...
}
```

### finally add in the root of the project (in the case of Vite it is in the main.jsx file), the router component

```javascript
import { Router } from "mjd-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
```
