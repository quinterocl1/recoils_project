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

import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Router, Routes, Route, useNavigate } from 'react-router-dom';


const ClientPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("info");

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

  const InfoComponent = () => (<Box
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
        <Typography variant="body1"
          component="div" sx={{ fontWeight: "bold" }}> Nombre/Rázon Social</Typography>
        <Typography variant="body1"
          component="div"> Galleticas Lucho</Typography>
        <Typography component="div" sx={{ fontWeight: "bold" }}> Galleticas Lucho</Typography>
        <Typography variant="body1"
          component="div"> 1122334455</Typography>
      </Stack>
      <Stack direction="row" gap={2} >
        <Typography variant="body1"
          component="div" sx={{ fontWeight: "bold" }}> Dirección</Typography>
        <Typography variant="body1"
          component="div"> Calle 100</Typography>
        <Typography variant="body1"
          component="div" sx={{ fontWeight: "bold" }}> Correo Electrónico</Typography>
        <Typography variant="body1"
          component="div">   gl@correo.com.co</Typography>
      </Stack>
      <Stack direction="row" gap={2} >
        <Typography variant="body1"
          component="div" sx={{ fontWeight: "bold" }}> Teléfono</Typography>
        <Typography variant="body1"
          component="div"> 3333333333</Typography>
      </Stack>
    </Stack>
  </Box>);
  const RequestPickupComponent = () => (<Box
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
        Solicitar Recolección
      </Typography>
      <Stack direction="row" gap={2}>
        <TextField fullWidth label="Dirección" variant="outlined" defaultValue="Small"
          size="small" />
        <TextField fullWidth label="Número de Teléfono" variant="outlined" defaultValue="Small"
          size="small" />
      </Stack>
      <Stack direction="row" gap={2} >
        <TextField fullWidth label="Fecha de Recolección" variant="outlined" defaultValue="Small"
          size="small" />
        <TextField fullWidth label="Número de Pimpinas" variant="outlined" defaultValue="Small"
          size="small" />
      </Stack>
      <Stack direction="row" gap={2} >
        <TextField fullWidth label="Indicaciones Adicionales" variant="outlined" defaultValue="Small"
          size="small" />
      </Stack>
    </Stack>
  </Box>);
  const HistoryComponent = () => (<Box
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
  </Box>);

  const renderComponent = () => {
    switch (activeComponent) {
      case "info":
        return <InfoComponent />;
      case "requestPickup":
        return <RequestPickupComponent />;
      case "history":
        return <HistoryComponent />;
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
  )
}

export default ClientPage;