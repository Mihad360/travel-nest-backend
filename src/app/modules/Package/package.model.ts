import { Schema, model } from "mongoose";
import { IPackage } from "./package.interface";

const packageSchema = new Schema<IPackage>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    type: { type: String, enum: ["BD", "FOREIGN"], required: true },
    location: { type: String, required: true },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    price: {
      type: Number,
      required: true,
    },
    availability: [
      {
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        maxTravelers: { type: Number, required: true },
      },
    ],
    hotels: [
      {
        name: String,
        rating: Number,
        location: String,
        nights: Number,
      },
    ],
    spots: [
      {
        name: String,
        description: String,
      },
    ],
    transport: {
      type: {
        type: String,
        enum: ["bus", "train", "flight", "car"],
      },
      description: String,
    },
    guideIncluded: { type: Boolean, default: false },
    images: [{ type: String }],
    description: { type: String },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const PackageModel = model<IPackage>("Package", packageSchema);
