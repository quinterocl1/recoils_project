import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import IconRight from "@mui/icons-material/ArrowForward";
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {

  const navigate = useNavigate();  // Hook para redirección

  const handleRedirectToLogin = () => {
    navigate("/");  // Redirige a la página de login
  };

  const handleRedirectToSignUpTwo = () => {
    navigate("/signUpTwo");  // Redirige a la página de login
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          m: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
         Bienvenido, registrate para realizar tu primera recolección
        </Typography>
        <Stack direction="row" gap={2}> 
          <TextField fullWidth label="Nombre/Razón Social" variant="outlined" defaultValue="Small"
          size="small" />
          <TextField fullWidth label="Cc/Nit" variant="outlined" defaultValue="Small"
          size="small" />
        </Stack>
        <Stack direction="row" gap={2} > 
          <TextField fullWidth label="Correo Electrónico" variant="outlined" defaultValue="Small"
          size="small" />
          <TextField fullWidth label="Número de Teléfono" variant="outlined" defaultValue="Small"
          size="small" />
        </Stack>
        <Stack direction="row" gap={2} > 
          <TextField fullWidth label="Dirección" variant="outlined" defaultValue="Small"
          size="small" />
        </Stack>
       
        <Button fullWidth variant="contained" color="primary" sx={{ py: 2}} onClick={handleRedirectToSignUpTwo}>
          Continuar
        </Button>
        <Button color="primary" onClick={handleRedirectToLogin}>
        ¿Ya tienes una cuena? Ingresa Aquí
              </Button>
      </Box>
      </Container>
  );
};

export default SignUpPage;