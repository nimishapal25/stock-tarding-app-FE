import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Attach token to every request
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
