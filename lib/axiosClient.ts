// lib/axiosClient.ts
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: 'https://strapi-backend-av9r.onrender.com',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});
