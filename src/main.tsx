import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router/Router";
import { getRoutes } from "./router/GetRoutes";

const paths = await getRoutes();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router router={paths} />
  </React.StrictMode>
);
