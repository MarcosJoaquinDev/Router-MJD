import { useEffect, useState } from "react";
const PUSHSTATE = "pushstate";
const POPSTATE = "popstate";
type router = {
  path: string;
  component: () => JSX.Element;
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
  console.log(currentPath);

  const Page = router.find((r) => r.path == currentPath)?.component;
  const DefaultComponent = () => <h1>404</h1>;
  return Page ? <Page /> : <DefaultComponent />;
}
