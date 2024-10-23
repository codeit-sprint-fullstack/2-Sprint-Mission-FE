import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://two-sprint-mission-be-jqel.onrender.com/',
});

export default instance;
