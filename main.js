import { sleep } from "k6";
import { auth } from "./auth.js";
import { createBooking } from "./createBooking.js";
import { getBooking, verifyBookingDeleted } from "./getBooking.js";
import { updateBooking } from "./updateBooking.js";
import { deleteBooking } from "./deleteBooking.js";

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    // performance thresholds
    http_req_duration: [
      "p(90)<1000",   // 90% of requests < 1s
      "p(95)<1500",   // 95% < 1.5s
    ],

    //ignore expected 404s (from verifyBookingDeleted)
    "http_req_failed{expected_error:false}": ["rate<0.01"],

    
  },
};

export default function () {
  console.log("Test iteration started");

  const token = auth();
  const bookingId = createBooking();

  getBooking(bookingId);
  updateBooking(bookingId, token);
  deleteBooking(bookingId, token);

  //This 404 won’t count as failure in threshold now
  verifyBookingDeleted(bookingId);

  console.log("Test iteration completed");
  sleep(1);
}
