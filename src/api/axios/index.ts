import axios from "axios";

export const api = axios.create();

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('authToken');

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, error => {
  return Promise.reject(error);
});
