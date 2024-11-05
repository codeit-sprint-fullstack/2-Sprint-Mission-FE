import instance from './apiService';

const handleResponse = async (request) => {
  try {
    const res = await request();
    return res;
  } catch (error) {
    throw error;
  }
}

const signUp = async(data) => 
  handleResponse(() => instance.post('/auth/signUp', data));  // { email, nickname, password, passwordConfirmation }

const signIn = async(data) =>
  handleResponse(async () => {
    const res = await instance.post('/auth/signIn', data);
    const accessToken = res.accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return res;
  });

const getUser = async () =>
  handleResponse(() => instance.get('/users/me'));

const logout = () => {
  localStorage.removeItem('accessToken');
};

export const authApi = {
  signUp,
  signIn,
  getUser,
  logout,
}