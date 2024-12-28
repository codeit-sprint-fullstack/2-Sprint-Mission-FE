export interface User {
    id: number;
    email?: string;
    nickname: string;
    image?: string;
}

export interface SignUpParams {
    email: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
}


export interface SignInParams {
    email: string;
    password: string;
}
