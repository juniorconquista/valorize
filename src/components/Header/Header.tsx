import React from "react";
import { Box } from "@rarui-react/components";
import Logo from "@assets/logo-black.svg?react";

const Header: React.FC = () => (
  <Box
    height="80px"
    borderBottomWidth="$1"
    borderStyle="solid"
    borderColor="$divider"
    boxShadow="$bottom-2"
    paddingX="$md"
    alignItems="center"
    display="flex"
  >
    <Logo width="150px" />
  </Box>
);

export default Header;
