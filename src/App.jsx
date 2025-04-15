import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgendamentoCliente from "./pages/AgendamentoCliente";
import Layout from "./layout/Default";
import ControleFinanceiro from "./pages/ControleFinanceiro";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agendamento" element={<AgendamentoCliente />} />
          <Route path="/controle-financeiro" element={<ControleFinanceiro />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
