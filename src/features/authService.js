import axios from "axios";

const API_URL = "https://vote-ng.herokuapp.com/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// get user
const fetchUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "me", config);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  // return response.data;
  console.log(response.data);
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  fetchUsers,
};

export default authService;
