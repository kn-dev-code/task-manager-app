import {Router} from "express";
import authRoutes from "./auth-routes";
import taskRoutes from "./task-routes";



 const mainRouter = Router();
 mainRouter.use("/auth", authRoutes);
 mainRouter.use("/task", taskRoutes);


 export default mainRouter;