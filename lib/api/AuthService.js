import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!', err.response ? err.response.data : err);
    throw err;
  }
);

async function post(url, body) {
  try {
    return await instance.post(url, body);
  } catch (error) {
    console.error(`POST 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function signIn({ email, password }) {
  const res = await post('/auth/signIn', { email, password });
  return res.data;
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation
}) {
  const res = await post('/auth/signUp', {
    email,
    nickname,
    password,
    passwordConfirmation
  });
  return res.data;
}

const auth = {
  signIn,
  signUp
};

export default auth;
