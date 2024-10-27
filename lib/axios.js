import axios from "axios";
const instance = axios.create({
  baseURL: "https://comazon-4iuc.onrender.com"
});
export default instance;
