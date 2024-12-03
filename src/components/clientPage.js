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
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddressesComponent from './AddressComponenet';
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

  const HistoryComponent = () => (
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
          sx={{ fontWeight: "bold", textAlign: 'left' }}
        >
          Historial de Recolección
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Stack>
    </Box>
  );

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

  const columns = [
    { field: 'fechaSolicitud', headerName: 'Fecha Solicitud', width: 90 },
    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 150,
      editable: true,
    },
    {
      field: 'nPimpinas',
      headerName: 'N° Pimpinas',
      width: 150,
      editable: true,
    },
    {
      field: 'conductor',
      headerName: 'Conductor',
      width: 110,
      editable: true,
    },
    {
      field: 'ccConductor',
      headerName: 'Cc Conductor',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'placaVehiculo',
      headerName: 'Placa Vehiculo',
      width: 110,
      editable: true,
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'indicaciones',
      headerName: 'Indicaciones',
      width: 110,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, fechaSolicitud: '2024-10-01', direccion: 'Calle 123', nPimpinas: 5, conductor: 'Carlos Pérez', ccConductor: 12345678, placaVehiculo: 'ABC123', telefono: 3001234567, indicaciones: 'Sin indicaciones' },
    { id: 2, fechaSolicitud: '2024-10-02', direccion: 'Carrera 45', nPimpinas: 3, conductor: 'Ana Gómez', ccConductor: 87654321, placaVehiculo: 'DEF456', telefono: 3201234567, indicaciones: 'Llamar antes' },
    { id: 3, fechaSolicitud: '2024-10-03', direccion: 'Avenida 10', nPimpinas: 8, conductor: 'Luis Martínez', ccConductor: 23456789, placaVehiculo: 'GHI789', telefono: 3101234567, indicaciones: 'Entregar antes de mediodía' },
    { id: 4, fechaSolicitud: '2024-10-04', direccion: 'Calle 56', nPimpinas: 2, conductor: 'Maria Fernanda', ccConductor: 34567890, placaVehiculo: 'JKL012', telefono: 3002345678, indicaciones: 'Confirmar con el cliente' },
    { id: 5, fechaSolicitud: '2024-10-05', direccion: 'Carrera 78', nPimpinas: 6, conductor: 'Jorge Ramírez', ccConductor: 45678901, placaVehiculo: 'MNO345', telefono: 3151234567, indicaciones: 'Evitar horas pico' },
    { id: 6, fechaSolicitud: '2024-10-06', direccion: 'Avenida 90', nPimpinas: 10, conductor: 'Claudia Ríos', ccConductor: 56789012, placaVehiculo: 'PQR678', telefono: 3121234567, indicaciones: 'No tiene' },
    { id: 7, fechaSolicitud: '2024-10-07', direccion: 'Calle 34', nPimpinas: 4, conductor: 'Raúl López', ccConductor: 67890123, placaVehiculo: 'STU901', telefono: 3102345678, indicaciones: 'Requiere firma' },
    { id: 8, fechaSolicitud: '2024-10-08', direccion: 'Carrera 23', nPimpinas: 7, conductor: 'Lucía Herrera', ccConductor: 78901234, placaVehiculo: 'VWX234', telefono: 3191234567, indicaciones: 'Fragil, manejar con cuidado' },
    { id: 9, fechaSolicitud: '2024-10-09', direccion: 'Avenida 13', nPimpinas: 12, conductor: 'Miguel Díaz', ccConductor: 89012345, placaVehiculo: 'YZA567', telefono: 3112345678, indicaciones: 'Entrega rápida' },
    { id: 10, fechaSolicitud: '2024-10-10', direccion: 'Calle 76', nPimpinas: 9, conductor: 'Paola Álvarez', ccConductor: 90123456, placaVehiculo: 'BCD890', telefono: 3221234567, indicaciones: 'Confirmar antes de salir' },
  ];

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
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            <span style={{ color: "#44ac04" }}>REC</span>
            <span style={{ color: "#d4ac04" }}>OILS</span>
          </Typography>
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
