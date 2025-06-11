import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  profissional: string;
  servico: string;
  local: string;
  hora: string;
  data: string;
}

export default function ModalConfirmarAgendamento({
  open,
  onClose,
  onConfirm,
  profissional,
  servico,
  local,
  hora,
  data,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Confirmar Agendamento
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <EventAvailableIcon color="success" fontSize="large" />
          <Typography variant="body1">
            Confirme os dados antes de realizar o agendamento:
          </Typography>
        </Box>

        <Typography variant="subtitle2">Profissional:</Typography>
        <Typography mb={1}>{profissional}</Typography>

        <Typography variant="subtitle2">Serviço:</Typography>
        <Typography mb={1}>{servico}</Typography>

        <Typography variant="subtitle2">Local:</Typography>
        <Typography mb={1}>{local}</Typography>

        <Typography variant="subtitle2">Data:</Typography>
        <Typography mb={1}>{data}</Typography>

        <Typography variant="subtitle2">Hora:</Typography>
        <Typography>{hora}</Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Voltar
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirmar Agendamento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
