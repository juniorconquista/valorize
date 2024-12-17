import React from "react";
import { Box, Toggle, Icon } from "@rarui-react/components";
import { LightbulbFilledIcon, LightbulbOutlinedIcon } from "@rarui/icons";
import { useTheme } from "@/App";
import LogoDark from "@assets/logo-white.svg?react";
import LogoLight from "@assets/logo-black.svg?react";

const Header: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
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
      backgroundColor="$secondary"
    >
      {darkMode && <LogoDark width="150px" />}
      {!darkMode && <LogoLight width="150px" />}
      <Toggle
        name="toggle-dark-theme"
        aria-live="polite"
        checked={!darkMode}
        onClick={() => setDarkMode(!darkMode)}
        readOnly
        icons={{
          unchecked: (
            <Icon
              source={<LightbulbOutlinedIcon size="small" />}
              color="$invert"
            />
          ),
          checked: (
            <Icon
              source={<LightbulbFilledIcon size="small" />}
              color="$brand"
            />
          ),
        }}
      />
    </Box>
  );
};

export default Header;
