import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://api.green-api.com",
  timeout: 5000,
});

export default baseUrl;
