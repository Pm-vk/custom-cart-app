import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL + "/api",
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Optional
  },
});

export { axiosClient };
