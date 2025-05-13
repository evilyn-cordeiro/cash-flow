import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarHeader from "../AvatarHeader";
import theme from "../../theme/theme";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ paddingX: isMobile ? 1 : 3 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2, color: theme.palette.background.paper }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          sx={{
            flexGrow: 1,
            fontSize: isMobile ? "1.25rem" : "1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/logo-cash-flow-white.svg"
            alt="Logo"
            style={{ height: 40 }}
          />
        </Typography>

        {/* Avatar */}
        <Box>
          <AvatarHeader name="João Silva" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
