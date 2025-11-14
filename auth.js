import http from "k6/http";
import { check } from "k6";

// Read credentials and URL from environment variables
const BASE_URL = __ENV.BASE_URL;
const USERNAME = __ENV.USERNAME;
const PASSWORD = __ENV.PASSWORD;

export function auth() {
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
    // console.log(`Token: ${token}`);
    return token;
}
