import {Router} from "express";
import { authStatusController, loginController, logoutController, registerController } from "../controllers/auth-controller";
import { protect } from "../middleware/auth-middleware";

const authRoutes = Router()
.post("/register", registerController)
.post("/login", loginController)
.post("/logout", protect, logoutController)
.get("/authstatus", protect, authStatusController)



export default authRoutes;