import axios from "axios";

const API = axios.create({
  baseURL: "https://plannetpulse.onrender.com/api",
});

export default API;