//import axios from "axios";
//import authHeader from "./auth-header";
import api from './api';

const getPublicContent = () => {
  return api.get("/role/all");
};

const getUserBoard = () => {
  return api.get("/role/user");
};

const getModeratorBoard = () => {
  return api.get("/role/mod");
};

const getAdminBoard = () => {
  return api.get("/role/admin");
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService