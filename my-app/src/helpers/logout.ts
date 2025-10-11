import { deleteCookie } from "@/app/login/action";

export async function logoutUser() {
  await deleteCookie('access_token')
  window.location.reload();
}