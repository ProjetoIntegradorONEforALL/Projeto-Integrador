import axios from "axios";

const api = axios.create({
  baseURL: "http://52.20.151.92:3000", 
});

export default api;
