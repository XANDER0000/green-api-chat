import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export default baseUrl;
