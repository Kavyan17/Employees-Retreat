import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTeams from "./pages/AddTeams";
import "./styles.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-teams" element={<AddTeams />} />
    </Routes>
  </Router>
);

export default App;