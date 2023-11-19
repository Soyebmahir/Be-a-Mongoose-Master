import { Request, Response } from 'express';
import { StudentServices } from './student.service';

import studentValidationSchema from '../student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {


    const student = req.body.student;

    const { error, value } = studentValidationSchema.validate(student)

    // call service func
    const result = await StudentServices.createStudentIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went Wrong.',
        error: error.details
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong.',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Data Found Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong.',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
};
