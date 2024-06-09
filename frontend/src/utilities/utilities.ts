import { useCookies } from "vue3-cookies";

const cookies = useCookies();

export default async function checkLogin() {
  const tokenBearer = cookies.cookies.get("Token");
  const userId = cookies.cookies.get("UserId");
  return tokenBearer && userId;
}
