import {Router} from "express";
import { authStatusController, loginController, logoutController, registerController } from "../controllers/auth-controller";
import { deleteUserController, editUserController, getAllUsersController } from "../controllers/admin-controller";

const authRoutes = Router()
.post("/register", registerController)
.post("/login", loginController)
.post("/logout", logoutController)
.get("/authstatus", authStatusController)
.get("/all-users", getAllUsersController)
.delete("/delete-user/:id", deleteUserController)
.patch("/edit-user/:id", editUserController)



export default authRoutes;