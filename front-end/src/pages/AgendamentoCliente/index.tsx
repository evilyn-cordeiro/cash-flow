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
import { getMyAppointments } from "../../services/appointmentService";
import ModalConfirmarCancelamento from "./ModalCancelamento";
import ModalConfirmarAgendamento from "./ModalAgendamento";
import dayjs from "dayjs";


const statusColors: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "error",
  COMPLETED: "default",
};

interface Appointment {
  id: number;
  scheduledAt: string;
  status: string;
  notes?: string;
  service: {
    id: number;
    name: string;
    mei: {
      id: number;
      name: string;
    };
  };
  customer: {
    id: number;
    name: string;
  };
}

interface Profissional {
  nome: string;
  funcao: string;
  local: string;
}

export default function AgendamentoPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Appointment | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  // Agendamento
  const [openConfirmAgendamento, setOpenConfirmAgendamento] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = localStorage.getItem("token") || "";
  const meiId = Number(localStorage.getItem("meiId")) || 0;

  useEffect(() => {
    if (token && meiId) {
      getMyAppointments(token)
        .then((data) => setAppointments(data as Appointment[]))
        .catch((err) => console.error("Erro ao carregar agendamentos:", err));
    }
  }, [token, meiId]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, row: Appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleCancelClick = () => {
    setOpenConfirm(true);
    handleMenuClose();
  };

  const handleConfirmCancel = () => {
    console.log("Cancelado: ", selectedRow);
    setOpenConfirm(false);
  };

  const handleAgendar = () => {
    console.log("Agendamento confirmado com:");
    console.log("Profissional:", profissionalSelecionado);
    console.log("Data:", selectedDate.format("YYYY-MM-DD"));
    console.log("Hora:", horarioSelecionado);
    setOpenConfirmAgendamento(false);
  };

  return (
    <Box p={isSmallScreen ? 2 : 4}>
      <ModalConfirmarCancelamento
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmCancel}
        servico={selectedRow?.service?.name || ""}
        hora={selectedRow?.scheduledAt || ""}
      />

      <ModalConfirmarAgendamento
        open={openConfirmAgendamento}
        onClose={() => setOpenConfirmAgendamento(false)}
        onConfirm={handleAgendar}
        profissional={profissionalSelecionado?.nome || ""}
        servico={profissionalSelecionado?.funcao || ""}
        local={profissionalSelecionado?.local || ""}
        data={selectedDate?.format("DD/MM/YYYY") || ""}
        hora={horarioSelecionado}
      />

      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Agendamentos
        </Typography>
        <Typography color="text.secondary">
          Gerenciamento de agendamentos
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
            onClick={() => {
              setProfissionalSelecionado({
                nome: "Ana Souza",
                funcao: "Fisioterapeuta",
                local: "Clínica Vida Saudável - Sala 3",
              });
              setHorarioSelecionado("14:00");
              setSelectedDate(dayjs());
              setOpenConfirmAgendamento(true);
            }}
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
                    {new Date(row.scheduledAt).toLocaleString("pt-BR")}
                  </TableCell>
                )}
                {!isSmallScreen && (
                  <TableCell>{row.service?.mei?.name || "Não informado"}</TableCell>
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
