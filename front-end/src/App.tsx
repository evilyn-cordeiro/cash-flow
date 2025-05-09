import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./layout/Default";

// Páginas
import {
  AgendamentoPage,
  ControleFinanceiroPage,
  Dashboard,
  Login,
  NovoLancamento,
} from "./pages";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Layout aplicado às rotas privadas */}
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agendamento" element={<AgendamentoPage />} />
            <Route
              path="/controle-financeiro"
              element={<ControleFinanceiroPage />}
            />
            <Route path="/novo-lancamento" element={<NovoLancamento />} />
          </Route>
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
