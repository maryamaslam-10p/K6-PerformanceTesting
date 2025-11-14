import http from "k6/http";
import { check } from "k6";
import { BASE_URL, USERNAME, PASSWORD } from "./config.js";

export function auth() 
{
  const payload = {
    username: USERNAME,
    password: PASSWORD,
  };

   const result = http.post(`${BASE_URL}/auth`, JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
  });

  check(result, {
    "auth status 200": (r) => r.status === 200,
    "token received": (r) => r.json("token") !== undefined,
  });

  const token = result.json("token");
  console.log(`Token: ${token}`);
  return token;

}