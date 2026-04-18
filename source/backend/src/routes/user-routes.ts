import {Router} from "express"
import { upgradePlanController } from "../controllers/upgrade-controller";
import { protect } from "../middleware/auth-middleware";


const userRoutes = Router()

.patch("/upgrade-plan", protect, upgradePlanController);



export default userRoutes;