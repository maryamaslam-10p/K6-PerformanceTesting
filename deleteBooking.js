import http from "k6/http";
import { check } from "k6";
// import { BASE_URL } from "./config.js";

// Read credentials and URL from environment variables
const BASE_URL = __ENV.BASE_URL;

export function deleteBooking(bookingId, token) {
  const res = http.del(`${BASE_URL}/booking/${bookingId}`, null, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`,
    },
  });

  check(res, {
    "delete status 201 or 200": (r) => r.status === 201 || r.status === 200,
  });

// Only try to parse JSON if it actually is JSON
  try {
    return res.json();
  } catch (err) {
    return { status: res.status, body: res.body };
  }
}
