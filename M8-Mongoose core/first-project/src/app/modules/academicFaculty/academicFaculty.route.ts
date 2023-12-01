import express from 'express';
import validateRequest from '../../middlewares/validaterequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create-academic-faculty', validateRequest(academicFacultyValidation.academicFacultyValidationSchema), academicFacultyController.createAcademicFaculty)
router.get('/', academicFacultyController.getAllAcademicFaculty)
router.patch('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFacultyById)
router.get('/:facultyId', academicFacultyController.getAcademicFacultyById)

export const AcademicFacultyRoutes = router; 
