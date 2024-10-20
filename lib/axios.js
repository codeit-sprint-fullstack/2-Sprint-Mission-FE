import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://codeit-sprint6-api.onrender.com',
});

export default instance;
