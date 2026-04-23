import { TaskModel } from "../models/task-model";
import { ForbiddenException, NotFoundException } from "../util/app-error";
import { TaskSchemaType } from "../validators/task-validators"



export const createTaskService = async(data: any, user: any) => {
  const taskNum = await TaskModel.countDocuments({userId: user._id});
  const taskLimit = user.planType === "pro" ? 500 : user.planType === "premium" ? 50 : 10;

  if (taskNum >= taskLimit) {
    throw new ForbiddenException("Max limit reached"); // Checking for task limit
  }
  
  return await TaskModel.create({
    ...data,
    userId: user._id,
  })
}

export const updateTaskService = async(data: Partial<TaskSchemaType>, taskId: string, userId: string) => {
  const task = await TaskModel.findOne({_id: taskId, userId})

  if (!task) throw new NotFoundException("Task not found or you are not authorized.");

  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {$set: data}, {new: true, runValidators: true});
  return updatedTask;
}


export const deleteTaskService = async( taskId: string, userId: string) => {
  const task = await TaskModel.findOne({_id: taskId, userId})

  if (!task) throw new NotFoundException("Task not found. Please try again.");

  const deletedTask = await TaskModel.findByIdAndDelete(taskId);
  return deletedTask;
}


export const getTaskService = async(taskId: string, userId: string) => {
  const task = await TaskModel.findOne({_id: taskId, userId});

  if (!task) throw new NotFoundException("Task not found. Please try again.");

  return task;
}


export const getAllTasksService = async(userId: string) => {
  return await TaskModel.find({userId}).sort({createdAt: -1});
}