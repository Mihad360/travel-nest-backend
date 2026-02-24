import { Router } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { PackageRoutes } from "../modules/Package/package.route";
import { CustomizeRoutes } from "../modules/Customize/customize.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { blogRoutes } from "../modules/Blog/blog.route";

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
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/blog",
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));

export default router;
