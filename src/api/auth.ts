import axios from "./axios";

interface signupParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface User {
  id: number;
  email: string;
  nickname: string;
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}: signupParams): Promise<{user: User}> {
  const response = await axios.post<{user: User}>(`/auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  const { user } = response.data;
  return { user };
}

interface signInData {
  email: string;
  password: string;
}

export async function signIn(data: signInData): Promise<{user: User}>{
  const response = await axios.post<{user: User}>(`/auth/signIn`, data);
  const { user } = response.data;
  return { user };
}

export async function getMe(): Promise<User> {
  const response = await axios.get<User>(`/users/me`);
  const user = response.data;
  return user;
}
