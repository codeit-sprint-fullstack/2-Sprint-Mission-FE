import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/"
});

export default instance;
