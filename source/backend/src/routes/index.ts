import {Router} from "express";
import authRoutes from "./auth-routes";
import taskRoutes from "./task-routes";
import userRoutes from "./user-routes";



 const mainRouter = Router();
 mainRouter.use("/auth", authRoutes);
 mainRouter.use("/task", taskRoutes);
 mainRouter.use("/user", userRoutes);

 export default mainRouter;