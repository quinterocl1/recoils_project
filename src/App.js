import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  ListItemText,
  ListItem,
  List,
  Drawer,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import IconRight from "@mui/icons-material/ArrowForward";
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './singUp';
import ClientPage from "./clientPage";
import SignUpTwoPage from "./singUp2";
import DriverPage from "./driverPage";

const App = () => {
  const navigate = useNavigate();  // Hook para navegación

  const handleRedirectToSignUp = () => {
    navigate("/signUp");  // Redirige a la página de registro
  };

  const handleRedirectToClientPage = () => {
    navigate("/driverPage");  // Redirige a la página de registro
  };

  return (
    <Routes>
      <Route path="/" element={
        <Container
          maxWidth="lg"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: 386,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mr: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 197,
              }}
            >
              <img
                src="/img/image-3.png"
                alt="Image"
                style={{ width: "100%", height: 182 }}
              />
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                <span style={{ color: "#44ac04" }}>REC</span>
                <span style={{ color: "#d4ac04" }}>OILS</span>
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              ¡Hola!, inicia sesión para gestionar tus recolecciones
            </Typography>
            <TextField fullWidth label="CC/NIT" variant="outlined" size="small" />
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              size="small"
            />
            <Button fullWidth variant="contained" color="primary" sx={{ py: 2 }} onClick={handleRedirectToClientPage}>
              Iniciar Sesión
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ¿No estás registrado?{" "}
                <Button color="primary" onClick={handleRedirectToSignUp}>
                  Registrate
                </Button>
              </Typography>
              <Link href="" color="primary" sx={{ display: "block", mt: 1 }}>
                ¿Olvidaste Tu Contraseña?
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              width: 766,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              p: 6,
              bgcolor: "#f5f5f5cc",
              borderRadius: 2,
              backdropFilter: "blur(4px) brightness(100%)",
            }}
          >
            <img
              src="/img/image-5.png"
              alt="Image"
              style={{ width: 370, height: 370, objectFit: "cover" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 5,
                flex: 1,
              }}
            >
              <Typography variant="h4" color="textPrimary">
                Impacto Ambiental del Aceite Usado
              </Typography>
              <Typography variant="body2" color="textPrimary">
                El aceite de cocina usado contamina gravemente las fuentes de agua,
                ya que cada litro de aceite puede afectar más de 1.000 litros de
                agua. <br />
                <br />
                En Colombia, aunque hay normativas sobre la disposición del aceite
                usado, no hay regulaciones específicas para residencias. Para
                abordar esto, Recoils ha creado una red de "Puntos Limpios" en la
                Costa Atlántica para que los hogares puedan reciclar el aceite de
                manera adecuada y ayudar al medio ambiente.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="https://recoils.com.co/puntos-limpios/"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<IconRight />}
              >
                Saber Más
              </Button>
            </Box>
          </Box>
        </Container>
      } />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/clientPage" element={<ClientPage />} />
      <Route path="/driverPage" element={<DriverPage />} />
      <Route path="/signUpTwo" element={<SignUpTwoPage />} />
    </Routes>
  );
};

export default App;
