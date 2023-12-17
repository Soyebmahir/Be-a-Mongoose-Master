import express from 'express'
import validateRequest from '../../middlewares/validaterequest'
import { SemesterRegistrationValidation } from './semseterRegistrtation.validation'
import { SemesterController } from './semesterResgistration.controller'
const router = express.Router()
router.post('/', validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema), SemesterController.createSemesterRegistration)
router.get('/', SemesterController.getAllSemesterRegistration)
router.get('/:id', SemesterController.getSingleSemesterRegistration)
router.patch('/:id', validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema), SemesterController.updateSemesterRegistration)

export const SemesterRegistrationRoutes = router