import React from "react";
import { Box, Text, Link } from "@rarui-react/components";
import "./footer.css";

const Footer: React.FC = () => (
  <footer className="s">
    <Box
      height="72px"
      display="flex"
      justifyContent="space-between"
      paddingX="$3xl"
      alignItems="center"
      backgroundColor="$secondary"
    >
      <Box>
        <Text fontSize="$s" color="$primary">
          © 2024 Valorize. All rights reserved.
        </Text>
      </Box>
      <Box display="flex" gap="$md">
        <Link size="small" appearance="neutral">
          Privacy Policy
        </Link>
        <Link size="small" appearance="neutral">
          Terms of Service
        </Link>
      </Box>
    </Box>
  </footer>
);

export default Footer;
