import { lazy, Suspense } from "react";
import { Router } from "./router/Router";
import routes from "./pages/pages.json";
async function getRoutes() {
  const pages = routes.pages;
  let component = [];
  component = pages.map(async (p) => {
    const comp = await import("./pages" + p.module);
    return { path: p.path.toLowerCase(), component: comp.default };
  });
  return await Promise.all(component);
  //return component;
}
const paths = await getRoutes();

function App() {
  return (
    <main>
      <h1>MJD-Router</h1>
      <Router router={paths} />
    </main>
  );
}

export default App;
