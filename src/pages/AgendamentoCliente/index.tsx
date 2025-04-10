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
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalAgendamento } from "./ModalAgendamento";
import { ModalConfirmarCancelamento } from "./ModalCancelamento";

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
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCancelClick = () => {
    setOpenConfirm(true);
    handleMenuClose();
  };

  const handleConfirmCancel = () => {
    console.log("Cancelado: ", selectedRow);
    setOpenConfirm(false);
  };

  const paginatedRows = allRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={isSmallScreen ? 2 : 4}>
      <ModalAgendamento onClose={() => setModalOpen(false)} open={modalOpen} />

      <ModalConfirmarCancelamento
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmCancel}
        servico={selectedRow.servico}
        hora={selectedRow.data}
      />

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
        flexDirection={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSmallScreen ? "stretch" : "center"}
        gap={2}
        mb={3}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          flex={1}
          flexWrap="wrap"
        >
          <TextField
            size="medium"
            label="Buscar"
            placeholder="Serviço, data..."
            variant="outlined"
            fullWidth={isSmallScreen}
          />
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>

        <Box mt={isSmallScreen ? 1 : 0}>
          <Button
            variant="contained"
            size="large"
            fullWidth={isSmallScreen}
            onClick={() => setModalOpen(true)}
          >
            Novo agendamento
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size={isSmallScreen ? "small" : "medium"}>
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
          count={allRows.length}
          page={page}
          onPageChange={(_, newPage) => handleChangePage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
        />
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            console.log("Visualizar", selectedRow);
            handleMenuClose();
          }}
        >
          Visualizar
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Editar", selectedRow);
            handleMenuClose();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem onClick={handleCancelClick}>Cancelar agendamento</MenuItem>
      </Menu>
    </Box>
  );
}
