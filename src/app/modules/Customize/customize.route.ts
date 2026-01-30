import express from "express";
import auth from "../../middlewares/auth";
import { customizeControllers } from "./customize.controller";

const router = express.Router();

router.get("/", auth("admin", "user"), customizeControllers.getMyCustomizes);
router.get(
  "/view/:customizeId",
  auth("admin", "user"),
  customizeControllers.getEachCustomize,
);
router.post(
  "/create",
  auth("admin", "user"),
  customizeControllers.createCustomize,
);
router.patch(
  "/update/:customizeId",
  auth("admin", "user"),
  customizeControllers.updateCustomize,
);
router.delete(
  "/:customizeId",
  auth("admin", "user"),
  customizeControllers.deleteCustomize,
);

export const CustomizeRoutes = router;
