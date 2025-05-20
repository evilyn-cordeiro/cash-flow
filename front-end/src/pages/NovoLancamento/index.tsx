import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  createTransaction,
  updateTransaction,
} from "../../services/transactionService";
import { FormInput } from "../../components";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../utils/authContext";

interface LancamentoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editingData?: any | null;
}

export default function LancamentoModal({
  open,
  onClose,
  onSave,
  editingData,
}: LancamentoModalProps) {
  const [formData, setFormData] = useState({
    type: "Entrada",
    name: "",
    amount: "",
    description: "",
  });

  const handleClose = () => {
    setFormData({
      type: "Entrada",
      name: "",
      amount: "",
      description: "",
    });
    onClose();
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (editingData) {
      setFormData({
        type: editingData.type || "Entrada",
        name: editingData.name || "",
        amount: editingData.amount || "",
        description: editingData.description || "",
      });
    } else {
      setFormData({
        type: "Entrada",
        name: "",
        amount: "",
        description: "",
      });
    }
  }, [editingData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (formData.type === "INCOME" && value.startsWith("-")) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingData) {
        await updateTransaction(editingData.id, {
          ...formData,
          amount: Number(formData.amount),
        });
      } else {
        await createTransaction({
          ...formData,
          amount: Number(formData.amount),
          userId: user?.id || 0,
        });
      }

      onSave();
      enqueueSnackbar("Ação realizada com sucesso!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erro ao salvar lançamento.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingData ? "Editar Lançamento" : "Novo Lançamento"}
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <FormInput
            label="Tipo de Lançamento"
            name="type"
            value={formData.type}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="INCOME">Entrada</MenuItem>
            <MenuItem value="EXPENSE">Saída</MenuItem>
          </FormInput>

          <FormInput
            label="Título do Gasto"
            name="name"
            value={formData.name}
            maxLength={50}
            onChange={handleChange}
            placeholder="Ex: Salário, Conta de Luz..."
            required
          />

          <FormInput
            label="Valor"
            name="amount"
            type="number"
            maxLength={10}
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="R$ 0,00"
          />

          <FormInput
            label="Descrição"
            name="description"
            maxLength={150}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalhes do lançamento..."
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!formData.name || !formData.amount}
          startIcon={loading && <CircularProgress size={18} />}
        >
          {editingData ? "Salvar Alterações" : "Registrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
