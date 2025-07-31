// src/app/api/api.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://10.89.96.13:8080/api', // replace with your IP
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
// 

// Automatically include JWT in requests
api.interceptors.request.use(async (config) => {
  const t = await SecureStore.getItemAsync('token');

  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

export default api;
