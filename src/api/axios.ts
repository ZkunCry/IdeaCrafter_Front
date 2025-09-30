import axios from "axios";
import { API } from "../constants/config";
export const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
