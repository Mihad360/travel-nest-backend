import  HttpStatus  from 'http-status';
import AppError from "../../erros/AppError";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import { sendFileToCloudinary } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../../builder/QueryBuilder';

const addBlog = async (
  payload: IBlog,
  files: Express.Multer.File[]
) => {
  // 1️⃣ Check images exist
  if (!files || files.length === 0) {
    throw new AppError(HttpStatus.BAD_REQUEST, "Thumbnail images are required");
  }

  // 2️⃣ Upload all images to Cloudinary
  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const uploadResult = await sendFileToCloudinary(
        file.buffer,
        file.originalname,
        file.mimetype
      );

      if (!uploadResult?.secure_url) {
        throw new AppError(HttpStatus.BAD_REQUEST, "Image upload failed");
      }

      return uploadResult.secure_url;
    })
  );

  // 3️⃣ Assign array of image URLs
  payload.thumbnail = uploadedImages;

  // 4️⃣ Create blog
  const result = await BlogModel.create(payload);

  if (!result) {
    throw new AppError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }

  return result;
};

const getBlogs = async(query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(BlogModel.find(), query).filter().fields().paginate()
    const meta = await blogQuery.countTotal()
    const result = await blogQuery.modelQuery
    return {meta, result}
}

// 🔥 Get Single Blog By Slug
const getSingleBlog = async (id: string) => {
  const blog = await BlogModel.findOne({
    id,
  });

  if (!blog) {
    throw new AppError(HttpStatus.NOT_FOUND, "Blog not found");
  }

  return blog;
};

export const blogServices = {
    addBlog,
    getBlogs,
    getSingleBlog
}