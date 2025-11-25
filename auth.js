import http from "k6/http";
import { check } from "k6";
import { BASE_URL, USERNAME, PASSWORD } from "./config.js";

export function auth() {
    if (!BASE_URL || !USERNAME || !PASSWORD) {
        throw new Error("Config values undefined");
    }

    const payload = JSON.stringify({ username: USERNAME.trim(), password: PASSWORD.trim() });

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",      // Add this to match Postman
    };

    const result = http.post(`${BASE_URL}/auth`, payload, { headers });

    console.log("Auth payload:", payload);
    console.log("Auth response body:", result.body);

    check(result, {
        "auth status 200": (r) => r.status === 200,
        "token received": (r) => {
            const token = r.json("token");
            return token !== undefined;
        }
    });

    return result.json("token"); // adjust key if API returns 'access_token'
}
