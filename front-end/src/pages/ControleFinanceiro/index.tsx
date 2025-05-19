import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  getAllTransactions,
  deleteTransaction,
} from "../../services/transactionService";
import {
  InfoOutlined,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import LancamentoModal from "../NovoLancamento";

export default function ControleFinanceiroPage() {
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransacoes(data as any);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  useEffect(() => {
    fetchTransactions().finally(() => setLoading(false));
  }, []);

  const resumoFinanceiro = {
    entradas: transacoes
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + Number(t.amount), 0),
    saidas: transacoes
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => acc + Number(t.amount), 0),
    saldo: 0,
  };
  resumoFinanceiro.saldo = resumoFinanceiro.entradas - resumoFinanceiro.saidas;

  const paginatedRows = transacoes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleRemover = async () => {
    if (!selectedRow) return;

    try {
      await deleteTransaction(selectedRow.id);
      setTransacoes((prev) => prev.filter((t) => t.id !== selectedRow.id));
    } catch (error) {
      console.error("Erro ao remover transação:", error);
    } finally {
      handleMenuClose();
      setConfirmDelete(false);
    }
  };

  const handleNovoLancamento = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEditar = () => {
    setEditData(selectedRow);
    setModalOpen(true);
    handleMenuClose();
  };

  const getTipoLabel = (type: string) =>
    type === "INCOME" ? "Entrada" : "Saída";

  const getTipoCor = (type: string) =>
    type === "INCOME" ? "success" : "error";

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={isSmallScreen ? 2 : 3}>
      <Typography variant="h4" fontWeight="bold">
        Controle Financeiro
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Acompanhe seus lançamentos financeiros
      </Typography>

      <Box
        display="flex"
        gap={2}
        flexDirection={isSmallScreen ? "column" : "row"}
        mb={4}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Entradas
            </Typography>
            <Typography variant="h6" color="success.main">
              R$ {resumoFinanceiro.entradas.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Saídas
            </Typography>
            <Typography variant="h6" color="error.main">
              R$ {resumoFinanceiro.saidas.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Saldo
            </Typography>
            <Typography
              variant="h6"
              color={
                resumoFinanceiro.saldo >= 0 ? "success.main" : "error.main"
              }
            >
              R$ {resumoFinanceiro.saldo.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
        mb={2}
      >
        <TextField
          placeholder="Descrição, tipo..."
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ maxWidth: "500px" }}
        />

        <Button
          variant="contained"
          size="medium"
          onClick={handleNovoLancamento}
        >
          <AddIcon />
          {!isSmallScreen && "Novo"}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              {!isSmallScreen && <TableCell>Data Cadastro</TableCell>}
              <TableCell>Valor</TableCell>
              {!isSmallScreen && <TableCell>Tipo</TableCell>}
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    py={5}
                  >
                    <InfoOutlined sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">
                      Sem dados cadastrados para cálculo.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.description}</TableCell>
                  {!isSmallScreen && (
                    <TableCell>
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell>R$ {Number(row.amount).toFixed(2)}</TableCell>
                  {!isSmallScreen && (
                    <TableCell>
                      <Chip
                        label={getTipoLabel(row.type)}
                        color={getTipoCor(row.type)}
                      />
                    </TableCell>
                  )}
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuClick(e, row)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditar}>Editar</MenuItem>
        <MenuItem onClick={() => setConfirmDelete(true)}>Remover</MenuItem>
      </Menu>

      {/* Confirmação de deleção */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Confirmar remoção</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar esta transação? Essa ação não poderá
            ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
          <Button color="error" onClick={handleRemover} autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <LancamentoModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSave={() => {
          fetchTransactions();
          setModalOpen(false);
          setEditData(null);
        }}
        editingData={editData}
      />
    </Box>
  );
}
