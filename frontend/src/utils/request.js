import axios from "axios";

export const request = axios.create({
  baseURL: "https://inventory-one-self.vercel/api/",
});
