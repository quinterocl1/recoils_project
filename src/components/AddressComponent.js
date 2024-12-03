import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AddressesComponent = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await axios.get('http://localhost:3000/api/direcciones', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error al obtener las direcciones:', error);
    }
  };

  const handleAddAddress = async () => {
    if (newAddress.trim() === '') return;

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      await axios.post('http://localhost:3000/api/direcciones',
        { name: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewAddress('');
      fetchAddresses();
    } catch (error) {
      console.error('Error al agregar la dirección:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      await axios.delete(`http://localhost:3000/api/clientes/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAddresses();
    } catch (error) {
      console.error('Error al eliminar la dirección:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Mis Direcciones
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Nueva dirección"
          variant="outlined"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddAddress}>
          Agregar
        </Button>
      </Box>
      <List>
        {addresses.map((address) => (
          <ListItem
            key={address.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAddress(address.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={address.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddressesComponent;
