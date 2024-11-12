import { post } from './axios';

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
