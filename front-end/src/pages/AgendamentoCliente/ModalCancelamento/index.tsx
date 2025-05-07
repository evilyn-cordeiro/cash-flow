import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function ModalConfirmarCancelamento({
  open,
  onClose,
  onConfirm,
  servico,
  hora,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Confirmar cancelamento
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography mb={2}>
          Tem certeza que deseja cancelar o agendamento de{" "}
          <strong>{servico}</strong> às <strong>{hora}</strong>?<br />
          Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Voltar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Confirmar cancelamento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
