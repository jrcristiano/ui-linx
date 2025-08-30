import api from "../../boot/api";
import type { RegisterUserInterface as User } from "../../common/interfaces/auth/register.user.interface";

export function register(user: User) {
  return api.post('auth/register', user);
}
