import React from "react";
import { Box, Toggle, Icon } from "@rarui-react/components";
import { LightbulbFilledIcon, LightbulbOutlinedIcon } from "@rarui/icons";
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
    justifyContent="space-between"
  >
    <Logo width="150px" />
    <Toggle
      name="toggle-dark-theme"
      aria-live="polite"
      readOnly
      icons={{
        unchecked: (
          <Icon
            source={<LightbulbOutlinedIcon size="small" />}
            color="$invert"
          />
        ),
        checked: (
          <Icon source={<LightbulbFilledIcon size="small" />} color="$brand" />
        ),
      }}
    />
  </Box>
);

export default Header;
