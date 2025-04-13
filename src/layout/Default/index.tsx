import React, { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Toolbar,
  CssBaseline,
  Drawer,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { CalendarMonth, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const drawerWidth = 240;

const menuItems = [
  { text: "Início", icon: <Home />, path: "/" },
  { text: "Agendamentos", icon: <CalendarMonth />, path: "/agendamento" },
];

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawerContent = useMemo(
    () => (
      <>
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem
              key={text}
              component={Link}
              to={path}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </>
    ),
    [isMobile]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header onMenuClick={handleDrawerToggle} />

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
