import React from "react";
import { HashRouter } from "react-router-dom";

import { ProxyRoute } from "./proxies";

const Router: React.FC = () => (
  <HashRouter>
    <ProxyRoute />
  </HashRouter>
);

export default Router;
