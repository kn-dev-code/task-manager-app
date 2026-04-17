import { asyncHandler } from "../middleware/async-handler";
import {Request, Response} from "express";
import { updatePlanService} from "../services/user-services";
import { HTTPSTATUS } from "../config/http-config";
import { upgradePlanSchema } from "../validators/user-validators";

export const upgradePlanController = asyncHandler(async(req: Request, res: Response) => {
  const user = req.user;

  if (!user || !user._id) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      success: false,
      message: "User not authorized",
    })
  }
  const userId = user._id.toString();


 const validatedBody = upgradePlanSchema.parse(req.body);
 const {newPlanType} = validatedBody;


  const updatedUser = await updatePlanService(userId, newPlanType);

  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: `Plan upgraded to ${newPlanType} successfully`,
    user: updatedUser
  })
})