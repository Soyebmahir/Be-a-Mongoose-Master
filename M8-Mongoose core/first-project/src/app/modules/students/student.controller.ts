import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../middlewares/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudents();
    // res.status(200).json({
    //   success: true,
    //   message: 'Data Found Successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data Found Successfully',
      data: result
    })
  } catch (err) {
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentID)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data Found Successfully',
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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Successfully.',
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
