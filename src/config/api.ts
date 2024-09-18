import axios from "axios";

const api = axios.create({
  // baseURL: "http://14.225.217.207:8081/api/",
  baseURL: "http://localhost:8080/api/", // Replace with your local API endpoint
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MjU4ODUwOTAsImV4cCI6MTcyNTk3MTQ5MH0.gSs8ix40HFYxClS-Gc33j8-MDtnungJBJqHrH_-N2ZZpkmaFQm1SaGNWcWFzMSkx";
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
