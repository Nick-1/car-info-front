import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_NEST_URL,
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('authToken');

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, error => {
  return Promise.reject(error);
});
