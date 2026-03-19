import { ErrorRequestHandler } from "express"
import { HTTPSTATUS } from "../config/http-config"
import { AppError, ErrorCodes } from "../util/app-error"
import { logger } from "../config/winston-config"


export const errorHandler: ErrorRequestHandler = (
  error, req, res, _next): any => {
    logger.info(`Error occurred: ${req.path}`, error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
      })
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error?.message || "Something went wrong",
      errorCode: ErrorCodes.ERR_INTERNAL,
    })
  }