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
import { useAuth } from "../../utils/authContext";

const drawerWidth = 240;

const menuItems = [
  {
    text: "Controle Financeiro",
    icon: <Home />,
    path: "/controle-financeiro",
    rule: ["MEI"],
  },
  {
    text: "Agendamentos",
    icon: <Home />,
    path: "/agendamento",
    rule: ["Customer"],
  },
];

const Layout = () => {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  console.log("Tipo de usuário:", user?.kind);

  const drawerContent = useMemo(
    () => (
      <>
        <Toolbar />
        <Divider />
        <List>
          {menuItems
            .filter((item) => item.rule.includes(user?.kind ?? ""))
            .map(({ text, icon, path }) => (
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
    [user?.kind]
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
