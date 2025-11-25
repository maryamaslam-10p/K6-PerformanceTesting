import http from "k6/http";
import { check } from "k6";
import { BASE_URL, USERNAME, PASSWORD } from "./config.js"; // import from config.js

export function auth() {
    // Safety check to avoid undefined values
    if (!BASE_URL || !USERNAME || !PASSWORD) {
        console.error("❌ Missing config values. Make sure config.js exists or env variables are set.");
        throw new Error("Config values undefined");
    }

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
    // Optional: console.log(`Token: ${token}`);
    return token;
}
