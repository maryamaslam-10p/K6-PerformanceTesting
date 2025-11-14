import http from "k6/http";
import { check } from "k6";
import { BASE_URL } from "./config.js";

export function updateBooking(bookingId, token) {
  const payload = {
    firstname: "Updated Test",
      lastname: "Updated User",
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-11-01",
        checkout: "2025-11-06",
      },
      additionalneeds: "Breakfast and Lunch",
  };

  const res = http.put(`${BASE_URL}/booking/${bookingId}`, JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    },
  });

  console.log(`Update Status: ${res.status}`);
 //   console.log(`Update Body: ${res.body}`);

  check(res, {
    "update status 200": (r) => r.status === 200,
    "firstname updated": (r) => r.json("firstname") === payload.firstname,
    "lastname updated": (r) => r.json("lastname") === payload.lastname,
  });


 // console.log(`Booking updated`);
  return res;
}
