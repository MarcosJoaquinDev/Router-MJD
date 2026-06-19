import { useEffect, useState } from "react";
import { match } from "path-to-regexp";
import {useRoutes} from './useRoutes';

const PUSHSTATE = "pushstate";
const POPSTATE = "popstate";

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const router = useRoutes();

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(PUSHSTATE, onLocationChange);
    window.addEventListener(POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(PUSHSTATE, onLocationChange);
      window.removeEventListener(POPSTATE, onLocationChange);
    };
  }, []);

  if (router === null) {
    return <div style={{ color: '#ccc' }}>Loading...</div>;
  }

  let routeParams = {};
  const pathComponent = router.find((r) => {
    if (r.path === currentPath) return true;
    const matchUrl = match(r.path, { decode: decodeURIComponent, sensitive: false });
    const matched = matchUrl(currentPath);
    if (!matched) return false;
    routeParams = matched.params;
    return true;
  });

  const Page = pathComponent?.component;
  const DefaultComponent = () => <h1>404</h1>;
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent />
  );
}
