import axios from "axios";
import useAuthStore from "../store/authStore";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization= `Bearer ${token}`;
      config.headers["Content-Type"]="application/json"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
