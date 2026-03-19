import {Request, Response, NextFunction} from "express";
import { logger } from "../config/winston-config";


type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncHandler = (controller: AsyncController) => async(req: Request, res: Response, next: NextFunction) => {
try {
  await controller(req, res, next)
} catch(e) {
  logger.info(next(e));
}
}