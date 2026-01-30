import HttpStatus from "http-status";
import AppError from "../../erros/AppError";
import { ICustomize } from "./customize.interface";
import { CustomizeModel } from "./customize.model";
import { Types } from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import { UserModel } from "../User/user.model";

const createCustomize = async (payload: ICustomize) => {
  const isUserExist = await UserModel.findById(payload.requestedBy);
  if (!isUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found");
  }
  const result = await CustomizeModel.create(payload);
  return result;
};

const getMyCustomizes = async (
  userId: Types.ObjectId,
  query: Record<string, unknown>,
) => {
  const customizeQuery = new QueryBuilder(
    CustomizeModel.find({ requestedBy: userId }).populate(
      "basedOnPackage",
      "title location price",
    ),
    query,
  )
    .filter()
    .fields()
    .paginate();
  const meta = await customizeQuery.countTotal();
  const result = await customizeQuery.modelQuery;
  return { meta, result };
};

const getEachCustomize = async (id: string) => {
  const result = await CustomizeModel.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("requestedBy", "name email")
    .populate("basedOnPackage", "title location price");

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, "Customize request not found");
  }

  return result;
};

const updateCustomize = async (id: string, payload: Partial<ICustomize>) => {
  const customize = await CustomizeModel.findById(id);

  if (!customize || customize.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, "Customize request not found");
  }

  const result = await CustomizeModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteCustomize = async (id: string) => {
  const customize = await CustomizeModel.findById(id);

  if (!customize || customize.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, "Customize request not found");
  }

  await CustomizeModel.findByIdAndUpdate(id, {
    isDeleted: true,
    isActive: false,
  });

  return null;
};

export const customizeServices = {
  createCustomize,
  getMyCustomizes,
  getEachCustomize,
  updateCustomize,
  deleteCustomize,
};
