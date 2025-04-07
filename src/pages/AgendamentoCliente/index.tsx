import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TablePagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const statusColors = {
  Pendente: "warning",
  Confirmado: "success",
  Cancelado: "error",
};

const allRows = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  servico: `Serviço ${(i % 5) + 1}`,
  data: `2025-04-${(i % 30) + 1}`.padStart(10, "0"),
  localizacao: `Cidade ${(i % 4) + 1}`,
  status: i % 3 === 0 ? "Pendente" : i % 3 === 1 ? "Confirmado" : "Cancelado",
}));

export default function AgendamentoPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = allRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Agendamento
        </Typography>
        <Typography color="text.secondary">
          Gerenciamento de agendamento
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" gap={1} alignItems="center">
          <TextField
            size="medium"
            label="Buscar"
            placeholder="Serviço, data..."
            variant="outlined"
          />
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
        <Button variant="contained" size="large">
          Novo agendamento
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serviço</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.servico}</TableCell>
                <TableCell>{row.data}</TableCell>
                <TableCell>{row.localizacao}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={statusColors[row.status]} />
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={allRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
        />
      </TableContainer>
    </Box>
  );
}
