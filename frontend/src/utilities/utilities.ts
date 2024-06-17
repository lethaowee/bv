import { useCookies } from "vue3-cookies";

const cookies = useCookies();

export default function checkLogin() {
  const tokenBearer = cookies.cookies.get("Token");
  const userId = cookies.cookies.get("UserId");
  console.log(tokenBearer, userId);
  return (
    tokenBearer != undefined &&
    userId != undefined &&
    tokenBearer != "" &&
    userId != ""
  );
}
