import { z } from 'zod';
export const formSchema = z.object({
    email: z.string({ required_error: "Email must be provided" }).email({ message: "Invalid Email" }),
    password: z.string({ required_error: "Password must be provided" }).min(5, { message: "Password must have at least 5 character" })
})