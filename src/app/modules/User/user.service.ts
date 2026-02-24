import  HttpStatus  from 'http-status';
import { Types } from "mongoose";
import { JwtPayload } from "../../interface/global";
import { UserModel } from "./user.model";
import AppError from "../../erros/AppError";

const getMe = async (user: JwtPayload) => {
  const userId = new Types.ObjectId(user.user);
  const isUserExist = await UserModel.findById(userId).select("-password");

  if (!isUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "The user does not exist");
  }

  if (isUserExist.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, "The user is blocked");
  }

  return isUserExist;
};

export const userServices = {
    getMe
}