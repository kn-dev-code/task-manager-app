import { HTTPSTATUS } from "../config/http-config";
import { asyncHandler } from "../middleware/async-handler";
import UserModel from "../models/user-model";
import { Request, Response } from "express";

export const getAllUsersController = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user || user?.role !== "admin") {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      success: false,
      message: "Access denied. Admins only."
    })
  }

  const allUsers = await UserModel.find({}).select("-password").sort({ createdAt: -1 });

  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: "All users retrieved successfully",
    data: allUsers,
  })
})



export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
  const adminUser = req.user;
  const { id } = req.params;
  if (!adminUser || adminUser?.role !== "admin") {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      success: false,
      message: "Access denied. Admins only."
    })
  }
  if (id === adminUser._id.toString()) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      success: false,
      message: "You cannot delete your own admin account."
    })
  }
  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(HTTPSTATUS.NOT_FOUND).json({
      success: false,
      message: "User not found."
    })
  }
  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: `User ${deletedUser.email} has been deleted`,
    deletedUser: id,
  })
})


export const editUserController = asyncHandler(async (req: Request, res: Response) => {
  const adminUser = req.user;
  const { id } = req.params;
  const updates = req.body;
  if (!adminUser || adminUser?.role !== "admin") {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      success: false,
      message: "Access denied. Admins only",
    })
  }

  if (id === adminUser._id.toString()) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      success: false,
      message: "You cannot edit your own admin account"
    })
  }
const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select("-password");

  if (!updatedUser) {
    return res.status(HTTPSTATUS.NOT_FOUND).json({
      success: false,
      message: "User not found"
    })
  }
  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: "User updated successfully",
    updatedUser
  })
})