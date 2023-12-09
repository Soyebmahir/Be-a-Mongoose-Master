import { z } from "zod";
export const preRequisiteCOursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})
export const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCOurses: z.array(preRequisiteCOursesValidationSchema).optional(),
        isDeleted: z.boolean().optional()
    })
})

export const updatePreRequisiteCOursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCOurses: z.array(updatePreRequisiteCOursesValidationSchema).optional(),
        isDeleted: z.boolean().optional()
    })
})
export const courseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}