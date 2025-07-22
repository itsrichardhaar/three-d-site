// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Model from "./pages/Model";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d-model" element={<Model />} />
      </Routes>
    </Router>
  );
}

export default App;

