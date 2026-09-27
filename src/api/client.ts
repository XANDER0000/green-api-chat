import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export default baseUrl;
