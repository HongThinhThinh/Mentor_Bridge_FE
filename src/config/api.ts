import axios from "axios";
const SERVER = import.meta.env.VITE_API_URL_SERVER;
const LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const api = axios.create({
  baseURL: SERVER,
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
