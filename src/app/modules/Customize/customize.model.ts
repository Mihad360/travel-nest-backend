import { Schema, model } from "mongoose";
import { ICustomize } from "./customize.interface";

const customizeSchema = new Schema<ICustomize>(
  {
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    basedOnPackage: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["BD", "FOREIGN"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    duration: {
      days: Number,
      nights: Number,
    },

    travelDate: {
      type: Date,
    },

    travelersCount: {
      type: Number,
      required: true,
      min: 1,
    },

    budgetRange: {
      min: { type: Number },
      max: { type: Number },
    },

    preferences: {
      hotelRating: { type: Number, min: 1, max: 5 },
      transportType: {
        type: String,
        enum: ["bus", "train", "flight", "car"],
      },
      guideIncluded: { type: Boolean },
    },

    customRequirements: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "reviewing", "quoted", "approved", "rejected"],
      default: "pending",
    },

    adminNote: {
      type: String,
      default: "",
    },

    quotedPrice: {
      type: Number,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const CustomizeModel = model<ICustomize>("Customize", customizeSchema);
