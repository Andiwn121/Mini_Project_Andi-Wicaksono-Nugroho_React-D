import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "https://6442d0d933997d3ef91a3ac8.mockapi.io",
});

export const uploaderAPI = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1",
});
