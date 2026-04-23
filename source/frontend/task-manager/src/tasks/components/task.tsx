import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTask } from "@/hooks/use-task"
import { useAuth } from "@/hooks/use-auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { createTaskType } from "@/types/task-types"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Dashboard from "@/components/dashboard"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(0),
  status: z.enum(["complete", "in-progress", "to-do"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string(),
  tags: z.any(),
})
type TaskFormValues = z.infer<typeof taskSchema>

const Task = () => {
  const {
    tasks,
    create,
    isCreating,
    isTaskStatus,
    update,
    delete: deleteId,
  } = useTask()
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const { user } = useAuth()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "to-do",
      priority: "medium",
      dueDate: "",
      tags: [],
    },
  })

  const cancelForm = () => {
    setIsCreatingTask(false)
    taskForm.reset()
  }

  const handleEdit = (task: any) => {
    setEditingTaskId(task._id)
    setIsCreatingTask(true)

    taskForm.reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    })
  }

const handleDelete = async (task: any) => {
  
  const deleteId = task._id || task.id;
  
  if (!deleteId) {
    console.error("No ID found for task:", task);
    return;
  }

  if (window.confirm("Are you sure?")) {
    try {
      await deleteId(deleteId);
      toast.success("Task deleted!");
      isTaskStatus();
    } catch (e) {
      console.error(e);
    }
  }
};

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const formattedValues: createTaskType = {
        ...values,
        dueDate: new Date(values.dueDate),
      }
      if (editingTaskId) {
        await update(formattedValues as any, editingTaskId)
        setEditingTaskId(null)
        toast.success("Task updated successfully!")
      } else {
        await create(formattedValues)
      }
      setIsCreatingTask(false)
      taskForm.reset()
    } catch (e) {
      toast.error("Failed to create task")
    }
  }
  useEffect(() => {
    if (user) {
      isTaskStatus()
    }
  }, [user, isTaskStatus])

  if (!user) {
    return <Dashboard />
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] pb-10">
      <div className="mt-10 w-full max-w-7xl overflow-hidden px-10">
        <div className="overflow-hidden rounded-[15px] bg-linear-to-r from-[#DA6767] to-[#8BC0FC] p-10">
          <div className="flex flex-col items-center">
            <Input
              className="mx-auto h-14 max-w-2xl bg-[#D9D9D9]! font-bold text-black placeholder:text-black"
              type="search"
              placeholder="Search tasks..."
            />
          </div>

          <div className="flex flex-col items-center px-25">
            {!isCreatingTask ? (
              <div className="p-4 pt-10">
                <Card className="flex h-40 w-60 flex-col items-center justify-center border-2 border-dashed border-black bg-white font-bold text-black">
                  <span>Create Task</span>
                  <Button
                    onClick={() => setIsCreatingTask(true)}
                    className="mt-4 h-12 w-30 border-2 border-black bg-linear-to-r from-[#DA6767] to-[#8BC0FC] text-white hover:scale-105 hover:cursor-pointer"
                  >
                    Create
                  </Button>
                </Card>
              </div>
            ) : (
              <Form {...taskForm}>
                <div className="fixed min-w-4xl items-center">
                  <form
                    onSubmit={taskForm.handleSubmit(handleSubmit)}
                    className="relative flex flex-col gap-y-5 rounded-[15px] border-2 border-black bg-linear-to-r from-[#303030] to-[#00A6FF] p-10 py-20 text-white shadow-2xl"
                  >
                    <FormField
                      control={taskForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white! text-black"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={taskForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="resize-none bg-white text-black"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={taskForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white text-black">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="to-do">To-Do</SelectItem>
                                <SelectItem value="in-progress">
                                  In-Progress
                                </SelectItem>
                                <SelectItem value="complete">
                                  Complete
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={taskForm.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white text-black">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={taskForm.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="bg-white! text-black"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-center gap-x-5 pt-5">
                      <Button
                        disabled={isCreating}
                        type="submit"
                        className="bg-linear-to-r from-[#DA6767] to-[#8BC0FC] font-bold text-white hover:scale-105 hover:cursor-pointer"
                      >
                        {isCreating ? "Saving..." : "Save Task"}
                      </Button>
                      <Button
                        className="bg-linear-to-r from-[#DA6767] to-[#8BC0FC] font-bold text-white hover:scale-105 hover:cursor-pointer"
                        type="button"
                        onClick={cancelForm}
                        variant="destructive"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </Form>
            )}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(tasks) && tasks.length > 0
                ? tasks?.map((task) => (
                    <Card
                      key={task._id}
                      className="flex-row-2 flex h-40 w-60 items-center justify-center overflow-hidden border-2 border-dashed border-black bg-white font-bold text-black"
                    >
                      <span className="rounded border px-1 text-xs">
                        {task.title}
                      </span>
                      <span className="rounded border px-1 text-xs">
                        {task.priority}
                      </span>
                      <Button
                        onClick={() => handleEdit(task)}
                        className="mt-4 h-12 w-30 border-2 border-black bg-linear-to-r from-[#DA6767] to-[#8BC0FC] text-white hover:scale-105 hover:cursor-pointer"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(task)}
                        className="from -[#DA6767] mt-4 h-12 w-30 border-2 border-black bg-linear-to-r to-[#8BC0FC] text-white hover:scale-105 hover:cursor-pointer"
                      >
                        Delete
                      </Button>
                    </Card>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Task
