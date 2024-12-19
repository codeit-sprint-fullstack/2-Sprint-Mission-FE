import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 30000,
});

export default instance;
