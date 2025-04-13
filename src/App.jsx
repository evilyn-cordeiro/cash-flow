import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgendamentoCliente from "./pages/AgendamentoCliente";
import Layout from "./layout/Default";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/agendamento" element={<AgendamentoCliente />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
