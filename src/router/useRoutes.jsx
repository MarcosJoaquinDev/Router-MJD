import { useState, useEffect } from "react";

export function useRoutes() {
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await fetch('/node_modules/mjd-router/lib/router/pages.json');
        const routes = await res.json();
        updateRoutes(routes);
      };

      fetchData();
    }, []);

    async function updateRoutes(updatedRoutes) {
      const pages = updatedRoutes.pages;

    let component = [];

    component = pages.map(async (p) => {
      const comp = await import(/* @vite-ignore */ "../../../../src/pages" + p.module);
      return { path: p.path.toLowerCase(), component: comp.default };
    });

    const updatedComponents = await Promise.all(component);
    setRouteData(updatedComponents);
  }

  return routeData;
}