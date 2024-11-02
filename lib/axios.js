import axios from "axios";
const instance = axios.create({
  // baseURL: "https://comazon-4iuc.onrender.com"
  baseURL: "http://localhost:3001"
});
export default instance;
