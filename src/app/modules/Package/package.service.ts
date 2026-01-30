import HttpStatus from "http-status";
import { Types } from "mongoose";
import { JwtPayload } from "../../interface/global";
import { flattenObject } from "../../utils/reUse/update";
import { IPackage } from "./package.interface";
import { PackageModel } from "./package.model";
import { UserModel } from "../User/user.model";
import AppError from "../../erros/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { sendFileToCloudinary } from "../../utils/sendImageToCloudinary";

const createPackage = async (
  payload: IPackage,
  user: JwtPayload,
  files: Express.Multer.File[],
) => {
  const userId = new Types.ObjectId(user.user);
  const isUserExist = await UserModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found");
  }
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const result = await sendFileToCloudinary(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    uploadedUrls.push(result.secure_url);
  }
  payload.createdBy = isUserExist._id;
  payload.images = uploadedUrls;
  const result = await PackageModel.create(payload);
  return result;
};

const getPackages = async (query: Record<string, unknown>) => {
  const packageQuery = new QueryBuilder(PackageModel.find(), query)
    .filter()
    .fields()
    .paginate();
  const meta = await packageQuery.countTotal();
  const result = await packageQuery.modelQuery;
  return { meta, result };
};

const getEachPackage = async (packageId: string) => {
  const isPackageExist = await PackageModel.findById(packageId);
  if (!isPackageExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "Package not found");
  }
  const result = await PackageModel.findById(isPackageExist._id);
  return result;
};

const updatePackage = async (
  packageId: string,
  user: JwtPayload,
  payload: Partial<IPackage>,
) => {
  const userId = new Types.ObjectId(user.user);
  const isUserExist = await UserModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found");
  }
  const isPackageExist = await PackageModel.findById(packageId);
  if (!isPackageExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "Package not found");
  }

  const updateData = flattenObject(payload);

  const result = await PackageModel.findByIdAndUpdate(
    isPackageExist._id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deletePackage = async (packageId: string) => {
  const result = await PackageModel.findByIdAndUpdate(
    packageId,
    { isActive: false, isDeleted: true },
    { new: true },
  );

  return result;
};

export const packageServices = {
  createPackage,
  getPackages,
  deletePackage,
  updatePackage,
  getEachPackage,
};
