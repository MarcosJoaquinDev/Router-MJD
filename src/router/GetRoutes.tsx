import routes from "./pages.json";
export async function getRoutes() {
  const pages = routes.pages;
  let component = [];

  component = pages.map(async (p) => {
    const comp = await import(/* @vite-ignore */ "../pages" + p.module);
    return { path: p.path.toLowerCase(), component: comp.default };
  });

  return await Promise.all(component);
}
