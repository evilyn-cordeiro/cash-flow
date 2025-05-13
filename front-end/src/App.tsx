import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Default";
import {
  AgendamentoPage,
  ControleFinanceiroPage,
  Dashboard,
  Login,
} from "./pages";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Layout aplicado às rotas privadas */}
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agendamento" element={<AgendamentoPage />} />
            <Route
              path="/controle-financeiro"
              element={<ControleFinanceiroPage />}
            />
          </Route>
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
