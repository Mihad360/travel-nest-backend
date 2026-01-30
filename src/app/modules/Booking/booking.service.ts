import HttpStatus from "http-status";
import AppError from "../../erros/AppError";
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { Types } from "mongoose";
import { UserModel } from "../User/user.model";
import QueryBuilder from "../../../builder/QueryBuilder";

const createBooking = async (payload: IBooking) => {
  const isUserExist = await UserModel.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found");
  }
  const result = await BookingModel.create(payload);
  return result;
};

const getMyBookings = async (
  userId: Types.ObjectId,
  query: Record<string, unknown>,
) => {
  const customizeQuery = new QueryBuilder(
    BookingModel.find({ user: userId })
      .populate("package", "title location price")
      .populate("customize", "title quotedPrice"),
    query,
  )
    .filter()
    .fields()
    .paginate();
  const meta = await customizeQuery.countTotal();
  const result = await customizeQuery.modelQuery;
  return { meta, result };
};

const getEachBooking = async (id: string) => {
  const result = await BookingModel.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("user", "name email")
    .populate("package", "title location price")
    .populate("customize", "title quotedPrice");

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, "Booking not found");
  }

  return result;
};

const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  const booking = await BookingModel.findById(id);

  if (!booking || booking.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, "Booking not found");
  }

  const result = await BookingModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const cancelBooking = async (id: string) => {
  const booking = await BookingModel.findById(id);

  if (!booking || booking.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, "Booking not found");
  }

  await BookingModel.findByIdAndUpdate(id, {
    bookingStatus: "cancelled",
    isActive: false,
  });

  return null;
};

export const bookingServices = {
  createBooking,
  getMyBookings,
  getEachBooking,
  updateBooking,
  cancelBooking,
};
