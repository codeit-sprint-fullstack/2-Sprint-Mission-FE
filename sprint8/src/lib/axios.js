import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint8back.onrender.com/'
});

export default instance;
