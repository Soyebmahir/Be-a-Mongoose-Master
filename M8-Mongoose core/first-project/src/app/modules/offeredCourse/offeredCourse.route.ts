import express from 'express'
import validateRequest from '../../middlewares/validaterequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';
const router = express.Router();
router.post('/', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema), OfferedCourseController.createOfferedCourse)
router.patch('/:id', validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema), OfferedCourseController.updateOfferedCourse)

export const OfferedCourseRoute = router