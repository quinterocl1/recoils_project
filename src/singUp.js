import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Ajusta la ruta según tu estructura de archivos

const SignUpPage = () => {
  const navigate = useNavigate();
  const { updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    ccNit: '',
    email: '',
    phone: '',
    address: '',
    clientType: '',
    establishmentType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(formData); // Almacenar datos en el contexto
    navigate("/signUpTwo");
  };

  const handleRedirectToLogin = () => {
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
        <Stack direction="column" gap={3} sx={12}>
          <Stack direction='row' gap={3}>
            <TextField
              fullWidth
              label="Nombre/Razón Social"
              variant="outlined"
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Cc/Nit"
              variant="outlined"
              size="small"
              name="ccNit"
              value={formData.ccNit}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction='row' gap={3}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              size="small"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Número de Teléfono"
              variant="outlined"
              size="small"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction='row' gap={3}>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              size="small"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de Cliente</InputLabel>
              <Select
                label="Tipo de Cliente"
                defaultValue=""
                name="clientType"
                value={formData.clientType}
                onChange={handleChange}
              >
                <MenuItem value="juridico">Jurídico</MenuItem>
                <MenuItem value="natural">Natural</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction='row' gap={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de Establecimiento</InputLabel>
              <Select
                label="Tipo de Establecimiento"
                defaultValue=""
                name="establishmentType"
                value={formData.establishmentType}
                onChange={handleChange}
              >
                <MenuItem value="restaurante">Restaurante</MenuItem>
                <MenuItem value="centro_comercial">Centro Comercial</MenuItem>
                <MenuItem value="conjunto_residencial">Conjunto Residencial</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Button fullWidth variant="contained" color="primary" sx={{ py: 2 }} onClick={handleSubmit}>
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
