import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const HistoryComponent = () => {
  const [rows, setRows] = useState([]);
  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    const fetchHistory = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      try {
        const response = await axios.get('http://localhost:3000/api/solicitudes_recoleccion/historial', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const formattedRows = response.data.map((item, index) => {
          const date = new Date(item.fecha_solicitud);
          const day = date.getDate();
          const month = date.toLocaleString('es-ES', { month: 'long' });
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12; // the hour '0' should be '12'
          const minutes = date.getMinutes();
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          const formattedDate = ` ${capitalizeFirstLetter(month)} ${day}, ${year}`;
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

          return {
            id: index, // Usamos el índice como id único
            fechaSolicitud: `${formattedDate} ${formattedTime}`,
            direccion: item.direccion,
            nPimpinas: item.numero_pinpinas,
            conductor: item.conductor,
            ccConductor: item.cedula_conductor,
            placaVehiculo: item.placa_vehiculo,
            telefono: item.telefono,
            indicaciones: item.indicaciones,
          };
        });
        setRows(formattedRows);
      } catch (error) {
        console.error('Error al obtener el historial de recolección:', error);
      }
    };

    fetchHistory();
  }, []);

  const columns = [
    { field: 'fechaSolicitud', headerName: 'Fecha Solicitud', width: 180 },
    { field: 'direccion', headerName: 'Dirección', width: 200 },
    { field: 'nPimpinas', headerName: 'N° Pimpinas', width: 120 },
    { field: 'conductor', headerName: 'Conductor', width: 150 },
    { field: 'ccConductor', headerName: 'Cc Conductor', width: 120 },
    { field: 'placaVehiculo', headerName: 'Placa Vehiculo', width: 150 },
    { field: 'telefono', headerName: 'Teléfono', width: 120 },
    { field: 'indicaciones', headerName: 'Indicaciones', width: 200 },
  ];

  return (
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
          getRowId={(row) => row.id} // Especificamos el id personalizado
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
};

export default HistoryComponent;
