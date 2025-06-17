import axios from "axios";

const api = axios.create({
  baseURL: "http://172.29.112.1:5000", 
});

export default api;
