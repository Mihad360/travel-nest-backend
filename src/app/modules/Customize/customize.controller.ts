import HttpStatus from "http-status";
import { JwtPayload } from "../../interface/global";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { customizeServices } from "./customize.service";
import { Types } from "mongoose";

const createCustomize = catchAsync(async (req, res) => {
  const result = await customizeServices.createCustomize(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const getMyCustomizes = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const id = new Types.ObjectId(user.user);
  const result = await customizeServices.getMyCustomizes(id, req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getEachCustomize = catchAsync(async (req, res) => {
  const id = req.params.customizeId;
  const result = await customizeServices.getEachCustomize(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const updateCustomize = catchAsync(async (req, res) => {
  const id = req.params.customizeId;
  const result = await customizeServices.updateCustomize(id, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const deleteCustomize = catchAsync(async (req, res) => {
  const id = req.params.customizeId;
  const result = await customizeServices.deleteCustomize(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

export const customizeControllers = {
  createCustomize,
  getMyCustomizes,
  getEachCustomize,
  updateCustomize,
  deleteCustomize,
};
