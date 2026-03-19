import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "./async-handler";
import { UnauthorizedException } from "../util/app-error";
import { Env } from "../config/env-config";
import mongoose from "mongoose";




export const protect = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) throw new UnauthorizedException("Not authorized, please log in");

  try {
    const decoded = jwt.verify(token, Env.JWT_SECRET) as {userId: string};
    req.user = {_id: new mongoose.Types.ObjectId(decoded.userId)} as any;
    next();
  } catch(e) {
    throw new UnauthorizedException("Token has expired or is invalid, please try again")
  }
})