import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
// we will call controller func
router

  .get('/', StudentController.getAllStudents)
  .get('/:id', StudentController.getSingleStudent)
  .patch('/:id', StudentController.updateStudentById)
  .delete('/:id', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
