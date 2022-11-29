//Authentication service
import TokenService from "./token.service";
import api from "./api";

const API_URL = "http://localhost:8000/auth/";

const register = (nombre, apellido, email, password) => {
  return api.post(API_URL + "signup", {
    nombre,
    apellido,
    email,
    password,
  });
};

const login = (nombre, password) => {
  return api.post(API_URL + "signin", {
      nombre,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data)
        //localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService =  {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService