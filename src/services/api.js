import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:8080/",
});

export default api;