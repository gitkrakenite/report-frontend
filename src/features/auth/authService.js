import axios from "axios";
// this file is strictly for the http requests, sending the data back and storing in localstorage

const API_URL = "http://localhost:5000/api/v1/user/";
// const API_URL = "/api/v1/user";

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    // This will make our data persist even when we refresh
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    // This will make our data persist even when we refresh
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
