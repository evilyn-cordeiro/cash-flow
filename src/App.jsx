import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Default";
import {
  AgendamentoPage,
  ControleFinanceiroPage,
  Dashboard,
  NovoLancamento,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agendamento" element={<AgendamentoPage />} />
          <Route
            path="/controle-financeiro"
            element={<ControleFinanceiroPage />}
          />
          <Route path="/novo-lancamento" element={<NovoLancamento />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
