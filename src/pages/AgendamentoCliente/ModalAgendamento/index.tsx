import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const profissionais = [
  {
    id: 1,
    nome: "Ana Souza",
    funcao: "Fisioterapeuta",
    avatar: "https://i.pravatar.cc/100?img=1",
    local: "Clínica Vida Saudável - Sala 3",
    horarios: ["08:00", "10:00", "14:00"],
  },
  {
    id: 2,
    nome: "Carlos Lima",
    funcao: "Médico Clínico",
    avatar: "https://i.pravatar.cc/100?img=2",
    local: "Hospital Central - Ala B",
    horarios: ["09:30", "13:00", "16:00"],
  },
];

export function ModalAgendamento({ open, onClose }) {
  const [busca, setBusca] = useState("");
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<any>();
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>("");
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(false);

  const profissionaisFiltrados = profissionais.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAgendar = () => {
    if (profissionalSelecionado && horarioSelecionado) {
      setAgendamentoConfirmado(true);
    }
  };

  const handleFechar = () => {
    setAgendamentoConfirmado(false);
    setProfissionalSelecionado(null);
    setHorarioSelecionado("");
    setBusca("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleFechar} maxWidth="sm" fullWidth>
      <DialogTitle>
        {agendamentoConfirmado
          ? "Agendamento Confirmado"
          : "Selecionar Profissional"}
        <IconButton
          onClick={handleFechar}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {agendamentoConfirmado ? (
          <Box>
            <Typography variant="body1" mb={2}>
              Você agendou com:
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar src={profissionalSelecionado.avatar} />
              <Box>
                <Typography fontWeight="bold">
                  {profissionalSelecionado.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profissionalSelecionado.funcao}
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" mb={1}>
              Detalhes do Agendamento:
            </Typography>
            <Typography>📍 Local: {profissionalSelecionado.local}</Typography>
            <Typography>📅 Data: (a definir pelo sistema)</Typography>
            <Typography>⏰ Hora: {horarioSelecionado}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" color="text.secondary">
              Compareça com 10 minutos de antecedência e traga seus documentos
              de identificação.
            </Typography>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleFechar}>
                Fechar
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar profissional..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Stack spacing={2}>
              {profissionaisFiltrados.map((prof) => (
                <Box
                  key={prof.id}
                  sx={{
                    border:
                      profissionalSelecionado?.id === prof.id
                        ? "2px solid #1976d2"
                        : "1px solid #ccc",
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setProfissionalSelecionado(prof);
                    setHorarioSelecionado(""); // reset horário
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={prof.avatar} />
                    <Box>
                      <Typography fontWeight="bold">{prof.nome}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {prof.funcao}
                      </Typography>
                    </Box>
                  </Box>

                  {profissionalSelecionado?.id === prof.id && (
                    <Box mt={2}>
                      <Divider sx={{ mb: 1 }} />
                      <Typography variant="subtitle2" mb={1}>
                        Disponibilidade:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {prof.horarios.map((h) => (
                          <Button
                            key={h}
                            variant={
                              horarioSelecionado === h
                                ? "contained"
                                : "outlined"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setHorarioSelecionado(h);
                            }}
                          >
                            {h}
                          </Button>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleFechar}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleAgendar}
                disabled={!profissionalSelecionado || !horarioSelecionado}
              >
                Agendar
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
