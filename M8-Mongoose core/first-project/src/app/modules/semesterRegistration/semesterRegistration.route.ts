import express from 'express'
import validateRequest from '../../middlewares/validaterequest'
import { SemesterRegistrationValidation } from './semseterRegistrtation.validation'
import { SemesterRegistrationController } from './semesterResgistration.controller'
const router = express.Router()
router.post('/', validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema), SemesterRegistrationController.createSemesterRegistration)
router.get('/', SemesterRegistrationController.getAllSemesterRegistration)
router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration)
router.patch('/:id', validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema), SemesterRegistrationController.updateSemesterRegistration)
router.delete(
    '/:id',
    SemesterRegistrationController.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router