import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  niveau: z.enum(["Sixièmme", "Cinquième", "Quatrième", "Troisième"], ),
  image : z.string().url({ message: "Invalid image URL" }).optional(),
  
})

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})