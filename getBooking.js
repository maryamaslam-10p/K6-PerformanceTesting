import http from "k6/http";
import { check } from "k6";
import { BASE_URL } from "./config.js";

//Normal booking fetch (for verification)
export function getBooking(bookingId) {
  const res = http.get(`${BASE_URL}/booking/${bookingId}`, {
    headers: { Accept: "application/json" },
    tags: { expected_error: false },
  });

  check(res, {
    "get status 200": (r) => r.status === 200,
  });

  console.log(`Get Status: ${res.status}`);
  return res;
}

// Verification after delete (404 is expected here)
export function verifyBookingDeleted(bookingId) {
  const res = http.get(`${BASE_URL}/booking/${bookingId}`, {
    headers: { Accept: "application/json" },
    tags: { expected_error: true }, //  Tag so it won’t count as a failed req
  });

  check(res, {
    "get status 404 after deletion": (r) => r.status === 404,
  });

  console.log(`Verify deleted booking ${bookingId}: ${res.status}`);
  return res;
}
