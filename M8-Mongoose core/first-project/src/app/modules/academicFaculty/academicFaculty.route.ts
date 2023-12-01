import express from 'express';
import validateRequest from '../../middlewares/validaterequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create-academy-faculty', validateRequest(academicFacultyValidation.academicFacultyValidationSchema), academicFacultyController.createAcademicFaculty)
router.post('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFacultyById)
router.post('/', academicFacultyController.getAllAcademicFaculty)
router.post('/:facultyId', academicFacultyController.getAcademicFacultyById)

export const academicFacultyRoutes = router; 
