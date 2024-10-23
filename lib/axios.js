import axios from "axios";

const instance = axios.create({
  baseURL: "https://two-sprint-mission-be-yj7h.onrender.com",
});

export default instance;
