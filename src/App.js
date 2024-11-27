import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Ajusta la ruta según tu estructura de archivos
import LogIn from "./components/logIn";
import SignUpPage from "./components/singUp";
import ClientPage from "./components/clientPage";
import DriverPage from "./components/driverPage";
import SignUpTwoPage from "./components/singUp2";

const App = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  useEffect(() => {
    if (userData.token) {
      navigate('/clientPage');
    }
  }, [userData, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/clientPage" element={<ClientPage />} />
      <Route path="/driverPage" element={<DriverPage />} />
      <Route path="/signUpTwo" element={<SignUpTwoPage />} />
    </Routes>
  );
};

export default App;
