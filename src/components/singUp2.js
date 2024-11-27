/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según tu estructura de archivos
import authService from '../services/authService'; // Ajusta la ruta según tu estructura de archivos

const SignUpTwoPage = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      // Crear un objeto con los nombres de los campos correctos
      const completeUserData = {
        nombre: userData.name,
        numero_identificacion: userData.ccNit,
        email: userData.email,
        contacto: userData.phone,
        tipo_cliente: userData.clientType,
        categoria: userData.establishmentType,
        password: formData.password,
      };

      console.log("Datos enviados al backend:", completeUserData); // Agrega este console.log
      const response = await authService.register(completeUserData); // Enviar todos los datos al endpoint
      if (response.status === 200) {
        const token = response.data.access_token; // Suponiendo que el token se devuelve en response.data.access_token
        const expires = new Date(Date.now() + 3600 * 1000).toUTCString(); // 1 hora en milisegundos
        document.cookie = `token=${token}; path=/; expires=${expires}`; // Almacena el token en las cookies con duración de 1 hora
        updateUserData({ token }); // Guarda el token en el contexto de autenticación
        navigate('/clientPage'); // Redirige al usuario a clientPage
      } else {
        // Maneja el caso de registro fallido
        console.error('Error al registrar:', response.data.message);
      }
    } catch (error) {
      console.error('Error al registrar:', error.response ? error.response.data : error.message);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
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
          variant="typography/h6"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          Solo falta un último paso...
        </Typography>
        <Stack direction="row" gap={2}>
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            size="small"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
          <TextField
            fullWidth
            label="Confirmar contraseña"
            variant="outlined"
            size="small"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
          />
        </Stack>
        <Button fullWidth variant="contained" color="primary" sx={{ py: 2 }} onClick={handleSubmit}>
          Registarse
        </Button>
        <Link href="./forgotPassword" color="primary" sx={{ display: "block", mt: 1 }}>
          ¿Ya tienes una cuena? Ingresa Aquí
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpTwoPage;
