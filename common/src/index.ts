// Input validation using the zod 
import z from "zod"

export const signupInput = z.object({ //used by backend
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})
// type inference in zod
export type SignupInput = z.infer<typeof signupInput> // used by frontend 
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    
})
export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title : z.string(),
    content: z.string(),
    id: z.string()
})
export type UpdateBlogInput = z.infer<typeof updateBlogInput>