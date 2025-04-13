import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        left: 0,
        py: 2,
        px: 3,
        textAlign: "center",
        borderTop: "1px solid #ddd",
        color: "#fff",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Sistema de Agendamento • Versão 1.0.0
      </Typography>
    </Box>
  );
};

export default Footer;
