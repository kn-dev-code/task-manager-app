import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
  const { create, isCreating } = useTask()
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const { user } = useAuth()
  const [isEditingTask, setIsEditingTask] = useState(false)
  const { tasks } = useTask()

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

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const formattedValues: createTaskType = {
        ...values,
        dueDate: new Date(values.dueDate),
      }
      await create(formattedValues)
      setIsCreatingTask(false)
      toast.success("Task created!")
    } catch (e) {
      toast.error("Failed to create task")
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)]">
        <h1 className="text-2xl font-bold text-white">Please log in first</h1>
      </div>
    )
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

          <div className="mt-10 flex justify-center">
            {!isCreatingTask ? (
              <Card className="flex h-40 w-60 flex-col items-center justify-center overflow-hidden border-2 border-dashed border-black bg-white font-bold text-black">
                <span>Create Task</span>
                <Button
                  onClick={() => setIsCreatingTask(true)}
                  className="mt-4 h-12 w-30 border-2 border-black bg-linear-to-r from-[#DA6767] to-[#8BC0FC] text-white hover:scale-105 hover:cursor-pointer"
                >
                  Create
                </Button>
              </Card>
            ) : (
              <Form {...taskForm}>
                <form
                  onSubmit={taskForm.handleSubmit(handleSubmit)}
                  className="w-full max-w-2xl space-y-5 rounded-[15px] border-2 border-black bg-linear-to-r from-[#303030] to-[#00A6FF] p-10 text-white shadow-2xl"
                >
                  <FormField
                    control={taskForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input className="bg-white! text-black" {...field} />
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
                              <SelectItem value="complete">Complete</SelectItem>
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
              </Form>
            )}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(tasks) && tasks.length > 0 && tasks ? 
                 tasks?.map((task) => (
                    <Card
                      key={task.id}
                      className="flex-row-2 flex h-40 w-60 items-center justify-center overflow-hidden border-2 border-dashed border-black bg-white font-bold text-black"
                    >
                      <span className="rounded border px-1 text-xs">
                        {task.title}
                      </span>
                      <span className="rounded border px-1 text-xs">
                        {task.priority}
                      </span>
                      <Button className="mt-4 h-12 w-30 border-2 border-black bg-linear-to-r from-[#DA6767] to-[#8BC0FC] text-white hover:scale-105 hover:cursor-pointer">
                        Edit
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
