import axios from "axios";

const api = axios.create({
  baseURL: "https://product-fzqz.onrender.com/api",
});

export default api;
