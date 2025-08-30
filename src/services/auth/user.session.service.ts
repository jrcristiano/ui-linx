import type { Id } from "../../common/types/Id";

const USER_KEY = '@auth:session_user';
const SESSION_EXPIRATION_KEY = '@auth:session_expiration';

export type AuthUser = {
  id: Id;
  name: string;
  lastname: string;
  email: string;
};

export const setUser = (user: AuthUser, rememberMe: boolean = false): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + (rememberMe ? 24 : 1));
    localStorage.setItem(SESSION_EXPIRATION_KEY, expirationDate.toISOString());
  }
};


export const getUser = (): AuthUser | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const removeUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_EXPIRATION_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const user = getUser();
    const expiration = localStorage.getItem(SESSION_EXPIRATION_KEY);
    
    if (!user || !expiration) return false;
    
    return new Date() < new Date(expiration);
  }
  return false;
};

export const updateUser = (updates: Partial<AuthUser>): void => {
  const user = getUser();
  if (user) {
    setUser({ ...user, ...updates });
  }
};

export const getUserProperty = <K extends keyof AuthUser>(key: K): AuthUser[K] | undefined => {
  const user = getUser();
  return user ? user[key] : undefined;
};

export const clearAuthData = (): void => {
  removeUser();
};