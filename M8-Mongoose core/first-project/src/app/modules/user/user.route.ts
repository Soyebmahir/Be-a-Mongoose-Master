import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';

import { studentValidations } from '../students/student.validation';
import validateRequest from '../../middlewares/validaterequest';
const router = express.Router();



router.post('/create-student', validateRequest(studentValidations.studentValidationSchema), UserController.createStudent)
export const UserRoutes = router