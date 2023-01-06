import axios from "axios";

const instance = axios.create({
  baseURL: "https://proyectoutn.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;