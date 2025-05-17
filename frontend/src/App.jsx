import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [admin, setAdmin] = useState(null);

  // Logout handler
  const handleLogout = () => {
    setAdmin(null);
    window.location.href = "/"; // Redirect to homepage
  };

  return (
    <Router>
      <Navbar admin={admin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage setAdmin={setAdmin} admin={admin} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;