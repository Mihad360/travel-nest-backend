import express from "express";
import auth from "../../middlewares/auth";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

router.get("/", auth("admin", "user"), bookingControllers.getMyBookings);
router.get(
  "/view/:bookingId",
  auth("admin", "user"),
  bookingControllers.getEachBooking,
);
router.post("/create", auth("admin", "user"), bookingControllers.createBooking);
router.patch(
  "/update/:bookingId",
  auth("admin", "user"),
  bookingControllers.updateBooking,
);
router.delete(
  "/:bookingId",
  auth("admin", "user"),
  bookingControllers.cancelBooking,
);

export const BookingRoutes = router;
