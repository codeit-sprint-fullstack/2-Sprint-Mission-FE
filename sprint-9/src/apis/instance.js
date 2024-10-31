import axios from 'axios';

const instance = axios.create({
	baseURL: `https://panda-market-api.vercel.app`,
	// baseURL: `http://localhost:3100`,
});

export default instance;
