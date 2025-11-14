import http from "k6/http";
import { check } from "k6";
// import { BASE_URL } from "./config.js";

// Read credentials and URL from environment variables
const BASE_URL = __ENV.BASE_URL;

export function createBooking() {
  const payload = {
    firstname: "Test",
    lastname: "User",
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-11-01",
      checkout: "2025-11-05",
    },
    additionalneeds: "Breakfast",
  };

  const result = http.post(`${BASE_URL}/booking`, JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" ,
    Accept: "application/json",
    },
  });

   check(result, {
    "create status 200": (r) => r.status === 200,
    "booking created": (r) => r.json("bookingid") !== undefined,
  });

  const bookingId = result.json("bookingid");
  //console.log(`Created booking ${bookingId}`);
  return bookingId;


}