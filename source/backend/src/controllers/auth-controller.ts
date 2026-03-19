import {Request, Response} from "express";
import { asyncHandler } from "../middleware/async-handler";
import { LoginSchema, RegisterSchema } from "../validators/user-validators";
import { clearJWTCookie, JWTAuth } from "../util/cookie";
import { HTTPSTATUS } from "../config/http-config";
import { NotFoundException } from "../util/app-error";
import { loginService, registerService } from "../services/auth-services";



export const registerController = asyncHandler(async(req: Request, res: Response) => {
  const body = RegisterSchema.parse(req.body);


  const user = await registerService(body);
  const userId = user._id.toString();

  return JWTAuth({res, userId}).status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
    success: true,
    user,
  })
})


export const loginController = asyncHandler(async(req: Request, res: Response) => {
const body = LoginSchema.parse(req.body);
const user = await loginService(body);
const userId = (user._id as any).toString();
if (!user) throw new NotFoundException("Resource Not Found");

return JWTAuth({res, userId}).status(HTTPSTATUS.OK).json({
  message: "User login successfully",
  success: true,
  user,
})
})


export const logoutController = asyncHandler(async(req: Request, res: Response) => {
  return clearJWTCookie(res).status(HTTPSTATUS.OK).json({
    message: "User logout successfully",
  })
})

export const authStatusController = asyncHandler(async(req: Request, res: Response) => {
  const user = req.user;

  if (!user) { return res.status(HTTPSTATUS.UNAUTHORIZED).json({
    success: false,
    message: "User not authorized",
  })}

  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: "Authenticated User",
    data: {
      _id: user?._id,
      email: user?.email,
      createdAt: user?.createdAt,
      planType: user?.planType,
    }
  })
})







