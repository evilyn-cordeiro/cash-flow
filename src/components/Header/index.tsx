import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarHeader from "../AvatarHeader";

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="fixed" sx={{ zIndex: 9999 }}>
      <Toolbar sx={{ paddingX: isMobile ? 1 : 3 }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            flexGrow: 1,
            color: "#fff",
            fontSize: isMobile ? "1.25rem" : "1.5rem",
          }}
        >
          Meu Sistema
        </Typography>
        <Box>
          <AvatarHeader name="João Silva" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
