import axios from "axios";

const API_BASE_URL = "http://localhost:3000/appointment";

// Buscar os agendamentos do cliente logado
export const getMyAppointments = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Criar um novo agendamento
export const createAppointment = async (
  appointmentData: {
    serviceId: number;
    meiId: number;
    dateTime: string;
  },
  token: string
) => {
  const response = await axios.post(`${API_BASE_URL}/create`, appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Listar agendamentos de um MEI (opcional)
export const getAppointmentsByMei = async (meiId: number, token: string) => {
  const response = await axios.get(`${API_BASE_URL}/mei/${meiId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
