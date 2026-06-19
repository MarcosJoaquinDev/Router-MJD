import { useState, useEffect } from "react";
export function useRoutes() {
    const [routeData, setRouteData] = useState(null);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await fetch('/pages.json');
                if (!res.ok) throw new Error(`Failed to fetch pages.json: ${res.status}`);
                const routes = await res.json();
                await updateRoutes(routes);
            } catch (err) {
                console.error('useRoutes: fetch error', err);
                setRouteData([]);
            }
        };
        fetchData();
    }, []);
    async function updateRoutes(updatedRoutes) {
        const pages = updatedRoutes.pages;
        const loaders = pages.map(async (p)=>{
            try {
                const comp = await import(/* @vite-ignore */ `/src/pages${p.module}`);
                return {
                    path: p.path,
                    component: comp.default
                };
            } catch (err) {
                console.error(`useRoutes: failed to load ${p.module}`, err);
                return null;
            }
        });
        const results = await Promise.all(loaders);
        const valid = results.filter(Boolean);
        setRouteData(valid);
    }
    return routeData;
}
