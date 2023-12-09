import express from 'express';
import validateRequest from '../../middlewares/validaterequest';
import { courseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();
router.post(
    '/create-course',
    validateRequest(
        courseValidations.createCourseValidationSchema
    ),
    CourseController.createCourse
);
router.get('/', CourseController.getAllCourses);
router.get(
    '/:id',
    CourseController.getSingleCourseById,
);
router.patch(
    '/:id', validateRequest(courseValidations.updateCourseValidationSchema),
    CourseController.updateCourse
);
router.delete(
    '/:id',
    CourseController.deleteCourseById
);

export const CourseRoutes = router;
