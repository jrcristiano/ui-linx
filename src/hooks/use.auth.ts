import { hasToken } from "../services/auth/token.service";
import { isAuthenticated } from "../services/auth/user.session.service";

export function useAuth() {
  const isAuthenticatedUser = isAuthenticated() && hasToken();
  return {
    isAuthenticatedUser,
  };
}
