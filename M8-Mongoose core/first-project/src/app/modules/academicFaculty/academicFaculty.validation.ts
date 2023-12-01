import { z } from "zod";


const academicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic Faculty Must be String' })
    })
})
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic Faculty Must be String' })
    })
})
export const academicFacultyValidation = {
    academicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}