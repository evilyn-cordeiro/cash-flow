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
import { AuthProvider } from "./utils/authContext";
import RoleBasedRoute from "./routes/Roles";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              {/* Rota só para MEI */}
              <Route element={<RoleBasedRoute allowedRoles={["MEI"]} />}>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/controle-financeiro"
                  element={<ControleFinanceiroPage />}
                />
              </Route>

              {/* Rota só para Cliente */}
              <Route element={<RoleBasedRoute allowedRoles={["Customer"]} />}>
                <Route path="/agendamento" element={<AgendamentoPage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
