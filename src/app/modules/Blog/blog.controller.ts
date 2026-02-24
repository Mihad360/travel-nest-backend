import  HttpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const addBlog = catchAsync(async (req, res) => {
    const files = req.files as Express.Multer.File[]
  const result = await blogServices.addBlog(req.body, files);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getBlogs(req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Access token refreshed successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
    const id = req.params.blogId
  const result = await blogServices.getSingleBlog(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});

export const blogControllers = {
    addBlog
    , getBlogs, getSingleBlog
}