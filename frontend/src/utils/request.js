import axios from "axios";

export const request = axios.create({
  baseURL: "https://inventory-ttk7.onrender.com/api/",
});
