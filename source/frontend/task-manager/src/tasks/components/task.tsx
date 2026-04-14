import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTask } from "@/hooks/use-task"
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

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(0),
  status: z.enum(["complete", "in-progress", "to-do"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string(),
  tags: z.array(z.string()),
})

type TaskFormValues = z.infer<typeof taskSchema>
const Task = () => {
  const { create, isCreating } = useTask()
  const [isCreatingTask, setIsCreatingTask] = useState(false)
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
  const { watch } = taskForm
  const { errors } = taskForm.formState
  const currentData = watch();
  console.log("Current Validation Errors:", errors)
  const showForm = () => {
    setIsCreatingTask(true)
  }

  const handleSubmit = async (values: TaskFormValues) => {
    if (isCreating) return
    try {
      const formattedValues: createTaskType = {
        ...values,
        dueDate: new Date(values.dueDate),
      }
      await create(formattedValues)
      setTimeout(() => {
        setIsCreatingTask(false)
      }, 1500)
    } catch (e) {
      console.error("Task Error:", e)
      toast.error("Failed to create a task. Please try again")
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-5 bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] pb-15 brightness-110">
      <div className="h-full min-w-7xl rounded-[15px] bg-linear-to-r from-[#DA6767] from-0% to-[#8BC0FC] to-54%">
        <Input
          className="mt-10 ml-80 h-14 max-w-2xl bg-[#D9D9D9]! font-bold text-black placeholder:font-bold placeholder:text-black hover:cursor-pointer"
          type="search"
          placeholder="Search tasks..."
        />
        <div className="place-items-between grid grid-rows-4 overflow-x-visible pt-15 pl-15">
          <Card className="text-md h-40 w-50 items-center border-2 border-dashed border-black bg-white font-bold text-black">
            Create Task
            <Button
              onClick={showForm}
              className="mt-10 h-12 w-30 border-2 border-black bg-linear-to-r from-[#DA6767] from-0% to-[#8BC0FC] to-54% font-bold text-white hover:scale-105 hover:cursor-pointer"
            >
              Create
            </Button>
            {isCreatingTask ? (
              <>
                <div className="bg-linear-to-r from-[#303030] to-[#00A6FF]">
                  <Form {...taskForm}>
                    <form onSubmit={taskForm.handleSubmit(handleSubmit)}>
                      <FormField
                        control={taskForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={taskForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>status</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={taskForm.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>priority</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={taskForm.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={taskForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button disabled={isCreating} type="submit">
                        {isCreating ? "Saving..." : "Save Task"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Task
