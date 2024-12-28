const ACCESS_TOKEN_KEY = "pandamarket-at";
const REFRESH_TOKEN_KEY = "pandamarket-rt";

interface Tokens {
  accessToken: string | null;
  refreshToken: string| null;
}


export function getTokens(): Tokens {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
}

interface SetTokensParams {
  accessToken: string;
  refreshToken: string;
}

export function setTokens({ accessToken, refreshToken }: SetTokensParams): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, "");
  localStorage.setItem(REFRESH_TOKEN_KEY, "");
}
