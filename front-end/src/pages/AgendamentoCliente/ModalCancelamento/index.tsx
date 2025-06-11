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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  servico: string;
  hora: string;
}

export default function ModalConfirmarCancelamento({
  open,
  onClose,
  onConfirm,
  servico,
  hora,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Confirmar Cancelamento
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <WarningAmberIcon color="warning" fontSize="large" />
          <Typography variant="body1">
            Tem certeza que deseja cancelar este agendamento?
          </Typography>
        </Box>

        <Typography variant="subtitle2">Serviço:</Typography>
        <Typography mb={1}>{servico}</Typography>

        <Typography variant="subtitle2">Data e Hora:</Typography>
        <Typography>{new Date(hora).toLocaleString("pt-BR")}</Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Voltar
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Confirmar Cancelamento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
