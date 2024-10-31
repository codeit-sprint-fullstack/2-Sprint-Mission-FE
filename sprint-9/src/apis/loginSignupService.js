import instance from './instance.js';

export async function postLogin({ email = '', password = '' }) {
	const user = await instance.post(`/auth/signIn`, { email, password });
	return user.data;
}
/*
{
  "accessToken": "accessToken",
  "refreshToken": "refresh",
  "user": {
    "id": 123,
    "email": "example@email.com",
    "image": null,
    "nickname": "example",
    "updatedAt": "2024-09-23T09:36:25.383Z",
    "createdAt": "2024-09-23T09:36:25.383Z"
  }
}
*/

export async function postSignup({
		email = '',
		nickname = '',
		password = '',
		passwordConfirmation = '',
	},
) {
	const user = await instance.post(`/auth/signUp`, { email, nickname, password, passwordConfirmation });
	return user.data;
}
/*
{
  "accessToken": "accessToken",
  "refreshToken": "refreshToken",
  "user": {
    "id": 123,
    "email": "example@email.com",
    "image": null,
    "nickname": "example",
    "updatedAt": "2024-09-23T09:36:25.381Z",
    "createdAt": "2024-09-23T09:36:25.381Z"
  }
}
*/
