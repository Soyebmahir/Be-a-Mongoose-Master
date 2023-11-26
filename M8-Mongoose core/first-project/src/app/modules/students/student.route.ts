import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
// we will call controller func
router

  .get('/', StudentController.getAllStudents)
  .get('/:studentID', StudentController.getSingleStudent)
  .delete('/:studentID', StudentController.deleteSingleStudent)

export const StudentRoutes = router;
