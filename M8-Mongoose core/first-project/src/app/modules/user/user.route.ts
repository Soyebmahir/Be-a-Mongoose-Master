import express from 'express';
import { UserControllers } from './user.controller';

import { studentValidations } from '../students/student.validation';
import validateRequest from '../../middlewares/validaterequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student', auth(USER_ROLE.admin),
  validateRequest(studentValidations.studentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), UserControllers.getMe);

export const UserRoutes = router;
