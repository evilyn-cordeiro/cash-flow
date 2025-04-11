import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgendamentoCliente from "./pages/AgendamentoCliente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div> home</div>} />
        <Route path="/agendamento" element={<AgendamentoCliente />} />
        <Route path="/contato" element={<div>contato</div>} />
      </Routes>
    </Router>
  );
}

export default App;
