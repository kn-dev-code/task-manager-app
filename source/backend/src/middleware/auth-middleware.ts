// middleware/auth-middleware.ts
import { Request, Response, NextFunction } from "express";
import { passportAuthenticateJwt } from "../config/passport-config"; 
import { UnauthorizedException } from "../util/app-error";

export const protect = [
  passportAuthenticateJwt, 
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }
];