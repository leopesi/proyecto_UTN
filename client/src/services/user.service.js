//import axios from "axios";
//import authHeader from "./auth-header";
import api from './api';

const API_URL = "http://localhost:8000/api/test/";

const getPublicContent = () => {
  return api.get(API_URL + "all");
};

const getUserBoard = () => {
  return api.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return api.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return api.get(API_URL + "admin");
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService