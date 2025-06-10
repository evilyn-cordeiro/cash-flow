import React, { useEffect, useState } from "react";
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
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { ModalAgendamento } from "./ModalAgendamento";
import { ModalConfirmarCancelamento } from "./ModalCancelamento";
import { getMyAppointments } from "../services/appointmentService";

const statusColors = {
  Pendente: "warning",
  Confirmado: "success",
  Cancelado: "error",
};

export default function AgendamentoPage() {
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getMyAppointments(token)
        .then(setAppointments)
        .catch((err) => console.error("Erro ao carregar agendamentos:", err));
    }
  }, [token]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
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

  return (
    <Box p={isSmallScreen ? 2 : 4}>
      <ModalAgendamento onClose={() => setModalOpen(false)} open={modalOpen} />
      <ModalConfirmarCancelamento
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmCancel}
        servico={selectedRow?.service?.name || ""}
        hora={selectedRow?.dateTime || ""}
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
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <TextField
            size="medium"
            label="Buscar"
            placeholder="Serviço, data..."
            variant="outlined"
            fullWidth
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
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            {!isSmallScreen && "Novo Agendamento"}
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size={isSmallScreen ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Serviço</TableCell>
              {!isSmallScreen && <TableCell>Data</TableCell>}
              {!isSmallScreen && <TableCell>Profissional</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.service?.name}</TableCell>
                {!isSmallScreen && (
                  <TableCell>
                    {new Date(row.dateTime).toLocaleString("pt-BR")}
                  </TableCell>
                )}
                {!isSmallScreen && (
                  <TableCell>{row.mei?.name || "Não informado"}</TableCell>
                )}
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusColors[row.status] || "default"}
                  />
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
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
