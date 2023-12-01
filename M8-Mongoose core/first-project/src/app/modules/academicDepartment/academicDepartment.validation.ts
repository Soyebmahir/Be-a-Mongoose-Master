
import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department Must be String'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty Must be String'
        })
    })
})
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department Must be String'
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty Must be String'
        }).optional()
    })
})

export const academicDepartmentValidation = {
    academicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema

}