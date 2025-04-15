import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Chip,
  TablePagination,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const resumoFinanceiro = {
  entradas: 4500,
  saidas: 3200,
  saldo: 1300,
};

const transacoes = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  descricao: `Transação ${i + 1}`,
  data: `2025-04-${(i % 30) + 1}`.padStart(10, "0"),
  valor: ((i + 1) * 100).toFixed(2),
  tipo: i % 2 === 0 ? "Entrada" : "Saída",
}));

export default function ControleFinanceiroPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const paginatedRows = transacoes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box p={isSmallScreen ? 2 : 4}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Controle Financeiro
        </Typography>
        <Typography color="text.secondary">
          Acompanhe seus lançamentos financeiros
        </Typography>
      </Box>

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
        flexDirection={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <TextField
            size="medium"
            label="Buscar"
            placeholder="Descrição, tipo..."
            variant="outlined"
            fullWidth
          />
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={isSmallScreen ? <AddIcon /> : null}
        >
          {!isSmallScreen && "Novo Lançamento"}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size={isSmallScreen ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>

              {!isSmallScreen && <TableCell>Data</TableCell>}

              <TableCell>Valor</TableCell>

              {!isSmallScreen && <TableCell>Tipo</TableCell>}

              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.descricao}</TableCell>

                {!isSmallScreen && <TableCell>{row.data}</TableCell>}

                <TableCell>R$ {row.valor}</TableCell>

                {!isSmallScreen && (
                  <TableCell>
                    <Chip
                      label={row.tipo}
                      color={row.tipo === "Entrada" ? "success" : "error"}
                    />
                  </TableCell>
                )}

                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuClick(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={transacoes.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
          labelRowsPerPage="Linhas por página:"
        />
      </TableContainer>

      {/* Menu de ações */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            console.log("Editar", selectedRow);
            handleMenuClose();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Remover", selectedRow);
            handleMenuClose();
          }}
        >
          Remover
        </MenuItem>
      </Menu>
    </Box>
  );
}
