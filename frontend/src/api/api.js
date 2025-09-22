import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-mern-ccrh.onrender.com",
  headers: { "Content-Type": "application/json" }
});

// JWT token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
