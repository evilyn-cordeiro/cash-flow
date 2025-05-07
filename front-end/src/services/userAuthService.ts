import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao fazer login");
    } else {
      throw new Error("Erro de conexão com o servidor");
    }
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Erro ao registrar usuário"
      );
    } else {
      throw new Error("Erro de conexão com o servidor");
    }
  }
};
