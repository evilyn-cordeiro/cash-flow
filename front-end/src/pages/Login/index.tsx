import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Box, Button, Link } from "@mui/material";
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
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo em HTML5.
      </video>

      {/* Gradient escuro sobre o vídeo */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
        }}
      />

      {/* Container do formulário */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: 412,
            width: "100%",
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
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!email || !password}
              >
                Entrar
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/register")}
                fullWidth
              >
                Cadastrar-se
              </Button>
            </Box>

            <Link
              href="/forgot-password"
              underline="hover"
              sx={{ mt: 2, color: "primary.main", textAlign: "center" }}
            >
              Esqueci minha senha
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
