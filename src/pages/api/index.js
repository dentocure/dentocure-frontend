import axios from 'axios';

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || 'https://dentocure-backend.onrender.com/api/',
  baseURL: 'https://dentocure-backend-latest.onrender.com/api/',
  // Add other defaults if needed:
  // headers: { Authorization: 'Bearer ...' }
});

export default api;