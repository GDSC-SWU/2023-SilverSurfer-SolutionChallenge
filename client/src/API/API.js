import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  withCredentials: true,
});

console.log(process.env.REACT_APP_API_BASE_URL);

export default API;
