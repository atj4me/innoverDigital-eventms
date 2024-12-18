import axios from "axios";
import { BASE_URL } from "../constants";

// Custom API Service to inject the base URL
const api = axios.create({
  baseURL: BASE_URL,
});


export default api;
