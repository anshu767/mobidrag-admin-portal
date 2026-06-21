import axios from "axios";

export const loginUser = (data) => {
  return axios.post("http://localhost:5000/api/auth/login", data);
};