import { Router } from "express";
import { createTaskController, deleteTaskController, getAllTasksController, getTaskController, updateTaskController } from "../controllers/task-controller";
import { protect } from "../middleware/auth-middleware";


const taskRoutes = Router()

taskRoutes.use(protect)
.post("/create-task", createTaskController)
.put("/update-task/:id", updateTaskController)
.delete("/delete-task/:id", deleteTaskController)
.get("/get-task/:id", getTaskController)
.get("/get-all-tasks", getAllTasksController)


export default taskRoutes;