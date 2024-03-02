import axios from "axios";

export const request = axios.create({
  baseURL: "https://inventory-xi-five.vercel.app/api/",
});
