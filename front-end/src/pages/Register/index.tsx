import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  TextField,
  InputLabel,
} from "@mui/material";
import { FormInput } from "../../components";
import { register } from "../../services/userAuthService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kind, setKind] = useState("Customer");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await register({ name, email, password, kind, cpfCnpj });
      enqueueSnackbar("Cadastro realizado com sucesso!", {
        variant: "success",
      });
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao cadastrar.";
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
      {/* Lado esquerdo com imagem */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage:
            'url("https://conteudo.solutudo.com.br/wp-content/uploads/2020/01/BARBEARIA-ARACAJU-BARBEIRO-MESTRE.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            alignSelf: { xs: "center", md: "flex-end" },
            mb: 2,
            padding: 2,
          }}
        >
          <img
            src="/logo-cash-flow-white.svg"
            alt="Logo"
            style={{ height: 40 }}
          />
        </Box>
      </Box>

      {/* Lado direito */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: "background.default",
        }}
      >
        {/* Formulário de cadastro */}
        <Box
          sx={{
            maxWidth: 400,
            width: "90%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 5,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" textAlign="center">
            Crie sua conta
          </Typography>

          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormInput
              label="Nome"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />

            <FormInput
              label="E-mail"
              placeholder="Seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />

            <FormInput
              label="Senha"
              placeholder="Crie uma senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <FormInput
              select
              label={"Tipo de Cliente"}
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              name="kind"
            >
              <MenuItem value="" disabled>
                <em>Selecione o tipo do usuário</em>
              </MenuItem>
              <MenuItem value="Customer">Cliente</MenuItem>
              <MenuItem value="MEI">Microempreendedor individual(MEI)</MenuItem>
            </FormInput>

            <FormInput
              label={kind === "MEI" ? "CNPJ" : "CPF"}
              placeholder={`Digite seu ${kind === "MEI" ? "CNPJ" : "CPF"}`}
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              name="cpfCnpj"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!name || !email || !password || !cpfCnpj}
            >
              Cadastrar
            </Button>

            <Button variant="text" onClick={() => navigate("/login")} fullWidth>
              Já possui conta? Faça login
            </Button>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          © Direitos reservados 2025
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
