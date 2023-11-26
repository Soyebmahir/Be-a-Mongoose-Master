import { z } from "zod";

const userValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, { message: 'Password can not be more than 20' }),
    needsPasswordChange: z.boolean().default(true),
    role: z.enum(['student', 'faculty', 'admin']),
    status: z.enum(['in-progress', 'blocked']).optional().default('in-progress'),
    isDeleted: z.boolean().optional().default(false)
})

export userValidationSchema