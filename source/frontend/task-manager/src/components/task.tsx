import { Card } from "./ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(0),
  status: z.enum(['complete', 'in-progress', 'to-do']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date(),
  tags: z.array(z.string()),
})

type TaskFormValues = z.infer<typeof taskSchema>
const Task = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "to-do",
      priority: "medium",
      dueDate: new Date("2026-04-09"),
      tags: [],
    }, 
  })
  const currentData = watch()

  return (
    <div className="h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] brightness-110">

    </div>
  )
}

export default Task
