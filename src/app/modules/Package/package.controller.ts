import HttpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { packageServices } from "./package.service";
import { JwtPayload } from "../../interface/global";

const createPackage = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const files = req.files as Express.Multer.File[];
  const result = await packageServices.createPackage(req.body, user, files);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const getPackages = catchAsync(async (req, res) => {
  const result = await packageServices.getPackages(req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getEachPackage = catchAsync(async (req, res) => {
  const id = req.params.packageId;
  const result = await packageServices.getEachPackage(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const updatePackage = catchAsync(async (req, res) => {
  const id = req.params.packageId;
  const user = req.user as JwtPayload;
  const result = await packageServices.updatePackage(id, user, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const deletePackage = catchAsync(async (req, res) => {
  const id = req.params.packageId;
  const result = await packageServices.deletePackage(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

export const packageControllers = {
  createPackage,
  getPackages,
  getEachPackage,
  updatePackage,
  deletePackage,
};
