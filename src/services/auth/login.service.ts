import api from "../../boot/api";
import type { LoginUserInterface as User } from "../../common/interfaces/auth/login.user.interface";

export function login(user: User) {
  return api.post('auth/login', user);
}
