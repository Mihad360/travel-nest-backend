import { Types } from "mongoose";

export type TCustomizeStatus =
  | "pending"
  | "reviewing"
  | "quoted"
  | "approved"
  | "rejected";

export interface ICustomize {
  requestedBy: Types.ObjectId; // User
  basedOnPackage?: Types.ObjectId; // Optional reference to Package

  title: string; // short name (ex: "Cox's Bazar Family Tour")
  type: "BD" | "FOREIGN";
  location: string;

  duration?: {
    days: number;
    nights: number;
  };

  travelDate?: Date;
  travelersCount: number;

  budgetRange?: {
    min: number;
    max: number;
  };

  preferences?: {
    hotelRating?: number;
    transportType?: "bus" | "train" | "flight" | "car";
    guideIncluded?: boolean;
  };

  customRequirements: string;

  status: TCustomizeStatus;
  adminNote?: string;

  quotedPrice?: number; // admin can give final price

  isActive: boolean;
  isDeleted: boolean;
}
