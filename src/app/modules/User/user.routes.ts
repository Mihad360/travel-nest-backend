import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/me",
  auth("admin",'user'),
  userControllers.getMe,
);

export const userRoutes = router;
