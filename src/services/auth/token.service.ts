const TOKEN_KEY = 'auth';

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};


export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const hasToken = (): boolean => {
  return getToken() !== null;
};

export const getTokenPayload = <T = unknown>(): T | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson) as T;
  } catch (error) {
    console.error('Failed to decode token payload:', error);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const payload = getTokenPayload<{ exp?: number }>();
  if (!payload || !payload.exp) return false;

  return Date.now() >= payload.exp * 1000;
};

export const isAuthenticated = (): boolean => {
  return hasToken() && !isTokenExpired();
};