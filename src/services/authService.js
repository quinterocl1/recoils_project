import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Ajusta la URL según tu backend

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
};
