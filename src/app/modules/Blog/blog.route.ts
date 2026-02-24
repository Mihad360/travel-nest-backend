import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { blogControllers } from "./blog.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.get('/', blogControllers.getBlogs)
router.get('/:blogId', blogControllers.getSingleBlog)
router.post("/add", auth("admin"), upload.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  blogControllers.addBlog);

export const blogRoutes = router;