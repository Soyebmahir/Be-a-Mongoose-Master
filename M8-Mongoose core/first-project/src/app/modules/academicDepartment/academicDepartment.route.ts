import express from 'express';
import validateRequest from '../../middlewares/validaterequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
router.post('/create-academic-department', validateRequest(academicDepartmentValidation.academicDepartmentValidationSchema), academicDepartmentController.createAcademicDepartment)
router.get('/', academicDepartmentController.getAllAcademicDepartment)
router.get('/:departmentId', academicDepartmentController.getAcademicDepartmentById)
router.patch('/:departmentId', academicDepartmentController.updateAcademicDepartmentById)

export const AcademicDepartmentRoutes = router;