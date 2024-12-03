import React, { useEffect, useState } from "react";
import {
  Box,
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
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddressesComponent from './AddressComponent';
import HistoryComponent from './HistoryComponent';
import dayjs from 'dayjs';

const ClientPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("info");
  const [userData, setUserData] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleListItemClick = (component) => {
    setActiveComponent(component);
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/"; // Redirige a la página de inicio de sesión
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/clientes/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const InfoComponent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack gap={2}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Perfil Usuario
        </Typography>
        <Stack direction="row" gap={2}>
          <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            Nombre/Rázon Social
          </Typography>
          <Typography variant="body1" component="div">
            {userData?.nombre}
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            Número de Identificación
          </Typography>
          <Typography variant="body1" component="div">
            {userData?.numero_identificacion}
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            Correo Electrónico
          </Typography>
          <Typography variant="body1" component="div">
            {userData?.email}
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            Teléfono
          </Typography>
          <Typography variant="body1" component="div">
            {userData?.contacto}
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            Tipo de Cliente
          </Typography>
          <Typography variant="body1" component="div">
            {capitalizeFirstLetter(userData?.tipo_cliente)}
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
            Tipo de Establecimiento
          </Typography>
          <Typography variant="body1" component="div">
            {capitalizeFirstLetter(userData?.categoria)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );

  const RequestPickupComponent = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [numberOfContainers, setNumberOfContainers] = useState('');
    const [additionalInstructions, setAdditionalInstructions] = useState('');

    useEffect(() => {
      const fetchAddresses = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        try {
          const response = await axios.get('http://localhost:3000/api/direcciones', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Direcciones obtenidas:', response.data); // Verificar la respuesta del backend
          setAddresses(response.data);
        } catch (error) {
          console.error('Error al obtener las direcciones:', error);
        }
      };

      fetchAddresses();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      try {
        await axios.post('http://localhost:3000/api/solicitudes_recoleccion',
          {
            id_direccion: selectedAddress,
            fecha_programada: pickupDate,
            numero_pinpinas: numberOfContainers,
            detalles_adicionales: additionalInstructions
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert('Solicitud de recolección creada con éxito');
        // Limpiar el formulario después de enviar
        setSelectedAddress('');
        setPhoneNumber('');
        setPickupDate('');
        setNumberOfContainers('');
        setAdditionalInstructions('');
      } catch (error) {
        console.error('Error al crear la solicitud de recolección:', error);
        alert('Error al crear la solicitud de recolección');
      }
    };

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}
        >
          Solicitar Recolección
        </Typography>
        <Stack gap={3} sx={{ width: "100%" }}>
          <Stack direction='row' gap={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="address-select-label">Dirección</InputLabel>
              <Select
                labelId="address-select-label"
                value={selectedAddress}
                label="Dirección"
                onChange={(e) => setSelectedAddress(e.target.value)}
                required
              >
                {addresses.map((address) => (
                  <MenuItem key={address.id} value={address.id}>
                    {address.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Número de Teléfono"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="small"
              required
            />
          </Stack>

          <Stack direction="row" gap={2} sx={{ width: "100%" }}>
            <Stack sx={{ flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Fecha de recolección"
                  value={pickupDate ? dayjs(pickupDate) : null}
                  onChange={(newValue) => setPickupDate(newValue)}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "40px",
                    },
                  }}
                  required
                />
              </LocalizationProvider>
            </Stack>
            <TextField
              label="Número de Pimpinas"
              variant="outlined"
              size="small"
              type="number"
              value={numberOfContainers}
              onChange={(e) => setNumberOfContainers(e.target.value)}
              sx={{ flex: 1 }}
              required
            />
          </Stack>

          <TextField
            fullWidth
            label="Indicaciones Adicionales"
            variant="outlined"
            multiline
            rows={3}
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Crear Solicitud
          </Button>
        </Stack>
      </Box>
    );
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "info":
        return <InfoComponent />;
      case "requestPickup":
        return <RequestPickupComponent />;
      case "history":
        return <HistoryComponent />;
      case "addresses":
        return <AddressesComponent />;
      default:
        return <InfoComponent />;
    }
  };

  return (
    <>
      <AppBar position="fixed" color="background">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)} // Abre el Drawer al hacer clic
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", textAlign: "", flexGrow: 1 }}
          >
            <span style={{ color: "#44ac04" }}>REC</span>
            <span style={{ color: "#d4ac04" }}>OILS</span>
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en móviles
        }}
        sx={{
          '& .MuiDrawer-paper': {
            top: '64px', // Ajusta para que el Drawer esté justo debajo del AppBar (64px es la altura del AppBar por defecto)
          },
        }}
      >
        <List>
          <ListItem button onClick={() => handleListItemClick("info")}>
            <ListItemText primary="Información" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick("addresses")}>
            <ListItemText primary="Direcciones" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick("requestPickup")}>
            <ListItemText primary="Solicitar Recolección" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick("history")}>
            <ListItemText primary="Historial" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ padding: '20px', marginTop: '64px' }}>
        {renderComponent()}
      </div>
    </>
  );
};

export default ClientPage;
