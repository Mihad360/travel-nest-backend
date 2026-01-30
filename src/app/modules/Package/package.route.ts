import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { packageControllers } from "./package.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.get("/", auth("admin", "user"), packageControllers.getPackages);
router.get(
  "/view/:packageId",
  auth("admin", "user"),
  packageControllers.getEachPackage,
);
router.post(
  "/create",
  auth("admin"),
  upload.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  packageControllers.createPackage,
);
router.patch(
  "/update/:packageId",
  auth("admin"),
  packageControllers.updatePackage,
);
router.delete("/:packageId", auth("admin"), packageControllers.deletePackage);

export const PackageRoutes = router;
