import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string()
        .min(1)
        .max(20)
        .refine((value: string) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'Should be in capitalize format.',
        }),
    middleName: z.string().optional(),
    lastName: z.string()
        .min(1)
        .max(20)

});

const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
});

const guardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContact: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContact: z.string(),
});

const studentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female']),
            dateOfBirth: z.date().optional(),
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContact: z.string(),
            bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: z.string().optional(),

        })


    })
});
export const studentValidations = {
    studentValidationSchema
};