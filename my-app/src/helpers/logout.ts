export function logoutUser() {
  cookieStore.delete('access_token')
  window.location.reload();
}