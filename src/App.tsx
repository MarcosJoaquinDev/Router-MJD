import { Suspense, useEffect, useState } from "react";
import { Router } from "./Router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
let test: any = [];
async function main() {
  const res = await import("./pages/Home");
  const res2 = await import("./pages/About");
  const route = { path: "/", component: res.default };
  const route2 = { path: "/about", component: res2.default };
  test.push(route);
  test.push(route2);
  console.log("tengo la ruta");
}
await main();
const ROUTES = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];

function App() {
  return (
    <main>
      <h1>MJD-Router</h1>
      <Suspense fallback={<div>cargando..</div>}>
        <Router router={test} />
      </Suspense>
    </main>
  );
}

export default App;
