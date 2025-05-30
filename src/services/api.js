import axios from "axios";

const api = axios.create({
  baseURL: "https://tickers-backend.vercel.app/",
});

export default api;