import {Request, Response} from "express";
import { asyncHandler } from "../middleware/async-handler";
import { TaskSchema } from "../validators/task-validators";
import { HTTPSTATUS } from "../config/http-config";
import { createTaskService, deleteTaskService, getAllTasksService, getTaskService, updateTaskService } from "../services/task-services";
import { BadRequestException, UnauthorizedException } from "../util/app-error";


export const createTaskController = asyncHandler(async(req: Request, res: Response) => {
const user = req.user?._id;
if (!user) throw new UnauthorizedException("User not found in the request.");
const body = TaskSchema.parse(req.body);
const task = await createTaskService(body, user);

return res.status(HTTPSTATUS.CREATED).json({
  success: true,
  message: "Task created successfully",
  task,
})
})

export const updateTaskController = asyncHandler(async(req: Request, res: Response) => {
const data = TaskSchema.partial().parse(req.body);
const taskId = req.params.id.toString();
const userId = req.user?._id.toString();
if (!taskId || !userId) throw new BadRequestException("Missing task or user ID");
const task = await updateTaskService(data, taskId, userId);

 return res.status(HTTPSTATUS.OK).json({
  success: true,
  message: "Task updated successfully",
  task
 })
})

export const deleteTaskController = asyncHandler(async(req: Request, res: Response) => {
const data = TaskSchema.parse(req.body);
const taskId = req.params.id.toString();
const userId = req.user?._id.toString();

if (!taskId || !userId) throw new BadRequestException("Missing task or user ID");
const task = await deleteTaskService(taskId, userId);
return res.status(HTTPSTATUS.OK).json({
  message: "Task deletion successfully"
})
}) 

export const getTaskController = asyncHandler(async(req: Request, res: Response) => {
  const taskId = req.params.id
  const userId = req.user?._id;
    if (!taskId || !userId) throw new BadRequestException("Missing task or user ID");

  const task = await getTaskService(taskId.toString(), userId?.toString());

  return res.status(HTTPSTATUS.OK).json({
    success: true,
    task,
  })
})

export const getAllTasksController = asyncHandler(async(req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) throw new UnauthorizedException("User not authorized");

  const tasks = await getAllTasksService(userId.toString());

  return res.status(HTTPSTATUS.OK).json({
    success: true,
    count: tasks.length,
    tasks,
  })
})

