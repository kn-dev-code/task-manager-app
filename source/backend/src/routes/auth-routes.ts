import {Router} from "express";
import { authStatusController, loginController, logoutController, registerController } from "../controllers/auth-controller";
import { protect } from "../middleware/auth-middleware";
import {Request, Response} from "express";
import { upgradePlanController } from "../controllers/upgrade-controller";

const authRoutes = Router()
.post("/register", registerController)
.post("/login", loginController)
.post("/logout", protect, logoutController)
.get("/authstatus", protect, authStatusController)



export default authRoutes;