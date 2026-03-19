import {z} from "zod";



export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['complete', 'in-progress', 'to-do']).default('to-do'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  userId: z.string().min(1),
})


export type TaskSchemaType = z.infer<typeof TaskSchema>;