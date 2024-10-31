import axios from 'axios';

const instance = axios.create({
	baseURL: `https://panda-market-api.vercel.app`,
	// baseURL: `http://localhost:3100`,
});

instance.interceptors.request.use(function (config) {
	const user = localStorage.getItem("user");
	if (user) {
		const accessToken = JSON.parse(user).accessToken;
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

instance.interceptors.response.use(res => res, async (error) => {
  const originalRequest = error.config;
  const response = error.response; // 가로챈 리스폰스
	const user = localStorage.getItem("user");
  if (user && response?.status === 401) {
		if (!originalRequest._retry) {
			await instance.post('/auth/refresh-token', { refreshToken: JSON.parse(user).refreshToken }, { _retry: true });
			originalRequest._retry = true;
			return instance(originalRequest);
		} else {
			localStorage.removeItem("user");
			window.location.href = '/login';
		}
  }
  return Promise.reject(error);
});

export default instance;
