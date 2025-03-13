import axios from "axios";

const API_URL = import.meta.env.VITE_REDBERRY_API;
const auth = import.meta.env.VITE_REDBERRY_AUTHORIZATION;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: auth,
  },
});

export default api;
