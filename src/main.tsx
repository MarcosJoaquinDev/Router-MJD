import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router/Router";
import routes from "./router/pages.json";
async function getRoutes() {
  const pages = routes.pages;
  let component = [];

  component = pages.map(async (p) => {
    const comp = await import("./pages" + p.module);
    return { path: p.path.toLowerCase(), component: comp.default };
  });

  return await Promise.all(component);
}
const paths = await getRoutes();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router router={paths} />
  </React.StrictMode>
);
