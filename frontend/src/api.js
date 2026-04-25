import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['x-auth-token'] = token;
}

export default api;
