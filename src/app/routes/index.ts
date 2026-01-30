import { Router } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { PackageRoutes } from "../modules/Package/package.route";
import { CustomizeRoutes } from "../modules/Customize/customize.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/package",
    route: PackageRoutes,
  },
  {
    path: "/customize",
    route: CustomizeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));

export default router;
