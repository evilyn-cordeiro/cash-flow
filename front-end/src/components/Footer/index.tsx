import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      position={"fixed"}
      alignItems={"center"}
      justifyContent={"center"}
      component="footer"
      sx={{
        bottom: 0,
        left: 0,
        width: "100%",
        py: 2,
        px: 3,
        textAlign: "center",
        color: "#333",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Sistema de Agendamento • Versão 1.0.0
      </Typography>
    </Box>
  );
};

export default Footer;
