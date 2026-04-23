import UserModel from "../models/user-model";
import { NotFoundException} from "../util/app-error";

export const findByIdUserService = async (userId: string) => {
  return await UserModel.findById(userId);
};

export const getUsersService = async (userId: string) => {
  const users = await UserModel.find({ _id: { $ne: userId } }).select(
    "-password"
  );

  return users;
};

export const updatePlanService = async (userId: string, newPlanType: any) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, { planType: newPlanType }, { new: true, runValidators: true }).select("-password");

  if (!updatedUser) throw new NotFoundException("User not found.");

  return updatedUser
}