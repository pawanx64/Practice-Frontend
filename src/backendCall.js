import axios from 'axios';

// Create an Axios instance with a base URL and additional configuration   
const api = axios.create({
  baseURL: 'https://practice-backend-lilac.vercel.app/',                       // https://login-signup-ufa9.onrender.com/
  withCredentials: true,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
  },
});

export default api;