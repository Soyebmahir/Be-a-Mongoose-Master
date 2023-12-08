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
        preRequisiteCOurses: z.array(preRequisiteCOursesValidationSchema)
    })
})
export const courseValidations = {
    createCourseValidationSchema
}