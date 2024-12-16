import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProxyRoute } from "./proxies";

const Router: React.FC = () => (
  <BrowserRouter>
    <ProxyRoute />
  </BrowserRouter>
);

export default Router;
