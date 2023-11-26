import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Data Found Successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentID)
    res.status(200).json({
      success: true,
      message: 'Data found successfully',
      data: result
    })
  } catch (err) {
    next(err)

  }

}
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(studentID)
    res.status(200).json({
      success: true,
      message: 'Deleted Successfully',
      data: result
    })
  } catch (err) {
    next(err)
  }
}

export const StudentController = {

  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
