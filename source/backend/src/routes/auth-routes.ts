import {Router} from "express";
import { authStatusController, loginController, logoutController, registerController } from "../controllers/auth-controller";
import { protect } from "../middleware/auth-middleware";
import { isAdmin } from "../middleware/admin-middleware";
import { deleteUserController, editUserController, getAllUsersController } from "../controllers/admin-controller";

const authRoutes = Router()
.post("/register", registerController)
.post("/login", loginController)
.post("/logout", protect, logoutController)
.get("/authstatus", protect, authStatusController)
.get("/all-users", protect, isAdmin, getAllUsersController)
.delete("/delete-user/:id", protect, isAdmin, deleteUserController)
.patch("/edit-user/:id", protect, isAdmin, editUserController)



export default authRoutes;