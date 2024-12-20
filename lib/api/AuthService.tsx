import { post } from './axios';
import { SignIn, SignUp } from '@/types/type';

export async function signIn({ email, password }: SignIn) {
  const res = await post('/auth/signIn', { email, password });
  return res.data;
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation
}: SignUp) {
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
