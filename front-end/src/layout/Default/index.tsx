import React, { useState, useMemo } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { CalendarMonth, Home, MoneyOutlined } from "@mui/icons-material";
import Header from "../../components/Header";

const drawerWidth = 240;

const menuItems = [
  { text: "Início", icon: <Home />, path: "/" },
  { text: "Agendamentos", icon: <CalendarMonth />, path: "/agendamento" },
  {
    text: "Controle Financeiro",
    icon: <MoneyOutlined />,
    path: "/controle-financeiro",
  },
];

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const drawerContent = useMemo(
    () => (
      <>
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem
              key={text}
              type="button"
              component={Link}
              to={path}
              onClick={toggleDrawer}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </>
    ),
    []
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Cabeçalho com botão para abrir menu */}
      <Header onMenuClick={toggleDrawer} />

      {/* Menu lateral sempre temporário */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Conteúdo principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
