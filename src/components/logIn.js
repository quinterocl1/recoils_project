import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconRight from "@mui/icons-material/ArrowForward";
import authService from '../services/authService'; // Ajusta la ruta según tu estructura de archivos
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según tu estructura de archivos

const LogIn = () => {
  const navigate = useNavigate();
  const { updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    numero_identificacion: '',
    password: '',
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
    try {
      const response = await authService.login(formData); // Llama a la función de login del servicio de autenticación
      console.log(response);
      if (response.status === 201) {
        const token = response.data.access_token; // Suponiendo que el token se devuelve en response.data.access_token
        const expires = new Date(Date.now() + 3600 * 1000).toUTCString(); // 1 hora en milisegundos
        document.cookie = `token=${token}; path=/; expires=${expires}`; // Almacena el token en las cookies con duración de 1 hora
        updateUserData({ token }); // Guarda el token en el contexto de autenticación
        navigate('/clientPage'); // Redirige al usuario a clientPage
      } else {
        // Maneja el caso de autenticación fallida
        console.error('Error al iniciar sesión:', response.data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    }
  };

  const handleRedirectToSignUp = () => {
    navigate('/signUp');
  };

  return (
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
        <TextField
          fullWidth
          label="CC/NIT"
          variant="outlined"
          size="small"
          name="numero_identificacion"
          value={formData.numero_identificacion}
          onChange={handleChange}
        />
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
        <Button fullWidth variant="contained" color="primary" sx={{ py: 2 }} onClick={handleSubmit}>
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
  );
};

export default LogIn;
