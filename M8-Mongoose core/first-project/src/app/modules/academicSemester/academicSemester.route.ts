import express from 'express'
import { academicSemesterController } from './academicSemeseter.controller'
import validateRequest from '../../middlewares/validaterequest'

import { academicSemesterValidations } from './academicSemester.validation'
const router = express.Router()
router.post('/create-academic-Semester', validateRequest(academicSemesterValidations.academicSemesterValidationSchema), academicSemesterController.createAcademicSemester)
router.get('/', academicSemesterController.getAllAcademicSemester)
router.get('/:semesterId', academicSemesterController.getAcademicSemesterById)
router.patch('/:semesterId', academicSemesterController.updateAcademicSemesterById)

export const AcademicSemesterRoutes = router