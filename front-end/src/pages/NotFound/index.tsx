import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
      textAlign="center"
      padding={4}
      borderRadius={2}
    >
      <Typography variant="h2" fontWeight={700} gutterBottom color="error.main">
        404
      </Typography>
      <Typography variant="h5" gutterBottom color="text.secondary">
        Página não encontrada
      </Typography>
      <Typography variant="body1" mb={4} color="text.secondary">
        A rota acessada não existe ou foi removida.
      </Typography>
      <Button variant="text" color="primary" onClick={() => navigate("/")}>
        Voltar para o início
      </Button>
    </Box>
  );
};

export default NotFoundPage;
