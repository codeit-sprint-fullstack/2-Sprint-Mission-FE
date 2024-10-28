import axios from "axios";

const instance = axios.create({
  baseURL: "https://pandamarket-yw41.onrender.com/"
});

export default instance;
