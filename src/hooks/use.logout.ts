export function useLogout() {
  localStorage.removeItem("auth");
  localStorage.removeItem("@auth:session_user");
  localStorage.removeItem("@auth:session_expiration");
  window.location.href = "/login";
}
