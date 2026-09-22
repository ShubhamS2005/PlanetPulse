import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/MainLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import LogActivity from "./pages/LogActivity.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log" element={<LogActivity />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;