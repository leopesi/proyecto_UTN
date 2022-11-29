//Authentication service
import TokenService from "./token.service";
import api from "./api";

const API_URL = "http://localhost:8000/api/auth/";

const register = (username, email, password) => {
  return api.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return api.post(API_URL + "signin", {
      username,
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