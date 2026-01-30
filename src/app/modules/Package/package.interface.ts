import { Types } from "mongoose";

export interface IHotel {
  name: string;
  rating: number; // 3, 4, 5
  location: string;
  nights: number;
}
export interface ISpot {
  name: string;
  description: string;
}
export interface ITransport {
  type: "bus" | "train" | "flight" | "car";
  description: string;
}
export interface IAvailability {
  date: Date;
  startTime: string; // "08:00 AM"
  endTime: string; // "06:00 PM"
  maxTravelers: number;
}

export interface IPackage {
  _id?: Types.ObjectId;
  createdBy: Types.ObjectId;
  title: string;
  type: "BD" | "FOREIGN";
  location: string;
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  availability: IAvailability[];
  hotels: IHotel[];
  spots: ISpot[];
  transport: ITransport;
  guideIncluded: boolean;
  images: string[];
  description: string;
  isPopular: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
