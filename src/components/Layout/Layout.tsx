import React from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@rarui-react/components";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

const Layout: React.FC = () => (
  <Box
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Header />
    <Outlet />
    <Footer />
  </Box>
);

export default Layout;
