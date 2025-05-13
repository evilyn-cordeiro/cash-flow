import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Box, Button, Typography } from "@mui/material";
import { FormInput } from "../../components";
import { login } from "../../services/userAuthService";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data: any = await login(email, password);
      localStorage.setItem("token", data.token);
      enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
      navigate("/");
    } catch (error: any) {
      console.error("Erro de login:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao fazer login.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage:
            'url("https://conteudo.solutudo.com.br/wp-content/uploads/2020/01/BARBEARIA-ARACAJU-BARBEIRO-MESTRE.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          p: 4,
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ alignSelf: { xs: "center", md: "flex-end" }, mb: 2 }}>
          <img src="/logo-cash-flow.svg" alt="Logo" style={{ height: 40 }} />
        </Box>

        <Box
          sx={{
            maxWidth: 350,
            width: "90%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 5,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormInput
              label="E-mail"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2,
              }}
            >
              <Button type="submit" variant="contained" fullWidth>
                Entrar
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/register")}
                fullWidth
              >
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          © Direitos reservados 2025
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
