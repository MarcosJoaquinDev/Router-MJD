import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { match } from "path-to-regexp";
import { useRoutes } from './useRoutes';
const PUSHSTATE = "pushstate";
const POPSTATE = "popstate";
export function Router() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const router = useRoutes();
    useEffect(()=>{
        const onLocationChange = ()=>{
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener(PUSHSTATE, onLocationChange);
        window.addEventListener(POPSTATE, onLocationChange);
        return ()=>{
            window.removeEventListener(PUSHSTATE, onLocationChange);
            window.removeEventListener(POPSTATE, onLocationChange);
        };
    }, []);
    if (router === null) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                color: '#ccc'
            },
            children: "Loading..."
        });
    }
    let routeParams = {};
    const pathComponent = router.find((r)=>{
        if (r.path === currentPath) return true;
        const matchUrl = match(r.path, {
            decode: decodeURIComponent,
            sensitive: false
        });
        const matched = matchUrl(currentPath);
        if (!matched) return false;
        routeParams = matched.params;
        return true;
    });
    const Page = pathComponent?.component;
    const DefaultComponent = ()=>/*#__PURE__*/ _jsx("h1", {
            children: "404"
        });
    return Page ? /*#__PURE__*/ _jsx(Page, {
        routeParams: routeParams
    }) : /*#__PURE__*/ _jsx(DefaultComponent, {});
}
