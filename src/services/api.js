import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8080/",
});

export default api;