import { Types } from "mongoose";

export type TBookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type TPaymentStatus = "unpaid" | "paid" | "refunded";

export interface IBooking {
  user: Types.ObjectId;

  package?: Types.ObjectId;
  customize?: Types.ObjectId;

  travelDate: Date;
  travelersCount: number;

  totalPrice: number;

  bookingStatus: TBookingStatus;
  paymentStatus: TPaymentStatus;

  isActive: boolean;
  isDeleted: boolean;
}
