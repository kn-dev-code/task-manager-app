import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http-config";



export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(HTTPSTATUS.FORBIDDEN).json({
      success: false,
      message: "Forbidden: Admin access required.",
    });
  }
}