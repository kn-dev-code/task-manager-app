import {z} from "zod";


export const emailSchema = z
.string()
.trim()
.email("Invalid email address")
.min(1)

export const passwordSchema = z
.string()
.trim()
.min(1)


export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: passwordSchema,
  planType: z.enum(["free", "pro", "premium"]).default("free")
})

export const LoginSchema = z.object({
  email: emailSchema, 
  password: passwordSchema,
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;