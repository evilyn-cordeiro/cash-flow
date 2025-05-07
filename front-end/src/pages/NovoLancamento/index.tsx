import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  CssBaseline,
  Breadcrumbs,
  Link,
} from "@mui/material";

export default function NovoLancamento({}) {
  const [formData, setFormData] = useState({
    type: "Receita",
    amount: "",
    description: "",
    date: "",
  });

  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "description") {
      setDescriptionLength(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
    setFormData({
      type: "Receita",
      amount: "",
      description: "",
      date: "",
    });
  };

  const handleBack = () => window.history.back();

  const handleCancel = () => window.history.back();

  return (
    <Box width={"100%"} sx={{ backgroundColor: "#f4f4f9" }}>
      <CssBaseline />
      <Container component="main" sx={{ marginTop: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleBack}>
            Home
          </Link>
          <Typography color="textPrimary">
            Cadastro de Transação Financeira
          </Typography>
        </Breadcrumbs>

        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: 3,
            marginTop: 2,
          }}
        >
          <Typography variant="h5" align="left" gutterBottom>
            Cadastro de Transação Financeira
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                select
                label="Tipo de Transação"
                name="type"
                value={formData.type}
                onChange={handleChange}
                SelectProps={{ native: true }}
                required
              >
                <option value="Receita">Receita</option>
                <option value="Despesa">Despesa</option>
              </TextField>

              <TextField
                fullWidth
                label="Valor"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                maxRows={6}
                required
                helperText={`${descriptionLength} / 255 caracteres`}
                inputProps={{ maxLength: 255 }}
              />

              <TextField
                fullWidth
                label="Data"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />

              <Box
                display="flex"
                gap={2}
                marginTop={2}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Registrar Transação
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
