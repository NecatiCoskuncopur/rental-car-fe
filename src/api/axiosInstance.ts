import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Session expired or unauthorized access');
    }
    return Promise.reject(error);
  },
);

export default api;
