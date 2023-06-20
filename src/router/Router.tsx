import { useEffect, useState } from "react";
import { match } from "path-to-regexp";
const PUSHSTATE = "pushstate";
const POPSTATE = "popstate";
type router = {
  path: string;
  component: any;
};
type RouteProps = {
  router: router[];
};
export function Router({ router }: RouteProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(PUSHSTATE, onLocationChange);
    window.addEventListener(POPSTATE, onLocationChange);
    return () => {
      window.removeEventListener(PUSHSTATE, onLocationChange);
      window.addEventListener(POPSTATE, onLocationChange);
    };
  }, []);
  let routesParams = {};
  const pathComponent = router.find((r) => {
    if (r.path === currentPath) return true;
    const mathUrl = match(r.path, { decode: decodeURIComponent });
    const matched = mathUrl(currentPath);
    if (!matched) return false;
    routesParams = matched.params;

    return true;
  });

  const Page = pathComponent?.component;
  const DefaultComponent = ({ routeParams }: any) => <h1>404</h1>;
  return Page ? (
    <Page routeParams={routesParams} />
  ) : (
    <DefaultComponent routeParams={routesParams} />
  );
}
