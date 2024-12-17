import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import { Layout } from "@components/Layout";
import { Home } from "@features/Home";
import { PreparingValues } from "@features/PreparingValues";
import { urlRouters } from "../router.definitions";

const PublicRoutes: React.FC = () => (
  <Routes>
    <Route path={urlRouters.root} element={<Layout />}>
      <Route path={urlRouters.root} element={<Home />} />
      <Route path={urlRouters.preparingValues} element={<PreparingValues />} />
      <Route path="*" element={<Navigate to={urlRouters.root} replace />} />
    </Route>
  </Routes>
);

export default PublicRoutes;
