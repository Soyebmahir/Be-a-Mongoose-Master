import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import userValidationSchema from './user.validation';
import { studentValidations } from '../students/student.validation';
const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            })

            next()
        } catch (error) {
            next(error)
        }
    }
}

router.post('/create-student', validateRequest(studentValidations.studentValidationSchema), UserController.createStudent)
export const UserRoutes = router