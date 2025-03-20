import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
