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
    date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingData) {
      setFormData({
        type: editingData.type || "Entrada",
        name: editingData.name || "",
        amount: editingData.amount || "",
        description: editingData.description || "",
        date: editingData.createdAt?.split("T")[0] || "",
      });
    } else {
      setFormData({
        type: "Entrada",
        name: "",
        amount: "",
        description: "",
        date: "",
      });
    }
  }, [editingData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
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
          userId: 4,
        });
      }

      onSave();
    } catch (error) {
      console.error("Erro ao salvar lançaento:", error);
      alert("Erro ao salvar lançamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Salário, Conta de Luz..."
            required
          />

          <FormInput
            label="Valor"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="R$ 0,00"
          />

          <FormInput
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalhes do lançamento..."
            required
          />

          <FormInput
            label="Data"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={18} />}
        >
          {editingData ? "Salvar Alterações" : "Registrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
