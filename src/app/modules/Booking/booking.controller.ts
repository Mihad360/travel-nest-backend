import HttpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import { Types } from "mongoose";
import { JwtPayload } from "../../interface/global";
import catchAsync from "../../utils/catchAsync";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBooking(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const id = new Types.ObjectId(user.user);
  const result = await bookingServices.getMyBookings(id, req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getEachBooking = catchAsync(async (req, res) => {
  const id = req.params.bookingId;
  const result = await bookingServices.getEachBooking(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.bookingId;
  const result = await bookingServices.updateBooking(id, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const id = req.params.bookingId;
  const result = await bookingServices.cancelBooking(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getMyBookings,
  getEachBooking,
  updateBooking,
  cancelBooking,
};
