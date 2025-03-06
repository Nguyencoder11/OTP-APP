import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VerifyOtp from "./components/form/VerifyOtp";
import SendOtp from "./components/form/SendOtp";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/send-otp" />} />
          <Route path="/send-otp" element={<SendOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </Router>
  );
}

export default App;
